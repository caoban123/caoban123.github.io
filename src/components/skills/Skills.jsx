import React from 'react'
import { skillCategories } from '../../data/skills'
import { Reveal } from '../ui/Reveal'
import { Layers } from 'lucide-react'

export function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-cyan">
              04 // CAPABILITIES
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              TECHNICAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
                STACK
              </span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-sm">
              Tools, frameworks, and foundational technologies utilized across production systems and academic research.
            </p>
          </div>
        </Reveal>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group, groupIdx) => (
            <Reveal key={group.category} delay={0.1 * groupIdx}>
              <div className="p-8 rounded-3xl bg-[#0c0c12] border border-white/[0.07] hover:border-white/[0.18] transition-all duration-300 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                      0{groupIdx + 1}
                    </span>
                    <Layers className="w-4 h-4 text-zinc-500 group-hover:text-accent-blue transition-colors" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-6">
                    {group.category}
                  </h3>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-accent-blue/20 hover:border-accent-blue/40 hover:scale-105 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
