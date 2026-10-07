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
        densityDissipation: 3.2, // Khói tan nhanh và êm sau ~0.8 giây, không bị đọng bọng
        velocityDissipation: 1.8,
        pressure: 0.8,
        curl: 24, // Xoáy cuộn mềm mại, thanh mảnh
        splatRadius: 0.10, // Kích thước dải khói thu nhỏ thanh mảnh, tinh tế, không bị bự
        splatForce: 2500, // Lực đẩy vừa phải, êm dịu
        shading: true,
        colorful: false,
        colorPalette: ['#22D3EE', '#4F7CFF', '#8B5CF6', '#06B6D4'], // Dải màu Cyber Blue & Violet dịu mắt
        hover: true,
        transparent: true,
        backgroundColor: '#00000000',
        bloom: true,
        bloomIntensity: 0.18, // Giảm mạnh phát quang để tuyệt đối không chói mắt
        bloomThreshold: 0.72,
        brightness: 0.45, // Độ sáng vừa dịu, sang trọng trên nền tối
      })

      fluid.start()

      // Khởi tạo một vệt xoáy dạ quang nhẹ nhàng ban đầu
      setTimeout(() => {
        try {
          const cx = window.innerWidth / 2
          const cy = window.innerHeight * 0.45
          fluid.splatAtLocation(cx, cy, 120, 80)
        } catch (e) {}
      }, 350)
    } catch (err) {
      console.warn('WebGL Fluid initialization skipped:', err)
      return
    }

    const PALETTE = [
      { r: 0.12, g: 0.55, b: 0.85 }, // Deep Cyan Blue
      { r: 0.25, g: 0.4, b: 0.9 },   // Royal Blue
      { r: 0.45, g: 0.25, b: 0.8 },  // Soft Violet
      { r: 0.12, g: 0.65, b: 0.55 }, // Muted Emerald
    ]
    let colorIdx = 0
    const getNextColor = () => {
      const base = PALETTE[colorIdx % PALETTE.length]
      colorIdx++
      // Cường độ vừa phải, màu sắc êm dịu, không bị chói trắng
      return { r: base.r * 1.3, g: base.g * 1.3, b: base.b * 1.3 }
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

      // Khói theo sát con trỏ chuột tuyệt đối: Tính toán tọa độ chuẩn hóa [0, 1] không phụ thuộc vào tỉ lệ màn hình (DPR)
      if (dist > 1.5) {
        const normX = Math.max(0, Math.min(1, x / window.innerWidth))
        const normY = Math.max(0, Math.min(1, 1 - y / window.innerHeight))
        const forceX = dx * 16
        const forceY = -dy * 16
        const color = getNextColor()

        if (fluid.simulation && typeof fluid.simulation.splat === 'function') {
          fluid.simulation.splat(normX, normY, forceX, forceY, color)
        } else {
          fluid.splatAtLocation(x, y, forceX, forceY)
        }

        lastX = x
        lastY = y
      }
    }

    const handlePointerDown = (e) => {
      if (!fluid) return
      const normX = Math.max(0, Math.min(1, e.clientX / window.innerWidth))
      const normY = Math.max(0, Math.min(1, 1 - e.clientY / window.innerHeight))
      const color = getNextColor()

      if (fluid.simulation && typeof fluid.simulation.splat === 'function') {
        // Tỏa làn khói dịu nhẹ khi click
        fluid.simulation.splat(normX, normY, 150, 150, color)
        fluid.simulation.splat(normX, normY, -150, -150, color)
      } else {
        fluid.splatAtLocation(e.clientX, e.clientY, 150, 150)
      }
    }

    const handleTouchMove = (e) => {
      if (!fluid || !e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY })
    }

    // Khi cuộn trang, tạo vệt khói dạ quang nhẹ
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
        const normX = 0.25 + Math.random() * 0.5
        const normY = 0.3 + Math.random() * 0.4
        const color = getNextColor()
        if (fluid.simulation && typeof fluid.simulation.splat === 'function') {
          fluid.simulation.splat(normX, normY, (Math.random() - 0.5) * 200, -delta * 2, color)
        }
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-45"
    />
  )
}
