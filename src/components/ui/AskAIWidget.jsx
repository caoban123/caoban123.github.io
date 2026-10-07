import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, X, Send, User, CornerDownLeft, RefreshCw } from 'lucide-react'
import { site } from '../../data/site'
import { projects } from '../../data/projects'
import { researchData } from '../../data/research'
import { soundFx } from '../../lib/sound'

// Kiến thức nạp sẵn về Nguyễn Cao Bản
const KNOWLEDGE_BASE = [
  {
    triggers: ['mảng nào', 'chuyên môn', 'kỹ năng', 'lĩnh vực', 'làm gì', 'giới thiệu', 'who', 'about'],
    answer:
      `Nguyễn Cao Bản là AI Developer & Researcher tại HCMUS với thành tích xuất sắc (GPA: ${site.gpa}, TOEIC: ${site.toeic}).\nBản chuyên sâu về:\n• Hệ thống truy xuất RAG & Mô hình ngôn ngữ lớn (LLM)\n• Thị giác máy tính (Computer Vision - Object Tracking, Detection)\n• Nghiên cứu mô hình sinh (Generative AI & Video Editing)\n• Kỹ thuật phần mềm hiệu năng cao (FastAPI, Docker, Vector DB).`,
  },
  {
    triggers: ['gpa', 'toeic', 'học vấn', 'điểm', 'tiếng anh', 'education', 'hcmus', 'đại học'],
    answer:
      `Nguyễn Cao Bản có thành tích học tập và ngoại ngữ xuất sắc:\n• GPA: ${site.gpa} (Đại học Khoa học Tự nhiên ĐHQG-HCM - HCMUS)\n• TOEIC: ${site.toeic} (Sử dụng thành thạo Tiếng Anh trong đọc hiểu tài liệu nghiên cứu, viết báo khoa học và trao đổi chuyên môn quốc tế).`,
  },
  {
    triggers: ['rag', 'vector', 'qdrant', 'retrieval', 'llm', 'truy xuất', 'gemini'],
    answer:
      'Về RAG & LLM, Bản đã phát triển dự án "AI Story Adventure" tích hợp Google Gemini và Vector DB Qdrant để duy trì lore cốt truyện nhất quán. Ngoài ra còn có dự án "Vietnamese Medical NLP" truy xuất thông tin y sinh học lâm sàng tiếng Việt với tìm kiếm kết hợp dense-sparse.',
  },
  {
    triggers: ['vision', 'computer vision', 'yolo', 'bytetrack', 'thị giác', 'tracking', 'bóng đá', 'football'],
    answer:
      'Dự án Computer Vision nổi bật của Bản là "Football Computer Vision": Pipeline tích hợp YOLO phát hiện cầu thủ, ByteTrack theo dõi đa đối tượng liên khung hình và SigLIP trích xuất đặc trưng ngoại hình để phục vụ phân tích chiến thuật thời gian thực.',
  },
  {
    triggers: ['nghiên cứu', 'research', 'khoa học', 'rectified flow', 'video', 'bài báo'],
    answer:
      `Chủ đề nghiên cứu của Bản là: "${researchData.primaryTopic}". Nghiên cứu tập trung vào kiểm soát thích ứng không - thời gian trong mô hình Rectified Flow phục vụ biên tập video chính xác và mượt mà.`,
  },
  {
    triggers: ['liên hệ', 'contact', 'email', 'tuyển dụng', 'thuê', 'hire', 'hợp tác'],
    answer:
      `Bạn có thể kết nối trực tiếp với Bản qua:\n• Email: ${site.email}\n• GitHub: ${site.github}\n• LinkedIn: ${site.linkedin || 'Xem trên thanh menu'}\nHoặc gửi lời nhắn nhanh ở form liên hệ cuối trang web!`,
  },
]

const QUICK_PROMPTS = [
  'Bản chuyên về những mảng AI nào?',
  'Kinh nghiệm với RAG & Vector DB?',
  'Dự án Computer Vision tiêu biểu?',
  'Chủ đề nghiên cứu khoa học của Bản?',
  'Cách thức liên hệ & làm việc?',
]

export function AskAIWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi là trợ lý ảo được huấn luyện dựa trên hồ sơ của Nguyễn Cao Bản. Bạn muốn tìm hiểu điều gì?',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatBottomRef = useRef(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const generateAnswer = (query) => {
    const q = query.toLowerCase()
    for (const item of KNOWLEDGE_BASE) {
      if (item.triggers.some((t) => q.includes(t))) {
        return item.answer
      }
    }
    return `Cảm ơn bạn đã quan tâm! Nguyễn Cao Bản là AI Developer đam mê RAG, LLM và Computer Vision. Bạn có thể xem chi tiết các dự án trên trang hoặc liên hệ qua email ${site.email} để trao đổi sâu hơn.`
  }

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim()
    if (!query || isTyping) return

    soundFx.playClick()
    setMessages((prev) => [...prev, { sender: 'user', text: query }])
    setInput('')
    setIsTyping(true)

    const fullAnswer = generateAnswer(query)
    let currentIdx = 0
    let tempText = ''

    // Typewriter effect streaming
    const interval = setInterval(() => {
      if (currentIdx < fullAnswer.length) {
        tempText += fullAnswer[currentIdx]
        currentIdx += 2 // stream 2 ký tự một lần cho mượt
        soundFx.playBleep()
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (last && last.sender === 'ai' && last.streaming) {
            return [...prev.slice(0, -1), { sender: 'ai', text: tempText, streaming: true }]
          }
          return [...prev, { sender: 'ai', text: tempText, streaming: true }]
        })
      } else {
        clearInterval(interval)
        setIsTyping(false)
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          return [...prev.slice(0, -1), { sender: 'ai', text: fullAnswer, streaming: false }]
        })
        soundFx.playSuccess()
      }
    }, 25)
  }

  return (
    <>
      {/* Nút tròn nổi góc dưới màn hình */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            soundFx.playClick()
            setIsOpen(!isOpen)
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan p-0.5 shadow-[0_0_30px_rgba(79,124,255,0.45)] transition-all"
          aria-label="Hỏi đáp cùng AI"
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950 transition-colors group-hover:bg-zinc-900">
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <div className="relative">
                <Bot className="h-6 w-6 text-white" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </span>
              </div>
            )}
          </div>
        </motion.button>
      </div>

      {/* Cửa sổ chat AI */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 flex h-[520px] w-[90vw] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0c0c12]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent-blue to-accent-cyan text-white shadow-[0_0_15px_rgba(79,124,255,0.4)]">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0c0c12] bg-emerald-500" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    Bản AI Assistant
                    <Sparkles className="h-3 w-3 text-accent-cyan" />
                  </div>
                  <div className="font-mono text-[10px] text-emerald-400">Trực tuyến • Sẵn sàng hỗ trợ</div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick()
                  setMessages([
                    {
                      sender: 'ai',
                      text: 'Cuộc trò chuyện đã được làm mới. Bạn cần hỗ trợ gì tiếp theo?',
                    },
                  ])
                }}
                title="Làm mới đoạn chat"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.08] hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Khung tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-blue/20 text-accent-cyan">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-md'
                        : 'border border-white/[0.08] bg-white/[0.04] text-zinc-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-[11px] text-accent-cyan font-mono pl-9">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  <span>Bản AI đang soạn câu trả lời...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Gợi ý câu hỏi nhanh (Quick Prompts) */}
            <div className="border-t border-white/[0.06] bg-black/30 p-2.5">
              <div className="mb-1.5 font-mono text-[10px] text-zinc-500 uppercase tracking-wider px-1">
                Gợi ý câu hỏi:
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-zinc-300 transition-colors hover:border-accent-cyan/40 hover:bg-accent-cyan/10 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Ô nhập tin nhắn */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex items-center gap-2 border-t border-white/[0.08] bg-white/[0.02] p-3"
            >
              <input
                type="text"
                placeholder="Nhập câu hỏi cho AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs text-white placeholder-zinc-500 transition-colors focus:border-accent-cyan focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-blue text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
