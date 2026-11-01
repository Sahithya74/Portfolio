import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { MousePointer2, RotateCcw } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { SectionHeading } from '../Motion/SectionHeading'

function Tile({ title, hint, className = '', children }: { title: string; hint: string; className?: string; children: ReactNode }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[2rem] border border-line bg-surface ${className}`}
    >
      {children}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <span className="font-display text-xl italic">{title}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur">
          <MousePointer2 className="h-3 w-3" /> {hint}
        </span>
      </figcaption>
    </motion.figure>
  )
}

/* 01 — Gradient that follows the pointer */
function LiquidGradient() {
  const x = useSpring(useMotionValue(50), { stiffness: 50, damping: 15 })
  const y = useSpring(useMotionValue(50), { stiffness: 50, damping: 15 })
  const x2 = useSpring(useMotionValue(50), { stiffness: 25, damping: 12 })
  const y2 = useSpring(useMotionValue(50), { stiffness: 25, damping: 12 })
  const bg = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, #B7A2C9 0%, transparent 38%), radial-gradient(circle at ${x2}% ${y2}%, #C7C5CA 0%, transparent 45%), radial-gradient(circle at ${y}% ${x2}%, #D8C9E5 0%, transparent 55%), #F5F0E8`
  return (
    <motion.div
      className="h-full min-h-[18rem] w-full touch-none"
      style={{ background: bg }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const px = ((e.clientX - r.left) / r.width) * 100
        const py = ((e.clientY - r.top) / r.height) * 100
        x.set(px)
        y.set(py)
        x2.set(100 - px)
        y2.set(100 - py)
      }}
    >
      <div className="grid h-full place-items-center">
        <span className="display text-5xl text-[#29272D] mix-blend-overlay md:text-7xl">fluid</span>
      </div>
    </motion.div>
  )
}

/* 02 — Draggable 3D-ish objects */
function DragShapes() {
  const area = useRef<HTMLDivElement>(null)
  const [key, setKey] = useState(0)
  const faces = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)']
  return (
    <div ref={area} className="relative h-full min-h-[22rem] w-full bg-[radial-gradient(circle_at_50%_40%,var(--purple),transparent_65%)]" key={key}>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg/80 transition-transform hover:-rotate-180"
        aria-label="Reset shapes"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
      {/* Cube */}
      <motion.div drag dragConstraints={area} dragElastic={0.2} whileDrag={{ scale: 1.15 }} className="absolute left-[18%] top-[22%] h-20 w-20 cursor-grab active:cursor-grabbing" style={{ perspective: 600 }} data-cursor="Drag">
        <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateX: 360, rotateY: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
          {faces.map((f) => (
            <span key={f} className="absolute inset-0 border border-white/60 bg-[#B7A2C9]/70" style={{ transform: `${f} translateZ(40px)` }} />
          ))}
        </motion.div>
      </motion.div>
      {/* Sphere */}
      <motion.div
        drag
        dragConstraints={area}
        dragElastic={0.2}
        whileDrag={{ scale: 1.15 }}
        data-cursor="Drag"
        className="absolute right-[18%] top-[18%] h-24 w-24 cursor-grab rounded-full shadow-[inset_-12px_-14px_30px_rgba(41,39,45,0.45),0_20px_40px_-10px_rgba(57,52,61,0.4)] active:cursor-grabbing"
        style={{ background: 'radial-gradient(circle at 32% 28%, #FAF8F4, #C7C5CA 35%, #77717B 80%)' }}
      />
      {/* Ring */}
      <motion.div
        drag
        dragConstraints={area}
        dragElastic={0.2}
        whileDrag={{ scale: 1.15 }}
        data-cursor="Drag"
        className="absolute bottom-[26%] left-[42%] h-24 w-24 cursor-grab rounded-full border-[14px] border-[#B7A2C9] shadow-[0_12px_30px_-8px_rgba(57,52,61,0.5)] active:cursor-grabbing"
        animate={{ rotateX: [60, 70, 60], rotateZ: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      {/* Pill */}
      <motion.div
        drag
        dragConstraints={area}
        dragElastic={0.2}
        whileDrag={{ scale: 1.15, rotate: 20 }}
        data-cursor="Drag"
        className="metal-bg absolute bottom-[38%] right-[28%] h-10 w-24 cursor-grab rounded-full shadow-lg active:cursor-grabbing"
      />
    </div>
  )
}

/* 03 — Type that swells near the pointer */
function VariableType() {
  const word = 'CURIOSITY'
  const ref = useRef<HTMLDivElement>(null)
  const [weights, setWeights] = useState<number[]>(() => word.split('').map(() => 300))
  const [lift, setLift] = useState<number[]>(() => word.split('').map(() => 0))

  const onMove = (e: React.PointerEvent) => {
    const spans = ref.current?.querySelectorAll('span')
    if (!spans) return
    const w: number[] = []
    const l: number[] = []
    spans.forEach((s) => {
      const r = s.getBoundingClientRect()
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
      const t = Math.max(0, 1 - d / 220)
      w.push(300 + t * 600)
      l.push(-t * 24)
    })
    setWeights(w)
    setLift(l)
  }
  const reset = () => {
    setWeights(word.split('').map(() => 300))
    setLift(word.split('').map(() => 0))
  }

  return (
    <div className="grid h-full min-h-[18rem] w-full place-items-center overflow-hidden bg-[#29272D] px-4 text-[#F5F0E8]" onPointerMove={onMove} onPointerLeave={reset}>
      <div ref={ref} className="flex font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-none" aria-label={word}>
        {word.split('').map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            animate={{ y: lift[i] }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{ fontVariationSettings: `'wght' ${weights[i]}, 'opsz' 144`, color: weights[i] > 600 ? '#D8C9E5' : undefined, transition: 'font-variation-settings .25s, color .25s' }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* 04 — Geometry that morphs in a ripple from where you click */
const forms = [
  { borderRadius: '50%', rotate: 0, scale: 1 },
  { borderRadius: '12%', rotate: 45, scale: 0.8 },
  { borderRadius: '50% 0 50% 0', rotate: 90, scale: 0.9 },
  { borderRadius: '0 50% 0 50%', rotate: 0, scale: 0.65 },
]
function Geometry() {
  const cols = 6
  const rows = 4
  const [state, setState] = useState(0)
  const [origin, setOrigin] = useState({ c: 0, r: 0 })
  return (
    <div className="grid h-full min-h-[18rem] w-full place-items-center bg-taupe p-6 pb-16">
      <div className="grid w-full max-w-sm gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows * cols }, (_, i) => {
          const c = i % cols
          const r = Math.floor(i / cols)
          const dist = Math.hypot(c - origin.c, r - origin.r)
          const f = forms[(state + ((c + r) % 2)) % forms.length]
          return (
            <motion.button
              key={i}
              type="button"
              aria-label={`Morph shapes from cell ${i + 1}`}
              onClick={() => {
                setOrigin({ c, r })
                setState((s) => s + 1)
              }}
              className={`aspect-square ${(c + r) % 3 === 0 ? 'bg-ink' : (c + r) % 3 === 1 ? 'bg-lavender' : 'bg-silver'}`}
              animate={f}
              whileHover={{ scale: 1.15 }}
              transition={{ delay: dist * 0.06, type: 'spring', stiffness: 160, damping: 14 }}
            />
          )
        })}
      </div>
    </div>
  )
}

export function Playground() {
  return (
    <section id="playground" aria-labelledby="playground-title" className="section bg-soft">
      <div className="container-x">
        <SectionHeading
          id="playground-title"
          index="08"
          eyebrow="Experiments"
          title="THE PLAYGROUND"
          accent="PLAYGROUND"
          intro="A small corner for curiosity — interactive experiments with motion, type, gradients and geometry. Move, drag and click around."
        />
        <div className="grid gap-5 md:grid-cols-6">
          <Tile title="Liquid gradient" hint="Move" className="md:col-span-3">
            <LiquidGradient />
          </Tile>
          <Tile title="Floating objects" hint="Drag" className="md:col-span-3 md:row-span-2">
            <DragShapes />
          </Tile>
          <Tile title="Variable type" hint="Hover" className="md:col-span-3">
            <VariableType />
          </Tile>
          <Tile title="Ripple geometry" hint="Click" className="md:col-span-6">
            <Geometry />
          </Tile>
        </div>
      </div>
    </section>
  )
}
