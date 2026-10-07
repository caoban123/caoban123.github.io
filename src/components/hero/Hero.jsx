import React, { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, FileText, Command } from 'lucide-react'
import { ScrambleText } from '../ui/ScrambleText'
import { Magnetic } from '../ui/Magnetic'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToTarget } from '../../lib/scroll'
import { site } from '../../data/site'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

// Giữ nguyên các thuật ngữ định danh chuyên ngành
const roles = ['AI Developer', 'Machine Learning Engineer', 'RAG & LLM Builder', 'AI Researcher']
const ease = [0.16, 1, 0.3, 1]

function StaticOrb() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-accent-blue/30 via-accent-purple/20 to-accent-cyan/20 blur-2xl" />
    </div>
  )
}

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
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-12 pt-24">
      {/* Lưới nền tinh tế */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        {/* 3D Visual Shader Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 1.4, delay: 0.3, ease }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-40 lg:pointer-events-auto lg:relative lg:order-2 lg:col-span-5 lg:h-[560px] lg:opacity-100"
        >
          {reduced ? (
            <StaticOrb />
          ) : (
            <Suspense fallback={<StaticOrb />}>
              <HeroCanvas />
            </Suspense>
          )}
        </motion.div>

        {/* Nội dung bên trái */}
        <div className="relative z-10 flex flex-col justify-center lg:order-1 lg:col-span-7">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={show} className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan/90">
              XIN CHÀO, TÔI LÀ
            </span>
          </motion.div>

          {/* Tiêu đề tên người dùng — Tối ưu dấu tiếng Việt hoàn hảo, tuyệt đối không bị che khuất */}
          <h1 className="mb-6 font-display text-5xl font-extrabold tracking-normal text-white sm:text-7xl lg:text-8xl">
            <span className="block pt-2 pb-1">
              <motion.span
                className="inline-block leading-[1.22] text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                Nguyễn
              </motion.span>
            </span>
            <span className="block pt-1 pb-2">
              <motion.span
                className="inline-block leading-[1.25] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent pb-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
                transition={{ duration: 0.9, delay: 0.24, ease }}
              >
                Cao Bản
              </motion.span>
            </span>
          </h1>

          {/* Dynamic Role Switcher — Giữ nguyên thuật ngữ kỹ thuật */}
          <motion.div
            variants={fadeUp(0.35)}
            initial="hidden"
            animate={show}
            className="mb-6 flex h-9 items-center font-mono text-lg font-semibold text-zinc-300 sm:text-2xl"
          >
            <span className="mr-2 text-accent-blue">&gt;</span>
            <ScrambleText text={roles[roleIndex]} play={ready} duration={650} />
            <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-accent-cyan" />
          </motion.div>

          {/* Mô tả ngắn tiếng Việt */}
          <motion.p
            variants={fadeUp(0.45)}
            initial="hidden"
            animate={show}
            className="mb-9 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Tôi xây dựng các hệ thống thông minh kết hợp giữa các mô hình AI, hệ thống truy xuất (RAG), Computer Vision và kỹ thuật phần mềm tin cậy.
          </motion.p>

          {/* Nút hành động */}
          <motion.div
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={show}
            className="flex flex-wrap items-center gap-3.5"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#projects')
                }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(79,124,255,0.35)]"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.1] hover:border-white/25"
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
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  <FileText className="h-4 w-4" />
                  Tải CV
                </a>
              </Magnetic>
            )}
          </motion.div>
        </div>
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
