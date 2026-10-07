import React from 'react'
import { HyperspaceWarp } from './HyperspaceWarp'
import { FluidSmoke } from './FluidSmoke'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Background Động Siêu Cấp Thẩm Mỹ (Ultra-Aesthetic Dynamic Hybrid Background)
 * - Tầng 1 (Ambient Glows): Quầng sáng phát tán đa chiều dịu nhẹ (Electric Blue, Purple, Cyan).
 *   Loại bỏ hoàn toàn ảnh nền có vệt sóng tĩnh để không gây nhầm lẫn với vệt khói chuột tương tác.
 * - Tầng 2 (Motion Effect 1): Đường hầm sao lượng tử 3D trong suốt (Hyperspace Warp).
 * - Tầng 3 (Motion Effect 2): Khói chất lỏng cực quang Navier-Stokes tương tác trực tiếp theo từng cử chỉ chuột.
 * - Tầng 4 (Cinema Grading): Lưới Micro-grid công nghệ và Vignette điện ảnh.
 */
export function CosmicBackground() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden bg-[#050505]">
      {/* 1. Ánh sáng phát tán Ambient Glow đa chiều mềm mại */}
      <div className="absolute -top-[15%] left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-blue/18 via-accent-purple/12 to-transparent blur-[140px]" />
      <div className="absolute top-[35%] -left-[10%] h-[550px] w-[550px] rounded-full bg-accent-cyan/12 blur-[140px]" />
      <div className="absolute top-[65%] -right-[10%] h-[550px] w-[550px] rounded-full bg-accent-purple/12 blur-[140px]" />

      {/* 2. Hiệu ứng động 1: Đường hầm sao lượng tử 3D trong suốt */}
      {!reducedMotion && <HyperspaceWarp />}

      {/* 3. Hiệu ứng động 2: Khói chất lỏng cực quang tương tác chuột bám sát con trỏ */}
      {!reducedMotion && <FluidSmoke />}

      {/* 4. Lưới Micro-grid công nghệ tinh tế */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-35" />

      {/* 5. Lớp Vignette viền tối điện ảnh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.55)_75%,rgba(5,5,5,0.92)_100%)]" />
    </div>
  )
}
