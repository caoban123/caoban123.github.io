import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AIOrb } from './AIOrb'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function HeroCanvas({ mouse }) {
  const isReducedMotion = useReducedMotion()

  if (isReducedMotion) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-accent-blue/30 via-accent-purple/20 to-accent-cyan/20 blur-2xl" />
        <div className="absolute w-48 h-48 rounded-full border border-accent-blue/30" />
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] md:h-[550px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <AIOrb mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
