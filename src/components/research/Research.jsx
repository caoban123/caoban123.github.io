import React from 'react'
import { researchData } from '../../data/research'
import { ResearchTimeline } from './ResearchTimeline'
import { FlowSimulation } from './FlowSimulation'
import { Reveal } from '../ui/Reveal'

export function Research() {
  return (
    <section id="research" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_#8B5CF6]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-purple">
              03 // NGHIÊN CỨU &amp; KHÁM PHÁ
            </span>
          </div>
        </Reveal>

        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-black uppercase leading-[1.12] tracking-tight text-white sm:text-7xl">
              NGHIÊN CỨU &amp; <br />
              <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent">
                KHÁM PHÁ
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="max-w-md">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Chủ đề nghiên cứu trọng tâm
            </div>
            <h3 className="mb-3 font-display text-2xl font-bold text-white leading-snug">
              {researchData.primaryTopic}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {researchData.summary}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8" delay={0.1}>
            <FlowSimulation />
            <div className="mt-6 flex flex-wrap gap-2">
              {researchData.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-4">
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Tiến trình phát triển nghiên cứu
            </h3>
            <ResearchTimeline />
          </div>
        </div>
      </div>
    </section>
  )
}
