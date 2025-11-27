"use client"

import { useEffect, useRef, useState } from "react"
import { X, Mail, Phone, Linkedin, Calendar } from 'lucide-react'

interface SurveyModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  language?: "en" | "es"
}

export function SurveyModal({ isOpen, onClose, darkMode, language = "en" }: SurveyModalProps) {
  const [dodgePositions, setDodgePositions] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [buttonOpacity, setButtonOpacity] = useState<{ [key: number]: number }>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setDodgePositions({})
      setButtonOpacity({})
      setMousePosition(null)
      setShowSuccess(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    let rafId: number | null = null
    let lastUpdate = 0
    const throttleDelay = 16 // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleDelay) {
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect()
              setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              })
            }
            rafId = null
            lastUpdate = Date.now()
          })
        }
      } else {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          })
        }
        lastUpdate = now
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove, { passive: true })
    }
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Posiciones de escape fijas para cada botón (fuera de la pantalla)
  const escapePositions = [
    { x: -400, y: -200 },  // Botón 1: arriba izquierda, fuera de pantalla
    { x: 400, y: -200 },   // Botón 2: arriba derecha, fuera de pantalla
    { x: 0, y: 300 },      // Botón 3: abajo centro, fuera de pantalla
  ]

  useEffect(() => {
    if (!mousePosition || !containerRef.current) return

    // Verificar si el mouse está en el área de los botones (parte superior del contenedor)
    const containerRect = containerRef.current.getBoundingClientRect()
    const buttonsAreaTop = 0
    const buttonsAreaBottom = containerRect.height * 0.7 // 70% del contenedor es donde están los botones
    
    // Si el mouse está en el área de los botones, moverlos todos
    if (mousePosition.y > buttonsAreaTop && mousePosition.y < buttonsAreaBottom) {
      // Mover todos los botones a sus posiciones de escape
      setDodgePositions({
        0: escapePositions[0],
        1: escapePositions[1],
        2: escapePositions[2],
      })
      setButtonOpacity({
        0: 0.2,
        1: 0.2,
        2: 0.2,
      })
    } else {
      // Si el mouse está fuera del área, volver a la normalidad
      if (Object.keys(dodgePositions).length > 0) {
        setDodgePositions({})
        setButtonOpacity({})
      }
    }
  }, [mousePosition])

  const handleDodge = (buttonIndex: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const buttonHeight = 56 // approximate button height
    const buttonWidth = 280 // approximate button width
    const padding = 20

    // Calculate safe boundaries
    const maxX = containerRect.width - buttonWidth - padding * 2
    const maxY = containerRect.height - buttonHeight - padding * 2

    // Generate random position further away to make it harder
    const randomX = (Math.random() - 0.5) * (maxX * 2)
    const randomY = (Math.random() - 0.5) * (maxY * 2)

    setDodgePositions((prev) => ({
      ...prev,
      [buttonIndex]: { x: randomX, y: randomY },
    }))
  }

  const handleHireClick = () => {
    setShowSuccess(true)
  }

  if (!isOpen) return null

  const t = {
    en: {
      title: "Would you hire me?",
      description: "After going through this portfolio, how likely are you to work with me?",
      tryToPick: "Try to pick an option below – if you can",
      wink: " ;)",
      notReally: "Not really…",
      maybe: "Maybe, I'm not sure yet",
      interested: "Interested – let's keep talking",
      veryLikely: "Very likely – let's work together",
      microcopy1: "Yes, I made the negative answers impossible to click.",
      microcopy2: "I like building interfaces that guide decisions on purpose.",
      successTitle: "I knew you made good decisions",
      successDescription: "Let's connect and make something great together.",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
    },
    es: {
      title: "¿Me contratarías?",
      description: "Después de revisar este portfolio, ¿qué tan probable es que trabajes conmigo?",
      tryToPick: "Intenta elegir una opción – si puedes",
      wink: " ;)",
      notReally: "La verdad que no…",
      maybe: "Tal vez, no estoy seguro/a aún",
      interested: "Me interesa – sigamos hablando",
      veryLikely: "Muy probable – trabajemos juntos",
      microcopy1: "Sí, hice que las respuestas negativas sean imposibles de clickear.",
      microcopy2: "Me gusta construir interfaces que guían decisiones intencionalmente.",
      successTitle: "Sabía que tomabas buenas decisiones",
      successDescription: "Conectemos y creemos algo grandioso juntos.",
      email: "Email",
      phone: "Teléfono",
      linkedin: "LinkedIn",
    },
  }

  const currentTranslations = t[language]

  const dodgeOptions = [
    { text: currentTranslations.notReally, index: 0 },
    { text: currentTranslations.maybe, index: 1 },
    { text: currentTranslations.interested, index: 2 },
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="survey-title"
    >
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 animate-in zoom-in-95 duration-300"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
          aria-label="Close survey"
        >
          <X className="h-5 w-5 text-stone-600 dark:text-stone-400" />
        </button>

        {showSuccess ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <h2 className="text-2xl font-light text-stone-900 dark:text-stone-100">
                {currentTranslations.successTitle}
              </h2>
              <p className="text-sm font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                {currentTranslations.successDescription}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 py-4">
              {/* Email */}
              <a
                href="mailto:abie.marangoni@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                  <Mail className="h-5 w-5 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-light text-stone-500 dark:text-stone-500">{currentTranslations.email}</p>
                  <p className="text-sm font-light text-stone-900 dark:text-stone-100">abie.marangoni@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+5492235500594"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                  <Phone className="h-5 w-5 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-light text-stone-500 dark:text-stone-500">{currentTranslations.phone}</p>
                  <p className="text-sm font-light text-stone-900 dark:text-stone-100">+54 9 223 550-0594</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/abril-marangoni-49924327a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                  <Linkedin className="h-5 w-5 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-light text-stone-500 dark:text-stone-500">{currentTranslations.linkedin}</p>
                  <p className="text-sm font-light text-stone-900 dark:text-stone-100">Abril Marangoni</p>
                </div>
              </a>

              {/* Calendly */}
              <a
                href="https://calendly.com/abie-marangoni/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                  <Calendar className="h-5 w-5 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-light text-stone-500 dark:text-stone-500">Calendly</p>
                  <p className="text-sm font-light text-stone-900 dark:text-stone-100">Let's meet</p>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2
                id="survey-title"
                className="text-2xl font-light text-stone-900 dark:text-stone-100"
              >
                {currentTranslations.title}
              </h2>
              <p className="text-sm font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                {currentTranslations.description}
                <br />
                {currentTranslations.tryToPick}{currentTranslations.wink}
              </p>
            </div>

            {/* Options container */}
            <div ref={containerRef} className="relative space-y-3 min-h-[280px] py-4">
              {/* Dodging buttons */}
              {dodgeOptions.map(({ text, index }) => (
                <button
                  key={index}
                  id={`dodge-button-${index}`}
                  onMouseEnter={(e) => handleDodge(index, e)}
                  onTouchStart={(e) => handleDodge(index, e)}
                  className="w-full px-6 py-3 text-sm font-light text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-all duration-150 cursor-pointer"
                  style={{
                    transform: dodgePositions[index]
                      ? `translate(${dodgePositions[index].x}px, ${dodgePositions[index].y}px)`
                      : "translate(0, 0)",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out",
                    opacity: buttonOpacity[index] !== undefined ? buttonOpacity[index] : 1,
                    pointerEvents: (dodgePositions[index] || buttonOpacity[index] !== undefined) ? "none" : "auto",
                  }}
                >
                  {text}
                </button>
              ))}

              {/* Clickable button */}
              <button
                onClick={handleHireClick}
                className="w-full px-6 py-3 text-sm font-light text-white bg-[#d97706] border border-[#d97706] rounded-md hover:bg-[#b86205] hover:border-[#b86205] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {currentTranslations.veryLikely}
              </button>
            </div>

            <p 
              className={`text-xs font-light italic text-center leading-relaxed transition-colors duration-300 ${
                Object.keys(dodgePositions).length > 0 
                  ? "text-[#d97706]" 
                  : "text-stone-500 dark:text-stone-500"
              }`}
            >
              {currentTranslations.microcopy1}
              <br />
              {currentTranslations.microcopy2}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
