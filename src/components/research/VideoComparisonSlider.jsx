import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sliders, Sparkles, CheckCircle2, Play, Pause, Layers, ArrowLeftRight } from 'lucide-react'
import { soundFx } from '../../lib/sound'

const SAMPLES = [
  {
    id: 'sports',
    name: 'Cầu thủ di chuyển (Sports Action)',
    originalTitle: 'Khung hình gốc: Cầu thủ áo xanh di chuyển tốc độ cao',
    editedTitle: 'Rectified Flow: Biến đổi trang phục Neon Hologram, giữ nguyên quỹ đạo',
    bg: 'from-blue-950/60 to-indigo-950/80',
    metrics: { temporal: '99.4%', background: '99.8%', latency: '42ms' },
  },
  {
    id: 'traffic',
    name: 'Phương tiện đường phố (Vehicle Motion)',
    originalTitle: 'Khung hình gốc: Xe di chuyển trong môi trường đô thị',
    editedTitle: 'Rectified Flow: Thay đổi màu sơn & ánh kim, bảo toàn chuyển động bánh xe',
    bg: 'from-purple-950/60 to-cyan-950/80',
    metrics: { temporal: '98.9%', background: '99.6%', latency: '38ms' },
  },
  {
    id: 'portrait',
    name: 'Chân dung biểu cảm (Face Dynamics)',
    originalTitle: 'Khung hình gốc: Người nói chuyện, góc quay thay đổi',
    editedTitle: 'Rectified Flow: Chuyển phong cách Cyberpunk, khớp khẩu hình từng frame',
    bg: 'from-emerald-950/60 to-teal-950/80',
    metrics: { temporal: '99.7%', background: '99.9%', latency: '45ms' },
  },
]

export function VideoComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50) // 0 to 100
  const [activeSample, setActiveSample] = useState(SAMPLES[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [time, setTime] = useState(0)
  const isDragging = useRef(false)
  const containerRef = useRef(null)

  // Giả lập chuyển động khung hình video (Animation loop)
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setTime((t) => (t + 1) % 100)
    }, 40)
    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePointerDown = (e) => {
    isDragging.current = true
    soundFx.playClick()
    handlePointerMove(e)
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current && e.type !== 'click') return
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left))
    const pct = (x / rect.width) * 100
    setSliderPos(pct)
  }

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-zinc-950/70 p-5 backdrop-blur-xl shadow-2xl sm:p-7">
      {/* Header & Bộ chọn mẫu thực nghiệm */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Thực Nghiệm Kiểm Soát Không - Thời Gian (Spatiotemporal Control)
            </h4>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Kéo thanh trượt để so sánh trực quan hiệu quả bảo toàn bối cảnh & chuyển động
          </p>
        </div>

        {/* Nút Play/Pause & Chọn mẫu */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick()
              setIsPlaying(!isPlaying)
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white"
            title={isPlaying ? 'Tạm dừng mô phỏng' : 'Tiếp tục mô phỏng'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          <div className="flex gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
            {SAMPLES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  soundFx.playClick()
                  setActiveSample(s)
                }}
                className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                  activeSample.id === s.id
                    ? 'bg-accent-purple text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Khung tương tác so sánh Before / After */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/10 bg-[#08080f]"
      >
        {/* Lớp Bên Phải: Video đã chỉnh sửa qua Rectified Flow (Background & Chuyển động giữ nguyên, chủ thể thay đổi) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSample.bg} flex items-center justify-center`}>
          {/* Sóng chuyển động thời gian tương tác */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_60%_50%,rgba(139,92,246,0.3),transparent_60%)]" />

          {/* Mô phỏng chủ thể được chỉnh sửa với phong cách Rectified Flow */}
          <div
            className="relative flex flex-col items-center justify-center transition-transform duration-75"
            style={{
              transform: `translate(${Math.sin(time * 0.08) * 45}px, ${Math.cos(time * 0.06) * 15}px)`,
            }}
          >
            <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-accent-cyan bg-accent-cyan/20 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.5)]">
              <Sparkles className="h-12 w-12 text-accent-cyan animate-pulse" />
              <span className="absolute -top-3 rounded-full bg-accent-cyan px-2.5 py-0.5 font-mono text-[9px] font-bold text-black uppercase">
                Edited Subject
              </span>
            </div>
            {/* Vector quỹ đạo quang học (Optical Flow Vectors) */}
            <div className="mt-2 font-mono text-[10px] text-accent-cyan">
              Flow Vector: [{Math.sin(time * 0.08).toFixed(2)}, {Math.cos(time * 0.06).toFixed(2)}]
            </div>
          </div>

          {/* Badge góc dưới bên phải */}
          <div className="absolute bottom-4 right-4 rounded-xl border border-accent-cyan/30 bg-black/60 px-3 py-1.5 font-mono text-xs text-accent-cyan backdrop-blur-md">
            Rectified Flow Edited ✦
          </div>
        </div>

        {/* Lớp Bên Trái: Video gốc (Bị cắt theo vị trí của slider) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-zinc-950 to-zinc-900 border-r border-white/40 shadow-2xl"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 w-full min-w-[700px] flex items-center justify-center">
            {/* Mô phỏng chủ thể gốc */}
            <div
              className="relative flex flex-col items-center justify-center transition-transform duration-75"
              style={{
                transform: `translate(${Math.sin(time * 0.08) * 45}px, ${Math.cos(time * 0.06) * 15}px)`,
              }}
            >
              <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-zinc-500 bg-zinc-800/80 backdrop-blur-md">
                <Layers className="h-12 w-12 text-zinc-400" />
                <span className="absolute -top-3 rounded-full bg-zinc-600 px-2.5 py-0.5 font-mono text-[9px] font-bold text-white uppercase">
                  Original Subject
                </span>
              </div>
              <div className="mt-2 font-mono text-[10px] text-zinc-400">
                Raw Ground Truth [{Math.sin(time * 0.08).toFixed(2)}, {Math.cos(time * 0.06).toFixed(2)}]
              </div>
            </div>

            {/* Badge góc dưới bên trái */}
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-xs text-zinc-300 backdrop-blur-md">
              Video Gốc (Original)
            </div>
          </div>
        </div>

        {/* Tay cầm Slider thanh kéo ở chính giữa */}
        <div
          className="absolute inset-y-0 -ml-4 flex w-8 items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="h-full w-[2px] bg-white shadow-[0_0_12px_#ffffff]" />
          <div className="absolute flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-white shadow-xl">
            <ArrowLeftRight className="h-3.5 w-3.5 text-accent-cyan" />
          </div>
        </div>
      </div>

      {/* Bảng chỉ số so sánh & độ nhất quán */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 font-mono text-xs">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Độ nhất quán thời gian (Temporal)</div>
          <div className="mt-1 font-bold text-emerald-400 text-sm flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> {activeSample.metrics.temporal}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Bảo toàn bối cảnh (Background)</div>
          <div className="mt-1 font-bold text-accent-cyan text-sm flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> {activeSample.metrics.background}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Thời gian suy luận / frame</div>
          <div className="mt-1 font-bold text-amber-300 text-sm">
            {activeSample.metrics.latency}
          </div>
        </div>
      </div>
    </div>
  )
}
