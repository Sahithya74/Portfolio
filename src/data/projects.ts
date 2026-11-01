/**
 * Project data — edit freely.
 *  - `tech`: add the real technologies used; an empty list shows "To be added".
 *  - `screenshots`: put image files in /public/projects/ and list their paths,
 *    e.g. ['/projects/ledplanet-home.jpg']. Empty shows a labelled placeholder.
 *  - `url` / `github`: empty strings hide the buttons.
 */
export type ProjectCategory = 'client' | 'enterprise' | 'edtech'

export interface Project {
  slug: string
  number: string
  title: string
  category: ProjectCategory
  label: string
  url: string
  github: string
  live: boolean
  description: string
  problem: string
  solution: string
  features: string[]
  contribution: string[]
  tech: string[]
  screenshots: string[]
  /** Two-colour accent used for the generated cover art (not a screenshot). */
  accent: [string, string]
}

export const categories: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'client', label: 'Client Websites' },
  { id: 'enterprise', label: 'Enterprise Applications' },
  { id: 'edtech', label: 'Educational Technology' },
]

export const projects: Project[] = [
  {
    slug: 'ledplanet',
    number: '01',
    title: 'LEDPlanet',
    category: 'client',
    label: 'Client Website · Live Project',
    url: 'https://ledplanet.in',
    github: '',
    live: true,
    description:
      'A client-oriented website designed and developed according to the specific requirements and expectations of the client.',
    problem:
      'The client needed an online presence shaped around their own specific requirements and expectations.',
    solution:
      'A website planned from the client’s requirements, with a clear layout and structure, a considered UI/UX and a responsive build, deployed live.',
    features: [
      'Client requirement analysis',
      'Website layout and structure',
      'UI/UX design',
      'Responsive development',
      'Live deployment',
    ],
    contribution: ['Requirement analysis', 'Layout and UI/UX design', 'Responsive development', 'Deployment'],
    tech: [],
    screenshots: [],
    accent: ['#B7A2C9', '#F5F0E8'],
  },
  {
    slug: 'solar-galaxy',
    number: '02',
    title: 'Solar Galaxy',
    category: 'client',
    label: 'Client Website · Live Project',
    url: 'https://solarrgalaxy.in',
    github: '',
    live: true,
    description:
      'A client-focused website developed to present the business and its offerings through a structured digital experience.',
    problem: 'The business needed a structured way to present itself and its offerings online.',
    solution:
      'A requirement-based website with a business-oriented presentation and a responsive interface, deployed live.',
    features: [
      'Requirement-based website design',
      'Responsive implementation',
      'Business-oriented presentation',
      'UI/UX development',
      'Live deployment',
    ],
    contribution: ['Website design', 'UI/UX development', 'Responsive implementation', 'Deployment'],
    tech: [],
    screenshots: [],
    accent: ['#D8C9E5', '#EAE3DA'],
  },
  {
    slug: 'ilamthalir',
    number: '03',
    title: 'Ilamthalir',
    category: 'client',
    label: 'Client Website · Live Project',
    url: '', // add the live domain here when available
    github: '',
    live: true,
    description: 'A website designed and developed according to the client’s vision and specific requirements.',
    problem: 'The client had a specific vision for their website and needed it translated into a working site.',
    solution: 'A client-specific design built into a responsive, user-friendly website, deployed live.',
    features: [
      'Client-specific design',
      'Website development',
      'Responsive interface',
      'User-friendly structure',
      'Live deployment',
    ],
    contribution: ['Client-specific design', 'Website development', 'Responsive interface', 'Deployment'],
    tech: [],
    screenshots: [],
    accent: ['#C7C5CA', '#D8C9E5'],
  },
  {
    slug: 'sigaram-creative',
    number: '04',
    title: 'Sigaram Creative',
    category: 'client',
    label: 'Client Website · Live Project',
    url: 'https://sigaramcreative.in',
    github: '',
    live: true,
    description:
      'A client website for Sigaram, a digital marketing agency, designed and developed around the client’s requirements and hosted live.',
    problem: 'The agency needed an online presence that reflects its brand and introduces it to prospective clients.',
    solution:
      'A website designed to the client’s requirements, built as a responsive interface and deployed on a live server.',
    features: [
      'Client requirement analysis',
      'Brand-focused website design',
      'UI/UX design',
      'Responsive development',
      'Live deployment',
    ],
    contribution: ['Requirement analysis', 'Website design', 'Responsive development', 'Deployment'],
    tech: [],
    screenshots: [],
    accent: ['#D8C9E5', '#B7A2C9'],
  },
  {
    slug: 'transaxis',
    number: '05',
    title: 'TransAxis',
    category: 'enterprise',
    label: 'Enterprise Application · Transport Fleet Management',
    url: '',
    github: '',
    live: false,
    description:
      'An enterprise-oriented transport fleet management platform designed to centralize transportation operations, vehicle management, driver information and financial tracking.',
    problem:
      'Transport operations — vehicles, drivers, loads, trips and money — are often tracked in scattered places, making it hard to see the whole picture.',
    solution:
      'One platform that centralizes fleet operations, people, trips and finances, with an administrative dashboard and operational analytics.',
    features: [
      'Fleet management',
      'Vehicle records',
      'Driver and employee management',
      'Load allocation',
      'Origin and destination management',
      'Trip monitoring',
      'Estimated return-time tracking',
      'Driver safety monitoring',
      'Cash advances and load-related payments',
      'Revenue and expenses',
      'Profit and loss reports',
      'Administrative dashboard',
      'Operational analytics',
    ],
    contribution: ['Platform design', 'Application development'],
    tech: [],
    screenshots: [],
    accent: ['#39343D', '#B7A2C9'],
  },
  {
    slug: 'labops',
    number: '06',
    title: 'LabOps',
    category: 'edtech',
    label: 'Smart Lab Monitoring · Educational Technology',
    url: '',
    github: '',
    live: false,
    description:
      'A smart laboratory monitoring platform designed for schools and colleges to provide centralized visibility and administration of computer laboratories.',
    problem:
      'Schools and colleges need a clear, central view of their computer laboratories and the systems inside them.',
    solution:
      'A centralized admin dashboard backed by a monitoring agent, giving institution-level visibility of lab computers and their status.',
    features: [
      'Centralized admin dashboard',
      'Laboratory computer monitoring',
      'Computer availability',
      'Lab management',
      'Student system monitoring',
      'System status overview',
      'Monitoring agent communication',
      'Institution-level management',
    ],
    contribution: ['Platform design', 'Application development'],
    tech: [],
    screenshots: [],
    accent: ['#B7A2C9', '#29272D'],
  },
  {
    slug: 'siteledger',
    number: '07',
    title: 'SiteLedger',
    category: 'enterprise',
    label: 'Enterprise Application · Civil Engineering Management',
    url: '',
    github: '',
    live: false,
    description:
      'An integrated construction project monitoring and accounting platform designed to manage civil engineering operations, resources, workforce and financial activities.',
    problem:
      'Construction projects juggle sites, materials, suppliers, labour and payments at once, which is hard to monitor and account for.',
    solution:
      'An integrated platform for project monitoring and accounting, covering resources, workforce and finances with project-wise summaries.',
    features: [
      'Project registration',
      'Ongoing and pending work monitoring',
      'Construction site management',
      'Stone, sand, steel and granite management',
      'Supplier information',
      'Labour management',
      'Attendance and wages',
      'Site engineer management',
      'Food and operational expenses',
      'Project quotations',
      'Client payments',
      'Pending balances',
      'Bank transaction tracking',
      'Revenue and expenditure',
      'Project-wise financial summaries',
    ],
    contribution: ['Platform design', 'Application development'],
    tech: [],
    screenshots: [],
    accent: ['#EAE3DA', '#77717B'],
  },
]
