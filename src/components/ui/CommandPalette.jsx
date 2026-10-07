import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Github, Linkedin, Facebook, Mail, ArrowUp, Hash, CornerDownLeft, Terminal } from 'lucide-react'
import { scrollToTarget } from '../../lib/scroll'
import { site } from '../../data/site'
import { projects } from '../../data/projects'

const SECTIONS = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'about', label: 'Giới thiệu' },
  { id: 'projects', label: 'Dự án' },
  { id: 'research', label: 'Nghiên cứu' },
  { id: 'skills', label: 'Kỹ năng' },
  { id: 'contact', label: 'Liên hệ' },
]

const HELP = [
  'help              hiển thị danh sách câu lệnh',
  'whoami            thông tin tác giả',
  'ls [projects]     danh sách mục hoặc danh sách dự án',
  'cd <mục>          chuyển nhanh đến một phần trong trang',
  'open github|linkedin|facebook',
  'clear             xóa trắng màn hình terminal',
]

// Tìm kiếm mờ (fuzzy search)
function fuzzy(text, query) {
  const t = text.toLowerCase()
  let j = 0
  for (const ch of query.toLowerCase()) {
    j = t.indexOf(ch, j)
    if (j === -1) return false
    j++
  }
  return true
}

function isTyping(el) {
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [lines, setLines] = useState([])
  const inputRef = useRef(null)

  const close = () => setOpen(false)

  const commands = useMemo(
    () =>
      [
        ...SECTIONS.map((s) => ({
          id: `go-${s.id}`,
          group: 'Điều hướng',
          label: `Đến ${s.label}`,
          hint: `#${s.id}`,
          icon: Hash,
          run: () => scrollToTarget(`#${s.id}`),
        })),
        {
          id: 'github',
          group: 'Liên kết',
          label: 'Mở GitHub',
          hint: 'caoban123',
          icon: Github,
          run: () => window.open(site.github, '_blank', 'noopener'),
        },
        site.linkedin && {
          id: 'linkedin',
          group: 'Liên kết',
          label: 'Mở LinkedIn',
          icon: Linkedin,
          run: () => window.open(site.linkedin, '_blank', 'noopener'),
        },
        site.facebook && {
          id: 'facebook',
          group: 'Liên kết',
          label: 'Mở Facebook',
          icon: Facebook,
          run: () => window.open(site.facebook, '_blank', 'noopener'),
        },
        site.email && {
          id: 'email',
          group: 'Thao tác',
          label: 'Sao chép địa chỉ Email',
          hint: site.email,
          icon: Mail,
          run: () => navigator.clipboard?.writeText(site.email),
        },
        {
          id: 'top',
          group: 'Thao tác',
          label: 'Cuộn về đầu trang',
          icon: ArrowUp,
          run: () => scrollToTarget('#home'),
        },
      ].filter(Boolean),
    []
  )

  const isTerminal = query.startsWith('>')
  const filtered = isTerminal ? [] : commands.filter((c) => fuzzy(c.label, query))

  // Phím tắt toàn cục
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !isTyping(e.target)) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      window.__lenis?.stop()
      const t = setTimeout(() => inputRef.current?.focus(), 30)
      return () => clearTimeout(t)
    }
    window.__lenis?.start()
  }, [open])

  useEffect(() => setActive(0), [query])

  const print = (...out) => setLines((l) => [...l, ...out].slice(-40))

  const runTerminal = (raw) => {
    const input = raw.trim()
    if (!input) return
    const [cmd, ...args] = input.split(/\s+/)
    const arg = args.join(' ').toLowerCase()
    print(`$ ${input}`)

    switch (cmd.toLowerCase()) {
      case 'help':
        print(...HELP)
        break
      case 'whoami':
        print(`${site.name} — AI Developer · RAG & LLM · Computer Vision · AI Researcher`)
        break
      case 'ls':
        if (arg === 'projects') print(...projects.map((p, i) => `${String(i + 1).padStart(2, '0')}  ${p.title}`))
        else print(SECTIONS.map((s) => s.id).join('   '))
        break
      case 'cd': {
        const target = SECTIONS.find((s) => s.id === arg.replace('#', ''))
        if (target) {
          close()
          scrollToTarget(`#${target.id}`)
        } else print(`cd: không tìm thấy mục: ${arg || '(trống)'}`)
        break
      }
      case 'open':
        if (arg === 'github') window.open(site.github, '_blank', 'noopener')
        else if (arg === 'linkedin' && site.linkedin) window.open(site.linkedin, '_blank', 'noopener')
        else if (arg === 'facebook' && site.facebook) window.open(site.facebook, '_blank', 'noopener')
        else print(`open: mục tiêu không hợp lệ: ${arg || '(trống)'}`)
        break
      case 'clear':
        setLines([])
        break
      case 'sudo':
        print('Quyền truy cập hợp lệ — chuyển hướng đến mục liên hệ…')
        setTimeout(() => {
          close()
          scrollToTarget('#contact')
        }, 900)
        break
      default:
        print(`Lệnh không tồn tại: ${cmd}. Nhập 'help' để xem danh sách lệnh.`)
    }
    setQuery('>')
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (!isTerminal && filtered[active]) {
        close()
        filtered[active].run()
      } else {
        runTerminal(query.replace(/^>\s*/, ''))
      }
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={close}
          data-lenis-prevent
        >
          <motion.div
            role="dialog"
            aria-label="Bảng lệnh"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b0b10]/95 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              {isTerminal ? <Terminal className="h-4 w-4 text-accent-cyan" /> : <Search className="h-4 w-4 text-zinc-500" />}
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Tìm kiếm hoặc gõ > để mở terminal…"
                className="h-14 flex-1 bg-transparent font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {(isTerminal || lines.length > 0) && (
                <div className="mb-2 rounded-xl bg-black/40 p-3 font-mono text-xs leading-relaxed">
                  {lines.length === 0 ? (
                    <div className="text-zinc-500">Gõ 'help' và nhấn Enter.</div>
                  ) : (
                    lines.map((l, i) => (
                      <div key={i} className={`whitespace-pre-wrap ${l.startsWith('$') ? 'text-accent-cyan' : 'text-zinc-300'}`}>
                        {l}
                      </div>
                    ))
                  )}
                </div>
              )}

              {filtered.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null
                lastGroup = c.group
                const Icon = c.icon
                return (
                  <React.Fragment key={c.id}>
                    {header && <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold">{header}</div>}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => {
                        close()
                        c.run()
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === active ? 'bg-white/[0.07] text-white' : 'text-zinc-400'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 font-medium">{c.label}</span>
                      {c.hint && <span className="font-mono text-[11px] text-zinc-600">{c.hint}</span>}
                      {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-zinc-500" />}
                    </button>
                  </React.Fragment>
                )
              })}

              {!isTerminal && filtered.length === 0 && (
                <div className="px-3 py-6 text-center font-mono text-xs text-zinc-500">Không tìm thấy kết quả — nhấn Enter để thực thi lệnh terminal.</div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5 font-mono text-[10px] text-zinc-600">
              <span>↑↓ điều hướng · ↵ chọn</span>
              <span>&gt; chế độ terminal</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
