export interface Story {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  publishedDate: string;
  readingTime: string;
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  organizationId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string; // Lucide icon mapping
}

export interface MagazineIssue {
  id: string;
  issueNumber: string;
  title: string;
  month: string;
  year: string;
  coverImage: string;
  editorsNote: string;
  featuredArticles: string[]; // Story titles
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  category: string;
  location: string;
  impactSummary: string;
  description: string;
}

export interface Interview {
  id: string;
  title: string;
  interviewee: string;
  position: string;
  organization: string;
  photo: string;
  quote: string;
  highlights: string[];
  questions: { q: string; a: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'CSR',
    slug: 'csr',
    description: 'Corporate Social Responsibility frameworks, partnerships, and high-impact corporate philanthropy.',
    iconName: 'Building2'
  },
  {
    id: '2',
    name: 'NGOs',
    slug: 'ngos',
    description: 'Grassroots achievements, field challenges, and updates from non-governmental entities.',
    iconName: 'HeartHandshake'
  },
  {
    id: '3',
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Rural medical camps, healthcare access, sanitation drives, and preventive medicine initiatives.',
    iconName: 'Activity'
  },
  {
    id: '4',
    name: 'Education',
    slug: 'education',
    description: 'Transformative digital literacy, child education programs, and infrastructure upgrades in rural schools.',
    iconName: 'GraduationCap'
  },
  {
    id: '5',
    name: 'Women Empowerment',
    slug: 'women-empowerment',
    description: 'Self-help groups, micro-financing, skill building, and leadership journeys of women changemakers.',
    iconName: 'Users'
  },
  {
    id: '6',
    name: 'Environment',
    slug: 'environment',
    description: 'Aforestation drives, waste management projects, renewable energy transition, and conservation efforts.',
    iconName: 'Leaf'
  }
];

export const mockOrganizations: Organization[] = [
  {
    id: 'org1',
    name: 'Himalayan Seed Trust',
    logo: '🌱',
    category: 'Environment',
    location: 'Uttarakhand, India',
    impactSummary: 'Restored over 450 hectares of depleted pine forests with native broadleaved oak species.',
    description: 'The Himalayan Seed Trust works with local mountain communities to restore native vegetation, ensuring water security and ecological balance in the lower Himalayan ridges.'
  },
  {
    id: 'org2',
    name: 'Pragati Shikshan Sansthan',
    logo: '📚',
    category: 'Education',
    location: 'Bihar, India',
    impactSummary: 'Established 78 digital learning hubs inside government schools, benefiting 12,000+ students.',
    description: 'Pragati Shikshan Sansthan bridges the digital divide in rural schools by deploying low-cost solar-powered computer labs and localized digital curricula.'
  },
  {
    id: 'org3',
    name: 'Niramaya Health Coalition',
    logo: '🏥',
    category: 'Healthcare',
    location: 'Rajasthan, India',
    impactSummary: 'Delivered clean maternal healthcare services to 45 remote desert hamlets through mobile clinics.',
    description: 'Niramaya Health Coalition deploys custom all-terrain medical vans staffed with nurses and diagnostics to bring vital maternal care to rural desert populations.'
  }
];

export const mockStories: Story[] = [
  {
    id: 'story1',
    title: 'The Green Rebirth of the Himalayan Ridges',
    slug: 'green-rebirth-himalayan-ridges',
    summary: 'How community-led seed banks and traditional oak planting are bringing drying water springs back to life across rural Uttarakhand.',
    content: `For decades, the standard narrative from the lower Himalayan ridge of Uttarakhand was one of ecological distress. Rapid deforestation combined with the monoculture of fire-prone pine forests had depleted local water tables, drying up ancient mountain springs (known locally as Naulas). 
    
    But in early 2021, the Himalayan Seed Trust initiated a community forestry movement. Instead of relying on top-down government plantations, they empowered local village councils—particularly women-led Mahila Mangal Dals—to establish local seed collection networks. By collecting and nurturing seeds of native broadleaved trees like the Banj Oak (Quercus leucotrichophora), they introduced a resilient ecosystem that holds rainwater and recharges groundwater tables.
    
    Today, over 450 hectares have been reforested. More importantly, seven historically dry mountain springs are flowing again, securing drinking water for over 3,000 mountain households. The restoration has not only saved local biodiversity but has also created a sustainable model of community land stewardship.`,
    category: 'Environment',
    author: {
      name: 'Aarav Mehta',
      role: 'Environmental Journalist',
      avatar: 'AM'
    },
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    publishedDate: 'June 18, 2026',
    readingTime: '5 min read',
    isFeatured: true,
    organizationId: 'org1'
  },
  {
    id: 'story2',
    title: 'Solar Pixels: Rural Classrooms Go Digital',
    slug: 'solar-pixels-rural-classrooms-digital',
    summary: 'A solar-powered classroom initiative in Bihar is defying power grid limitations and transforming student attendance rates.',
    content: `In the remote villages of northern Bihar, grid electricity is notoriously intermittent. For schools trying to prepare children for a digital future, this meant computer labs stood empty, accumulating dust. 
    
    Pragati Shikshan Sansthan decided to tackle the energy and infrastructure bottleneck simultaneously. Launching the "Solar Pixels" project, they designed self-sustaining, modular digital learning kiosks. Each kiosk is powered by two roof-mounted 350W solar panels and backed by a local lithium battery system, ensuring 8 hours of uninterrupted power.
    
    Equipped with off-line educational servers pre-loaded with interactive science, mathematics, and language curricula in regional languages, these labs run independently of the internet. In the 78 government schools where these labs have been set up, student attendance has soared by 34%, and local teachers report a dramatic increase in basic digital literacy scores.`,
    category: 'Education',
    author: {
      name: 'Shreya Iyer',
      role: 'Editorial Lead',
      avatar: 'SI'
    },
    featuredImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    publishedDate: 'June 25, 2026',
    readingTime: '4 min read',
    isEditorsPick: true,
    organizationId: 'org2'
  },
  {
    id: 'story3',
    title: 'The Mobile Healing Vans of Thar Desert',
    slug: 'mobile-healing-vans-thar-desert',
    summary: 'Niramaya Health Coalition is using off-grid mobile clinics to slash maternal mortality rates in desert communities.',
    content: `Living in remote settlements within the Thar Desert means the nearest hospital can be up to 70 kilometers away across sandy, roadless terrain. For pregnant women, this distance has historically resulted in high-risk home deliveries and elevated mortality rates.
    
    The Mobile Healing Vans program, launched by Niramaya Health Coalition, acts as a moving hospital. Utilizing customized 4x4 vehicles, the vans carry portable ultrasound machines, blood testing kits, and essential medicines directly to desert hamlets.
    
    Supported by local auxiliary nurse midwives (ANMs), these vans visit each village twice a month, providing regular prenatal checkups, nutritional supplements, and emergency transport arrangements. Over the past three years, institutional delivery rates in the targeted areas have risen from 22% to 89%, saving hundreds of mothers and newborns.`,
    category: 'Healthcare',
    author: {
      name: 'Dr. Rohan Sen',
      role: 'Public Health Analyst',
      avatar: 'RS'
    },
    featuredImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    publishedDate: 'June 29, 2026',
    readingTime: '6 min read',
    isEditorsPick: true,
    organizationId: 'org3'
  },
  {
    id: 'story4',
    title: 'Weaving Independence: The Loom Revolution of Barmer',
    slug: 'weaving-independence-loom-revolution-barmer',
    summary: 'A micro-finance collective is enabling rural women artisans to break free from local middlemen and sell textiles globally.',
    content: `Barmer's traditional hand-loomed textiles have always been prized, yet the women weavers who create them rarely saw fair returns, trapped by exploitative networks of local traders. 
    
    A self-help group coalition stepped in to establish direct artisan-to-market channels, providing micro-loans for modern loom attachments and training in inventory management. Today, the collective represents over 600 women, who earn three times their historical daily wages and export authentic organic cotton rugs internationally.`,
    category: 'Women Empowerment',
    author: {
      name: 'Aditi Rao',
      role: 'Art & Culture Contributor',
      avatar: 'AR'
    },
    featuredImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    publishedDate: 'June 10, 2026',
    readingTime: '4 min read',
    isFeatured: false
  }
];

export const mockMagazineIssues: MagazineIssue[] = [
  {
    id: 'mag1',
    issueNumber: 'Vol. 12',
    title: 'The Green Standard',
    month: 'June',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    editorsNote: 'In this edition, we turn our spotlight on the innovators rewriting our ecological contract. From community seed bank networks to industrial scale solar transitions, the grass roots are leading the way.',
    featuredArticles: [
      'The Green Rebirth of the Himalayan Ridges',
      'Solar Pixels: Rural Classrooms Go Digital',
      'The Mobile Healing Vans of Thar Desert'
    ]
  },
  {
    id: 'mag2',
    issueNumber: 'Vol. 11',
    title: 'Bridges of Empowerment',
    month: 'March',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    editorsNote: 'Empowerment begins with agency. This issue celebrates the women-led cooperatives and educational reforms breaking generational cycle barriers across developing regions.',
    featuredArticles: [
      'Weaving Independence: The Loom Revolution of Barmer'
    ]
  }
];

export const mockInterviews: Interview[] = [
  {
    id: 'int1',
    title: 'Local Action Beats Global Rhetoric',
    interviewee: 'Sunita Devi',
    position: 'Founder',
    organization: 'Himalayan Seed Trust',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    quote: 'We spent decades waiting for climate treaties to solve mountain water problems. The answer was in our native seeds all along.',
    highlights: [
      'Mobilized 800+ women to create local broadleaf seed nurseries.',
      'Recharged 7 ancient mountain springs that had been dry for over a decade.',
      'Developed a scalable, community-managed forestry model.'
    ],
    questions: [
      {
        q: 'What led you to prioritize native oaks over fast-growing pines?',
        a: 'Pine forests are commercial but they do not retain soil moisture and their needles cause massive forest fires. Native broadleaved oaks act like massive sponges; their deep roots hold water and enrich soil ecosystems.'
      },
      {
        q: 'How did you convince local villagers to participate?',
        a: 'By linking ecological restoration to direct livelihood and water security. When women do not have to walk 5 kilometers daily for a bucket of water, the incentive to protect the forest becomes permanent.'
      }
    ]
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'The Impact Ledger does not just write articles—they provide deep, investigative narratives that give our grassroots efforts national visibility and credibility.',
    author: 'Sunita Devi',
    role: 'Director',
    organization: 'Himalayan Seed Trust'
  },
  {
    id: 't2',
    quote: 'As a CSR committee member, this publication is our primary source of inspiration. It shows what is actually working in field implementations.',
    author: 'Vikramaditya Shah',
    role: 'CSR Chair',
    organization: 'Apex Industrial Corp'
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is The Impact Ledger?',
    answer: 'The Impact Ledger is a premium editorial publication dedicated to documenting, celebrating, and amplifying stories of change, leadership, and sustainability across NGOs, CSR initiatives, and grassroots movements.'
  },
  {
    id: 'faq2',
    question: 'How can our organization submit a story of impact?',
    answer: 'You can submit stories using our "Submit Your Story" portal. Submissions undergo thorough editorial review for authenticity, measurable impact, and community engagement before publication.'
  },
  {
    id: 'faq3',
    question: 'Is The Impact Ledger a print or digital publication?',
    answer: 'We operate primarily as a digital publication releasing monthly thematic editions, with special print editions distributed annually to corporate, NGO, and government stakeholders.'
  },
  {
    id: 'faq4',
    question: 'Do you charge organizations for featuring their stories?',
    answer: 'No. Authentic editorial stories are covered purely on merit, impact, and journalistic value. We generate revenue through partnerships, newsletter sponsorships, and premium advertisements.'
  }
];
