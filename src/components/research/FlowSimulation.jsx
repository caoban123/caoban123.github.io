import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const N = 360
const SOURCE = [-0.66, 0]
const TARGET = [0.64, 0]
const COLORS = ['#4F7CFF', '#8B5CF6', '#22D3EE']
const CYCLE_MS = 3800
const TRAVEL = 0.7 // tỷ lệ chu kỳ di chuyển

// Seeded RNG
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildDataset() {
  const rand = mulberry32(7)
  const gauss = () => {
    const u = 1 - rand()
    const v = rand()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  }

  const x0 = []
  const x1 = []
  for (let i = 0; i < N; i++) {
    x0.push([SOURCE[0] + gauss() * 0.13, SOURCE[1] + gauss() * 0.13])

    // Two moons
    const a = rand() * Math.PI
    let mx, my
    if (i % 2 === 0) {
      mx = Math.cos(a)
      my = Math.sin(a)
    } else {
      mx = 1 - Math.cos(a)
      my = 0.5 - Math.sin(a)
    }
    mx = (mx - 0.5 + gauss() * 0.06) * 0.3
    my = (my - 0.25 + gauss() * 0.06) * 0.3
    x1.push([TARGET[0] + my, TARGET[1] + mx])
  }

  const randomPair = x0.map((_, i) => i).sort(() => rand() - 0.5)
  const byY = (arr) => arr.map((p, i) => [p[1], i]).sort((a, b) => a[0] - b[0]).map((e) => e[1])
  const src = byY(x0)
  const tgt = byY(x1)
  const straightPair = new Array(N)
  src.forEach((si, k) => (straightPair[si] = tgt[k]))

  const bend = x0.map(() => (rand() * 2 - 1) * 0.42)

  return { x0, x1, randomPair, straightPair, bend }
}

function integrate(data, mode, steps) {
  const { x0, x1, randomPair, straightPair, bend } = data
  const curved = mode === 'diffusion'
  const pair = curved ? randomPair : straightPair
  const dt = 1 / steps

  const paths = []
  const colors = []
  let err = 0

  for (let i = 0; i < N; i++) {
    const a = x0[i]
    const b = x1[pair[i]]
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dx, dy) || 1
    const cx = curved ? (-dy / len) * bend[i] : 0
    const cy = curved ? (dx / len) * bend[i] : 0

    const pts = new Float32Array((steps + 1) * 2)
    let px = a[0]
    let py = a[1]
    pts[0] = px
    pts[1] = py
    for (let k = 0; k < steps; k++) {
      const w = Math.PI * Math.cos(Math.PI * k * dt)
      px += (dx + w * cx) * dt
      py += (dy + w * cy) * dt
      pts[(k + 1) * 2] = px
      pts[(k + 1) * 2 + 1] = py
    }
    err += Math.hypot(px - b[0], py - b[1])
    paths.push(pts)
    colors.push(COLORS[pair[i] % 3])
  }

  return { paths, colors, error: err / N }
}

export function FlowSimulation() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [mode, setMode] = useState('rectified')
  const [steps, setSteps] = useState(3)
  const reduced = useReducedMotion()

  const data = useMemo(buildDataset, [])
  const sim = useMemo(() => integrate(data, mode, steps), [data, mode, steps])

  const simRef = useRef(sim)
  simRef.current = sim
  const startRef = useRef(performance.now())

  useEffect(() => {
    startRef.current = performance.now()
  }, [mode, steps])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let visible = true
    let W = 0
    let H = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now) => {
      const { paths, colors } = simRef.current
      const stepsN = paths[0].length / 2 - 1
      const s = Math.min(W / 2.3, H / 1.15)
      const ox = W / 2
      const oy = H / 2
      const X = (x) => ox + x * s
      const Y = (y) => oy - y * s

      let t = 1
      if (!reduced) {
        const local = ((now - startRef.current) % CYCLE_MS) / CYCLE_MS
        const p = Math.min(1, local / TRAVEL)
        t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      }

      ctx.clearRect(0, 0, W, H)

      // Phân phối dữ liệu đích (Ghost points)
      ctx.fillStyle = 'rgba(255,255,255,0.13)'
      for (const p of data.x1) ctx.fillRect(X(p[0]) - 1, Y(p[1]) - 1, 2, 2)

      // Đường quỹ đạo Euler
      ctx.strokeStyle = 'rgba(120,140,255,0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (const pts of paths) {
        ctx.moveTo(X(pts[0]), Y(pts[1]))
        for (let k = 1; k <= stepsN; k++) ctx.lineTo(X(pts[k * 2]), Y(pts[k * 2 + 1]))
      }
      ctx.stroke()

      // Các hạt di chuyển
      ctx.globalCompositeOperation = 'lighter'
      const f = t * stepsN
      const k = Math.min(stepsN - 1, Math.floor(f))
      const u = f - k
      for (const color of COLORS) {
        ctx.fillStyle = color
        ctx.beginPath()
        for (let i = 0; i < paths.length; i++) {
          if (colors[i] !== color) continue
          const pts = paths[i]
          const x = pts[k * 2] + (pts[(k + 1) * 2] - pts[k * 2]) * u
          const y = pts[k * 2 + 1] + (pts[(k + 1) * 2 + 1] - pts[k * 2 + 1]) * u
          ctx.moveTo(X(x) + 1.8, Y(y))
          ctx.arc(X(x), Y(y), 1.8, 0, Math.PI * 2)
        }
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      // Nhãn phân phối
      ctx.fillStyle = 'rgba(161,161,170,0.85)'
      ctx.font = '11px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('x₀ ~ N(0, I) [Nhiễu]', X(SOURCE[0]), Y(-0.53))
      ctx.fillText('x₁ ~ p_data [Dữ liệu]', X(TARGET[0]), Y(-0.53))
    }

    const loop = (now) => {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(wrapRef.current)

    if (reduced) draw(performance.now())
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [data, reduced, sim])

  return (
    <div ref={wrapRef} className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#08080d]">
      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-cyan font-semibold">
            Mô phỏng tương tác · Nhiễu → Dữ liệu
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            Trực quan hóa lý do tại sao quỹ đạo thẳng cần ít bước lấy mẫu (NFE) hơn.
          </div>
        </div>

        <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1 font-mono text-xs">
          {[
            ['diffusion', 'Quỹ đạo cong (Diffusion)'],
            ['rectified', 'Quỹ đạo thẳng (Rectified Flow)'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                mode === key ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="block h-[300px] w-full sm:h-[380px]" aria-label="Mô phỏng dòng chảy hạt từ nhiễu Gauss đến dữ liệu two-moons" role="img" />

      <div className="grid grid-cols-1 gap-5 border-t border-white/[0.06] p-5 sm:grid-cols-3 sm:p-6">
        <label className="sm:col-span-2">
          <div className="mb-2 flex justify-between font-mono text-xs text-zinc-400">
            <span>Số bước Euler (NFE)</span>
            <span className="text-white font-bold">{steps}</span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="flow-range w-full cursor-pointer"
          />
        </label>
        <div className="flex items-end justify-between gap-4 font-mono text-xs sm:flex-col sm:items-end sm:justify-end">
          <span className="text-zinc-500">Sai số điểm cuối (Endpoint error)</span>
          <span className={`text-lg font-bold ${sim.error < 0.01 ? 'text-accent-cyan' : 'text-accent-purple'}`}>
            {sim.error.toFixed(3)}
          </span>
        </div>
      </div>

      <p className="px-5 pb-5 text-xs leading-relaxed text-zinc-500 sm:px-6">
        Minh họa trực quan mang tính phương pháp luận. Quỹ đạo cong bị lệch khỏi phân phối đích khi lấy mẫu với ít bước Euler (sai số ∝ 1/N);
        trong khi quỹ đạo thẳng đạt độ chính xác cao ngay cả với 1 bước — nguyên lý cốt lõi của Rectified Flow.
      </p>
    </div>
  )
}
