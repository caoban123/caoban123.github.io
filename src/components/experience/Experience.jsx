import React from 'react'
import { experiences } from '../../data/experience'
import { Reveal } from '../ui/Reveal'
import { Award, Briefcase, GraduationCap } from 'lucide-react'

export function Experience() {
  const getCategoryIcon = (category) => {
    if (category.includes('Competition') || category.includes('Hackathon')) return Award
    if (category.includes('Academic')) return GraduationCap
    return Briefcase
  }

  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-blue">
              05 // TRACK RECORD
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              EXPERIENCE & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">
                COMPETITIONS
              </span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-sm">
              Academic honors, collaborative research initiatives, and hands-on system building.
            </p>
          </div>
        </Reveal>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, idx) => {
            const Icon = getCategoryIcon(exp.category)
            return (
              <Reveal key={exp.title} delay={0.1 * idx}>
                <div className="p-8 rounded-3xl bg-[#0c0c12] border border-white/[0.07] hover:border-accent-blue/30 transition-all duration-300 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/[0.04] text-accent-cyan border border-white/[0.08]">
                        {exp.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {exp.year}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-accent-blue transition-colors">
                      {exp.title}
                    </h3>

                    <div className="text-sm font-medium text-accent-purple mb-4">
                      {exp.role}
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {exp.description}
                    </p>
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
