import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ShaderOrb } from './ShaderOrb'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const MASK = 'radial-gradient(circle closest-side, #000 62%, transparent 100%)'

// Default export so it can be lazy-loaded (keeps three.js out of the main bundle).
export default function HeroCanvas() {
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Pause rendering when the hero is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    if (wrapRef.current) io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="h-full w-full" style={{ maskImage: MASK, WebkitMaskImage: MASK }}>
      <Canvas
        flat
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050505']} />
        <ShaderOrb detail={isMobile ? 24 : 56} particleCount={isMobile ? 400 : 1000} />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.2} luminanceSmoothing={0.5} radius={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
