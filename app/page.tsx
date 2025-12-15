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
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

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
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
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
          subtitle: "Full-Stack SaaS Platform",
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
          subtitle: "UX/UI AI Fitness App",
          description:
            "Capstone project for the University of Texas at Austin, graded A+. An AI-powered personal coaching app combining fitness tracking, personalized guidance, and motivational support to help users achieve their wellness goals.",
        },
        zalesMachine: {
          title: "Basement Frontend e-commerce",
          subtitle: "Frontend E-commerce Landing Page",
          description:
            "Built as part of a 2-day frontend challenge for Basement, translating a high-fidelity Figma design into a polished e-commerce landing page. Focused on UI accuracy, smooth interactions, responsive behavior, and solid performance.",
        },
        trazo: {
          title: "TRAZO Architecture Studio",
          subtitle: "Architecture Studio Website",
          description:
            "Complete UX/UI design and full frontend development for a Mar del Plata-based architectural studio, showcasing their portfolio with a minimalist aesthetic and refined visual identity.",
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
          subtitle: "Plataforma SaaS Full-Stack",
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
          title: "Basement Frontend e-commerce",
          subtitle: "Frontend E-commerce Landing Page",
          description:
            "Construido como parte de un desafío frontend de 2 días para Basement, traduciendo un diseño de alta fidelidad de Figma en una landing page de e-commerce pulida. Enfocado en precisión de UI, interacciones suaves, comportamiento responsive y rendimiento sólido.",
        },
        avance: {
          title: "Avance AI Coach",
          subtitle: "UX/UI AI Fitness App",
          description:
            "Proyecto Capstone para la Universidad de Texas en Austin, calificado con A+. Una app de coaching personal impulsada por IA que combina seguimiento de fitness, orientación personalizada y apoyo motivacional para ayudar a los usuarios a alcanzar sus objetivos de bienestar.",
        },
        trazo: {
          title: "Estudio de Arquitectura TRAZO",
          subtitle: "Architecture Studio Website",
          description:
            "Diseño UX/UI completo y desarrollo frontend completo para un estudio de arquitectura marplatense, mostrando su portafolio con una estética minimalista e identidad visual refinada.",
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
      year: "2025",
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
      image: "/images/basementog.png",
      year: "2025",
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

  // Basement Logo Component
  const BasementLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="192" height="29" viewBox="0 0 192 29" fill="none" className="h-7 w-auto">
      <path d="M6.36039 15.0305C6.52689 13.1604 7.72571 12.2599 9.99014 12.2599C13.0538 12.2599 13.6199 12.9526 13.6199 16.0348V18.6669C13.6199 21.7146 13.0538 22.4072 9.99014 22.4072C7.75901 22.4072 6.56019 21.7146 6.36039 20.3639V15.0305ZM0 0V27.706H6.16059V22.7189C6.8266 26.3207 8.99113 28.1216 12.6875 28.1216C18.8814 28.1216 20.28 26.5631 20.28 18.8054V15.8271C20.28 8.06937 18.9147 6.51091 13.0205 6.51091C9.02443 6.51091 7.093 7.44599 6.32709 10.6668V0H0Z" fill="currentColor"/>
      <path d="M29.0899 21.7835C29.0899 20.4675 29.4229 20.2251 31.1545 20.2251L36.3827 20.1905V21.0909C36.3827 22.7533 35.3504 23.3766 32.5199 23.4459H32.1868C29.5894 23.4459 29.0899 23.1688 29.0899 21.7835ZM33.8852 6.51062H32.3533C24.561 6.51062 23.0958 7.61886 23.0958 13.3332V14.1644H29.4229C29.3563 11.7748 29.9224 11.3592 33.0527 11.3592C35.8499 11.3592 36.3827 11.7748 36.3827 14.1644V15.3419L30.0556 15.3765C23.6286 15.3765 22.4298 16.3809 22.4298 21.7143C22.4298 27.2901 23.6286 28.3291 30.1555 28.1213C33.2858 28.0867 35.5169 26.8053 36.3827 24.0347V27.7057H42.7098V13.7142C42.7098 7.65349 41.3112 6.51062 33.8852 6.51062Z" fill="currentColor"/>
      <path d="M50.8411 21.1948V20.7446H44.847V21.1948C44.847 27.0131 46.2457 28.1213 53.5718 28.1213H55.1036C63.4953 28.1213 65.0271 27.1516 65.0271 22.1645C65.0271 18.9437 64.2612 17.0735 61.0644 16.1038C59.366 15.5843 57.8342 15.1687 54.5708 14.6146C52.4062 14.2683 51.8068 13.8527 51.8068 12.9869C51.8068 11.7055 52.4729 11.3592 54.9371 11.3592C57.5012 11.3592 58.2005 11.844 58.2005 13.541V14.1644H64.5276V13.541C64.5276 7.61886 63.129 6.51062 55.703 6.51062H54.1712C46.5787 6.51062 45.1468 7.48033 45.1468 12.7791C45.1468 15.5497 45.8461 17.1082 48.5767 18.1818C50.5747 18.9783 53.6051 19.4632 54.7706 19.7056C57.701 20.2597 58.4003 20.8138 58.4003 21.6797C58.4003 22.9264 57.6344 23.2727 54.7706 23.2727C51.6736 23.2727 50.8411 22.8225 50.8411 21.1948Z" fill="currentColor"/>
      <path d="M73.6021 14.6839V14.58C73.6021 11.8787 74.2015 11.3592 77.465 11.3592C80.5619 11.3592 81.2279 11.8787 81.2612 14.6839H73.6021ZM87.7548 21.0909H81.0947C81.0947 22.8918 80.5286 23.2727 77.465 23.2727C74.2015 23.2727 73.6021 22.684 73.6021 19.6363V19.5324H87.9213V16.3462V16.3116C87.9213 8.06908 86.3895 6.51062 78.1976 6.51062H76.6658C68.4738 6.51062 66.942 8.20761 66.942 17.316C66.942 26.4243 68.4738 28.1213 76.6658 28.1213H78.1976C86.2563 28.1213 87.7548 27.0131 87.7548 21.0909Z" fill="currentColor"/>
      <path d="M90.7247 6.92621V27.7057H97.0518V15.6882C97.0518 13.264 98.1507 12.0518 100.349 12.0518C102.913 12.0518 103.379 12.5713 103.379 15.2726V27.7057H109.673L109.639 15.4804C109.706 13.1947 110.805 12.0518 112.936 12.0518C115.467 12.0518 115.933 12.5713 115.933 15.2726V27.7057H122.227L122.194 14.2683C122.194 7.75739 121.061 6.51062 114.967 6.51062C111.604 6.51062 109.573 8.03445 108.84 11.3245C108.574 7.37643 107.475 6.51062 102.447 6.51062C99.4495 6.51062 97.7511 7.79202 97.0518 10.9089V6.92621H90.7247Z" fill="currentColor"/>
      <path d="M131.343 14.6839V14.58C131.343 11.8787 131.942 11.3592 135.206 11.3592C138.303 11.3592 138.969 11.8787 139.002 14.6839H131.343ZM145.495 21.0909H138.835C138.835 22.8918 138.269 23.2727 135.206 23.2727C131.942 23.2727 131.343 22.684 131.343 19.6363V19.5324H145.662V16.3462V16.3116C145.662 8.06908 144.13 6.51062 135.938 6.51062H134.406C126.214 6.51062 124.683 8.20761 124.683 17.316C124.683 26.4243 126.214 28.1213 134.406 28.1213H135.938C143.997 28.1213 145.495 27.0131 145.495 21.0909Z" fill="currentColor"/>
      <path d="M148.395 6.92621V27.7057H154.722V15.3419C154.756 13.1254 155.921 12.0518 158.219 12.0518C161.149 12.0518 161.682 12.6406 161.682 15.8268V27.7057H168.009L167.976 14.2683C167.976 7.75739 166.877 6.51062 161.083 6.51062C157.453 6.51062 155.488 7.79202 154.722 11.1514V6.92621H148.395Z" fill="currentColor"/>
      <path d="M183.938 21.8182H180.241C178.31 21.8182 177.944 21.4719 177.944 19.7056V12.4674H183.605V6.92625H177.944V2.49329H171.95V6.92625H169.619V12.4674H171.617V20.71C171.617 26.5975 172.915 27.7057 179.609 27.7057H183.938V21.8182Z" fill="currentColor"/>
      <path d="M192 21.8182H186.339V27.7058H192V21.8182Z" fill="currentColor"/>
    </svg>
  )

  // Avance Logo Component
  const AvanceLogo = () => (
    <svg width="342" height="80" viewBox="0 0 342 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
      <path d="M0 78.3432L30.1738 0H46.0216L76.3033 78.3432H61.9773L36.6891 7.94406H39.4018L14.1136 78.3432H0.00348566H0ZM17.2581 56.8262V45.2394H58.2861V56.8262H17.2581Z" fill="currentColor"/>
      <path d="M90.9569 78.3432L69.3564 24.827H83.4665L100.073 71.2807H96.0584L112.773 24.827H126.667L105.178 78.3432H90.9604H90.9569Z" fill="currentColor"/>
      <path d="M145.224 79.777C139.799 79.777 135.275 78.3433 131.657 75.4722C128.039 72.6047 126.232 68.6292 126.232 63.5561C126.232 60.763 126.719 58.4088 127.698 56.4936C128.673 54.5819 129.993 52.9995 131.661 51.7498C133.83 49.9833 136.508 48.6593 139.691 47.7778C142.874 46.8963 146.349 46.2697 150.11 45.9015C152.641 45.682 154.759 45.4059 156.458 45.0731C158.157 44.7403 159.46 44.2093 160.365 43.473C161.27 42.7366 161.723 41.6356 161.723 40.1629C161.723 37.9574 160.727 36.3183 158.739 35.2528C156.747 34.1872 153.909 33.6526 150.218 33.6526C146.816 33.6526 143.995 34.1482 141.752 35.143C139.51 36.1378 137.337 37.922 135.241 40.4957L126.232 33.7659C129.126 29.8682 132.545 27.1459 136.491 25.5988C140.433 24.0553 144.904 23.28 149.894 23.28C157.492 23.28 163.422 24.8448 167.695 27.9707C171.964 31.0966 174.099 35.6386 174.099 41.5967V78.3397H162.921V64.3279L165.961 64.8802C165.094 68.045 163.68 70.7462 161.727 72.9906C159.773 75.2351 157.402 76.9272 154.616 78.0672C151.83 79.2071 148.699 79.777 145.228 79.777H145.224ZM147.397 69.5177C150.071 69.5177 152.533 68.9867 154.776 67.9176C157.019 66.852 158.808 65.3085 160.149 63.2836C161.486 61.2621 162.158 58.777 162.158 55.8351V51.5303C161.145 52.5605 159.951 53.2791 158.575 53.6827C157.2 54.0863 155.138 54.4368 152.387 54.7306C149.925 55.0244 147.885 55.3359 146.255 55.6687C144.629 56.0015 143.163 56.5715 141.86 57.3786C140.993 57.9698 140.286 58.7203 139.743 59.6408C139.2 60.5612 138.928 61.6834 138.928 63.0074C138.928 64.9934 139.67 66.5759 141.153 67.7512C142.637 68.9301 144.716 69.5177 147.394 69.5177H147.397Z" fill="currentColor"/>
      <path d="M211.217 23.2834C217.655 23.2834 222.666 25.3084 226.249 29.3512C229.833 33.3976 231.623 39.0618 231.623 46.3439V78.3432H219.142V48.0007C219.142 43.5153 218.146 40.0955 216.158 37.7378C214.166 35.3836 211.182 34.2083 207.205 34.2083C204.384 34.2083 201.978 34.7995 199.986 35.9748C197.994 37.1537 196.459 38.7892 195.372 40.885C194.286 42.9808 193.746 45.4659 193.746 48.3334V78.3467H181.154V24.8305H192.875V42.1559L190.055 41.1611C190.417 37.2634 191.538 33.9888 193.419 31.3408C195.299 28.6928 197.796 26.6891 200.909 25.3261C204.019 23.9667 207.456 23.2834 211.22 23.2834H211.217Z" fill="currentColor"/>
      <path d="M265.268 79.9999C259.77 79.9999 254.94 78.8034 250.778 76.4138C246.617 74.0242 243.396 70.6965 241.119 66.4271C238.841 62.1612 237.699 57.2333 237.699 51.6399C237.699 46.0465 238.838 41.0301 241.119 36.7997C243.4 32.5692 246.561 29.2592 250.615 26.8696C254.665 24.48 259.407 23.2834 264.833 23.2834C269.753 23.2834 274.204 24.2605 278.184 26.2076C282.161 28.1582 285.493 31.4116 288.171 35.9713L277.86 42.0391C276.411 39.3203 274.639 37.313 272.543 36.0244C270.443 34.7393 268.092 34.0915 265.487 34.0915C262.521 34.0915 259.916 34.8101 257.673 36.2439C255.431 37.6776 253.693 39.7026 252.464 42.3117C251.231 44.9243 250.618 47.9936 250.618 51.5266C250.618 55.0597 251.252 58.2387 252.52 60.8514C253.784 63.464 255.521 65.4854 257.729 66.9191C259.937 68.3529 262.451 69.0716 265.272 69.0716C268.312 69.0716 270.895 68.3352 273.034 66.866C275.168 65.3969 276.888 63.4109 278.191 60.908L288.502 66.0943C286.113 70.5832 283.038 74.0207 279.277 76.4103C275.513 78.7998 270.847 79.9964 265.275 79.9964L265.268 79.9999Z" fill="currentColor"/>
      <path d="M317.474 79.8903C311.683 79.8903 306.711 78.6938 302.549 76.3042C298.388 73.9146 295.205 70.5869 292.998 66.3174C290.79 62.0516 289.686 57.0883 289.686 51.4206C289.686 45.7528 290.752 40.9205 292.886 36.6901C295.021 32.4596 298.078 29.185 302.058 26.8697C306.039 24.5545 310.705 23.3933 316.061 23.3933C321.416 23.3933 326.135 24.5332 330.007 26.8131C333.876 29.0929 336.846 32.2932 338.908 36.4139C340.969 40.5346 342 45.3138 342 50.7585C342 51.4949 341.962 52.2879 341.892 53.1304C341.819 53.9765 341.746 54.7306 341.676 55.3926H295.982V45.7917H335.492L329.631 48.7725C329.342 44.0642 328.019 40.386 325.668 37.7379C323.318 35.0899 320.079 33.7659 315.953 33.7659C312.913 33.7659 310.343 34.52 308.246 36.0281C306.147 37.5362 304.573 39.5965 303.525 42.2056C302.476 44.8182 301.951 47.8521 301.951 51.3073C301.951 56.9715 303.361 61.3683 306.185 64.4943C309.006 67.6202 312.77 69.185 317.474 69.185C320.441 69.185 323.171 68.5406 325.668 67.252C328.165 65.967 330.209 64.2181 331.8 62.0126L341.136 68.1902C338.601 71.794 335.345 74.6438 331.369 76.7431C327.388 78.8389 322.757 79.8868 317.474 79.8868V79.8903Z" fill="currentColor"/>
    </svg>
  )

  // Trazo Logo Component
  const TrazoLogo = () => (
    <div className="relative" style={{ top: '5px' }}>
      <Image
        src="/images/logo3.png"
        alt="TRAZO Architecture Studio"
        width={200}
        height={60}
        className="h-8 w-auto brightness-0 invert"
      />
    </div>
  )

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
                  <p>{currentTranslations.heroDescription1}</p>
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
                              <div className={`relative aspect-[16/9] overflow-hidden ${project.title === "Basement Frontend e-commerce" ? "bg-black" : ""}`}>
                                <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className={`${project.title === "Basement Frontend e-commerce" ? "object-contain" : "object-left object-cover"} group-hover:scale-105 transition-transform duration-700`}
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
                                  {project.title === "Basement Frontend e-commerce" ? (
                                    <BasementLogo />
                                  ) : project.title === "Avance AI Coach" ? (
                                    <AvanceLogo />
                                  ) : project.title === "TRAZO Architecture Studio" || project.title === "Estudio de Arquitectura TRAZO" ? (
                                    <TrazoLogo />
                                  ) : (
                                    project.title
                                  )}
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
