import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { personal } from '../../data/personal'
import { GithubIcon, LinkedinIcon } from '../Icons/Brand'
import { Magnetic } from '../Motion/Magnetic'
import { MorphBlob } from '../Motion/MorphBlob'
import { Reveal } from '../Motion/Reveal'
import { SectionHeading } from '../Motion/SectionHeading'

const enquiryTypes = [
  'Website Design',
  'Web Application Development',
  'AI-Based Projects',
  'Technical Collaboration',
  'Other Enquiries',
]

type Fields = { name: string; email: string; subject: string; message: string; category: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message?: string }

const empty: Fields = { name: '', email: '', subject: '', message: '', category: '' }
const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)?.trim() ?? ''

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (!f.category) e.category = 'Please choose an enquiry type.'
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (f.message.trim().length < 20) e.message = 'Please write at least 20 characters.'
  if (f.message.length > 5000) e.message = 'Please keep the message under 5000 characters.'
  return e
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = 'text',
  textarea = false,
  autoComplete,
}: {
  id: keyof Fields
  label: string
  value: string
  error?: string
  onChange: (v: string) => void
  type?: string
  textarea?: boolean
  autoComplete?: string
}) {
  const [focused, setFocused] = useState(false)
  const raised = focused || value.length > 0
  const common = {
    id,
    name: id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: 'peer w-full bg-transparent pb-3 pt-7 text-lg outline-none focus-visible:outline-none',
    required: true,
  }
  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-0 origin-left text-muted"
        animate={{ y: raised ? 0 : 28, scale: raised ? 0.78 : 1, color: focused ? 'var(--lavender)' : 'var(--muted)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {label}
      </motion.label>
      {textarea ? <textarea rows={5} {...common} className={`${common.className} resize-none`} /> : <input type={type} autoComplete={autoComplete} {...common} />}
      <span className="absolute bottom-0 left-0 h-px w-full bg-line" />
      <motion.span
        className="metal-bg absolute bottom-0 left-0 h-[2px] w-full origin-left"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="mt-2 flex items-center gap-1.5 text-sm text-[#a5486a]"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto', x: [0, -6, 6, -3, 0] }}
            exit={{ opacity: 0, y: -6, height: 0 }}
          >
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [botcheck, setBotcheck] = useState(false)

  const set = (k: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    if (!ACCESS_KEY) {
      setStatus({
        kind: 'error',
        message: 'The contact form is not connected yet, so your message was not sent. Please reach out on LinkedIn for now.',
      })
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `[Portfolio · ${fields.category}] ${fields.subject.trim()}`,
          from_name: 'Sahithya K. Portfolio',
          name: fields.name.trim(),
          email: fields.email.trim(),
          enquiry_type: fields.category,
          message: fields.message.trim(),
          botcheck,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
      if (res.ok && data.success) {
        setStatus({ kind: 'success', message: 'Thank you! Your message has been delivered — I’ll get back to you soon.' })
        setFields(empty)
      } else {
        setStatus({ kind: 'error', message: data.message || `Sending failed (status ${res.status}). Please try again.` })
      }
    } catch {
      setStatus({ kind: 'error', message: 'Network error — your message was not sent. Please check your connection and try again.' })
    }
  }

  const socials = [
    { href: personal.github, label: 'GitHub', handle: '@Sahithya74', Icon: GithubIcon },
    { href: personal.linkedin, label: 'LinkedIn', handle: 'sahithyakuppusamy', Icon: LinkedinIcon },
    ...(personal.email ? [{ href: `mailto:${personal.email}`, label: 'Email', handle: personal.email, Icon: Mail }] : []),
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] opacity-40 blur-3xl">
        <MorphBlob id="contact" className="h-full w-full" duration={18} />
      </div>
      <div aria-hidden className="pointer-events-none absolute -left-10 bottom-20 hidden lg:block">
        {['✦', '◯', '△'].map((s, i) => (
          <span
            key={s}
            className="animate-float absolute font-display text-4xl text-lavender/70"
            style={{ left: i * 70, top: i * -90, ['--dur' as string]: `${5 + i}s`, ['--delay' as string]: `${i * 0.6}s` }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="contact-title"
          index="09"
          eyebrow="Contact"
          title="Have an Idea? Let's Build Something."
          accent="Let's Build Something."
          intro="I'm always interested in exploring new ideas, collaborating on meaningful projects and connecting with people who share an enthusiasm for technology and creativity."
        />

        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-4">
            <ul className="space-y-3">
              {socials.map(({ href, label, handle, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-bg"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-purple/50 transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs uppercase tracking-widest opacity-60">{label}</span>
                      <span className="break-all">{handle}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-2xl italic text-muted">Ideas welcome — big, small or still half-formed.</p>
          </Reveal>

          <Reveal variant="up" delay={0.1} className="lg:col-span-8">
            <form noValidate onSubmit={submit} className="glass relative rounded-[2rem] p-6 shadow-[var(--shadow)] md:p-10" aria-describedby="form-status">
              <fieldset className="mb-8">
                <legend className="eyebrow mb-4">What is this about?</legend>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-invalid={!!errors.category} aria-describedby={errors.category ? 'category-error' : undefined}>
                  {enquiryTypes.map((t, i) => {
                    const selected = fields.category === t
                    return (
                      <label key={t} className="relative cursor-pointer">
                        <input
                          id={i === 0 ? 'category' : undefined}
                          type="radio"
                          name="category"
                          value={t}
                          checked={selected}
                          onChange={() => set('category')(t)}
                          className="peer sr-only"
                        />
                        <motion.span
                          whileTap={{ scale: 0.93 }}
                          className={`block rounded-full border px-4 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-lavender ${
                            selected ? 'border-ink bg-ink text-bg' : 'border-line hover:border-lavender'
                          }`}
                        >
                          {t}
                        </motion.span>
                      </label>
                    )
                  })}
                </div>
                <AnimatePresence>
                  {errors.category && (
                    <motion.p id="category-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-[#a5486a]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.category}
                    </motion.p>
                  )}
                </AnimatePresence>
              </fieldset>

              <div className="grid gap-8 md:grid-cols-2">
                <Field id="name" label="Your name" value={fields.name} error={errors.name} onChange={set('name')} autoComplete="name" />
                <Field id="email" label="Email address" type="email" value={fields.email} error={errors.email} onChange={set('email')} autoComplete="email" />
              </div>
              <div className="mt-8 space-y-8">
                <Field id="subject" label="Subject" value={fields.subject} error={errors.subject} onChange={set('subject')} />
                <Field id="message" label="Tell me about your idea" textarea value={fields.message} error={errors.message} onChange={set('message')} />
              </div>

              {/* Honeypot for spam bots */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" checked={botcheck} onChange={(e) => setBotcheck(e.target.checked)} />

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status.kind === 'sending'}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 text-bg disabled:opacity-70"
                  >
                    <span className="metal-bg absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-150" />
                    <span className="relative z-10 group-hover:text-[#29272D]">{status.kind === 'sending' ? 'Sending…' : 'Send message'}</span>
                    <span className="relative z-10 group-hover:text-[#29272D]">
                      {status.kind === 'sending' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                    </span>
                  </button>
                </Magnetic>
                <p className="text-sm text-muted">{fields.message.length} / 5000</p>
              </div>

              <div id="form-status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {(status.kind === 'success' || status.kind === 'error') && (
                    <motion.div
                      key={status.kind + (status.message ?? '')}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-8 flex items-start gap-3 rounded-2xl p-5 ${status.kind === 'success' ? 'bg-purple/50' : 'bg-[#a5486a]/10 text-[#8a3a58] dark:text-[#e7a1bc]'}`}
                    >
                      <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.1 }}>
                        {status.kind === 'success' ? <CheckCircle2 className="h-6 w-6 text-plum" /> : <AlertCircle className="h-6 w-6" />}
                      </motion.span>
                      <p>{status.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
