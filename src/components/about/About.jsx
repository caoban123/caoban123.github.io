import React from 'react'
import { Reveal } from '../ui/Reveal'
import { Sparkles, Terminal, Cpu, Database } from 'lucide-react'

const stats = [
  { label: 'Core Specialization', value: 'AI & ML Systems', icon: Cpu },
  { label: 'Deep Focus', value: 'RAG & Vision', icon: Terminal },
  { label: 'Data & Scale', value: 'Vector Retrieval', icon: Database },
  { label: 'Foundation', value: 'HCMUS CS / AI', icon: Sparkles },
]

export function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Tag */}
        <Reveal>
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-blue">
              01 // ABOUT ME
            </span>
          </div>
        </Reveal>

        {/* Large Statement Typography per Section 12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] uppercase tracking-tight">
                I'm an AI developer who enjoys building systems where{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">
                  machine learning meets real software
                </span>
                .
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2">
            <Reveal delay={0.2}>
              <p className="text-zinc-400 text-base leading-relaxed mb-6">
                Specializing in Artificial Intelligence at <strong>VNUHCM - University of Science (HCMUS)</strong>, I focus on transforming cutting-edge generative research into resilient production architectures.
              </p>
              <p className="text-zinc-400 text-base leading-relaxed">
                From sub-second vector retrieval and multi-agent systems to deep continuous-time flow video editing, I emphasize proof-of-work over superficial claims.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Statistics / Highlights Grid per Section 13 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Reveal key={stat.label} delay={0.1 * idx}>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-blue/40 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      0{idx + 1}
                    </span>
                    <Icon className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-xl font-bold font-display text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
