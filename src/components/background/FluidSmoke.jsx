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
        densityDissipation: 2.8, // Khói tan nhanh và êm dịu, không bị đọng thành đám mây dày
        velocityDissipation: 1.8,
        pressure: 0.8,
        curl: 24, // Xoáy cuộn mềm mại, thanh thoát
        splatRadius: 0.13, // ĐÃ GIẢM: Vệt khói mảnh mai, tinh tế, không bị to chiếm màn hình
        splatForce: 3200, // Lực đẩy vừa phải, êm ái
        shading: true,
        colorful: false,
        colorPalette: ['#4F7CFF', '#8B5CF6', '#22D3EE', '#6366F1'], // Sắc màu thanh nhã
        hover: true,
        transparent: true,
        backgroundColor: '#00000000',
        bloom: true,
        bloomIntensity: 0.22, // ĐÃ GIẢM: Độ phát sáng êm dịu, hoàn toàn không bị chói mắt
        bloomThreshold: 0.7, // Chỉ phát quang nhẹ ở lõi vệt khói
        brightness: 0.52, // ĐÃ GIẢM: Độ sáng dịu mắt, hài hòa với giao diện tối sang trọng
      })

      fluid.start()

      // Khởi tạo một vệt gợn sóng nhẹ ban đầu, không gây giật mình
      setTimeout(() => {
        try {
          const cx = window.innerWidth / 2
          const cy = window.innerHeight * 0.4
          fluid.splatAtLocation(cx, cy, 100, 60)
        } catch (e) {}
      }, 400)
    } catch (err) {
      console.warn('WebGL Fluid initialization skipped:', err)
      return
    }

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

      // Chỉ kích hoạt khi chuột di chuyển rõ ràng, lực vừa phải thanh thoát
      if (dist > 6) {
        const factor = Math.min(Math.max(dist / dt, 0.5), 2.5) * 3
        fluid.splatAtLocation(x, y, dx * factor, -dy * factor)
        lastX = x
        lastY = y
        lastTime = now
      }
    }

    const handlePointerDown = (e) => {
      if (!fluid) return
      // Nhấp chuột: Phun một đốm khói nhỏ nhẹ dịu
      fluid.splatAtLocation(e.clientX, e.clientY, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200)
    }

    const handleTouchMove = (e) => {
      if (!fluid || !e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY })
    }

    // Khi cuộn trang, tạo vệt khói nhẹ
    let lastScrollY = window.scrollY
    let scrollThrottle = 0
    const handleScroll = () => {
      const now = performance.now()
      if (now - scrollThrottle < 200) return
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      if (delta > 50 && fluid) {
        scrollThrottle = now
        const x = window.innerWidth * (0.3 + Math.random() * 0.4)
        const y = window.innerHeight * (0.3 + Math.random() * 0.4)
        fluid.splatAtLocation(x, y, (Math.random() - 0.5) * 300, -delta * 2)
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-60"
    />
  )
}
