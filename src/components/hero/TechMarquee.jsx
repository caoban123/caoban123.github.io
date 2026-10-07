import React from 'react'
import { soundFx } from '../../lib/sound'

const techList = [
  { name: 'Python', role: 'Ngôn ngữ cốt lõi', color: '#3776AB', icon: '🐍' },
  { name: 'PyTorch', role: 'Deep Learning', color: '#EE4C2C', icon: '🔥' },
  { name: 'Hugging Face', role: 'Transformers / Models', color: '#FFD21E', icon: '🤗' },
  { name: 'Gemini API', role: 'Multimodal LLM', color: '#4F7CFF', icon: '✨' },
  { name: 'LangChain', role: 'LLM Orchestration', color: '#1C3C3C', icon: '🦜' },
  { name: 'Qdrant', role: 'Vector Search DB', color: '#DC2626', icon: '⚡' },
  { name: 'OpenCV', role: 'Computer Vision', color: '#5C3EE8', icon: '👁️' },
  { name: 'YOLOv8 / 11', role: 'Object Detection', color: '#00FFFF', icon: '🎯' },
  { name: 'FastAPI', role: 'High-perf Async API', color: '#059669', icon: '🚀' },
  { name: 'Docker', role: 'Containerization', color: '#2496ED', icon: '🐳' },
  { name: 'Git & GitHub', role: 'Version Control & CI', color: '#F05032', icon: '🐙' },
  { name: 'React', role: 'Modern UI Engine', color: '#61DAFB', icon: '⚛️' },
]

export function TechMarquee() {
  const doubled = [...techList, ...techList]

  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-white/[0.06] bg-black/40 py-6 backdrop-blur-md">
      {/* Label nhỏ phía trên */}
      <div className="mb-4 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
        <span className="h-1 w-1 rounded-full bg-accent-cyan animate-ping" />
        <span>HỆ SINH THÁI CÔNG NGHỆ &amp; CÔNG CỤ THỰC CHIẾN</span>
      </div>

      {/* Marquee track */}
      <div className="marquee relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track flex shrink-0 items-center gap-4">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(79,124,255,0.2)]"
            >
              <span className="text-xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{tech.icon}</span>
              <div className="text-left">
                <div className="font-mono text-xs font-bold text-zinc-200 transition-colors group-hover:text-white">
                  {tech.name}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 transition-colors group-hover:text-accent-cyan">
                  {tech.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
