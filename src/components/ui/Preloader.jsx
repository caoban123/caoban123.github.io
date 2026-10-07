import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrambleText } from './ScrambleText'
import { site } from '../../data/site'

const COUNT_DURATION = 1500
const NAME_HOLD = 1100

/** Cinematic intro: 0→100 counter, then the name decodes, then the curtain lifts. */
export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('count') // 'count' | 'name'

  useEffect(() => {
    // Warm up the heavy 3D chunk while the intro plays.
    import('../hero/HeroCanvas')

    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / COUNT_DURATION)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else setPhase('name')
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (phase !== 'name') return
    const t = setTimeout(onComplete, NAME_HOLD)
    return () => clearTimeout(t)
  }, [phase, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-[#050505] p-6 sm:p-10"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
        <span>Loading portfolio</span>
        <span>NCB — {new Date().getFullYear()}</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence>
          {phase === 'name' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <ScrambleText
                text={site.name.toUpperCase()}
                duration={750}
                className="block font-display text-4xl font-black tracking-tight text-white sm:text-7xl"
              />
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-accent-cyan">
                AI · RAG · Vision · Research
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span className="font-display text-[22vw] font-black leading-[0.8] tracking-tighter text-white/[0.92] sm:text-[14vw]">
            {String(count).padStart(3, '0')}
          </span>
          <span className="mb-2 font-mono text-xs text-zinc-500">%</span>
        </div>
        <div className="mt-4 h-px w-full bg-white/10">
          <div
            className="h-full origin-left bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </motion.div>
  )
}
