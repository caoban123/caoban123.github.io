import React, { useEffect, useRef } from 'react'

/**
 * Nền "Mạng nơ-ron" (Canvas 2D, nhẹ):
 * - Các nút sáng trôi chậm, tự nối với nhau bằng đường mảnh khi đến gần.
 * - Chuột lại gần: nút bị hút nhẹ về con trỏ và sáng lên, có đường nối tới con trỏ.
 * - Thỉnh thoảng có "xung tín hiệu" chạy dọc các đường nối như nơ-ron truyền tin.
 */
const COLORS = [
  [79, 124, 255], // xanh dương
  [139, 92, 246], // tím
  [34, 211, 238], // xanh ngọc
]
const LINK_DIST = 150
const MOUSE_DIST = 200
const MAX_PULSES = 10

export function NeuralNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let nodes = []
    let pulses = []
    let raf = 0
    let running = true
    const mouse = { x: -9999, y: -9999, active: false }

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Mật độ theo diện tích màn hình, giới hạn để giữ mượt
      const count = Math.min(Math.round((w * h) / 15000), w < 768 ? 45 : 110)
      nodes = Array.from({ length: count }, () => {
        const c = COLORS[Math.floor(Math.random() * COLORS.length)]
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.8,
          c,
          glow: 0,
        }
      })
      pulses = []
    }

    const spawnPulse = () => {
      if (pulses.length >= MAX_PULSES || nodes.length < 2) return
      const a = nodes[Math.floor(Math.random() * nodes.length)]
      // Tìm một nút láng giềng đang được nối
      let best = null
      let bestD = LINK_DIST
      for (const b of nodes) {
        if (b === a) continue
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < bestD && Math.random() > 0.3) {
          best = b
          bestD = d
        }
      }
      if (best) pulses.push({ a, b: best, t: 0, speed: 0.012 + Math.random() * 0.012 })
    }

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      // Cập nhật vị trí
      for (const n of nodes) {
        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_DIST && d > 0.1) {
            const f = (1 - d / MOUSE_DIST) * 0.02
            n.vx += (dx / d) * f
            n.vy += (dy / d) * f
            n.glow = Math.min(1, n.glow + 0.08)
          }
        }
        n.glow *= 0.95
        n.vx *= 0.985
        n.vy *= 0.985
        // Giữ chuyển động tối thiểu để mạng luôn "thở"
        if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.02
        if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.02
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = w + 20
        else if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        else if (n.y > h + 20) n.y = -20
      }

      // Đường nối giữa các nút
      ctx.lineWidth = 0.6
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          if (dx > LINK_DIST || dx < -LINK_DIST) continue
          const dy = a.y - b.y
          if (dy > LINK_DIST || dy < -LINK_DIST) continue
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * (0.14 + Math.max(a.glow, b.glow) * 0.35)
            ctx.strokeStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Đường nối tới con trỏ chuột
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y)
          if (d < MOUSE_DIST) {
            ctx.strokeStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${(1 - d / MOUSE_DIST) * 0.35})`
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(n.x, n.y)
            ctx.stroke()
          }
        }
      }

      // Nút
      for (const n of nodes) {
        const r = n.r + n.glow * 1.6
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.55 + n.glow * 0.45})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fill()
        if (n.glow > 0.15) {
          ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${n.glow * 0.15})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Xung tín hiệu chạy dọc đường nối
      if (Math.random() < 0.04) spawnPulse()
      pulses = pulses.filter((p) => {
        p.t += p.speed
        const d = Math.hypot(p.a.x - p.b.x, p.a.y - p.b.y)
        if (p.t >= 1 || d > LINK_DIST * 1.1) {
          if (p.t >= 1) p.b.glow = Math.min(1, p.b.glow + 0.6) // nút đích "kích hoạt"
          return false
        }
        const x = p.a.x + (p.b.x - p.a.x) * p.t
        const y = p.a.y + (p.b.y - p.a.y) * p.t
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6)
        g.addColorStop(0, 'rgba(255,255,255,0.9)')
        g.addColorStop(0.4, `rgba(${p.a.c[0]},${p.a.c[1]},${p.a.c[2]},0.6)`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
        return true
      })

      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }
    let resizeT = 0
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(init, 200)
    }
    // Dừng vẽ khi tab bị ẩn để tiết kiệm pin
    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    init()
    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      clearTimeout(resizeT)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 opacity-70" />
}
