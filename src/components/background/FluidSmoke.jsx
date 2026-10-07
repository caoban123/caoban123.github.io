import React, { useEffect, useRef } from 'react'
import WebGLFluidEnhanced from 'webgl-fluid-enhanced'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function FluidSmoke() {
  const containerRef = useRef(null)
  const fluidRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return

    let fluid = null
    try {
      fluid = new WebGLFluidEnhanced(containerRef.current)
      fluidRef.current = fluid

      fluid.setConfig({
        simResolution: 128,
        dyeResolution: 1024,
        densityDissipation: 1.8, // Khói tan êm ái, giữ vệt sóng lụa lâu hơn
        velocityDissipation: 1.4,
        pressure: 0.8,
        curl: 32, // Xoáy cuộn nghệ thuật sống động
        splatRadius: 0.28,
        splatForce: 6000,
        shading: true,
        colorful: false,
        colorPalette: ['#4F7CFF', '#8B5CF6', '#22D3EE', '#6366F1', '#A855F7', '#38BDF8'],
        hover: true,
        transparent: true,
        backgroundColor: '#00000000', // 100% trong suốt
        bloom: true,
        bloomIntensity: 0.9,
        bloomThreshold: 0.4,
        brightness: 0.95,
      })

      fluid.start()

      // Khởi tạo các vệt khói cực quang chào đón khi vào trang
      setTimeout(() => {
        try {
          fluid.multipleSplats(4)
        } catch (e) {}
      }, 250)

      setTimeout(() => {
        try {
          const cx = window.innerWidth / 2
          const cy = window.innerHeight / 2
          fluid.splatAtLocation(cx - 120, cy, 350, 150)
          fluid.splatAtLocation(cx + 120, cy, -350, -150)
        } catch (e) {}
      }, 500)
    } catch (err) {
      console.warn('WebGL Fluid initialization skipped:', err)
      return
    }

    // Lắng nghe trực tiếp trên window để hoạt động 100% chuẩn xác trên cả Desktop (chuột) và Mobile (cảm ứng)
    let lastX = 0
    let lastY = 0
    let hasMoved = false
    let lastTime = 0

    const handlePointerMove = (e) => {
      if (!fluid) return
      const x = e.clientX
      const y = e.clientY
      const now = performance.now()

      if (!hasMoved) {
        lastX = x
        lastY = y
        lastTime = now
        hasMoved = true
        return
      }

      const dx = x - lastX
      const dy = y - lastY
      const dist = Math.hypot(dx, dy)
      const dt = Math.max(now - lastTime, 16)

      // Kích hoạt vệt khói theo di chuyển chuột
      if (dist > 3) {
        const factor = Math.min(Math.max(dist / dt, 1), 6) * 10
        fluid.splatAtLocation(x, y, dx * factor, -dy * factor)
        lastX = x
        lastY = y
        lastTime = now
      }
    }

    const handlePointerDown = (e) => {
      if (!fluid) return
      // Khi click chuột: Bùng nổ đợt khói rực rỡ tại vị trí bấm
      fluid.splatAtLocation(e.clientX, e.clientY, (Math.random() - 0.5) * 700, (Math.random() - 0.5) * 700)
    }

    const handleTouchMove = (e) => {
      if (!fluid || !e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY })
    }

    // Khi cuộn trang nhanh, kích thích tạo thêm vệt khói xoáy cực quang
    let lastScrollY = window.scrollY
    let scrollThrottle = 0
    const handleScroll = () => {
      const now = performance.now()
      if (now - scrollThrottle < 160) return
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      if (delta > 40 && fluid) {
        scrollThrottle = now
        const x = window.innerWidth * (0.25 + Math.random() * 0.5)
        const y = window.innerHeight * (0.2 + Math.random() * 0.6)
        fluid.splatAtLocation(x, y, (Math.random() - 0.5) * 700, -delta * 5)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('scroll', handleScroll)
      if (fluid) {
        try {
          fluid.stop()
        } catch (e) {}
      }
      fluidRef.current = null
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-90"
    />
  )
}
