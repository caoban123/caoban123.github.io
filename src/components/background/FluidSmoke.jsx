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
        densityDissipation: 2.0, // Khói tan êm ái sau ~1.5 giây
        velocityDissipation: 1.5,
        pressure: 0.8,
        curl: 30, // Xoáy cuộn mềm mại
        splatRadius: 0.28, // Kích thước dải lụa rõ ràng, đẹp mắt
        splatForce: 6000, // Lực đẩy chuẩn của thư viện để khói bung nở sống động
        shading: true,
        colorful: false,
        colorPalette: ['#22D3EE', '#4F7CFF', '#8B5CF6', '#EC4899', '#06B6D4'], // Cyber Cyan, Electric Blue, Violet, Neon Pink
        hover: true,
        transparent: true,
        backgroundColor: '#00000000',
        bloom: true,
        bloomIntensity: 0.65, // Phát sáng sống động, huyền ảo
        bloomThreshold: 0.45,
        brightness: 0.9, // Sắc nét, nổi bật trên nền đen
      })

      fluid.start()

      // Khởi tạo một vệt xoáy dạ quang nhẹ nhàng ban đầu
      setTimeout(() => {
        try {
          const cx = window.innerWidth / 2
          const cy = window.innerHeight * 0.45
          fluid.splatAtLocation(cx, cy, 300, 180)
        } catch (e) {}
      }, 350)
    } catch (err) {
      console.warn('WebGL Fluid initialization skipped:', err)
      return
    }

    let lastX = 0
    let lastY = 0
    let hasMoved = false

    const handlePointerMove = (e) => {
      if (!fluid) return
      const x = e.clientX
      const y = e.clientY

      if (!hasMoved) {
        lastX = x
        lastY = y
        hasMoved = true
        return
      }

      const dx = x - lastX
      const dy = y - lastY
      const dist = Math.hypot(dx, dy)

      // Cập nhật sự kiện chuột trực tiếp vào mô phỏng
      if (fluid.simulation && typeof fluid.simulation.handleMouseMove === 'function') {
        try {
          fluid.simulation.handleMouseMove({ offsetX: x, offsetY: y })
        } catch (err) {}
      }

      // Đồng thời bổ sung một lực phun rõ nét theo vector di chuyển
      if (dist > 2) {
        const forceX = dx * 45
        const forceY = -dy * 45
        fluid.splatAtLocation(x, y, forceX, forceY)
        lastX = x
        lastY = y
      }
    }

    const handlePointerDown = (e) => {
      if (!fluid) return
      if (fluid.simulation && typeof fluid.simulation.handleMouseDown === 'function') {
        try {
          fluid.simulation.handleMouseDown({ offsetX: e.clientX, offsetY: e.clientY })
        } catch (err) {}
      }
      fluid.splatAtLocation(e.clientX, e.clientY, (Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600)
    }

    const handleTouchMove = (e) => {
      if (!fluid || !e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY })
    }

    // Khi cuộn trang, tạo vệt khói dạ quang
    let lastScrollY = window.scrollY
    let scrollThrottle = 0
    const handleScroll = () => {
      const now = performance.now()
      if (now - scrollThrottle < 180) return
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      if (delta > 40 && fluid) {
        scrollThrottle = now
        const x = window.innerWidth * (0.25 + Math.random() * 0.5)
        const y = window.innerHeight * (0.25 + Math.random() * 0.5)
        fluid.splatAtLocation(x, y, (Math.random() - 0.5) * 550, -delta * 4)
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
