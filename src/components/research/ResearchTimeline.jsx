import React from 'react'
import { researchData } from '../../data/research'
import { Reveal } from '../ui/Reveal'

export function ResearchTimeline() {
  return (
    <div className="relative space-y-8 border-l border-white/[0.1] pl-6 sm:pl-8">
      {researchData.milestones.map((item, idx) => (
        <Reveal key={item.title} delay={0.08 * idx} y={20}>
          <div className="group relative">
            <span
              className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-[#050505] transition-transform group-hover:scale-125 sm:-left-[39px] ${
                item.current ? 'border-accent-cyan shadow-[0_0_12px_#22D3EE]' : 'border-white/25'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${item.current ? 'bg-accent-cyan' : 'bg-white/40'}`} />
            </span>
            <div className="mb-1 font-mono text-[11px] tracking-widest text-zinc-500">
              {String(idx + 1).padStart(2, '0')}
              {item.current && <span className="ml-2 text-accent-cyan font-bold">● HIỆN TẠI</span>}
            </div>
            <h4 className={`font-display text-lg font-bold transition-colors ${item.current ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
              {item.title}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
