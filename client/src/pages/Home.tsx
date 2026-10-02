import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Heart, Shield, Award, Landmark } from 'lucide-react';
import { api } from '../api';
import { mockMagazineIssues } from '../data/mockData';
import TeamBook from '../components/ui/TeamBook';
import ImpactMap from '../components/ui/ImpactMap';
import { Reveal, SectionHeading, SplitHeading } from '../components/ui/Reveal';
import CategoryTicker from '../components/home/CategoryTicker';
import FeaturedStories from '../components/home/FeaturedStories';
import SpotlightInterview from '../components/home/SpotlightInterview';

const EASE = [0.16, 1, 0.3, 1] as const;

const IDEOLOGY = [
  { title: "Documenting Journeys", desc: "Every edition brings together remarkable journeys of leadership, innovation, and community transformation." },
  { title: "Broad Spectrum", desc: "We explore subjects that shape society, including healthcare, education, women empowerment, sustainability, and legal affairs." },
  { title: "Quiet Leadership", desc: "Celebrating those whose work often happens quietly but whose impact is felt for generations." },
  { title: "Inspiring Tomorrow", desc: "Connecting changemakers and readers to build a culture where positive action inspires future leaders." }
];

const FOCUS_AREAS = [
  { title: "NGO & Grassroots", desc: "Celebrating direct achievements, field challenges, and operational breakthroughs of field organizations.", icon: Heart },
  { title: "CSR Initiatives", desc: "Investigating corporate commitment to healthcare, education, environmental welfare, and sustainability.", icon: Landmark },
  { title: "Empowerment & Justice", desc: "Documenting self-help groups, microfinance success, gender parity, and legal reforms.", icon: Shield },
  { title: "Innovation & Governance", desc: "Analyzing policy reforms, social enterprise strategies, and next-gen humanitarian designs.", icon: Award }
];

const FAQ_TABS = [
  { id: 'about', label: 'About & Vision' },
  { id: 'submissions', label: 'Editorial & Submissions' },
  { id: 'standards', label: 'Distribution & Standards' }
] as const;

type FaqTab = typeof FAQ_TABS[number]['id'];

// --- FAQ Accordion Item ---
const FAQAccordionItem = ({ faq, index, isOpen, onToggle }: { faq: any, index: number, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className={`rounded-2xl border transition-all duration-500 ${isOpen ? 'bg-white border-accent/30 shadow-[var(--shadow-soft)]' : 'bg-white/40 border-transparent hover:bg-white/70 hover:border-line'}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center text-left gap-5 px-6 md:px-8 py-6 group"
      >
        <span className={`font-heading italic text-2xl w-8 shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-stone-300 group-hover:text-accent'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 text-lg md:text-xl font-serif text-ink font-medium leading-snug">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${isOpen ? 'bg-ink border-ink text-white' : 'border-stone-300 text-stone-500 group-hover:border-accent group-hover:text-accent'}`}
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pl-[4.75rem] md:pl-[5.25rem] pr-6 md:pr-16 pb-7 -mt-1 text-stone-600 font-sans font-light leading-relaxed text-[15px] md:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const { data: magazineIssues = mockMagazineIssues } = useQuery({ queryKey: ['magazineIssues'], queryFn: () => api.getMagazineIssues() });
  const { data: faqs = [] } = useQuery({ queryKey: ['faqs'], queryFn: () => api.getFAQs() });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeFaqTab, setActiveFaqTab] = useState<FaqTab>('about');

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Categorize FAQs based on their indices/content
  const getCategorizedFAQs = () => {
    if (activeFaqTab === 'about') {
      // FAQs: 1, 2, 3, 13, 14, 15
      return faqs.filter((_, idx) => [0, 1, 2, 12, 13, 14].includes(idx));
    } else if (activeFaqTab === 'submissions') {
      // FAQs: 4, 5, 6, 7, 8
      return faqs.filter((_, idx) => [3, 4, 5, 6, 7].includes(idx));
    } else {
      // FAQs: 9, 10, 11, 12
      return faqs.filter((_, idx) => [8, 9, 10, 11].includes(idx));
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden text-ink bg-transparent">

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[680px] flex flex-col justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY }}>
          <motion.img
            src="/ChatGPT Image Jul 22, 2026, 03_34_46 PM.png"
            alt=""
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 2.4, ease: EASE }}
            className="w-full h-full object-cover object-[70%_center]"
          />
          {/* Ivory wash — strongest behind the headline, clearing towards the image on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper from-15% via-paper/75 via-45% to-paper/0" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/40" />
        </motion.div>

        <motion.div style={{ y: heroTextY, opacity: heroFade }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            className="mb-8 inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-line rounded-full pl-1.5 pr-5 py-1.5 shadow-[var(--shadow-soft)]"
          >
            <span className="relative bg-ink text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping-slow" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-accent" />
              </span>
              Digest
            </span>
            <span className="text-[13px] text-stone-700 font-sans font-medium">The Premium Magazine of Social Impact</span>
          </motion.div>

          <SplitHeading
            as="h1"
            animateOnMount
            delay={0.45}
            text="Documenting Stories That Change The World"
            className="display-title italic text-[3.25rem] sm:text-7xl lg:text-[6.75rem] max-w-5xl"
          />

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 1.2, ease: EASE }}
            className="mt-10 h-px w-40 origin-left bg-gradient-to-r from-accent to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
            className="mt-8 text-lg md:text-xl text-stone-600 max-w-2xl font-sans font-light leading-relaxed"
          >
            Discover the universe of positive transformation. Our pioneering journalism and breakthrough editorials bring grassroots initiatives within reach-secure, verified, and extraordinary.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9, ease: EASE }} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/stories" className="btn btn-dark btn-shine btn-arrow-up !px-8 !py-4 md:!text-base">
              Explore Editorial <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* --- FIELDS OF IMPACT TICKER --- */}
      <CategoryTicker />

      {/* --- FEATURED + EDITOR'S PICKS --- */}
      <FeaturedStories />

      {/* --- SECTION 1: ABOUT US (Ideology cards/points instead of wall of text) --- */}
      <section className="relative py-24 md:py-32 border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">

            <div className="lg:col-span-5 space-y-7 lg:sticky lg:top-32 self-start">
              <Reveal y={12}><span className="eyebrow">The Ideology</span></Reveal>
              <SplitHeading
                text="Every Impact Deserves to Be Remembered"
                className="font-heading italic text-5xl md:text-6xl text-ink leading-[1.02]"
              />
              <Reveal delay={0.2}>
                <p className="lede text-[17px]">
                  The Impact Ledger was founded on a simple yet powerful belief-that every act of impact deserves to be seen, celebrated, and remembered. We serve as a record of purpose, perseverance, and progress.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {IDEOLOGY.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className={idx % 2 === 1 ? 'sm:translate-y-10' : ''}>
                  <div className="card card-hover gold-edge group p-8 h-full">
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-heading italic text-4xl text-accent/70 group-hover:text-accent transition-colors">0{idx + 1}</span>
                      <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-stone-400 group-hover:bg-ink group-hover:text-white group-hover:border-ink transition-all duration-500">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-ink mb-3">{item.title}</h3>
                    <p className="text-sm text-stone-600 font-sans font-light leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: focus areas (The application focus) --- */}
      <section className="relative py-24 md:py-32 bg-white/50 border-y border-line">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-16">
          <SectionHeading
            align="center"
            eyebrow="Core Focus Areas"
            title="Exploring Social Transformation"
            lede="The Impact Ledger covers a vast spectrum of critical subjects shaping global communities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOCUS_AREAS.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="card card-hover gold-edge group p-8 h-full flex flex-col overflow-hidden">
                  {/* Large ghost icon that drifts in on hover */}
                  <item.icon className="absolute -right-6 -bottom-6 w-36 h-36 text-accent/[0.06] transition-all duration-700 group-hover:text-accent/[0.12] group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-8deg]" strokeWidth={1} />
                  <div className="icon-badge mb-8">
                    <item.icon className="w-6 h-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-ink mb-3">{item.title}</h3>
                  <p className="text-sm text-stone-600 font-sans font-light leading-relaxed relative">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: IMPACT MAP --- */}
      <ImpactMap />

      {/* --- SECTION 3: MAGAZINE EDITIONS GRID (Replaces confusing 3D overlap) --- */}
      <section className="relative py-24 md:py-32 w-full max-w-[1400px] mx-auto px-6 md:px-12 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading eyebrow="The Newsstand" title="Digital Archives" />
          <Reveal>
            <Link to="/magazine" className="btn btn-ghost !text-xs uppercase tracking-[0.18em]">
              View All Magazines <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className={`grid gap-x-6 gap-y-12 md:gap-x-10 ${magazineIssues.length <= 2 ? 'grid-cols-2 max-w-3xl' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {magazineIssues.slice(0, 4).map((issue, idx) => (
            <Reveal key={issue.id || issue._id} delay={idx * 0.08}>
              <Link to={issue.pageCount ? `/magazine/${issue.id || issue._id}/read` : "/magazine"} className="group flex flex-col gap-5 [perspective:1200px]">
                <div className="cover aspect-[3/4] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:translateY(-12px)_rotateY(-8deg)] group-hover:shadow-[0_40px_60px_-25px_rgba(40,28,12,0.55)]">
                  <img src={issue.coverImage} alt={issue.title} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <span className="text-white text-[10px] font-semibold uppercase tracking-[0.25em] flex items-center gap-2">
                      Open Issue <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold text-accent-deep uppercase tracking-[0.22em]">{issue.issueNumber} • {issue.month} {issue.year}</p>
                  <h3 className="text-lg md:text-xl font-serif font-semibold text-ink leading-snug group-hover:text-accent-deep transition-colors">{issue.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- SPOTLIGHT INTERVIEW + TESTIMONIALS --- */}
      <SpotlightInterview />

      {/* --- SECTION 3.5: THE TEAM --- */}
      <section className="relative py-24 md:py-32 bg-white/50 border-y border-line overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-10">
          <SectionHeading eyebrow="Behind The Ledger" title="Our Team" align="center" />
          <Reveal delay={0.1}>
            <TeamBook />
          </Reveal>
        </div>
      </section>

      {/* --- SECTION 4: FAQ SECTION (Organized by Type, reveals accordingly) --- */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          <SectionHeading
            align="center"
            eyebrow="Support Desk"
            title="Frequently Asked Questions"
            lede="Choose a category to find answers about submissions, distribution, and our editorial values."
          />

          {/* FAQ Tabs for categorization */}
          <Reveal className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full bg-white/70 border border-line backdrop-blur shadow-[var(--shadow-soft)]">
              {FAQ_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFaqTab(tab.id);
                    setOpenFaqIndex(0);
                  }}
                  className={`relative px-4 md:px-6 py-2.5 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    activeFaqTab === tab.id ? 'text-white' : 'text-stone-500 hover:text-ink'
                  }`}
                >
                  {activeFaqTab === tab.id && (
                    <motion.span layoutId="faq-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Categorized FAQs rendering */}
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFaqTab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="space-y-2"
              >
                {getCategorizedFAQs().map((faq, idx) => (
                  <FAQAccordionItem
                    key={faq.id || idx}
                    faq={faq}
                    index={idx}
                    isOpen={openFaqIndex === idx}
                    onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
