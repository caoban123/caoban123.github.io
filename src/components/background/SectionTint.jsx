import React, { useEffect, useState } from 'react'

// Mỗi phân mục có một tông màu riêng; lớp phủ sẽ chuyển mượt khi cuộn qua
const tints = {
  home: 'rgba(79,124,255,0.10)', // xanh dương
  about: 'rgba(99,102,241,0.10)', // chàm
  projects: 'rgba(139,92,246,0.11)', // tím
  research: 'rgba(168,85,247,0.10)', // tím hồng
  skills: 'rgba(34,211,238,0.09)', // xanh ngọc
  experience: 'rgba(45,212,191,0.08)', // ngọc lục
  contact: 'rgba(79,124,255,0.10)', // quay về xanh dương
}
const ids = Object.keys(tints)

export function SectionTint() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    // Chỉ coi phân mục nằm ở dải giữa màn hình là "đang xem"
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      {ids.map((id) => (
        <div
          key={id}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{
            opacity: active === id ? 1 : 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 35%, ${tints[id]}, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 90%, ${tints[id]}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}
