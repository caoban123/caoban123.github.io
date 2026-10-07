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
        densityDissipation: 2.0, // Khói tan êm ái, kéo dài dải lụa phát sáng
        velocityDissipation: 1.6,
        pressure: 0.8,
        curl: 32, // Xoáy cuộn nghệ thuật sống động
        splatRadius: 0.26,
        splatForce: 6000,
        shading: true,
        colorful: false,
        colorPalette: ['#4F7CFF', '#8B5CF6', '#22D3EE', '#6366F1', '#A855F7'], // Tím Neon, Lam Điện, Lục Lam
        hover: true,
        transparent: true,
        backgroundColor: '#00000000', // Hoàn toàn trong suốt để lộ hình nền nghệ thuật bên dưới
        bloom: true,
        bloomIntensity: 0.85,
        bloomThreshold: 0.45,
        brightness: 0.9,
      })

      fluid.start()

      // Tạo đợt bùng nổ khói dạ quang ban đầu khi vào trang
      setTimeout(() => {
        try {
          fluid.multipleSplats(3)
        } catch (e) {}
      }, 350)
    } catch (err) {
      console.warn('WebGL Fluid initialization skipped:', err)
      return
    }

    // Do container nằm ở background với pointer-events-none,
    // ta lắng nghe sự kiện trên window và chuyển tiếp trực tiếp vào canvas
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

    const forwardPointerDown = (e) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
      })
      Object.defineProperty(mouseEvent, 'offsetX', { value: e.clientX - rect.left })
      Object.defineProperty(mouseEvent, 'offsetY', { value: e.clientY - rect.top })
      canvas.dispatchEvent(mouseEvent)
    }

    // Khi cuộn trang nhanh, kích thích tạo thêm vệt khói xoáy cực quang
    let lastScrollY = window.scrollY
    let scrollThrottle = 0
    const handleScroll = () => {
      const now = performance.now()
      if (now - scrollThrottle < 180) return
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      if (delta > 50 && fluid) {
        scrollThrottle = now
        const x = window.innerWidth * (0.25 + Math.random() * 0.5)
        const y = window.innerHeight * (0.2 + Math.random() * 0.6)
        fluid.splatAtLocation(x, y, (Math.random() - 0.5) * 600, -delta * 4.5)
      }
    }

    window.addEventListener('pointermove', forwardPointerMove, { passive: true })
    window.addEventListener('pointerdown', forwardPointerDown, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', forwardPointerMove)
      window.removeEventListener('pointerdown', forwardPointerDown)
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
