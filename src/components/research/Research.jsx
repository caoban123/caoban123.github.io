import React from 'react'
import { researchData } from '../../data/research'
import { ResearchTimeline } from './ResearchTimeline'
import { Reveal } from '../ui/Reveal'
import { Microscope, ArrowUpRight } from 'lucide-react'

export function Research() {
  return (
    <section id="research" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-purple">
              03 // RESEARCH & ACADEMIA
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
                RESEARCH & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan">
                  EXPLORATION
                </span>
              </h2>
            </Reveal>

            {/* Main Research Topic Card */}
            <Reveal delay={0.2}>
              <div className="p-8 rounded-3xl bg-[#0b0b12] border border-white/[0.08] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Microscope className="w-24 h-24 text-accent-purple" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-accent-purple/10 border border-accent-purple/30 text-accent-purple mb-4">
                  CURRENT INVESTIGATION
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                  {researchData.primaryTopic}
                </h3>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                  {researchData.summary}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {researchData.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Research Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 mb-8">
              Evolution of Methodology
            </h3>
            <ResearchTimeline />
          </div>
        </div>
      </div>
    </section>
  )
}
