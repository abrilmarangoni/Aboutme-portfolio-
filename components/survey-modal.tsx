"use client"

import { useEffect, useRef, useState } from "react"
import { X, Mail, Phone, Linkedin } from 'lucide-react'

interface SurveyModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
  language?: "en" | "es"
}

export function SurveyModal({ isOpen, onClose, darkMode, language = "en" }: SurveyModalProps) {
  const [dodgePositions, setDodgePositions] = useState<{ [key: number]: { x: number; y: number } }>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setDodgePositions({})
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

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove)
    }
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
      }
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!mousePosition || !containerRef.current) return

    const dodgeOptions = [
      { text: "Not really…", index: 0 },
      { text: "Maybe, I'm not sure yet", index: 1 },
      { text: "Interested – let's keep talking", index: 2 },
    ]

    dodgeOptions.forEach(({ index }) => {
      const buttonElement = document.getElementById(`dodge-button-${index}`)
      if (!buttonElement) return

      const rect = buttonElement.getBoundingClientRect()
      const containerRect = containerRef.current!.getBoundingClientRect()
      
      // Button center relative to container
      const buttonCenterX = rect.left + rect.width / 2 - containerRect.left
      const buttonCenterY = rect.top + rect.height / 2 - containerRect.top

      // Calculate distance from mouse to button center
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - buttonCenterX, 2) +
        Math.pow(mousePosition.y - buttonCenterY, 2)
      )

      const detectionRadius = 150
      if (distance < detectionRadius) {
        // Calculate direction away from mouse
        const angle = Math.atan2(
          buttonCenterY - mousePosition.y,
          buttonCenterX - mousePosition.x
        )
        
        const dodgeDistance = 250 + Math.random() * 150
        const newX = Math.cos(angle) * dodgeDistance
        const newY = Math.sin(angle) * dodgeDistance

        setDodgePositions((prev) => ({
          ...prev,
          [index]: { x: newX, y: newY },
        }))
      }
    })
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

    // Generate random position within safe bounds
    const randomX = (Math.random() - 0.5) * (maxX * 1.5)
    const randomY = (Math.random() - 0.5) * (maxY * 1.5)

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
                href="mailto:abrilmarangoni@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                  <Mail className="h-5 w-5 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-light text-stone-500 dark:text-stone-500">{currentTranslations.email}</p>
                  <p className="text-sm font-light text-stone-900 dark:text-stone-100">abrilmarangoni@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+5492234141654"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                  <Phone className="h-5 w-5 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-light text-stone-500 dark:text-stone-500">{currentTranslations.phone}</p>
                  <p className="text-sm font-light text-stone-900 dark:text-stone-100">+54 9 223 414-1654</p>
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
                    transition: "transform 0.15s ease-out",
                    position: dodgePositions[index] ? "relative" : "static",
                  }}
                >
                  {text}
                </button>
              ))}

              {/* Clickable button */}
              <button
                onClick={handleHireClick}
                className="w-full px-6 py-3 text-sm font-light text-white bg-rose-500 border border-rose-500 rounded-md hover:bg-rose-600 hover:border-rose-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {currentTranslations.veryLikely}
              </button>
            </div>

            <p className="text-xs font-light text-stone-500 dark:text-stone-500 italic text-center leading-relaxed">
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
