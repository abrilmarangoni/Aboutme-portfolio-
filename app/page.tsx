"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Moon, Sun, ArrowUpRight, Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { PromptingIsAllYouNeed } from "@/components/prompting-is-all-you-need"
import { SurveyModal } from "@/components/survey-modal"

type ViewState = "normal" | "glitching" | "broken"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [activeSection, setActiveSection] = useState("")
  const [isSurveyOpen, setIsSurveyOpen] = useState(false)
  const [viewState, setViewState] = useState<ViewState>("normal")
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const horizontalSectionRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  const [isHorizontalScrollActive, setIsHorizontalScrollActive] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    const savedLanguage = (localStorage.getItem("language") as "en" | "es") || "en"

    setDarkMode(isDark)
    setLanguage(savedLanguage)
    document.documentElement.classList.toggle("dark", isDark)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1, rootMargin: "-20% 0px -20% 0px" }, // Adjusted margins to trigger when section is more centered
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])
  const particleIdRef = useRef(0)
  const mousePositionRef = useRef({ x: 0, y: 0 })

  const addParticle = useCallback((x: number, y: number) => {
    const newParticle = {
      id: particleIdRef.current++,
      x,
      y,
      opacity: 1,
    }

    setParticles((prev) => [...prev.slice(-4), newParticle]) // Keep only last 5 particles
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY }

      // Add particle with slight randomness
      const offsetX = (Math.random() - 0.5) * 4
      const offsetY = (Math.random() - 0.5) * 4
      addParticle(e.clientX + offsetX, e.clientY + offsetY)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [addParticle])

  useEffect(() => {
    if (particles.length === 0) return

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            opacity: particle.opacity - 0.05,
          }))
          .filter((particle) => particle.opacity > 0),
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [particles.length])

  useEffect(() => {
    if (viewState === "glitching") {
      const timer = setTimeout(() => {
        setViewState("broken")
      }, 1500)
      return () => clearTimeout(timer)
    }

    if (viewState === "broken") {
      document.body.style.overflow = "hidden"

      const messages =
        language === "en"
          ? ["ughhh you broke it!", "i literally told you not to press it", "that's alright abi will fix it"]
          : ["ughhh lo rompiste!", "literalmente te dije que no lo presionaras", "está bien abi lo arreglará"]

      const fixCodeLines = [
        '<html blah="blah">',
        "  <head blah blah>",
        "    <title>blah blah portfolio</title>",
        "  </head>",
        "  <body blah blah blah>",
        '    <div className="blah-blah">',
        "      blah.map(blah => {",
        "        return <BlahComponent blah={blah} />",
        "      })",
        "    </div>",
        "  </body>",
        "</html>",
        "// blah blah fixed!",
      ]

      setTerminalLines([messages[0]])

      setTimeout(() => {
        setTerminalLines([messages[0], messages[1]])
      }, 1200)

      setTimeout(() => {
        setTerminalLines([messages[0], messages[1], messages[2]])
      }, 2400)

      setTimeout(() => {
        let codeIndex = 0
        const codeInterval = setInterval(() => {
          if (codeIndex < fixCodeLines.length) {
            setTerminalLines((prev) => [...prev, fixCodeLines[codeIndex]])
            codeIndex++
          } else {
            clearInterval(codeInterval)
          }
        }, 500)
      }, 3600)

      const restoreTimer = setTimeout(
        () => {
          setViewState("normal")
          setTerminalLines([])
          document.body.style.overflow = ""
        },
        3600 + fixCodeLines.length * 500 + 1200,
      )

      return () => {
        clearTimeout(restoreTimer)
        setTerminalLines([])
        document.body.style.overflow = ""
      }
    }
  }, [viewState, language])

  useEffect(() => {
    const handleScroll = () => {
      if (!horizontalSectionRef.current || !horizontalTrackRef.current) return

      const section = horizontalSectionRef.current
      const track = horizontalTrackRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      const scrollDelay = windowHeight * 0.2
      const startScroll = sectionTop + scrollDelay
      const endScroll = sectionTop + sectionHeight - windowHeight

      if (scrollY >= startScroll && scrollY <= endScroll) {
        setIsHorizontalScrollActive(true)

        // Calculate scroll progress (0 to 1)
        const progress = (scrollY - startScroll) / (endScroll - startScroll)
        const clampedProgress = Math.max(0, Math.min(1, progress))

        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        const maxTranslate = trackWidth - viewportWidth + viewportWidth * 0.3
        const translateX = -clampedProgress * maxTranslate

        // Apply smooth transform
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${translateX}px)`
        })
      } else {
        setIsHorizontalScrollActive(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const handleDoNotPress = () => {
    if (viewState !== "normal") return
    setViewState("glitching")
  }

  const t = {
    en: {
      about: "About",
      projectsLabel: "Projects",
      thoughts: "Thoughts",
      contact: "Contact",
      game: "Game",
      survey: "Survey",
      selectedWork: "Selected Work",
      thoughtsInsights: "Thoughts & Insights",
      letsConnect: "Let's Connect",
      heroTitle:
        "Hi, I'm Abi — I wrote \"Hello World\" in HTML at 12, and my entire personality quietly formed around it.",
      heroDescription1:
        "Full-Stack Developer · UX/UI Designer · Business Student",
      heroDescription2:
        "I work at the intersection of design, technology, and strategy to create useful, clear, and human solutions.",
      heroDescription3:
        "My motivation is always the same: building products with real impact, understanding people, the business, and the why behind every decision.",
      contactTitle: "I'm always building something new.",
      contactDescription:
        "Whether you're looking to collaborate on a project, discuss an opportunity, or simply want to connect — I'd love to hear from you.",
      viewProject: "View Project",
      readArticle: "Read Article",
      thoughtsDescription:
        "Exploring leadership, culture, and the human side of technology through writing and reflection.",
      projectData: {
        abaAi: {
          title: "ABA AI",
          subtitle: "Full-Stack AI Project",
          description:
            "An intelligent AI assistant that connects through Meta platforms, automatically responding to WhatsApp, Instagram, and Facebook messages. Built the complete solution including backend, frontend, and UX/UI design.",
        },
        fintech: {
          title: "Fintech Checkout System",
          subtitle: "Startup Project",
          description:
            "A real product in development using stablecoins, with smart checkout, full website, and mobile wallet dashboard.",
        },
        avance: {
          title: "Avance AI Coach",
          subtitle: "Personal Project",
          description:
            "An AI-powered personal coaching app that combines fitness tracking, personalized guidance, and motivational support to help users achieve their wellness goals.",
        },
        zalesMachine: {
          title: "ZalesMachine Website Design",
          subtitle: "Design & Code Project",
          description:
            "Complete website design and development for ZalesMachine, featuring custom UI/UX and full front-end implementation.",
        },
        trazo: {
          title: "TRAZO Architecture Studio",
          subtitle: "Website Design",
          description:
            "Complete website design for a Mar del Plata-based architectural studio, showcasing their portfolio with a minimalist aesthetic and refined visual identity.",
        },
        portfolio: {
          title: "This Portfolio",
          subtitle: "Meta Project",
          description:
            "The very website you're looking at right now. A minimal, thoughtful portfolio built with Next.js, TypeScript, and a lot of attention to detail. Open-source and human-made.",
        },
      },
      articles: {
        leadership: {
          title: "Cultures and Comfort Zones: A Leadership Journey",
          subtitle: "Medium Article",
          description:
            "Reflecting on leadership experiences in UX/UI, exploring the challenges of leading across cultures and the growth that comes from stepping outside our comfort zones.",
          date: "Dec 2024",
        },
      },
    },
    es: {
      about: "Acerca",
      projectsLabel: "Proyectos",
      thoughts: "Reflexiones",
      contact: "Contacto",
      game: "Juego",
      survey: "Encuesta",
      selectedWork: "Trabajo Seleccionado",
      thoughtsInsights: "Pensamientos e Ideas",
      letsConnect: "Conectemos",
      heroTitle:
        "Hola, soy Abi — escribí \"Hello World\" en HTML a los 12, y toda mi personalidad se formó silenciosamente alrededor de eso.",
      heroDescription1:
        "Full-Stack Developer · UX/UI Designer · Business Student",
      heroDescription2:
        "Trabajo en la intersección entre diseño, tecnología y estrategia para crear soluciones útiles, claras y humanas.",
      heroDescription3:
        "Mi motivación siempre es la misma: construir productos con impacto real, entendiendo a las personas, el negocio y el porqué detrás de cada decisión.",
      contactTitle: "Siempre estoy construyendo algo nuevo.",
      contactDescription:
        "Ya sea que busques colaborar en un proyecto, discutir una oportunidad, o simplemente quieras conectar — me encantaría saber de ti.",
      viewProject: "Ver Proyecto",
      readArticle: "Leer Artículo",
      thoughtsDescription:
        "Explorando liderazgo, cultura y el lado humano de la tecnología a través de la escritura y reflexión.",
      projectData: {
        abaAi: {
          title: "ABA AI",
          subtitle: "Proyecto Full-Stack con IA",
          description:
            "Un asistente inteligente de IA que se conecta a través de plataformas Meta, respondiendo automáticamente mensajes de WhatsApp, Instagram y Facebook. Construí la solución completa incluyendo backend, frontend y diseño UX/UI.",
        },
        fintech: {
          title: "Sistema de Pago Fintech",
          subtitle: "Proyecto Startup",
          description:
            "Un producto real en desarrollo usando stablecoins, con checkout inteligente, sitio web completo y dashboard de billetera móvil.",
        },
        zalesMachine: {
          title: "Diseño Web ZalesMachine",
          subtitle: "Proyecto de Diseño y Código",
          description:
            "Diseño y desarrollo web completo para ZalesMachine, con UI/UX personalizado e implementación front-end completa.",
        },
        avance: {
          title: "Avance AI Coach",
          subtitle: "Proyecto Personal",
          description:
            "Una app de coaching personal impulsada por IA que combina seguimiento de fitness, orientación personalizada y apoyo motivacional para ayudar a los usuarios a alcanzar sus objetivos de bienestar.",
        },
        trazo: {
          title: "Estudio de Arquitectura TRAZO",
          subtitle: "Diseño Web",
          description:
            "Diseño web completo para un estudio de arquitectura marplatense, mostrando su portafolio con una estética minimalista e identidad visual refinada.",
        },
        portfolio: {
          title: "Este Portfolio",
          subtitle: "Proyecto Meta",
          description:
            "El mismo sitio web que estás mirando ahora. Un portfolio minimalista y cuidado, construido con Next.js, TypeScript y mucha atención al detalle. Código abierto y hecho por humanos.",
        },
      },
      articles: {
        leadership: {
          title: "Culturas y Zonas de Confort: Un Viaje de Liderazgo",
          subtitle: "Artículo en Medium",
          description:
            "Reflexionando sobre experiencias de liderazgo en UX/UI, explorando los desafíos de liderar a través de culturas y el crecimiento que viene de salir de nuestras zonas de confort.",
          date: "Dic 2024",
        },
      },
    },
  }

  const currentTranslations = t[language]

  const projects = [
    {
      id: 0,
      title: currentTranslations.projectData.abaAi.title,
      subtitle: currentTranslations.projectData.abaAi.subtitle,
      description: currentTranslations.projectData.abaAi.description,
      image: "/images/mano3.png",
      year: "2024",
      href: "/projects/aba-ai",
    },
    {
      id: 1,
      title: currentTranslations.projectData.fintech.title,
      subtitle: currentTranslations.projectData.fintech.subtitle,
      description: currentTranslations.projectData.fintech.description,
      image: "/images/chatgpt-20image-2016-20nov-202025-2c-2018-10-57.png",
      year: "2024",
      href: "/projects/fintech",
    },
    {
      id: 2,
      title: currentTranslations.projectData.zalesMachine.title,
      subtitle: currentTranslations.projectData.zalesMachine.subtitle,
      description: currentTranslations.projectData.zalesMachine.description,
      image: "/images/image.jpeg",
      year: "2024",
      href: "/projects/zalesmachine",
    },
    {
      id: 3,
      title: currentTranslations.projectData.avance.title,
      subtitle: currentTranslations.projectData.avance.subtitle,
      description: currentTranslations.projectData.avance.description,
      image: "/images/screenshot-202025-11-16-20at-203.jpeg",
      year: "2024",
      href: "/projects/avance",
    },
    {
      id: 4,
      title: currentTranslations.projectData.trazo.title,
      subtitle: currentTranslations.projectData.trazo.subtitle,
      description: currentTranslations.projectData.trazo.description,
      image: "/images/trazo-cover.png",
      year: "2024",
      href: "/projects/trazo",
      externalLink: "https://trazoarquitecturaweb.vercel.app/",
    },
    {
      id: 5,
      title: currentTranslations.projectData.portfolio.title,
      subtitle: currentTranslations.projectData.portfolio.subtitle,
      description: currentTranslations.projectData.portfolio.description,
      image: "/placeholder.svg",
      year: "2024",
      href: "/projects/portfolio",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark" : ""} ${viewState === "glitching" ? "glitching" : ""}`}
    >
      {/* Particle Trail Effect - Both Light and Dark Mode */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {particles.map((particle, index) => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 rounded-full blur-[0.5px] ${darkMode ? "bg-stone-300" : "bg-stone-400"}`}
            style={{
              left: particle.x - 2,
              top: particle.y - 2,
              opacity: darkMode ? particle.opacity * 0.6 : particle.opacity * 0.3,
              transform: `scale(${0.5 + index * 0.1})`,
              boxShadow: darkMode
                ? `0 0 ${2 + index}px rgba(231, 229, 228, ${particle.opacity * 0.3})`
                : `0 0 ${1 + index * 0.5}px rgba(168, 162, 158, ${particle.opacity * 0.2})`,
            }}
          />
        ))}
      </div>
      <div className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-all duration-500">
        {/* Vertical Scroll Navigation */}
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
          <div className="flex flex-col gap-4">
            {["about", "work", "thoughts", "contact", "game"].map((section) => (
              <button
                key={section}
                onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
                className={`w-2 h-8 rounded-full transition-all duration-500 ${
                  activeSection === section
                    ? "bg-stone-900 dark:bg-stone-100"
                    : "bg-stone-300/30 dark:bg-stone-700/30 hover:bg-stone-400/60 dark:hover:bg-stone-600/60"
                }`}
                aria-label={`Navigate to ${section}`}
              />
            ))}
          </div>
        </nav>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="text-sm font-light tracking-wider">ABRIL MARANGONI</div>
              <div className="flex items-center space-x-8">
                <a
                  href="#about"
                  className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                >
                  {currentTranslations.about}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#work"
                  className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                >
                  {currentTranslations.projectsLabel}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#thoughts"
                  className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                >
                  {currentTranslations.thoughts}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#contact"
                  className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                >
                  {currentTranslations.contact}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#game"
                  className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                >
                  {currentTranslations.game}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-300"></span>
                </a>
                <button
                  onClick={() => setIsSurveyOpen(true)}
                  className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                >
                  {currentTranslations.survey}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-300"></span>
                </button>

                {/* Language Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors duration-300 flex items-center space-x-1"
                >
                  <Globe className="h-3 w-3" />
                  <span className="text-xs font-light">{language.toUpperCase()}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors duration-300"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          {/* Animated underline on scroll */}
          <div
            className="h-px bg-stone-200 dark:bg-stone-800 transition-all duration-300"
            style={{
              transform: `scaleX(${Math.min(scrollY / 100, 1)})`,
              transformOrigin: "left",
            }}
          ></div>
        </nav>

        {/* Hero Section */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center px-8 pt-24"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Portrait */}
              <div className="relative">
                <div className="relative w-80 h-96 mx-auto lg:mx-0">
                  <Image
                    src="/images/abril-portrait.jpg"
                    alt="Abril Marangoni - UX/UI Designer & Creative Technologist"
                    fill
                    className="object-cover transition-all duration-700"
                    priority
                  />
                  <div className="absolute inset-0 border border-stone-200 dark:border-stone-800 pointer-events-none"></div>
                </div>
              </div>

              {/* Introduction */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="w-12 h-px bg-stone-400 dark:bg-stone-600"></div>
                  <h1 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                    {currentTranslations.heroTitle}
                  </h1>
                </div>

                <div className="space-y-4 text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  <p className="text-stone-900 dark:text-stone-100 font-medium">{currentTranslations.heroDescription1}</p>
                  <p>{currentTranslations.heroDescription2}</p>
                  <p>{currentTranslations.heroDescription3}</p>
                </div>

                <div className="flex space-x-6 pt-4">
                  <a
                    href="mailto:abie.marangoni@gmail.com"
                    className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                  >
                    abie.marangoni@gmail.com
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abril-marangoni-49924327a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                  >
                    LinkedIn
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a
                    href="https://calendly.com/abie-marangoni/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300 relative group"
                  >
                    Calendly
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800"></div>

        {/* Selected Work - Horizontal Scroll Section */}
        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
            if (el) horizontalSectionRef.current = el
          }}
          className="relative"
          style={{ height: "600vh" }}
        >
          <div className="sticky top-0 left-0 right-0 z-10 pt-24 pb-8 px-8 bg-white dark:bg-stone-950">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {currentTranslations.selectedWork}
                </h2>
              </div>
            </div>
          </div>

          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="h-full flex items-center py-24 px-8">
              <div
                ref={horizontalTrackRef}
                className="flex transition-transform duration-75 ease-linear"
                style={{ willChange: "transform" }}
              >
                {/* Project Slides */}
                {projects.map((project, index) => (
                  <React.Fragment key={project.id}>
                    <div className="flex-shrink-0 w-screen flex items-center justify-center px-8">
                      <div className="max-w-7xl w-full">
                        <Link href={project.href} className="group cursor-pointer block">
                          <div className="flex gap-12 items-center">
                            {/* Project Image - Always on the left */}
                            <div className="relative flex-shrink-0 w-1/2">
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-left object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500"></div>
                                <div className="absolute inset-0 border border-stone-200 dark:border-stone-800 pointer-events-none"></div>
                              </div>
                            </div>

                            {/* Project Info - Always on the right */}
                            <div className="space-y-6 flex-1">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3 text-sm text-stone-500 dark:text-stone-500 font-light">
                                  <span>{project.year}</span>
                                  <span>•</span>
                                  <span>{project.subtitle}</span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-light group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors duration-300">
                                  {project.title}
                                </h3>
                              </div>

                              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-md">
                                {project.description}
                              </p>

                              <div className="flex items-center space-x-2 text-sm font-light group-hover:text-amber-600 transition-colors duration-300">
                                <span>{currentTranslations.viewProject}</span>
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                              </div>
                              {project.externalLink && (
                                <div className="flex items-center space-x-2 text-sm font-light group-hover:text-amber-600 transition-colors duration-300">
                                  <span>External Link</span>
                                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {index < projects.length - 1 && (
                      <div className="flex items-center flex-shrink-0" style={{ width: "30px" }}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800"></div>

        {/* Thoughts & Insights Section */}
        <section id="thoughts" ref={(el) => (sectionsRef.current[2] = el)} className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {currentTranslations.thoughtsInsights}
                </h2>
              </div>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-2xl">
                {currentTranslations.thoughtsDescription}
              </p>
            </div>

            {/* Article */}
            <div className="group cursor-pointer">
              <a
                href="https://medium.com/@marangonii.abril/cultures-and-comfort-zones-a-leadership-journey-29f0797a3e3f"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Article Image */}
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src="/images/cultures-comfort-zones-cover.jpg"
                        alt={currentTranslations.articles.leadership.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500"></div>
                      <div className="absolute inset-0 border border-stone-200 dark:border-stone-800 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-sm text-stone-500 dark:text-stone-500 font-light">
                        <span>{currentTranslations.articles.leadership.date}</span>
                        <span>•</span>
                        <span>{currentTranslations.articles.leadership.subtitle}</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-light group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors duration-300">
                        {currentTranslations.articles.leadership.title}
                      </h3>
                    </div>

                    <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-md">
                      {currentTranslations.articles.leadership.description}
                    </p>

                    <div className="flex items-center space-x-2 text-sm font-light group-hover:text-amber-600 transition-colors duration-300">
                      <span>{currentTranslations.readArticle}</span>
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800"></div>

        {/* Contact Section */}
        <section id="contact" ref={(el) => (sectionsRef.current[3] = el)} className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    {currentTranslations.letsConnect}
                  </h2>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl lg:text-4xl font-light leading-tight">{currentTranslations.contactTitle}</h3>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {currentTranslations.contactDescription}
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <a
                    href="mailto:abie.marangoni@gmail.com"
                    className="inline-flex items-center space-x-3 text-lg font-light hover:text-amber-600 transition-colors duration-300 group"
                  >
                    <span>abie.marangoni@gmail.com</span>
                    <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                  <div className="flex space-x-6 text-sm font-light">
                    <a
                      href="https://calendly.com/abie-marangoni/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-amber-600 transition-colors duration-300"
                    >
                      Calendly
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abril-marangoni-49924327a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-amber-600 transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800"></div>

        {/* Game Section */}
        <section
          id="game"
          ref={(el) => (sectionsRef.current[4] = el)}
          className="relative w-full overflow-hidden"
          style={{ height: '75vh' }}
        >
          <PromptingIsAllYouNeed />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800"></div>

        {/* Survey CTA Section */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-light leading-tight">
                {language === "en" ? "Had fun?" : "¿Te divertiste?"}
              </h2>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-xl mx-auto">
                {language === "en" ? (
                  <>
                    Take a quick survey and tell me what you think about working together.
                    <br />
                    IF YOU CAN ;)
                  </>
                ) : (
                  <>
                    Completa una breve encuesta y cuéntame qué piensas sobre trabajar juntos.
                    <br />
                    SI PUEDES ;)
                  </>
                )}
              </p>
              <Button
                onClick={() => setIsSurveyOpen(true)}
                className="px-8 py-6 text-base font-light bg-[#d97706] text-white hover:bg-[#b86205] transition-colors duration-300"
              >
                {language === "en" ? "Take Survey" : "Hacer Encuesta"}
              </Button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 dark:bg-stone-800"></div>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center text-sm font-light text-stone-500 dark:text-stone-500">
              <div>© 2025 Abril Marangoni</div>
              <div className="flex space-x-6">
                <a
                  href="https://www.linkedin.com/in/abril-marangoni-49924327a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://calendly.com/abie-marangoni/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  Calendly
                </a>
                <a
                  href="mailto:abie.marangoni@gmail.com"
                  className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  Gmail
                </a>
                <a href="#" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                  Resume
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* Survey Modal */}
      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        darkMode={darkMode}
        language={language}
      />

      {viewState === "broken" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950 dark:bg-black">
          <div className="max-w-3xl w-full mx-4">
            <div className="bg-stone-900 border border-stone-800 p-8 rounded font-mono text-left space-y-2">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line &&
                    (line.startsWith("//") ||
                      line.startsWith("console") ||
                      line.includes("()") ||
                      line.includes("init") ||
                      line.includes("scan") ||
                      line.includes("restore") ||
                      line.includes("rebuild") ||
                      line.includes("rollback") ||
                      line.includes("test"))
                      ? "text-amber-400 text-sm"
                      : "text-stone-100 text-base"
                  }
                >
                  {line}
                </div>
              ))}
              <div className="animate-pulse text-amber-400">▊</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
