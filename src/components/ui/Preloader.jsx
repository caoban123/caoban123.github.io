import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrambleText } from './ScrambleText'

const COUNT_DURATION = 1400
const CLIMAX_HOLD = 1100

const telemetrySteps = [
  { min: 0, text: 'KHỞI TẠO HỆ THỐNG // QUANTUM CORE' },
  { min: 28, text: 'NẠP HỆ THỐNG TRUY XUẤT RAG & VECTOR DB...' },
  { min: 58, text: 'ĐỒNG BỘ COMPUTER VISION & RECTIFIED FLOW...' },
  { min: 85, text: 'TỐI ƯU HÓA MÔ HÌNH SINH // GENERATIVE AI...' },
  { min: 100, text: 'HỆ THỐNG HOÀN TẤT 100% // MỞ CỔNG KHÔNG GIAN' },
]

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [isClimax, setIsClimax] = useState(false)
  const [isWarping, setIsWarping] = useState(false)

  // Đếm từ 0 -> 100% với gia tốc mượt mà
  useEffect(() => {
    import('../hero/HeroCanvas')

    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / COUNT_DURATION)
      const eased = 1 - Math.pow(1 - p, 3.2)
      const current = Math.round(eased * 100)
      setCount(current)

      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setCount(100)
        setIsClimax(true)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Khi chạm mốc 100%, kích hoạt hiệu ứng chấn động warp và kết thúc
  useEffect(() => {
    if (!isClimax) return

    const warpTimer = setTimeout(() => {
      setIsWarping(true)
    }, CLIMAX_HOLD)

    const endTimer = setTimeout(() => {
      onComplete()
    }, CLIMAX_HOLD + 800)

    return () => {
      clearTimeout(warpTimer)
      clearTimeout(endTimer)
    }
  }, [isClimax, onComplete])

  const currentTelemetry =
    telemetrySteps.slice().reverse().find((s) => count >= s.min)?.text || telemetrySteps[0].text

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#030305] select-none">
      {/* Cửa trập trên (Top Blast Shutter) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#050507] border-b border-cyan-500/20 z-10"
        initial={{ y: '0%' }}
        animate={{ y: isWarping ? '-100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </motion.div>

      {/* Cửa trập dưới (Bottom Blast Shutter) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050507] border-t border-cyan-500/20 z-10"
        initial={{ y: '0%' }}
        animate={{ y: isWarping ? '100%' : '0%' }}
        transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </motion.div>

      {/* Trục tia Laser ngang khi mở cửa */}
      {isWarping && (
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_35px_#22D3EE,0_0_70px_#8B5CF6] z-50 pointer-events-none"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1.5, opacity: [1, 0.8, 0] }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}

      {/* Bố cục nội dung chính: Cấu trúc 3 tầng chuẩn mực, không bao giờ bị đè lấn lên nhau */}
      <motion.div
        className="relative z-30 flex h-full w-full max-w-6xl mx-auto flex-col justify-between p-6 sm:p-10 pointer-events-none"
        animate={
          isWarping
            ? { scale: 1.5, opacity: 0, filter: 'blur(14px)' }
            : { scale: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: 0.75, ease: [0.7, 0, 0.3, 1] }}
      >
        {/* Tầng 1: Header cố định trên cùng */}
        <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${isClimax ? 'bg-emerald-400' : 'bg-accent-cyan'} opacity-75`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isClimax ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]' : 'bg-accent-cyan shadow-[0_0_8px_#22D3EE]'}`} />
            </span>
            <span className="text-zinc-200 font-semibold tracking-wider">NCB_QUANTUM_CORE // v2.6</span>
          </div>
          <div className="text-accent-cyan/90 tabular-nums">
            {isClimax ? 'TRẠNG THÁI: ONLINE' : 'ĐANG ĐỒNG BỘ...'}
          </div>
        </div>

        {/* Tầng 2: Tâm điểm trung tâm (Center Stage) — Cách biệt hoàn toàn, không chạm header hay footer */}
        <div className="relative my-auto flex flex-col items-center justify-center text-center py-10">
          {/* Vòng sóng xung kích EMP khi chạm 100% */}
          {isClimax && (
            <>
              <motion.div
                className="absolute h-64 w-64 rounded-full border border-cyan-400/50 shadow-[0_0_40px_#22D3EE]"
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute h-80 w-80 rounded-full border border-purple-500/40 shadow-[0_0_50px_#8B5CF6]"
                initial={{ scale: 0.3, opacity: 0.8 }}
                animate={{ scale: 3.8, opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
              />
            </>
          )}

          {!isClimax ? (
            /* Trạng thái 0 -> 99%: Số phần trăm thanh lịch + Thanh năng lượng + Telemetry */
            <div className="flex flex-col items-center">
              <div className="relative mb-6 flex items-baseline">
                <span className="font-display text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(34,211,238,0.25)] tabular-nums">
                  {count}
                </span>
                <span className="ml-2 font-mono text-2xl sm:text-3xl font-bold text-accent-cyan">
                  %
                </span>
              </div>

              {/* Thanh tiến trình tải */}
              <div className="relative mb-5 h-1.5 w-64 sm:w-80 md:w-96 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan shadow-[0_0_15px_#22D3EE]"
                  style={{ width: `${count}%` }}
                />
              </div>

              {/* Dòng chữ Telemetry mô tả tiến trình */}
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                <span className="text-accent-cyan mr-1.5 font-bold">&gt;</span>
                {currentTelemetry}
              </div>
            </div>
          ) : (
            /* Trạng thái 100%: Giải mã tên và thông điệp chào mừng */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center px-4"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>100% HOÀN TẤT // CHÀO MỪNG BẠN</span>
              </div>

              <div className="py-2">
                <ScrambleText
                  text="NGUYỄN CAO BẢN"
                  duration={400}
                  className="block font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_0_40px_rgba(79,124,255,0.7)]"
                />
              </div>

              <p className="mt-2 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-accent-cyan drop-shadow-[0_0_12px_#22D3EE]">
                AI DEVELOPER · RAG · COMPUTER VISION · RESEARCHER
              </p>
            </motion.div>
          )}
        </div>

        {/* Tầng 3: Footer cố định dưới cùng */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-zinc-500">
          <span>TP. HỒ CHÍ MINH, VIỆT NAM</span>
          <span>&copy; {new Date().getFullYear()} NGUYỄN CAO BẢN</span>
        </div>
      </motion.div>
    </div>
  )
}
