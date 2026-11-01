import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { categories, projects, type Project, type ProjectCategory } from '../../data/projects'
import { Magnetic } from '../Motion/Magnetic'
import { SectionHeading } from '../Motion/SectionHeading'
import { SplitText } from '../Motion/SplitText'
import { TiltCard } from '../Motion/TiltCard'
import { ProjectArt } from './ProjectArt'
import { ProjectModal } from './ProjectModal'

const ease = [0.22, 1, 0.36, 1] as const

function ProjectPanel({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const flip = index % 2 === 1
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numberY = useTransform(scrollYProgress, [0, 1], [120, -120])
  const artY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const shown = project.features.slice(0, 4)

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative grid items-center gap-8 py-10 md:py-16 lg:grid-cols-12 lg:gap-12"
    >
      {/* Dynamic hover backdrop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 inset-y-0 -z-10 rounded-[3rem] md:-inset-x-10"
        style={{ background: `linear-gradient(120deg, ${project.accent[0]}33, transparent 60%)` }}
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.97 }}
        transition={{ duration: 0.6 }}
      />

      {/* Big parallax number */}
      <motion.span
        aria-hidden
        style={{ y: numberY }}
        className={`outline-text pointer-events-none absolute -top-12 z-0 hidden select-none font-display text-[13rem] leading-none opacity-30 lg:block ${
          flip ? 'right-0' : 'left-0'
        }`}
      >
        {project.number}
      </motion.span>

      <motion.div style={{ y: artY }} className={`relative z-10 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <TiltCard max={7} className="rounded-[2rem]">
          <motion.button
            type="button"
            onClick={onOpen}
            layoutId={`cover-${project.slug}`}
            data-cursor="View"
            aria-label={`Open ${project.title} details`}
            className="animated-border relative block aspect-[16/11] w-full overflow-hidden rounded-[2rem] shadow-[var(--shadow)]"
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 32px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease }}
          >
            <ProjectArt project={project} hovered={hovered} />
          </motion.button>
        </TiltCard>
        {/* Floating tech / category labels */}
        <motion.span
          className={`glass animate-float absolute -top-4 z-10 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider shadow-md ${flip ? '-left-2' : '-right-2'}`}
          style={{ ['--dur' as string]: '6s' }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          {project.live ? '● Live' : 'Platform'}
        </motion.span>
      </motion.div>

      <div className={`relative lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <div className="mb-5 flex items-center gap-4">
          <motion.span
            className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-line font-mono text-sm"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.span variants={{ hidden: { y: 40 }, show: { y: 0, transition: { duration: 0.6, ease, delay: 0.2 } } }}>
              {project.number}
            </motion.span>
          </motion.span>
          <span className="eyebrow">{project.label}</span>
        </div>
        <h3 className="display mb-5 text-5xl md:text-6xl">
          <SplitText text={project.title} effect="flip" stagger={0.04} />
        </h3>
        <p className="mb-6 text-muted">{project.description}</p>
        <ul className="mb-8 flex flex-wrap gap-2">
          {shown.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, y: 14, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200, damping: 16 }}
              whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs"
            >
              {f}
            </motion.li>
          ))}
          {project.features.length > shown.length && (
            <li className="rounded-full bg-purple/40 px-3.5 py-1.5 text-xs">+{project.features.length - shown.length} more</li>
          )}
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              onClick={onOpen}
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3 text-sm text-bg"
            >
              <span className="metal-bg absolute inset-0 -translate-x-full transition-transform duration-500 group-hover/btn:translate-x-0" />
              <span className="relative z-10 group-hover/btn:text-[#29272D]">View case study</span>
              <Plus className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover/btn:rotate-90 group-hover/btn:text-[#29272D]" />
            </button>
          </Magnetic>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1.5 px-3 py-3 text-sm"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover/link:bg-[length:100%_1px]">
                {project.url.replace('https://', '')}
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="relative mt-16 flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-dashed border-lavender/70 px-6 py-20 text-center"
    >
      <div className="absolute inset-0 -z-10 grid place-items-center" aria-hidden>
        <div className="orbit relative h-72 w-72 rounded-full border border-line" style={{ ['--orbit-dur' as string]: '18s' }}>
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-lavender"
              style={{ transform: `rotate(${deg}deg) translateX(144px) translate(-50%, -50%)` }}
            />
          ))}
        </div>
        <span className="absolute h-24 w-24 rounded-full bg-purple/60" style={{ animation: 'pulse-ring 2.6s ease-out infinite' }} />
      </div>
      <p className="eyebrow mb-4">In the workshop</p>
      <p className="display text-4xl md:text-6xl">
        More Projects <span className="metal-text italic">Coming Soon</span>
      </p>
      <p className="mt-4 flex items-center gap-1 font-mono text-sm text-muted">
        building<span style={{ animation: 'blink 1s infinite' }}>_</span>
      </p>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const [active, setActive] = useState<Project | null>(null)
  const close = useCallback(() => setActive(null), [])
  const list = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="work" aria-labelledby="work-title" className="section bg-soft">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          index="02"
          eyebrow="Projects"
          title="Selected Work & Digital Experiences"
          accent="Digital Experiences"
          intro="Every project begins with an idea. Every solution brings it closer to reality."
        />

        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => {
              const selected = filter === c.id
              const count = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(c.id)}
                  className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors ${selected ? 'border-ink text-bg' : 'border-line hover:border-lavender'}`}
                >
                  {selected && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative z-10">
                    {c.label} <sup className="font-mono text-[10px] opacity-60">{count}</sup>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="divide-y divide-line">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <ProjectPanel key={p.slug} project={p} index={i} onOpen={() => setActive(p)} />
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>{active && <ProjectModal project={active} onClose={close} />}</AnimatePresence>
        </LayoutGroup>

        <ComingSoon />
      </div>
    </section>
  )
}
