import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navLinks, personal } from '../../data/personal'
import { asset } from '../../lib/asset'
import { scrollToId } from '../../lib/scroll'
import { GithubIcon, LinkedinIcon } from '../Icons/Brand'
import { Marquee } from '../Motion/Marquee'

const year = new Date().getFullYear()

export function Footer() {
  const navigate = useNavigate()
  const onHome = useLocation().pathname === '/'
  const go = (id: string) => (onHome ? scrollToId(id) : navigate('/', { state: { scrollTo: id } }))

  const socials = [
    { href: personal.github, label: 'GitHub', Icon: GithubIcon },
    { href: personal.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    ...(personal.email ? [{ href: `mailto:${personal.email}`, label: 'Email', Icon: Mail }] : []),
  ]

  return (
    <footer className="relative overflow-hidden bg-[#29272D] pt-20 text-[#F5F0E8]">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-10" />
      <div className="container-x relative grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">
            Sahithya K<span className="text-[#B7A2C9]">.</span>
          </p>
          <p className="mt-3 max-w-xs text-[#C7C5CA]">Designed with curiosity. Built with purpose.</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-[#C7C5CA]">Navigate</p>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button type="button" onClick={() => go(l.id)} className="group relative py-1 text-[#F5F0E8]/80 transition-colors hover:text-[#D8C9E5]">
                  {l.label}
                  <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-[#B7A2C9] transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4 text-[#C7C5CA]">Connect</p>
          <div className="flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -6, rotate: -8 }}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors hover:border-[#B7A2C9] hover:bg-[#B7A2C9] hover:text-[#29272D]"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
          {personal.resume && (
            <a href={asset(personal.resume)} download className="mt-6 inline-block text-sm underline decoration-[#B7A2C9] underline-offset-4">
              Download résumé
            </a>
          )}
        </div>
      </div>

      <div className="relative mt-20 select-none" aria-hidden>
        <Marquee speed={1}>
          <span className="flex items-center pr-10 font-display text-[clamp(5rem,16vw,15rem)] leading-[0.9] [-webkit-text-stroke:1px_rgba(216,201,229,0.5)] text-transparent">
            Sahithya K. <span className="metal-text mx-10 not-italic">✦</span> Let&apos;s create
            <span className="metal-text mx-10">✦</span>
          </span>
        </Marquee>
      </div>

      <div className="container-x relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-[#C7C5CA]">
        <p>Sahithya K. | Designed with curiosity. Built with purpose.</p>
        <p>© {year} Sahithya K. All rights reserved.</p>
      </div>
    </footer>
  )
}
