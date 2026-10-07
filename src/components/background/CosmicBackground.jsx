import React from 'react'
import { HyperspaceWarp } from './HyperspaceWarp'
import { FluidSmoke } from './FluidSmoke'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Background siêu sống động phối hợp 1 + 2:
 * - Lớp sâu (HyperspaceWarp): Đường hầm lượng tử 3D, khi cuộn trang các hạt sao kéo thành vệt sáng siêu tốc (warp streaks).
 * - Lớp trên (FluidSmoke): Khói chất lỏng dạ quang Navier-Stokes bừng sáng và cuộn xoáy theo đường di chuột.
 */
export function CosmicBackground() {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,124,255,0.06),transparent_70%)]" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden bg-[#050505]">
      {/* Lớp 1: Đường hầm sao lượng tử siêu tốc */}
      <HyperspaceWarp />

      {/* Lớp 2: Khói chất lỏng dạ quang tương tác chuột */}
      <FluidSmoke />

      {/* Lớp phủ lưới mờ nhẹ để tạo chất liệu phim điện ảnh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 pointer-events-none" />
    </div>
  )
}
