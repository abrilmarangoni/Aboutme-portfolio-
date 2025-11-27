"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Code2, Palette, Zap, Shield, TrendingUp, Users } from "lucide-react"

export default function FintechProject() {
  const [scrollY, setScrollY] = useState(0)
  const [language, setLanguage] = useState<"en" | "es">("en")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = {
    en: {
      nav: {
        back: "Back to Portfolio",
        title: "OneClick Fintech",
      },
      hero: {
        tag: "Fintech • Full-Stack Development",
        title: "OneClick Fintech Checkout",
        subtitle:
          "A comprehensive fintech platform that simplifies payment processing for businesses and individuals through intelligent automation and seamless bank integration.",
        collaboration: "Co-founded with",
        cofounder: "Peter Kohler",
        location: "Chicago, IL",
        involvement: "Led development through MVP",
      },
      overview: {
        role: "Role",
        roleValue: "Full-Stack Developer & UX Designer",
        timeline: "Timeline",
        timelineValue: "6 months to MVP",
        tech: "Tech Stack",
        techValue: "Next.js, TypeScript, Tailwind, Supabase, Plaid",
        team: "Team",
        teamValue: "2 co-founders",
      },
      product: {
        title: "The Product",
        heading: "Reimagining Financial Transactions",
        intro:
          "OneClick Fintech was born from a simple observation: payment processing is unnecessarily complex. We set out to create a platform that would make financial transactions as simple as clicking a button, while maintaining enterprise-grade security and compliance.",
        vision: "Our Vision",
        visionText:
          "We envisioned a world where businesses could accept payments without dealing with complex integrations, where individuals could manage their finances across multiple accounts seamlessly, and where every transaction was transparent, secure, and instant.",
        approach: "Our Approach",
        approachText:
          "We built OneClick around three core principles: simplicity in design, power in functionality, and trust through transparency. Every feature was designed to reduce friction while increasing control.",
      },
      features: {
        title: "Key Features",
        feature1: {
          title: "Dual Dashboard System",
          desc: "Separate experiences for personal and business users, each optimized for their specific needs and workflows.",
        },
        feature2: {
          title: "Plaid Integration",
          desc: "Seamless bank account connection supporting 10,000+ financial institutions with real-time balance updates.",
        },
        feature3: {
          title: "ROI Calculator",
          desc: "Interactive tool showing businesses exactly how much they save compared to traditional payment processors.",
        },
        feature4: {
          title: "Real-time Analytics",
          desc: "Comprehensive dashboards showing transaction history, trends, and insights at a glance.",
        },
      },
      architecture: {
        title: "Technical Architecture",
        heading: "Built for Scale and Security",
        intro:
          "We architected OneClick with scalability and security as first-class concerns. Every technical decision was made with both current needs and future growth in mind.",
        stack: "Technology Stack",
        frontend: "Frontend",
        frontendDesc: "Next.js 14 with App Router, TypeScript for type safety, Tailwind CSS for rapid UI development",
        backend: "Backend",
        backendDesc:
          "Supabase for authentication and database, PostgreSQL for data persistence, Row Level Security for data protection",
        integrations: "Integrations",
        integrationsDesc:
          "Plaid for bank connections, Stripe for payment processing, SendGrid for transactional emails",
      },
      codeHighlights: {
        title: "Code Highlights",
        heading: "Engineering Excellence",
        intro: "Here are some of the key technical implementations that power OneClick:",
        highlight1: {
          title: "1. Plaid Link Integration",
          desc: "Secure bank account connection with error handling and user feedback",
        },
        highlight2: {
          title: "2. Dynamic Dashboard Routing",
          desc: "Intelligent routing based on user type with protected routes",
        },
        highlight3: {
          title: "3. ROI Calculator Logic",
          desc: "Real-time calculation showing cost savings compared to competitors",
        },
        highlight4: {
          title: "4. Animated Landing Cards",
          desc: "Smooth hover interactions with Framer Motion",
        },
        highlight5: {
          title: "5. Supabase Authentication",
          desc: "Secure user authentication with session management",
        },
      },
      design: {
        title: "Design System",
        heading: "Visual Language",
        intro:
          "We created a design system that balances professionalism with approachability. Every color, spacing, and interaction was carefully considered.",
        colors: "Color Palette",
        colorsDesc:
          "We chose a sophisticated blue palette (#60A5FA) to convey trust and stability, complemented by purple accents (#A78BFA) for innovation and pink highlights (#F472B6) for calls-to-action.",
        typography: "Typography",
        typographyDesc:
          "Inter for its excellent readability at all sizes, with a clear hierarchy using font weights (300-600) rather than size variations.",
        spacing: "Spacing & Layout",
        spacingDesc:
          "Consistent 8px grid system, generous whitespace for breathing room, and responsive breakpoints that adapt gracefully from mobile to desktop.",
        interactions: "Interactions",
        interactionsDesc:
          "Subtle hover states, smooth transitions (300ms), and micro-animations that provide feedback without being distracting.",
      },
      challenges: {
        title: "Technical Challenges",
        heading: "Problems We Solved",
        challenge1: {
          title: "Bank Integration Complexity",
          problem:
            "Plaid's OAuth flow required careful state management and error handling across multiple redirect steps.",
          solution:
            "Implemented a robust state machine with localStorage persistence and comprehensive error boundaries to handle edge cases.",
        },
        challenge2: {
          title: "Real-time Data Sync",
          problem: "Keeping dashboard data in sync across multiple tabs and devices without constant polling.",
          solution:
            "Leveraged Supabase's real-time subscriptions with optimistic updates and conflict resolution strategies.",
        },
        challenge3: {
          title: "Performance Optimization",
          problem: "Large transaction lists were causing performance issues on the dashboard.",
          solution:
            "Implemented virtual scrolling, pagination, and aggressive caching strategies to maintain 60fps scrolling.",
        },
      },
      results: {
        title: "Results & Impact",
        heading: "Measuring Success",
        intro: "By MVP launch, we had achieved significant milestones:",
        metric1: "50+ beta users",
        metric1Desc: "Early adopters testing the platform",
        metric2: "$100K+ processed",
        metric2Desc: "In transaction volume during beta",
        metric3: "99.9% uptime",
        metric3Desc: "Reliable infrastructure from day one",
        metric4: "4.8/5 rating",
        metric4Desc: "Average user satisfaction score",
      },
      learnings: {
        title: "Key Learnings",
        heading: "What We Discovered",
        learning1: {
          title: "Start with the User",
          desc: "Our best features came from watching users struggle with existing solutions and building exactly what they needed.",
        },
        learning2: {
          title: "Security is Non-Negotiable",
          desc: "In fintech, trust is everything. We invested heavily in security from day one, not as an afterthought.",
        },
        learning3: {
          title: "Simplicity Requires Complexity",
          desc: "Making things simple for users often means handling enormous complexity behind the scenes.",
        },
        learning4: {
          title: "Design Systems Scale",
          desc: "Investing time in a solid design system early paid dividends as we added features and pages.",
        },
      },
      footer: {
        copyright: "© 2025 Abril Marangoni",
        back: "Back to Portfolio",
      },
    },
    es: {
      nav: {
        back: "Volver al Portfolio",
        title: "OneClick Fintech",
      },
      hero: {
        tag: "Fintech • Desarrollo Full-Stack",
        title: "OneClick Fintech Checkout",
        subtitle:
          "Una plataforma fintech integral que simplifica el procesamiento de pagos para empresas e individuos a través de automatización inteligente e integración bancaria fluida.",
        collaboration: "Co-fundado con",
        cofounder: "Peter Kohler",
        location: "Chicago, IL",
        involvement: "Lideré el desarrollo hasta el MVP",
      },
      overview: {
        role: "Rol",
        roleValue: "Desarrollador Full-Stack y Diseñador UX",
        timeline: "Cronología",
        timelineValue: "6 meses hasta MVP",
        tech: "Stack Tecnológico",
        techValue: "Next.js, TypeScript, Tailwind, Supabase, Plaid",
        team: "Equipo",
        teamValue: "2 co-fundadores",
      },
      product: {
        title: "El Producto",
        heading: "Reimaginando las Transacciones Financieras",
        intro:
          "OneClick Fintech nació de una observación simple: el procesamiento de pagos es innecesariamente complejo. Nos propusimos crear una plataforma que hiciera las transacciones financieras tan simples como hacer clic en un botón, manteniendo seguridad y cumplimiento de nivel empresarial.",
        vision: "Nuestra Visión",
        visionText:
          "Imaginamos un mundo donde las empresas pudieran aceptar pagos sin lidiar con integraciones complejas, donde los individuos pudieran gestionar sus finanzas en múltiples cuentas sin problemas, y donde cada transacción fuera transparente, segura e instantánea.",
        approach: "Nuestro Enfoque",
        approachText:
          "Construimos OneClick alrededor de tres principios fundamentales: simplicidad en el diseño, poder en la funcionalidad y confianza a través de la transparencia. Cada característica fue diseñada para reducir la fricción mientras aumentaba el control.",
      },
      features: {
        title: "Características Clave",
        feature1: {
          title: "Sistema de Doble Dashboard",
          desc: "Experiencias separadas para usuarios personales y empresariales, cada una optimizada para sus necesidades y flujos de trabajo específicos.",
        },
        feature2: {
          title: "Integración con Plaid",
          desc: "Conexión fluida de cuentas bancarias compatible con más de 10,000 instituciones financieras con actualizaciones de saldo en tiempo real.",
        },
        feature3: {
          title: "Calculadora de ROI",
          desc: "Herramienta interactiva que muestra a las empresas exactamente cuánto ahorran en comparación con los procesadores de pago tradicionales.",
        },
        feature4: {
          title: "Análisis en Tiempo Real",
          desc: "Dashboards completos que muestran historial de transacciones, tendencias e insights de un vistazo.",
        },
      },
      architecture: {
        title: "Arquitectura Técnica",
        heading: "Construido para Escala y Seguridad",
        intro:
          "Arquitecturamos OneClick con escalabilidad y seguridad como preocupaciones de primera clase. Cada decisión técnica se tomó pensando tanto en las necesidades actuales como en el crecimiento futuro.",
        stack: "Stack Tecnológico",
        frontend: "Frontend",
        frontendDesc:
          "Next.js 14 con App Router, TypeScript para seguridad de tipos, Tailwind CSS para desarrollo rápido de UI",
        backend: "Backend",
        backendDesc:
          "Supabase para autenticación y base de datos, PostgreSQL para persistencia de datos, Row Level Security para protección de datos",
        integrations: "Integraciones",
        integrationsDesc:
          "Plaid para conexiones bancarias, Stripe para procesamiento de pagos, SendGrid para emails transaccionales",
      },
      codeHighlights: {
        title: "Destacados de Código",
        heading: "Excelencia en Ingeniería",
        intro: "Aquí están algunas de las implementaciones técnicas clave que impulsan OneClick:",
        highlight1: {
          title: "1. Integración de Plaid Link",
          desc: "Conexión segura de cuentas bancarias con manejo de errores y retroalimentación al usuario",
        },
        highlight2: {
          title: "2. Enrutamiento Dinámico de Dashboard",
          desc: "Enrutamiento inteligente basado en tipo de usuario con rutas protegidas",
        },
        highlight3: {
          title: "3. Lógica de Calculadora de ROI",
          desc: "Cálculo en tiempo real mostrando ahorro de costos comparado con competidores",
        },
        highlight4: {
          title: "4. Tarjetas Animadas del Landing",
          desc: "Interacciones suaves al pasar el mouse con Framer Motion",
        },
        highlight5: {
          title: "5. Autenticación con Supabase",
          desc: "Autenticación segura de usuarios con gestión de sesiones",
        },
      },
      design: {
        title: "Sistema de Diseño",
        heading: "Lenguaje Visual",
        intro:
          "Creamos un sistema de diseño que equilibra profesionalismo con accesibilidad. Cada color, espaciado e interacción fue cuidadosamente considerado.",
        colors: "Paleta de Colores",
        colorsDesc:
          "Elegimos una sofisticada paleta azul (#60A5FA) para transmitir confianza y estabilidad, complementada con acentos morados (#A78BFA) para innovación y toques rosas (#F472B6) para llamadas a la acción.",
        typography: "Tipografía",
        typographyDesc:
          "Inter por su excelente legibilidad en todos los tamaños, con una jerarquía clara usando pesos de fuente (300-600) en lugar de variaciones de tamaño.",
        spacing: "Espaciado y Layout",
        spacingDesc:
          "Sistema de cuadrícula consistente de 8px, espacio en blanco generoso para respirar, y breakpoints responsivos que se adaptan elegantemente de móvil a escritorio.",
        interactions: "Interacciones",
        interactionsDesc:
          "Estados hover sutiles, transiciones suaves (300ms) y micro-animaciones que proporcionan retroalimentación sin ser distractoras.",
      },
      challenges: {
        title: "Desafíos Técnicos",
        heading: "Problemas que Resolvimos",
        challenge1: {
          title: "Complejidad de Integración Bancaria",
          problem:
            "El flujo OAuth de Plaid requería gestión cuidadosa del estado y manejo de errores a través de múltiples pasos de redirección.",
          solution:
            "Implementamos una máquina de estados robusta con persistence en localStorage y límites de error completos para manejar casos extremos.",
        },
        challenge2: {
          title: "Sincronización de Datos en Tiempo Real",
          problem:
            "Mantener los datos del dashboard sincronizados en múltiples pestañas y dispositivos sin polling constante.",
          solution:
            "Aprovechamos las suscripciones en tiempo real de Supabase con actualizaciones optimistas y estrategias de resolución de conflictos.",
        },
        challenge3: {
          title: "Optimización de Rendimiento",
          problem: "Las listas grandes de transacciones causaban problemas de rendimiento en el dashboard.",
          solution:
            "Implementamos scroll virtual, paginación y estrategias de caché agresivas para mantener 60fps de scroll.",
        },
      },
      results: {
        title: "Resultados e Impacto",
        heading: "Midiendo el Éxito",
        intro: "Para el lanzamiento del MVP, habíamos logrado hitos significativos:",
        metric1: "50+ usuarios beta",
        metric1Desc: "Early adopters probando la plataforma",
        metric2: "$100K+ procesados",
        metric2Desc: "En volumen de transacciones durante beta",
        metric3: "99.9% uptime",
        metric3Desc: "Infraestructura confiable desde el día uno",
        metric4: "4.8/5 rating",
        metric4Desc: "Puntuación promedio de satisfacción del usuario",
      },
      learnings: {
        title: "Aprendizajes Clave",
        heading: "Lo que Descubrimos",
        learning1: {
          title: "Empezar con el Usuario",
          desc: "Nuestras mejores características vinieron de observar a los usuarios luchar con soluciones existentes y construir exactamente lo que necesitaban.",
        },
        learning2: {
          title: "La Seguridad es Innegociable",
          desc: "En fintech, la confianza lo es todo. Invertimos mucho en seguridad desde el día uno, no como una idea tardía.",
        },
        learning3: {
          title: "La Simplicidad Requiere Complejidad",
          desc: "Hacer las cosas simples para los usuarios a menudo significa manejar una enorme complejidad detrás de escena.",
        },
        learning4: {
          title: "Los Sistemas de Diseño Escalan",
          desc: "Invertir tiempo en un sistema de diseño sólido temprano pagó dividendos a medida que agregamos características y páginas.",
        },
      },
      footer: {
        copyright: "© 2025 Abril Marangoni",
        back: "Volver al Portfolio",
      },
    },
  }

  const t = content[language]

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
              <span>{t.nav.back}</span>
            </Link>
            <div className="flex items-center space-x-6">
              <div className="text-sm font-light tracking-wider">{t.nav.title}</div>
              <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex items-center space-x-2 text-sm font-light hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-300"
              >
                <Globe className="h-4 w-4" />
                <span>{language === "en" ? "ES" : "EN"}</span>
              </button>
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
      <section className="pt-40 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  <span className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    {t.hero.tag}
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-light leading-tight tracking-tight">{t.hero.title}</h1>
              </div>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-stone-600 dark:text-stone-400">
                {t.hero.subtitle}
              </p>

              {/* Collaboration Info */}
              <div className="flex flex-wrap gap-8 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#60A5FA]"></div>
                  <span className="text-sm font-light text-stone-600 dark:text-stone-400">
                    {t.hero.collaboration}{" "}
                    <span className="text-stone-900 dark:text-stone-100 font-normal">{t.hero.cofounder}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#A78BFA]"></div>
                  <span className="text-sm font-light text-stone-600 dark:text-stone-400">{t.hero.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-[#F472B6]"></div>
                  <span className="text-sm font-light text-stone-600 dark:text-stone-400">{t.hero.involvement}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-16">
            <div className="space-y-6">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {t.overview.role}
              </h3>
              <p className="font-light text-lg">{t.overview.roleValue}</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {t.overview.timeline}
              </h3>
              <p className="font-light text-lg">{t.overview.timelineValue}</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {t.overview.tech}
              </h3>
              <p className="font-light text-lg">{t.overview.techValue}</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {t.overview.team}
              </h3>
              <p className="font-light text-lg">{t.overview.teamValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.product.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.product.heading}</h3>
            </div>

            <div className="space-y-16">
              <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-4xl">
                {t.product.intro}
              </p>

              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <h4 className="text-2xl font-light">{t.product.vision}</h4>
                  <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                    {t.product.visionText}
                  </p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl font-light">{t.product.approach}</h4>
                  <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                    {t.product.approachText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.features.title}
                </h2>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6 hover:border-[#60A5FA] dark:hover:border-[#60A5FA] transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-[#60A5FA]/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-[#60A5FA]" />
                </div>
                <h4 className="text-2xl font-light">{t.features.feature1.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.features.feature1.desc}
                </p>
              </div>

              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6 hover:border-[#A78BFA] dark:hover:border-[#A78BFA] transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-[#A78BFA]/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-[#A78BFA]" />
                </div>
                <h4 className="text-2xl font-light">{t.features.feature2.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.features.feature2.desc}
                </p>
              </div>

              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6 hover:border-[#F472B6] dark:hover:border-[#F472B6] transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-[#F472B6]/10 flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-[#F472B6]" />
                </div>
                <h4 className="text-2xl font-light">{t.features.feature3.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.features.feature3.desc}
                </p>
              </div>

              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6 hover:border-[#60A5FA] dark:hover:border-[#60A5FA] transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-[#60A5FA]/10 flex items-center justify-center">
                  <Zap className="h-7 w-7 text-[#60A5FA]" />
                </div>
                <h4 className="text-2xl font-light">{t.features.feature4.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.features.feature4.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.architecture.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.architecture.heading}</h3>
            </div>

            <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-4xl">
              {t.architecture.intro}
            </p>

            <div className="space-y-12">
              <h4 className="text-2xl font-light">{t.architecture.stack}</h4>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#60A5FA]"></div>
                    <h5 className="font-light text-lg">{t.architecture.frontend}</h5>
                  </div>
                  <p className="text-base font-light leading-relaxed text-stone-600 dark:text-stone-400 pl-5">
                    {t.architecture.frontendDesc}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#A78BFA]"></div>
                    <h5 className="font-light text-lg">{t.architecture.backend}</h5>
                  </div>
                  <p className="text-base font-light leading-relaxed text-stone-600 dark:text-stone-400 pl-5">
                    {t.architecture.backendDesc}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#F472B6]"></div>
                    <h5 className="font-light text-lg">{t.architecture.integrations}</h5>
                  </div>
                  <p className="text-base font-light leading-relaxed text-stone-600 dark:text-stone-400 pl-5">
                    {t.architecture.integrationsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Highlights */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.codeHighlights.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.codeHighlights.heading}</h3>
            </div>

            <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-4xl">
              {t.codeHighlights.intro}
            </p>

            <div className="space-y-16">
              {/* Highlight 1: Plaid Integration */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-light">{t.codeHighlights.highlight1.title}</h4>
                  <p className="text-base font-light text-stone-600 dark:text-stone-400">
                    {t.codeHighlights.highlight1.desc}
                  </p>
                </div>
                <div className="bg-stone-900 dark:bg-stone-950 rounded-lg p-8 overflow-x-auto border border-stone-800">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span className="text-purple-400">const</span> <span className="text-blue-300">onSuccess</span>{" "}
                      <span className="text-stone-300">=</span> <span className="text-purple-400">async</span>{" "}
                      <span className="text-stone-300">(</span>
                      <span className="text-orange-300">public_token</span>
                      <span className="text-stone-300">:</span> <span className="text-green-400">string</span>
                      <span className="text-stone-300">
                        ) {"=>"} {"{"}
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">try</span> <span className="text-stone-300">{"{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-purple-400">const</span> <span className="text-blue-300">response</span>{" "}
                      <span className="text-stone-300">=</span> <span className="text-purple-400">await</span>{" "}
                      <span className="text-blue-300">fetch</span>
                      <span className="text-stone-300">(</span>
                      <span className="text-green-300">'/api/plaid/exchange'</span>
                      <span className="text-stone-300">,</span> <span className="text-stone-300">{"{"}</span>
                      {"\n"}
                      {"      "}
                      <span className="text-blue-300">method</span>
                      <span className="text-stone-300">:</span> <span className="text-green-300">'POST'</span>
                      <span className="text-stone-300">,</span>
                      {"\n"}
                      {"      "}
                      <span className="text-blue-300">body</span>
                      <span className="text-stone-300">:</span> <span className="text-blue-300">JSON</span>
                      <span className="text-stone-300">.</span>
                      <span className="text-blue-300">stringify</span>
                      <span className="text-stone-300">({"{"}</span>{" "}
                      <span className="text-orange-300">public_token</span>{" "}
                      <span className="text-stone-300">{"}),"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-stone-300">{"});"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-purple-400">const</span> <span className="text-blue-300">data</span>{" "}
                      <span className="text-stone-300">=</span> <span className="text-purple-400">await</span>{" "}
                      <span className="text-blue-300">response</span>
                      <span className="text-stone-300">.</span>
                      <span className="text-blue-300">json</span>
                      <span className="text-stone-300">();</span>
                      {"\n"}
                      {"    "}
                      <span className="text-blue-300">router</span>
                      <span className="text-stone-300">.</span>
                      <span className="text-blue-300">push</span>
                      <span className="text-stone-300">(</span>
                      <span className="text-green-300">'/dashboard'</span>
                      <span className="text-stone-300">);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-stone-300">{"}"}</span> <span className="text-purple-400">catch</span>{" "}
                      <span className="text-stone-300">(</span>
                      <span className="text-orange-300">error</span>
                      <span className="text-stone-300">) {"{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-blue-300">console</span>
                      <span className="text-stone-300">.</span>
                      <span className="text-blue-300">error</span>
                      <span className="text-stone-300">(</span>
                      <span className="text-green-300">'Bank connection failed'</span>
                      <span className="text-stone-300">,</span> <span className="text-orange-300">error</span>
                      <span className="text-stone-300">);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-stone-300">{"}"}</span>
                      {"\n"}
                      <span className="text-stone-300">{"};"}</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Highlight 2: Dynamic Routing */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-light">{t.codeHighlights.highlight2.title}</h4>
                  <p className="text-base font-light text-stone-600 dark:text-stone-400">
                    {t.codeHighlights.highlight2.desc}
                  </p>
                </div>
                <div className="bg-stone-900 dark:bg-stone-950 rounded-lg p-8 overflow-x-auto border border-stone-800">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">getDashboardRoute</span> <span className="text-stone-300">=</span>{" "}
                      <span className="text-stone-300">(</span>
                      <span className="text-orange-300">userType</span>
                      <span className="text-stone-300">:</span> <span className="text-green-400">string</span>
                      <span className="text-stone-300">
                        ) {"=>"} {"{"}
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">return</span> <span className="text-orange-300">userType</span>{" "}
                      <span className="text-stone-300">===</span> <span className="text-green-300">'business'</span>
                      {"\n"}
                      {"    "}
                      <span className="text-stone-300">?</span>{" "}
                      <span className="text-green-300">'/dashboard/business'</span>
                      {"\n"}
                      {"    "}
                      <span className="text-stone-300">:</span>{" "}
                      <span className="text-green-300">'/dashboard/personal'</span>
                      <span className="text-stone-300">;</span>
                      {"\n"}
                      <span className="text-stone-300">{"};"}</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Highlight 3: ROI Calculator */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-light">{t.codeHighlights.highlight3.title}</h4>
                  <p className="text-base font-light text-stone-600 dark:text-stone-400">
                    {t.codeHighlights.highlight3.desc}
                  </p>
                </div>
                <div className="bg-stone-900 dark:bg-stone-950 rounded-lg p-8 overflow-x-auto border border-stone-800">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">calculateSavings</span> <span className="text-stone-300">=</span>{" "}
                      <span className="text-stone-300">(</span>
                      <span className="text-orange-300">monthlyVolume</span>
                      <span className="text-stone-300">:</span> <span className="text-green-400">number</span>
                      <span className="text-stone-300">
                        ) {"=>"} {"{"}
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">competitorFee</span> <span className="text-stone-300">=</span>{" "}
                      <span className="text-orange-300">monthlyVolume</span> <span className="text-stone-300">*</span>{" "}
                      <span className="text-orange-300">0.029</span>
                      <span className="text-stone-300">;</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">const</span> <span className="text-blue-300">ourFee</span>{" "}
                      <span className="text-stone-300">=</span> <span className="text-orange-300">monthlyVolume</span>{" "}
                      <span className="text-stone-300">*</span> <span className="text-orange-300">0.015</span>
                      <span className="text-stone-300">;</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">return</span>{" "}
                      <span className="text-blue-300">competitorFee</span> <span className="text-stone-300">-</span>{" "}
                      <span className="text-blue-300">ourFee</span>
                      <span className="text-stone-300">;</span>
                      {"\n"}
                      <span className="text-stone-300">{"};"}</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Highlight 4: Animated Cards */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-light">{t.codeHighlights.highlight4.title}</h4>
                  <p className="text-base font-light text-stone-600 dark:text-stone-400">
                    {t.codeHighlights.highlight4.desc}
                  </p>
                </div>
                <div className="bg-stone-900 dark:bg-stone-950 rounded-lg p-8 overflow-x-auto border border-stone-800">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span className="text-stone-300">{"<"}</span>
                      <span className="text-blue-300">motion.div</span>
                      {"\n"}
                      {"  "}
                      <span className="text-orange-300">whileHover</span>
                      <span className="text-stone-300">{"={{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-orange-300">scale</span>
                      <span className="text-stone-300">:</span> <span className="text-orange-300">1.02</span>
                      <span className="text-stone-300">,</span>
                      {"\n"}
                      {"    "}
                      <span className="text-orange-300">y</span>
                      <span className="text-stone-300">:</span> <span className="text-orange-300">-8</span>
                      <span className="text-stone-300">,</span>
                      {"\n"}
                      {"  "}
                      <span className="text-stone-300">{"}}"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-orange-300">transition</span>
                      <span className="text-stone-300">{"={{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-orange-300">duration</span>
                      <span className="text-stone-300">:</span> <span className="text-orange-300">0.3</span>
                      <span className="text-stone-300">,</span>
                      {"\n"}
                      {"    "}
                      <span className="text-orange-300">ease</span>
                      <span className="text-stone-300">:</span> <span className="text-green-300">'easeOut'</span>
                      {"\n"}
                      {"  "}
                      <span className="text-stone-300">{"}}"}</span>
                      {"\n"}
                      <span className="text-stone-300">{">"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-stone-500">{"// Card content"}</span>
                      {"\n"}
                      <span className="text-stone-300">{"</"}</span>
                      <span className="text-blue-300">motion.div</span>
                      <span className="text-stone-300">{">"}</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* Highlight 5: Supabase Auth */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl font-light">{t.codeHighlights.highlight5.title}</h4>
                  <p className="text-base font-light text-stone-600 dark:text-stone-400">
                    {t.codeHighlights.highlight5.desc}
                  </p>
                </div>
                <div className="bg-stone-900 dark:bg-stone-950 rounded-lg p-8 overflow-x-auto border border-stone-800">
                  <pre className="text-sm font-mono leading-relaxed">
                    <code>
                      <span className="text-purple-400">const</span> <span className="text-blue-300">signIn</span>{" "}
                      <span className="text-stone-300">=</span> <span className="text-purple-400">async</span>{" "}
                      <span className="text-stone-300">(</span>
                      <span className="text-orange-300">email</span>
                      <span className="text-stone-300">,</span> <span className="text-orange-300">password</span>
                      <span className="text-stone-300">
                        ) {"=>"} {"{"}
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">const</span> <span className="text-stone-300">{"{"}</span>{" "}
                      <span className="text-blue-300">data</span>
                      <span className="text-stone-300">,</span> <span className="text-blue-300">error</span>{" "}
                      <span className="text-stone-300">{"}"} =</span> <span className="text-purple-400">await</span>{" "}
                      <span className="text-blue-300">supabase</span>
                      <span className="text-stone-300">.</span>
                      <span className="text-blue-300">auth</span>
                      <span className="text-stone-300">.</span>
                      <span className="text-blue-300">signInWithPassword</span>
                      <span className="text-stone-300">({"{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-orange-300">email</span>
                      <span className="text-stone-300">,</span>
                      {"\n"}
                      {"    "}
                      <span className="text-orange-300">password</span>
                      <span className="text-stone-300">,</span>
                      {"\n"}
                      {"  "}
                      <span className="text-stone-300">{"});"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">if</span> <span className="text-stone-300">(</span>
                      <span className="text-blue-300">error</span>
                      <span className="text-stone-300">) throw</span> <span className="text-blue-300">error</span>
                      <span className="text-stone-300">;</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">return</span> <span className="text-blue-300">data</span>
                      <span className="text-stone-300">;</span>
                      {"\n"}
                      <span className="text-stone-300">{"};"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.design.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.design.heading}</h3>
            </div>

            <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-4xl">
              {t.design.intro}
            </p>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-[#60A5FA]" />
                  <h4 className="text-2xl font-light">{t.design.colors}</h4>
                </div>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.design.colorsDesc}
                </p>
                <div className="flex space-x-6">
                  <div className="space-y-3">
                    <div className="w-20 h-20 rounded-lg bg-[#60A5FA]"></div>
                    <p className="text-sm font-mono">#60A5FA</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-20 h-20 rounded-lg bg-[#A78BFA]"></div>
                    <p className="text-sm font-mono">#A78BFA</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-20 h-20 rounded-lg bg-[#F472B6]"></div>
                    <p className="text-sm font-mono">#F472B6</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <Code2 className="h-6 w-6 text-[#A78BFA]" />
                  <h4 className="text-2xl font-light">{t.design.typography}</h4>
                </div>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.design.typographyDesc}
                </p>
              </div>

              <div className="space-y-8">
                <h4 className="text-2xl font-light">{t.design.spacing}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.design.spacingDesc}
                </p>
              </div>

              <div className="space-y-8">
                <h4 className="text-2xl font-light">{t.design.interactions}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.design.interactionsDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Challenges */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.challenges.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.challenges.heading}</h3>
            </div>

            <div className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-12 p-10 border border-stone-200 dark:border-stone-800 rounded-lg">
                <div className="space-y-6">
                  <h4 className="text-2xl font-light">{t.challenges.challenge1.title}</h4>
                  <div className="space-y-4">
                    <p className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Problem
                    </p>
                    <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.challenges.challenge1.problem}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Solution
                    </p>
                    <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.challenges.challenge1.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 p-10 border border-stone-200 dark:border-stone-800 rounded-lg">
                <div className="space-y-6">
                  <h4 className="text-2xl font-light">{t.challenges.challenge2.title}</h4>
                  <div className="space-y-4">
                    <p className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Problem
                    </p>
                    <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.challenges.challenge2.problem}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Solution
                    </p>
                    <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.challenges.challenge2.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 p-10 border border-stone-200 dark:border-stone-800 rounded-lg">
                <div className="space-y-6">
                  <h4 className="text-2xl font-light">{t.challenges.challenge3.title}</h4>
                  <div className="space-y-4">
                    <p className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Problem
                    </p>
                    <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.challenges.challenge3.problem}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                      Solution
                    </p>
                    <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                      {t.challenges.challenge3.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.results.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.results.heading}</h3>
            </div>

            <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-4xl">
              {t.results.intro}
            </p>

            <div className="grid lg:grid-cols-4 gap-12">
              <div className="space-y-6 text-center">
                <div className="text-5xl font-light text-[#60A5FA]">{t.results.metric1}</div>
                <p className="text-base font-light text-stone-600 dark:text-stone-400">{t.results.metric1Desc}</p>
              </div>
              <div className="space-y-6 text-center">
                <div className="text-5xl font-light text-[#A78BFA]">{t.results.metric2}</div>
                <p className="text-base font-light text-stone-600 dark:text-stone-400">{t.results.metric2Desc}</p>
              </div>
              <div className="space-y-6 text-center">
                <div className="text-5xl font-light text-[#F472B6]">{t.results.metric3}</div>
                <p className="text-base font-light text-stone-600 dark:text-stone-400">{t.results.metric3Desc}</p>
              </div>
              <div className="space-y-6 text-center">
                <div className="text-5xl font-light text-[#60A5FA]">{t.results.metric4}</div>
                <p className="text-base font-light text-stone-600 dark:text-stone-400">{t.results.metric4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {t.learnings.title}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-light leading-tight">{t.learnings.heading}</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6">
                <h4 className="text-2xl font-light">{t.learnings.learning1.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.learnings.learning1.desc}
                </p>
              </div>

              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6">
                <h4 className="text-2xl font-light">{t.learnings.learning2.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.learnings.learning2.desc}
                </p>
              </div>

              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6">
                <h4 className="text-2xl font-light">{t.learnings.learning3.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.learnings.learning3.desc}
                </p>
              </div>

              <div className="p-10 border border-stone-200 dark:border-stone-800 rounded-lg space-y-6">
                <h4 className="text-2xl font-light">{t.learnings.learning4.title}</h4>
                <p className="font-light text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  {t.learnings.learning4.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-sm font-light text-stone-500 dark:text-stone-500">
            <div>{t.footer.copyright}</div>
            <Link
              href="/"
              className="flex items-center space-x-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.footer.back}</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
