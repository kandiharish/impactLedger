export interface Story {
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  description: string;
  iconName: string; // Lucide icon mapping
}

export interface MagazineIssue {
  id?: string;
  _id?: string;
  issueNumber: string;
  title: string;
  month: string;
  year: string;
  coverImage: string;
  editorsNote: string;
  featuredArticles: string[];
  pdfUrl?: string;
  /** Folder holding the page images 01.webp, 02.webp, … for the in-site reader */
  pagesBaseUrl?: string;
  pageCount?: number;
  isTrending?: boolean;
  isMostRead?: boolean;
}

export interface Organization {
  id?: string;
  _id?: string;
  name: string;
  logo: string;
  category: string;
  location: string;
  impactSummary: string;
  description: string;
}

export interface Interview {
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export interface FAQItem {
  id?: string;
  _id?: string;
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

export const mockOrganizations: Organization[] = [];

// Individual stories from the published editions are added here (and later through the admin dashboard)
export const mockStories: Story[] = [];

// Published editions, newest first
export const mockMagazineIssues: MagazineIssue[] = [
  {
    id: 'vol-2-no-1',
    issueNumber: 'Vol. 2, No. 1',
    title: 'United by Purpose. Driven by Impact.',
    month: 'August',
    year: '2026',
    coverImage: '/magazines/vol-2-no-1/cover.webp',
    editorsNote: 'Some stories are meant to be read. Others are meant to be remembered. This edition brings a wider collection of impactful stories, fresh perspectives and journeys that deserve to be discovered.',
    featuredArticles: [
      'Arun Kumar: The Smile Behind the Struggle',
      'Dr. Nawab Mir Nasir Ali Khan: Diplomacy, Enterprise and a Vision for the Future',
      "The President's Train: From Royal Rails to a Modern Symbol of India",
      "E20 From Farm to Fuel: How Ethanol Is Reshaping India's Energy Future",
      'Heritage in Action: The American Telugu Association'
    ],
    pdfUrl: '/magazines/vol-2-no-1/the-impact-ledger-vol-2-no-1.pdf',
    pagesBaseUrl: '/magazines/vol-2-no-1/pages',
    pageCount: 60
  },
  {
    id: 'vol-1-no-1',
    issueNumber: 'Vol. 1, No. 1',
    title: 'Real Stories. Real People. Real Change.',
    month: 'July',
    year: '2026',
    coverImage: '/magazines/vol-1-no-1/cover.webp',
    editorsNote: 'It is with immense pride and gratitude that we welcome you to The Impact Ledger, a magazine dedicated to celebrating the people, organisations, and ideas that are shaping a better world.',
    featuredArticles: [
      'Ramky Foundation: Where Purpose Meets Progress',
      "The Akshaya Patra Foundation: Nourishing Young Minds, Transforming India's Future",
      "India's Golden July: A Remarkable Commonwealth Games Campaign",
      'The Golden Glow of Telangana: Unveiling the Mystic Art of Nirmal',
      'The Wayanad Tragedy: The Lessons for the Future'
    ],
    pdfUrl: '/magazines/vol-1-no-1/the-impact-ledger-vol-1-no-1.pdf',
    pagesBaseUrl: '/magazines/vol-1-no-1/pages',
    pageCount: 60
  }
];

export const mockInterviews: Interview[] = [];

export const mockTestimonials: Testimonial[] = [];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is The Impact Ledger?',
    answer: 'The Impact Ledger is a premium magazine dedicated to celebrating impact, innovation, leadership, and social progress. Through compelling stories, insightful features, and thought-provoking content, the magazine highlights individuals, organizations, and initiatives that are creating meaningful change across society.'
  },
  {
    id: 'faq2',
    question: 'What is the mission of The Impact Ledger?',
    answer: 'Our mission is to document, recognize, and amplify stories that inspire positive action. We aim to create a platform where achievements, ideas, and initiatives that contribute to social, economic, and environmental progress receive the visibility they deserve.'
  },
  {
    id: 'faq3',
    question: 'Who is The Impact Ledger designed for?',
    answer: 'The Impact Ledger is designed for business leaders, CSR professionals, NGOs, policymakers, educators, students, entrepreneurs, investors, changemakers, and readers who are passionate about impact, leadership, and sustainable development.'
  },
  {
    id: 'faq4',
    question: 'What kind of content does the magazine feature?',
    answer: 'Each edition features a curated mix of inspiring stories, expert perspectives, leadership insights, social impact features, community success stories, informative articles, engaging reader sections, and selected industry highlights that provide both knowledge and inspiration.'
  },
  {
    id: 'faq5',
    question: 'What topics does The Impact Ledger cover?',
    answer: 'The magazine covers a broad range of subjects including CSR, NGOs, education, healthcare, women empowerment, sustainability, environment, youth development, livelihoods, innovation, government initiatives, legal affairs, sports, entertainment, beauty and wellness, leadership, humanitarian efforts, and community development.'
  },
  {
    id: 'faq6',
    question: 'Is The Impact Ledger only focused on CSR and NGOs?',
    answer: 'No. While CSR and NGO initiatives are central to our publication, we also explore developments in business, governance, public policy, leadership, innovation, culture, and other sectors that contribute to societal growth and transformation.'
  },
  {
    id: 'faq7',
    question: 'Can organizations and individuals be featured in the magazine?',
    answer: 'Yes. We welcome submissions from corporations, NGOs, government institutions, educational organizations, social enterprises, community groups, and individual changemakers whose work demonstrates meaningful impact and excellence.'
  },
  {
    id: 'faq8',
    question: 'How can I submit a story or initiative for consideration?',
    answer: 'Stories, projects, achievements, and impact initiatives can be submitted through our editorial team for review. Selected submissions may be featured in upcoming editions based on relevance, credibility, and impact.'
  },
  {
    id: 'faq9',
    question: 'Is The Impact Ledger available in print?',
    answer: 'Yes. The Impact Ledger is published as a professionally curated magazine and is available through partner networks, and authorized distribution channels.'
  },
  {
    id: 'faq10',
    question: 'Does the magazine accept advertisements?',
    answer: 'Yes. The Impact Ledger collaborates with organizations, brands, institutions, and partners whose values align with innovation, responsibility, sustainability, and positive societal impact.'
  },
  {
    id: 'faq11',
    question: 'What is Corporate Social Responsibility (CSR)?',
    answer: 'Corporate Social Responsibility (CSR) is the commitment of businesses and organizations to contribute positively to society through initiatives that support education, healthcare, environmental sustainability, community welfare, and inclusive growth.'
  },
  {
    id: 'faq12',
    question: 'How does The Impact Ledger ensure content quality?',
    answer: 'Our editorial team carefully reviews all submissions and featured content to maintain high standards of accuracy, relevance, credibility, and editorial excellence.'
  },
  {
    id: 'faq13',
    question: 'What makes The Impact Ledger unique?',
    answer: 'The Impact Ledger combines impactful storytelling, insightful analysis, inspiring achievements, leadership perspectives, and engaging reader experiences into a single publication that informs, inspires, and celebrates progress.'
  },
  {
    id: 'faq14',
    question: 'What is the vision of The Impact Ledger?',
    answer: 'Our vision is to become a trusted and influential publication that connects people, organizations, and ideas while inspiring collective action toward a more inclusive, sustainable, and prosperous future.'
  },
  {
    id: 'faq15',
    question: 'How can I stay connected with The Impact Ledger?',
    answer: 'Readers can stay connected through special editions, partnerships, and our official communication channels for the latest stories, insights, and opportunities.'
  }
];
