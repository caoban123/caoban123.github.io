import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GraduationCap, Award, BookOpen, CheckCircle, ExternalLink, Sparkles } from 'lucide-react'
import { site } from '../../data/site'
import { soundFx } from '../../lib/sound'

const TABS = [
  { id: 'all', label: 'Tổng quan' },
  { id: 'gpa', label: 'Học tập tại HCMUS' },
  { id: 'toeic', label: 'Ngoại ngữ TOEIC' },
  { id: 'awards', label: 'Thành tích & Cuộc thi' },
]

export function AcademicModal({ isOpen, onClose, initialTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        soundFx.playClick()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop mờ tối */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundFx.playClick()
              onClose()
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0c0c14]/95 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-accent-cyan/20 text-amber-300 ring-1 ring-white/10">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    Hồ Sơ Năng Lực Học Thuật
                    <Sparkles className="h-4 w-4 text-accent-cyan" />
                  </h3>
                  <p className="font-mono text-xs text-zinc-400">Trường ĐH Khoa học Tự nhiên — ĐHQG-HCM (HCMUS)</p>
                </div>
              </div>

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

            {/* Tab Navigation */}
            <div className="flex border-b border-white/[0.06] bg-black/30 px-6 pt-2">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick()
                      setActiveTab(tab.id)
                    }}
                    className={`relative px-4 py-2.5 font-mono text-xs font-semibold transition-colors ${
                      activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="modalTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple"
                      />
                    )}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
              {/* Thẻ Điểm GPA */}
              {(activeTab === 'all' || activeTab === 'gpa') && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                      <GraduationCap className="h-4 w-4" /> KẾT QUẢ HỌC TẬP CHÍNH KHÓA
                    </span>
                    <span className="rounded-full bg-amber-500/20 px-3 py-0.5 font-mono text-xs font-bold text-amber-300">
                      Xuất Sắc
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold text-white">3.88</span>
                    <span className="font-mono text-lg text-zinc-400">/ 4.0</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    Chuyên ngành Trí tuệ Nhân tạo tại HCMUS. Nắm vững nền tảng Toán học (Đại số tuyến tính, Xác suất thống kê, Giải tích tối ưu) và Khoa học Máy tính cốt lõi.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400 sm:grid-cols-3">
                    <div className="rounded-lg border border-white/5 bg-black/40 p-2 text-center">
                      <div className="text-[10px] text-zinc-500">Machine Learning</div>
                      <div className="font-bold text-emerald-400">Điểm A+</div>
                    </div>
                    <div className="rounded-lg border border-white/5 bg-black/40 p-2 text-center">
                      <div className="text-[10px] text-zinc-500">Deep Learning</div>
                      <div className="font-bold text-emerald-400">Điểm A+</div>
                    </div>
                    <div className="rounded-lg border border-white/5 bg-black/40 p-2 text-center">
                      <div className="text-[10px] text-zinc-500">Computer Vision</div>
                      <div className="font-bold text-emerald-400">Điểm A+</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Thẻ Chứng chỉ TOEIC */}
              {(activeTab === 'all' || activeTab === 'toeic') && (
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                      <Award className="h-4 w-4" /> CHỨNG CHỈ TIẾNG ANH QUỐC TẾ
                    </span>
                    <span className="rounded-full bg-cyan-500/20 px-3 py-0.5 font-mono text-xs font-bold text-cyan-300">
                      C1 Working Proficiency
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold text-white">900+</span>
                    <span className="font-mono text-lg text-zinc-400">/ 990 TOEIC</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-cyan-400" />
                      <span>Đọc hiểu trôi chảy các bài báo khoa học từ NeurIPS, CVPR, ICLR, ICML.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-cyan-400" />
                      <span>Viết tài liệu kỹ thuật, báo cáo nghiên cứu và trao đổi chuyên môn hoàn toàn bằng Tiếng Anh.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-cyan-400" />
                      <span>Thành thạo giao tiếp và làm việc trong môi trường đa quốc gia.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Thẻ Cuộc thi & Nghiên cứu */}
              {(activeTab === 'all' || activeTab === 'awards') && (
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-300">
                      <BookOpen className="h-4 w-4" /> CUỘC THI &amp; CÔNG TRÌNH NGHIÊN CỨU
                    </span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="font-bold text-white text-sm">2026 Global AI Agent Competition — Track A</div>
                      <div className="text-zinc-400 mt-1">Dự án <em>HCMUS Smart Campus</em> trên nền tảng Wesome AI: Kiến trúc phân cấp 14+ Agent phục vụ trường học.</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="font-bold text-white text-sm">AI Challenge (AIC) — Multi-modal Video Retrieval</div>
                      <div className="text-zinc-400 mt-1">Hệ thống truy xuất video quy mô lớn kết hợp CLIP, FAISS, BM25 và Gemini VLM với 439 bài kiểm thử tự động.</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                      <div className="font-bold text-white text-sm">Nghiên cứu mô hình Rectified Flow trong Video Editing</div>
                      <div className="text-zinc-400 mt-1">Kiểm soát thích ứng không - thời gian để bảo toàn background và chuyển động mượt mà.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.08] bg-white/[0.02] px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500">Cập nhật: Năm học 2025–2026</span>
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
    </AnimatePresence>
  )
}
