"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CornerDownLeft } from "lucide-react"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#1a1a1a"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#FFFFFF"
const PADDLE_COLOR = "#d97706"
const WALL_COLOR = "#FFFFFF"
const LETTER_SPACING = 1

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
  const [gameState, setGameState] = useState<"idle" | "playing" | "won" | "lost">("idle")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const gameStateRef = useRef<"idle" | "playing" | "won" | "lost">("idle")
  const keysPressed = useRef<{ [key: string]: boolean }>({})
  const handleStartGameRef = useRef<(() => void) | null>(null)

  // Sincronizar ref con estado
  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

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

    const startX = (rect.width - totalWidth) / 2
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

      scaleRef.current = Math.min(rect.width / 1000, rect.height / 1000)
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
        setGameState("lost")
        return
      }

      const paddleSpeed = 25 * scaleRef.current
      if (keysPressed.current["ArrowLeft"]) {
        paddle.x -= paddleSpeed
      }
      if (keysPressed.current["ArrowRight"]) {
        paddle.x += paddleSpeed
      }
      paddle.x = Math.max(0, Math.min(rect.width - paddle.width, paddle.x))

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
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
        setGameState("won")
      }
    }

    const drawGame = () => {
      if (!ctx) return
      const rect = container.getBoundingClientRect()

      ctx.imageSmoothingEnabled = false

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, rect.width, rect.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      if (gameState !== "idle") {
        ctx.fillStyle = BALL_COLOR
        ctx.beginPath()
        ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = PADDLE_COLOR
        const paddle = paddleRef.current
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      }

      if (gameState === "lost") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(0, 0, rect.width, rect.height)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `${48 * scaleRef.current}px monospace`
        ctx.textAlign = "center"
        ctx.fillText("GAME OVER", rect.width / 2, rect.height / 2 - 30)
        ctx.font = `${24 * scaleRef.current}px monospace`
        ctx.fillText("Press R to start", rect.width / 2, rect.height / 2 + 30)
      } else if (gameState === "won") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(0, 0, rect.width, rect.height)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `${48 * scaleRef.current}px monospace`
        ctx.textAlign = "center"
        ctx.fillText("YOU WIN!", rect.width / 2, rect.height / 2 - 30)
        ctx.font = `${24 * scaleRef.current}px monospace`
        ctx.fillText("Press R to start", rect.width / 2, rect.height / 2 + 30)
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
      if (e.key === "Enter" && gameStateRef.current === "idle") {
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
    const scale = scaleRef.current
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const PIXEL_SIZE = 16 * scale
    const speedMap = { easy: 10, medium: 12, hard: 14 }
    const BALL_SPEED = speedMap[difficulty] * scale

    resetGame()

    ballRef.current = {
      x: rect.width / 2,
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
        x: 0,
        y: 0,
        width: rect.width,
        height: wallThickness,
      },
      {
        x: 0,
        y: 0,
        width: wallThickness,
        height: rect.height,
      },
      {
        x: rect.width - wallThickness,
        y: 0,
        width: wallThickness,
        height: rect.height,
      },
    ]

    paddleRef.current = {
      x: rect.width / 2 - paddleLength / 2,
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-white/70 font-mono mb-2">Difficulty Level</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDifficulty("easy")}
                className={`px-4 py-2 text-sm font-mono transition-all cursor-pointer border-2 ${
                  difficulty === "easy"
                    ? "bg-[#d97706] text-white border-stone-400"
                    : "bg-white/10 text-white/70 border-transparent hover:bg-white/20 hover:border-white/30"
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setDifficulty("medium")}
                className={`px-4 py-2 text-sm font-mono transition-all cursor-pointer border-2 ${
                  difficulty === "medium"
                    ? "bg-[#d97706] text-white border-stone-400"
                    : "bg-white/10 text-white/70 border-transparent hover:bg-white/20 hover:border-white/30"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setDifficulty("hard")}
                className={`px-4 py-2 text-sm font-mono transition-all cursor-pointer border-2 ${
                  difficulty === "hard"
                    ? "bg-[#d97706] text-white border-stone-400"
                    : "bg-white/10 text-white/70 border-transparent hover:bg-white/20 hover:border-white/30"
                }`}
              >
                Hard
              </button>
            </div>
          </div>
          <button
            onClick={handleStartGame}
            className="text-white hover:text-stone-300 transition-colors text-center font-mono cursor-pointer border-none bg-transparent flex items-center gap-2"
            aria-label="Start game"
          >
            <span className="text-2xl">Press</span>
            <CornerDownLeft className="h-6 w-6" />
            <span className="text-2xl">to start</span>
          </button>
          <p className="text-sm opacity-70 font-mono">use your keyboard to play &lt;&gt;</p>
        </div>
      )}
      {gameState === "playing" && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-center font-mono">
          <p className="text-sm opacity-70">Use ← → arrow keys to control the paddle</p>
        </div>
      )}
    </div>
  )
}

export default PromptingIsAllYouNeed
