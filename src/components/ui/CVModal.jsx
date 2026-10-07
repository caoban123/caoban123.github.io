import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Mail,
  Phone,
  Linkedin,
  Github,
  BookOpen,
  Award,
  Layers,
  Cpu,
} from 'lucide-react'
import { site } from '../../data/site'
import { soundFx } from '../../lib/sound'

const TABS = [
  { id: 'full', label: 'Toàn văn CV' },
  { id: 'education', label: 'Học vấn & Môn học' },
  { id: 'projects', label: 'Dự án thực chiến' },
  { id: 'skills', label: 'Kỹ năng công nghệ' },
]

export function CVModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('full')
  const pdfUrl = `${import.meta.env.BASE_URL}Nguyen_Cao_Ban_CV.pdf`

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundFx.playClick()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Khóa cuộn trang nền và tạm dừng Lenis
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (window.__lenis) {
      window.__lenis.stop()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
      if (window.__lenis) {
        window.__lenis.start()
      }
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundFx.playClick()
              onClose()
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0c0c14]/95 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            {/* Header Modal */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-6 py-4 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-cyan font-bold">
                      HỒ SƠ NĂNG LỰC &amp; CV CHÍNH THỨC
                    </span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.2 font-mono text-[10px] text-emerald-400">
                      HCMUS • AI
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    Nguyễn Cao Bản
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download="Nguyen_Cao_Ban_CV.pdf"
                  onClick={() => soundFx.playClick()}
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent-blue/40 bg-accent-blue/15 px-3.5 py-1.5 font-mono text-xs font-semibold text-accent-blue transition-all hover:bg-accent-blue/25 hover:border-accent-blue hover:scale-105"
                  title="Tải tệp CV PDF gốc về máy"
                >
                  <Download className="h-3.5 w-3.5" /> Tải PDF ⤓
                </a>

                <button
                  onClick={() => {
                    soundFx.playClick()
                    onClose()
                  }}
                  className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
                  aria-label="Đóng"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thanh điều hướng tab */}
            <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-white/[0.06] bg-black/40 px-6 py-2.5">
              {TABS.map((tab) => {
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick()
                      setActiveTab(tab.id)
                    }}
                    className={`rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-md'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Scrollable Body - Cuộn độc lập 100% bên trong */}
            <div
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-6 text-sm [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Thẻ thông tin liên hệ đầu trang */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
                    <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-accent-cyan">
                      <Phone className="h-3.5 w-3.5 text-accent-cyan" /> {site.phone}
                    </a>
                    <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-accent-blue">
                      <Mail className="h-3.5 w-3.5 text-accent-blue" /> {site.email}
                    </a>
                    <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent-purple">
                      <Linkedin className="h-3.5 w-3.5 text-accent-purple" /> linkedin.com/in/caoban123
                    </a>
                    <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white">
                      <Github className="h-3.5 w-3.5 text-zinc-400" /> github.com/caoban123
                    </a>
                  </div>
                </div>
              </div>

              {/* TAB: HỌC VẤN HOẶC TOÀN VĂN */}
              {(activeTab === 'full' || activeTab === 'education') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-cyan">
                    <GraduationCap className="h-4 w-4" /> 01 // HỌC VẤN (EDUCATION)
                  </div>
                  <div className="rounded-2xl border border-white/[0.07] bg-black/40 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display text-base font-bold text-white sm:text-lg">
                          Ho Chi Minh City University of Science (HCMUS)
                        </h4>
                        <p className="mt-0.5 text-xs text-accent-purple font-medium">
                          Bachelor of Science in Artificial Intelligence
                        </p>
                      </div>
                      <div className="text-right font-mono text-xs text-zinc-400">
                        <div>TP. Hồ Chí Minh, Việt Nam</div>
                        <div className="text-emerald-400 font-semibold">09/2024 – Hiện tại</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-bold text-amber-300">
                        GPA: 3.7 / 4.0
                      </div>
                      <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-bold text-cyan-300">
                        TOEIC: 900+
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/[0.05] pt-3">
                      <span className="font-mono text-xs font-semibold text-zinc-400">
                        Các môn học nền tảng &amp; chuyên ngành tiêu biểu (Relevant Coursework):
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-xs">
                        {[
                          'Data Structures & Algorithms',
                          'Linear Algebra',
                          'Probability & Statistics',
                          'Machine Learning',
                          'Database Systems',
                          'Computer Architecture',
                        ].map((course) => (
                          <span
                            key={course}
                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300"
                          >
                            ✓ {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DỰ ÁN THỰC CHIẾN HOẶC TOÀN VĂN */}
              {(activeTab === 'full' || activeTab === 'projects') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-blue">
                    <Briefcase className="h-4 w-4" /> 02 // DỰ ÁN TRỌNG TÂM TRONG CV (PROJECTS)
                  </div>

                  {/* 1. AI Story Adventure */}
                  <div className="rounded-2xl border border-white/[0.07] bg-black/40 p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-white">
                        AI Story Adventure
                      </h4>
                      <a
                        href="https://github.com/caoban123/aistoryadventure"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-accent-cyan hover:underline"
                      >
                        github.com/caoban123/aistoryadventure <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-cyan mt-0.5">▹</span>
                        <span>Xây dựng ứng dụng RPG toàn diện (Full-stack GenAI web app) bằng FastAPI, Vanilla JavaScript, Firebase Authentication và cơ sở dữ liệu bộ nhớ vector.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-cyan mt-0.5">▹</span>
                        <span>Triển khai pipeline truy xuất ngữ nghĩa (RAG Semantic Memory) với Qdrant / ChromaDB để truy xuất quyết định trước đó của người chơi, duy trì tính nhất quán cốt truyện đường dài qua các context window của LLM.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-cyan mt-0.5">▹</span>
                        <span>Thiết kế engine chiến đấu RPG tất định (Deterministic RPG engine) trong Python để tính toán sát thương, logic hòm đồ, nhiệm vụ và quản lý tổ đội; dành riêng LLM cho việc sinh văn phong dẫn truyện.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-cyan mt-0.5">▹</span>
                        <span>Triển khai hệ thống bằng Docker, Coolify, WSL và Cloudflare Tunnel, tách biệt độc lập các dịch vụ frontend và backend qua domain tùy chỉnh.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 2. Detect-Football */}
                  <div className="rounded-2xl border border-white/[0.07] bg-black/40 p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-white">
                        Detect-Football
                      </h4>
                      <a
                        href="https://github.com/caoban123/Detect-Football"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-accent-cyan hover:underline"
                      >
                        github.com/caoban123/Detect-Football <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-blue mt-0.5">▹</span>
                        <span>Xây dựng pipeline thị giác máy tính phân tích trận đấu bóng đá sử dụng YOLO, ByteTrack, OpenCV và Supervision.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-blue mt-0.5">▹</span>
                        <span>Tích hợp weights phát hiện đối tượng tối ưu để định vị cầu thủ, trọng tài, thủ môn và quả bóng kèm cơ chế cache nhận diện để tránh các bước inference dư thừa.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-blue mt-0.5">▹</span>
                        <span>Tự động phân chia đội bóng qua SigLIP jersey embeddings, giảm chiều UMAP và thuật toán phân cụm KMeans.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-blue mt-0.5">▹</span>
                        <span>Ước lượng thời lượng kiểm soát bóng (Ball Possession) dựa trên liên kết khoảng cách cầu thủ - bóng kèm cơ chế trễ (hysteresis); xuất video trực quan và số liệu thống kê JSON có cấu trúc.</span>
                      </li>
                    </ul>
                  </div>

                  {/* 3. ThunderRetrieve */}
                  <div className="rounded-2xl border border-white/[0.07] bg-black/40 p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-white">
                        ThunderRetrieve (AI Challenge 2026 Video Retrieval Panel)
                      </h4>
                      <a
                        href="https://github.com/caoban123/AI-Challenge-2026-Video-Retrieval-Panel"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-accent-cyan hover:underline"
                      >
                        github.com/caoban123/AI-Challenge-2026-Video-Retrieval-Panel <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-purple mt-0.5">▹</span>
                        <span>Phát triển hệ thống truy xuất video đa phương thức cho cuộc thi AI Challenge 2026, hỗ trợ tìm kiếm bằng ngôn ngữ tự nhiên trên kho video quy mô lớn.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-purple mt-0.5">▹</span>
                        <span>Xây dựng pipeline tìm kiếm kết hợp (Hybrid Retrieval): tìm kiếm thị giác dày CLIP ViT-B/32, tìm kiếm văn bản thưa BM25 và thuật toán Reciprocal Rank Fusion (RRF) để tái xếp hạng ứng viên.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-purple mt-0.5">▹</span>
                        <span>Thiết kế kiến trúc lập chỉ mục dạng adapter hỗ trợ cả FAISS IndexFlatIP chạy cục bộ và cơ sở dữ liệu vector Qdrant đám mây với khả năng hot-swap linh hoạt.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-purple mt-0.5">▹</span>
                        <span>Phát triển backend FastAPI và giao diện React/Tailwind trực quan phục vụ tra cứu tức thì, kiểm tra kết quả và nộp bằng chứng trắc nghiệm.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB: KỸ NĂNG CHUYÊN MÔN HOẶC TOÀN VĂN */}
              {(activeTab === 'full' || activeTab === 'skills') && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 font-mono text-xs font-bold uppercase tracking-wider text-accent-purple">
                    <Code2 className="h-4 w-4" /> 03 // BẢNG KỸ NĂNG CÔNG NGHỆ (TECHNICAL SKILLS)
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Languages */}
                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-4">
                      <div className="font-mono text-xs font-bold text-accent-cyan mb-2">Ngôn ngữ lập trình (Languages)</div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs text-zinc-300">
                        {['Python', 'C/C++', 'SQL', 'JavaScript', 'R'].map((s) => (
                          <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI / ML */}
                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-4">
                      <div className="font-mono text-xs font-bold text-accent-blue mb-2">Machine Learning &amp; AI Core</div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs text-zinc-300">
                        {['PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Optuna', 'Linear Regression', 'Gradient Descent', 'KMeans', 'PCA'].map((s) => (
                          <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* LLM & RAG */}
                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-4">
                      <div className="font-mono text-xs font-bold text-accent-purple mb-2">LLM &amp; RAG Systems</div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs text-zinc-300">
                        {['LangChain', 'LangGraph', 'Transformers', 'Hugging Face', 'Prompt Engineering', 'RAG', 'CRAG', 'BM25', 'RRF', 'FAISS', 'ChromaDB', 'Qdrant', 'bge-m3', 'BGE-Reranker', 'Gemini API', 'OpenAI API'].map((s) => (
                          <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Computer Vision */}
                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-4">
                      <div className="font-mono text-xs font-bold text-emerald-400 mb-2">Computer Vision &amp; Tracking</div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs text-zinc-300">
                        {['OpenCV', 'YOLO', 'Ultralytics', 'ByteTrack', 'Supervision', 'ResNet-50', 'CLIP', 'SigLIP', 'PhoWhisper', 'UMAP'].map((s) => (
                          <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Backend / Web */}
                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-4">
                      <div className="font-mono text-xs font-bold text-amber-400 mb-2">Backend &amp; Web Development</div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs text-zinc-300">
                        {['FastAPI', 'REST APIs', 'Firebase', 'SQLite', 'Pydantic', 'React', 'Vite', 'Tailwind CSS', 'HTML/CSS'].map((s) => (
                          <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* DevOps & Tools */}
                    <div className="rounded-xl border border-white/[0.07] bg-black/40 p-4">
                      <div className="font-mono text-xs font-bold text-rose-400 mb-2">DevOps, Cloud &amp; Tools</div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs text-zinc-300">
                        {['Git', 'GitHub', 'Docker', 'Coolify', 'Cloudflare Tunnel', 'WSL', 'VS Code', 'Jupyter Notebook', 'TensorBoard'].map((s) => (
                          <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="shrink-0 border-t border-white/[0.08] bg-white/[0.02] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <a
                  href={pdfUrl}
                  download="Nguyen_Cao_Ban_CV.pdf"
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-blue px-5 py-2 font-mono text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  <Download className="h-4 w-4" /> Tải bản PDF chính thức (.pdf)
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Mở trong tab mới ↗
                </a>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick()
                  onClose()
                }}
                className="rounded-full bg-white/10 px-5 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
