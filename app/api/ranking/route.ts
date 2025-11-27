import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface ScoreEntry {
  score: number
  difficulty: 'easy' | 'medium' | 'hard'
  pixelsDestroyed: number
  timeMs: number
  date: string
  companyName: string
}

const RANKING_KEYS = {
  easy: 'scores:easy',
  medium: 'scores:medium',
  hard: 'scores:hard',
}

// Fallback storage para desarrollo local (sin KV)
let memoryStorage: {
  easy: ScoreEntry[]
  medium: ScoreEntry[]
  hard: ScoreEntry[]
} = {
  easy: [],
  medium: [],
  hard: []
}

// Verificar si KV está configurado
const isKVConfigured = () => {
  return !!(
    process.env.KV_URL ||
    process.env.KV_REST_API_URL ||
    process.env.KV_REST_API_TOKEN
  )
}

export async function GET(request: NextRequest) {
  try {
    // Si KV no está configurado, usar almacenamiento en memoria
    if (!isKVConfigured()) {
      console.log('KV not configured, using memory storage')
      // Ordenar por score (mayor a menor) y limitar a top 50
      const sortAndLimit = (entries: ScoreEntry[]) => 
        [...entries].sort((a, b) => b.score - a.score).slice(0, 50)
      
      return NextResponse.json({
        easy: sortAndLimit(memoryStorage.easy),
        medium: sortAndLimit(memoryStorage.medium),
        hard: sortAndLimit(memoryStorage.hard),
      })
    }

    console.log('Fetching rankings from KV...')
    
    const [easyRaw, mediumRaw, hardRaw] = await Promise.all([
      kv.zrange(RANKING_KEYS.easy, 0, 49, { rev: true, withScores: false }) as Promise<string[]>,
      kv.zrange(RANKING_KEYS.medium, 0, 49, { rev: true, withScores: false }) as Promise<string[]>,
      kv.zrange(RANKING_KEYS.hard, 0, 49, { rev: true, withScores: false }) as Promise<string[]>,
    ])

    console.log('Raw data received:', {
      easy: easyRaw?.length || 0,
      medium: mediumRaw?.length || 0,
      hard: hardRaw?.length || 0
    })

    const parseEntries = (raw: string[]): ScoreEntry[] => {
      if (!raw || !Array.isArray(raw)) return []
      return raw.map(entry => {
        try {
          if (typeof entry === 'string') {
            return JSON.parse(entry) as ScoreEntry
          }
          return null
        } catch (e) {
          console.error('Error parsing entry:', e, entry)
          return null
        }
      }).filter(Boolean) as ScoreEntry[]
    }

    const easy = parseEntries(easyRaw || [])
    const medium = parseEntries(mediumRaw || [])
    const hard = parseEntries(hardRaw || [])

    console.log('Parsed entries:', {
      easy: easy.length,
      medium: medium.length,
      hard: hard.length
    })

    return NextResponse.json({
      easy,
      medium,
      hard,
    })
  } catch (error) {
    console.error('Error reading ranking:', error)
    // Si hay error con KV, intentar usar memoria como fallback
    if (isKVConfigured()) {
      console.log('KV error, falling back to memory storage')
      const sortAndLimit = (entries: ScoreEntry[]) => 
        [...entries].sort((a, b) => b.score - a.score).slice(0, 50)
      
      return NextResponse.json({
        easy: sortAndLimit(memoryStorage.easy),
        medium: sortAndLimit(memoryStorage.medium),
        hard: sortAndLimit(memoryStorage.hard),
      })
    }
    return NextResponse.json({ easy: [], medium: [], hard: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { score, difficulty, pixelsDestroyed, timeMs, companyName } = body

    console.log('Saving score:', { score, difficulty, pixelsDestroyed, timeMs, companyName })

    // Validación estricta de campos requeridos
    if (score === undefined || score === null || !difficulty || pixelsDestroyed === undefined || !timeMs || !companyName) {
      console.error('Missing required fields:', { score, difficulty, pixelsDestroyed, timeMs, companyName })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      console.error('Invalid difficulty:', difficulty)
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 })
    }

    // Asegurar que el score es un número válido
    const numericScore = Number(score)
    if (isNaN(numericScore) || numericScore < 0) {
      console.error('Invalid score value:', score)
      return NextResponse.json({ error: 'Invalid score value' }, { status: 400 })
    }

    // Crear entrada con timestamp único para evitar duplicados exactos
    const newEntry: ScoreEntry = {
      score: numericScore,
      difficulty,
      pixelsDestroyed,
      timeMs,
      date: new Date().toISOString(),
      companyName: companyName.trim() || "Anonymous",
    }

    const rankingKey = RANKING_KEYS[difficulty]
    const entryString = JSON.stringify(newEntry)
    
    // Si KV no está configurado, usar almacenamiento en memoria
    if (!isKVConfigured()) {
      console.log('KV not configured, saving to memory storage')
      memoryStorage[difficulty].push(newEntry)
      // Ordenar por score (mayor a menor) y mantener solo top 50
      memoryStorage[difficulty] = memoryStorage[difficulty]
        .sort((a, b) => b.score - a.score)
        .slice(0, 50)
      console.log('Score saved to memory:', { difficulty, score: numericScore, total: memoryStorage[difficulty].length })
      return NextResponse.json({ success: true, savedScore: numericScore, storage: 'memory' })
    }

    console.log('Saving to KV:', { rankingKey, numericScore, entryString })
    
    // Guardar en sorted set: el score numérico es el peso de ordenamiento
    // Redis ordena automáticamente por score (mayor a menor)
    // Intentar múltiples sintaxis para compatibilidad
    let result
    try {
      // Sintaxis 1: kv.zadd(key, score, member)
      result = await kv.zadd(rankingKey, numericScore, entryString)
      console.log('KV zadd result (syntax 1):', result)
    } catch (e1) {
      try {
        // Sintaxis 2: kv.zadd(key, { score, member })
        result = await kv.zadd(rankingKey, { score: numericScore, member: entryString })
        console.log('KV zadd result (syntax 2):', result)
      } catch (e2) {
        console.error('Both zadd syntaxes failed, falling back to memory:', e1, e2)
        // Fallback a memoria si KV falla
        memoryStorage[difficulty].push(newEntry)
        memoryStorage[difficulty] = memoryStorage[difficulty]
          .sort((a, b) => b.score - a.score)
          .slice(0, 50)
        return NextResponse.json({ success: true, savedScore: numericScore, storage: 'memory-fallback' })
      }
    }

    // Mantener solo top 50 (eliminar los que están después del índice 49)
    await kv.zremrangebyrank(rankingKey, 50, -1)

    console.log('Score saved successfully:', numericScore)
    return NextResponse.json({ success: true, savedScore: numericScore })
  } catch (error) {
    console.error('Error saving score:', error)
    return NextResponse.json({ error: 'Failed to save score', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
