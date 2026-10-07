import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Github, MapPin } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { BentoCard } from '../ui/BentoCard'
import { site } from '../../data/site'
import { researchData } from '../../data/research'

const focusAreas = ['AI / ML', 'RAG & LLM', 'Computer Vision', 'AI Research']

// Minh chứng thực tế từ các bài toán đã thực hiện
const proof = [
  'Xây dựng hệ thống truy xuất thông minh kết hợp Qdrant và Gemini.',
  'Triển khai tracking đối tượng thời gian thực với YOLO và ByteTrack.',
  'Nghiên cứu kiểm soát thích ứng không - thời gian trong Rectified Flow video editing.',
]

function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('vi-VN', {
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
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_#4F7CFF]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-blue">
              01 // GIỚI THIỆU
            </span>
          </div>
        </Reveal>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Tuyên ngôn cốt lõi */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <BentoCard className="p-8 sm:p-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-5xl">
                  Tôi là một AI developer đam mê xây dựng các hệ thống nơi{' '}
                  <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                    Machine Learning gắn liền với phần mềm thực tế.
                  </span>
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                  Định hướng chuyên sâu về Trí tuệ Nhân tạo tại <span className="text-white font-medium">HCMUS</span>, tôi làm việc xoay quanh các hệ thống AI, nghiên cứu mô hình sinh và kỹ thuật phần mềm thực chiến — biến các mô hình lý thuyết thành sản phẩm ứng dụng thực tế.
                </p>
              </div>
            </BentoCard>
          </Reveal>

          {/* Địa điểm & Giờ thực tế */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 text-accent-cyan" /> Nơi làm việc
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-white">{site.location}</div>
                  <div className="mt-1 font-mono text-sm text-accent-cyan tabular-nums">
                    {LocalTime()} <span className="text-zinc-500">GMT+7</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Chủ đề đang nghiên cứu */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-purple opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-purple" />
                  </span>
                  Chủ đề đang nghiên cứu
                </div>
                <div className="font-display text-lg font-bold leading-snug text-white">
                  {researchData.primaryTopic}
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Lĩnh vực trọng tâm */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Lĩnh vực trọng tâm
              </div>
              <ul className="space-y-2">
                {focusAreas.map((f, i) => (
                  <li key={f} className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-sm text-zinc-200 last:border-0">
                    <span className="font-medium">{f}</span>
                    <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* Minh chứng > Lời nói */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Minh chứng &gt; Lời nói
              </div>
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

          {/* GitHub Repo link */}
          <Reveal className="md:col-span-2" delay={0.24}>
            <BentoCard as="a" href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="block p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Github className="h-6 w-6 text-white" />
                  <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Mã nguồn &amp; Thử nghiệm</div>
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
