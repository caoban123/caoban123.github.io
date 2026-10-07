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
        densityDissipation: 2.4, // Khói tan êm sau ~1.5 giây
        velocityDissipation: 1.8,
        pressure: 0.8,
        curl: 28, // Độ cuộn xoáy tự nhiên
        splatRadius: 0.22,
        splatForce: 5500,
        shading: true,
        colorful: false,
        colorPalette: ['#4F7CFF', '#8B5CF6', '#22D3EE', '#6366F1'], // Electric Blue, Neon Purple, Cyber Cyan
        hover: true,
        transparent: true,
        backgroundColor: '#00000000',
        bloom: true,
        bloomIntensity: 0.75,
        bloomThreshold: 0.5,
        brightness: 0.8,
      })

      fluid.start()

      // Tạo một đợt bùng nổ khói dạ quang ban đầu khi vào trang
      setTimeout(() => {
        try {
          fluid.multipleSplats(2)
        } catch (e) {}
      }, 400)
    } catch (err) {
      console.warn('WebGL Fluid initialization skipped:', err)
      return
    }

    // Do container nằm ở background với pointer-events-none,
    // ta lắng nghe sự kiện pointermove trên window và chuyển tiếp (forward) vào canvas
    const canvas = containerRef.current.querySelector('canvas')

    const forwardPointerMove = (e) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
      })
      Object.defineProperty(mouseEvent, 'offsetX', { value: e.clientX - rect.left })
      Object.defineProperty(mouseEvent, 'offsetY', { value: e.clientY - rect.top })
      canvas.dispatchEvent(mouseEvent)
    }

    // Khi cuộn trang nhanh, kích thích tạo thêm vệt khói xoáy nhẹ
    let lastScrollY = window.scrollY
    let scrollThrottle = 0
    const handleScroll = () => {
      const now = performance.now()
      if (now - scrollThrottle < 200) return
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      if (delta > 60 && fluid) {
        scrollThrottle = now
        // Bắn một vệt khói ngẫu nhiên khi cuộn nhanh
        const x = window.innerWidth * (0.3 + Math.random() * 0.4)
        const y = window.innerHeight * (0.2 + Math.random() * 0.6)
        fluid.splatAtLocation(x, y, (Math.random() - 0.5) * 500, -delta * 4)
      }
    }

    window.addEventListener('pointermove', forwardPointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', forwardPointerMove)
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-85"
    />
  )
}
