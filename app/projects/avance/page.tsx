"use client"

import { useState } from "react"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function AvanceProject() {
  const [language, setLanguage] = useState<"en" | "es">("en")

  const content = {
    en: {
      back: "Back to Portfolio",
      title: "AVANCE AI",
      role: "Role",
      roleValue: "UX/UI Designer · Product Strategist · UX Researcher",
      duration: "Duration",
      durationValue: "2024 · 3 months",
      type: "Type",
      typeValue: "Concept Case Study · Graduation Project",
      developed: "Developed for",
      developedValue: "The University of Texas at Austin",
      tools: "Tools",
      toolsValue: "Figma · Notion · Miro",
      snapshot: "Project Snapshot",
      snapshotText1: "Avance AI is a wearable-connected wellness app concept that adapts to your body and mind.",
      snapshotText2: "Powered by biometric data and human-centered AI design, it guides you through training, recovery, emotional tracking, and lifestyle habits without guilt or pressure.",
      dedication: "Dedication",
      dedicationText1: "This project is dedicated to Professor Caleb George —",
      dedicationText2: "...not only for his mentorship, guidance, and vision throughout this journey,",
      dedicationText3: "...but also for reminding me that great design is not built in isolation,",
      dedicationText4: "...and that the most meaningful interfaces begin with empathy.",
      dedicationText5: "Thank you, Caleb, for your support, your insight, and for inspiring me to think boldly.",
      dedicationText6: "— Abril Marangoni",
      dedicationText7: "Postgraduate Thesis · UX/UI Program",
      dedicationText8: "The University of Texas at Austin",
      diveTitle: "Dive into the Strategy",
      diveIntro: "Below is the full UX/UI case study for Avance AI — including research insights, key flows, and interactive prototype screens.",
      diveIntro2: "Designed fully in Figma, this report walks through the mindset behind the product, the user-first strategy, and visual evolution from concept to interface.",
      diveInstructions: "Use arrows or scroll inside this frame to see the full UX case study.",
      diveCTA: "Want to view it full-screen?",
      diveCTALink: "Open the full case study in Figma →",
    },
    es: {
      back: "Volver al Portfolio",
      title: "AVANCE AI",
      role: "Rol",
      roleValue: "Diseñadora UX/UI · Estratega de Producto · Investigadora UX",
      duration: "Duración",
      durationValue: "2024 · 3 meses",
      type: "Tipo",
      typeValue: "Caso de Estudio Conceptual · Proyecto de Graduación",
      developed: "Desarrollado para",
      developedValue: "The University of Texas at Austin",
      tools: "Herramientas",
      toolsValue: "Figma · Notion · Miro",
      snapshot: "Resumen del Proyecto",
      snapshotText1: "Avance AI es un concepto de app de bienestar conectada a wearables que se adapta a tu cuerpo y mente.",
      snapshotText2: "Impulsada por datos biométricos y diseño de IA centrado en el humano, te guía a través de entrenamiento, recuperación, seguimiento emocional y hábitos de estilo de vida sin culpa ni presión.",
      dedication: "Dedicatoria",
      dedicationText1: "Este proyecto está dedicado al Profesor Caleb George —",
      dedicationText2: "...no solo por su mentoría, guía y visión a lo largo de este viaje,",
      dedicationText3: "...sino también por recordarme que el gran diseño no se construye en aislamiento,",
      dedicationText4: "...y que las interfaces más significativas comienzan con empatía.",
      dedicationText5: "Gracias, Caleb, por tu apoyo, tu perspicacia y por inspirarme a pensar con audacia.",
      dedicationText6: "— Abril Marangoni",
      dedicationText7: "Tesis de Posgrado · Programa UX/UI",
      dedicationText8: "The University of Texas at Austin",
      diveTitle: "Explora la Estrategia",
      diveIntro: "A continuación está el caso de estudio completo UX/UI de Avance AI — incluyendo insights de investigación, flujos clave y pantallas de prototipo interactivas.",
      diveIntro2: "Diseñado completamente en Figma, este reporte recorre la mentalidad detrás del producto, la estrategia centrada en el usuario y la evolución visual desde el concepto hasta la interfaz.",
      diveInstructions: "Usa las flechas o desplázate dentro del marco para ver el caso de estudio completo.",
      diveCTA: "¿Quieres verlo en pantalla completa?",
      diveCTALink: "Abrir el caso de estudio completo en Figma →",
    }
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-8">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 text-sm font-light text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.back}</span>
            </Link>
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="text-sm font-light text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {language === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimalist with lots of space */}
      <section className="pt-48 pb-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iBJHLx2g3nnvo91Jf1zrS1xqKcJXuZ.png"
                alt="Avance"
                width={600}
                height={120}
                className="w-full max-w-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Meta Information - Refined and elegant */}
      <section className="pb-48 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 gap-y-12">
            {/* Role */}
            <div className="space-y-3">
              <div className="text-xs font-light tracking-[0.3em] uppercase text-amber-400">
                {t.role}
              </div>
              <div className="text-lg font-light text-stone-900 dark:text-stone-100 leading-relaxed">
                {t.roleValue}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <div className="text-xs font-light tracking-[0.3em] uppercase text-amber-400">
                {t.duration}
              </div>
              <div className="text-lg font-light text-stone-900 dark:text-stone-100 leading-relaxed">
                {t.durationValue}
              </div>
            </div>

            {/* Type */}
            <div className="space-y-3">
              <div className="text-xs font-light tracking-[0.3em] uppercase text-amber-400">
                {t.type}
              </div>
              <div className="text-lg font-light text-stone-900 dark:text-stone-100 leading-relaxed">
                {t.typeValue}
              </div>
            </div>

            {/* Developed for */}
            <div className="space-y-3">
              <div className="text-xs font-light tracking-[0.3em] uppercase text-amber-400">
                {t.developed}
              </div>
              <div className="text-lg font-light text-stone-900 dark:text-stone-100 leading-relaxed">
                {t.developedValue}
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-3">
              <div className="text-xs font-light tracking-[0.3em] uppercase text-amber-400">
                {t.tools}
              </div>
              <div className="text-lg font-light text-stone-900 dark:text-stone-100 leading-relaxed">
                {t.toolsValue}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Snapshot - Minimalist with breathing room */}
      <section className="pb-32 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-16">
            <div className="text-xs font-light tracking-widest uppercase text-amber-400">
              {t.snapshot}
            </div>
            <div className="space-y-12">
              <p className="text-2xl lg:text-3xl font-light leading-relaxed text-stone-900 dark:text-stone-100">
                {t.snapshotText1}
              </p>
              <p className="text-2xl lg:text-3xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
                {t.snapshotText2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dive into the Design - Figma Embed */}
      <section className="pb-48 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {/* Section Title */}
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-amber-400">
                {t.diveTitle}
              </h2>
              <div className="max-w-3xl space-y-6">
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.diveIntro}
                </p>
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.diveIntro2}
                </p>
              </div>
            </div>

            {/* Figma Embed Card */}
            <div className="space-y-8">
              <p className="text-sm font-light text-stone-500 dark:text-stone-500">
                {t.diveInstructions}
              </p>
              <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden">
                <iframe
                  style={{ border: 'none' }}
                  width="100%"
                  height="800"
                  src="https://embed.figma.com/deck/sIki04uQK2Bv7wb8lIVzXR/UX-REPORT?node-id=1-42&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                  allowFullScreen
                  title="Avance AI UX Case Study"
                />
              </div>
              {/* CTA Link */}
              <div className="flex justify-center pt-8">
                <a
                  href="https://www.figma.com/deck/sIki04uQK2Bv7wb8lIVzXR/UX-REPORT?node-id=72-259&t=zBL7mteusR7h1jgH-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  {t.diveCTA} {t.diveCTALink}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Showcase */}
      <section className="pb-48 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {/* Section Title */}
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-amber-400">
                {language === "en" ? "See It In Action" : "Míralo en Acción"}
              </h2>
              <div className="max-w-3xl">
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {language === "en" 
                    ? "Here's a preview of the Avance AI interface — including the screens that define the user experience, and the full interactive prototype built in Figma."
                    : "Aquí hay una vista previa de la interfaz de Avance AI — incluyendo las pantallas que definen la experiencia del usuario, y el prototipo interactivo completo construido en Figma."}
                </p>
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400 mt-6">
                  {language === "en"
                    ? "It showcases how biometric insights, emotional check-ins, and smart recommendations come together into an elegant flow."
                    : "Muestra cómo los insights biométricos, los chequeos emocionales y las recomendaciones inteligentes se unen en un flujo elegante."}
                </p>
              </div>
            </div>

            {/* Key Screens Grid - 4 mockups with captions */}
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Screen 1 */}
                <div className="space-y-6">
                  <div className="rounded-sm overflow-hidden aspect-[9/19] bg-transparent">
                    <Image
                      src="/images/mockupportfolio2.png"
                      alt="Sign In Page"
                      width={400}
                      height={844}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-light tracking-wide text-stone-600 dark:text-stone-400 text-center">
                    {language === "en"
                      ? "Sign In & Authentication Flow"
                      : "Flujo de Inicio de Sesión y Autenticación"}
                  </p>
                </div>

                {/* Screen 2 */}
                <div className="space-y-6">
                  <div className="rounded-sm overflow-hidden aspect-[9/19] bg-transparent">
                    <Image
                      src="/images/mockupportfolio3.png"
                      alt="Personalized Workout Generator"
                      width={400}
                      height={844}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-light tracking-wide text-stone-600 dark:text-stone-400 text-center">
                    {language === "en"
                      ? "Personalized Workout Generator"
                      : "Generador de Entrenamientos Personalizados"}
                  </p>
                </div>

                {/* Screen 3 */}
                <div className="space-y-6">
                  <div className="rounded-sm overflow-hidden aspect-[9/19] bg-transparent">
                    <Image
                      src="/images/mockupportfolio1.png"
                      alt="Daily Readiness Metrics & Mood Tracker"
                      width={400}
                      height={844}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-light tracking-wide text-stone-600 dark:text-stone-400 text-center">
                    {language === "en" 
                      ? "Daily Readiness Metrics & Mood Tracker"
                      : "Métricas de Preparación Diaria y Rastreador de Humor"}
                  </p>
                </div>

                {/* Screen 4 */}
                <div className="space-y-6">
                  <div className="border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden aspect-[9/19] bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
                    <div className="text-sm font-light text-stone-400">
                      {language === "en" ? "Screen 4 Mockup" : "Mockup Pantalla 4"}
                    </div>
                  </div>
                  <p className="text-sm font-light tracking-wide text-stone-600 dark:text-stone-400 text-center">
                    {language === "en"
                      ? "Recovery + Wellness Overview"
                      : "Resumen de Recuperación + Bienestar"}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Prototype Embed */}
            <div className="space-y-8 pt-16">
              <div className="text-center">
                <p className="text-sm font-light text-stone-500 dark:text-stone-500">
                  {language === "en"
                    ? "Explore the full interactive prototype below"
                    : "Explora el prototipo interactivo completo a continuación"}
                </p>
              </div>
              <div className="border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden">
                <iframe
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                  width="100%"
                  height="760"
                  src="https://embed.figma.com/proto/6dhz1XSbY5hdE6yKPOyGKU/Avance_High-Fidelity-Wireframes?node-id=2718-10747&embed-host=share"
                  allowFullScreen
                  title="Avance AI Interactive Prototype"
                />
              </div>
              
              {/* Footer note */}
              <div className="text-center space-y-4 pt-8">
                <p className="text-sm font-light text-stone-500 dark:text-stone-500">
                  {language === "en"
                    ? "All screens designed and prototyped in Figma."
                    : "Todas las pantallas diseñadas y prototipadas en Figma."}
                </p>
                <p className="text-xs font-light text-stone-400 dark:text-stone-600">
                  {language === "en"
                    ? "Built as part of my UX/UI Graduation Project at The University of Texas at Austin."
                    : "Construido como parte de mi Proyecto de Graduación UX/UI en The University of Texas at Austin."}
                </p>
                <p className="text-xs font-light italic text-stone-400 dark:text-stone-600">
                  {language === "en"
                    ? "Click and scroll inside the frame above to explore the app flow."
                    : "Haz clic y desplázate dentro del marco de arriba para explorar el flujo de la app."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design System - Color Palettes & Typography */}
      <section className="pb-48 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-32">
            {/* Section Title */}
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-amber-400">
                {language === "en" ? "Design System" : "Sistema de Diseño"}
              </h2>
              <div className="max-w-3xl">
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {language === "en"
                    ? "Every color choice and typographic decision was intentional — built to convey energy, calm, and trust while maintaining visual harmony across the entire interface."
                    : "Cada elección de color y decisión tipográfica fue intencional — construida para transmitir energía, calma y confianza mientras mantiene la armonía visual en toda la interfaz."}
                </p>
              </div>
            </div>

            {/* Primary Color Palette */}
            <div className="space-y-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-light text-stone-900 dark:text-stone-100">
                  {language === "en" ? "Primary Color Palette" : "Paleta de Colores Primarios"}
                </h3>
                <p className="text-base font-light text-stone-500 dark:text-stone-500">
                  {language === "en"
                    ? "Derived from #FFD166 — the warm, energetic foundation of Avance's identity"
                    : "Derivada de #FFD166 — la base cálida y energética de la identidad de Avance"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Golden Glow */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm" style={{ backgroundColor: '#FFD166' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Golden Glow</p>
                    <p className="text-xs font-mono text-stone-500">#FFD166</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en" 
                        ? "(Base) — vibrant and warm primary color"
                        : "(Base) — color primario vibrante y cálido"}
                    </p>
                  </div>
                </div>

                {/* Deep Honey */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm" style={{ backgroundColor: '#E9A743' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Deep Honey</p>
                    <p className="text-xs font-mono text-stone-500">#E9A743</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "Deeper and serious tone, ideal for hover or secondary buttons"
                        : "Tono más profundo y serio, ideal para hover o botones secundarios"}
                    </p>
                  </div>
                </div>

                {/* Soft Cream */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm border border-stone-200" style={{ backgroundColor: '#FFF4D9' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Soft Cream</p>
                    <p className="text-xs font-mono text-stone-500">#FFF4D9</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "Soft primary background, warm and elegant"
                        : "Fondo primario suave, cálido y elegante"}
                    </p>
                  </div>
                </div>

                {/* Warm Burnt Amber */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm" style={{ backgroundColor: '#C87C2E' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Warm Burnt Amber</p>
                    <p className="text-xs font-mono text-stone-500">#C87C2E</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "Strong accent, for highlighting key elements"
                        : "Acento fuerte, para destacar elementos clave"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Color Palette */}
            <div className="space-y-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-light text-stone-900 dark:text-stone-100">
                  {language === "en" ? "Secondary Color Palette" : "Paleta de Colores Secundarios"}
                </h3>
                <p className="text-base font-light text-stone-500 dark:text-stone-500">
                  {language === "en"
                    ? "Including #15364C — complements the primary palette with depth and sophistication"
                    : "Incluyendo #15364C — complementa la paleta primaria con profundidad y sofisticación"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Deep Petroleum Blue */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm" style={{ backgroundColor: '#15364C' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Deep Petroleum Blue</p>
                    <p className="text-xs font-mono text-stone-500">#15364C</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "(Base) — deep, serious, tech"
                        : "(Base) — profundo, serio, tech"}
                    </p>
                  </div>
                </div>

                {/* Muted Teal */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm" style={{ backgroundColor: '#4C8A9F' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Muted Teal</p>
                    <p className="text-xs font-mono text-stone-500">#4C8A9F</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "+ Light, soft, complements without competing"
                        : "+ Ligero, suave, complementa sin competir"}
                    </p>
                  </div>
                </div>

                {/* Warm Sand */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm border border-stone-200" style={{ backgroundColor: '#D8CBB5' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Warm Sand</p>
                    <p className="text-xs font-mono text-stone-500">#D8CBB5</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "+ Earthy, neutral, lightens visually"
                        : "+ Terroso, neutral, aligera visualmente"}
                    </p>
                  </div>
                </div>

                {/* Copper Rust */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm" style={{ backgroundColor: '#B65C40' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Copper Rust</p>
                    <p className="text-xs font-mono text-stone-500">#B65C40</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "+ Warm, stands out in buttons or details"
                        : "+ Cálido, sobresale en botones o detalles"}
                    </p>
                  </div>
                </div>

                {/* Soft Silver */}
                <div className="space-y-6">
                  <div className="h-32 rounded-sm border border-stone-200" style={{ backgroundColor: '#D0D7DA' }}></div>
                  <div className="space-y-2">
                    <p className="text-sm font-light text-stone-900 dark:text-stone-100">Soft Silver</p>
                    <p className="text-xs font-mono text-stone-500">#D0D7DA</p>
                    <p className="text-xs font-light text-stone-500 dark:text-stone-500">
                      {language === "en"
                        ? "+ Cool light gray, ideal for backgrounds"
                        : "+ Gris claro frío, ideal para backgrounds"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Lessons Learned - Global Perspective */}
      <section className="pb-48 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-32">
            {/* Section Title */}
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-amber-400">
                {language === "en" ? "Skills & Lessons Learned" : "Habilidades y Lecciones Aprendidas"}
              </h2>
              <div className="max-w-3xl">
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {language === "en"
                    ? "Beyond design and prototypes, this project was shaped by people — mentors and colleagues from India, Indonesia, the U.S. and more.*"
                    : "Más allá del diseño y los prototipos, este proyecto fue moldeado por personas — mentores y colegas de India, Indonesia, EE.UU. y más.*"}
                </p>
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400 mt-6">
                  {language === "en"
                    ? "Navigating those cultural layers and expectations was one of the most meaningful challenges — and growth opportunities — of the entire process."
                    : "Navegar esas capas culturales y expectativas fue uno de los desafíos más significativos — y oportunidades de crecimiento — de todo el proceso."}
                </p>
              </div>
            </div>

            {/* What I Learned - Real Skills */}
            <div className="space-y-12">
              <h3 className="text-2xl font-light text-amber-400">
                {language === "en" ? "What I Learned (Real Skills)" : "Lo Que Aprendí (Habilidades Reales)"}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Turning research into product strategy with clarity"
                    : "– Convertir investigación en estrategia de producto con claridad"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Designing emotional UX, not just functional flows"
                    : "– Diseñar UX emocional, no solo flujos funcionales"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Using wearable data to build adaptive, accessible systems"
                    : "– Usar datos de wearables para construir sistemas adaptativos y accesibles"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Building scalable design systems across screens and use cases"
                    : "– Construir sistemas de diseño escalables a través de pantallas y casos de uso"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Presenting insights and story-driven case studies clearly"
                    : "– Presentar insights y casos de estudio narrativos con claridad"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Writing for users and stakeholders with different backgrounds"
                    : "– Escribir para usuarios y stakeholders con diferentes contextos"}
                </p>
              </div>
            </div>

            {/* What Shaped Me - Human Lessons */}
            <div className="space-y-12">
              <h3 className="text-2xl font-light text-amber-400">
                {language === "en" ? "And What Shaped Me (Human Lessons)" : "Y Lo Que Me Moldeó (Lecciones Humanas)"}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Realized: design is not universal — empathy must be cultural"
                    : "– Comprendí: el diseño no es universal — la empatía debe ser cultural"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Made peace with feedback from five different time zones in one week"
                    : "– Hice las paces con feedback de cinco zonas horarias diferentes en una semana"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Learned the difference between designing for fitness and designing for human experience"
                    : "– Aprendí la diferencia entre diseñar para fitness y diseñar para experiencia humana"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Became a better listener than explainer"
                    : "– Me convertí en mejor escuchadora que explicadora"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Learned how to stand by my vision — in a room full of strong voices"
                    : "– Aprendí cómo mantener mi visión — en una sala llena de voces fuertes"}
                </p>
                <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                  {language === "en"
                    ? "– Understood how much design can bridge cultures when rooted in care"
                    : "– Entendí cuánto el diseño puede unir culturas cuando está arraigado en el cuidado"}
                </p>
              </div>
            </div>

            {/* The Cultural Challenge */}
            <div className="space-y-12">
              <h3 className="text-2xl font-light text-amber-400">
                {language === "en" ? "The Cultural Challenge" : "El Desafío Cultural"}
              </h3>
              <div className="max-w-4xl space-y-8">
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {language === "en"
                    ? "One of the core challenges — and gifts — of this project was working across cultures..."
                    : "Uno de los desafíos centrales — y regalos — de este proyecto fue trabajar a través de culturas..."}
                </p>
                <p className="text-lg font-light leading-relaxed text-stone-600 dark:text-stone-400">
                  {language === "en"
                    ? "This wasn't just a UX project — it was a global collaboration. And it taught me that precision in design is nothing without emotional and cultural fluency."
                    : "Este no fue solo un proyecto de UX — fue una colaboración global. Y me enseñó que la precisión en el diseño no es nada sin fluidez emocional y cultural."}
                </p>
                
                <div className="pt-8 space-y-6 max-w-5xl">
                  {language === "es" ? (
                    <>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Comprendí: el diseño no es universal — la empatía debe ser cultural
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Hice las paces con feedback de cinco zonas horarias diferentes en una semana (me encantaba cuando eran las 4:00 a.m. y teníamos reuniones India y Chicago estando separadas por 11 h 30 min)
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Me convertí en mejor escuchadora
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Aprendí cómo mantener mi visión — en una sala llena de voces fuertes
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Entendí cuánto el diseño puede unir culturas cuando está arraigado en el cuidado
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Realized: design is not universal — empathy must be cultural
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Made peace with feedback from five time zones in one week (loved it when it was 4:00 a.m. and we had meetings with India and Chicago 11.5 hours apart)
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Became a better listener
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Learned how to hold my vision — in a room full of strong voices
                      </p>
                      <p className="text-base font-light text-stone-600 dark:text-stone-400 leading-relaxed">
                        – Understood how much design can unite cultures when rooted in care
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Closing Quote */}
            <div className="max-w-4xl mx-auto text-center pt-16">
              <p className="text-2xl lg:text-3xl font-light italic leading-relaxed text-stone-900 dark:text-stone-100">
                {language === "en"
                  ? "\"I thought I was designing an app — but ended up designing myself differently.\""
                  : "\"Pensé que estaba diseñando una app — pero terminé diseñándome a mí misma de manera diferente.\""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedication - Elegant and centered */}
      <section className="pb-48 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div className="text-xs font-light tracking-[0.4em] uppercase text-amber-400">
              {t.dedication}
            </div>
            <div className="space-y-8 text-lg lg:text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
              <p className="italic">
                {t.dedicationText1}
              </p>
              <p>
                {t.dedicationText2}
              </p>
              <p>
                {t.dedicationText3}
              </p>
              <p>
                {t.dedicationText4}
              </p>
              <p className="pt-8">
                {t.dedicationText5}
              </p>
              <p className="pt-12 text-base text-stone-500 dark:text-stone-500">
                {t.dedicationText6}
              </p>
              <p className="text-sm text-stone-400 dark:text-stone-600">
                {t.dedicationText7}
              </p>
              <p className="text-sm text-stone-400 dark:text-stone-600">
                {t.dedicationText8}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 lg:px-16 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-light text-stone-400 dark:text-stone-600">
            © 2025 Abril Marangoni
          </div>
        </div>
      </footer>
    </div>
  )
}
