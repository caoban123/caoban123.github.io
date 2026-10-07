import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { ProjectCard } from './ProjectCard'
import { Reveal } from '../ui/Reveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function Heading() {
  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">02 // Portfolio</span>
      </div>
      <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">
        Selected <br />
        <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
    </>
  )
}

function MoreOnGithub({ className = '' }) {
  return (
    <a
      href={site.github}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="OPEN"
      className={`group flex shrink-0 flex-col justify-center gap-4 ${className}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">More work</span>
      <span className="flex items-center gap-3 font-display text-4xl font-bold text-white transition-colors group-hover:text-accent-cyan">
        GitHub <ArrowUpRight className="h-8 w-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </span>
    </a>
  )
}

export function Projects() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  const horizontal = isDesktop && !reduced

  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    if (!horizontal) return
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [horizontal])

  if (horizontal) {
    return (
      <div id="projects">
        <section ref={sectionRef} className="relative h-screen overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center gap-10 pl-[6vw] pr-[8vw] will-change-transform">
            <div className="flex w-[34vw] shrink-0 flex-col justify-center">
              <Heading />
              <p className="mt-8 max-w-sm text-sm text-zinc-400">
                Real systems across retrieval, computer vision and AI agents. Keep scrolling — the track moves sideways.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Scroll <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
              </span>
            </div>

            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} total={projects.length} horizontal />
            ))}

            <MoreOnGithub className="w-[22vw] pl-6" />
          </div>

          {/* Progress */}
          <div className="absolute bottom-10 left-[6vw] right-[6vw] h-px bg-white/10">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
            />
          </div>
        </section>
      </div>
    )
  }

  // Mobile / reduced-motion: plain vertical list.
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14">
          <Heading />
        </Reveal>
        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} index={i} total={projects.length} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <MoreOnGithub />
        </Reveal>
      </div>
    </section>
  )
}
