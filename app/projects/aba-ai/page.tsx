"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Globe, Sun, Moon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AbaAiProject() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [horizontalTitle, setHorizontalTitle] = useState("Our Mission")

  // Initialize horizontal title based on language
  useEffect(() => {
    const translations = {
      en: { mission: "Our Mission" },
      es: { mission: "Nuestra Misión" }
    }
    setHorizontalTitle(translations[language].mission)
  }, [language])
  const [hoveredTechCard, setHoveredTechCard] = useState<number | null>(null)
  const horizontalSectionRef = useRef<HTMLElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  const flowLineRef = useRef<HTMLDivElement>(null)
  const flowNodeRef = useRef<HTMLDivElement>(null)
  const flowContainerRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll effect for "THE PROBLEM & THE OPPORTUNITY" section
  useEffect(() => {
    const translations = {
      en: {
        mission: "Our Mission",
        problem: "THE PROBLEM & THE OPPORTUNITY",
        solution: "THE SOLUTION"
      },
      es: {
        mission: "Nuestra Misión",
        problem: "EL PROBLEMA & LA OPORTUNIDAD",
        solution: "LA SOLUCIÓN"
      }
    }
    const t = translations[language]

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
        // Calculate scroll progress (0 to 1)
        const progress = (scrollY - startScroll) / (endScroll - startScroll)
        const clampedProgress = Math.max(0, Math.min(1, progress))

        // Update title based on scroll progress (3 slides)
        if (clampedProgress < 0.33) {
          setHorizontalTitle(t.mission)
        } else if (clampedProgress < 0.66) {
          setHorizontalTitle(t.problem)
        } else {
          setHorizontalTitle(t.solution)
        }

        // Calculate translate to move through 3 slides (total movement = 2 * viewportWidth)
        const viewportWidth = window.innerWidth
        const totalSlides = 3
        const maxTranslate = (totalSlides - 1) * viewportWidth
        const translateX = -clampedProgress * maxTranslate

        // Apply smooth transform
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${translateX}px)`
        })
      } else if (scrollY < startScroll) {
        setHorizontalTitle(t.mission)
        requestAnimationFrame(() => {
          track.style.transform = `translateX(0px)`
        })
      } else {
        setHorizontalTitle(t.solution)
        const viewportWidth = window.innerWidth
        const totalSlides = 3
        const maxTranslate = (totalSlides - 1) * viewportWidth
        requestAnimationFrame(() => {
          track.style.transform = `translateX(${-maxTranslate}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [language])


  // Animate flow node
  useEffect(() => {
    if (!flowNodeRef.current || !flowContainerRef.current) return

    let animationFrame: number
    let currentStep = 0
    let progress = 0
    const speed = 0.008 // Velocidad de la animación

    const container = flowContainerRef.current
    const node = flowNodeRef.current
    if (!container || !node) return

    // Wait for layout then start animation
    const startAnimation = () => {
      // Get step positions (center of each number circle)
      const stepElements = container.querySelectorAll('[data-step]')
      if (stepElements.length === 0) return

      const stepPositions: number[] = []
      const numberCircles: Element[] = []
      const stepTexts: Element[] = []
      stepElements.forEach((step) => {
        const numberCircle = step.querySelector('.rounded-full')
        const stepText = step.querySelector('p')
        if (numberCircle) {
          const rect = numberCircle.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          const relativeTop = rect.top - containerRect.top + rect.height / 2
          stepPositions.push(relativeTop)
          numberCircles.push(numberCircle)
          if (stepText) {
            stepTexts.push(stepText)
          }
        }
      })

      if (stepPositions.length === 0) return

      // Set initial position
      node.style.top = `${stepPositions[0]}px`
      node.style.opacity = '1'

      const animate = () => {
        progress += speed

        if (progress >= 1) {
          progress = 0
          currentStep = (currentStep + 1) % stepPositions.length
        }

        const nextStep = (currentStep + 1) % stepPositions.length
        const currentPos = stepPositions[currentStep]
        const nextPos = stepPositions[nextStep]
        
        // Ease function (smooth)
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2

        const newTop = currentPos + (nextPos - currentPos) * easeProgress
        node.style.top = `${newTop}px`

        // Check proximity to each number and change color to orange
        numberCircles.forEach((circle, index) => {
          const distance = Math.abs(newTop - stepPositions[index])
          const circleElement = circle as HTMLElement
          const textElement = stepTexts[index] as HTMLElement
          
          if (distance < 40) {
            // Node is close to this number - make it orange with glow effect
            circleElement.style.color = '#D94A00'
            circleElement.style.borderColor = '#D94A00'
            circleElement.style.boxShadow = '0 0 12px rgba(217, 74, 0, 0.6)'
            // Also change text color to orange
            if (textElement) {
              textElement.style.color = '#D94A00'
            }
          } else {
            // Reset to white
            circleElement.style.color = 'white'
            circleElement.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            circleElement.style.boxShadow = 'none'
            // Reset text color
            if (textElement) {
              textElement.style.color = 'rgba(255, 255, 255, 0.9)'
            }
          }
        })

        animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    // Wait for layout
    const timeoutId = setTimeout(startAnimation, 500)

    return () => {
      clearTimeout(timeoutId)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [language]) // Re-run when language changes

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en"
    setLanguage(newLanguage)
  }

  const translations = {
    en: {
      backToPortfolio: "Back to Portfolio",
      projectTitle: "ABA IA PROJECT",
      heroDescription: "It's a SaaS conversational AI assistant platform that connects WhatsApp, Instagram, and Facebook through Meta Business API. It allows businesses to automate 24/7 customer service using OpenAI GPT-5.1, with a dashboard to manage products, services, and conversations from a single place.",
      missionTitle: "Our Mission",
      missionParagraph1: "At ABA AI, we believe every business — no matter its size — deserves world-class customer support, available 24/7. Our mission is to make advanced conversational AI accessible, intuitive, and affordable for everyone.",
      missionParagraph2: "We're here to remove the technical and financial barriers that kept small and growing businesses out of the AI revolution. With ABA AI, any business can set up a powerful, context-aware assistant in minutes and deliver instant, human-like responses on WhatsApp, Instagram, and Facebook.",
      missionParagraph3: "We exist to empower businesses to scale their support, save time, and serve their customers better — with technology that feels simple, human, and truly helpful.",
      problemOpportunityTitle: "THE PROBLEM & THE OPPORTUNITY",
      problemOpportunityParagraph1: "Small and medium businesses lose customers and sales every day simply because they can't reply fast enough on WhatsApp, Instagram, or Facebook. They can't offer 24/7 support without raising fixed costs, and enterprise-level AI tools are too expensive and too complex. Every unanswered message becomes lost revenue — and a customer who goes to the competition.",
      problemOpportunityParagraph2: "The opportunity is straightforward: conversational AI can respond instantly, scale without hiring more staff, and give smaller businesses the power to compete with big companies. It turns every message into a potential sale, improves the customer experience, and frees teams to focus on what actually drives growth — all without increasing operational costs.",
      solutionTitle: "THE SOLUTION",
      solutionParagraph1: "ABA AI connects three key points in an integrated flow:",
      solutionParagraph2: "Business → ABA AI → Customer",
      solutionParagraph3: "The business configures products, services, schedules, and rules from an intuitive dashboard. It connects Meta Business with WhatsApp, Instagram, and Facebook. ABA AI integrates automatically and centralizes all conversations in one place.",
      solutionParagraph4: "ABA AI uses OpenAI GPT-5.1 to understand the context of each conversation. It processes with NLU, analyzes the business context, and generates natural, precise responses. All with encryption and security validation.",
      solutionParagraph5: "The customer receives instant responses on WhatsApp, Instagram, or Facebook. ABA AI handles inquiries, schedules appointments with Calendly, and maintains active conversations 24/7. The customer always gets a quick and accurate response.",
      techStackTitle: "TECH STACK",
      architectureFlow: "ARCHITECTURE & FLOW",
      conversationFlow: "Conversation Flow",
      step1: "Client sends message via WhatsApp/Instagram/Facebook",
      step2: "Meta webhook receives the message",
      step3: "Backend validates and processes the webhook",
      step4: "System retrieves tenant context (products, services, FAQs, configuration)",
      step5: "Prompt is built with complete context",
      step6: "OpenAI GPT-5.1 generates contextualized response",
      step7: "Backend sends response to client via Meta API",
      step8: "Token usage and metrics are recorded",
      designSystemTitle: "DESIGN SYSTEM",
      colorPalette: "Color Palette",
      primaryColors: "Primary Colors",
      black: "Black",
      white: "White",
      orangeAccent: "Orange Accent",
      grayScale: "Gray Scale",
      transparenciesOverlays: "Transparencies & Overlays",
      header: "Header",
      cards: "Cards",
      borders: "Borders",
      dividers: "Dividers",
      hover: "Hover",
      typography: "Typography",
      hierarchy: "Hierarchy",
      spacingLayout: "Spacing & Layout",
      containers: "Containers",
      padding: "Padding",
      gaps: "Gaps",
      designPrinciples: "Design Principles",
      fullStackSaaS: "Full-Stack SaaS Platform",
      builtBy: "built and design by abi marangoni",
      primary: "Primary",
      displayTitle: "Display Title",
      sectionTitle: "Section Title",
      subtitle: "Subtitle",
      bodyText: "Body text for paragraphs and longer content. This is how regular text appears throughout the interface.",
      label: "Label",
      mainContent: "Main content",
      textContent: "Text content",
      wideContent: "Wide content",
      horizontalPadding: "Horizontal padding",
      topSpacing: "Top spacing from header",
      sectionSpacing: "Section spacing",
      splitLayouts: "Split layouts",
      cardSpacing: "Card spacing",
      gridSpacing: "Grid spacing",
      minimalism: "Minimalism",
      minimalismDesc: "Clean interface, generous spacing, light typography",
      consistency: "Consistency",
      consistencyDesc: "Uniform spacing, consistent colors and typography",
      elegance: "Elegance",
      eleganceDesc: "Smooth animations, subtle effects, refined palette",
      accessibility: "Accessibility",
      accessibilityDesc: "Adequate contrast, readable sizes, clear hover states",
      privacy: "Privacy",
      cookies: "Cookies",
    },
    es: {
      backToPortfolio: "Volver al Portfolio",
      projectTitle: "PROYECTO ABA IA",
      heroDescription: "Es una plataforma SaaS de asistente de IA conversacional que conecta WhatsApp, Instagram y Facebook a través de Meta Business API. Permite a empresas automatizar atención al cliente 24/7 usando OpenAI GPT-5.1, con un dashboard para gestionar productos, servicios y conversaciones desde un solo lugar.",
      missionTitle: "Nuestra Misión",
      missionParagraph1: "En ABA AI, creemos que cada negocio — sin importar su tamaño — merece atención al cliente de clase mundial, disponible 24/7. Nuestra misión es hacer que la IA conversacional avanzada sea accesible, intuitiva y asequible para todos.",
      missionParagraph2: "Estamos aquí para eliminar las barreras técnicas y financieras que mantuvieron a las pequeñas y medianas empresas fuera de la revolución de la IA. Con ABA AI, cualquier negocio puede configurar un asistente potente y consciente del contexto en minutos y entregar respuestas instantáneas y humanas en WhatsApp, Instagram y Facebook.",
      missionParagraph3: "Existimos para empoderar a las empresas a escalar su soporte, ahorrar tiempo y servir mejor a sus clientes — con tecnología que se siente simple, humana y verdaderamente útil.",
      problemOpportunityTitle: "EL PROBLEMA & LA OPORTUNIDAD",
      problemOpportunityParagraph1: "Las pequeñas y medianas empresas pierden clientes y ventas todos los días simplemente porque no pueden responder lo suficientemente rápido en WhatsApp, Instagram o Facebook. No pueden ofrecer soporte 24/7 sin aumentar los costos fijos, y las herramientas de IA de nivel empresarial son demasiado caras y complejas. Cada mensaje sin respuesta se convierte en ingresos perdidos — y un cliente que se va a la competencia.",
      problemOpportunityParagraph2: "La oportunidad es clara: la IA conversacional puede responder instantáneamente, escalar sin contratar más personal y dar a las empresas más pequeñas el poder de competir con las grandes empresas. Convierte cada mensaje en una venta potencial, mejora la experiencia del cliente y libera a los equipos para enfocarse en lo que realmente impulsa el crecimiento — todo sin aumentar los costos operativos.",
      solutionTitle: "LA SOLUCIÓN",
      solutionParagraph1: "ABA AI conecta tres puntos clave en un flujo integrado:",
      solutionParagraph2: "Negocio → ABA AI → Cliente",
      solutionParagraph3: "El negocio configura productos, servicios, horarios y reglas desde un dashboard intuitivo. Conecta Meta Business con WhatsApp, Instagram y Facebook. ABA AI se integra automáticamente y centraliza todas las conversaciones en un solo lugar.",
      solutionParagraph4: "ABA AI utiliza OpenAI GPT-5.1 para entender el contexto de cada conversación. Procesa con NLU, analiza el contexto del negocio y genera respuestas naturales y precisas. Todo con encriptación y validación de seguridad.",
      solutionParagraph5: "El cliente recibe respuestas instantáneas en WhatsApp, Instagram o Facebook. ABA AI maneja consultas, organiza citas con Calendly y mantiene conversaciones activas 24/7. El cliente siempre obtiene una respuesta rápida y precisa.",
      techStackTitle: "STACK TECNOLÓGICO",
      architectureFlow: "ARQUITECTURA & FLUJO",
      conversationFlow: "Flujo de Conversación",
      step1: "Cliente envía mensaje por WhatsApp/Instagram/Facebook",
      step2: "Webhook de Meta recibe el mensaje",
      step3: "Backend valida y procesa el webhook",
      step4: "Sistema recupera contexto del tenant (productos, servicios, FAQs, configuración)",
      step5: "Se construye el prompt con contexto completo",
      step6: "OpenAI GPT-5.1 genera respuesta contextualizada",
      step7: "Backend envía respuesta al cliente vía Meta API",
      step8: "Se registra el uso de tokens y métricas",
      designSystemTitle: "SISTEMA DE DISEÑO",
      colorPalette: "Paleta de Colores",
      primaryColors: "Colores Primarios",
      black: "Negro",
      white: "Blanco",
      orangeAccent: "Acento Naranja",
      grayScale: "Escala de Grises",
      transparenciesOverlays: "Transparencias y Overlays",
      header: "Header",
      cards: "Tarjetas",
      borders: "Bordes",
      dividers: "Divisores",
      hover: "Hover",
      typography: "Tipografía",
      hierarchy: "Jerarquía",
      spacingLayout: "Espaciado y Diseño",
      containers: "Contenedores",
      padding: "Padding",
      gaps: "Espacios",
      designPrinciples: "Principios de Diseño",
      fullStackSaaS: "Plataforma SaaS Full-Stack",
      builtBy: "construido y diseñado por abi marangoni",
      primary: "Primarios",
      displayTitle: "Título Principal",
      sectionTitle: "Título de Sección",
      subtitle: "Subtítulo",
      bodyText: "Texto de cuerpo para párrafos y contenido largo. Así aparece el texto regular en toda la interfaz.",
      label: "Etiqueta",
      mainContent: "Contenido principal",
      textContent: "Contenido de texto",
      wideContent: "Contenido amplio",
      horizontalPadding: "Padding horizontal",
      topSpacing: "Espaciado superior desde header",
      sectionSpacing: "Espaciado de sección",
      splitLayouts: "Layouts divididos",
      cardSpacing: "Espaciado de tarjetas",
      gridSpacing: "Espaciado de grid",
      minimalism: "Minimalismo",
      minimalismDesc: "Interfaz limpia, espaciado generoso, tipografía ligera",
      consistency: "Consistencia",
      consistencyDesc: "Espaciado uniforme, colores y tipografía consistentes",
      elegance: "Elegancia",
      eleganceDesc: "Animaciones suaves, efectos sutiles, paleta refinada",
      accessibility: "Accesibilidad",
      accessibilityDesc: "Contraste adecuado, tamaños legibles, estados hover claros",
      privacy: "Privacidad",
      cookies: "Cookies",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Vertical Lines - Left and Right - Aligned 5px before "A" of ABOUT */}
      <div 
        className="fixed top-0 bottom-0 w-px bg-white/40 z-40" 
        style={{ left: 'max(27px, calc(50vw - 640px - 5px))' }}
      ></div>
      <div 
        className="fixed top-0 bottom-0 w-px bg-white/40 z-40" 
        style={{ right: 'max(27px, calc(50vw - 640px - 5px))' }}
      ></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center relative">
            {/* Left: Back to Portfolio */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-sm font-light hover:text-white/60 transition-colors duration-300 relative group"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{translations[language].backToPortfolio}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Center: ABA IA PROJECT */}
            <div className="text-sm font-light tracking-wider absolute left-1/2 transform -translate-x-1/2">
              {translations[language].projectTitle}
            </div>

            {/* Right: Language Toggle */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="p-2 hover:bg-white/10 transition-colors duration-300 flex items-center space-x-1"
              >
                <Globe className="h-3 w-3" />
                <span className="text-xs font-light">{language.toUpperCase()}</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="h-px bg-white/20 transition-all duration-300"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* BLOCK 1 — Hero */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto text-center w-full px-8 md:px-16" style={{ paddingTop: 'calc(128px + 50px)' }}>
            {/* Content */}
            <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-thin">ABA IA</h2>
                <p className="text-xl font-light leading-relaxed">
                  {t.heroDescription}
                </p>
              </div>
                </div>
              </div>
          {/* Image - aligned exactly with vertical lines */}
          <div 
            className="w-full"
            style={{
              marginTop: 'calc(24px - 200px)',
              paddingLeft: 'max(27px, calc(50vw - 640px - 5px))',
              paddingRight: 'max(27px, calc(50vw - 640px - 5px))'
            }}
          >
            <div className="overflow-hidden w-full select-none" style={{ userSelect: 'none' }}>
                <Image
                src="/images/MANO2.png"
                alt="ABA IA"
                width={1300}
                height={820}
                className="w-full h-auto object-cover grayscale opacity-40 pointer-events-none select-none"
                style={{ 
                  transform: 'rotate(-10deg) scale(1.00)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  WebkitUserSelect: 'none'
                } as React.CSSProperties}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                  priority
                />
              </div>
            </div>
          {/* Footer info after image */}
          <div className="max-w-7xl mx-auto text-center w-full px-8 md:px-16" style={{ marginTop: 'calc(24px - 80px)' }}>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-2">
                <p className="text-sm font-light text-white/60">{t.fullStackSaaS}</p>
                <p className="text-sm font-light text-white/60">{t.builtBy}</p>
                <p className="text-sm font-light text-white/60">2025</p>
                </div>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 2, 3 & 4 — Horizontal Scroll Section (Our Mission + The Problem & The Opportunity + The Solution) */}
        <section
          ref={horizontalSectionRef}
          className="relative"
          style={{ height: "450vh" }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="h-full flex items-center">
              <div
                ref={horizontalTrackRef}
                className="flex transition-transform duration-100 ease-out"
                style={{ willChange: "transform" }}
              >
                {/* Slide 1 — Our Mission */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-16">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
                      {t.missionTitle}
                    </h2>
                    <div className="space-y-6 text-xl font-light leading-relaxed">
                      <p>{t.missionParagraph1}</p>
                      <p>{t.missionParagraph2}</p>
                      <p>{t.missionParagraph3}</p>
                        </div>
                      </div>
                </div>

                {/* Slide 2 — THE PROBLEM & THE OPPORTUNITY */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-16">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
                      {t.problemOpportunityTitle}
                    </h2>
                    <div className="space-y-6 text-xl font-light leading-relaxed">
                      <p>{t.problemOpportunityParagraph1}</p>
                      <p>{t.problemOpportunityParagraph2}</p>
                  </div>
                      </div>
                    </div>

                {/* Slide 3 — THE SOLUTION */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-16">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
                      {t.solutionTitle}
                    </h2>
                    <div className="space-y-6 text-xl font-light leading-relaxed">
                      <p>{t.solutionParagraph1}</p>
                      <p className="text-2xl font-medium">{t.solutionParagraph2}</p>
                      <p>{t.solutionParagraph3}</p>
                      <p>{t.solutionParagraph4}</p>
                      <p>{t.solutionParagraph5}</p>
                  </div>
                </div>
                    </div>
                </div>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 5 — Tech Stack */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
            {t.techStackTitle}
                    </h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onMouseLeave={() => setHoveredTechCard(null)}
          >
            {/* Frontend */}
            <div 
              className={`border border-white/20 p-6 transition-all duration-500 ease-out group cursor-pointer ${
                hoveredTechCard === 0 
                  ? 'scale-105 border-[#D94A00]/60 shadow-[0_0_30px_rgba(217,74,0,0.15)]' 
                  : hoveredTechCard !== null 
                    ? 'scale-95 opacity-50' 
                    : 'hover:border-white/40'
              }`}
              onMouseEnter={() => setHoveredTechCard(0)}
            >
              <h3 className="text-lg font-light tracking-wider uppercase mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm font-light text-white/80 mb-6">
                <li>React 18 + TypeScript</li>
                <li>Vite — Build tool</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion + GSAP</li>
                <li>React Router DOM</li>
                <li>Zustand + TanStack Query</li>
              </ul>
              <Link 
                href="/projects/aba-ai/code#frontend" 
                className="inline-flex items-center gap-2 text-xs font-light text-[#D94A00] hover:text-[#ff6b1a] transition-colors duration-300"
              >
                <span>View Code</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
                </div>

            {/* Backend */}
            <div 
              className={`border border-white/20 p-6 transition-all duration-500 ease-out group cursor-pointer ${
                hoveredTechCard === 1 
                  ? 'scale-105 border-[#D94A00]/60 shadow-[0_0_30px_rgba(217,74,0,0.15)]' 
                  : hoveredTechCard !== null 
                    ? 'scale-95 opacity-50' 
                    : 'hover:border-white/40'
              }`}
              onMouseEnter={() => setHoveredTechCard(1)}
            >
              <h3 className="text-lg font-light tracking-wider uppercase mb-4">Backend</h3>
              <ul className="space-y-2 text-sm font-light text-white/80 mb-6">
                <li>NestJS + TypeScript</li>
                <li>Prisma + PostgreSQL</li>
                <li>Passport + JWT</li>
                <li>Helmet + Throttler</li>
                <li>Winston Logger</li>
              </ul>
              <Link 
                href="/projects/aba-ai/code#backend" 
                className="inline-flex items-center gap-2 text-xs font-light text-[#D94A00] hover:text-[#ff6b1a] transition-colors duration-300"
              >
                <span>View Code</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
                    </div>

            {/* AI & Integrations */}
            <div 
              className={`border border-white/20 p-6 transition-all duration-500 ease-out group cursor-pointer ${
                hoveredTechCard === 2 
                  ? 'scale-105 border-[#D94A00]/60 shadow-[0_0_30px_rgba(217,74,0,0.15)]' 
                  : hoveredTechCard !== null 
                    ? 'scale-95 opacity-50' 
                    : 'hover:border-white/40'
              }`}
              onMouseEnter={() => setHoveredTechCard(2)}
            >
              <h3 className="text-lg font-light tracking-wider uppercase mb-4">AI & Integrations</h3>
              <ul className="space-y-2 text-sm font-light text-white/80 mb-6">
                <li>OpenAI GPT-5.1</li>
                <li>Meta Business API</li>
                <li>Stripe API</li>
                <li>Calendly API</li>
              </ul>
              <Link 
                href="/projects/aba-ai/code#ai" 
                className="inline-flex items-center gap-2 text-xs font-light text-[#D94A00] hover:text-[#ff6b1a] transition-colors duration-300"
              >
                <span>View Code</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
                    </div>

            {/* DevOps */}
            <div 
              className={`border border-white/20 p-6 transition-all duration-500 ease-out group cursor-pointer ${
                hoveredTechCard === 3 
                  ? 'scale-105 border-[#D94A00]/60 shadow-[0_0_30px_rgba(217,74,0,0.15)]' 
                  : hoveredTechCard !== null 
                    ? 'scale-95 opacity-50' 
                    : 'hover:border-white/40'
              }`}
              onMouseEnter={() => setHoveredTechCard(3)}
            >
              <h3 className="text-lg font-light tracking-wider uppercase mb-4">DevOps</h3>
              <ul className="space-y-2 text-sm font-light text-white/80 mb-6">
                <li>Vercel — Frontend</li>
                <li>Railway — Backend</li>
                <li>Prisma Studio</li>
                <li>ESLint + Prettier</li>
              </ul>
              <Link 
                href="/projects/aba-ai/code#devops" 
                className="inline-flex items-center gap-2 text-xs font-light text-[#D94A00] hover:text-[#ff6b1a] transition-colors duration-300"
              >
                <span>View Code</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-16"></div>

        {/* BLOCK 6 — Architecture Flow */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
            {t.architectureFlow}
                    </h2>
          <div ref={flowContainerRef} className="relative max-w-2xl">
            {/* Vertical line - white */}
            <div 
              ref={flowLineRef}
              className="absolute top-5 bottom-5 w-0.5 z-20"
              style={{ 
                left: '21px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)',
              }}
            ></div>
            
            {/* Animated node - orange */}
            <div
              ref={flowNodeRef}
              className="absolute w-3 h-3 rounded-full z-20"
              style={{ 
                left: '21px',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#D94A00',
                boxShadow: '0 0 15px rgba(217,74,0,0.9), 0 0 30px rgba(217,74,0,0.5)',
                top: '21px'
              }}
            ></div>
            
            <div className="space-y-7 relative">
              <div data-step="1" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">1</div>
                <p className="text-sm font-light text-white/90">{t.step1}</p>
                      </div>
              <div data-step="2" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">2</div>
                <p className="text-sm font-light text-white/90">{t.step2}</p>
                    </div>
              <div data-step="3" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">3</div>
                <p className="text-sm font-light text-white/90">{t.step3}</p>
                  </div>
              <div data-step="4" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">4</div>
                <p className="text-sm font-light text-white/90">{t.step4}</p>
                      </div>
              <div data-step="5" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">5</div>
                <p className="text-sm font-light text-white/90">{t.step5}</p>
                    </div>
              <div data-step="6" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">6</div>
                <p className="text-sm font-light text-white/90">{t.step6}</p>
                      </div>
              <div data-step="7" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">7</div>
                <p className="text-sm font-light text-white/90">{t.step7}</p>
                    </div>
              <div data-step="8" className="flex items-center gap-5 relative">
                <div className="relative z-40 flex-shrink-0 w-[42px] h-[42px] border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">8</div>
                <p className="text-sm font-light text-white/90">{t.step8}</p>
                </div>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 7 — Design System */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-20">
            {t.designSystemTitle}
                    </h2>

          {/* Color Palette */}
          <div className="mb-24">
            <h3 className="text-xl font-light tracking-wider uppercase mb-12">{t.colorPalette}</h3>
            
            {/* Primary Colors */}
            <div className="mb-12 border border-white/20 p-8">
              <h4 className="text-sm font-light uppercase mb-6 text-white/60">{t.primaryColors}</h4>
              <div className="flex gap-0">
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-24 bg-black border-2 border-white/30"></div>
                    <div className="py-3">
                      <p className="text-sm font-light">{t.black}</p>
                      <p className="text-xs text-white/40">#000000</p>
                    </div>
                  </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-24 bg-white"></div>
                    <div className="py-3">
                      <p className="text-sm font-light">{t.white}</p>
                      <p className="text-xs text-white/40">#FFFFFF</p>
                    </div>
                  </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-24 border-l border-white/10" style={{ backgroundColor: '#D94A00' }}></div>
                    <div className="py-3">
                      <p className="text-sm font-light">{t.orangeAccent}</p>
                      <p className="text-xs text-white/40">#D94A00</p>
                    </div>
                  </div>
                </div>
                  </div>

            {/* Gray Scale */}
            <div className="mb-12 border border-white/20 p-8">
              <h4 className="text-sm font-light uppercase mb-6 text-white/60">{t.grayScale}</h4>
              <div className="flex gap-0">
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-white"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">white</p>
                  </div>
                </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-100"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-100</p>
              </div>
            </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-200"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-200</p>
                  </div>
                </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-300"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-300</p>
                  </div>
                  </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-400"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-400</p>
                  </div>
                </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-500"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-500</p>
                </div>
              </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-600"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-600</p>
            </div>
                </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-700"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-700</p>
              </div>
            </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-800"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-800</p>
                  </div>
                </div>
                  <div className="group flex-1 hover:flex-[1.5] transition-all duration-500">
                    <div className="h-20 bg-gray-900"></div>
                    <div className="py-3">
                      <p className="text-xs font-light text-white/60">gray-900</p>
                    </div>
                </div>
                </div>
              </div>

            {/* Transparencies */}
            <div className="border border-white/20 p-8">
              <h4 className="text-sm font-light uppercase mb-6 text-white/60">{t.transparenciesOverlays}</h4>
              <div className="flex gap-0">
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-black/95 backdrop-blur-sm"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">black/95</p>
                      <p className="text-[10px] text-white/40">{t.header}</p>
                  </div>
                </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-black/50"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">black/50</p>
                      <p className="text-[10px] text-white/40">{t.cards}</p>
                          </div>
                          </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-white/20"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">white/20</p>
                      <p className="text-[10px] text-white/40">{t.borders}</p>
                        </div>
                          </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-white/10"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">white/10</p>
                      <p className="text-[10px] text-white/40">{t.dividers}</p>
                          </div>
                        </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-white/5"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">white/5</p>
                      <p className="text-[10px] text-white/40">{t.hover}</p>
                      </div>
                        </div>
                      </div>
                    </div>
                </div>

          {/* Typography */}
          <div className="mb-24">
            <h3 className="text-xl font-light tracking-wider uppercase mb-8">{t.typography}</h3>
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300">
              <h4 className="text-sm font-light uppercase mb-8 text-white/60">{t.hierarchy}</h4>
                  <div className="space-y-8">
                        <div>
                  <p className="text-5xl lg:text-6xl font-light text-white mb-3 leading-tight">{t.displayTitle}</p>
                  <p className="text-xs text-white/40 font-mono">text-5xl lg:text-6xl, font-light, leading-tight</p>
                    </div>
                        <div>
                  <p className="text-4xl lg:text-5xl font-light text-white mb-3 leading-tight">{t.sectionTitle}</p>
                  <p className="text-xs text-white/40 font-mono">text-4xl lg:text-5xl, font-light, leading-tight</p>
                        </div>
                        <div>
                  <p className="text-2xl lg:text-3xl font-light text-white/80 mb-3 leading-relaxed">{t.subtitle}</p>
                  <p className="text-xs text-white/40 font-mono">text-2xl lg:text-3xl, font-light, leading-relaxed</p>
                        </div>
                        <div>
                  <p className="text-base lg:text-lg font-light text-white/60 mb-3 leading-relaxed">{t.bodyText}</p>
                  <p className="text-xs text-white/40 font-mono">text-base lg:text-lg, font-light, leading-relaxed</p>
                        </div>
                        <div>
                  <p className="text-sm font-light text-white/40 mb-3">{t.label}</p>
                  <p className="text-xs text-white/40 font-mono">text-sm, font-light</p>
                        </div>
                </div>
                  </div>
                  </div>

          {/* Spacing & Layout */}
          <div className="mb-24">
            <h3 className="text-xl font-light tracking-wider uppercase mb-8">{t.spacingLayout}</h3>
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                  <h4 className="text-sm font-light uppercase mb-4 text-white/60">{t.containers}</h4>
                  <div className="space-y-3 text-sm font-light text-white/80">
                        <div>
                      <p className="text-white mb-1">{t.mainContent}</p>
                      <p className="text-xs text-white/40 font-mono">max-w-7xl (1280px)</p>
                        </div>
                        <div>
                      <p className="text-white mb-1">{t.textContent}</p>
                      <p className="text-xs text-white/40 font-mono">max-w-4xl (896px)</p>
                        </div>
                        <div>
                      <p className="text-white mb-1">{t.wideContent}</p>
                      <p className="text-xs text-white/40 font-mono">max-w-6xl (1152px)</p>
                        </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-light uppercase mb-4 text-white/60">{t.padding}</h4>
                  <div className="space-y-3 text-sm font-light text-white/80">
                    <div>
                      <p className="text-white mb-1">{t.horizontalPadding}</p>
                      <p className="text-xs text-white/40 font-mono">px-4 sm:px-6 lg:px-8</p>
              </div>
                    <div>
                      <p className="text-white mb-1">{t.topSpacing}</p>
                      <p className="text-xs text-white/40 font-mono">pt-[120px]</p>
            </div>
                    <div>
                      <p className="text-white mb-1">{t.sectionSpacing}</p>
                      <p className="text-xs text-white/40 font-mono">mb-20 / mb-24</p>
                  </div>
                </div>
                  </div>
                <div>
                  <h4 className="text-sm font-light uppercase mb-4 text-white/60">{t.gaps}</h4>
                  <div className="space-y-3 text-sm font-light text-white/80">
                    <div>
                      <p className="text-white mb-1">{t.splitLayouts}</p>
                      <p className="text-xs text-white/40 font-mono">gap-[76px]</p>
                  </div>
                    <div>
                      <p className="text-white mb-1">{t.cardSpacing}</p>
                      <p className="text-xs text-white/40 font-mono">gap-8</p>
                </div>
                    <div>
                      <p className="text-white mb-1">{t.gridSpacing}</p>
                      <p className="text-xs text-white/40 font-mono">gap-6</p>
                  </div>
                  </div>
                </div>
                  </div>
                  </div>
                </div>

          {/* Design Principles */}
          <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300">
            <h3 className="text-xl font-light tracking-wider uppercase mb-6">{t.designPrinciples}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-light text-white/80">
                        <div>
                <p className="text-white mb-2">{t.minimalism}</p>
                <p className="text-white/60">{t.minimalismDesc}</p>
                  </div>
                        <div>
                <p className="text-white mb-2">{t.consistency}</p>
                <p className="text-white/60">{t.consistencyDesc}</p>
                </div>
                        <div>
                <p className="text-white mb-2">{t.elegance}</p>
                <p className="text-white/60">{t.eleganceDesc}</p>
                      </div>
                        <div>
                <p className="text-white mb-2">{t.accessibility}</p>
                <p className="text-white/60">{t.accessibilityDesc}</p>
                </div>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 11 — Legal Footer */}
        <footer className="px-8 md:px-16 py-24 max-w-7xl mx-auto">
          <div className="space-y-4 text-lg font-light mb-12">
            <p>Abril Marangoni</p>
            <p>Buenos Aires, Argentina</p>
                    </div>
          <div className="space-y-2 text-lg font-light">
            <a href="#" className="block hover:opacity-60 transition-opacity duration-300">
              Privacy
            </a>
            <a href="#" className="block hover:opacity-60 transition-opacity duration-300">
              Cookies
            </a>
        </div>
      </footer>
      </main>
    </div>
  )
}
