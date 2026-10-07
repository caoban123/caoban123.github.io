import React from 'react'
import { site } from '../../data/site'
import { scrollToTarget } from '../../lib/scroll'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#050505] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="font-mono text-xs text-zinc-500">
          © {new Date().getFullYear()} {site.name}. Xây dựng bằng React, Three.js &amp; niềm đam mê AI.
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-500">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-300"
            >
              LinkedIn
            </a>
          )}
          {site.facebook && (
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-300"
            >
              Facebook
            </a>
          )}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#home')
            }}
            className="transition-colors hover:text-accent-cyan"
          >
            Về đầu trang ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
