import React from 'react'

/**
 * Background thẩm mỹ sang trọng cao cấp (Luxury Dark Aesthetic Background)
 * - Hoàn toàn tĩnh (không phải hiệu ứng canvas/mô phỏng chuyển động nặng gây mỏi mắt).
 * - Sử dụng visual artwork nghệ thuật dải sóng lụa dạ quang cực quang (Obsidian Aurora waves) 
 *   với gam màu Indigo, Violet và Cyan đồng bộ với toàn bộ nhận diện trang web.
 * - Tối ưu 100% hiệu năng, tải tức thì, sắc nét trên mọi màn hình Retina / 4K.
 * - Phủ lớp Micro-grid công nghệ và Vignette điện ảnh giúp chữ và thông tin nổi bật tối đa.
 */
export function CosmicBackground() {
  const bgUrl = `${import.meta.env.BASE_URL}images/bg-luxury.jpg`

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-[#050505]">
      {/* 1. Lớp hình nền visual nghệ thuật cao cấp tĩnh */}
      <img
        src={bgUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70 select-none transition-opacity duration-1000"
        loading="eager"
      />

      {/* 2. Ánh sáng Ambient phát tán dịu nhẹ (Soft ambient radial glow) */}
      <div className="absolute -top-[15%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-blue/15 via-accent-purple/10 to-transparent blur-[120px]" />
      <div className="absolute top-[35%] -left-[10%] h-[500px] w-[500px] rounded-full bg-accent-cyan/10 blur-[130px]" />
      <div className="absolute top-[65%] -right-[10%] h-[500px] w-[500px] rounded-full bg-accent-purple/10 blur-[140px]" />

      {/* 3. Lưới Micro-grid điện ảnh mờ tinh tế */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,#000_50%,transparent_100%)] opacity-40" />

      {/* 4. Lớp Vignette viền tối điện ảnh — bảo vệ độ tương phản chữ và đồ họa */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.6)_75%,rgba(5,5,5,0.92)_100%)]" />
    </div>
  )
}
