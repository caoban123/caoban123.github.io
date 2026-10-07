import React from 'react'
import { researchData } from '../../data/research'
import { Reveal } from '../ui/Reveal'
import { GitCommit } from 'lucide-react'

export function ResearchTimeline() {
  return (
    <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-12">
      {researchData.milestones.map((item, idx) => (
        <Reveal key={item.title} delay={0.15 * idx}>
          <div className="relative group">
            {/* Dot Node on Line */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-[#050505] border-2 border-accent-cyan flex items-center justify-center group-hover:scale-125 group-hover:bg-accent-cyan transition-all">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span className="text-xs font-mono font-semibold text-accent-cyan">
                {item.stage}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                • {item.year}
              </span>
            </div>

            <h4 className="font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
              {item.title}
            </h4>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
