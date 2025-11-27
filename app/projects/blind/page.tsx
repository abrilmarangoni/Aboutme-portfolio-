"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink, FileText, Users, Target, Heart, MessageCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlindProject() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            <div className="text-sm font-light tracking-wider">BLIND THERAPY APP</div>
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
                    Conceptual Design • 2023
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">BLIND</h1>
                <p className="text-2xl font-light text-stone-600 dark:text-stone-400">
                  Connection is the new commitment.
                </p>
              </div>
              <p className="text-xl font-light leading-relaxed text-stone-600 dark:text-stone-400 max-w-3xl">
                A conceptual emotional support app for couples, designed with elegance and intimacy in mind. Exploring
                how technology can facilitate deeper human connections through thoughtful design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">Role</h3>
              <p className="font-light">Concept Designer & UX Researcher</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                Timeline
              </h3>
              <p className="font-light">3 months • Conceptual Study</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                Focus Areas
              </h3>
              <p className="font-light">Relationship Psychology, Intimacy Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Demo Section */}
      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  Concept Prototype
                </h2>
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-light">Experience the Vision</h3>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-900/20 dark:to-blue-900/20 rounded-lg p-12 text-center space-y-8">
              <div className="w-24 h-24 mx-auto bg-white/50 dark:bg-stone-800/50 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-light">Interactive Concept</h4>
                <p className="text-stone-600 dark:text-stone-400 font-light max-w-md mx-auto">
                  Explore the conceptual interface designed to foster deeper emotional connections between partners
                  through thoughtful interactions.
                </p>
              </div>
              <Button className="bg-slate-600 hover:bg-slate-700 text-white">View Concept</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Insights */}
      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  Research Foundation
                </h2>
              </div>
              <h3 className="text-3xl lg:text-4xl font-light">Understanding Intimacy</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-stone-600 dark:text-stone-400" />
                    <h4 className="text-lg font-light">Relationship Research</h4>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    Conducted in-depth interviews with couples therapists and relationship experts to understand the
                    core elements of emotional intimacy and connection.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-stone-600 dark:text-stone-400" />
                    <h4 className="text-lg font-light">Core Insights</h4>
                  </div>
                  <ul className="space-y-2 text-stone-600 dark:text-stone-400 font-light">
                    <li>• Vulnerability requires safety and trust</li>
                    <li>• Small gestures build lasting connections</li>
                    <li>• Technology often creates distance, not closeness</li>
                    <li>• Intentional communication deepens relationships</li>
                  </ul>
                </div>
              </div>

              <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 space-y-6">
                <h4 className="text-lg font-light">Research Materials</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 rounded">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                      <span className="font-light">Intimacy Framework</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 rounded">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                      <span className="font-light">Couple Personas</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 rounded">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                      <span className="font-light">Emotional Journey Maps</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-stone-600 dark:text-stone-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  Design Philosophy
                </h2>
              </div>
              <h3 className="text-3xl lg:text-4xl font-light">Designing for Connection</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-light">Safe Spaces</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    Creating digital environments that feel secure and private, encouraging authentic expression without
                    fear of judgment.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-light">Intentional Communication</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    Designing interactions that promote mindful, meaningful exchanges rather than quick, surface-level
                    communications.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-light">Emotional Intelligence</h4>
                  <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    Incorporating emotional awareness and empathy into every interaction, helping couples understand
                    each other better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Design Gallery */}
      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  Visual Language
                </h2>
              </div>
              <h3 className="text-3xl lg:text-4xl font-light">Elegant Simplicity</h3>
            </div>

            <div className="grid gap-8">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/10 dark:to-blue-900/10 rounded-lg p-8 text-center space-y-6">
                <div className="aspect-video bg-white/50 dark:bg-stone-800/50 rounded flex items-center justify-center">
                  <span className="text-stone-600 dark:text-stone-400 font-light">Connection Ritual Interface</span>
                </div>
                <p className="text-stone-600 dark:text-stone-400 font-light">
                  Guided experiences that help couples create meaningful moments together
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 text-center space-y-6">
                  <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 rounded flex items-center justify-center">
                    <span className="text-stone-600 dark:text-stone-400 font-light">Emotion Mapping</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-light">
                    Visual tools for understanding emotional patterns
                  </p>
                </div>

                <div className="bg-stone-100 dark:bg-stone-900 rounded-lg p-8 text-center space-y-6">
                  <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800 rounded flex items-center justify-center">
                    <span className="text-stone-600 dark:text-stone-400 font-light">Intimate Conversations</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-light">
                    Prompts and guides for deeper dialogue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Impact */}
      <section className="py-24 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-px bg-stone-400 dark:bg-stone-600"></div>
                <h2 className="text-sm font-light tracking-wider uppercase text-stone-600 dark:text-stone-400">
                  Concept Validation
                </h2>
              </div>
              <h3 className="text-3xl lg:text-4xl font-light">Expert Feedback</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-slate-600">"Thoughtful"</div>
                <p className="text-stone-600 dark:text-stone-400 font-light">Relationship therapists' response</p>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-slate-600">"Needed"</div>
                <p className="text-stone-600 dark:text-stone-400 font-light">Couples' initial reaction</p>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-light text-slate-600">"Elegant"</div>
                <p className="text-stone-600 dark:text-stone-400 font-light">Design community feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-sm font-light text-stone-500 dark:text-stone-500">
            <div>© 2024 Abril Marangoni</div>
            <Link href="/" className="hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-300">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
