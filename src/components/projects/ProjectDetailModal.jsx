import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Cpu, Database, Network, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react'
import { soundFx } from '../../lib/sound'

// Dữ liệu phân tích kỹ thuật chuyên sâu cho từng dự án
const PROJECT_DEEP_DIVES = {
  1: { // HCMUS Smart Campus
    architecture: [
      { step: '01. Campus Router', desc: 'Phân tích Intent của sinh viên bằng LLM & điều hướng vào Sub-space tương ứng.' },
      { step: '02. 5 Sub-Spaces', desc: 'Đào tạo & Học vụ, Dịch vụ SV, Hành chính, Giảng dạy & Nghiên cứu, Đời sống.' },
      { step: '03. 14+ Specialized Agents', desc: 'Thực thi nghiệp vụ cụ thể (Tra cứu quy chế, xét học bổng, tư vấn lộ trình học tập).' },
      { step: '04. Campus Aggregator', desc: 'Tổng hợp kết quả, format phản hồi chuẩn hóa kèm hành động gợi ý tiếp theo.' },
    ],
    metrics: [
      { label: 'Số lượng Agent chuyên biệt', value: '14+ Agents' },
      { label: 'Phân hệ chức năng', value: '5 Sub-Spaces' },
      { label: 'Nền tảng vận hành', value: 'Wesome AI Space' },
      { label: 'Thời gian phản hồi trung bình', value: '< 150 ms' },
    ],
    highlights: [
      'Kiến trúc phân cấp Multi-Agent Orchestration giúp các Agent làm việc độc lập mà không bị xung đột ngữ cảnh.',
      'Tích hợp đầy đủ quy chế đào tạo, thủ tục một cửa của HCMUS vào Knowledge Base dạng Vector embeddings.',
      'Sẵn sàng tích hợp cổng xác thực sinh viên và hệ thống đăng ký học phần.',
    ],
  },
  2: { // Multi-modal AIC Video Retrieval
    architecture: [
      { step: '01. Multi-modal Embedding', desc: 'CLIP trích xuất thị giác (177,321 frames), BGE-M3 sinh vector ngữ nghĩa văn bản (292,488 docs).' },
      { step: '02. Dual Retrieval Engines', desc: 'FAISS IndexFlatIP tìm kiếm ngữ nghĩa song song với SQLite FTS5 (BM25) tìm kiếm từ vựng & OCR.' },
      { step: '03. Intent-Aware Routing & RRF', desc: 'Phân tích câu hỏi: dùng Reciprocal Rank Fusion kết hợp điểm khi truy vấn cần nhiều nguồn bằng chứng.' },
      { step: '04. Gemini VLM Verification', desc: 'Tái chấm điểm và căn chỉnh chuỗi khung hình thời gian (TRAKE) đối với ứng viên Top-K.' },
    ],
    metrics: [
      { label: 'Tập dữ liệu video cuộc thi', value: '873 Video (L21–L30)' },
      { label: 'Tài liệu văn bản OCR / ASR', value: '292,488 Documents' },
      { label: 'Khung hình trích xuất CLIP', value: '177,321 Keyframes' },
      { label: 'Bộ kiểm thử tự động', value: '439 Automated Tests' },
    ],
    highlights: [
      'Giải quyết triệt để bài toán tìm kiếm khung hình chuẩn xác (KIS) và hỏi đáp dựa trên video (Video Q&A).',
      'Cơ chế Sequence lane bảo toàn trật tự thời gian diễn ra của các sự kiện trong video.',
      'Bộ lọc nhiễu OCR tất định và xử lý lỗi bộ nhớ đệm dung lượng lớn trên ổ đĩa SSD ngoài.',
    ],
  },
  3: { // AI Story Adventure
    architecture: [
      { step: '01. Player Action Prompt', desc: 'Ghi nhận lựa chọn của người chơi và trích xuất thực thể nhân vật, bối cảnh.' },
      { step: '02. Vector Context Recall', desc: 'Truy vấn cơ sở dữ liệu vector Qdrant để lấy các tình tiết lore liên quan trong quá khứ.' },
      { step: '03. Gemini Storytelling', desc: 'Sinh nhánh truyện mới, đảm bảo giữ nguyên tính cách nhân vật và luật thế giới.' },
      { step: '04. State Sync & Async Cache', desc: 'Lưu trạng thái thế giới vào cơ sở dữ liệu và cache qua FastAPI backend.' },
    ],
    metrics: [
      { label: 'Mô hình sinh', value: 'Google Gemini Pro' },
      { label: 'Vector Database', value: 'Qdrant Cloud / Local' },
      { label: 'Độ trễ API truy xuất', value: '< 65 ms' },
      { label: 'Độ nhất quán bối cảnh', value: '98.5%' },
    ],
    highlights: [
      'Không bị "ảo giác" (hallucination) hay quên tình tiết nhân vật nhờ bộ nhớ RAG ngữ cảnh dài hạn.',
      'Giao diện trực quan cho phép người chơi rẽ nhánh cốt truyện theo thời gian thực.',
    ],
  },
  4: { // Vietnamese Medical NLP
    architecture: [
      { step: '01. Tiền xử lý văn bản y tế', desc: 'Chuẩn hóa thuật ngữ lâm sàng, viết tắt và từ đồng nghĩa y khoa tiếng Việt.' },
      { step: '02. Hybrid Dense-Sparse Search', desc: 'Kết hợp mô hình biểu diễn ngữ nghĩa chuyên biệt cho y sinh với BM25 thuật ngữ.' },
      { step: '03. Trích xuất thực thể y tế (NER)', desc: 'Phát hiện bệnh lý, triệu chứng, liều lượng và hoạt chất dược phẩm.' },
      { step: '04. Evidence Synthesis', desc: 'Tổng hợp tài liệu y văn đã kiểm chứng để hỗ trợ bác sĩ tra cứu.' },
    ],
    metrics: [
      { label: 'Ngôn ngữ mục tiêu', value: 'Tiếng Việt Y Sinh' },
      { label: 'Phương pháp tìm kiếm', value: 'Hybrid Dense-Sparse' },
      { label: 'Độ chính xác thực thể (F1)', value: '> 89.2%' },
      { label: 'Bộ từ điển lâm sàng', value: '50,000+ Thực thể' },
    ],
    highlights: [
      'Xử lý tốt các từ vựng lâm sàng đa nghĩa và tiếng lóng triệu chứng bệnh của bệnh nhân Việt Nam.',
      'Giảm thiểu tối đa việc gợi ý thông tin y khoa sai lệch nhờ trích xuất bằng chứng đối chiếu chặt chẽ.',
    ],
  },
  5: { // Football Computer Vision
    architecture: [
      { step: '01. YOLO Detection', desc: 'Phát hiện cầu thủ, trọng tài và bóng với mô hình YOLOv8 tối ưu cho thể thao.' },
      { step: '02. ByteTrack Multi-Object', desc: 'Gán ID duy nhất và duy trì quỹ đạo liên tục ngay cả khi cầu thủ bị che khuất tạm thời.' },
      { step: '03. SigLIP Appearance Re-ID', desc: 'Trích xuất vector màu áo và đặc trưng diện mạo để tái định danh khi bị mất dấu.' },
      { step: '04. Tactical Mapping', desc: 'Chiếu tọa độ sân 2D (Homography transform) để phân tích cự ly đội hình và heat map.' },
    ],
    metrics: [
      { label: 'Tốc độ xử lý video', value: '60 FPS (GPU)' },
      { label: 'Độ chính xác Tracking (MOTA)', value: '92.4%' },
      { label: 'Model phát hiện', value: 'YOLOv8x Sport' },
      { label: 'Mô hình đặc trưng', value: 'Google SigLIP' },
    ],
    highlights: [
      'Khắc phục hiện tượng nhảy ID cầu thủ trong các pha va chạm đông người ở vòng cấm địa.',
      'Sinh báo cáo sơ đồ nhiệt (Heatmap) và cự ly di chuyển tự động sau trận đấu.',
    ],
  },
  6: { // Financial & Tax AI Agent
    architecture: [
      { step: '01. Bóc tách hóa đơn & Báo cáo', desc: 'Trích xuất dữ liệu tài chính có cấu trúc từ bảng biểu và file kế toán.' },
      { step: '02. Vector Knowledge & Luật thuế', desc: 'Đối chiếu thông tư, nghị định và quy chuẩn thuế GTGT/TNDN hiện hành.' },
      { step: '03. Rule Engine Validation', desc: 'Áp dụng engine luật logic cứng để loại bỏ tuyệt đối rủi ro tính toán sai của LLM.' },
      { step: '04. Tax Recommendation', desc: 'Xuất tờ khai và bảng phân tích rủi ro tuân thủ cho doanh nghiệp.' },
    ],
    metrics: [
      { label: 'Độ chính xác đối chiếu luật', value: '100% Deterministic' },
      { label: 'Engine luật kiểm tra', value: 'Python Rule Engine' },
      { label: 'Tiết kiệm thời gian rà soát', value: '~70%' },
      { label: 'Backend xử lý', value: 'FastAPI Microservice' },
    ],
    highlights: [
      'Kết hợp hoàn hảo giữa tính linh hoạt của LLM và tính chính xác tuyệt đối của Rule Engine xác định.',
      'Bảo vệ dữ liệu tài chính nội bộ an toàn với cơ chế phân quyền chặt chẽ.',
    ],
  },
}

export function ProjectDetailModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundFx.playClick()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Khóa cuộn trang nền và tạm dừng Lenis để toàn bộ thao tác cuộn nằm trọn trong modal
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

  if (!project) return null
  const deepDive = PROJECT_DEEP_DIVES[project.id]

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
            className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0c0c14]/95 shadow-[0_25px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-6 py-4 sm:py-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-0.5 font-mono text-[10px] text-accent-cyan font-semibold">
                    {project.category || 'AI Project'}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">Chi tiết kiến trúc hệ thống</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {project.title}
                </h3>
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

            {/* Scrollable Body - Cuộn mượt độc lập bên trong */}
            <div
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 text-sm [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Mô tả cốt lõi */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-zinc-300 leading-relaxed text-xs sm:text-sm">
                {project.description}
              </div>

              {/* Luồng kiến trúc Pipeline Architecture */}
              {deepDive?.architecture && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-blue mb-3 flex items-center gap-2">
                    <Network className="h-4 w-4" /> SƠ ĐỒ LUỒNG KIẾN TRÚC (SYSTEM PIPELINE)
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {deepDive.architecture.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-white/[0.07] bg-black/40 p-3.5 transition-colors hover:border-accent-blue/30"
                      >
                        <div className="font-mono text-xs font-bold text-accent-cyan">{item.step}</div>
                        <p className="mt-1 text-xs text-zinc-300 leading-snug">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Các chỉ số hiệu năng (Key Metrics) */}
              {deepDive?.metrics && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-purple mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" /> CHỈ SỐ KỸ THUẬT &amp; HIỆU NĂNG THỰC TẾ
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 font-mono">
                    {deepDive.metrics.map((m, idx) => (
                      <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
                        <div className="mt-1 font-bold text-white text-xs sm:text-sm">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Điểm nổi bật & Thách thức giải quyết */}
              {deepDive?.highlights && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> ĐIỂM SÁNG KỸ THUẬT &amp; TỐI ƯU HÓA
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {deepDive.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-accent-cyan mt-0.5">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags công nghệ */}
              <div>
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider mb-2">Công nghệ sử dụng:</div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/[0.08] bg-white/[0.02] px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    <Github className="h-3.5 w-3.5" /> Xem mã nguồn GitHub ↗
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-blue px-4 py-2 font-mono text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Chạy thử Demo ↗
                  </a>
                )}
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
