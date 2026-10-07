import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, FileText, Command } from 'lucide-react'
import { ScrambleText } from '../ui/ScrambleText'
import { Magnetic } from '../ui/Magnetic'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToTarget } from '../../lib/scroll'
import { site } from '../../data/site'

// Giữ nguyên các thuật ngữ định danh chuyên ngành
const roles = ['AI Developer', 'Machine Learning Engineer', 'RAG & LLM Builder', 'AI Researcher']
const ease = [0.16, 1, 0.3, 1]

export function Hero({ ready = true }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3000)
    return () => clearInterval(id)
  }, [ready])

  const show = ready ? 'show' : 'hidden'
  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
  })

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-16 pt-28">
      {/* Lưới nền tinh tế */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Vầng hào quang trung tâm phát sáng huyền ảo phía sau chữ */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[640px] rounded-full bg-gradient-to-tr from-accent-blue/15 via-accent-purple/10 to-accent-cyan/15 blur-[120px]" />

      {/* Nội dung Hero căn giữa hoàn toàn */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-center justify-center text-center px-6">
        {/* Trạng thái hoạt động (Căn giữa, tối giản, tinh tế) */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={show}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs font-medium text-emerald-400 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.18)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
          </span>
          <span>Sẵn sàng cho dự án AI &amp; Nghiên cứu</span>
        </motion.div>

        {/* Tiêu đề tên người dùng căn giữa — Tối ưu dấu tiếng Việt hoàn hảo, tuyệt đối không bị che khuất */}
        <h1 className="mb-6 font-display text-5xl font-extrabold tracking-normal sm:text-7xl md:text-8xl lg:text-9xl leading-[1.18]">
          <span className="inline-block text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]">
            Nguyễn{' '}
          </span>
          <span className="inline-block bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(79,124,255,0.4)]">
            Cao Bản
          </span>
        </h1>

        {/* Dynamic Role Switcher — Giữ nguyên thuật ngữ kỹ thuật, căn giữa */}
        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          animate={show}
          className="mb-6 flex h-10 items-center justify-center font-mono text-lg font-semibold text-zinc-300 sm:text-2xl"
        >
          <span className="mr-2 text-accent-blue font-bold">&gt;</span>
          <ScrambleText text={roles[roleIndex]} play={ready} duration={650} />
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-accent-cyan" />
        </motion.div>

        {/* Mô tả ngắn tiếng Việt, căn giữa */}
        <motion.p
          variants={fadeUp(0.35)}
          initial="hidden"
          animate={show}
          className="mb-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Tôi xây dựng các hệ thống thông minh kết hợp giữa các mô hình AI, hệ thống truy xuất (RAG), Computer Vision và kỹ thuật phần mềm tin cậy.
        </motion.p>

        {/* Highlight Key Tags căn giữa */}
        <motion.div
          variants={fadeUp(0.45)}
          initial="hidden"
          animate={show}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
            <span className="text-accent-cyan font-mono text-xs font-semibold">⚡ LLM &amp; RAG</span>
            <span className="text-xs text-zinc-400">Hệ thống truy xuất thông minh</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
            <span className="text-accent-blue font-mono text-xs font-semibold">🎯 Computer Vision</span>
            <span className="text-xs text-zinc-400">Thị giác máy tính &amp; Tracking</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
            <span className="text-accent-purple font-mono text-xs font-semibold">🚀 Performance</span>
            <span className="text-xs text-zinc-400">Tối ưu hóa Inference &amp; API</span>
          </div>
        </motion.div>

        {/* Nút hành động căn giữa */}
        <motion.div
          variants={fadeUp(0.55)}
          initial="hidden"
          animate={show}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#projects')
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(79,124,255,0.4)] transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Khám phá dự án</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-7 py-3.5 text-sm font-medium text-zinc-200 transition-all hover:bg-white/[0.1] hover:border-white/25 hover:text-white hover:scale-105"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Magnetic>

          {site.cv && (
            <Magnetic>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-transparent px-6 py-3.5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white hover:scale-105"
              >
                <FileText className="h-4 w-4" />
                Tải CV
              </a>
            </Magnetic>
          )}
        </motion.div>
      </div>

      {/* Thanh chân Hero: Bảng lệnh & Cuộn trang */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-0 right-0 mx-auto flex max-w-7xl items-end justify-between px-6"
      >
        <button
          onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
          className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-300 md:flex"
        >
          <Command className="h-3.5 w-3.5" />
          Nhấn <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-zinc-300">Ctrl K</kbd> để mở bảng lệnh
        </button>

        <div className="pointer-events-none flex flex-col items-center gap-2 md:absolute md:left-1/2 md:-translate-x-1/2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Cuộn để khám phá</span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/10">
            <span className="scroll-line absolute inset-0 bg-gradient-to-b from-accent-blue to-accent-cyan" />
          </span>
        </div>

        <span className="hidden md:block" />
      </motion.div>
    </section>
  )
}
