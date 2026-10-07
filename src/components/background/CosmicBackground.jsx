import React from 'react'
import { NeuralNetwork } from './NeuralNetwork'
import { FluidSmoke } from './FluidSmoke'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Background tối giản & sang trọng:
 * - Tầng 1: Mạng nơ-ron Canvas 2D (nút trôi, đường nối, xung tín hiệu, tương tác chuột).
 * - Tầng 2: Khói chất lỏng mảnh, chỉ xuất hiện khi rê chuột.
 * - Tầng 3: Lưới micro-grid mờ.
 * - Tầng 4: Lớp hạt nhiễu kiểu phim (film grain) giúp nền bớt phẳng.
 * - Tầng 5: Vignette viền tối điện ảnh.
 * Đã gỡ Hyperspace Warp (WebGL) và các quầng sáng tĩnh để giảm tải.
 */
export function CosmicBackground() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden bg-[#050505]">
      {/* 1. Mạng nơ-ron */}
      {!reducedMotion && <NeuralNetwork />}

      {/* 2. Khói mảnh theo chuột */}
      {!reducedMotion && <FluidSmoke />}

      {/* 3. Lưới micro-grid tinh tế */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-35" />

      {/* 4. Film grain */}
      <div className={`film-grain ${reducedMotion ? '' : 'film-grain-animated'}`} />

      {/* 5. Vignette viền tối điện ảnh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,5,0.5)_75%,rgba(5,5,5,0.9)_100%)]" />
    </div>
  )
}
