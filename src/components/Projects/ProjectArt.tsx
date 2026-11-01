import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import type { Project } from '../../data/projects'
import { asset } from '../../lib/asset'

/**
 * Cover visual for a project. Uses the first real screenshot when one is listed in
 * projects.ts; otherwise renders abstract cover art that is clearly labelled as such.
 */
export function ProjectArt({ project, hovered = false, compact = false }: { project: Project; hovered?: boolean; compact?: boolean }) {
  const [a, b] = project.accent
  const variant = Number(project.number) % 3

  if (project.screenshots.length > 0) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <motion.img
          src={asset(project.screenshots[0])}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover object-top"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        {project.screenshots[1] && (
          <motion.img
            src={asset(project.screenshots[1])}
            alt=""
            className="absolute bottom-4 right-4 w-2/5 rounded-xl border border-white/40 shadow-2xl"
            animate={{ y: hovered ? -12 : 0, rotate: hovered ? -3 : 0 }}
            loading="lazy"
          />
        )}
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      {/* Browser chrome */}
      <div className="absolute inset-x-[8%] top-[10%] bottom-[-10%] rounded-t-2xl border border-white/40 bg-white/25 backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-white/30 px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/60" />
          ))}
          <span className="ml-3 h-2 flex-1 rounded-full bg-white/30" />
        </div>
        <motion.div
          aria-hidden
          className="absolute inset-0 top-10 flex items-center justify-center"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {variant === 0 && (
            <motion.div
              className="h-[45%] aspect-square rounded-full border-[10px] border-white/50"
              animate={{ rotate: hovered ? 180 : 0, borderRadius: hovered ? '30%' : '50%' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          {variant === 1 && (
            <div className="flex h-[45%] items-end gap-3">
              {[50, 80, 35, 95, 65].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-5 rounded-t-lg bg-white/55 md:w-7"
                  animate={{ height: hovered ? `${100 - h + 20}%` : `${h}%` }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          )}
          {variant === 2 && (
            <div className="relative h-[50%] aspect-square">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-3xl border-2 border-white/50"
                  animate={{ rotate: hovered ? 45 + i * 20 : i * 15, scale: 1 - i * 0.2 }}
                  transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          )}
        </motion.div>
        <span
          className={`absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 select-none font-display italic text-white/70 mix-blend-overlay ${
            compact ? 'text-6xl' : 'text-8xl md:text-9xl'
          }`}
          aria-hidden
        >
          {project.title.charAt(0)}
        </span>
      </div>
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#29272D]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#F5F0E8]">
        <ImageIcon className="h-3 w-3" /> Cover art · screenshots coming soon
      </span>
    </div>
  )
}
