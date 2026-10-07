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
        simResolution: 64, // Giảm độ phân giải mô phỏng để nhẹ GPU
        dyeResolution: 512,
        densityDissipation: 4.2, // Khói tan nhanh hơn, chỉ còn vệt mảnh theo chuột
        velocityDissipation: 2.4,
        pressure: 0.8,
        curl: 20,
        splatRadius: 0.06, // Vệt khói nhỏ, thanh mảnh
        splatForce: 2000,
        shading: true,
        colorful: false,
        colorPalette: ['#22D3EE', '#4F7CFF', '#8B5CF6', '#06B6D4'],
        hover: true,
        transparent: true,
        backgroundColor: '#00000000',
        bloom: false, // Tắt bloom để không chói và nhẹ hơn
        brightness: 0.4,
      })

      fluid.start()
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('touchmove', handleTouchMove)
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
