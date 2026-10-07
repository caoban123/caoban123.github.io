import React from 'react'
import { projects } from '../../data/projects'
import { ProjectCard } from './ProjectCard'
import { Reveal } from '../ui/Reveal'

export function Projects() {
  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Reveal>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-cyan">
                  02 // PORTFOLIO
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
                SELECTED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">
                  PROJECTS
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="text-zinc-400 text-sm max-w-sm">
              Real-world systems, AI architectures, and computer vision pipelines built with focus on accuracy, latency, and reliability.
            </p>
          </Reveal>
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
