import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrambleText } from './ScrambleText'
import { site } from '../../data/site'

const COUNT_DURATION = 1400
const CLIMAX_HOLD = 1200

const telemetrySteps = [
  { min: 0, text: 'KHỞI TẠO LÕI TÍNH TOÁN LƯỢNG TỬ // QUANTUM CORE' },
  { min: 28, text: 'NẠP HỆ THỐNG TRUY XUẤT RAG & VECTOR DATABASE...' },
  { min: 58, text: 'ĐỒNG BỘ COMPUTER VISION & RECTIFIED FLOW ENGINE...' },
  { min: 85, text: 'TỐI ƯU HÓA MÔ HÌNH SINH // GENERATIVE AI READY...' },
  { min: 100, text: 'HỆ THỐNG HOÀN TẤT 100% // MỞ CỔNG KHÔNG GIAN' },
]

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [isClimax, setIsClimax] = useState(false)
  const [isWarping, setIsWarping] = useState(false)

  // Đếm từ 0 -> 100% với gia tốc mượt mà
  useEffect(() => {
    // Tải trước bundle 3D HeroCanvas
    import('../hero/HeroCanvas')

    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / COUNT_DURATION)
      // Hàm gia tốc phi tuyến tính để số nhảy giật kịch tính khi về gần 100
      const eased = 1 - Math.pow(1 - p, 3.2)
      const current = Math.round(eased * 100)
      setCount(current)

      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setCount(100)
        setIsClimax(true) // Chạm mốc 100% -> Kích hoạt chuỗi hiệu ứng bá đạo
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Khi chạm mốc 100%, kích hoạt hiệu ứng chấn động warp và kết thúc
  useEffect(() => {
    if (!isClimax) return

    // Giữ màn hình đỉnh cao trong 900ms rồi kích hoạt xé toang cánh cổng
    const warpTimer = setTimeout(() => {
      setIsWarping(true)
    }, CLIMAX_HOLD)

    // Kết thúc hoàn toàn và mở website chính thức
    const endTimer = setTimeout(() => {
      onComplete()
    }, CLIMAX_HOLD + 850)

    return () => {
      clearTimeout(warpTimer)
      clearTimeout(endTimer)
    }
  }, [isClimax, onComplete])

  // Lấy dòng chữ trạng thái telemetry tương ứng với % hiện tại
  const currentTelemetry =
    telemetrySteps.slice().reverse().find((s) => count >= s.min)?.text || telemetrySteps[0].text

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#030305] select-none">
      {/* 1. NỬA TRÊN CỦA CỬA TỰ ĐỘNG KHÔNG GIAN (TOP BLAST SHUTTER) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#050507] border-b border-cyan-500/30 overflow-hidden"
        initial={{ y: '0%' }}
        animate={{ y: isWarping ? '-100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
      >
        {/* Lưới tọa độ HUD mờ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40" />
        <div className="flex h-full flex-col justify-between p-6 sm:p-10">
          {/* Header trạng thái */}
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${isClimax ? 'bg-accent-cyan shadow-[0_0_12px_#22D3EE] animate-pulse' : 'bg-accent-blue animate-ping'}`} />
              <span className="text-zinc-300">NCB_QUANTUM_CORE // v2.6</span>
            </div>
            <span className="text-accent-cyan/90 tabular-nums">
              {isClimax ? 'TRẠNG THÁI: ONLINE' : 'ĐANG ĐỒNG BỘ...'}
            </span>
          </div>

          {/* Dòng chữ Telemetry quét liên tục */}
          <div className="font-mono text-xs uppercase tracking-widest text-accent-cyan/80">
            &gt; {currentTelemetry}
          </div>
        </div>
      </motion.div>

      {/* 2. NỬA DƯỚI CỦA CỬA TỰ ĐỘNG KHÔNG GIAN (BOTTOM BLAST SHUTTER) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050507] border-t border-cyan-500/30 overflow-hidden"
        initial={{ y: '0%' }}
        animate={{ y: isWarping ? '100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40" />
        <div className="flex h-full flex-col justify-end p-6 sm:p-10">
          {/* Thanh năng lượng Segmented Battery */}
          <div className="mb-4">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
              <span>ĐỘ TRỄ HỆ THỐNG: 0.04ms</span>
              <span>100% HOÀN TẤT</span>
            </div>
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan shadow-[0_0_15px_#22D3EE]"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>TP. HỒ CHÍ MINH, VIỆT NAM</span>
            <span>&copy; {new Date().getFullYear()} NGUYỄN CAO BẢN</span>
          </div>
        </div>
      </motion.div>

      {/* 3. TRỤC TIA LASER TRUNG TÂM PHÁT SÁNG NGANG (HORIZON LASER SEAM) */}
      {isWarping && (
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_35px_#22D3EE,0_0_70px_#8B5CF6] z-50 pointer-events-none"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1.5, opacity: [1, 0.8, 0] }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}

      {/* 4. TÂM ĐIỂM CHÍNH (SỐ 100% VÀ HIỆU ỨNG BÁ ĐẠO KHỞI CHẠY) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <motion.div
          className="flex flex-col items-center justify-center text-center px-4"
          animate={
            isWarping
              ? { scale: 2.2, opacity: 0, filter: 'blur(16px)' }
              : { scale: 1, opacity: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.75, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Vòng sóng xung kích chấn động (EMP Shockwave Ring) nổ ra khi chạm 100% */}
          {isClimax && (
            <motion.div
              className="absolute h-64 w-64 rounded-full border-2 border-accent-cyan shadow-[0_0_50px_#22D3EE]"
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          )}

          {/* Vòng hào quang thứ 2 phát sáng màu tím */}
          {isClimax && (
            <motion.div
              className="absolute h-80 w-80 rounded-full border border-accent-purple shadow-[0_0_60px_#8B5CF6]"
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 4.2, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
            />
          )}

          {!isClimax ? (
            /* Khi đang đếm từ 0 đến 99: Hiển thị số khổng lồ với bóng neon */
            <div className="relative">
              <span className="font-display text-[26vw] sm:text-[18vw] font-black leading-none tracking-tighter bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.3)]">
                {String(count).padStart(3, '0')}
              </span>
              <span className="absolute -right-6 top-4 sm:-right-10 sm:top-8 font-mono text-xl sm:text-3xl text-accent-cyan font-bold">
                %
              </span>
            </div>
          ) : (
            /* KHI CHẠM 100%: GIẢI MÃ TÊN BÁ ĐẠO VỚI HIỆU ỨNG HOLOGRAPHIC CỰC MẠNH */
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative py-4"
            >
              {/* Huy hiệu 100% KHỞI ĐỘNG THÀNH CÔNG */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                  100% HOÀN TẤT // CHÀO MỪNG BẠN
                </span>
              </div>

              {/* Tên giải mã ScrambleText hoành tráng */}
              <div className="overflow-visible py-2">
                <ScrambleText
                  text="NGUYỄN CAO BẢN"
                  duration={500}
                  className="block font-display text-4xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_0_40px_rgba(79,124,255,0.7)]"
                />
              </div>

              {/* Lĩnh vực chuyên môn phát sáng */}
              <p className="mt-2 font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-accent-cyan drop-shadow-[0_0_15px_#22D3EE]">
                AI DEVELOPER · RAG · COMPUTER VISION · RESEARCHER
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
