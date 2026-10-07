import React from 'react'
import { skillCategories, allSkills } from '../../data/skills'
import { Reveal } from '../ui/Reveal'
import { BentoCard } from '../ui/BentoCard'

const SPANS = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2']

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`marquee-track flex shrink-0 gap-4 pr-4 ${reverse ? 'marquee-reverse' : ''}`}>
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap font-display text-3xl font-bold text-white/[0.12] transition-colors duration-300 hover:text-white sm:text-5xl"
          >
            {s}
            <span className="ml-4 text-accent-blue/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  const half = Math.ceil(allSkills.length / 2)

  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
              04 // NĂNG LỰC KỸ THUẬT
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-5xl font-black uppercase leading-[1.12] tracking-tight text-white sm:text-7xl">
              NĂNG LỰC <br />
              <span className="bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent">
                CÔNG NGHỆ
              </span>
            </h2>
            <p className="max-w-sm text-sm text-zinc-400 leading-relaxed">
              Công cụ, framework và hạ tầng được phân nhóm logic theo mục đích sử dụng thực tế — không dùng % ảo.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Marquee chạy toàn màn hình */}
      <div className="mb-16 space-y-3">
        <MarqueeRow items={allSkills.slice(0, half)} />
        <MarqueeRow items={allSkills.slice(half)} reverse />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-6">
        {skillCategories.map((group, i) => (
          <Reveal key={group.category} className={SPANS[i]} delay={0.06 * i}>
            <BentoCard className="p-7">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">{group.category}</h3>
                <span className="font-mono text-xs text-zinc-500 font-semibold">{String(group.skills.length).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-zinc-300 transition-all hover:scale-105 hover:border-accent-blue/40 hover:bg-accent-blue/15 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
