import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { NeuralQuantumCore } from './NeuralQuantumCore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function StaticFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-accent-blue/30 via-accent-purple/20 to-accent-cyan/20 blur-2xl animate-pulse" />
    </div>
  )
}

export default function HeroCanvas() {
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Tạm dừng vẽ khi ra khỏi màn hình để tối ưu hóa hiệu năng tuyệt đối
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
    if (wrapRef.current) io.observe(wrapRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full"
      style={{
        maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
      }}
    >
      <Suspense fallback={<StaticFallback />}>
        <Canvas
          flat
          dpr={[1, 1.5]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          {/* Ánh sáng cyberpunk */}
          <ambientLight intensity={0.6} color="#0f172a" />
          <pointLight position={[5, 5, 5]} intensity={2.5} color="#22D3EE" />
          <pointLight position={[-5, -5, -3]} intensity={2.0} color="#818CF8" />

          {/* Lõi Nơ-ron Lượng tử AI 3D (Siêu nhẹ, 60-120 FPS, không độ trễ) */}
          <NeuralQuantumCore />

          {/* Hạt bụi dữ liệu phát quang lơ lửng */}
          <Sparkles
            count={isMobile ? 25 : 55}
            scale={5}
            size={isMobile ? 1.5 : 2.5}
            speed={0.3}
            opacity={0.4}
            color="#22D3EE"
          />

          {/* Kéo chuột để xoay 360 độ mượt mà */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.6}
            autoRotate
            autoRotateSpeed={0.8}
          />

          {/* Phát quang nhẹ Bloom */}
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={0.4} luminanceThreshold={0.4} radius={0.6} />
          </EffectComposer>
        </Canvas>

        {/* Huy hiệu công nghệ nhỏ nhắn ở góc */}
        <div className="pointer-events-none absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur-md shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span>Lõi AI Lượng Tử • Tương tác 3D</span>
        </div>
      </Suspense>
    </div>
  )
}
