import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Github, FileText, Command, Sparkles, ScanEye, Gauge } from 'lucide-react'
import { ScrambleText } from '../ui/ScrambleText'
import { Magnetic } from '../ui/Magnetic'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToTarget } from '../../lib/scroll'
import { site } from '../../data/site'
import { soundFx } from '../../lib/sound'

// Giữ nguyên các thuật ngữ định danh chuyên ngành
const roles = ['AI Developer', 'Machine Learning Engineer', 'RAG & LLM Builder', 'AI Researcher']
const ease = [0.16, 1, 0.3, 1]

const highlights = [
  { icon: Sparkles, title: 'LLM & RAG', desc: 'Hệ thống truy xuất thông minh', color: 'text-accent-cyan', ring: 'from-accent-cyan/30' },
  { icon: ScanEye, title: 'Computer Vision', desc: 'Thị giác máy tính & Tracking', color: 'text-accent-blue', ring: 'from-accent-blue/30' },
  { icon: Gauge, title: 'Performance', desc: 'Tối ưu hóa Inference & API', color: 'text-accent-purple', ring: 'from-accent-purple/30' },
]

// Vòng quỹ đạo trang trí phía sau tên
const orbits = [
  { size: 'h-[460px] w-[460px] sm:h-[560px] sm:w-[560px]', duration: '28s', dot: 'bg-accent-cyan shadow-[0_0_12px_#22D3EE]' },
  { size: 'h-[640px] w-[640px] sm:h-[800px] sm:w-[800px]', duration: '42s', dot: 'bg-accent-purple shadow-[0_0_12px_#8B5CF6]', reverse: true },
  { size: 'h-[860px] w-[860px] sm:h-[1060px] sm:w-[1060px]', duration: '60s', dot: 'bg-accent-blue shadow-[0_0_12px_#4F7CFF]' },
]

function handleCardMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Hero({ ready = true }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const reduced = useReducedMotion()
  const spotRef = useRef(null)
  const rafRef = useRef(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 3000)
    return () => clearInterval(id)
  }, [ready])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // Spotlight nhẹ đi theo con trỏ chuột (throttle bằng rAF)
  const handleMove = (e) => {
    if (reduced || !spotRef.current) return
    const { clientX, clientY, currentTarget } = e
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const r = currentTarget.getBoundingClientRect()
      spotRef.current.style.setProperty('--sx', `${clientX - r.left}px`)
      spotRef.current.style.setProperty('--sy', `${clientY - r.top}px`)
    })
  }

  const show = ready ? 'show' : 'hidden'
  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
  })
  const wordReveal = (delay) => ({
    hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, delay, ease } },
  })

  // Parallax khi cuộn: chữ mờ dần & lùi ra sau, nền trôi chậm hơn tạo chiều sâu
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 220])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.88])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90])
  const orbitScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.25])
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 25])
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40])

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-8 pt-28"
    >
      {/* Aurora nền trôi chậm */}
      <motion.div style={{ y: auroraY }} className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-blob aurora-a left-[10%] top-[15%] h-[340px] w-[340px] bg-accent-blue/60" />
        <div className="aurora-blob aurora-b right-[8%] top-[25%] h-[300px] w-[300px] bg-accent-purple/60" />
        <div className="aurora-blob aurora-c bottom-[10%] left-[35%] h-[280px] w-[380px] bg-accent-cyan/40" />
      </motion.div>

      {/* Lưới nền tinh tế */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Vòng quỹ đạo xoay (parallax chậm hơn chữ) */}
      <motion.div
        style={{ y: orbitY, scale: orbitScale, rotate: orbitRotate }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.85 }}
          transition={{ duration: 1.6, ease }}
          className="absolute inset-0 [mask-image:radial-gradient(circle_at_50%_50%,#000_35%,transparent_75%)]"
        >
          {orbits.map((o, i) => (
            <div key={i} className={`orbit ${o.size}`}>
              <div
                className="orbit-spin"
                style={{ animationDuration: o.duration, animationDirection: o.reverse ? 'reverse' : 'normal' }}
              >
                <span className={`orbit-dot ${o.dot}`} />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Spotlight theo chuột */}
      <div ref={spotRef} className="hero-spotlight pointer-events-none absolute inset-0" />

      {/* Nội dung Hero căn giữa hoàn toàn */}
      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        {/* Trạng thái hoạt động với viền sáng xoay */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={show}
          className="conic-border mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.07] px-4 py-1.5 font-mono text-xs font-medium text-emerald-400 backdrop-blur-md shadow-[0_0_24px_rgba(16,185,129,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
          </span>
          <span>Sẵn sàng cho dự án AI &amp; Nghiên cứu</span>
        </motion.div>

        {/* Tên — hiện dần từ mờ sang nét, giữ trọn dấu tiếng Việt */}
        <h1 className="mb-6 font-display text-5xl font-extrabold leading-[1.2] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          <motion.span
            variants={wordReveal(0.1)}
            initial="hidden"
            animate={show}
            className="inline-block bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text px-1 pb-2 pt-3 text-transparent"
          >
            Nguyễn
          </motion.span>{' '}
          <motion.span
            variants={wordReveal(0.28)}
            initial="hidden"
            animate={show}
            className="shimmer-text inline-block px-1 pb-2 pt-3 drop-shadow-[0_0_40px_rgba(79,124,255,0.35)]"
          >
            Cao Bản
          </motion.span>
        </h1>

        {/* Dải phân cách phát sáng */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: ready ? 1 : 0, opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          className="mb-6 h-px w-48 bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent sm:w-72"
        />

        {/* Dynamic Role Switcher */}
        <motion.div
          variants={fadeUp(0.45)}
          initial="hidden"
          animate={show}
          className="mb-6 inline-flex h-11 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 font-mono text-base font-semibold text-zinc-200 backdrop-blur-sm sm:text-xl"
        >
          <span className="mr-2 font-bold text-accent-blue">&gt;</span>
          <ScrambleText text={roles[roleIndex]} play={ready} duration={650} />
          <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-accent-cyan" />
        </motion.div>

        {/* Mô tả ngắn */}
        <motion.p
          variants={fadeUp(0.55)}
          initial="hidden"
          animate={show}
          className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Tôi xây dựng các hệ thống thông minh kết hợp giữa các mô hình{' '}
          <span className="text-zinc-200">AI</span>, hệ thống truy xuất{' '}
          <span className="text-zinc-200">(RAG)</span>,{' '}
          <span className="text-zinc-200">Computer Vision</span> và kỹ thuật phần mềm tin cậy.
        </motion.p>

        {/* Thẻ điểm mạnh */}
        <motion.div
          variants={fadeUp(0.65)}
          initial="hidden"
          animate={show}
          className="mb-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {highlights.map(({ icon: Icon, title, desc, color, ring }) => (
            <div
              key={title}
              onMouseMove={handleCardMove}
              className="glow-card group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ring} to-transparent ring-1 ring-white/10`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </span>
                <div>
                  <div className={`font-mono text-xs font-semibold ${color}`}>{title}</div>
                  <div className="text-xs text-zinc-400">{desc}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Nút hành động */}
        <motion.div
          variants={fadeUp(0.75)}
          initial="hidden"
          animate={show}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                soundFx.playClick()
                scrollToTarget('#projects')
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(79,124,255,0.4)] transition-all duration-500 hover:scale-105 hover:bg-right hover:shadow-[0_0_45px_rgba(139,92,246,0.55)]"
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
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-7 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md transition-all hover:scale-105 hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
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
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-transparent px-6 py-3.5 text-sm font-medium text-zinc-400 transition-all hover:scale-105 hover:border-white/20 hover:text-white"
              >
                <FileText className="h-4 w-4" />
                Tải CV
              </a>
            </Magnetic>
          )}
        </motion.div>
      </motion.div>

      {/* Thanh chân Hero: Bảng lệnh & Cuộn trang */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 mx-auto mt-14 flex w-full max-w-7xl items-end justify-between px-6"
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
