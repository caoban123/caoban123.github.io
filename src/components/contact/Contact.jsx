import React from 'react'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { site } from '../../data/site'

export function Contact() {
  const primaryHref = site.email ? `mailto:${site.email}` : site.github
  const PrimaryIcon = site.email ? Mail : Github

  return (
    <section id="contact" className="relative flex min-h-[90vh] items-center overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full bg-gradient-to-tr from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Have an idea?</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mb-12 mt-6 font-display text-6xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-8xl lg:text-[10rem]">
            Let's <br />
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">build it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mb-10 flex justify-center">
            <Magnetic strength={0.4}>
              <a
                href={primaryHref}
                target={site.email ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-black shadow-[0_0_60px_rgba(255,255,255,0.18)] transition-transform hover:scale-105 sm:h-44 sm:w-44"
              >
                <PrimaryIcon className="h-5 w-5" />
                <span className="flex items-center gap-1">
                  GET IN TOUCH
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
              <Github className="h-4 w-4" /> GitHub
            </a>
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}
            {site.email && (
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-2.5 normal-case text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
