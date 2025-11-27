"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CornerDownLeft, Trophy } from "lucide-react"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#1a1a1a"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#FFFFFF"
const PADDLE_COLOR = "#d97706"
const WALL_COLOR = "#FFFFFF"
const LETTER_SPACING = 1

// Scoring System Constants
const SCORE_STEP = 10 // Increments always in steps of 10
const TIME_WEIGHT = 0.05 // Small value to avoid exponential growth
const PIXEL_WEIGHT = 0.1 // Each destroyed pixel adds controlled value

const PIXEL_MAP = {
  H: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
}

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
}

interface Wall {
  x: number
  y: number
  width: number
  height: number
}

export function PromptingIsAllYouNeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddleRef = useRef<Paddle>({ x: 0, y: 0, width: 0, height: 0 })
  const wallsRef = useRef<Wall[]>([])
  const scaleRef = useRef(1)
  const gameAreaWidthRef = useRef(0)
  const gameAreaOffsetXRef = useRef(0)
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [companyName, setCompanyName] = useState("")
  const [score, setScore] = useState(0)
  const [pixelsDestroyed, setPixelsDestroyed] = useState(0)
  const [showRanking, setShowRanking] = useState(false)
  const [ranking, setRanking] = useState<{ easy: Array<{ score: number; pixelsDestroyed: number; timeMs: number; date: string; companyName: string }>; medium: Array<{ score: number; pixelsDestroyed: number; timeMs: number; date: string; companyName: string }>; hard: Array<{ score: number; pixelsDestroyed: number; timeMs: number; date: string; companyName: string }> }>({ easy: [], medium: [], hard: [] })
  const gameStateRef = useRef<"idle" | "playing" | "won" | "lost">("idle")
  const keysPressed = useRef<{ [key: string]: boolean }>({})
  const handleStartGameRef = useRef<(() => void) | null>(null)
  const gameStartTimeRef = useRef<number>(0)
  const companyNameRef = useRef<string>("")
  const finalScoreRef = useRef<number>(0)
  const gameOverRef = useRef<boolean>(false)
  const currentScoreRef = useRef<number>(0)
  const scoreSavedRef = useRef<boolean>(false)
  const rankingRef = useRef<HTMLDivElement>(null)

  // Sincronizar ref con estado
  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

  // Sincronizar ref con companyName
  useEffect(() => {
    companyNameRef.current = companyName
  }, [companyName])

  // Función para actualizar el score usando la fórmula normalizada
  const updateScore = useCallback((elapsedTime: number, pixelsBroken: number) => {
    if (gameOverRef.current) return // STOP updating if game over

    const rawScore = elapsedTime * TIME_WEIGHT + pixelsBroken * PIXEL_WEIGHT
    const normalizedScore = Math.floor(rawScore / SCORE_STEP) * SCORE_STEP
    
    currentScoreRef.current = normalizedScore
    setScore(normalizedScore)
  }, [])

  // Función para congelar el score cuando el juego termina
  const freezeScore = useCallback(() => {
    gameOverRef.current = true
    finalScoreRef.current = currentScoreRef.current
    setScore(finalScoreRef.current)
  }, [])

  // Cargar ranking al inicio
  useEffect(() => {
    const loadRanking = async () => {
      try {
        console.log('Loading ranking...')
        const response = await fetch('/api/ranking')
        if (response.ok) {
          const data = await response.json()
          console.log('Ranking loaded:', data)
          setRanking(data)
        } else {
          console.error('Failed to load ranking:', await response.text())
        }
      } catch (error) {
        console.error("Error loading ranking:", error)
      }
    }
    loadRanking()
  }, [])

  // Cerrar ranking al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showRanking && rankingRef.current && !rankingRef.current.contains(event.target as Node)) {
        setShowRanking(false)
      }
    }

    if (showRanking) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showRanking])

  // Función para guardar score en el ranking (solo una vez)
  const saveScore = useCallback(async (finalScore: number, difficulty: "easy" | "medium" | "hard", pixelsDestroyed: number, timeMs: number, companyName: string) => {
    // Prevenir guardado múltiple
    if (scoreSavedRef.current) {
      console.log('Score already saved, skipping...')
      return
    }

    scoreSavedRef.current = true

    console.log('Saving score to API:', {
      finalScore,
      difficulty,
      pixelsDestroyed,
      timeMs,
      companyName: companyName.trim() || "Anonymous"
    })

    try {
      const response = await fetch('/api/ranking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: finalScore,
          difficulty,
          pixelsDestroyed,
          timeMs,
          companyName: companyName.trim() || "Anonymous",
        }),
      })

      const responseData = await response.json()
      console.log('API response:', responseData)

      if (response.ok) {
        console.log('Score saved successfully, reloading ranking...')
        // Esperar un momento antes de recargar para asegurar que KV haya procesado
        setTimeout(async () => {
          const updatedRanking = await fetch('/api/ranking')
          if (updatedRanking.ok) {
            const data = await updatedRanking.json()
            console.log('Updated ranking data:', data)
            setRanking(data)
          } else {
            console.error('Failed to reload ranking')
          }
        }, 500)
      } else {
        console.error("Failed to save score:", responseData)
        // Resetear flag si falla para permitir reintento
        scoreSavedRef.current = false
      }
    } catch (error) {
      console.error("Error saving score:", error)
      // Resetear flag si falla para permitir reintento
      scoreSavedRef.current = false
    }
  }, [])

  const resetGame = useCallback(() => {
    const scale = scaleRef.current
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const PIXEL_SIZE = 16 * scale

    pixelsRef.current = []

    const text = "HIRE ME"

    const calculateTextWidth = (text: string) => {
      let width = 0
      const letters = text.split("")

      letters.forEach((letter, index) => {
        if (letter === " ") {
          width += 3 * PIXEL_SIZE
        } else {
          const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
          width += letterWidth * PIXEL_SIZE
          if (index < letters.length - 1 && letters[index + 1] !== " ") {
            width += LETTER_SPACING * PIXEL_SIZE
          }
        }
      })
      return width
    }

    const totalWidth = calculateTextWidth(text)
    const gameAreaWidth = gameAreaWidthRef.current || rect.width * 0.75
    const gameAreaOffsetX = gameAreaOffsetXRef.current || (rect.width - gameAreaWidth) / 2

    const startX = gameAreaOffsetX + (gameAreaWidth - totalWidth) / 2
    const textHeight = 5 * PIXEL_SIZE
    const startY = (rect.height - textHeight) / 2 - 60

    let currentX = startX

    text.split("").forEach((letter) => {
      if (letter === " ") {
        currentX += 3 * PIXEL_SIZE
        return
      }

      const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
      if (!pixelMap) return

      for (let i = 0; i < pixelMap.length; i++) {
        for (let j = 0; j < pixelMap[i].length; j++) {
          if (pixelMap[i][j]) {
            const x = currentX + j * PIXEL_SIZE
            const y = startY + i * PIXEL_SIZE
            pixelsRef.current.push({ x, y, size: PIXEL_SIZE, hit: false })
          }
        }
      }
      currentX += (pixelMap[0].length + LETTER_SPACING) * PIXEL_SIZE
    })
  }, [])


  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.scale(dpr, dpr)

      // Calcular área de juego reducida (75% del ancho)
      gameAreaWidthRef.current = rect.width * 0.75
      gameAreaOffsetXRef.current = (rect.width - gameAreaWidthRef.current) / 2

      scaleRef.current = Math.min(gameAreaWidthRef.current / 1000, rect.height / 1000)
    }

    const initializeGame = () => {
      resetGame()
    }

    const updateGame = () => {
      if (gameState !== "playing") return

      const ball = ballRef.current
      const paddle = paddleRef.current
      const walls = wallsRef.current
      const rect = container.getBoundingClientRect()

      ball.x += ball.dx
      ball.y += ball.dy

      walls.forEach((wall) => {
        const ballLeft = ball.x - ball.radius
        const ballRight = ball.x + ball.radius
        const ballTop = ball.y - ball.radius
        const ballBottom = ball.y + ball.radius

        const wallLeft = wall.x
        const wallRight = wall.x + wall.width
        const wallTop = wall.y
        const wallBottom = wall.y + wall.height

        if (ballRight > wallLeft && ballLeft < wallRight && ballBottom > wallTop && ballTop < wallBottom) {
          const fromLeft = ballRight - wallLeft
          const fromRight = wallRight - ballLeft
          const fromTop = ballBottom - wallTop
          const fromBottom = wallBottom - ballTop

          const minOverlap = Math.min(fromLeft, fromRight, fromTop, fromBottom)

          if (minOverlap === fromLeft || minOverlap === fromRight) {
            ball.dx = -ball.dx
            ball.x = minOverlap === fromLeft ? wallLeft - ball.radius : wallRight + ball.radius
          } else {
            ball.dy = -ball.dy
            ball.y = minOverlap === fromTop ? wallTop - ball.radius : wallBottom + ball.radius
          }
        }
      })

      const ballLeft = ball.x - ball.radius
      const ballRight = ball.x + ball.radius
      const ballTop = ball.y - ball.radius
      const ballBottom = ball.y + ball.radius

      const paddleLeft = paddle.x
      const paddleRight = paddle.x + paddle.width
      const paddleTop = paddle.y
      const paddleBottom = paddle.y + paddle.height

      if (ballRight > paddleLeft && ballLeft < paddleRight && ballBottom > paddleTop && ballTop < paddleBottom) {
        ball.dy = -Math.abs(ball.dy)
        ball.y = paddleTop - ball.radius

        const paddleCenter = paddle.x + paddle.width / 2
        const hitPosition = (ball.x - paddleCenter) / (paddle.width / 2)
        ball.dx += hitPosition * 2 * scaleRef.current
      }

      if (ball.y - ball.radius > rect.height) {
        // Congelar score inmediatamente
        freezeScore()
        
        const timeElapsed = Date.now() - gameStartTimeRef.current
        const timeMs = timeElapsed
        const currentPixelsDestroyed = pixelsRef.current.filter(p => p.hit).length
        
        setPixelsDestroyed(currentPixelsDestroyed)
        
        // Guardar score automáticamente cuando pierde
        saveScore(finalScoreRef.current, difficulty, currentPixelsDestroyed, timeMs, companyNameRef.current)
        setGameState("lost")
        return
      }

      const gameAreaWidth = gameAreaWidthRef.current || rect.width * 0.75
      const gameAreaOffsetX = gameAreaOffsetXRef.current || (rect.width - gameAreaWidth) / 2
      
      // Rebotar en los bordes laterales del área de juego
      if (ball.x - ball.radius < gameAreaOffsetX) {
        ball.dx = -ball.dx
        ball.x = gameAreaOffsetX + ball.radius
      }
      if (ball.x + ball.radius > gameAreaOffsetX + gameAreaWidth) {
        ball.dx = -ball.dx
        ball.x = gameAreaOffsetX + gameAreaWidth - ball.radius
      }
      
      const paddleSpeed = 25 * scaleRef.current
      if (keysPressed.current["ArrowLeft"]) {
        paddle.x -= paddleSpeed
      }
      if (keysPressed.current["ArrowRight"]) {
        paddle.x += paddleSpeed
      }
      paddle.x = Math.max(gameAreaOffsetX, Math.min(gameAreaOffsetX + gameAreaWidth - paddle.width, paddle.x))

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          // Incrementar contador de píxeles destruidos
          setPixelsDestroyed((prev) => prev + 1)
          
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })

      const allHit = pixelsRef.current.every((pixel) => pixel.hit)
      if (allHit) {
        // Congelar score inmediatamente cuando gana
        freezeScore()
        
        const timeElapsed = Date.now() - gameStartTimeRef.current
        const timeMs = timeElapsed
        const currentPixelsDestroyed = pixelsRef.current.filter(p => p.hit).length
        
        setPixelsDestroyed(currentPixelsDestroyed)
        
        // Guardar score automáticamente cuando gana
        saveScore(finalScoreRef.current, difficulty, currentPixelsDestroyed, timeMs, companyNameRef.current)
        setGameState("won")
      }
    }

    const drawGame = () => {
      if (!ctx) return
      const rect = container.getBoundingClientRect()
      const gameAreaWidth = gameAreaWidthRef.current || rect.width * 0.75
      const gameAreaOffsetX = gameAreaOffsetXRef.current || (rect.width - gameAreaWidth) / 2

      ctx.imageSmoothingEnabled = false

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Solo dibujar el juego si está jugando
      if (gameState === "playing") {
        // Dibujar líneas de borde del área de juego
        ctx.strokeStyle = "#333333"
        ctx.lineWidth = 2
        ctx.strokeRect(gameAreaOffsetX, 0, gameAreaWidth, rect.height)

        pixelsRef.current.forEach((pixel) => {
          ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
          ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        })
        
        // Actualizar score solo si el juego no ha terminado
        if (!gameOverRef.current) {
          const timeElapsed = Date.now() - gameStartTimeRef.current
          const currentPixelsDestroyed = pixelsRef.current.filter(p => p.hit).length
          updateScore(timeElapsed, currentPixelsDestroyed)
        }
        
        // Mostrar score durante el juego
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `${20 * scaleRef.current}px monospace`
        ctx.textAlign = "left"
        ctx.fillText(`Score: ${currentScoreRef.current}`, gameAreaOffsetX + 10, 30)

        ctx.fillStyle = BALL_COLOR
        ctx.beginPath()
        ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = PADDLE_COLOR
        const paddle = paddleRef.current
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      }

    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    initializeGame()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [gameState])

  // Listeners de teclado separados que no dependen de gameState
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keysPressed.current[e.key] = true
      }
      if (e.key === "Enter" && gameStateRef.current === "idle" && companyNameRef.current.trim()) {
        e.preventDefault()
        if (handleStartGameRef.current) {
          handleStartGameRef.current()
        }
      }
      if ((e.key === "r" || e.key === "R") && (gameStateRef.current === "lost" || gameStateRef.current === "won")) {
        e.preventDefault()
        window.location.reload()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keysPressed.current[e.key] = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const handleStartGame = () => {
    if (!companyName.trim()) return
    
    const scale = scaleRef.current
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const gameAreaWidth = gameAreaWidthRef.current || rect.width * 0.75
    const gameAreaOffsetX = gameAreaOffsetXRef.current || (rect.width - gameAreaWidth) / 2
    const PIXEL_SIZE = 16 * scale
    const speedMap = { easy: 10, medium: 12, hard: 14 }
    const BALL_SPEED = speedMap[difficulty] * scale

    resetGame()
    // Reset flags for new game
    gameOverRef.current = false
    scoreSavedRef.current = false
    currentScoreRef.current = 0
    finalScoreRef.current = 0
    setScore(0)
    setPixelsDestroyed(0)
    gameStartTimeRef.current = Date.now()

    ballRef.current = {
      x: gameAreaOffsetX + gameAreaWidth / 2,
      y: rect.height * 0.7,
      dx: BALL_SPEED * 0.7,
      dy: -BALL_SPEED,
      radius: PIXEL_SIZE / 2,
    }

    const wallThickness = PIXEL_SIZE * 4
    const paddleThickness = PIXEL_SIZE * 1
    const paddleLength = 15 * PIXEL_SIZE

    wallsRef.current = [
      {
        x: gameAreaOffsetX,
        y: 0,
        width: gameAreaWidth,
        height: wallThickness,
      },
      {
        x: gameAreaOffsetX,
        y: 0,
        width: wallThickness,
        height: rect.height,
      },
      {
        x: gameAreaOffsetX + gameAreaWidth - wallThickness,
        y: 0,
        width: wallThickness,
        height: rect.height,
      },
    ]

    paddleRef.current = {
      x: gameAreaOffsetX + gameAreaWidth / 2 - paddleLength / 2,
      y: rect.height - paddleThickness,
      width: paddleLength,
      height: paddleThickness,
    }

    setGameState("playing")
  }

  // Actualizar la ref de handleStartGame en cada render
  handleStartGameRef.current = handleStartGame

  return (
    <div ref={containerRef} className="w-full h-full relative bg-black" style={{ height: '100%' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Hire Me: Interactive Breakout game - Use arrow keys to control the paddle"
      />
      {gameState === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="border border-stone-800 bg-black/90 p-8 max-w-md w-full mx-4">
            <div className="space-y-6">
              {/* Difficulty */}
              <div className="space-y-3">
                <p className="text-xs text-white/60 font-mono uppercase tracking-wider">Difficulty</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDifficulty("easy")}
                    className={`flex-1 py-2 text-xs font-mono transition-all cursor-pointer border-2 ${
                      difficulty === "easy"
                        ? "bg-stone-700 text-white border-stone-500 fill-stone-700"
                        : "bg-transparent text-white/60 border-stone-800 hover:border-stone-700 hover:text-white/80"
                    }`}
                    style={difficulty === "easy" ? { backgroundColor: '#404040' } : {}}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setDifficulty("medium")}
                    className={`flex-1 py-2 text-xs font-mono transition-all cursor-pointer border-2 ${
                      difficulty === "medium"
                        ? "bg-stone-700 text-white border-stone-500 fill-stone-700"
                        : "bg-transparent text-white/60 border-stone-800 hover:border-stone-700 hover:text-white/80"
                    }`}
                    style={difficulty === "medium" ? { backgroundColor: '#404040' } : {}}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setDifficulty("hard")}
                    className={`flex-1 py-2 text-xs font-mono transition-all cursor-pointer border-2 ${
                      difficulty === "hard"
                        ? "bg-stone-700 text-white border-stone-500 fill-stone-700"
                        : "bg-transparent text-white/60 border-stone-800 hover:border-stone-700 hover:text-white/80"
                    }`}
                    style={difficulty === "hard" ? { backgroundColor: '#404040' } : {}}
                  >
                    Hard
                  </button>
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <p className="text-xs text-white/60 font-mono">Company name</p>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Type to see where you rank"
                  className="w-full px-3 py-2 bg-transparent border border-stone-700 text-white font-mono text-sm focus:outline-none focus:border-[#d97706] placeholder:text-white/30"
                  maxLength={50}
                />
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartGame}
                disabled={!companyName.trim()}
                className={`w-full py-3 text-sm font-mono transition-all flex items-center justify-center gap-2 border ${
                  !companyName.trim()
                    ? "opacity-30 cursor-not-allowed border-stone-800 text-white/50"
                    : "border-[#d97706] text-[#d97706] hover:bg-[#d97706] hover:text-white"
                }`}
                aria-label="Start game"
              >
                <span>Press</span>
                <CornerDownLeft className="h-4 w-4" />
                <span>to start</span>
              </button>

              {/* Ranking Toggle */}
              <button
                onClick={() => setShowRanking(!showRanking)}
                className="w-full text-xs text-white/50 hover:text-white/80 font-mono transition-colors py-2"
              >
                {showRanking ? "Hide" : "Show"} ranking
              </button>
            </div>
          </div>
          
          {showRanking && (
            <div ref={rankingRef} className="absolute top-8 right-8 border border-stone-800 bg-black p-6 max-w-lg w-full max-h-[500px] overflow-y-auto z-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-mono text-xs uppercase tracking-wider">Rankings</h3>
                <button
                  onClick={async () => {
                    console.log('Manual ranking reload...')
                    const response = await fetch('/api/ranking')
                    if (response.ok) {
                      const data = await response.json()
                      console.log('Manual reload data:', data)
                      setRanking(data)
                    }
                  }}
                  className="text-white/50 hover:text-white/80 font-mono text-[10px] px-2 py-1 border border-stone-700 hover:border-stone-500 transition-colors"
                >
                  Reload
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Easy Ranking */}
                <div>
                  <h4 className="text-white/80 font-mono text-[10px] mb-3 uppercase tracking-wider border-b border-stone-800 pb-1">Easy</h4>
                  <div className="space-y-2">
                    {ranking.easy.length > 0 ? (
                      ranking.easy.slice(0, 10).map((entry, index) => {
                        const getTrophyColor = () => {
                          if (index === 0) return "#FFD700" // Oro
                          if (index === 1) return "#C0C0C0" // Plata
                          if (index === 2) return "#CD7F32" // Bronce
                          return null
                        }
                        const trophyColor = getTrophyColor()
                        return (
                          <div key={index} className="text-white/60 font-mono text-[10px]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1">
                                {trophyColor ? (
                                  <Trophy className="h-3 w-3" style={{ color: trophyColor }} fill={trophyColor} />
                                ) : (
                                  <span>#{index + 1}</span>
                                )}
                              </div>
                              <span>{entry.score.toLocaleString()}</span>
                            </div>
                            <div className="text-white/40 text-[9px] truncate mt-0.5 pl-4">
                              {entry.companyName}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-white/30 font-mono text-[10px] text-center py-4">—</div>
                    )}
                  </div>
                </div>
                
                {/* Medium Ranking */}
                <div>
                  <h4 className="text-white/80 font-mono text-[10px] mb-3 uppercase tracking-wider border-b border-stone-800 pb-1">Medium</h4>
                  <div className="space-y-2">
                    {ranking.medium.length > 0 ? (
                      ranking.medium.slice(0, 10).map((entry, index) => {
                        const getTrophyColor = () => {
                          if (index === 0) return "#FFD700" // Oro
                          if (index === 1) return "#C0C0C0" // Plata
                          if (index === 2) return "#CD7F32" // Bronce
                          return null
                        }
                        const trophyColor = getTrophyColor()
                        return (
                          <div key={index} className="text-white/60 font-mono text-[10px]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1">
                                {trophyColor ? (
                                  <Trophy className="h-3 w-3" style={{ color: trophyColor }} fill={trophyColor} />
                                ) : (
                                  <span>#{index + 1}</span>
                                )}
                              </div>
                              <span>{entry.score.toLocaleString()}</span>
                            </div>
                            <div className="text-white/40 text-[9px] truncate mt-0.5 pl-4">
                              {entry.companyName}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-white/30 font-mono text-[10px] text-center py-4">—</div>
                    )}
                  </div>
                </div>
                
                {/* Hard Ranking */}
                <div>
                  <h4 className="text-white/80 font-mono text-[10px] mb-3 uppercase tracking-wider border-b border-stone-800 pb-1">Hard</h4>
                  <div className="space-y-2">
                    {ranking.hard.length > 0 ? (
                      ranking.hard.slice(0, 10).map((entry, index) => {
                        const getTrophyColor = () => {
                          if (index === 0) return "#FFD700" // Oro
                          if (index === 1) return "#C0C0C0" // Plata
                          if (index === 2) return "#CD7F32" // Bronce
                          return null
                        }
                        const trophyColor = getTrophyColor()
                        return (
                          <div key={index} className="text-white/60 font-mono text-[10px]">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1">
                                {trophyColor ? (
                                  <Trophy className="h-3 w-3" style={{ color: trophyColor }} fill={trophyColor} />
                                ) : (
                                  <span>#{index + 1}</span>
                                )}
                              </div>
                              <span>{entry.score.toLocaleString()}</span>
                            </div>
                            <div className="text-white/40 text-[9px] truncate mt-0.5 pl-4">
                              {entry.companyName}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-white/30 font-mono text-[10px] text-center py-4">—</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {gameState === "playing" && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center font-mono">
          <p className="text-sm opacity-70">Use ← → arrow keys to control the paddle</p>
        </div>
      )}
      {gameState === "lost" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="border border-stone-800 bg-black/90 p-8 max-w-md w-full mx-4">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl text-white font-mono">GAME OVER</h2>
                <p className="text-lg text-white/80 font-mono">Score: {score.toLocaleString()}</p>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 text-sm font-mono transition-all flex items-center justify-center gap-2 border border-[#d97706] text-[#d97706] hover:bg-[#d97706] hover:text-white"
              >
                <span>Press</span>
                <span className="font-mono">R</span>
                <span>to play again</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {gameState === "won" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="border border-stone-800 bg-black/90 p-8 max-w-md w-full mx-4">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl text-white font-mono">YOU WIN!</h2>
                <p className="text-lg text-white/80 font-mono">Score: {score.toLocaleString()}</p>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 text-sm font-mono transition-all flex items-center justify-center gap-2 border border-[#d97706] text-[#d97706] hover:bg-[#d97706] hover:text-white"
              >
                <span>Press</span>
                <span className="font-mono">R</span>
                <span>to play again</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptingIsAllYouNeed
