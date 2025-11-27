"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Sun, Moon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Particle {
  id: number
  x: number
  y: number
  opacity: number
  size: number
  vx: number
  vy: number
  life: number
}

export default function AbaAiProject() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [darkMode, setDarkMode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [horizontalTitle, setHorizontalTitle] = useState("Our Mission")
  const particleIdRef = useRef(0)
  const horizontalSectionRef = useRef<HTMLElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  const flowLineRef = useRef<HTMLDivElement>(null)
  const flowNodeRef = useRef<HTMLDivElement>(null)
  const flowContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Crear nuevas partículas en la posición del cursor
      const newParticles: Particle[] = []
      for (let i = 0; i < 5; i++) {
        particleIdRef.current += 1
        newParticles.push({
          id: particleIdRef.current,
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          opacity: 0.7 + Math.random() * 0.3,
          size: 4 + Math.random() * 6,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 0.8 + Math.random() * 0.4
        })
      }
      
      setParticles(prev => [...prev, ...newParticles])
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animar partículas
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        return prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.015,
            opacity: Math.max(0, p.life * p.opacity),
            vx: p.vx * 0.96,
            vy: p.vy * 0.96
          }))
          .filter(p => p.life > 0.05 && p.opacity > 0.05) // Mantener algunas partículas visibles
      })
    }, 16) // ~60fps
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Horizontal scroll effect for "THE PROBLEM & THE OPPORTUNITY" section
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
        // Calculate scroll progress (0 to 1)
        const progress = (scrollY - startScroll) / (endScroll - startScroll)
        const clampedProgress = Math.max(0, Math.min(1, progress))

        // Update title based on scroll progress (3 slides)
        if (clampedProgress < 0.33) {
          setHorizontalTitle("Our Mission")
        } else if (clampedProgress < 0.66) {
          setHorizontalTitle("THE PROBLEM & THE OPPORTUNITY")
        } else {
          setHorizontalTitle("THE SOLUTION")
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
        setHorizontalTitle("Our Mission")
        requestAnimationFrame(() => {
          track.style.transform = `translateX(0px)`
        })
      } else {
        setHorizontalTitle("THE SOLUTION")
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
  }, [])

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

        // Check proximity to each number and change color
        numberCircles.forEach((circle, index) => {
          const distance = Math.abs(newTop - stepPositions[index])
          const circleElement = circle as HTMLElement
          const textElement = stepTexts[index] as HTMLElement
          
          if (distance < 50) {
            // Node is close to this number - make it orange with glow effect
            circleElement.style.color = '#D94A00'
            circleElement.style.borderColor = '#D94A00'
            circleElement.style.boxShadow = '0 0 15px rgba(217, 74, 0, 0.5)'
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
  }

  const translations = {
    en: {
      architectureFlow: "ARCHITECTURE & FLOW",
      architecture: "Architecture",
      monorepo: "Monorepo",
      monorepoDesc: "Frontend and backend separated",
      restApi: "REST API",
      restApiDesc: "Backend with NestJS",
      multiTenant: "Multi-tenant",
      multiTenantDesc: "Each user has their own tenant/business",
      webhooks: "Webhooks",
      webhooksDesc: "Integration with Meta and Stripe",
      conversationFlow: "Conversation Flow",
      step1: "Client sends message via WhatsApp/Instagram/Facebook",
      step2: "Meta webhook receives the message",
      step3: "Backend validates and processes the webhook",
      step4: "System retrieves tenant context (products, services, FAQs, configuration)",
      step5: "Prompt is built with complete context",
      step6: "OpenAI GPT-5.1 generates contextualized response",
      step7: "Backend sends response to client via Meta API",
      step8: "Token usage and metrics are recorded",
    },
    es: {
      architectureFlow: "ARQUITECTURA & FLUJO",
      architecture: "Arquitectura",
      monorepo: "Monorepo",
      monorepoDesc: "Frontend y backend separados",
      restApi: "REST API",
      restApiDesc: "Backend con NestJS",
      multiTenant: "Multi-tenant",
      multiTenantDesc: "Cada usuario tiene su propio tenant/negocio",
      webhooks: "Webhooks",
      webhooksDesc: "Integración con Meta y Stripe",
      conversationFlow: "Flujo de Conversación",
      step1: "Cliente envía mensaje por WhatsApp/Instagram/Facebook",
      step2: "Webhook de Meta recibe el mensaje",
      step3: "Backend valida y procesa el webhook",
      step4: "Sistema recupera contexto del tenant (productos, servicios, FAQs, configuración)",
      step5: "Se construye el prompt con contexto completo",
      step6: "OpenAI GPT-5.1 genera respuesta contextualizada",
      step7: "Backend envía respuesta al cliente vía Meta API",
      step8: "Se registra el uso de tokens y métricas",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Pixel Trail Effect - White Squares */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              backgroundColor: '#ffffff',
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

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
          <div className="flex justify-between items-center">
            <div className="text-sm font-light tracking-wider">ABA AI PROJECT</div>
            <div className="flex items-center space-x-8">
            <Link
              href="/"
                className="flex items-center space-x-2 text-sm font-light hover:text-white/60 transition-colors duration-300 relative group"
            >
              <ArrowLeft className="h-4 w-4" />
                <span>{language === "en" ? "Back to Portfolio" : "Volver al Portfolio"}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>

              {/* Language Toggle */}
            <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="p-2 hover:bg-white/10 transition-colors duration-300 flex items-center space-x-1"
              >
                <Globe className="h-3 w-3" />
                <span className="text-xs font-light">{language.toUpperCase()}</span>
            </Button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-white/10 transition-colors duration-300 rounded-md"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-px bg-white/20 transition-all duration-300"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* BLOCK 1 — Hero with Large Title */}
        <section className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-16">
          <div className="max-w-7xl mx-auto text-center pt-32">
            {/* Large Title */}
            <h1 className="text-[12rem] md:text-[16rem] font-light tracking-tight uppercase leading-none mb-16">
              ABA AI
            </h1>
            
            {/* Content */}
            <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-light">FULL STACK AI PROJECT</h2>
                <p className="text-xl font-light leading-relaxed">
                  It's a SaaS conversational AI assistant platform that connects WhatsApp, Instagram, and Facebook through Meta Business API. It allows businesses to automate 24/7 customer service using OpenAI GPT-5.1, with a dashboard to manage products, services, and conversations from a single place.
                </p>
                <a
                  href="https://ab-aai-portfolio-9i71-rldhul616-marangoniiabril-9954s-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm font-light text-white hover:text-white/60 transition-colors duration-300 relative group"
                >
                  <span>Try Real Project</span>
                  <ExternalLink className="h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                </a>
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
                      Our Mission
                    </h2>
                    <div className="space-y-6 text-xl font-light leading-relaxed">
                      <p>
                        At ABA AI, we believe every business — no matter its size — deserves world-class customer support, available 24/7. Our mission is to make advanced conversational AI accessible, intuitive, and affordable for everyone.
                      </p>
                      <p>
                        We're here to remove the technical and financial barriers that kept small and growing businesses out of the AI revolution. With ABA AI, any business can set up a powerful, context-aware assistant in minutes and deliver instant, human-like responses on WhatsApp, Instagram, and Facebook.
                      </p>
                      <p>
                        We exist to empower businesses to scale their support, save time, and serve their customers better — with technology that feels simple, human, and truly helpful.
              </p>
            </div>
                </div>
                </div>

                {/* Slide 2 — THE PROBLEM & THE OPPORTUNITY */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-16">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
                      THE PROBLEM & THE OPPORTUNITY
                    </h2>
                    <div className="space-y-6 text-xl font-light leading-relaxed">
                      <p>
                        Small and medium businesses lose customers and sales every day simply because they can't reply fast enough on WhatsApp, Instagram, or Facebook. They can't offer 24/7 support without raising fixed costs, and enterprise-level AI tools are too expensive and too complex. Every unanswered message becomes lost revenue — and a customer who goes to the competition.
                      </p>
                      <p>
                        The opportunity is straightforward: conversational AI can respond instantly, scale without hiring more staff, and give smaller businesses the power to compete with big companies. It turns every message into a potential sale, improves the customer experience, and frees teams to focus on what actually drives growth — all without increasing operational costs.
                        </p>
                      </div>
                </div>
              </div>

                {/* Slide 3 — THE SOLUTION */}
                <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-16">
                  <div className="max-w-4xl w-full">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-12">
                      THE SOLUTION
                    </h2>
                    <div className="space-y-6 text-xl font-light leading-relaxed">
                      <p>
                        ABA AI connects three key points in an integrated flow:
                      </p>
                      <p className="text-2xl font-medium">
                        Business → ABA AI → Customer
                      </p>
                      <p>
                        The business configures products, services, schedules, and rules from an intuitive dashboard. It connects Meta Business with WhatsApp, Instagram, and Facebook. ABA AI integrates automatically and centralizes all conversations in one place.
                      </p>
                      <p>
                        ABA AI uses OpenAI GPT-5.1 to understand the context of each conversation. It processes with NLU, analyzes the business context, and generates natural, precise responses. All with encryption and security validation.
                      </p>
                      <p>
                        The customer receives instant responses on WhatsApp, Instagram, or Facebook. ABA AI handles inquiries, schedules appointments with Calendly, and maintains active conversations 24/7. The customer always gets a quick and accurate response.
                        </p>
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
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-16">
            TECH STACK
                    </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            {/* Frontend */}
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300 hover:bg-white/5 group">
              <h3 className="text-xl font-light tracking-wider uppercase mb-6">Frontend</h3>
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/80">
                <li>React 18.2.0 + TypeScript 5.1.3</li>
                <li>Vite 5.0.8 — Build tool y dev server</li>
                <li>Tailwind CSS 3.4.18 — Estilos utility-first</li>
                <li>Framer Motion 12.23.24 — Animaciones</li>
                <li>GSAP 3.13.0 — Animaciones avanzadas</li>
                <li>React Router DOM 7.9.3 — Navegación</li>
                <li>Zustand 5.0.8 — Estado global</li>
                <li>TanStack React Query 5.90.10 — Estado del servidor y caché</li>
                <li>React Hook Form 7.66.1 + Zod 4.1.12 — Formularios y validación</li>
                <li>Three.js + React Three Fiber — Elementos 3D</li>
                <li>Axios 1.13.2 — Cliente HTTP</li>
              </ul>
                </div>

            {/* Backend */}
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300 hover:bg-white/5 group">
              <h3 className="text-xl font-light tracking-wider uppercase mb-6">Backend</h3>
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/80">
                <li>NestJS 10.0.0 — Framework Node.js</li>
                <li>TypeScript 5.1.3 — Tipado estático</li>
                <li>Prisma 6.16.3 — ORM y gestión de base de datos</li>
                <li>PostgreSQL — Base de datos relacional</li>
                <li>Passport + JWT — Autenticación y autorización</li>
                <li>bcrypt — Hashing de contraseñas</li>
                <li>Helmet + Throttler — Seguridad y rate limiting</li>
                <li>Winston — Logging estructurado</li>
                <li>class-validator + class-transformer — Validación y transformación</li>
              </ul>
                  </div>

            {/* AI & Integrations */}
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300 hover:bg-white/5 group">
              <h3 className="text-xl font-light tracking-wider uppercase mb-6">AI & Integrations</h3>
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/80">
                <li>OpenAI GPT-5.1 — Motor de IA conversacional</li>
                <li>Meta Business API — Integración WhatsApp/Instagram/Facebook</li>
                <li>Stripe API — Pagos y suscripciones</li>
                <li>Calendly API — Gestión de reservas</li>
                    </ul>
                  </div>

            {/* DevOps & Tools */}
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300 hover:bg-white/5 group">
              <h3 className="text-xl font-light tracking-wider uppercase mb-6">DevOps & Tools</h3>
              <ul className="space-y-3 text-sm font-light leading-relaxed text-white/80">
                <li>Vercel — Deploy frontend</li>
                <li>Railway — Deploy backend</li>
                <li>Prisma Studio — Gestión de base de datos</li>
                <li>ESLint + Prettier — Code quality</li>
                    </ul>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 7 — Design System */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-20">
            DESIGN SYSTEM
                    </h2>

          {/* Color Palette */}
          <div className="mb-24">
            <h3 className="text-xl font-light tracking-wider uppercase mb-12">Color Palette</h3>
            
            {/* Primary Colors */}
            <div className="mb-12 border border-white/20 p-8">
              <h4 className="text-sm font-light uppercase mb-6 text-white/60">Primary</h4>
              <div className="flex gap-0">
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-24 bg-black border-2 border-white/30"></div>
                    <div className="py-3">
                      <p className="text-sm font-light">Black</p>
                      <p className="text-xs text-white/40">#000000</p>
                    </div>
                        </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-24 bg-white"></div>
                    <div className="py-3">
                      <p className="text-sm font-light">White</p>
                      <p className="text-xs text-white/40">#FFFFFF</p>
                      </div>
                        </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-24 border-l border-white/10" style={{ backgroundColor: '#D94A00' }}></div>
                    <div className="py-3">
                      <p className="text-sm font-light">Orange Accent</p>
                      <p className="text-xs text-white/40">#D94A00</p>
                      </div>
                        </div>
                      </div>
                    </div>

            {/* Gray Scale */}
            <div className="mb-12 border border-white/20 p-8">
              <h4 className="text-sm font-light uppercase mb-6 text-white/60">Gray Scale</h4>
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
              <h4 className="text-sm font-light uppercase mb-6 text-white/60">Transparencies & Overlays</h4>
              <div className="flex gap-0">
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-black/95 backdrop-blur-sm"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">black/95</p>
                      <p className="text-[10px] text-white/40">Header</p>
                  </div>
                </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-black/50"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">black/50</p>
                      <p className="text-[10px] text-white/40">Cards</p>
                  </div>
                  </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-white/20"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">white/20</p>
                      <p className="text-[10px] text-white/40">Borders</p>
                </div>
                    </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-white/10"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">white/10</p>
                      <p className="text-[10px] text-white/40">Dividers</p>
                  </div>
                    </div>
                  <div className="group flex-1 hover:flex-[2] transition-all duration-500">
                    <div className="h-20 bg-white/5"></div>
                    <div className="py-3 px-2">
                      <p className="text-xs font-light">white/5</p>
                      <p className="text-[10px] text-white/40">Hover</p>
                  </div>
                    </div>
                  </div>
                </div>
                  </div>

          {/* Typography */}
          <div className="mb-24">
            <h3 className="text-xl font-light tracking-wider uppercase mb-8">Typography</h3>
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300">
              <h4 className="text-sm font-light uppercase mb-8 text-white/60">Hierarchy</h4>
                  <div className="space-y-8">
                        <div>
                  <p className="text-5xl lg:text-6xl font-light text-white mb-3 leading-tight">Display Title</p>
                  <p className="text-xs text-white/40 font-mono">text-5xl lg:text-6xl, font-light, leading-tight</p>
                  </div>
                        <div>
                  <p className="text-4xl lg:text-5xl font-light text-white mb-3 leading-tight">Section Title</p>
                  <p className="text-xs text-white/40 font-mono">text-4xl lg:text-5xl, font-light, leading-tight</p>
                </div>
                        <div>
                  <p className="text-2xl lg:text-3xl font-light text-white/80 mb-3 leading-relaxed">Subtitle</p>
                  <p className="text-xs text-white/40 font-mono">text-2xl lg:text-3xl, font-light, leading-relaxed</p>
              </div>
                        <div>
                  <p className="text-base lg:text-lg font-light text-white/60 mb-3 leading-relaxed">Body text for paragraphs and longer content. This is how regular text appears throughout the interface.</p>
                  <p className="text-xs text-white/40 font-mono">text-base lg:text-lg, font-light, leading-relaxed</p>
            </div>
                        <div>
                  <p className="text-sm font-light text-white/40 mb-3">Label</p>
                  <p className="text-xs text-white/40 font-mono">text-sm, font-light</p>
                  </div>
                </div>
                  </div>
                </div>

          {/* Spacing & Layout */}
          <div className="mb-24">
            <h3 className="text-xl font-light tracking-wider uppercase mb-8">Spacing & Layout</h3>
            <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                  <h4 className="text-sm font-light uppercase mb-4 text-white/60">Containers</h4>
                  <div className="space-y-3 text-sm font-light text-white/80">
                        <div>
                      <p className="text-white mb-1">Main content</p>
                      <p className="text-xs text-white/40 font-mono">max-w-7xl (1280px)</p>
                </div>
                        <div>
                      <p className="text-white mb-1">Text content</p>
                      <p className="text-xs text-white/40 font-mono">max-w-4xl (896px)</p>
              </div>
                        <div>
                      <p className="text-white mb-1">Wide content</p>
                      <p className="text-xs text-white/40 font-mono">max-w-6xl (1152px)</p>
            </div>
                </div>
              </div>
                <div>
                  <h4 className="text-sm font-light uppercase mb-4 text-white/60">Padding</h4>
                  <div className="space-y-3 text-sm font-light text-white/80">
                    <div>
                      <p className="text-white mb-1">Horizontal padding</p>
                      <p className="text-xs text-white/40 font-mono">px-4 sm:px-6 lg:px-8</p>
            </div>
                    <div>
                      <p className="text-white mb-1">Top spacing from header</p>
                      <p className="text-xs text-white/40 font-mono">pt-[120px]</p>
                  </div>
                    <div>
                      <p className="text-white mb-1">Section spacing</p>
                      <p className="text-xs text-white/40 font-mono">mb-20 / mb-24</p>
                </div>
                    </div>
                </div>
                <div>
                  <h4 className="text-sm font-light uppercase mb-4 text-white/60">Gaps</h4>
                  <div className="space-y-3 text-sm font-light text-white/80">
                    <div>
                      <p className="text-white mb-1">Split layouts</p>
                      <p className="text-xs text-white/40 font-mono">gap-[76px]</p>
                </div>
                    <div>
                      <p className="text-white mb-1">Card spacing</p>
                      <p className="text-xs text-white/40 font-mono">gap-8</p>
              </div>
                    <div>
                      <p className="text-white mb-1">Grid spacing</p>
                      <p className="text-xs text-white/40 font-mono">gap-6</p>
            </div>
                  </div>
                </div>
                          </div>
                          </div>
                        </div>

          {/* Design Principles */}
          <div className="border border-white/20 p-8 hover:border-white/40 transition-all duration-300">
            <h3 className="text-xl font-light tracking-wider uppercase mb-6">Design Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-light text-white/80">
                        <div>
                <p className="text-white mb-2">Minimalism</p>
                <p className="text-white/60">Clean interface, generous spacing, light typography</p>
                        </div>
                        <div>
                <p className="text-white mb-2">Consistency</p>
                <p className="text-white/60">Uniform spacing, consistent colors and typography</p>
                        </div>
                        <div>
                <p className="text-white mb-2">Elegance</p>
                <p className="text-white/60">Smooth animations, subtle effects, refined palette</p>
                        </div>
                        <div>
                <p className="text-white mb-2">Accessibility</p>
                <p className="text-white/60">Adequate contrast, readable sizes, clear hover states</p>
                        </div>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 9 — Architecture & Flow */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-20">
            {t.architectureFlow}
          </h2>

          {/* Conversation Flow */}
                        <div>
            <h3 className="text-xl font-light tracking-wider uppercase mb-12">{t.conversationFlow}</h3>
            <div className="border border-white/20 p-12 hover:border-white/40 transition-all duration-300">
              <div ref={flowContainerRef} className="relative">
                {/* Vertical line - positioned at center of number circles */}
                <div 
                  ref={flowLineRef}
                  className="absolute top-6 bottom-6 w-0.5 z-20"
                  style={{ 
                    left: '24px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)',
                  }}
                ></div>
                
                {/* Animated node */}
                <div
                  ref={flowNodeRef}
                  className="absolute w-4 h-4 rounded-full bg-white z-20"
                  style={{ 
                    left: '24px',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)',
                    top: '24px'
                  }}
                ></div>
                
                <div className="space-y-16 relative">
                  {/* Flow Step 1 */}
                  <div data-step="1" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      1
                  </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step1}</p>
                  </div>
                </div>

                  {/* Flow Step 2 */}
                  <div data-step="2" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      2
                  </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step2}</p>
                  </div>
                </div>

                  {/* Flow Step 3 */}
                  <div data-step="3" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      3
                  </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step3}</p>
                  </div>
                </div>

                  {/* Flow Step 4 */}
                  <div data-step="4" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      4
                  </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step4}</p>
                </div>
                      </div>

                  {/* Flow Step 5 */}
                  <div data-step="5" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      5
                  </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step5}</p>
                </div>
                </div>

                  {/* Flow Step 6 */}
                  <div data-step="6" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      6
                        </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step6}</p>
                  </div>
                </div>

                  {/* Flow Step 7 */}
                  <div data-step="7" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      7
                </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step7}</p>
              </div>
            </div>

                  {/* Flow Step 8 */}
                  <div data-step="8" className="flex items-center gap-8 relative">
                    <div className="relative z-40 flex-shrink-0 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center text-sm font-medium text-white bg-black transition-colors duration-300">
                      8
                </div>
                    <div className="flex-1">
                      <p className="text-lg font-light text-white/90">{t.step8}</p>
                    </div>
                  </div>
                  </div>
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
