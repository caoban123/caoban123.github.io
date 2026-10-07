import React, { useRef, useState } from 'react'
import { soundFx } from '../../lib/sound'

export function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState('')
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    )

    if (glare) {
      setGlareStyle({
        opacity: 0.18,
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    soundFx.playHover()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      {children}

      {/* Lớp phản quang ánh sáng kính mờ (Glare Sheen) */}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(79, 124, 255, 0.08) 35%, transparent 70%)`,
          }}
        />
      )}
    </div>
  )
}
