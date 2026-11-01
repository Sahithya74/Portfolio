import profile from '../assets/profile.jpg'

/**
 * Personal details. Anything left empty ('') is hidden on the site
 * until you fill it in.
 */
export const personal = {
  name: 'Sahithya K.',
  firstName: 'Sahithya',
  initials: 'SK',
  roles: [
    'Creative Web Designer',
    'Aspiring Software Developer',
    'AI Enthusiast',
    'Technology Explorer',
    'Digital Product Builder',
  ],
  headline: 'Designing Experiences. Building Possibilities.',
  description:
    'An enthusiastic technology explorer passionate about web design, software development, AI-powered solutions and creating meaningful digital experiences.',
  quote:
    "I don't just explore technology. I turn curiosity into creativity, ideas into interfaces, and possibilities into products.",
  supporting: 'Learning the tools of tomorrow, building the solutions of today.',
  photo: profile,
  photoAlt: 'Portrait of Sahithya K. smiling, standing at a hillside viewpoint at sunset',
  github: 'https://github.com/Sahithya74',
  linkedin: 'https://www.linkedin.com/in/sahithyakuppusamy/',
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? '',
  /** Path to a resume PDF placed in /public, e.g. '/Sahithya-K-Resume.pdf'. Empty hides the button. */
  resume: '',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
]

export const aboutParagraphs = [
  "I'm Sahithya K., a Computer Science and Engineering student with a growing passion for technology, creative design and software development.",
  'My journey into computer science has been an ongoing process of exploration, experimentation and learning.',
  'I enjoy understanding how technology works and, more importantly, how it can be used to solve practical problems.',
  'From designing client-oriented websites to developing enterprise-level management platforms, I enjoy working on ideas that combine functionality, usability and thoughtful design.',
  "I'm particularly interested in artificial intelligence, modern development tools, full-stack development and building digital products that make everyday processes smarter and simpler.",
  'I believe in learning by building, experimenting with emerging technologies and continuously improving my skills.',
]

export const aboutCategories = [
  {
    title: 'What I Create',
    icon: 'create',
    items: ['Client-oriented websites', 'Responsive interfaces', 'Management platforms', 'Thoughtful UI/UX layouts'],
  },
  {
    title: 'What I Explore',
    icon: 'explore',
    items: ['Artificial intelligence', 'Modern development tools', 'Full-stack development', 'Emerging technologies'],
  },
  {
    title: 'What Inspires Me',
    icon: 'inspire',
    items: ['Solving practical problems', 'Learning by building', 'Making processes simpler', 'Art, rhythm and discipline'],
  },
] as const

export const philosophy = [
  'Learn continuously.',
  'Build with purpose.',
  'Experiment without fear.',
  'Design with intention.',
  'Solve real-world problems.',
  'Grow through every project.',
]

export const beyondTraits = ['Creativity', 'Discipline', 'Consistency', 'Dedication', 'Continuous improvement']
