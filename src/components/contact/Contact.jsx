import React from 'react'
import { Reveal } from '../ui/Reveal'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-accent-blue/15 via-accent-purple/10 to-accent-cyan/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-ping" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-cyan">
              OPEN FOR RESEARCH & COLLABORATION
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[0.95]">
            HAVE AN IDEA? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">
              LET'S BUILD IT.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-12">
            Whether you want to discuss generative video architectures, RAG systems, or explore engineering opportunities, feel free to reach out.
          </p>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="mailto:contact@caoban.dev"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://github.com/caoban123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
