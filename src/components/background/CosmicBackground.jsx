import React from 'react'
import { HyperspaceWarp } from './HyperspaceWarp'
import { FluidSmoke } from './FluidSmoke'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Background Động Siêu Cấp Thẩm Mỹ (Ultra-Aesthetic Dynamic Hybrid Background)
 * - Tầng 1 (Visual Artwork): Hình nền nghệ thuật dải sóng lụa dạ quang cực quang (Obsidian Aurora waves) 
 *   độ nét cao, ánh sáng tím Violet và Cyan mờ ảo tạo chiều sâu không gian.
 * - Tầng 2 (Ambient Glows): Quầng sáng đa chiều phát tán dịu nhẹ.
 * - Tầng 3 (Motion Effect 1): Đường hầm sao lượng tử 3D (HyperspaceWarp) trong suốt — khi cuộn trang sao kéo vệt sáng siêu tốc.
 * - Tầng 4 (Motion Effect 2): Khói chất lỏng cực quang Navier-Stokes (FluidSmoke) — tương tác xoáy sóng lụa mượt mà theo đường di chuột.
 * - Tầng 5 (Cinema Grading): Lớp Micro-grid công nghệ và Vignette tối góc giữ trọn vẹn độ sắc nét, tương phản cho chữ.
 */
export function CosmicBackground() {
  const reducedMotion = useReducedMotion()
  const bgUrl = `${import.meta.env.BASE_URL}images/bg-luxury.jpg`

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[#050505]">
      {/* 1. Hình nền nghệ thuật dải sóng lụa cực quang Obsidian */}
      <img
        src={bgUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-65 select-none"
        loading="eager"
      />

      {/* 2. Ánh sáng Ambient phát tán dịu nhẹ đa chiều */}
      <div className="absolute -top-[15%] left-1/2 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-blue/20 via-accent-purple/15 to-transparent blur-[130px]" />
      <div className="absolute top-[35%] -left-[10%] h-[550px] w-[550px] rounded-full bg-accent-cyan/15 blur-[140px]" />
      <div className="absolute top-[65%] -right-[10%] h-[550px] w-[550px] rounded-full bg-accent-purple/15 blur-[140px]" />

      {/* 3. Hiệu ứng động 1: Đường hầm sao lượng tử 3D trong suốt */}
      {!reducedMotion && <HyperspaceWarp />}

      {/* 4. Hiệu ứng động 2: Khói chất lỏng cực quang tương tác chuột */}
      {!reducedMotion && <FluidSmoke />}

      {/* 5. Lưới Micro-grid công nghệ tinh tế */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-35" />

      {/* 6. Lớp Vignette viền tối điện ảnh — giữ tương phản hoàn hảo cho nội dung */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.55)_75%,rgba(5,5,5,0.92)_100%)]" />
    </div>
  )
}
