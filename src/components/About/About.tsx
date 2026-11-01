import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Compass, Heart, PenTool, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { aboutCategories, aboutParagraphs, personal } from '../../data/personal'
import { Reveal } from '../Motion/Reveal'
import { SectionHeading } from '../Motion/SectionHeading'
import { TiltCard } from '../Motion/TiltCard'

const icons = { create: PenTool, explore: Compass, inspire: Heart }

function CategoryCard({ index, open, onToggle }: { index: number; open: boolean; onToggle: () => void }) {
  const cat = aboutCategories[index]
  const Icon = icons[cat.icon]
  return (
    <motion.li
      layout
      transition={{ layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      className={`animated-border relative overflow-hidden rounded-[2rem] border border-line ${open ? 'bg-ink text-bg' : 'bg-surface'}`}
      style={{ borderRadius: 32 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-5 p-6 text-left md:p-8"
      >
        <motion.span
          layout="position"
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${open ? 'metal-bg text-[#29272D]' : 'bg-purple/50'}`}
          animate={{ rotate: open ? 360 : 0, borderRadius: open ? '50%' : '16px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon className="h-6 w-6" />
        </motion.span>
        <motion.span layout="position" className="flex-1">
          <span className="font-mono text-xs opacity-60">0{index + 1}</span>
          <span className="block font-display text-2xl md:text-3xl">{cat.title}</span>
        </motion.span>
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
          <Plus className="h-6 w-6" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', transition: { staggerChildren: 0.07 } }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 px-6 pb-7 md:px-8"
          >
            {cat.items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 16, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 260, damping: 18 }}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export function About() {
  const [open, setOpen] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 220])
  const lineScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1])

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <SectionHeading id="about-title" index="01" eyebrow="About me" title="A Little About My Journey" accent="Journey" />

        <div ref={ref} className="grid gap-14 lg:grid-cols-12">
          {/* Sticky visual */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="clip" duration={1.3}>
                <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-[2rem]">
                  <motion.img
                    src={personal.photo}
                    alt=""
                    style={{ y: imgY, scale: 1.2 }}
                    className="h-full w-full object-cover object-[50%_25%] grayscale-[35%] sepia-[15%]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#29272D]/45 via-transparent to-[#B7A2C9]/40 mix-blend-multiply" />
                  <div className="absolute left-0 right-0 top-0 p-6 text-[#F5F0E8]">
                    <p className="font-display text-3xl italic">Learning by building.</p>
                  </div>
                </div>
              </Reveal>
              <motion.div
                aria-hidden
                style={{ rotate: ringRotate }}
                className="pointer-events-none relative mx-auto -mt-20 ml-[60%] h-36 w-36 lg:ml-[62%]"
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <defs>
                    <path id="about-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <circle cx="100" cy="100" r="96" fill="var(--bg)" />
                  <text className="fill-ink font-mono text-[13px] uppercase tracking-[0.3em]">
                    <textPath href="#about-circle">• curious • creative • consistent • builder </textPath>
                  </text>
                  <text x="100" y="112" textAnchor="middle" className="fill-lavender font-display text-[34px] italic">
                    SK
                  </text>
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Story */}
          <div className="relative lg:col-span-7">
            <motion.span aria-hidden style={{ scaleY: lineScale }} className="absolute -left-6 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-lavender to-transparent lg:block" />
            <div className="space-y-7 text-lg leading-relaxed md:text-xl">
              {aboutParagraphs.map((p, i) => (
                <Reveal key={i} variant={i % 2 ? 'blur' : 'up'} delay={0.05}>
                  <p className={i === 0 ? 'font-display text-2xl leading-snug md:text-3xl' : 'text-muted'}>{p}</p>
                </Reveal>
              ))}
            </div>

            <ul className="mt-14 space-y-4">
              {aboutCategories.map((_, i) => (
                <Reveal as="li" key={i} variant="right" delay={i * 0.1} className="list-none">
                  <TiltCard max={4} glare={false} className="rounded-[2rem]">
                    <ul>
                      <CategoryCard index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
                    </ul>
                  </TiltCard>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
