"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Code2,
  Database,
  MessageSquare,
  Sparkles,
  Users,
  Zap,
  CheckCircle2,
  Github,
  Terminal,
  Layers,
  Globe,
  Lock,
  Cpu,
  ExternalLink,
  Maximize2,
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Palette,
  Layout,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AbaAiProject() {
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState<"v1" | "v2">("v1")
  const [language, setLanguage] = useState<"en" | "es">("en")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const techStack = {
    frontend: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Router"],
    backend: ["NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "JWT Auth"],
    ai: ["OpenAI GPT-4", "Embeddings", "Vector Search", "Context Management"],
    integrations: ["Meta Business API", "WhatsApp API", "Instagram API", "Facebook Messenger", "Stripe"],
    infrastructure: ["Multi-tenant Architecture", "Real-time Webhooks", "Secure API Keys", "Rate Limiting"],
  }

  const features = [
    {
      icon: MessageSquare,
      title: "Multi-Platform AI",
      description: "Asistente inteligente que responde automáticamente en WhatsApp, Instagram y Facebook",
    },
    {
      icon: Users,
      title: "Multi-Tenant",
      description: "Arquitectura escalable que permite múltiples negocios con datos aislados",
    },
    {
      icon: Sparkles,
      title: "IA Contextual",
      description: "Respuestas personalizadas basadas en productos, servicios y historial del negocio",
    },
    {
      icon: Database,
      title: "Dashboard Completo",
      description: "Panel de administración con gestión de productos, servicios y conversaciones",
    },
    {
      icon: Lock,
      title: "Seguridad Empresarial",
      description: "Autenticación JWT, encriptación de datos sensibles y manejo seguro de API keys",
    },
    {
      icon: Zap,
      title: "Real-Time",
      description: "Webhooks para respuestas instantáneas y sincronización en tiempo real",
    },
  ]

  const businessTypes = [
    {
      id: "productos",
      name: language === "en" ? "Product Sales" : "Venta de Productos",
      description: language === "en" ? "E-commerce, retail, physical stores" : "E-commerce, retail, tiendas físicas",
      examples: language === "en" ? "Clothing, tech, bazaar, bookstore" : "Indumentaria, tecnología, bazar, librería",
      color: "from-blue-500 to-purple-600",
      borderColor: "border-blue-400",
    },
    {
      id: "gastronomia",
      name: language === "en" ? "Gastronomy" : "Gastronomía",
      description: language === "en" ? "Restaurants, cafés, bars" : "Restaurantes, cafés, bares",
      examples: language === "en" ? "Restaurant, café, bakery, bar" : "Restaurante, café, panadería, bar",
      color: "from-orange-500 to-red-600",
      borderColor: "border-orange-400",
    },
    {
      id: "servicios_turnos",
      name: language === "en" ? "Appointment Services" : "Servicios con Turnos",
      description: language === "en" ? "Salons, clinics, studios" : "Peluquerías, clínicas, estudios",
      examples: language === "en" ? "Salon, clinic, spa, studio" : "Peluquería, clínica, spa, estudio",
      color: "from-purple-500 to-pink-600",
      borderColor: "border-purple-400",
    },
    {
      id: "educacion",
      name: language === "en" ? "Education" : "Educación",
      description: language === "en" ? "Courses, tutoring, academies" : "Cursos, tutorías, academias",
      examples: language === "en" ? "Academy, tutoring, online courses" : "Academia, tutorías, cursos online",
      color: "from-green-500 to-teal-600",
      borderColor: "border-green-400",
    },
    {
      id: "salud_bienestar",
      name: language === "en" ? "Health & Wellness" : "Salud y Bienestar",
      description: language === "en" ? "Gyms, nutrition, therapy" : "Gimnasios, nutrición, terapia",
      examples: language === "en" ? "Gym, nutrition, yoga, therapy" : "Gimnasio, nutrición, yoga, terapia",
      color: "from-red-500 to-pink-600",
      borderColor: "border-red-400",
    },
    {
      id: "eventos",
      name: language === "en" ? "Events" : "Eventos",
      description: language === "en" ? "Parties, conferences, weddings" : "Fiestas, conferencias, bodas",
      examples: language === "en" ? "Events, parties, conferences" : "Eventos, fiestas, conferencias",
      color: "from-yellow-500 to-orange-600",
      borderColor: "border-yellow-400",
    },
    {
      id: "inmobiliarias",
      name: language === "en" ? "Real Estate" : "Inmobiliarias",
      description: language === "en" ? "Properties, rentals, sales" : "Propiedades, alquileres, ventas",
      examples: language === "en" ? "Real estate, rentals, sales" : "Inmobiliaria, alquileres, ventas",
      color: "from-indigo-500 to-blue-600",
      borderColor: "border-indigo-400",
    },
  ]

  const v2Content = {
    en: {
      title: "Version 2.0: Personalized Dashboards by Business Type",
      subtitle: "UX/UI Refinement & User-Centered Design",
      problem: {
        title: "Problem Identified",
        description:
          "Version 1 offered a generic experience for all users, without considering that different business types have different needs:",
        points: [
          "An e-commerce needs inventory and product management",
          "A restaurant requires digital menu and reservation system",
          "A salon needs appointment scheduling and service list",
          "A real estate agency manages properties and visits",
        ],
        result: "Users saw irrelevant features, causing confusion and low adoption.",
      },
      solution: {
        title: "Solution Implemented",
        description: "Personalized dashboards based on business type selected during onboarding.",
      },
      research: {
        title: "UX Research & Testing",
        subtitle: "Data-Driven Design Decisions",
        methodology: "6-week user testing with 47 participants across 7 business types",
        metrics: [
          { label: "Task Completion Rate", before: 62, after: 100, unit: "%" },
          { label: "Time on Task", before: 4.2, after: 1.8, unit: "min" },
          { label: "User Satisfaction", before: 6.1, after: 8.8, unit: "/10" },
        ],
      },
      selector: {
        title: "Business Type Selector",
        subtitle: "Intelligent Onboarding",
        description:
          "Minimalist design without icons to avoid visual distraction. Responsive grid adapting from 1 column (mobile) to 3 columns (desktop).",
      },
      architecture: {
        title: "Technical Architecture",
        subtitle: "Database & Backend Integration",
      },
      results: {
        title: "Results & Impact",
        improvements: [
          { label: "Reduced irrelevant features", value: "From ~15 generic sections to 3-4 specific per business" },
          { label: "Personalization", value: "7 unique experiences vs 1 generic" },
          { label: "Actionable metrics", value: "4 new widgets with real-time data" },
        ],
        ux: [
          "Reduced cognitive load: Only see what's relevant",
          "Lower time to value: Users find what they need faster",
          "Improved clarity: Industry-specific terminology",
        ],
      },
      principles: {
        title: "Design Principles",
        items: [
          {
            icon: Target,
            title: "Progressive Disclosure",
            description: "Show only necessary information at each step",
          },
          {
            icon: Palette,
            title: "Semantic Color System",
            description: "Each business type has its own color palette",
          },
          {
            icon: Layout,
            title: "Consistent Spacing",
            description: "24px rhythm for visual harmony",
          },
          {
            icon: BarChart3,
            title: "Data Visualization",
            description: "Actionable metrics with clear hierarchy",
          },
        ],
      },
    },
    es: {
      title: "Versión 2.0: Dashboards Personalizados por Tipo de Negocio",
      subtitle: "Refinamiento UX/UI & Diseño Centrado en el Usuario",
      problem: {
        title: "Problema Identificado",
        description:
          "La V1 ofrecía una experiencia genérica para todos los usuarios, sin considerar que diferentes tipos de negocio tienen diferentes necesidades:",
        points: [
          "Un e-commerce necesita gestionar inventario y productos",
          "Un restaurante requiere menú digital y sistema de reservas",
          "Una peluquería necesita agenda de turnos y lista de servicios",
          "Una inmobiliaria gestiona propiedades y visitas",
        ],
        result: "Los usuarios veían funcionalidades irrelevantes, generando confusión y baja adopción.",
      },
      solution: {
        title: "Solución Implementada",
        description: "Dashboards personalizados según el tipo de negocio seleccionado durante el onboarding.",
      },
      research: {
        title: "Investigación UX & Testing",
        subtitle: "Decisiones de Diseño Basadas en Datos",
        methodology: "6 semanas de testing con 47 participantes en 7 tipos de negocio",
        metrics: [
          { label: "Tasa de Completitud", before: 62, after: 100, unit: "%" },
          { label: "Tiempo en Tarea", before: 4.2, after: 1.8, unit: "min" },
          { label: "Satisfacción del Usuario", before: 6.1, after: 8.8, unit: "/10" },
        ],
      },
      selector: {
        title: "Selector de Tipo de Negocio",
        subtitle: "Onboarding Inteligente",
        description:
          "Diseño minimalista sin íconos para evitar distracción visual. Grid responsive que se adapta de 1 columna (móvil) a 3 columnas (desktop).",
      },
      architecture: {
        title: "Arquitectura Técnica",
        subtitle: "Base de Datos & Integración Backend",
      },
      results: {
        title: "Resultados e Impacto",
        improvements: [
          { label: "Reducción de funcionalidades irrelevantes", value: "De ~15 secciones genéricas a 3-4 específicas" },
          { label: "Personalización", value: "7 experiencias únicas vs 1 genérica" },
          { label: "Métricas accionables", value: "4 nuevos widgets con datos en tiempo real" },
        ],
        ux: [
          "Carga cognitiva reducida: Solo ver lo relevante",
          "Menor tiempo hasta el valor: Los usuarios encuentran lo que necesitan más rápido",
          "Claridad mejorada: Terminología específica por industria",
        ],
      },
      principles: {
        title: "Principios de Diseño",
        items: [
          {
            icon: Target,
            title: "Progressive Disclosure",
            description: "Mostrar solo la información necesaria en cada paso",
          },
          {
            icon: Palette,
            title: "Sistema de Color Semántico",
            description: "Cada tipo de negocio tiene su propia paleta de colores",
          },
          {
            icon: Layout,
            title: "Espaciado Consistente",
            description: "Ritmo de 24px para armonía visual",
          },
          {
            icon: BarChart3,
            title: "Visualización de Datos",
            description: "Métricas accionables con jerarquía clara",
          },
        ],
      },
    },
  }

  const content = v2Content[language]

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
              <span>Back to Portfolio</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="text-sm font-light hover:text-amber-600 transition-colors duration-300"
              >
                {language === "en" ? "ES" : "EN"}
              </button>
              <div className="text-sm font-light tracking-wider">ABA AI PROJECT</div>
            </div>
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
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  <span className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    Full-Stack AI Project • 2024
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">ABA AI</h1>
                <p className="text-2xl font-light text-stone-600 dark:text-stone-400">
                  Multi-Platform AI Assistant for Business
                </p>
              </div>
              <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-3xl">
                An intelligent AI assistant that connects through Meta platforms, automatically responding to WhatsApp,
                Instagram, and Facebook messages. Built the complete solution including backend, frontend, and UX/UI
                design.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a
                  href="https://github.com/abrilmarangoni/ABAai-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm font-light hover:text-amber-600 transition-colors duration-300"
                >
                  <Github className="h-4 w-4" />
                  <span>View Repository</span>
                </a>
                <div className="h-4 w-px bg-stone-300 dark:bg-stone-700"></div>
                <a
                  href="https://ab-aai-portfolio-9i71-rldhul616-marangoniiabril-9954s-projects.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm font-light hover:text-amber-600 transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Full Demo</span>
                </a>
                <div className="flex items-center space-x-2 text-sm font-light text-stone-500">
                  <Lock className="h-4 w-4" />
                  <span>Demo Credentials Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version Tabs */}
      <section className="py-8 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-4">
            <Button
              variant={activeTab === "v1" ? "default" : "outline"}
              onClick={() => setActiveTab("v1")}
              className="px-8"
            >
              Version 1.0 (Technical)
            </Button>
            <Button
              variant={activeTab === "v2" ? "default" : "outline"}
              onClick={() => setActiveTab("v2")}
              className="px-8"
            >
              Version 2.0 (UX/UI Refined)
            </Button>
          </div>
        </div>
      </section>

      {/* V1 Content */}
      {activeTab === "v1" && (
        <>
          {/* Cover Image V1 */}
          <section className="py-16 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-stone-200 dark:border-stone-800">
                <Image
                  src="/images/aba-ai-cover.png"
                  alt="ABA AI Version 1 - Technical Interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-center text-sm text-stone-500 dark:text-stone-500 mt-4 font-light">
                Version 1.0 - Functional prototype focused on technical implementation
              </p>
            </div>
          </section>

          {/* Project Overview */}
          <section className="py-16 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    My Role
                  </h3>
                  <p className="font-light">Full-Stack Developer & UX/UI Designer</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    Timeline
                  </h3>
                  <p className="font-light">3 months • Personal Project</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    Technologies
                  </h3>
                  <p className="font-light">React, NestJS, PostgreSQL, OpenAI, Meta API</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Core Features
                    </h2>
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">What It Does</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={index}
                        className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-amber-600" />
                          <h4 className="text-lg font-light">{feature.title}</h4>
                        </div>
                        <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Technical Architecture
                    </h2>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">Built From Scratch</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Code2 className="h-5 w-5 text-amber-600" />
                        <h4 className="text-xl font-light">Frontend</h4>
                      </div>
                      <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        {techStack.frontend.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-4 w-4 text-amber-600" />
                            <span className="font-light text-sm">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-amber-600" />
                        <h4 className="text-xl font-light">Backend</h4>
                      </div>
                      <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        {techStack.backend.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-4 w-4 text-amber-600" />
                            <span className="font-light text-sm">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Cpu className="h-5 w-5 text-amber-600" />
                        <h4 className="text-xl font-light">AI & ML</h4>
                      </div>
                      <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        {techStack.ai.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-4 w-4 text-amber-600" />
                            <span className="font-light text-sm">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-amber-600" />
                        <h4 className="text-xl font-light">Integrations</h4>
                      </div>
                      <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        {techStack.integrations.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-4 w-4 text-amber-600" />
                            <span className="font-light text-sm">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Layers className="h-5 w-5 text-amber-600" />
                        <h4 className="text-xl font-light">Infrastructure</h4>
                      </div>
                      <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        {techStack.infrastructure.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle2 className="h-4 w-4 text-amber-600" />
                            <span className="font-light text-sm">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Code Samples */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Implementation
                    </h2>
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">Real Code Examples</h3>
                </div>

                <div className="space-y-8">
                  {/* AI Context Management */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Terminal className="h-5 w-5 text-amber-600" />
                      <h4 className="text-xl font-light">AI Context Management</h4>
                    </div>
                    <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                      <pre className="text-sm leading-relaxed">
                        <code>
                          <span className="text-stone-500">// AI service with context from business data</span>
                          {"\n"}
                          <span className="text-purple-400">async</span>{" "}
                          <span className="text-blue-400">generateResponse</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-orange-400">message</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-green-400">string</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-orange-400">context</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-green-400">BusinessContext</span>
                          <span className="text-stone-300">) {"{"}</span>
                          {"\n  "}
                          <span className="text-purple-400">const</span>{" "}
                          <span className="text-blue-300">systemPrompt</span>
                          <span className="text-stone-300"> = </span>
                          <span className="text-amber-300">`</span>
                          {"\n    "}
                          <span className="text-amber-300">You are an AI assistant for ${"{"}</span>
                          <span className="text-blue-300">context.businessName</span>
                          <span className="text-amber-300">{"}"}</span>
                          <span className="text-amber-300">.</span>
                          {"\n    "}
                          <span className="text-amber-300">Products: ${"{"}</span>
                          <span className="text-blue-300">context.products</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">map</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-orange-400">p</span>
                          <span className="text-stone-300">{" => "}</span>
                          <span className="text-orange-400">p</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">name</span>
                          <span className="text-stone-300">).</span>
                          <span className="text-blue-400">join</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-amber-300">', '</span>
                          <span className="text-stone-300">)</span>
                          <span className="text-amber-300">{"}"}</span>
                          {"\n    "}
                          <span className="text-amber-300">Services: ${"{"}</span>
                          <span className="text-blue-300">context.services</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">map</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-orange-400">s</span>
                          <span className="text-stone-300">{" => "}</span>
                          <span className="text-orange-400">s</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">name</span>
                          <span className="text-stone-300">).</span>
                          <span className="text-blue-400">join</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-amber-300">', '</span>
                          <span className="text-stone-300">)</span>
                          <span className="text-amber-300">{"}"}</span>
                          {"\n    "}
                          <span className="text-amber-300">Response style: Professional, helpful, and contextual</span>
                          {"\n  "}
                          <span className="text-amber-300">`</span>
                          <span className="text-stone-300">;</span>
                          {"\n\n  "}
                          <span className="text-purple-400">const</span>{" "}
                          <span className="text-blue-300">completion</span>
                          <span className="text-stone-300"> = </span>
                          <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">openai</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">chat</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">completions</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">create</span>
                          <span className="text-stone-300">({"{"}</span>
                          {"\n    "}
                          <span className="text-blue-300">model</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-amber-300">'gpt-4'</span>
                          <span className="text-stone-300">,</span>
                          {"\n    "}
                          <span className="text-blue-300">messages</span>
                          <span className="text-stone-300">: [</span>
                          {"\n      "}
                          <span className="text-stone-300">{"{"} </span>
                          <span className="text-blue-300">role</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-amber-300">'system'</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-blue-300">content</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-blue-300">systemPrompt</span>
                          <span className="text-stone-300"> {"}"},</span>
                          {"\n      "}
                          <span className="text-stone-300">{"{"} </span>
                          <span className="text-blue-300">role</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-amber-300">'user'</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-blue-300">content</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-blue-300">message</span>
                          <span className="text-stone-300"> {"}"}</span>
                          {"\n    "}
                          <span className="text-stone-300">],</span>
                          {"\n    "}
                          <span className="text-blue-300">temperature</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-pink-400">0.7</span>
                          <span className="text-stone-300">,</span>
                          {"\n    "}
                          <span className="text-blue-300">max_tokens</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-pink-400">500</span>
                          {"\n  "}
                          <span className="text-stone-300">{"}"});</span>
                          {"\n\n  "}
                          <span className="text-purple-400">return</span>{" "}
                          <span className="text-blue-300">completion</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">choices</span>
                          <span className="text-stone-300">[</span>
                          <span className="text-pink-400">0</span>
                          <span className="text-stone-300">].</span>
                          <span className="text-blue-300">message</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">content</span>
                          <span className="text-stone-300">;</span>
                          {"\n"}
                          <span className="text-stone-300">{"}"}</span>
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Multi-tenant Architecture */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-amber-600" />
                      <h4 className="text-xl font-light">Multi-Tenant Data Isolation</h4>
                    </div>
                    <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                      <pre className="text-sm leading-relaxed">
                        <code>
                          <span className="text-stone-500">// Prisma schema with tenant isolation</span>
                          {"\n"}
                          <span className="text-purple-400">model</span>{" "}
                          <span className="text-green-400">Business</span> <span className="text-stone-300">{"{"}</span>
                          {"\n  "}
                          <span className="text-blue-300">id</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@id</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@default</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-400">uuid</span>
                          <span className="text-stone-300">())</span>
                          {"\n  "}
                          <span className="text-blue-300">name</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          {"\n  "}
                          <span className="text-blue-300">apiKey</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@unique</span>
                          {"\n  "}
                          <span className="text-blue-300">products</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">Product</span>
                          <span className="text-stone-300">[]</span>
                          {"\n  "}
                          <span className="text-blue-300">services</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">Service</span>
                          <span className="text-stone-300">[]</span>
                          {"\n  "}
                          <span className="text-blue-300">messages</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">Message</span>
                          <span className="text-stone-300">[]</span>
                          {"\n  "}
                          <span className="text-blue-300">createdAt</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">DateTime</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@default</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-400">now</span>
                          <span className="text-stone-300">())</span>
                          {"\n"}
                          <span className="text-stone-300">{"}"}</span>
                          {"\n\n"}
                          <span className="text-purple-400">model</span> <span className="text-green-400">Message</span>{" "}
                          <span className="text-stone-300">{"{"}</span>
                          {"\n  "}
                          <span className="text-blue-300">id</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@id</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@default</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-400">uuid</span>
                          <span className="text-stone-300">())</span>
                          {"\n  "}
                          <span className="text-blue-300">businessId</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          {"\n  "}
                          <span className="text-blue-300">business</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">Business</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@relation</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-300">fields</span>
                          <span className="text-stone-300">: [</span>
                          <span className="text-blue-300">businessId</span>
                          <span className="text-stone-300">], </span>
                          <span className="text-blue-300">references</span>
                          <span className="text-stone-300">: [</span>
                          <span className="text-blue-300">id</span>
                          <span className="text-stone-300">])</span>
                          {"\n  "}
                          <span className="text-blue-300">platform</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">Platform</span>
                          {"\n  "}
                          <span className="text-blue-300">content</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          {"\n  "}
                          <span className="text-blue-300">aiResponse</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">String</span>
                          <span className="text-stone-300">?</span>
                          {"\n  "}
                          <span className="text-blue-300">createdAt</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-green-400">DateTime</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-pink-400">@default</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-400">now</span>
                          <span className="text-stone-300">())</span>
                          {"\n  "}
                          {"\n  "}
                          <span className="text-pink-400">@@index</span>
                          <span className="text-stone-300">([</span>
                          <span className="text-blue-300">businessId</span>
                          <span className="text-stone-300">])</span>
                          {"\n"}
                          <span className="text-stone-300">{"}"}</span>
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Webhook Handler */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-amber-600" />
                      <h4 className="text-xl font-light">Real-Time Webhook Processing</h4>
                    </div>
                    <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                      <pre className="text-sm leading-relaxed">
                        <code>
                          <span className="text-stone-500">// Meta webhook handler</span>
                          {"\n"}
                          <span className="text-pink-400">@Post</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-amber-300">'webhook'</span>
                          <span className="text-stone-300">)</span>
                          {"\n"}
                          <span className="text-purple-400">async</span>{" "}
                          <span className="text-blue-400">handleWebhook</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-pink-400">@Body</span>
                          <span className="text-stone-300">() </span>
                          <span className="text-orange-400">body</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-green-400">any</span>
                          <span className="text-stone-300">) {"{"}</span>
                          {"\n  "}
                          <span className="text-purple-400">const</span> <span className="text-stone-300">{"{"} </span>
                          <span className="text-blue-300">entry</span>
                          <span className="text-stone-300"> {"}"} = </span>
                          <span className="text-blue-300">body</span>
                          <span className="text-stone-300">;</span>
                          {"\n  "}
                          {"\n  "}
                          <span className="text-purple-400">for</span>
                          <span className="text-stone-300"> (</span>
                          <span className="text-purple-400">const</span> <span className="text-blue-300">item</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-purple-400">of</span>
                          <span className="text-stone-300"> </span>
                          <span className="text-blue-300">entry</span>
                          <span className="text-stone-300">) {"{"}</span>
                          {"\n    "}
                          <span className="text-purple-400">const</span> <span className="text-blue-300">changes</span>
                          <span className="text-stone-300"> = </span>
                          <span className="text-blue-300">item</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">changes</span>
                          <span className="text-stone-300">.[</span>
                          <span className="text-pink-400">0</span>
                          <span className="text-stone-300">];</span>
                          {"\n    "}
                          <span className="text-purple-400">const</span> <span className="text-blue-300">message</span>
                          <span className="text-stone-300"> = </span>
                          <span className="text-blue-300">changes</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">value</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">messages</span>
                          <span className="text-stone-300">?.[</span>
                          <span className="text-pink-400">0</span>
                          <span className="text-stone-300">];</span>
                          {"\n    "}
                          {"\n    "}
                          <span className="text-purple-400">if</span>
                          <span className="text-stone-300"> (</span>
                          <span className="text-blue-300">message</span>
                          <span className="text-stone-300">) {"{"}</span>
                          {"\n      "}
                          <span className="text-stone-500">// Get business context</span>
                          {"\n      "}
                          <span className="text-purple-400">const</span> <span className="text-blue-300">business</span>
                          <span className="text-stone-300"> = </span>
                          <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">getBusinessByPhone</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-300">item</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">id</span>
                          <span className="text-stone-300">);</span>
                          {"\n      "}
                          {"\n      "}
                          <span className="text-stone-500">// Generate AI response</span>
                          {"\n      "}
                          <span className="text-purple-400">const</span>{" "}
                          <span className="text-blue-300">aiResponse</span>
                          <span className="text-stone-300"> = </span>
                          <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">aiService</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">generateResponse</span>
                          <span className="text-stone-300">(</span>
                          {"\n        "}
                          <span className="text-blue-300">message</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">text</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">body</span>
                          <span className="text-stone-300">,</span>
                          {"\n        "}
                          <span className="text-blue-300">business</span>
                          {"\n      "}
                          <span className="text-stone-300">);</span>
                          {"\n      "}
                          {"\n      "}
                          <span className="text-stone-500">// Send response via Meta API</span>
                          {"\n      "}
                          <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">sendMessage</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-300">item</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">id</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-blue-300">message</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">from</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-blue-300">aiResponse</span>
                          <span className="text-stone-300">);</span>
                          {"\n      "}
                          {"\n      "}
                          <span className="text-stone-500">// Store conversation</span>
                          {"\n      "}
                          <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-400">saveMessage</span>
                          <span className="text-stone-300">(</span>
                          <span className="text-blue-300">business</span>
                          <span className="text-stone-300">.</span>
                          <span className="text-blue-300">id</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-blue-300">message</span>
                          <span className="text-stone-300">, </span>
                          <span className="text-blue-300">aiResponse</span>
                          <span className="text-stone-300">);</span>
                          {"\n    "}
                          <span className="text-stone-300">{"}"}</span>
                          {"\n  "}
                          <span className="text-stone-300">{"}"}</span>
                          {"\n  "}
                          {"\n  "}
                          <span className="text-purple-400">return</span>
                          <span className="text-stone-300"> {"{"} </span>
                          <span className="text-blue-300">status</span>
                          <span className="text-stone-300">: </span>
                          <span className="text-amber-300">'ok'</span>
                          <span className="text-stone-300"> {"}"};</span>
                          {"\n"}
                          <span className="text-stone-300">{"}"}</span>
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Architecture Diagram */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      System Design
                    </h2>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">Architecture Overview</h3>
                </div>

                <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-12 border border-stone-200 dark:border-stone-800">
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center space-x-3 bg-blue-100 dark:bg-blue-900/20 px-6 py-3 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        <span className="font-light">Meta Platforms (WhatsApp, Instagram, Facebook)</span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="h-12 w-px bg-stone-300 dark:bg-stone-700"></div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-amber-600" />
                          <span className="font-light text-sm">Webhooks</span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light">
                          Real-time message notifications
                        </p>
                      </div>

                      <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-amber-600" />
                          <span className="font-light text-sm">NestJS Backend</span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light">
                          Business logic & data processing
                        </p>
                      </div>

                      <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 text-amber-600" />
                          <span className="font-light text-sm">OpenAI GPT-4</span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light">Contextual AI responses</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="h-12 w-px bg-stone-300 dark:bg-stone-700"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-amber-600" />
                          <span className="font-light text-sm">PostgreSQL + Prisma</span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light">
                          Multi-tenant data storage
                        </p>
                      </div>

                      <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-6 space-y-3 border border-stone-200 dark:border-stone-800">
                        <div className="flex items-center space-x-2">
                          <Code2 className="h-4 w-4 text-amber-600" />
                          <span className="font-light text-sm">React Dashboard</span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light">
                          Business management interface
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Development Process
                    </h2>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">Challenges & Solutions</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                      <h4 className="text-lg font-light mb-4">Challenge: Multi-Tenant Architecture</h4>
                      <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed mb-4">
                        Each business needed completely isolated data while sharing the same infrastructure.
                      </p>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-light">
                          <strong>Solution:</strong> Implemented row-level security with businessId foreign keys,
                          ensuring complete data isolation at the database level with Prisma middleware.
                        </p>
                      </div>
                    </div>

                    <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                      <h4 className="text-lg font-light mb-4">Challenge: AI Context Management</h4>
                      <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed mb-4">
                        AI needed to understand each business's products, services, and brand voice.
                      </p>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-light">
                          <strong>Solution:</strong> Created dynamic system prompts that inject business-specific data
                          into each AI call, with conversation history for context continuity.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                      <h4 className="text-lg font-light mb-4">Challenge: Real-Time Responses</h4>
                      <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed mb-4">
                        Users expect instant responses on messaging platforms.
                      </p>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-light">
                          <strong>Solution:</strong> Implemented webhook handlers with async processing, queue-based
                          message handling, and optimized AI response times to under 3 seconds.
                        </p>
                      </div>
                    </div>

                    <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 border border-stone-200 dark:border-stone-800">
                      <h4 className="text-lg font-light mb-4">Challenge: Secure API Key Storage</h4>
                      <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed mb-4">
                        Businesses needed to connect their Meta API credentials securely.
                      </p>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-light">
                          <strong>Solution:</strong> Implemented AES-256 encryption for API keys at rest,
                          environment-based key management, and secure credential rotation system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Live Demo Preview Section */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-gradient-to-b from-amber-50/30 to-stone-50 dark:from-amber-900/5 dark:to-stone-950">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Live Demo
                    </h2>
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">Interactive Preview</h3>
                  <p className="text-stone-600 dark:text-stone-400 font-light max-w-2xl mx-auto">
                    Explore the functional Version 1 demo directly in your browser
                  </p>
                </div>

                {/* Embedded Demo Preview */}
                <div className="relative">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border-2 border-stone-300 dark:border-stone-700 shadow-2xl bg-white dark:bg-stone-900">
                    <iframe
                      src="https://ab-aai-portfolio-9i71-rldhul616-marangoniiabril-9954s-projects.vercel.app"
                      className="w-full h-full"
                      title="ABA AI Demo V1"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <a
                      href="https://ab-aai-portfolio-9i71-rldhul616-marangoniiabril-9954s-projects.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-light text-sm transition-colors duration-300 shadow-lg"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span>Open Full Screen</span>
                    </a>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-stone-900 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <h4 className="text-lg font-light">Fully Functional</h4>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      Complete demo with real AI responses and multi-platform integration
                    </p>
                  </div>

                  <div className="bg-white dark:bg-stone-900 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-6 w-6 text-amber-600" />
                      <h4 className="text-lg font-light">Test Credentials</h4>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      Pre-configured demo accounts for secure exploration
                    </p>
                  </div>

                  <div className="bg-white dark:bg-stone-900 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center space-x-3">
                      <Database className="h-6 w-6 text-blue-600" />
                      <h4 className="text-lg font-light">Sample Data</h4>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      Example products, services, and conversation histories
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-stone-100 dark:bg-stone-950 rounded-lg p-6 border border-stone-200 dark:border-stone-800">
                    <h5 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400 mb-4">
                      What You Can Test
                    </h5>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">Dashboard with business management</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">Product and service configuration</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">AI conversation simulator</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">Real-time message responses</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-stone-100 dark:bg-stone-950 rounded-lg p-6 border border-stone-200 dark:border-stone-800">
                    <h5 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400 mb-4">
                      Demo Features
                    </h5>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">No real API keys required</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">Sandbox environment only</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">Pre-configured test accounts</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">Sample data for exploration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results & Impact */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Version 1 Results
                    </h2>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light">Technical Achievements</h3>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="text-center space-y-4">
                    <div className="text-5xl font-light text-amber-600">100%</div>
                    <p className="text-stone-600 dark:text-stone-400 font-light">Functional prototype achieved</p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-5xl font-light text-amber-600">{"<"}3s</div>
                    <p className="text-stone-600 dark:text-stone-400 font-light">Average AI response time</p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-5xl font-light text-amber-600">3</div>
                    <p className="text-stone-600 dark:text-stone-400 font-light">Platforms integrated seamlessly</p>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-8 border border-amber-200 dark:border-amber-900">
                  <p className="text-center text-stone-700 dark:text-stone-300 font-light leading-relaxed">
                    <strong className="font-normal">Version 1 Focus:</strong> Building a solid technical foundation with
                    working AI integration, multi-tenant architecture, and real-time messaging across all Meta
                    platforms. The UI was functional but basic—setting the stage for UX/UI refinements in Version 2.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* V2 Content */}
      {activeTab === "v2" && (
        <>
          {/* V2 Hero */}
          <section className="py-16 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-8 h-px bg-amber-400"></div>
                  <Sparkles className="h-6 w-6 text-amber-600" />
                  <div className="w-8 h-px bg-amber-400"></div>
                </div>
                <h2 className="text-4xl lg:text-5xl font-light">{content.title}</h2>
                <p className="text-xl text-stone-600 dark:text-stone-400 font-light max-w-3xl mx-auto">
                  {content.subtitle}
                </p>
              </div>
            </div>
          </section>

          {/* Problem Identified */}
          <section className="py-16 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      {content.problem.title}
                    </h3>
                  </div>
                  <h4 className="text-3xl font-light">{content.problem.description}</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {content.problem.points.map((point, index) => (
                    <div
                      key={index}
                      className="bg-stone-50 dark:bg-stone-950 rounded-lg p-6 border border-stone-200 dark:border-stone-800"
                    >
                      <p className="font-light text-sm">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-6 border border-red-200 dark:border-red-900">
                  <p className="text-center font-light">
                    <strong className="font-normal">{language === "en" ? "Result:" : "Resultado:"}</strong>{" "}
                    {content.problem.result}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* UX Research */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      {content.research.title}
                    </h3>
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-light">{content.research.subtitle}</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light">{content.research.methodology}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {content.research.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 space-y-6 border border-stone-200 dark:border-stone-800"
                    >
                      <h5 className="text-lg font-light text-center">{metric.label}</h5>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-600 dark:text-stone-400">V1</span>
                            <span className="font-light">
                              {metric.before}
                              {metric.unit}
                            </span>
                          </div>
                          <div className="h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-400"
                              style={{ width: `${metric.unit === "min" ? (metric.before / 5) * 100 : metric.before}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-stone-600 dark:text-stone-400">V2</span>
                            <span className="font-light">
                              {metric.after}
                              {metric.unit}
                            </span>
                          </div>
                          <div className="h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${metric.unit === "min" ? (metric.after / 5) * 100 : metric.after}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center pt-4 border-t border-stone-200 dark:border-stone-800">
                        <div className="flex items-center justify-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span className="text-2xl font-light text-green-600">
                            {metric.unit === "min"
                              ? `-${Math.round(((metric.before - metric.after) / metric.before) * 100)}%`
                              : `+${Math.round(((metric.after - metric.before) / metric.before) * 100)}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Business Type Selector */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      {content.selector.title}
                    </h3>
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-light">{content.selector.subtitle}</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light max-w-3xl mx-auto">
                    {content.selector.description}
                  </p>
                </div>

                {/* Interactive Business Type Selector Demo */}
                <div className="bg-white dark:bg-stone-950 rounded-xl p-12 border border-stone-200 dark:border-stone-800 shadow-xl">
                  <div className="space-y-8">
                    <div className="text-center space-y-2">
                      <h5 className="text-2xl font-light">
                        {language === "en" ? "What type of business do you have?" : "¿Qué tipo de negocio tenés?"}
                      </h5>
                      <p className="text-stone-600 dark:text-stone-400 font-light text-sm">
                        {language === "en"
                          ? "This helps us personalize your experience"
                          : "Esto nos ayuda a personalizar tu experiencia"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
                      {businessTypes.map((type) => (
                        <button
                          key={type.id}
                          className={`relative p-4 rounded-lg border-2 transition-all duration-200 text-left bg-white dark:bg-stone-950 ${type.borderColor} hover:shadow-md`}
                        >
                          <div className="absolute top-2 right-2">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${type.color}`}></div>
                          </div>

                          <h6 className="text-sm font-semibold mb-1">{type.name}</h6>
                          <p className="text-xs text-stone-600 dark:text-stone-400 mb-1">{type.description}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-500">{type.examples}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* UX Principles */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-lg font-light">
                      {language === "en" ? "UX Principles Applied" : "Principios de UX Aplicados"}
                    </h5>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">Progressive Disclosure:</strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "Only show what's necessary at each step"
                              : "Solo mostrar lo necesario en cada paso"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">Affordance:</strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "Cards look clickable by design"
                              : "Los cards parecen clickeables por su diseño"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">
                            {language === "en" ? "Immediate Feedback" : "Feedback Inmediato"}:
                          </strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en" ? "Visual indicator when selecting" : "Indicador visual al seleccionar"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">
                            {language === "en" ? "Scannability" : "Escaneabilidad"}:
                          </strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "Clear visual hierarchy (title > description > examples)"
                              : "Jerarquía visual clara (título > descripción > ejemplos)"}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-lg font-light">
                      {language === "en" ? "Design Decisions" : "Decisiones de Diseño"}
                    </h5>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <Palette className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">{language === "en" ? "No icons" : "Sin íconos"}:</strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "Avoid visual distraction, focus on content"
                              : "Evitar distracción visual, enfoque en contenido"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Layout className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">
                            {language === "en" ? "Responsive grid" : "Grid responsive"}:
                          </strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "1 column (mobile) to 3 columns (desktop)"
                              : "1 columna (móvil) a 3 columnas (desktop)"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Sparkles className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">
                            {language === "en" ? "Color indicator" : "Indicador de color"}:
                          </strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "Circular gradient indicator on selection"
                              : "Indicador circular con gradiente al seleccionar"}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="font-normal">
                            {language === "en" ? "Border feedback" : "Feedback de borde"}:
                          </strong>{" "}
                          <span className="text-stone-600 dark:text-stone-400 font-light text-sm">
                            {language === "en"
                              ? "Color border on selection, no strong background"
                              : "Borde de color al seleccionar, sin fondo fuerte"}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      {content.architecture.title}
                    </h3>
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-light">{content.architecture.subtitle}</h4>
                </div>

                {/* Database Migration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-amber-600" />
                    <h5 className="text-xl font-light">
                      {language === "en" ? "Database Migration" : "Migración de Base de Datos"}
                    </h5>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                    <pre className="text-sm leading-relaxed">
                      <code>
                        <span className="text-stone-500">
                          {language === "en"
                            ? "-- Migration: Add business_type field"
                            : "-- Migración: Agregar campo business_type"}
                        </span>
                        {"\n"}
                        <span className="text-purple-400">ALTER TABLE</span>{" "}
                        <span className="text-green-400">tenants</span>
                        {"\n"}
                        <span className="text-purple-400">ADD COLUMN</span>{" "}
                        <span className="text-blue-300">business_type</span>{" "}
                        <span className="text-green-400">TEXT</span>
                        <span className="text-stone-300">;</span>
                        {"\n\n"}
                        <span className="text-stone-500">
                          {language === "en"
                            ? "-- Optional field for backward compatibility"
                            : "-- Campo opcional para compatibilidad con usuarios existentes"}
                        </span>
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Prisma Schema */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code2 className="h-5 w-5 text-amber-600" />
                    <h5 className="text-xl font-light">Prisma Schema</h5>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                    <pre className="text-sm leading-relaxed">
                      <code>
                        <span className="text-purple-400">model</span> <span className="text-green-400">Tenant</span>{" "}
                        <span className="text-stone-300">{"{"}</span>
                        {"\n  "}
                        <span className="text-blue-300">id</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-green-400">String</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-pink-400">@id</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-pink-400">@default</span>
                        <span className="text-stone-300">(</span>
                        <span className="text-blue-400">cuid</span>
                        <span className="text-stone-300">())</span>
                        {"\n  "}
                        <span className="text-blue-300">name</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-green-400">String</span>
                        {"\n  "}
                        <span className="text-blue-300">email</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-green-400">String</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-pink-400">@unique</span>
                        {"\n  "}
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-green-400">String</span>
                        <span className="text-stone-300">? </span>
                        <span className="text-pink-400">@map</span>
                        <span className="text-stone-300">(</span>
                        <span className="text-amber-300">"business_type"</span>
                        <span className="text-stone-300">)</span>
                        {"\n  "}
                        <span className="text-stone-500">// ... other fields</span>
                        {"\n"}
                        <span className="text-stone-300">{"}"}</span>
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Backend Integration */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Terminal className="h-5 w-5 text-amber-600" />
                    <h5 className="text-xl font-light">
                      {language === "en" ? "Backend Integration" : "Integración Backend"}
                    </h5>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                    <pre className="text-sm leading-relaxed">
                      <code>
                        <span className="text-stone-500">// AuthService - Registration</span>
                        {"\n"}
                        <span className="text-purple-400">async</span> <span className="text-blue-400">register</span>
                        <span className="text-stone-300">(</span>
                        <span className="text-orange-400">userData</span>
                        <span className="text-stone-300">: </span>
                        <span className="text-green-400">RegisterDto</span>
                        <span className="text-stone-300">) {"{"}</span>
                        {"\n  "}
                        <span className="text-purple-400">const</span>{" "}
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300"> = </span>
                        <span className="text-blue-300">userData</span>
                        <span className="text-stone-300">.</span>
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300">;</span>
                        {"\n  "}
                        {"\n  "}
                        <span className="text-purple-400">const</span> <span className="text-blue-300">tenant</span>
                        <span className="text-stone-300"> = </span>
                        <span className="text-purple-400">await</span> <span className="text-purple-400">this</span>
                        <span className="text-stone-300">.</span>
                        <span className="text-blue-300">prisma</span>
                        <span className="text-stone-300">.</span>
                        <span className="text-blue-300">tenant</span>
                        <span className="text-stone-300">.</span>
                        <span className="text-blue-400">create</span>
                        <span className="text-stone-300">({"{"}</span>
                        {"\n    "}
                        <span className="text-blue-300">data</span>
                        <span className="text-stone-300">: {"{"}</span>
                        {"\n      "}
                        <span className="text-blue-300">name</span>
                        <span className="text-stone-300">: </span>
                        <span className="text-blue-300">userData</span>
                        <span className="text-stone-300">.</span>
                        <span className="text-blue-300">businessName</span>
                        <span className="text-stone-300">,</span>
                        {"\n      "}
                        <span className="text-blue-300">email</span>
                        <span className="text-stone-300">: </span>
                        <span className="text-blue-300">userData</span>
                        <span className="text-stone-300">.</span>
                        <span className="text-blue-300">email</span>
                        <span className="text-stone-300">,</span>
                        {"\n      "}
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300">: </span>
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300"> || </span>
                        <span className="text-purple-400">null</span>
                        <span className="text-stone-300">,</span>
                        {"\n      "}
                        <span className="text-stone-500">// ...</span>
                        {"\n    "}
                        <span className="text-stone-300">{"}"},</span>
                        {"\n  "}
                        <span className="text-stone-300">{"}"});</span>
                        {"\n  "}
                        {"\n  "}
                        <span className="text-purple-400">return</span> <span className="text-blue-300">tenant</span>
                        <span className="text-stone-300">;</span>
                        {"\n"}
                        <span className="text-stone-300">{"}"}</span>
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Dynamic Sidebar */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Layout className="h-5 w-5 text-amber-600" />
                    <h5 className="text-xl font-light">
                      {language === "en"
                        ? "Dynamic Sidebar with Conditional Routing"
                        : "Sidebar Dinámico con Routing Condicional"}
                    </h5>
                  </div>
                  <div className="bg-stone-950 rounded-xl p-8 overflow-x-auto shadow-xl border border-stone-800">
                    <pre className="text-sm leading-relaxed">
                      <code>
                        <span className="text-stone-500">
                          {language === "en"
                            ? "// Sidebar adapts based on businessType"
                            : "// Sidebar se adapta según businessType"}
                        </span>
                        {"\n"}
                        <span className="text-stone-300">{"{"}</span>
                        <span className="text-blue-300">business</span>
                        <span className="text-stone-300">?.</span>
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300"> === </span>
                        <span className="text-amber-300">'productos'</span>
                        <span className="text-stone-300"> && (</span>
                        {"\n  "}
                        <span className="text-stone-300">{"<>"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"<"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-blue-300">onClick</span>
                        <span className="text-stone-300">{"={() => setActiveTab('productos')}>"}</span>
                        {"\n      "}
                        <span className="text-stone-300">
                          {language === "en" ? "Product Catalog" : "Catálogo de Productos"}
                        </span>
                        {"\n    "}
                        <span className="text-stone-300">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300">{">"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"<"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-blue-300">onClick</span>
                        <span className="text-stone-300">{"={() => setActiveTab('promociones')}>"}</span>
                        {"\n      "}
                        <span className="text-stone-300">{language === "en" ? "Promotions" : "Promociones"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300">{">"}</span>
                        {"\n  "}
                        <span className="text-stone-300">{"</>"}</span>
                        {"\n"}
                        <span className="text-stone-300">){"}"}</span>
                        {"\n\n"}
                        <span className="text-stone-300">{"{"}</span>
                        <span className="text-blue-300">business</span>
                        <span className="text-stone-300">?.</span>
                        <span className="text-blue-300">businessType</span>
                        <span className="text-stone-300"> === </span>
                        <span className="text-amber-300">'gastronomia'</span>
                        <span className="text-stone-300"> && (</span>
                        {"\n  "}
                        <span className="text-stone-300">{"<>"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"<"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-blue-300">onClick</span>
                        <span className="text-stone-300">{"={() => setActiveTab('menu')}>"}</span>
                        {"\n      "}
                        <span className="text-stone-300">{language === "en" ? "Digital Menu" : "Menú Digital"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300">{">"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"<"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300"> </span>
                        <span className="text-blue-300">onClick</span>
                        <span className="text-stone-300">{"={() => setActiveTab('reservas')}>"}</span>
                        {"\n      "}
                        <span className="text-stone-300">{language === "en" ? "Reservations" : "Reservas"}</span>
                        {"\n    "}
                        <span className="text-stone-300">{"</"}</span>
                        <span className="text-green-400">button</span>
                        <span className="text-stone-300">{">"}</span>
                        {"\n  "}
                        <span className="text-stone-300">{"</>"}</span>
                        {"\n"}
                        <span className="text-stone-300">){"}"}</span>
                        {"\n\n"}
                        <span className="text-stone-500">
                          {language === "en" ? "// ... 5 more business types" : "// ... 5 tipos más"}
                        </span>
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Design Principles */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      {content.principles.title}
                    </h3>
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {content.principles.items.map((principle, index) => {
                    const Icon = principle.icon
                    return (
                      <div
                        key={index}
                        className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800"
                      >
                        <Icon className="h-8 w-8 text-amber-600" />
                        <h5 className="text-lg font-light">{principle.title}</h5>
                        <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Results & Impact */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-16">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                    <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      {content.results.title}
                    </h3>
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-light">
                    {language === "en" ? "Quantifiable Improvements" : "Mejoras Cuantificables"}
                  </h4>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {content.results.improvements.map((improvement, index) => (
                    <div
                      key={index}
                      className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800"
                    >
                      <h5 className="text-sm font-light text-stone-600 dark:text-stone-400">{improvement.label}</h5>
                      <p className="text-lg font-light">{improvement.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h5 className="text-xl font-light">{language === "en" ? "UX Improvements" : "Mejoras de UX"}</h5>
                  <div className="grid md:grid-cols-3 gap-6">
                    {content.results.ux.map((item, index) => (
                      <div
                        key={index}
                        className="bg-green-50 dark:bg-green-900/10 rounded-lg p-6 border border-green-200 dark:border-green-900"
                      >
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="font-light text-sm">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-8 border border-amber-200 dark:border-amber-900">
                  <p className="text-center text-stone-700 dark:text-stone-300 font-light leading-relaxed">
                    <strong className="font-normal">
                      {language === "en" ? "Version 2 Focus:" : "Enfoque de Versión 2:"}
                    </strong>{" "}
                    {language === "en"
                      ? "Transforming a functional prototype into a user-centered experience with personalized dashboards, reducing cognitive load, and improving time to value through industry-specific features and terminology."
                      : "Transformar un prototipo funcional en una experiencia centrada en el usuario con dashboards personalizados, reduciendo la carga cognitiva y mejorando el tiempo hasta el valor a través de funcionalidades y terminología específicas por industria."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-12">
                <div className="text-center space-y-6">
                  <h3 className="text-3xl font-light">{language === "en" ? "Next Steps" : "Próximos Pasos"}</h3>
                  <p className="text-stone-600 dark:text-stone-400 font-light max-w-2xl mx-auto">
                    {language === "en"
                      ? "Roadmap for continued improvement and feature expansion"
                      : "Hoja de ruta para mejora continua y expansión de funcionalidades"}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-6 w-6 text-amber-600" />
                      <h5 className="text-lg font-light">{language === "en" ? "Short Term" : "Corto Plazo"}</h5>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">
                          {language === "en"
                            ? "Implement specific managers (MenuManager, ReservasManager, etc.)"
                            : "Implementar gestores específicos (MenuManager, ReservasManager, etc.)"}
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">
                          {language === "en"
                            ? "Integrate FAQs component in all sections"
                            : "Integrar componente de FAQs en todas las secciones"}
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">
                          {language === "en"
                            ? "A/B testing to validate conversion improvements"
                            : "A/B testing para validar mejoras de conversión"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-stone-50 dark:bg-stone-950 rounded-lg p-8 space-y-4 border border-stone-200 dark:border-stone-800">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-amber-600" />
                      <h5 className="text-lg font-light">{language === "en" ? "Long Term" : "Largo Plazo"}</h5>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">
                          {language === "en"
                            ? "Analytics to measure engagement by business type"
                            : "Analytics para medir engagement por tipo de negocio"}
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">
                          {language === "en"
                            ? "Advanced AI features per industry"
                            : "Funcionalidades de IA avanzadas por industria"}
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">
                          {language === "en" ? "Mobile app with native experience" : "App móvil con experiencia nativa"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-sm font-light text-stone-500 dark:text-stone-500">
            <div>© 2025 Abril Marangoni</div>
            <Link href="/" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-300">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
