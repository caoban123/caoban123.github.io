import React from 'react'

/** Bento tile with a pointer-following inner glow (see .bento-card in index.css). */
export function BentoCard({ children, className = '', as: Tag = 'div', ...props }) {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag
      onMouseMove={handleMove}
      className={`bento-card group relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b10] transition-colors duration-300 hover:border-white/[0.16] ${className}`}
      {...props}
    >
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  )
}
