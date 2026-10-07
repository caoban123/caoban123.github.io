import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

export function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0

  return (
    <Reveal delay={0.15}>
      <div className="group relative rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-accent-blue/40 overflow-hidden transition-all duration-500 hover:shadow-[0_0_35px_rgba(79,124,255,0.12)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          {/* Project Details */}
          <div
            className={`lg:col-span-6 flex flex-col justify-center order-2 ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan">
                PROJECT 0{project.id}
              </span>
              <span className="h-[1px] w-8 bg-zinc-700" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
              {project.title}
            </h3>

            <p className="text-sm font-medium text-accent-purple mb-4">
              {project.subtitle}
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-cyan hover:underline transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Visual / Mockup Preview */}
          <div
            className={`lg:col-span-6 order-1 ${
              isEven ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#161622] to-[#0d0d12] border border-white/[0.06] flex items-center justify-center p-6">
              {/* Graphic Mockup Accent */}
              <div className="absolute inset-0 bg-radial-gradient from-accent-blue/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 text-center p-6 flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-accent-cyan/60 transition-transform duration-300">
                  <ArrowUpRight className="w-8 h-8 text-accent-cyan" />
                </div>
                <div className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
                  {project.tags[0]} • System Architecture
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
