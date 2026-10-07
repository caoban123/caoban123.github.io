import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Github, Linkedin, Facebook, Menu, X, Command, Volume2, VolumeX } from 'lucide-react'
import { scrollToTarget } from '../../lib/scroll'
import { site } from '../../data/site'
import { soundFx } from '../../lib/sound'

const navLinks = [
  { name: 'Trang chủ', href: '#home' },
  { name: 'Giới thiệu', href: '#about' },
  { name: 'Dự án', href: '#projects' },
  { name: 'Nghiên cứu', href: '#research' },
  { name: 'Kỹ năng', href: '#skills' },
  { name: 'Liên hệ', href: '#contact' },
]

const openPalette = () => {
  soundFx.playClick()
  window.dispatchEvent(new Event('open-command-palette'))
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [soundActive, setSoundActive] = useState(false)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  useEffect(() => {
    return soundFx.subscribe((enabled) => setSoundActive(enabled))
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
      const probe = window.scrollY + window.innerHeight * 0.35
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.querySelector(navLinks[i].href)
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          setActiveSection(navLinks[i].href.slice(1))
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    soundFx.playClick()
    setMenuOpen(false)
    scrollToTarget(href)
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'border-b border-white/[0.08] bg-[#050505]/85 py-3.5 backdrop-blur-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a
            href="#home"
            onClick={(e) => go(e, '#home')}
            className="group flex items-center gap-3 font-display text-base font-bold tracking-wider text-white"
          >
            {/* Avatar trên Top Bar */}
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full border border-white/20 ring-2 ring-accent-blue/40 shadow-[0_0_12px_rgba(79,124,255,0.4)] transition-transform duration-300 group-hover:scale-105">
              <img
                src={`${import.meta.env.BASE_URL}images/avatar.png`}
                alt="Nguyễn Cao Bản"
                className="h-full w-full object-cover object-[center_36%] scale-105"
                loading="eager"
              />
            </div>
            <span className="text-white transition-colors group-hover:text-accent-cyan">
              {site.name}
            </span>
          </a>

          {/* Desktop Nav tiếng Việt */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1.5 backdrop-blur-sm md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full border border-white/[0.15] bg-white/[0.1]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </a>
              )
            })}
          </nav>

          {/* Icon mạng xã hội & Nút âm thanh: Facebook, LinkedIn, GitHub */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Nút bật/tắt âm thanh sci-fi */}
            <button
              onClick={() => soundFx.toggle()}
              onMouseEnter={() => soundFx.playHover()}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-all ${
                soundActive
                  ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  : 'border-white/[0.1] text-zinc-400 hover:border-white/25 hover:text-white'
              }`}
              title={soundActive ? 'Tắt âm thanh giao diện' : 'Bật âm thanh giao diện sci-fi'}
              aria-label="Toggle Sound"
            >
              {soundActive ? (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span className="flex items-center gap-0.5">
                    <span className="h-2 w-0.5 animate-pulse bg-accent-cyan" />
                    <span className="h-3 w-0.5 animate-pulse bg-accent-cyan delay-75" />
                    <span className="h-1.5 w-0.5 animate-pulse bg-accent-cyan delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span>Mute</span>
                </>
              )}
            </button>

            <button
              onClick={openPalette}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.1] px-3 py-1.5 font-mono text-[11px] text-zinc-400 transition-colors hover:border-white/25 hover:text-white"
              aria-label="Mở bảng lệnh"
            >
              <Command className="h-3.5 w-3.5" />
              {isMac ? '⌘K' : 'Ctrl K'}
            </button>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onMouseEnter={() => soundFx.playHover()}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>

            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onMouseEnter={() => soundFx.playHover()}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}

            {site.facebook && (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                onMouseEnter={() => soundFx.playHover()}
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-lg p-2 text-zinc-300 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Thanh tiến độ cuộn trang */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan shadow-[0_0_10px_rgba(79,124,255,0.7)]"
        />
      </header>

      {/* Menu Mobile tiếng Việt */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#08080c] px-8 md:hidden"
          >
            <span className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">Điều hướng</span>
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-baseline gap-4 font-display text-4xl font-bold tracking-tight text-zinc-200 hover:text-accent-cyan"
                >
                  <span className="font-mono text-xs text-zinc-600">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mạng xã hội trong Menu Mobile */}
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-8">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              )}
              {site.facebook && (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
