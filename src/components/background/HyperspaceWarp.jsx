import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const STAR_COUNT = 750
const FOV = 320
const BASE_SPEED = 0.6
const MAX_WARP_SPEED = 18

// Bảng màu sao lượng tử: Electric Blue, Purple, Cyber Cyan
const STAR_COLORS = ['#4F7CFF', '#8B5CF6', '#22D3EE', '#FFFFFF']

export function HyperspaceWarp() {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let cx = width / 2
    let cy = height / 2

    // Khởi tạo các hạt sao trong không gian 3D
    const stars = []
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 3,
        y: (Math.random() - 0.5) * height * 3,
        z: Math.random() * 1000 + 1,
        prevZ: 1000,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        size: Math.random() * 1.5 + 0.8,
      })
    }

    // Theo dõi tốc độ cuộn trang (Scroll velocity) để kích hoạt hiệu ứng Warp
    let currentSpeed = BASE_SPEED
    let targetSpeed = BASE_SPEED
    let lastScrollY = window.scrollY
    let scrollTimeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      lastScrollY = currentScrollY

      // Tăng tốc độ bay tỷ lệ thuận với tốc độ cuộn chuột
      targetSpeed = Math.min(BASE_SPEED + delta * 0.45, MAX_WARP_SPEED)

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        targetSpeed = BASE_SPEED
      }, 120)
    }

    // Góc nghiêng camera nhẹ theo vị trí chuột (Parallax tilt)
    let mouseOffsetX = 0
    let mouseOffsetY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - cx) * 0.15
      targetMouseY = (e.clientY - cy) * 0.15
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      cx = width / 2
      cy = height / 2
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    // Vòng lặp render hiệu ứng
    let lastTime = performance.now()

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      // Nội suy tốc độ bay và góc camera mượt mà (Lerp)
      currentSpeed += (targetSpeed - currentSpeed) * 0.1
      mouseOffsetX += (targetMouseX - mouseOffsetX) * 0.05
      mouseOffsetY += (targetMouseY - mouseOffsetY) * 0.05

      // Xóa canvas trong suốt để lộ hình nền nghệ thuật cao cấp bên dưới
      ctx.clearRect(0, 0, width, height)

      const isWarping = currentSpeed > BASE_SPEED * 2.5
      const actualCx = cx + mouseOffsetX
      const actualCy = cy + mouseOffsetY

      for (let i = 0; i < STAR_COUNT; i++) {
        const star = stars[i]
        star.prevZ = star.z
        star.z -= currentSpeed * 2.5

        // Nếu sao bay vượt qua camera, tái tạo ở phía xa
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 3
          star.y = (Math.random() - 0.5) * height * 3
          star.z = 1000
          star.prevZ = 1000
        }

        // Phép chiếu phối cảnh 3D ra màn hình 2D
        const k = FOV / star.z
        const px = star.x * k + actualCx
        const py = star.y * k + actualCy

        // Nếu nằm ngoài khung nhìn, bỏ qua
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) continue

        // Tính độ mờ theo khoảng cách (sao ở xa thì mờ, lại gần thì sáng rực)
        const alpha = Math.min(1, Math.max(0.1, 1 - star.z / 1000))

        if (isWarping) {
          // HIỆU ỨNG WARP STREAK (KÉO VỆT SÁNG SIÊU TỐC)
          const prevK = FOV / star.prevZ
          const prevPx = star.x * prevK + actualCx
          const prevPy = star.y * prevK + actualCy

          ctx.beginPath()
          ctx.moveTo(prevPx, prevPy)
          ctx.lineTo(px, py)

          ctx.strokeStyle = star.color
          ctx.globalAlpha = alpha * 0.85
          ctx.lineWidth = Math.min(star.size * (FOV / star.z) * 0.8, 3.5)
          ctx.stroke()
        } else {
          // HẠT SAO LƠ LỬNG TRONG VŨ TRỤ KHI ĐỨNG YÊN
          const radius = Math.max(0.5, star.size * k * 0.3)
          ctx.beginPath()
          ctx.arc(px, py, radius, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.globalAlpha = alpha * 0.75
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  )
}
