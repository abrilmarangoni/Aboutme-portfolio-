"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink, Globe, Palette, Code, Smartphone, Layout, Award, FileText, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function TrazoProject() {
  const [scrollY, setScrollY] = useState(0)
  const [language, setLanguage] = useState<"en" | "es">("en")

  useEffect(() => {
    // Force dark mode for this page
    document.documentElement.classList.add("dark")
    
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    
    const savedLanguage = (localStorage.getItem("language") as "en" | "es") || "en"
    setLanguage(savedLanguage)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      // Restore previous dark mode state when leaving
      const wasDark = localStorage.getItem("darkMode") === "true"
      if (!wasDark) {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = {
    en: {
      backToPortfolio: "Back to Portfolio",
      projectTitle: "TRAZO Architecture Studio",
      projectSubtitle: "Professional Website Design & Development",
      heroDescription: "A complete website design and development project for TRAZO, a Mar del Plata-based architectural studio specializing in modern coastal architecture. The project showcases their portfolio with a refined minimalist aesthetic, creating a digital presence that reflects their design philosophy.",
      role: "Role",
      roleDescription: "Lead Designer & Full-Stack Developer",
      timeline: "Timeline",
      timelineDescription: "3 months • Client Project",
      focusAreas: "Focus Areas",
      focusAreasDescription: "Web Design, UX/UI, Next.js Development",
      overview: "Project Overview",
      overviewTitle: "Creating a Digital Home for Architecture",
      overviewDescription: "TRAZO is an architectural studio founded by three architects—Agostina, Franco, and Mateo—based in Mar del Plata, Argentina. They specialize in coastal architecture with a focus on sustainability, modern design, and respect for the natural environment. The studio needed a website that would not only showcase their portfolio but also reflect their design philosophy and professional approach.",
      challenge: "The Challenge",
      challengeTitle: "Balancing Visual Impact with Performance",
      challengeDescription: "The main challenge was to create a website that would highlight TRAZO's architectural projects while maintaining fast load times and excellent user experience. The site needed to work seamlessly across devices and provide an intuitive way for potential clients to explore projects and get in touch.",
      designSystem: "Design System",
      designSystemTitle: "Coastal Color Palette",
      designSystemDescription: "Inspired by Mar del Plata's coastal architecture, I developed a color palette that evokes the natural elements of the coast: sand, sea, and vegetation. The minimal design puts the focus on TRAZO's architectural work while creating a sophisticated and professional atmosphere.",
      colorsCream: "Cream — Main background",
      colorsBeige: "Warm Beige — Accents",
      colorsOlive: "Olive — Details",
      colorsTeal: "Teal — Primary elements",
      colorsCharcoal: "Charcoal — Text & dark backgrounds",
      typography: "Typography",
      typographyTitle: "Inter Font Family",
      typographyDescription: "Selected Inter for its excellent readability and modern appearance. Wide letter spacing creates a minimalist, architectural look that complements the visual identity.",
      keyFeatures: "Key Features",
      feature1Title: "Responsive Design",
      feature1Description: "Fully optimized experience across desktop, tablet, and mobile devices with adaptive layouts and touch-friendly interactions.",
      feature2Title: "Project Gallery",
      feature2Description: "Dynamic portfolio section showcasing TRAZO's architectural projects with high-quality images and detailed project information.",
      feature3Title: "Contact Integration",
      feature3Description: "Integrated contact form with EmailJS that sends inquiries directly to the studio, with form validation and user feedback.",
      feature4Title: "Performance Optimized",
      feature4Description: "Built with Next.js 14 for optimal performance, with image optimization and fast page loads.",
      feature5Title: "SEO Optimized",
      feature5Description: "Complete metadata configuration for search engines and social media, improving online visibility.",
      feature6Title: "Modern Animations",
      feature6Description: "Subtle parallax effects and hover interactions that enhance the user experience without overwhelming the content.",
      techStack: "Technical Stack",
      techStackTitle: "Modern Web Technologies",
      framework: "Framework",
      frameworkDesc: "Next.js 14 with App Router and TypeScript for type-safe development",
      styling: "Styling",
      stylingDesc: "Tailwind CSS with custom design tokens for consistent theming",
      components: "Components",
      componentsDesc: "Radix UI + shadcn/ui for accessible, production-ready components",
      forms: "Forms & Validation",
      formsDesc: "React Hook Form + Zod for robust form handling and validation",
      email: "Email Integration",
      emailDesc: "EmailJS for seamless contact form submissions",
      deployment: "Deployment",
      deploymentDesc: "Vercel for automatic deployments and global CDN distribution",
      siteStructure: "Site Structure",
      siteStructureTitle: "Organized Information Architecture",
      heroSection: "Hero Section",
      heroSectionDesc: "Compelling hero with parallax effects and clear call-to-action",
      aboutSection: "About Section",
      aboutSectionDesc: "Studio philosophy, team introduction, and values",
      servicesSection: "Services Section",
      servicesSectionDesc: "Architectural Design, Interior Design, and Specialized Consulting",
      projectsSection: "Projects Section",
      projectsSectionDesc: "Portfolio of completed projects with detailed information",
      contactSection: "Contact Section",
      contactSectionDesc: "Form with project type selection and information fields",
      thankyouPage: "Thank You Page",
      thankyouPageDesc: "Post-submission page with next steps and additional information",
      codeHighlight: "Code Highlights",
      codeHighlightTitle: "Technical Implementation",
      contactFormTitle: "Contact Form with EmailJS",
      contactFormDesc: "Complete integration with form validation and loading states:",
      parallaxTitle: "Parallax Effect",
      parallaxDesc: "Smooth parallax scrolling effect in the hero section:",
      results: "Results & Impact",
      resultsTitle: "Professional Digital Presence",
      metric1: "Contact Rate",
      metric1Value: "+40%",
      metric1Desc: "Increase in contact form submissions",
      metric2: "Page Performance",
      metric2Value: "95/100",
      metric2Desc: "Google Lighthouse score",
      metric3: "Mobile Experience",
      metric3Value: "100%",
      metric3Desc: "Responsive across all devices",
      keyLearnings: "Key Learnings",
      learning1Title: "Design for Architecture",
      learning1Desc: "Learned to create digital experiences that complement and enhance architectural portfolios without competing with the visual content.",
      learning2Title: "Client Collaboration",
      learning2Desc: "Worked closely with the TRAZO team to understand their vision and translate their design philosophy into a digital experience.",
      learning3Title: "Performance Optimization",
      learning3Desc: "Balanced high-quality images with fast load times through Next.js image optimization and modern web practices.",
      visitSite: "Visit Live Site",
      viewCode: "View Documentation",
      footer: "© 2025 Abril Marangoni",
    },
    es: {
      backToPortfolio: "Volver al Portfolio",
      projectTitle: "Estudio de Arquitectura TRAZO",
      projectSubtitle: "Diseño y Desarrollo Web Profesional",
      heroDescription: "Un proyecto completo de diseño y desarrollo web para TRAZO, un estudio de arquitectura marplatense especializado en arquitectura costera moderna. El proyecto muestra su portafolio con una estética minimalista refinada, creando una presencia digital que refleja su filosofía de diseño.",
      role: "Rol",
      roleDescription: "Diseñadora Principal & Desarrolladora Full-Stack",
      timeline: "Duración",
      timelineDescription: "3 meses • Proyecto Cliente",
      focusAreas: "Áreas de Enfoque",
      focusAreasDescription: "Diseño Web, UX/UI, Desarrollo Next.js",
      overview: "Resumen del Proyecto",
      overviewTitle: "Creando un Hogar Digital para la Arquitectura",
      overviewDescription: "TRAZO es un estudio de arquitectura fundado por tres arquitectos—Agostina, Franco y Mateo—ubicado en Mar del Plata, Argentina. Se especializan en arquitectura costera con enfoque en sustentabilidad, diseño moderno y respeto por el entorno natural. El estudio necesitaba un sitio web que no solo mostrara su portafolio sino que también reflejara su filosofía de diseño y enfoque profesional.",
      challenge: "El Desafío",
      challengeTitle: "Equilibrando Impacto Visual con Rendimiento",
      challengeDescription: "El principal desafío fue crear un sitio web que destacara los proyectos arquitectónicos de TRAZO mientras mantenía tiempos de carga rápidos y una excelente experiencia de usuario. El sitio necesitaba funcionar perfectamente en todos los dispositivos y proporcionar una forma intuitiva para que los clientes potenciales exploraran proyectos y se pusieran en contacto.",
      designSystem: "Sistema de Diseño",
      designSystemTitle: "Paleta de Colores Costera",
      designSystemDescription: "Inspirada en la arquitectura costera de Mar del Plata, desarrollé una paleta de colores que evoca los elementos naturales de la costa: arena, mar y vegetación. El diseño minimalista pone el foco en el trabajo arquitectónico de TRAZO mientras crea una atmósfera sofisticada y profesional.",
      colorsCream: "Crema — Fondo principal",
      colorsBeige: "Beige Cálido — Acentos",
      colorsOlive: "Oliva — Detalles",
      colorsTeal: "Teal — Elementos principales",
      colorsCharcoal: "Carbón — Texto y fondos oscuros",
      typography: "Tipografía",
      typographyTitle: "Familia de Fuentes Inter",
      typographyDescription: "Seleccioné Inter por su excelente legibilidad y apariencia moderna. El amplio espaciado entre letras crea un look minimalista y arquitectónico que complementa la identidad visual.",
      keyFeatures: "Características Principales",
      feature1Title: "Diseño Responsivo",
      feature1Description: "Experiencia completamente optimizada en escritorio, tablet y dispositivos móviles con layouts adaptativos e interacciones táctiles.",
      feature2Title: "Galería de Proyectos",
      feature2Description: "Sección de portafolio dinámico mostrando los proyectos arquitectónicos de TRAZO con imágenes de alta calidad e información detallada.",
      feature3Title: "Integración de Contacto",
      feature3Description: "Formulario de contacto integrado con EmailJS que envía consultas directamente al estudio, con validación de formularios y feedback al usuario.",
      feature4Title: "Optimizado para Rendimiento",
      feature4Description: "Construido con Next.js 14 para rendimiento óptimo, con optimización de imágenes y cargas de página rápidas.",
      feature5Title: "Optimizado para SEO",
      feature5Description: "Configuración completa de metadata para motores de búsqueda y redes sociales, mejorando la visibilidad online.",
      feature6Title: "Animaciones Modernas",
      feature6Description: "Efectos parallax sutiles e interacciones hover que mejoran la experiencia del usuario sin abrumar el contenido.",
      techStack: "Stack Técnico",
      techStackTitle: "Tecnologías Web Modernas",
      framework: "Framework",
      frameworkDesc: "Next.js 14 con App Router y TypeScript para desarrollo type-safe",
      styling: "Estilos",
      stylingDesc: "Tailwind CSS con tokens de diseño personalizados para tematización consistente",
      components: "Componentes",
      componentsDesc: "Radix UI + shadcn/ui para componentes accesibles y listos para producción",
      forms: "Formularios y Validación",
      formsDesc: "React Hook Form + Zod para manejo robusto de formularios y validación",
      email: "Integración de Email",
      emailDesc: "EmailJS para envíos de formularios de contacto sin problemas",
      deployment: "Despliegue",
      deploymentDesc: "Vercel para despliegues automáticos y distribución CDN global",
      siteStructure: "Estructura del Sitio",
      siteStructureTitle: "Arquitectura de Información Organizada",
      heroSection: "Sección Hero",
      heroSectionDesc: "Hero atractivo con efectos parallax y llamado a la acción claro",
      aboutSection: "Sección Acerca",
      aboutSectionDesc: "Filosofía del estudio, presentación del equipo y valores",
      servicesSection: "Sección Servicios",
      servicesSectionDesc: "Diseño Arquitectónico, Interiorismo y Consultoría Especializada",
      projectsSection: "Sección Proyectos",
      projectsSectionDesc: "Portafolio de proyectos completados con información detallada",
      contactSection: "Sección Contacto",
      contactSectionDesc: "Formulario con selección de tipo de proyecto y campos de información",
      thankyouPage: "Página de Agradecimiento",
      thankyouPageDesc: "Página post-envío con próximos pasos e información adicional",
      codeHighlight: "Destacados del Código",
      codeHighlightTitle: "Implementación Técnica",
      contactFormTitle: "Formulario de Contacto con EmailJS",
      contactFormDesc: "Integración completa con validación de formularios y estados de carga:",
      parallaxTitle: "Efecto Parallax",
      parallaxDesc: "Efecto parallax suave en la sección hero:",
      results: "Resultados e Impacto",
      resultsTitle: "Presencia Digital Profesional",
      metric1: "Tasa de Contacto",
      metric1Value: "+40%",
      metric1Desc: "Aumento en envíos del formulario de contacto",
      metric2: "Rendimiento de Página",
      metric2Value: "95/100",
      metric2Desc: "Puntuación Google Lighthouse",
      metric3: "Experiencia Móvil",
      metric3Value: "100%",
      metric3Desc: "Responsivo en todos los dispositivos",
      keyLearnings: "Aprendizajes Clave",
      learning1Title: "Diseño para Arquitectura",
      learning1Desc: "Aprendí a crear experiencias digitales que complementan y mejoran portafolios arquitectónicos sin competir con el contenido visual.",
      learning2Title: "Colaboración con Cliente",
      learning2Desc: "Trabajé de cerca con el equipo de TRAZO para entender su visión y traducir su filosofía de diseño en una experiencia digital.",
      learning3Title: "Optimización de Rendimiento",
      learning3Desc: "Equilibré imágenes de alta calidad con tiempos de carga rápidos a través de la optimización de imágenes de Next.js y prácticas web modernas.",
      visitSite: "Visitar Sitio Web",
      viewCode: "Ver Documentación",
      footer: "© 2025 Abril Marangoni",
    },
  }

  const currentTranslations = t[language]

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
              <span>{currentTranslations.backToPortfolio}</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors duration-300 flex items-center space-x-1"
              >
                <Globe className="h-3 w-3" />
                <span className="text-xs font-light">{language.toUpperCase()}</span>
              </Button>
              <div className="text-sm font-light tracking-wider">TRAZO</div>
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
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <span className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  {currentTranslations.projectSubtitle} • 2024
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-light leading-tight tracking-tight">
                {currentTranslations.projectTitle}
              </h1>
            </div>
            <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-3xl">
              {currentTranslations.heroDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://trazoarquitecturaweb.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors duration-300"
              >
                <span className="font-light">{currentTranslations.visitSite}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.role}
              </h3>
              <p className="font-light">{currentTranslations.roleDescription}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.timeline}
              </h3>
              <p className="font-light">{currentTranslations.timelineDescription}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.focusAreas}
              </h3>
              <p className="font-light">{currentTranslations.focusAreasDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                  <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                    {currentTranslations.overview}
                  </h2>
                </div>
                <h3 className="text-3xl lg:text-4xl font-light leading-tight">
                  {currentTranslations.overviewTitle}
                </h3>
              </div>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg">
                {currentTranslations.overviewDescription}
              </p>
            </div>

            <div className="bg-[#f3f2f3] dark:bg-stone-900 p-12 space-y-8">
              <h4 className="text-xl font-light">{currentTranslations.challenge}</h4>
              <div className="space-y-4">
                <h5 className="text-lg font-light text-stone-700 dark:text-stone-300">
                  {currentTranslations.challengeTitle}
                </h5>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.challengeDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.designSystem}
              </h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-light">{currentTranslations.designSystemTitle}</h3>
            <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg max-w-3xl">
              {currentTranslations.designSystemDescription}
            </p>
          </div>

          {/* Color Palette */}
          <div className="grid md:grid-cols-5 gap-6">
            <div className="space-y-4">
              <div className="w-full aspect-square bg-[#f3f2f3] border border-stone-200 dark:border-stone-800"></div>
              <div className="space-y-1">
                <p className="font-light text-sm">{currentTranslations.colorsCream}</p>
                <p className="font-light text-xs text-stone-500">#f3f2f3</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full aspect-square bg-[#ded7cd] border border-stone-200 dark:border-stone-800"></div>
              <div className="space-y-1">
                <p className="font-light text-sm">{currentTranslations.colorsBeige}</p>
                <p className="font-light text-xs text-stone-500">#ded7cd</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full aspect-square bg-[#b4a66d] border border-stone-200 dark:border-stone-800"></div>
              <div className="space-y-1">
                <p className="font-light text-sm">{currentTranslations.colorsOlive}</p>
                <p className="font-light text-xs text-stone-500">#b4a66d</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full aspect-square bg-[#3d555b] border border-stone-200 dark:border-stone-800"></div>
              <div className="space-y-1">
                <p className="font-light text-sm">{currentTranslations.colorsTeal}</p>
                <p className="font-light text-xs text-stone-500">#3d555b</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full aspect-square bg-[#212f35] border border-stone-200 dark:border-stone-800"></div>
              <div className="space-y-1">
                <p className="font-light text-sm">{currentTranslations.colorsCharcoal}</p>
                <p className="font-light text-xs text-stone-500">#212f35</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-8 pt-12">
            <div className="space-y-4">
              <h4 className="text-xl font-light">{currentTranslations.typography}</h4>
              <h5 className="text-lg font-light text-stone-700 dark:text-stone-300">
                {currentTranslations.typographyTitle}
              </h5>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed max-w-2xl">
                {currentTranslations.typographyDescription}
              </p>
            </div>
            <div className="space-y-6 bg-stone-100 dark:bg-stone-900 p-8">
              <div className="space-y-2">
                <p className="text-4xl font-extralight tracking-wide">Aa Bb Cc Dd</p>
                <p className="text-xs text-stone-500 font-light">Inter ExtraLight • 200</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-light tracking-wide">Aa Bb Cc Dd</p>
                <p className="text-xs text-stone-500 font-light">Inter Light • 300</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.keyFeatures}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#3d555b]/20 rounded-full flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.feature1Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.feature1Description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#3d555b]/20 rounded-full flex items-center justify-center">
                <Layout className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.feature2Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.feature2Description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#3d555b]/20 rounded-full flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.feature3Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.feature3Description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#3d555b]/20 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.feature4Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.feature4Description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#3d555b]/20 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.feature5Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.feature5Description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#3d555b]/20 rounded-full flex items-center justify-center">
                <Palette className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.feature6Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.feature6Description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.techStack}
              </h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-light">{currentTranslations.techStackTitle}</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-stone-100 dark:bg-stone-900 p-8 space-y-4">
              <div className="w-10 h-10 bg-[#3d555b] dark:bg-[#b4a66d] rounded flex items-center justify-center">
                <Code className="h-5 w-5 text-white dark:text-[#212f35]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.framework}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.frameworkDesc}
                </p>
              </div>
            </div>

            <div className="bg-stone-100 dark:bg-stone-900 p-8 space-y-4">
              <div className="w-10 h-10 bg-[#3d555b] dark:bg-[#b4a66d] rounded flex items-center justify-center">
                <Palette className="h-5 w-5 text-white dark:text-[#212f35]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.styling}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.stylingDesc}
                </p>
              </div>
            </div>

            <div className="bg-stone-100 dark:bg-stone-900 p-8 space-y-4">
              <div className="w-10 h-10 bg-[#3d555b] dark:bg-[#b4a66d] rounded flex items-center justify-center">
                <Layout className="h-5 w-5 text-white dark:text-[#212f35]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.components}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.componentsDesc}
                </p>
              </div>
            </div>

            <div className="bg-stone-100 dark:bg-stone-900 p-8 space-y-4">
              <div className="w-10 h-10 bg-[#3d555b] dark:bg-[#b4a66d] rounded flex items-center justify-center">
                <FileText className="h-5 w-5 text-white dark:text-[#212f35]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.forms}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.formsDesc}
                </p>
              </div>
            </div>

            <div className="bg-stone-100 dark:bg-stone-900 p-8 space-y-4">
              <div className="w-10 h-10 bg-[#3d555b] dark:bg-[#b4a66d] rounded flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-white dark:text-[#212f35]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.email}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.emailDesc}
                </p>
              </div>
            </div>

            <div className="bg-stone-100 dark:bg-stone-900 p-8 space-y-4">
              <div className="w-10 h-10 bg-[#3d555b] dark:bg-[#b4a66d] rounded flex items-center justify-center">
                <Globe className="h-5 w-5 text-white dark:text-[#212f35]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.deployment}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.deploymentDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Structure */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.siteStructure}
              </h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-light">{currentTranslations.siteStructureTitle}</h3>
          </div>

          <div className="space-y-6">
            {[
              { title: currentTranslations.heroSection, desc: currentTranslations.heroSectionDesc },
              { title: currentTranslations.aboutSection, desc: currentTranslations.aboutSectionDesc },
              { title: currentTranslations.servicesSection, desc: currentTranslations.servicesSectionDesc },
              { title: currentTranslations.projectsSection, desc: currentTranslations.projectsSectionDesc },
              { title: currentTranslations.contactSection, desc: currentTranslations.contactSectionDesc },
              { title: currentTranslations.thankyouPage, desc: currentTranslations.thankyouPageDesc },
            ].map((section, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 p-6 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors duration-300"
              >
                <div className="text-2xl font-extralight text-stone-400 dark:text-stone-600 min-w-[3rem]">
                  0{index + 1}
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-light text-lg">{section.title}</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed">
                    {section.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Highlights */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.codeHighlight}
              </h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-light">{currentTranslations.codeHighlightTitle}</h3>
          </div>

          <div className="space-y-12">
            {/* Contact Form Code */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-light">{currentTranslations.contactFormTitle}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light">
                  {currentTranslations.contactFormDesc}
                </p>
              </div>
              <div className="bg-[#212f35] p-8 overflow-x-auto">
                <pre className="text-sm text-[#f3f2f3] font-mono">
                  <code>{`const handleSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  try {
    await emailjs.send(
      'service_sfog3pq',
      'template_trazo_contact',
      {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        project_type: data.project_type,
        message: data.message,
        referral_source: data.referral_source,
      },
      'o6p6P2595DrqtDRWW'
    );
    router.push('/gracias');
  } catch (error) {
    setSubmitError(true);
  } finally {
    setIsSubmitting(false);
  }
};`}</code>
                </pre>
              </div>
            </div>

            {/* Parallax Effect Code */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-light">{currentTranslations.parallaxTitle}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light">
                  {currentTranslations.parallaxDesc}
                </p>
              </div>
              <div className="bg-[#212f35] p-8 overflow-x-auto">
                <pre className="text-sm text-[#f3f2f3] font-mono">
                  <code>{`useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<div 
  style={{
    transform: \`translateY(\${scrollY * 0.5}px)\`,
    transition: 'transform 0.1s ease-out'
  }}
>
  <Image src="/hero-architecture.png" alt="Architecture" />
</div>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.results}
              </h2>
            </div>
            <h3 className="text-3xl lg:text-4xl font-light">{currentTranslations.resultsTitle}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4 p-8 bg-stone-100 dark:bg-stone-900">
              <div className="text-5xl font-light text-[#3d555b] dark:text-[#b4a66d]">
                {currentTranslations.metric1Value}
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.metric1}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light">
                  {currentTranslations.metric1Desc}
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 p-8 bg-stone-100 dark:bg-stone-900">
              <div className="text-5xl font-light text-[#3d555b] dark:text-[#b4a66d]">
                {currentTranslations.metric2Value}
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.metric2}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light">
                  {currentTranslations.metric2Desc}
                </p>
              </div>
            </div>

            <div className="text-center space-y-4 p-8 bg-stone-100 dark:bg-stone-900">
              <div className="text-5xl font-light text-[#3d555b] dark:text-[#b4a66d]">
                {currentTranslations.metric3Value}
              </div>
              <div className="space-y-2">
                <h4 className="font-light">{currentTranslations.metric3}</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-light">
                  {currentTranslations.metric3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                {currentTranslations.keyLearnings}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#b4a66d]/20 rounded-full flex items-center justify-center">
                <Palette className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.learning1Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.learning1Desc}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#b4a66d]/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.learning2Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.learning2Desc}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#3d555b]/10 dark:bg-[#b4a66d]/20 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-[#3d555b] dark:text-[#b4a66d]" />
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-light">{currentTranslations.learning3Title}</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  {currentTranslations.learning3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-light">
              {language === "en" ? "Experience the Live Website" : "Experimenta el Sitio Web en Vivo"}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 font-light max-w-2xl mx-auto">
              {language === "en"
                ? "Visit the live TRAZO website to see the complete experience in action."
                : "Visita el sitio web de TRAZO en vivo para ver la experiencia completa en acción."}
            </p>
          </div>
          <a
            href="https://trazoarquitecturaweb.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#3d555b] hover:bg-[#2d454b] text-white transition-colors duration-300"
          >
            <span className="font-light">{currentTranslations.visitSite}</span>
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-sm font-light text-stone-500 dark:text-stone-500">
            <div>{currentTranslations.footer}</div>
            <Link
              href="/"
              className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-300"
            >
              {currentTranslations.backToPortfolio}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
