import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SplitText } from '../components/Motion/SplitText'
import { ProjectDetails } from '../components/ProjectDetails/ProjectDetails'
import { ProjectArt } from '../components/Projects/ProjectArt'
import { projects } from '../data/projects'

export function ProjectPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    document.title = project ? `${project.title} — Case study · Sahithya K.` : 'Project not found · Sahithya K.'
    return () => {
      document.title = 'Sahithya K. — Creative Web Designer & Aspiring Software Developer'
    }
  }, [project])

  if (!project) {
    return (
      <main id="main" className="container-x grid min-h-screen place-items-center text-center">
        <div>
          <p className="display text-6xl">Project not found</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 underline">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="pb-24 pt-32">
      <div className="container-x">
        <Link to="/" state={{ scrollTo: 'work' }} className="group mb-10 inline-flex items-center gap-2 text-sm text-muted">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All projects
        </Link>
        <p className="eyebrow">
          {project.number} — {project.label}
        </p>
        <h1 className="display mt-4 text-[clamp(3.5rem,11vw,10rem)]">
          <SplitText key={project.slug} text={project.title} inView={false} hover />
        </h1>
        <motion.div
          key={`cover-${project.slug}`}
          className="my-14 aspect-[16/10] overflow-hidden rounded-[2rem] shadow-[var(--shadow)] md:aspect-[16/8]"
          initial={{ clipPath: 'inset(20% 10% 20% 10% round 32px)', opacity: 0 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <ProjectArt project={project} />
        </motion.div>
        <div className="mx-auto max-w-4xl">
          <ProjectDetails key={project.slug} project={project} />
        </div>

        <Link to={`/project/${next.slug}`} className="group mt-28 block border-t border-line pt-10" data-cursor="Next">
          <p className="eyebrow mb-3">Next project</p>
          <p className="display flex items-center gap-6 text-[clamp(2.5rem,8vw,7rem)] transition-colors group-hover:text-lavender">
            {next.title}
            <ArrowRight className="h-12 w-12 shrink-0 transition-transform duration-500 group-hover:translate-x-4" />
          </p>
        </Link>
      </div>
    </main>
  )
}
