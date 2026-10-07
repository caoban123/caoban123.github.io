import React from 'react'
import { Github, ExternalLink, Layers } from 'lucide-react'
import { PipelineVisual } from './PipelineVisual'
import { Magnetic } from '../ui/Magnetic'
import { TiltCard } from '../ui/TiltCard'
import { soundFx } from '../../lib/sound'

export function ProjectCard({ project, index, total, horizontal = false, onOpenDetail }) {
  const link = project.demo || project.github

  return (
    <TiltCard
      maxTilt={horizontal ? 4 : 8}
      scale={1.015}
      className={`group shrink-0 rounded-[28px] border border-white/[0.08] bg-[#0a0a0f] transition-[border-color,box-shadow] duration-500 hover:border-accent-blue/50 hover:shadow-[0_0_60px_rgba(79,124,255,0.18)] ${
        horizontal ? 'h-[72vh] w-[78vw] max-w-[1150px]' : 'w-full'
      }`}
    >
      <div className={`grid h-full grid-cols-1 gap-8 p-6 sm:p-10 ${horizontal ? 'grid-cols-2' : 'lg:grid-cols-2'}`}>
        {/* Cột thông tin */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest">
              <span className="font-bold text-accent-cyan">DỰ ÁN {String(index + 1).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-zinc-700" />
              <span className="text-zinc-600">/ {String(total).padStart(2, '0')}</span>
              {project.category && (
                <span className="rounded-full border border-accent-purple/30 bg-accent-purple/10 px-2.5 py-0.5 text-[10px] text-accent-purple">
                  {project.category}
                </span>
              )}
            </div>

            <h3 className="mb-3 font-display text-3xl font-bold leading-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl">
              {project.title}
            </h3>
            <p className="mb-5 text-sm font-medium text-accent-purple leading-snug">{project.subtitle}</p>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">{project.description}</p>
          </div>

          <div className="mt-8">
            <div className="mb-8 flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-xs text-zinc-300 transition-all duration-300 group-hover:border-accent-blue/30 group-hover:text-white"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenDetail && (
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => {
                      soundFx.playClick()
                      onOpenDetail(project)
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/35 bg-accent-cyan/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all hover:bg-accent-cyan/20 hover:border-accent-cyan/60 hover:scale-105"
                  >
                    <Layers className="h-3.5 w-3.5" /> Kiến trúc ⚡
                  </button>
                </Magnetic>
              )}

              {project.github && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Github className="h-4 w-4" /> Mã nguồn
                  </a>
                </Magnetic>
              )}
              {project.demo && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-black transition-colors hover:bg-zinc-200"
                  >
                    <ExternalLink className="h-4 w-4" /> Bản chạy thử
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </div>

        {/* Cột đồ họa / Mockup */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="XEM"
          aria-label={`Xem dự án ${project.title}`}
          onClick={() => soundFx.playClick()}
          className={`block ${horizontal ? 'h-full' : 'aspect-[4/3]'}`}
        >
          {project.image ? (
            <img
              src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
              alt={project.title}
              loading="lazy"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <PipelineVisual tags={project.tags} index={index} />
          )}
        </a>
      </div>
    </TiltCard>
  )
}
