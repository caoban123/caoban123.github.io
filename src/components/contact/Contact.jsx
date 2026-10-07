import React, { useState } from 'react'
import { Mail, Github, Linkedin, Facebook, ArrowUpRight, Send, CheckCircle2, Sparkles } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { site } from '../../data/site'
import { soundFx } from '../../lib/sound'

const TOPICS = [
  'Hợp tác dự án AI / RAG',
  'Cơ hội việc làm / Phỏng vấn',
  'Trao đổi nghiên cứu học thuật',
  'Khác',
]

export function Contact() {
  const primaryHref = site.email ? `mailto:${site.email}` : site.github
  const PrimaryIcon = site.email ? Mail : Github

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: TOPICS[0],
    message: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }

    soundFx.playClick()
    setStatus('sending')

    // Giả lập gửi tin nhắn an toàn, kèm link fallback mở mail client
    setTimeout(() => {
      setStatus('sent')
      soundFx.playSuccess()
    }, 1200)
  }

  const handleOpenMailClient = () => {
    soundFx.playClick()
    const subject = encodeURIComponent(`[Portfolio] ${formData.topic} từ ${formData.name}`)
    const body = encodeURIComponent(
      `Họ và tên: ${formData.name}\nEmail: ${formData.email}\nChủ đề: ${formData.topic}\n\nNội dung:\n${formData.message}`
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden py-32">
      {/* Vùng sáng ambient chuyển động mờ */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full bg-gradient-to-tr from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 font-semibold">
            BẠN CÓ Ý TƯỞNG HỢP TÁC?
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mx-auto mb-6 mt-6 font-display text-5xl font-black uppercase leading-[1.12] tracking-tight text-white sm:text-7xl lg:text-9xl">
            HÃY CÙNG <br />
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
              XÂY DỰNG.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mb-14 max-w-xl text-base text-zinc-400 leading-relaxed sm:text-lg">
            Dù bạn muốn trao đổi về nghiên cứu video generative, các giải pháp RAG chuyên sâu, hay cơ hội hợp tác phát triển hệ thống AI, hãy để lại lời nhắn ngay bên dưới.
          </p>
        </Reveal>

        {/* Form gửi tin nhắn nhanh trực tiếp */}
        <Reveal delay={0.2} className="mx-auto mb-16 max-w-2xl text-left">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-zinc-950/70 p-6 backdrop-blur-xl sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Gửi tin nhắn trực tiếp
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-500">Phản hồi trong 24h</span>
            </div>

            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Tin nhắn đã sẵn sàng!</h3>
                <p className="mt-2 max-w-md text-sm text-zinc-400">
                  Cảm ơn <span className="font-semibold text-white">{formData.name}</span>. Bạn có thể mở email để gửi ngay bản sao trực tiếp đến hộp thư của Bản:
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleOpenMailClient}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2.5 font-mono text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
                  >
                    <Mail className="h-4 w-4" /> Mở Email Client để gửi ngay
                  </button>
                  <button
                    onClick={() => {
                      setStatus('idle')
                      setFormData({ name: '', email: '', topic: TOPICS[0], message: '' })
                    }}
                    className="rounded-full border border-white/10 px-5 py-2.5 font-mono text-xs text-zinc-400 hover:text-white"
                  >
                    Gửi lời nhắn khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-xs text-zinc-400">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all focus:border-accent-cyan focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs text-zinc-400">Email liên hệ *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all focus:border-accent-cyan focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs text-zinc-400">Chủ đề quan tâm</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white transition-all focus:border-accent-cyan focus:outline-none"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t} className="bg-zinc-900 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-mono text-xs text-zinc-400">Lời nhắn chi tiết *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Mô tả dự án, yêu cầu kỹ thuật hoặc thông tin công việc..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all focus:border-accent-cyan focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[11px] text-zinc-500">
                    Bảo mật thông tin 100%
                  </span>
                  <Magnetic strength={0.2}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan px-7 py-3 font-mono text-xs font-bold text-white shadow-[0_0_25px_rgba(79,124,255,0.4)] transition-all hover:scale-105 disabled:opacity-50"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Đang xử lý...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Gửi tin nhắn</span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* Nút hành động chính hình tròn phong cách Quantum Orb cao cấp */}
        <Reveal delay={0.25}>
          <div className="mb-14 flex justify-center">
            <Magnetic strength={0.4}>
              <a
                href={primaryHref}
                target={site.email ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="group relative flex h-44 w-44 flex-col items-center justify-center overflow-hidden rounded-full p-[2px] shadow-[0_0_50px_rgba(79,124,255,0.3)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(34,211,238,0.5)] sm:h-52 sm:w-52"
              >
                {/* Viền gradient xoay 360 độ */}
                <span className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#4F7CFF,#8B5CF6,#22D3EE,#10B981,#4F7CFF)] opacity-80 group-hover:opacity-100" />

                {/* Mặt kính lõi trong suốt đậm chất công nghệ */}
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-full bg-zinc-950/90 px-4 text-center backdrop-blur-2xl transition-colors duration-500 group-hover:bg-zinc-900/80">
                  {/* Hào quang trung tâm */}
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(79,124,255,0.25),transparent_70%)]" />

                  {/* Icon nổi bật */}
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform duration-500 group-hover:scale-110">
                    <PrimaryIcon className="h-5 w-5" />
                  </div>

                  {/* Chữ hiển thị */}
                  <div className="relative">
                    <span className="flex items-center justify-center gap-1 font-display text-xs font-bold tracking-wider text-white uppercase sm:text-sm">
                      KẾT NỐI TRỰC TIẾP
                      <ArrowUpRight className="h-4 w-4 text-accent-cyan transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-zinc-400 group-hover:text-zinc-200">
                      {site.email}
                    </span>
                  </div>
                </div>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Danh sách nút mạng xã hội đầy đủ: GitHub, LinkedIn, Facebook, Email */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>

            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}

            {site.facebook && (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            )}

            {site.email && (
              <a
                href={`mailto:${site.email}`}
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2.5 normal-case text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
