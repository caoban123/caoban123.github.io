import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Github, MapPin } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { BentoCard } from '../ui/BentoCard'
import { site } from '../../data/site'
import { researchData } from '../../data/research'

const focusAreas = ['AI / ML', 'RAG & LLM', 'Computer Vision', 'Research']

// Examples of shipped work, taken from the design doc's "proof of work" section.
const proof = [
  'Built a retrieval system using Qdrant and Gemini.',
  'Implemented object tracking using YOLO and ByteTrack.',
  'Exploring adaptive control in rectified-flow video editing.',
]

function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
}

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-blue">01 // About</span>
          </div>
        </Reveal>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Statement */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <BentoCard className="p-8 sm:p-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl">
                  I'm an AI developer who enjoys building systems where{' '}
                  <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                    machine learning meets real software.
                  </span>
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                  Studying Artificial Intelligence at <span className="text-white">HCMUS</span>, I work across AI systems,
                  research and software development — turning models into things people can actually use.
                </p>
              </div>
            </BentoCard>
          </Reveal>

          {/* Location + live time */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" /> Based in
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-white">{site.location}</div>
                  <div className="mt-1 font-mono text-sm text-accent-cyan tabular-nums">
                    <LocalTime /> <span className="text-zinc-500">GMT+7</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Currently exploring */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-purple opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-purple" />
                  </span>
                  Currently exploring
                </div>
                <div className="font-display text-lg font-bold leading-snug text-white">{researchData.primaryTopic}</div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Focus areas */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Focus</div>
              <ul className="space-y-2">
                {focusAreas.map((f, i) => (
                  <li key={f} className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-sm text-zinc-200 last:border-0">
                    {f}
                    <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* Proof of work */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Proof &gt; claims</div>
              <ul className="space-y-3">
                {proof.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-snug text-zinc-300">
                    <span className="mt-0.5 font-mono text-accent-cyan">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* GitHub */}
          <Reveal className="md:col-span-2" delay={0.24}>
            <BentoCard as="a" href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="block p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Github className="h-6 w-6 text-white" />
                  <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Code &amp; experiments</div>
                  <div className="mt-1 font-display text-xl font-bold text-white">@caoban123</div>
                </div>
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
