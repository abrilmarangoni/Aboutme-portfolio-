"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Globe, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CodePage() {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Syntax highlighting function
  const highlightCode = (code: string, lang: string) => {
    // Keywords for different languages
    const tsKeywords = /\b(import|export|from|const|let|var|function|return|if|else|async|await|class|interface|type|extends|implements|new|this|super|static|public|private|protected|readonly|as|typeof|instanceof|in|of|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|void|null|undefined|true|false)\b/g
    const jsxTags = /(&lt;\/?[A-Z][a-zA-Z]*|<\/?[A-Z][a-zA-Z]*)/g
    const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm
    const numbers = /\b(\d+\.?\d*)\b/g
    const decorators = /(@\w+)/g
    const functions = /\b([a-zA-Z_]\w*)\s*(?=\()/g
    const types = /\b([A-Z][a-zA-Z]*(?:<[^>]+>)?)\b(?!\s*\()/g
    const properties = /\.([a-zA-Z_]\w*)/g
    
    let highlighted = code
      // Escape HTML first
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    // Apply highlighting in order
    highlighted = highlighted
      // Comments (green)
      .replace(comments, '<span class="text-emerald-400">$1</span>')
      // Strings (amber/orange)
      .replace(strings, '<span class="text-amber-300">$&</span>')
      // Decorators (purple)
      .replace(decorators, '<span class="text-purple-400">$1</span>')
      // Keywords (pink/magenta)
      .replace(tsKeywords, '<span class="text-pink-400">$1</span>')
      // Types (cyan)
      .replace(types, '<span class="text-cyan-300">$1</span>')
      // Numbers (orange)
      .replace(numbers, '<span class="text-orange-300">$1</span>')
      // JSX tags (blue)
      .replace(/&lt;(\/?[A-Z][a-zA-Z]*)/g, '&lt;<span class="text-blue-400">$1</span>')
      // HTML-like tags
      .replace(/&lt;(\/?[a-z][a-z0-9]*)/g, '&lt;<span class="text-red-400">$1</span>')

    return highlighted
  }

  const translations = {
    en: {
      backToProject: "Back to Project",
      projectTitle: "ABA IA CODE",
    },
    es: {
      backToProject: "Volver al Proyecto",
      projectTitle: "CÓDIGO ABA IA",
    }
  }

  const t = translations[language]

  const codeExamples = [
    {
      id: "frontend",
      title: "FRONTEND",
      snippets: [
        {
          title: "React 18 + TypeScript",
          filename: "FeatureCard.tsx",
          code: `// FeatureCard Component - Type-safe with TypeScript
interface FeatureCardProps {
  feature: {
    title: string;
    items: string[];
  };
  darkMode: boolean;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  index: number;
  hasAnyHover: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  darkMode, 
  isHovered, 
  onHover, 
  index,
  hasAnyHover 
}) => {
  return (
    <motion.div
      animate={{
        scale: isHovered ? 1.2 : hasAnyHover ? 0.7 : 1,
        height: isHovered ? 'auto' : '180px',
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Component implementation */}
    </motion.div>
  );
};`
        },
        {
          title: "Vite — Build Tool",
          filename: "vite.config.ts",
          code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})`
        },
        {
          title: "Tailwind CSS",
          filename: "Header.tsx",
          code: `// Sticky Header with Glassmorphism
<header className={\`
  sticky top-0 w-full 
  \${darkMode ? 'bg-black/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'} 
  transition-colors duration-300 z-50
\`}>
  <div className={\`
    absolute inset-x-0 bottom-0 h-px 
    bg-gradient-to-r from-transparent 
    \${darkMode ? 'via-white/20' : 'via-gray-300'} 
    to-transparent
  \`}></div>
</header>`
        },
        {
          title: "Framer Motion + GSAP",
          filename: "AnimatedCards.tsx",
          code: `// Animated Feature Cards with Framer Motion
<motion.div
  initial={false}
  animate={{
    scale: isHovered ? 1.2 : hasAnyHover ? 0.7 : 1,
    height: isHovered ? 'auto' : '180px',
  }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
>
  <AnimatePresence>
    {isHovered && (
      <motion.ul
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        {feature.items.map((item, itemIndex) => (
          <motion.li
            key={itemIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: itemIndex * 0.05 }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
</motion.div>`
        },
        {
          title: "GSAP MotionPath",
          filename: "NodeGraph.tsx",
          code: `// GSAP Animation for Node Graph
useEffect(() => {
  const gsap = (await import("gsap")).gsap
  const MotionPathPlugin = (await import("gsap/MotionPathPlugin")).MotionPathPlugin
  
  gsap.registerPlugin(MotionPathPlugin)
  const tl = gsap.timeline({ repeat: -1 })
  
  tl.to(dotRef.current, {
    duration: 6,
    ease: "none",
    motionPath: {
      path: pathId,
      align: pathId,
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
    },
  })
}, [mounted])`
        },
        {
          title: "React Router DOM",
          filename: "App.tsx",
          code: `// App Routing Configuration
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<Router>
  <Routes>
    <Route path="/" element={<PricingPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
</Router>`
        },
        {
          title: "Zustand Store",
          filename: "useAuthStore.ts",
          code: `// Zustand Store - Global State Management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);`
        },
        {
          title: "TanStack Query",
          filename: "useProducts.ts",
          code: `// TanStack Query - Server State Management
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.products.getAll();
      return response.data as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.products.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};`
        }
      ]
    },
    {
      id: "backend",
      title: "BACKEND",
      snippets: [
        {
          title: "NestJS + TypeScript",
          filename: "products.controller.ts",
          code: `// NestJS Controller with TypeScript
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.productsService.findAll(user.tenantId);
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User
  ) {
    return this.productsService.create(createProductDto, user.tenantId);
  }
}`
        },
        {
          title: "Prisma Schema",
          filename: "schema.prisma",
          code: `// Prisma Schema - Type-safe Database Models
model Tenant {
  id        String   @id @default(cuid())
  name      String
  industry  String?
  createdAt DateTime @default(now())
  
  products  Product[]
  services  Service[]
  faqs      FAQ[]
  users     User[]
  
  @@map("tenants")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  stock       Int      @default(0)
  category    String?
  
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  
  @@map("products")
}`
        },
        {
          title: "Prisma Service",
          filename: "products.service.ts",
          code: `// Prisma Service Usage
import { PrismaService } from './prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateProductDto, tenantId: string) {
    return this.prisma.product.create({
      data: { ...data, tenantId },
    });
  }
}`
        },
        {
          title: "Passport + JWT",
          filename: "jwt.strategy.ts",
          code: `// JWT Strategy Configuration
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { tenant: true },
    });
    return user;
  }
}`
        },
        {
          title: "Helmet + Throttler",
          filename: "main.ts",
          code: `// Security Configuration
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Helmet - Security Headers
  app.use(helmet());
  
  // CORS Configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  
  // Throttler - Rate Limiting
  app.useGlobalGuards(new ThrottlerGuard());
  
  await app.listen(4000);
}`
        },
        {
          title: "Winston Logger",
          filename: "logger.config.ts",
          code: `// Winston Logger Configuration
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const loggerConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return \`[\${timestamp}] \${level}: \${message}\`;
        })
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});`
        }
      ]
    },
    {
      id: "ai",
      title: "AI & INTEGRATIONS",
      snippets: [
        {
          title: "OpenAI GPT Integration",
          filename: "ai.service.ts",
          code: `// OpenAI Integration Service
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(
    message: string,
    context: BusinessContext
  ): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: this.buildSystemPrompt(context),
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  }

  private buildSystemPrompt(context: BusinessContext): string {
    return \`You are an AI assistant for \${context.businessName}.
    Available products: \${context.products.map(p => p.name).join(', ')}
    Business hours: \${context.hours}
    Respond in a friendly, helpful manner.\`;
  }
}`
        },
        {
          title: "Meta Webhook Handler",
          filename: "meta-webhook.controller.ts",
          code: `// Meta Webhook Handler
import { Controller, Post, Body, Headers } from '@nestjs/common';

@Controller('webhooks')
export class MetaWebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('meta')
  async handleWebhook(
    @Body() body: any, 
    @Headers('x-hub-signature-256') signature: string
  ) {
    // Verify webhook signature
    if (!this.webhookService.verifySignature(body, signature)) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Process incoming messages
    if (body.entry?.[0]?.messaging) {
      for (const event of body.entry[0].messaging) {
        await this.webhookService.processMessage(event);
      }
    }

    return { status: 'ok' };
  }

  @Get('meta')
  verifyWebhook(@Query() query: any) {
    if (query['hub.verify_token'] === process.env.META_VERIFY_TOKEN) {
      return query['hub.challenge'];
    }
    throw new ForbiddenException();
  }
}`
        },
        {
          title: "Stripe Subscriptions",
          filename: "stripe.service.ts",
          code: `// Stripe Subscription Service
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCustomer(email: string, name: string) {
    return this.stripe.customers.create({ email, name });
  }

  async createSubscription(
    customerId: string,
    priceId: string
  ): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async cancelSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }
}`
        },
        {
          title: "Calendly Integration",
          filename: "calendly.service.ts",
          code: `// Calendly Integration
import axios from 'axios';

@Injectable()
export class CalendlyService {
  private readonly baseUrl = 'https://api.calendly.com';

  async getEventDetails(eventUri: string) {
    const response = await axios.get(
      \`\${this.baseUrl}\${eventUri}\`,
      {
        headers: {
          Authorization: \`Bearer \${process.env.CALENDLY_TOKEN}\`,
        },
      }
    );
    return response.data;
  }

  async getAvailableTimes(eventTypeUri: string, startDate: Date, endDate: Date) {
    const response = await axios.get(
      \`\${this.baseUrl}/event_type_available_times\`,
      {
        params: {
          event_type: eventTypeUri,
          start_time: startDate.toISOString(),
          end_time: endDate.toISOString(),
        },
        headers: {
          Authorization: \`Bearer \${process.env.CALENDLY_TOKEN}\`,
        },
      }
    );
    return response.data.collection;
  }
}`
        }
      ]
    },
    {
      id: "devops",
      title: "DEVOPS",
      snippets: [
        {
          title: "Vercel Configuration",
          filename: "vercel.json",
          code: `{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "devCommand": "cd frontend && npm run dev",
  "installCommand": "cd frontend && npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend.railway.app/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}`
        },
        {
          title: "Railway Configuration",
          filename: "railway.toml",
          code: `# Railway deployment configuration
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "npm run start:prod"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

[services.backend]
port = 4000`
        },
        {
          title: "Docker Compose",
          filename: "docker-compose.yml",
          code: `version: '3.8'

services:
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
      - POSTGRES_DB=\${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:`
        },
        {
          title: "ESLint Configuration",
          filename: ".eslintrc.json",
          code: `{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}`
        },
        {
          title: "Prettier Configuration",
          filename: ".prettierrc",
          code: `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}`
        },
        {
          title: "Prisma Scripts",
          filename: "package.json",
          code: `{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:prod": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts",
    "prisma:reset": "prisma migrate reset --force"
  }
}`
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/projects/aba-ai"
              className="flex items-center space-x-2 text-sm font-light hover:text-white/60 transition-colors duration-300 relative group"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.backToProject}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="text-sm font-light tracking-wider uppercase">{t.projectTitle}</div>
            <div className="flex items-center space-x-8">
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
        <div className="h-px bg-white/20"></div>
      </header>

      {/* Navigation */}
      <nav className="fixed top-24 left-8 z-40 hidden lg:block">
        <div className="space-y-3">
          {codeExamples.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block text-xs font-light text-white/40 hover:text-white/80 transition-colors duration-300"
            >
              {section.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8 md:px-16 lg:pl-32 max-w-6xl mx-auto">
        <div className="space-y-32">
          {codeExamples.map((section, sectionIndex) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider uppercase mb-12 pb-4 border-b border-white/20">
                {section.title}
              </h2>
              
              <div className="space-y-8">
                {section.snippets.map((snippet, snippetIndex) => {
                  const globalIndex = sectionIndex * 100 + snippetIndex
                  return (
                    <div key={snippet.filename} className="group">
                      <div className="mb-3">
                        <h3 className="text-lg font-light text-white/90">{snippet.title}</h3>
                      </div>
                      <div className="border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors duration-300">
                        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-white/5 to-transparent border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-xs font-mono text-white/60">{snippet.filename}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(snippet.code, globalIndex)}
                            className="p-1.5 hover:bg-white/10 rounded transition-colors duration-300 opacity-0 group-hover:opacity-100"
                          >
                            {copiedIndex === globalIndex ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4 text-white/40" />
                            )}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d0d0d]">
                          <code 
                            dangerouslySetInnerHTML={{ 
                              __html: highlightCode(snippet.code, 'typescript') 
                            }}
                          />
                        </pre>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm font-light text-white/40">
            ABA IA — Code Examples
          </p>
          <Link 
            href="/projects/aba-ai"
            className="text-sm font-light text-white/40 hover:text-white/80 transition-colors duration-300"
          >
            ← Back to Project
          </Link>
        </div>
      </footer>
    </div>
  )
}
