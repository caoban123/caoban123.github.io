import React from 'react'
import { Github, Mail, Linkedin, Facebook, Rss } from 'lucide-react'
import { site } from '../../data/site'
import { soundFx } from '../../lib/sound'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: site.github,
      title: 'GitHub @caoban123',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${site.email}`,
      title: `Email ${site.email}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: site.linkedin,
      title: 'LinkedIn Nguyễn Cao Bản',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: site.facebook,
      title: 'Facebook cá nhân',
    },
    {
      name: 'CV / RSS',
      icon: Rss,
      href: `${import.meta.env.BASE_URL}Nguyen_Cao_Ban_CV.pdf`,
      title: 'Hồ sơ năng lực & CV PDF',
    },
  ]

  return (
    <footer id="contact" className="relative z-10 border-t border-white/[0.08] bg-[#050508]/90 py-7 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        {/* Bản quyền & Tên tác giả — Chuẩn giao diện Ảnh 2 */}
        <div className="font-mono text-xs text-zinc-400 sm:text-sm">
          <span>© {currentYear} All rights reserved. | Built by </span>
          <a
            href="#home"
            onClick={() => soundFx.playClick()}
            className="font-medium text-white underline underline-offset-4 decoration-zinc-600 transition-colors hover:decoration-accent-cyan hover:text-accent-cyan"
          >
            Nguyen Cao Ban!
          </a>
        </div>

        {/* Cụm 5 nút icon viền bo góc — Chuẩn giao diện Ảnh 2 */}
        <div className="flex items-center gap-2.5">
          {socialLinks.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-accent-cyan/60 hover:bg-white/[0.08] hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
