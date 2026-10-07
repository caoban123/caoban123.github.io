import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Github, FileText, ChevronDown } from 'lucide-react'
import { HeroCanvas } from './HeroCanvas'
import { useMousePosition } from '../../hooks/useMousePosition'

const roles = [
  'AI Developer',
  'Machine Learning Engineer',
  'RAG & LLM Builder',
  'AI Researcher',
]

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const mouse = useMousePosition()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background Grid Pattern & Noise subtle styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-cyan/90">
              HELLO, I'M
            </span>
          </motion.div>

          {/* Name Header with Animated Reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]"
            >
              NGUYỄN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">
                CAO BẢN
              </span>
            </motion.h1>
          </div>

          {/* Dynamic Role Switcher */}
          <div className="h-9 mb-6 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[currentRoleIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-lg sm:text-2xl font-mono text-zinc-300 font-semibold"
              >
                &gt; {roles[currentRoleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Short Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8"
          >
            I build intelligent systems that combine AI models, retrieval systems, computer vision, and reliable software engineering.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium text-sm transition-transform hover:scale-105 shadow-[0_0_25px_rgba(79,124,255,0.3)]"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://github.com/caoban123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-200 text-sm font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Resume / CV</span>
            </a>
          </motion.div>
        </div>

        {/* Right 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          <div className="w-full max-w-[480px]">
            <HeroCanvas mouse={mouse} />
          </div>
        </motion.div>
      </div>

      {/* Scroll to Explore indicator per Section 11 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent-blue/80 via-accent-cyan/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
