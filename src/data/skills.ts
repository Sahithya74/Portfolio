export interface SkillGroup {
  id: string
  title: string
  blurb: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { id: 'programming', title: 'Programming', blurb: 'The languages I think in.', items: ['Python', 'Java', 'C'] },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Where ideas become interfaces.',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  { id: 'backend', title: 'Backend', blurb: 'The logic underneath.', items: ['Node.js', 'Flask', 'Spring Boot'] },
  { id: 'database', title: 'Database', blurb: 'Where the data lives.', items: ['MySQL'] },
  {
    id: 'ai',
    title: 'AI & Intelligent Tech',
    blurb: 'What I am exploring next.',
    items: [
      'AI-assisted development',
      'Machine learning fundamentals',
      'Generative AI tools',
      'RAG concepts',
      'AI-powered application development',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Design',
    blurb: 'My everyday toolkit.',
    items: ['Git', 'GitHub', 'Visual Studio Code', 'Claude', 'Google Stitch', 'Figma'],
  },
]

/** Short monogram shown inside each animated skill badge. */
export const skillGlyph: Record<string, string> = {
  Python: 'Py',
  Java: 'Jv',
  C: 'C',
  HTML: '<>',
  CSS: '{}',
  JavaScript: 'JS',
  React: '⚛',
  'Node.js': 'N',
  Flask: 'Fl',
  'Spring Boot': 'SB',
  MySQL: 'SQL',
  'AI-assisted development': 'AI',
  'Machine learning fundamentals': 'ML',
  'Generative AI tools': 'Gen',
  'RAG concepts': 'RAG',
  'AI-powered application development': '✦',
  Git: 'Git',
  GitHub: 'GH',
  'Visual Studio Code': 'VS',
  Claude: 'Cl',
  'Google Stitch': 'St',
  Figma: 'Fg',
}
