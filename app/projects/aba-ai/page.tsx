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

        {/* BLOCK 5 — Story Section */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-16">
            The Intelligence That Connects Us
                    </h2>
          <div className="space-y-8 text-xl font-light leading-relaxed max-w-4xl">
            <p>
              ABA AI is a one-of-its-kind platform that bridges artificial intelligence and human communication. 
              It shifts into focus how AI can serve businesses of all sizes, connecting them with their customers 
              through the platforms they already use every day.
            </p>
            <p>
              The system transports the message of intelligent automation to a global audience, 
              welcoming businesses from e-commerce to gastronomy, from services to education, 
              to journey through a personalized experience tailored to their specific needs.
            </p>
            <p>
              Our desire is to remind everybody—from tech experts to small business owners—that 
              AI is fundamental to the modern business experience, and achieving true integration 
              can position artificial intelligence as an equalizer for businesses worldwide.
            </p>
            <p>
              Thanks to a multidisciplinary approach combining full-stack development, UX/UI design, 
              and strategic thinking, we could sincerely experience the transformative forces of AI 
              that unite businesses and customers—even across different languages, platforms, and industries.
            </p>
            <p>
              Built with React, TypeScript, NestJS, and OpenAI's GPT-4, ABA AI represents a complete 
              solution that understands context, learns from interactions, and responds with the 
              intelligence and empathy that modern businesses require.
            </p>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 7 — Credits (Film-Style) */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <div className="space-y-12 max-w-4xl">
            <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Agency:</h3>
              <p className="text-lg font-light opacity-80">Abril Marangoni Studio</p>
                </div>

            <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Creative Director & Developer:</h3>
              <p className="text-lg font-light opacity-80">Abril Marangoni</p>
                </div>

            <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">UI/UX Design:</h3>
              <p className="text-lg font-light opacity-80">Abril Marangoni</p>
                </div>

                        <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Full-Stack Development:</h3>
              <p className="text-lg font-light opacity-80">Abril Marangoni</p>
                </div>

                        <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Backend Architecture:</h3>
              <p className="text-lg font-light opacity-80">Abril Marangoni</p>
                          </div>

                        <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">AI Integration:</h3>
              <p className="text-lg font-light opacity-80">Abril Marangoni</p>
                </div>

                        <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Technical Stack:</h3>
              <div className="space-y-2 text-lg font-light opacity-80">
                <p>React 18.2.0, TypeScript 5.1.3, Vite 5.0.8</p>
                <p>NestJS 10.0.0, Prisma 6.16.3, PostgreSQL</p>
                <p>OpenAI GPT-4, Meta Business API</p>
                <p>Tailwind CSS, Framer Motion, Three.js</p>
                    </div>
                          </div>

                        <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Soundtrack Composer:</h3>
              <p className="text-lg font-light opacity-80">—</p>
                  </div>

                        <div>
              <h3 className="text-xl font-light tracking-wider uppercase mb-4">Producers:</h3>
              <p className="text-lg font-light opacity-80">—</p>
              </div>
            </div>
          </section>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-white/20 my-32"></div>

        {/* BLOCK 9 — Special Thanks */}
        <section className="px-8 md:px-16 py-32 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-16">
            Special Thanks
          </h2>
          <div className="space-y-6 text-xl font-light max-w-4xl">
            <p>OpenAI — For providing the GPT-4 API that powers the intelligence</p>
            <p>Meta — For the Business API integration across platforms</p>
            <p>The React & NestJS Communities — For the incredible open-source tools</p>
            <p>All the businesses that trusted us during development and testing</p>
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
