import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Heart, Shield, Award, Landmark } from 'lucide-react';
import { api } from '../api';
import { mockMagazineIssues } from '../data/mockData';
import TeamBook from '../components/ui/TeamBook';

// --- BlurText Component ---
const BlurText = ({ text, className = "", delayOffset = 0 }: { text: string, className?: string, delayOffset?: number }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: delayOffset + (i * 0.08), ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// --- FAQ Accordion Item ---
const FAQAccordionItem = ({ faq, isOpen, onToggle }: { faq: any, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left gap-4 group"
      >
        <span className="text-lg md:text-xl font-serif text-gray-900 group-hover:text-accent transition-colors font-medium">
          {faq.question}
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent shrink-0"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600 font-sans font-light leading-relaxed text-sm md:text-base max-w-4xl">
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

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeFaqTab, setActiveFaqTab] = useState<'about' | 'submissions' | 'standards'>('about');

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
    <div className="flex flex-col min-h-screen relative overflow-hidden text-gray-900 bg-transparent">
      
      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[650px] flex flex-col justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="/ChatGPT Image Jul 22, 2026, 03_34_46 PM.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105"
          />
          {/* Glassy white gradient overlay instead of blue */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/20"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 inline-flex items-center gap-3 bg-white/80 border border-[#E5D5C0] rounded-full px-4 py-2 shadow-sm">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Digest</span>
            <span className="text-sm text-gray-800 pr-2 font-sans font-medium">The Premium Magazine of Social Impact</span>
          </motion.div>

          <BlurText 
            text="Documenting Stories That Change The World" 
            className="text-5xl md:text-7xl lg:text-[6.5rem] font-heading italic text-gray-900 leading-[0.95] tracking-tight max-w-4xl"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-gray-700 max-w-2xl font-sans font-light leading-relaxed"
          >
            Discover the universe of positive transformation. Our pioneering journalism and breakthrough editorials bring grassroots initiatives within reach-secure, verified, and extraordinary.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/stories" className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-4 text-sm md:text-base font-semibold flex items-center gap-3 shadow-md transition-all">
              Explore Editorial <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: ABOUT US (Ideology cards/points instead of wall of text) --- */}
      <section className="relative py-16 md:py-20 z-10 bg-transparent border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent"></span>
                The Ideology
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold italic text-gray-900 leading-tight">
                Every Impact Deserves to Be Remembered
              </h2>
              <p className="text-gray-600 font-sans font-light leading-relaxed">
                The Impact Ledger was founded on a simple yet powerful belief-that every act of impact deserves to be seen, celebrated, and remembered. We serve as a record of purpose, perseverance, and progress.
              </p>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Documenting Journeys", desc: "Every edition brings together remarkable journeys of leadership, innovation, and community transformation." },
                { title: "Broad Spectrum", desc: "We explore subjects that shape society, including healthcare, education, women empowerment, sustainability, and legal affairs." },
                { title: "Quiet Leadership", desc: "Celebrating those whose work often happens quietly but whose impact is felt for generations." },
                { title: "Inspiring Tomorrow", desc: "Connecting changemakers and readers to build a culture where positive action inspires future leaders." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-[#FAF9F6] border border-gray-100 p-6 rounded-2xl shadow-sm"
                >
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-accent/20 pb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: focus areas (The application focus) --- */}
      <section className="relative py-16 md:py-20 bg-transparent z-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Core Focus Areas</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Exploring Social Transformation</h2>
            <p className="text-gray-600 font-sans font-light leading-relaxed text-sm md:text-base">
              The Impact Ledger covers a vast spectrum of critical subjects shaping global communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "NGO & Grassroots", desc: "Celebrating direct achievements, field challenges, and operational breakthroughs of field organizations.", icon: Heart },
              { title: "CSR Initiatives", desc: "Investigating corporate commitment to healthcare, education, environmental welfare, and sustainability.", icon: Landmark },
              { title: "Empowerment & Justice", desc: "Documenting self-help groups, microfinance success, gender parity, and legal reforms.", icon: Shield },
              { title: "Innovation & Governance", desc: "Analyzing policy reforms, social enterprise strategies, and next-gen humanitarian designs.", icon: Award }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 w-fit rounded-xl bg-accent/10 transition-colors">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 font-sans font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: MAGAZINE EDITIONS GRID (Replaces confusing 3D overlap) --- */}
      <section className="relative py-16 md:py-20 z-10 bg-transparent max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">The Newsstand</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Digital Archives</h2>
          </div>
          <Link to="/magazine" className="text-accent font-bold hover:underline tracking-widest text-xs uppercase flex items-center gap-2">
            View All Magazines &rarr;
          </Link>
        </div>

        {/* Clean, classic grid showcase of the issues */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {magazineIssues.slice(0, 4).map((issue, idx) => (
            <motion.div 
              key={issue.id || issue._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow border border-gray-100 relative">
                <img src={issue.coverImage} alt={issue.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{issue.issueNumber} • {issue.month} {issue.year}</p>
                <h3 className="text-lg font-serif font-bold text-gray-900 leading-tight group-hover:text-accent transition-colors">{issue.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3.5: THE TEAM --- */}
      <section className="relative py-16 md:py-20 z-10 bg-transparent border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">Behind The Ledger</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Our Team</h2>
            </div>
          </div>

          <TeamBook />
        </div>
      </section>

      {/* --- SECTION 4: FAQ SECTION (Organized by Type, reveals accordingly) --- */}
      <section className="relative py-16 md:py-20 z-10 border-t border-gray-100 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Support Desk</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 font-sans font-light leading-relaxed max-w-md mx-auto">
              Choose a category to find answers about submissions, distribution, and our editorial values.
            </p>
          </div>

          {/* FAQ Tabs for categorization */}
          <div className="flex justify-center border-b border-gray-200 gap-4 md:gap-8">
            {[
              { id: 'about', label: 'About & Vision' },
              { id: 'submissions', label: 'Editorial & Submissions' },
              { id: 'standards', label: 'Distribution & Standards' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFaqTab(tab.id as any);
                  setOpenFaqIndex(null); // Close current faq
                }}
                className={`pb-4 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
                  activeFaqTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Categorized FAQs rendering */}
          <div className="space-y-2 min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFaqTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="divide-y divide-gray-200"
              >
                {getCategorizedFAQs().map((faq, idx) => (
                  <FAQAccordionItem 
                    key={faq.id || idx} 
                    faq={faq} 
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
