import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ImageIcon } from 'lucide-react'
import type { Project } from '../../data/projects'
import { asset } from '../../lib/asset'
import { GithubIcon } from '../Icons/Brand'

const block = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={block} className="border-t border-line pt-6">
      <h3 className="eyebrow mb-4">{title}</h3>
      {children}
    </motion.section>
  )
}

/** Case-study body shared by the modal and the full project page. */
export function ProjectDetails({ project }: { project: Project }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
      className="space-y-10"
    >
      <motion.div variants={block} className="flex flex-wrap gap-3">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-bg"
          >
            Visit live site
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line px-5 py-3 text-sm text-muted">
            {project.live ? 'Live link coming soon' : 'Live demo not public'}
          </span>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm">
            <GithubIcon className="h-4 w-4" /> Source code
          </a>
        )}
      </motion.div>

      <Block title="Project overview">
        <p className="text-lg leading-relaxed">{project.description}</p>
      </Block>

      <div className="grid gap-10 md:grid-cols-2">
        <Block title="Problem">
          <p className="text-muted">{project.problem}</p>
        </Block>
        <Block title="Solution">
          <p className="text-muted">{project.solution}</p>
        </Block>
      </div>

      <Block title={project.category === 'client' ? 'Highlights' : 'Main features'}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {project.features.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.03 }}
              className="flex items-start gap-3 rounded-xl bg-taupe/60 px-4 py-3 text-sm"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-lavender" />
              {f}
            </motion.li>
          ))}
        </ul>
      </Block>

      <div className="grid gap-10 md:grid-cols-2">
        <Block title="My contribution">
          <ul className="flex flex-wrap gap-2">
            {project.contribution.map((c) => (
              <li key={c} className="rounded-full border border-line px-4 py-2 text-sm">
                {c}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Technologies used">
          {project.tech.length ? (
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full bg-purple/50 px-4 py-2 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Technology details to be added.</p>
          )}
        </Block>
      </div>

      <Block title="Screenshots">
        {project.screenshots.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {project.screenshots.map((src, i) => (
              <motion.img
                key={src}
                src={asset(src)}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
                className="rounded-2xl border border-line"
                whileHover={{ scale: 1.02 }}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-dashed border-line p-6 text-sm text-muted">
            <ImageIcon className="h-5 w-5" /> Screenshots will be added soon.
          </div>
        )}
      </Block>
    </motion.div>
  )
}
