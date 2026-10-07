import React from 'react'

// Node slots for up to 5 tags, laid out as a zig-zag pipeline in a 400x300 viewBox.
const SLOTS = [
  [80, 62],
  [290, 92],
  [120, 160],
  [300, 205],
  [150, 252],
]
const CHAR_W = 7.4

/**
 * Generative "architecture" illustration built from a project's tech tags.
 * Used in place of a screenshot until real images are added.
 */
export function PipelineVisual({ tags, index }) {
  const nodes = tags.slice(0, SLOTS.length).map((tag, i) => {
    const w = tag.length * CHAR_W + 28
    return { tag, x: SLOTS[i][0], y: SLOTS[i][1], w }
  })

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#12121c] to-[#08080c]">
      {/* Glow that drifts on hover */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-blue/20 blur-3xl transition-transform duration-700 group-hover:-translate-x-10 group-hover:translate-y-10" />
      <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-purple/15 blur-3xl" />

      {/* Oversized index */}
      <span className="pointer-events-none absolute bottom-2 right-5 font-display text-[9rem] font-black leading-none text-white/[0.035]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <svg viewBox="0 0 400 300" className="relative h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id={`edge-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F7CFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#grid-${index})`} />

        {nodes.slice(1).map((n, i) => {
          const a = nodes[i]
          const midY = (a.y + n.y) / 2
          const d = `M ${a.x} ${a.y} C ${a.x} ${midY}, ${n.x} ${midY}, ${n.x} ${n.y}`
          return (
            <g key={`edge-${i}`}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d={d} fill="none" stroke={`url(#edge-${index})`} strokeWidth="1.5" className="flow-dash" />
            </g>
          )
        })}

        {nodes.map((n, i) => (
          <g key={n.tag} transform={`translate(${n.x - n.w / 2}, ${n.y - 14})`}>
            <rect width={n.w} height="28" rx="14" fill="#0d0d14" stroke={i === 0 ? '#4F7CFF' : 'rgba(255,255,255,0.14)'} />
            <circle cx="13" cy="14" r="3" fill={i === 0 ? '#22D3EE' : '#8B5CF6'} />
            <text x="22" y="18" fill="#d4d4d8" fontSize="12" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
              {n.tag}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
