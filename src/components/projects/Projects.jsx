import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowRight, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories } from '../../data/projects'
import { site } from '../../data/site'
import { ProjectCard } from './ProjectCard'
import { Reveal } from '../ui/Reveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { soundFx } from '../../lib/sound'

gsap.registerPlugin(ScrollTrigger)

function Heading() {
  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
          02 // DỰ ÁN THỰC CHIẾN
        </span>
      </div>
      <h2 className="font-display text-5xl font-black uppercase leading-[1.12] tracking-tight text-white sm:text-7xl">
        DỰ ÁN <br />
        <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          TIÊU BIỂU
        </span>
      </h2>
    </>
  )
}

function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {projectCategories.map((cat) => {
        const isSelected = active === cat
        return (
          <button
            key={cat}
            onClick={() => {
              soundFx.playClick()
              onChange(cat)
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`relative rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all duration-300 ${
              isSelected
                ? 'text-white shadow-[0_0_16px_rgba(79,124,255,0.3)]'
                : 'border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="activeCategoryIndicator"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        )
      })}
    </div>
  )
}

function MoreOnGithub({ className = '' }) {
  return (
    <a
      href={site.github}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="MỞ"
      onClick={() => soundFx.playClick()}
      onMouseEnter={() => soundFx.playHover()}
      className={`group flex shrink-0 flex-col justify-center gap-4 ${className}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">Xem thêm mã nguồn</span>
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

  const [activeCategory, setActiveCategory] = useState('Tất cả')

  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  const filteredProjects =
    activeCategory === 'Tất cả'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  useLayoutEffect(() => {
    if (!horizontal) return
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
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

    // Cập nhật lại ScrollTrigger khi đổi tab lọc
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [horizontal, activeCategory])

  if (horizontal) {
    return (
      <div id="projects">
        <section ref={sectionRef} className="relative h-screen overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center gap-10 pl-[6vw] pr-[8vw] will-change-transform">
            <div className="flex w-[34vw] shrink-0 flex-col justify-center">
              <Heading />
              <p className="mt-6 max-w-sm text-sm text-zinc-400 leading-relaxed">
                Các hệ thống thực tế từ truy xuất dữ liệu, Computer Vision đến AI agents.
              </p>

              {/* Bộ lọc tab */}
              <div className="mt-6">
                <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
              </div>

              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Cuộn ngang <ArrowRight className="h-3.5 w-3.5 animate-pulse text-accent-cyan" />
              </span>
            </div>

            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={filteredProjects.length}
                horizontal
              />
            ))}

            <MoreOnGithub className="w-[22vw] pl-6" />
          </div>

          {/* Thanh tiến trình cuộn */}
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

  // Chế độ dọc cho Mobile hoặc Reduced-motion
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-8">
          <Heading />
        </Reveal>

        {/* Bộ lọc tab trên Mobile/Vertical */}
        <div className="mb-12">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <motion.div layout className="flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} index={i} total={filteredProjects.length} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-14">
          <MoreOnGithub />
        </Reveal>
      </div>
    </section>
  )
}
