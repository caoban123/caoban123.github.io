import React, { useEffect, useRef } from 'react'

/** Subtle radial glow following the pointer. Updates a CSS variable instead of React state. */
export function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      ref.current?.style.setProperty('--sx', `${e.clientX}px`)
      ref.current?.style.setProperty('--sy', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(600px circle at var(--sx, -600px) var(--sy, -600px), rgba(79,124,255,0.06), rgba(139,92,246,0.025) 40%, transparent 80%)',
      }}
    />
  )
}
