import React from 'react'
import { experiences } from '../../data/experience'
import { Reveal } from '../ui/Reveal'

export function Experience() {
  // Hidden until real entries are added to src/data/experience.js.
  if (experiences.length === 0) return null

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-blue">05 // Track record</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-14 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">
            Experience &amp; <br />
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">Competitions</span>
          </h2>
        </Reveal>

        <div className="relative border-l border-white/[0.1] pl-8">
          {experiences.map((exp, idx) => (
            <Reveal key={exp.title} delay={0.08 * idx} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-accent-blue bg-[#050505]" />
              <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="text-accent-cyan">{exp.year}</span>
                <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 uppercase tracking-wider text-zinc-400">{exp.category}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">{exp.title}</h3>
              <div className="mb-2 text-sm font-medium text-accent-purple">{exp.role}</div>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">{exp.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
