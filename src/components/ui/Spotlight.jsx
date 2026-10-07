import React, { useEffect, useState } from 'react'

export function Spotlight() {
  const [position, setPosition] = useState({ x: -500, y: -500 })

  useEffect(() => {
    const handlePointerMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(79, 124, 255, 0.05), rgba(139, 92, 246, 0.02) 40%, transparent 80%)`,
      }}
    />
  )
}
