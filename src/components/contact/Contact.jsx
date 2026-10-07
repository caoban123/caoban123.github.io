import React from 'react'
import { Mail, Github, Linkedin, Facebook, ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { site } from '../../data/site'

export function Contact() {
  const primaryHref = site.email ? `mailto:${site.email}` : site.github
  const PrimaryIcon = site.email ? Mail : Github

  return (
    <section id="contact" className="relative flex min-h-[90vh] items-center overflow-hidden py-32">
      {/* Vùng sáng ambient chuyển động mờ */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full bg-gradient-to-tr from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 font-semibold">
            BẠN CÓ Ý TƯỞNG HỢP TÁC?
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mb-8 mt-6 font-display text-5xl font-black uppercase leading-[1.12] tracking-tight text-white sm:text-7xl lg:text-9xl">
            HÃY CÙNG <br />
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
              XÂY DỰNG.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mb-12 max-w-xl text-base text-zinc-400 leading-relaxed sm:text-lg">
            Dù bạn muốn trao đổi về nghiên cứu video generative, các giải pháp RAG chuyên sâu, hay cơ hội hợp tác phát triển hệ thống AI, hãy liên hệ ngay với tôi.
          </p>
        </Reveal>

        {/* Nút hành động chính hình tròn có lực hút từ tính */}
        <Reveal delay={0.3}>
          <div className="mb-12 flex justify-center">
            <Magnetic strength={0.4}>
              <a
                href={primaryHref}
                target={site.email ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-white text-sm font-bold text-black shadow-[0_0_60px_rgba(255,255,255,0.22)] transition-transform hover:scale-105 sm:h-48 sm:w-48"
              >
                <PrimaryIcon className="h-5 w-5" />
                <span className="flex items-center gap-1 font-display tracking-wider">
                  KẾT NỐI NGAY
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Danh sách nút mạng xã hội đầy đủ: GitHub, LinkedIn, Facebook, Email */}
        <Reveal delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>

            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}

            {site.facebook && (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            )}

            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 normal-case text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
