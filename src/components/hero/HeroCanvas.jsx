import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SpidermanModel } from './SpidermanModel'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function LoadingFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/30 border-t-accent-cyan animate-spin" />
        <span className="font-mono text-xs text-accent-cyan">3D</span>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 animate-pulse">
        Nạp mô hình Spiderman...
      </span>
    </div>
  )
}

export default function HeroCanvas() {
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Tạm dừng vẽ khi ra khỏi tầm nhìn màn hình để tiết kiệm GPU
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
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          flat
          dpr={[1, 1.5]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [0, 0.2, 4.2], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          {/* Ánh sáng điện ảnh Cinematic Marvel Lighting */}
          <ambientLight intensity={0.9} color="#1e293b" />
          {/* Key Light chiếu rọi chính diện */}
          <directionalLight position={[4, 5, 4]} intensity={2.5} color="#ffffff" />
          {/* Đèn viền xanh Neon Cyber Cyan */}
          <pointLight position={[-4, 2, -2]} intensity={3.5} color="#22D3EE" />
          {/* Đèn viền đỏ đặc trưng của Spiderman */}
          <pointLight position={[3, -1, -2]} intensity={2.8} color="#EF4444" />
          {/* Đèn tím ánh trăng huyền ảo trên cao */}
          <pointLight position={[0, 4, 2]} intensity={2.2} color="#8B5CF6" />

          {/* Nhân vật Spiderman chuyển động 3D */}
          <SpidermanModel />

          {/* Bóng tiếp xúc sàn Contact Shadow chân thực */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.65}
            scale={7}
            blur={2.4}
            far={4}
            color="#030308"
          />

          {/* Bụi tơ nhện dạ quang bay lơ lửng xung quanh */}
          <Sparkles
            count={isMobile ? 20 : 45}
            scale={4}
            size={isMobile ? 2 : 3}
            speed={0.4}
            opacity={0.5}
            color="#38bdf8"
          />

          {/* Cho phép người dùng chạm/kéo chuột để xoay nhân vật Spiderman 360 độ */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.6}
            rotateSpeed={0.7}
          />

          {/* Hiệu ứng phát quang nhẹ Postprocessing Bloom */}
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.55} radius={0.5} />
          </EffectComposer>
        </Canvas>

        {/* Huy hiệu hướng dẫn tương tác tinh tế */}
        <div className="pointer-events-none absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur-md shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-ping" />
          <span>🕸️ Spiderman 3D • Kéo để xoay • Click đổi dáng</span>
        </div>
      </Suspense>
    </div>
  )
}
