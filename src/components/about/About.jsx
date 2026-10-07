import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Github, MapPin, Sparkles } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { BentoCard } from '../ui/BentoCard'
import { site } from '../../data/site'
import { researchData } from '../../data/research'

const focusAreas = ['AI / ML', 'RAG & LLM', 'Computer Vision', 'AI Research']

// Minh chứng thực tế từ các bài toán đã thực hiện
const proof = [
  'Xây dựng hệ thống truy xuất thông minh kết hợp Qdrant và Gemini.',
  'Triển khai tracking đối tượng thời gian thực với YOLO và ByteTrack.',
  'Nghiên cứu kiểm soát thích ứng không - thời gian trong Rectified Flow video editing.',
]

// 3 ảnh phong cách sống & khoảnh khắc đời thường hiển thị ở cùng 1 dòng
const moments = [
  {
    src: `${import.meta.env.BASE_URL}images/photo-1.png`,
    tag: 'EXPLORE // 01',
    category: 'Ngoại cảnh',
    location: 'Đà Lạt, Lâm Đồng',
    title: 'Cảm Hứng Thiên Nhiên',
    caption: 'Những chuyến đi trải nghiệm giúp tái tạo năng lượng và góc nhìn đa chiều.',
  },
  {
    src: `${import.meta.env.BASE_URL}images/photo-2.png`,
    tag: 'LIFESTYLE // 02',
    category: 'Đời thường',
    location: 'TP. Hồ Chí Minh',
    title: 'Chân Dung Thường Nhật',
    caption: 'Nhiệt huyết công nghệ, tư duy cởi mở và tinh thần kiên trì theo đuổi AI.',
  },
  {
    src: `${import.meta.env.BASE_URL}images/photo-3.jpg`,
    tag: 'COMPANION // 03',
    category: 'Mèo cưng',
    location: 'Góc làm việc',
    title: 'Bạn Đồng Hành 4 Chân',
    caption: 'Điểm tựa bình yên và niềm vui giản dị giúp cân bằng cuộc sống sau giờ code.',
  },
]

function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: site.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
}

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_#4F7CFF]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-blue">
              01 // GIỚI THIỆU
            </span>
          </div>
        </Reveal>

        {/* Bento Grid Giới Thiệu Cốt Lõi */}
        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {/* Tuyên ngôn cốt lõi */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <BentoCard className="p-8 sm:p-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-5xl">
                  Tôi là một AI developer đam mê xây dựng các hệ thống nơi{' '}
                  <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                    Machine Learning gắn liền với phần mềm thực tế.
                  </span>
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                  Định hướng chuyên sâu về Trí tuệ Nhân tạo tại <span className="text-white font-medium">HCMUS</span>, tôi làm việc xoay quanh các hệ thống AI, nghiên cứu mô hình sinh và kỹ thuật phần mềm thực chiến — biến các mô hình lý thuyết thành sản phẩm ứng dụng thực tế.
                </p>
              </div>
            </BentoCard>
          </Reveal>

          {/* Địa điểm & Giờ thực tế */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 text-accent-cyan" /> Nơi làm việc
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-white">{site.location}</div>
                  <div className="mt-1 font-mono text-sm text-accent-cyan tabular-nums">
                    {LocalTime()} <span className="text-zinc-500">GMT+7</span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Chủ đề đang nghiên cứu */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-purple opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-purple" />
                  </span>
                  Chủ đề đang nghiên cứu
                </div>
                <div className="font-display text-lg font-bold leading-snug text-white">
                  {researchData.primaryTopic}
                </div>
              </div>
            </BentoCard>
          </Reveal>

          {/* Lĩnh vực trọng tâm */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Lĩnh vực trọng tâm
              </div>
              <ul className="space-y-2">
                {focusAreas.map((f, i) => (
                  <li key={f} className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-sm text-zinc-200 last:border-0">
                    <span className="font-medium">{f}</span>
                    <span className="font-mono text-[11px] text-zinc-600">0{i + 1}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* Minh chứng > Lời nói */}
          <Reveal className="md:col-span-2" delay={0.16}>
            <BentoCard className="p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Minh chứng &gt; Lời nói
              </div>
              <ul className="space-y-3">
                {proof.map((p) => (
                  <li key={p} className="flex gap-2 text-sm leading-snug text-zinc-300">
                    <span className="mt-0.5 font-mono text-accent-cyan">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>

          {/* GitHub Repo link */}
          <Reveal className="md:col-span-2" delay={0.24}>
            <BentoCard as="a" href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="block p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Github className="h-6 w-6 text-white" />
                  <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-cyan" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">Mã nguồn &amp; Thử nghiệm</div>
                  <div className="mt-1 font-display text-xl font-bold text-white">@caoban123</div>
                </div>
              </div>
            </BentoCard>
          </Reveal>
        </div>

        {/* Khoảnh khắc & Bản sắc cá nhân — 3 Ảnh ở cùng 1 dòng trên Desktop */}
        <div className="mt-14">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_#8B5CF6]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-purple">
                  KHOẢNH KHẮC &amp; ĐỜI THƯỜNG // BEYOND THE SCREEN
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
                <span>3 KHOẢNH KHẮC • 1 BẢN SẮC</span>
              </div>
            </div>
          </Reveal>

          {/* Hàng 3 ảnh ở cùng 1 dòng */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {moments.map((item, idx) => (
              <Reveal key={item.tag} delay={idx * 0.12}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-2 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-accent-blue/50 hover:shadow-[0_20px_40px_rgba(79,124,255,0.25)]">
                  {/* Khung ảnh tỷ lệ dọc hoàn hảo 4:5 */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-900">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient tối chân ảnh để chữ nổi bật */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-75" />

                    {/* Tag công nghệ góc trên bên trái */}
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-md">
                        <span className="h-1 w-1 rounded-full bg-accent-cyan" />
                        {item.tag}
                      </span>
                    </div>

                    {/* Badge thể loại góc trên bên phải */}
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full border border-accent-purple/30 bg-accent-purple/20 px-2.5 py-0.5 font-mono text-[10px] text-accent-purple backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Chân ảnh: Tiêu đề và chú thích nghệ thuật */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-accent-cyan/90">
                        {item.location}
                      </div>
                      <h3 className="mt-1 font-display text-lg font-bold text-white transition-colors duration-300 group-hover:text-accent-cyan">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-300/90">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
