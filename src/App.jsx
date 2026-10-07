import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Spotlight } from './components/ui/Spotlight'
import { Cursor } from './components/ui/Cursor'
import { Preloader } from './components/ui/Preloader'
import { CommandPalette } from './components/ui/CommandPalette'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { Projects } from './components/projects/Projects'
import { Research } from './components/research/Research'
import { Skills } from './components/skills/Skills'
import { Experience } from './components/experience/Experience'
import { Contact } from './components/contact/Contact'
import { Footer } from './components/layout/Footer'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [loading, setLoading] = useState(!prefersReducedMotion)
  const finishLoading = useCallback(() => setLoading(false), [])

  // Always start at the top when the intro plays.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Layout can shift once fonts are in and the preloader is gone — recalc pinned sections.
  useEffect(() => {
    if (loading) return
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [loading])

  return (
    <SmoothScroll paused={loading}>
      <AnimatePresence>{loading && <Preloader key="preloader" onComplete={finishLoading} />}</AnimatePresence>

      <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5]">
        <Spotlight />
        <Cursor />
        <CommandPalette />
        <Navbar />

        <main className="relative z-10 flex flex-col">
          <Hero ready={!loading} />
          <About />
          <Projects />
          <Research />
          <Skills />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
