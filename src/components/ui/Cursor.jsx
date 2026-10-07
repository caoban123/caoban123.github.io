import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SIZES = { default: 28, pointer: 52, label: 84 }
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

/**
 * Desktop-only cursor. Elements with `data-cursor="VIEW"` (any text) show that label.
 */
export function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const target = e.target instanceof Element ? e.target : null
      const labelled = target?.closest('[data-cursor]')
      if (labelled) {
        setVariant('label')
        setLabel(labelled.getAttribute('data-cursor'))
      } else if (target?.closest(INTERACTIVE)) {
        setVariant('pointer')
        setLabel('')
      } else {
        setVariant('default')
        setLabel('')
      }
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [reduced, x, y])

  if (!enabled) return null

  const size = SIZES[variant]

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-accent-blue/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor:
            variant === 'label'
              ? 'rgba(79, 124, 255, 0.92)'
              : variant === 'pointer'
                ? 'rgba(79, 124, 255, 0.14)'
                : 'rgba(79, 124, 255, 0.04)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {variant === 'label' && (
          <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-white">{label}</span>
        )}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22D3EE]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && variant !== 'label' ? 1 : 0 }}
      />
    </>
  )
}
