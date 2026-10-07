import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, Sparkles, FolderGit2 } from 'lucide-react'
import { projects, projectCategories } from '../../data/projects'
import { site } from '../../data/site'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailModal } from './ProjectDetailModal'
import { Reveal } from '../ui/Reveal'
import { soundFx } from '../../lib/sound'

function Heading() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
          02 // DỰ ÁN THỰC CHIẾN
        </span>
      </div>
      <h2 className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-6xl">
        DỰ ÁN{' '}
        <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
          TIÊU BIỂU
        </span>
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
        Các giải pháp trí tuệ nhân tạo chuyên sâu từ truy xuất video đa phương thức, kiểm soát thế giới AI đến hệ thống Multi-Agent học đường. Nhấn vào từng dự án để xem kiến trúc kỹ thuật chi tiết.
      </p>
    </div>
  )
}

function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {projectCategories.map((cat) => {
        const count =
          cat === 'Tất cả'
            ? projects.length
            : projects.filter((p) => p.category === cat).length
        const isSelected = active === cat
        return (
          <button
            key={cat}
            onClick={() => {
              soundFx.playClick()
              onChange(cat)
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`group relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 ${
              isSelected
                ? 'text-white shadow-[0_0_20px_rgba(79,124,255,0.35)]'
                : 'border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="activeCategoryIndicator"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
            <span
              className={`relative z-10 rounded-full px-1.5 py-0.5 text-[10px] ${
                isSelected ? 'bg-white/20 text-white font-bold' : 'bg-white/5 text-zinc-500'
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [detailProject, setDetailProject] = useState(null)

  const filteredProjects =
    activeCategory === 'Tất cả'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header & Bộ lọc danh mục */}
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Heading />
            <div className="shrink-0">
              <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            </div>
          </div>
        </Reveal>

        {/* Lưới dự án Compact & Tinh gọn - Chiếm ít diện tích, không cuộn dài */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onOpenDetail={setDetailProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Banner xem thêm trên GitHub */}
        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-md sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-blue/30 bg-accent-blue/10 text-accent-blue">
                <FolderGit2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white sm:text-lg">
                  Muốn khám phá toàn bộ mã nguồn &amp; thí nghiệm khác?
                </h4>
                <p className="text-xs text-zinc-400 sm:text-sm">
                  Truy cập GitHub cá nhân với hơn 20+ repositories về AI, Computer Vision và Generative Model.
                </p>
              </div>
            </div>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
            >
              <Github className="h-4 w-4" />
              <span>GitHub @caoban123</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-accent-cyan" />
            </a>
          </div>
        </Reveal>

        {/* Modal chi tiết kiến trúc chuyên sâu */}
        <ProjectDetailModal
          project={detailProject}
          isOpen={!!detailProject}
          onClose={() => setDetailProject(null)}
        />
      </div>
    </section>
  )
}
