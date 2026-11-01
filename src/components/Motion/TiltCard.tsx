import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

/** 3D tilt that follows the pointer, with a soft moving glare highlight. */
export function TiltCard({ children, className = '', max = 10, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const touch = useIsTouch()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 18 })
  const sy = useSpring(py, { stiffness: 160, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 55%)`

  const onMove = (e: React.PointerEvent) => {
    if (touch || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: touch ? 0 : rotateX, rotateY: touch ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full rounded-[inherit]"
      >
        {children}
        {glare && !touch && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 [div:hover>&]:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  )
}
