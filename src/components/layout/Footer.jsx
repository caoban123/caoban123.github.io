import React from 'react'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-zinc-500">
          © 2026 Nguyễn Cao Bản. Built with React, Three.js & too much coffee.
        </div>
        <div className="flex items-center gap-6 font-mono text-xs text-zinc-500">
          <a
            href="https://github.com/caoban123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#home"
            className="hover:text-zinc-300 transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
