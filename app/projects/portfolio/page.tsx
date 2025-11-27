"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Code2, Sparkles, Heart, Coffee, Palette, Zap, Globe, GraduationCap, Briefcase, Laptop, Bot, RefreshCw, Clock } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PortfolioProject() {
  const [scrollY, setScrollY] = useState(0)
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [skillView, setSkillView] = useState<"technical" | "human">("technical")
  const [showAlternate, setShowAlternate] = useState(false)
  const [showHours, setShowHours] = useState(false)

  useEffect(() => {
    const savedLanguage = (localStorage.getItem("language") as "en" | "es") || "en"
    setLanguage(savedLanguage)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const t = {
    en: {
      back: "Back to Home",
      title: "THIS PORTFOLIO",
      subtitle: "Designed, Developed & Hyper-Figured-Out by Me",
      tagline: "A self-built playground and storefront for everything I am — and becoming.",
      overview: "Overview",
      overviewText: "I built this portfolio from scratch — no templates, no shortcuts. It's meant to reflect how I think: structured, curious, and a little bit playful. Stack: Figma → React + Next.js → Tailwind → Vercel → (and yes, some stubborn debugging). It's not perfect. Neither am I. But I'm proud of it.",
      aboutMe: "About Me",
      education: "Bachelor of Business Administration (in progress)",
      educationDesc: "Because design means nothing if you don't understand how things work.",
      designer: "UX/UI Designer since 2022",
      designerDesc: "I craft interfaces with intention, iterate hard, and avoid designing anything I wouldn't personally use.",
      developer: "Full Stack Developer (React, JS, API-driven products)",
      developerDesc: "Not a backend guru yet — but enough to get things done.",
      aiBeliever: "AI-driven Workflows believer",
      aiBelieverDesc: "I build faster and smarter thanks to models, not in spite of them.",
      location: "Born in Argentina, building from everywhere.",
      highlights: "What I Learned Building This",
      highlight1: "Building this site sharpened my design system thinking.",
      highlight2: "Forced me to get better at React component organization.",
      highlight3: "Found joy in tweaking tiny hover interactions.",
      highlight4: "Realized there's a fine line between clever animations and annoying ones — learned to respect it.",
      highlight5: "Debugging builds my character. And tests my patience.",
      funFacts: "Fun Facts",
      funFact1: "I've memorized the Figma shortcuts nobody uses.",
      funFact2: "I get more work done if my workspace looks aesthetic.",
      funFact3: "I've gone 'one last tweak' for hours.",
      funFact4: "I code faster with playlists that sound like I'm in a hacker movie.",
      funFact5: "Already working on version 2 of this site in my head.",
      skillMatrixToggle: "Toggle Skills View",
      technicalSkills: "Technical Skills",
      humanSkills: "Human Skills",
      techSkill1: "React",
      techSkill2: "Figma",
      techSkill3: "API Integration",
      techSkill4: "Tailwind CSS",
      techSkill5: "Git/GitHub",
      humanSkill1: "Pixel Precision",
      humanSkill2: "Never gives up",
      humanSkill3: "Learns by building",
      humanSkill4: "Curious to a fault",
      humanSkill5: "Can switch from dev to design brain instantly",
      alternateTimeline: "Alternate Timeline",
      alternateTimelineButton: "What if I didn't choose design/dev?",
      alternateTitle: "Alternate universe Abi:",
      alternate1: "Owns a retro camera shop in Venice.",
      alternate2: "Host of a podcast called 'Pixels & People'.",
      alternate3: "Still thinking about typography and user flow, btw.",
      hoursButton: "Want to know how many hours went into this?",
      hoursReveal: "Final answer: Too many. Worth it.",
      finalCTA: "If you've made it here, you're probably curious and detail-oriented. So am I. Let's build things together — intentionally.",
      copyright: "© 2025 Abril Marangoni",
      backToPortfolio: "Back to Portfolio",
      metaProject: "Meta Project • 2024",
    },
    es: {
      back: "Volver al Inicio",
      title: "ESTE PORTFOLIO",
      subtitle: "Diseñado, Desarrollado e Hiper-Pensado por Mí",
      tagline: "Un espacio autoconstruido y escaparate de todo lo que soy — y en lo que me estoy convirtiendo.",
      overview: "Resumen",
      overviewText: "Construí este portfolio desde cero — sin plantillas, sin atajos. Está hecho para reflejar cómo pienso: estructurada, curiosa y un poco juguetona. Stack: Figma → React + Next.js → Tailwind → Vercel → (y sí, algo de debugging terco). No es perfecto. Yo tampoco. Pero estoy orgullosa de él.",
      aboutMe: "Sobre Mí",
      education: "Licenciatura en Administración de Empresas (en curso)",
      educationDesc: "Porque el diseño no significa nada si no entiendes cómo funcionan las cosas.",
      designer: "Diseñadora UX/UI desde 2022",
      designerDesc: "Creo interfaces con intención, itero mucho y evito diseñar cualquier cosa que yo misma no usaría.",
      developer: "Desarrolladora Full Stack (React, JS, productos impulsados por API)",
      developerDesc: "Aún no soy una gurú del backend — pero lo suficiente como para hacer las cosas.",
      aiBeliever: "Creyente en flujos de trabajo impulsados por IA",
      aiBelieverDesc: "Construyo más rápido e inteligente gracias a los modelos, no a pesar de ellos.",
      location: "Nacida en Argentina, construyendo desde todos lados.",
      highlights: "Lo Que Aprendí Construyendo Esto",
      highlight1: "Construir este sitio afiló mi pensamiento de sistemas de diseño.",
      highlight2: "Me forzó a mejorar en la organización de componentes de React.",
      highlight3: "Encontré alegría en ajustar pequeñas interacciones hover.",
      highlight4: "Me di cuenta de que hay una línea delgada entre animaciones inteligentes y molestas — aprendí a respetarla.",
      highlight5: "Debuggear construye mi carácter. Y prueba mi paciencia.",
      funFacts: "Datos Curiosos",
      funFact1: "He memorizado los atajos de Figma que nadie usa.",
      funFact2: "Trabajo mejor si mi espacio de trabajo se ve estético.",
      funFact3: "He pasado horas en 'un último ajuste'.",
      funFact4: "Codifico más rápido con playlists que suenan como si estuviera en una película de hackers.",
      funFact5: "Ya estoy trabajando en la versión 2 de este sitio en mi cabeza.",
      skillMatrixToggle: "Cambiar Vista de Habilidades",
      technicalSkills: "Habilidades Técnicas",
      humanSkills: "Habilidades Humanas",
      techSkill1: "React",
      techSkill2: "Figma",
      techSkill3: "Integración de API",
      techSkill4: "Tailwind CSS",
      techSkill5: "Git/GitHub",
      humanSkill1: "Precisión de píxeles",
      humanSkill2: "Nunca se rinde",
      humanSkill3: "Aprende construyendo",
      humanSkill4: "Curiosa hasta la falta",
      humanSkill5: "Puede cambiar entre cerebro dev y diseño al instante",
      alternateTimeline: "Línea de Tiempo Alternativa",
      alternateTimelineButton: "¿Y si no hubiera elegido diseño/dev?",
      alternateTitle: "Abi en universo alternativo:",
      alternate1: "Dueña de una tienda de cámaras retro en Venecia.",
      alternate2: "Conductora de un podcast llamado 'Píxeles y Personas'.",
      alternate3: "Todavía pensando en tipografía y flujo de usuario, por cierto.",
      hoursButton: "¿Quieres saber cuántas horas le dediqué a esto?",
      hoursReveal: "Respuesta final: Demasiadas. Valió la pena.",
      finalCTA: "Si llegaste hasta aquí, probablemente eres curioso y detallista. Yo también. Construyamos cosas juntos — intencionalmente.",
      copyright: "© 2025 Abril Marangoni",
      backToPortfolio: "Volver al Portfolio",
      metaProject: "Proyecto Meta • 2024",
    },
  }

  const text = t[language]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{text.back}</span>
            </Link>
            <div className="text-sm font-light tracking-wider">{text.title}</div>
          </div>
        </div>
        <div
          className="h-px bg-stone-200 dark:bg-stone-800 transition-all duration-300"
          style={{
            transform: `scaleX(${Math.min(scrollY / 100, 1)})`,
            transformOrigin: "left",
          }}
        ></div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <span className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {text.metaProject}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">{text.subtitle}</h1>
              <p className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                {text.tagline}
              </p>
            </div>

            <div className="space-y-6 bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
              <h3 className="text-xl font-light flex items-center space-x-3">
                <Coffee className="h-5 w-5 text-amber-600" />
                <span>{text.overview}</span>
              </h3>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                {text.overviewText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-2xl font-light">{text.aboutMe}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                <div className="flex items-start space-x-4">
                  <GraduationCap className="h-6 w-6 text-amber-600 mt-1" />
                  <div className="space-y-2">
                    <h4 className="font-light text-lg">{text.education}</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      {text.educationDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                <div className="flex items-start space-x-4">
                  <Palette className="h-6 w-6 text-amber-600 mt-1" />
                  <div className="space-y-2">
                    <h4 className="font-light text-lg">{text.designer}</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      {text.designerDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                <div className="flex items-start space-x-4">
                  <Laptop className="h-6 w-6 text-amber-600 mt-1" />
                  <div className="space-y-2">
                    <h4 className="font-light text-lg">{text.developer}</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      {text.developerDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                <div className="flex items-start space-x-4">
                  <Bot className="h-6 w-6 text-amber-600 mt-1" />
                  <div className="space-y-2">
                    <h4 className="font-light text-lg">{text.aiBeliever}</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      {text.aiBelieverDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-stone-600 dark:text-stone-400 font-light italic">{text.location}</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-2xl font-light">{text.highlights}</h2>
            </div>

            <div className="space-y-4 max-w-3xl">
              {[text.highlight1, text.highlight2, text.highlight3, text.highlight4, text.highlight5].map((highlight, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-2xl font-light flex items-center space-x-3">
                <span>{text.funFacts}</span>
                <Sparkles className="h-5 w-5 text-amber-600" />
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[text.funFact1, text.funFact2, text.funFact3, text.funFact4, text.funFact5].map((fact, i) => (
                <div
                  key={i}
                  className="bg-stone-100 dark:bg-stone-900 rounded-lg p-6 border border-stone-200 dark:border-stone-800 hover:border-amber-600 dark:hover:border-amber-600 transition-all duration-300"
                >
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-sm">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {/* Skill Matrix Toggle */}
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-light">{text.skillMatrixToggle}</h3>
                <Button
                  onClick={() => setSkillView(skillView === "technical" ? "human" : "technical")}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-light px-6 py-3 flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>{skillView === "technical" ? text.humanSkills : text.technicalSkills}</span>
                </Button>
              </div>

              <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800 space-y-4">
                <h4 className="text-lg font-light text-center mb-6">
                  {skillView === "technical" ? text.technicalSkills : text.humanSkills}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {skillView === "technical" ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Code2 className="h-5 w-5 text-amber-600" />
                        <span className="font-light">{text.techSkill1}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Palette className="h-5 w-5 text-amber-600" />
                        <span className="font-light">{text.techSkill2}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-amber-600" />
                        <span className="font-light">{text.techSkill3}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Sparkles className="h-5 w-5 text-amber-600" />
                        <span className="font-light">{text.techSkill4}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-amber-600" />
                        <span className="font-light">{text.techSkill5}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-light">{text.humanSkill1}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-light">{text.humanSkill2}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-light">{text.humanSkill3}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-light">{text.humanSkill4}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        <span className="font-light">{text.humanSkill5}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Alternate Timeline Button */}
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <Button
                  onClick={() => setShowAlternate(!showAlternate)}
                  className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 font-light px-6 py-3"
                >
                  {text.alternateTimelineButton}
                </Button>
              </div>

              {showAlternate && (
                <div className="bg-amber-50 dark:bg-amber-950 rounded-lg p-8 border-2 border-amber-600 space-y-4 animate-in fade-in duration-300">
                  <h4 className="text-lg font-light text-amber-900 dark:text-amber-100">{text.alternateTitle}</h4>
                  <div className="space-y-3">
                    <p className="text-amber-800 dark:text-amber-200 font-light">{text.alternate1}</p>
                    <p className="text-amber-800 dark:text-amber-200 font-light">{text.alternate2}</p>
                    <p className="text-amber-800 dark:text-amber-200 font-light italic">{text.alternate3}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Hours Reveal Button */}
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <Button
                  onClick={() => setShowHours(!showHours)}
                  className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-300 font-light px-6 py-3 flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>{text.hoursButton}</span>
                </Button>
              </div>

              {showHours && (
                <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 border border-stone-200 dark:border-stone-800 animate-in fade-in duration-300">
                  <p className="text-center text-xl font-light text-stone-600 dark:text-stone-400">{text.hoursReveal}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-2xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
              {text.finalCTA}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-3 text-lg font-light text-amber-600 hover:text-amber-700 transition-colors duration-300"
            >
              <span>Let's connect</span>
              <Heart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex justify-between items-center text-sm font-light text-stone-500 dark:text-stone-500 w-full">
              <div>{text.copyright}</div>
              <Link href="/" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-300">
                {text.backToPortfolio}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
