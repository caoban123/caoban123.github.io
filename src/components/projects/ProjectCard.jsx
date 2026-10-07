import React from 'react'
import { Github, ExternalLink, Layers, Sparkles } from 'lucide-react'
import { TiltCard } from '../ui/TiltCard'
import { soundFx } from '../../lib/sound'

export function ProjectCard({ project, index, onOpenDetail }) {
  const imageSrc = project.image ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}` : null

  return (
    <TiltCard
      maxTilt={6}
      scale={1.02}
      onClick={() => {
        soundFx.playClick()
        onOpenDetail(project)
      }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14]/85 backdrop-blur-md transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-[0_12px_40px_rgba(34,211,238,0.12)]"
    >
      {/* Khung ảnh đại diện dự án */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06] bg-[#12121c]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* Placeholder khi dự án Finance chưa có ảnh */
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-950/40 via-zinc-950 to-purple-950/40 p-4 text-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-purple/30 bg-accent-purple/10 text-accent-purple shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <span className="relative mt-2.5 font-mono text-xs font-semibold text-zinc-300">
              Kiến trúc Rule Engine &amp; AI
            </span>
            <span className="relative mt-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
              Đang đợi ảnh thực tế
            </span>
          </div>
        )}

        {/* Lớp bóng mờ chuyển dần */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-transparent to-transparent opacity-80" />

        {/* Badge phân loại */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-zinc-200 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* Số thứ tự */}
        <div className="absolute right-3 top-3">
          <span className="font-mono text-xs font-bold text-white/50 backdrop-blur-sm">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Thân card - Nội dung cô đọng */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-accent-cyan sm:text-xl line-clamp-1">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-accent-purple line-clamp-1">
            {project.subtitle}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05]">
          {/* Tags */}
          <div className="mb-3.5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Cụm nút hành động */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                soundFx.playClick()
                onOpenDetail(project)
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-accent-cyan/40 bg-accent-cyan/10 px-3 py-1.5 font-mono text-xs font-semibold text-accent-cyan shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-all hover:bg-accent-cyan/25 hover:border-accent-cyan"
            >
              <Layers className="h-3.5 w-3.5" /> Kiến trúc ⚡
            </button>

            <div className="flex items-center gap-1.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    soundFx.playClick()
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
                  title="Xem mã nguồn GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    soundFx.playClick()
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black transition-colors hover:bg-zinc-200"
                  title="Chạy thử demo"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
