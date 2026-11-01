import { useEffect, useRef } from 'react'

interface ParticlesProps {
  count?: number
  className?: string
  /** Particles drift away from the pointer and link when close. */
  interactive?: boolean
  color?: string
}

/** Lightweight canvas particle field. Pauses when off-screen; static under reduced motion. */
export function Particles({ count = 60, className = '', interactive = true, color = '183,162,201' }: ParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches
    const n = mobile ? Math.round(count * 0.45) : count
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    const pts = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.6,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      pts.forEach((p) => {
        if (p.x <= 1) {
          p.x *= w
          p.y *= h
        }
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          if (interactive) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const d = Math.hypot(dx, dy)
            if (d < 110 && d > 0) {
              p.x += (dx / d) * 1.4
              p.y += (dy / d) * 1.4
            }
          }
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},0.75)`
        ctx.fill()
      }
      if (!mobile) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
            if (d < 100) {
              ctx.strokeStyle = `rgba(${color},${0.22 * (1 - d / 100)})`
              ctx.lineWidth = 0.7
              ctx.beginPath()
              ctx.moveTo(pts[i].x, pts[i].y)
              ctx.lineTo(pts[j].x, pts[j].y)
              ctx.stroke()
            }
          }
        }
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })

    resize()
    draw()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    if (interactive) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [count, interactive, color])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
