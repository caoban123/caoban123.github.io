import React, { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/\\'

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

/**
 * Text that "decodes" from random glyphs into the final string, left to right.
 * Re-plays whenever `text` changes or `play` turns true.
 */
export function ScrambleText({ text, play = true, duration = 900, delay = 0, className = '' }) {
  const [output, setOutput] = useState(text)
  const frame = useRef(0)

  useEffect(() => {
    if (!play) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text)
      return
    }

    let start = null
    const chars = [...text]

    const step = (now) => {
      if (start === null) start = now + delay
      const progress = Math.max(0, Math.min(1, (now - start) / duration))
      const revealed = Math.floor(progress * chars.length)

      setOutput(
        chars
          .map((ch, i) => (ch === ' ' || i < revealed ? ch : randomGlyph()))
          .join('')
      )

      if (progress < 1) frame.current = requestAnimationFrame(step)
    }

    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [text, play, duration, delay])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  )
}
