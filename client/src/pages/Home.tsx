import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from '../api';
import { mockMagazineIssues } from '../data/mockData';

// --- BlurText Component (Style 2) ---
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
          transition={{ duration: 0.7, delay: delayOffset + (i * 0.1), ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// --- Magazine Carousel (Style 3) ---
const MagazineCarousel = ({ issues }: { issues: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    issues.forEach(issue => {
      const img = new Image();
      img.src = issue.coverImage;
    });
  }, [issues]);

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (dir === 'next') setActiveIndex(prev => (prev + 1) % issues.length);
    else setActiveIndex(prev => (prev + issues.length - 1) % issues.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  // We'll use a set of elegant background colors for the carousel items
  const bgs = ['#1a1f2e', '#2c2520', '#1c2826', '#2a2432'];
  
  // We need exactly 4 items for the specific 3D logic. If we have less, we loop them.
  const displayIssues = [0, 1, 2, 3].map(i => issues[i % issues.length]);

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: bgs[activeIndex % bgs.length], transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)', height: '100vh' }}>
      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-noise z-50"></div>

      {/* Giant Ghost Text */}
      <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-10" style={{ top: '15%' }}>
        <h2 className="font-display text-white opacity-20 uppercase whitespace-nowrap leading-none tracking-tight" style={{ fontSize: 'clamp(80px, 25vw, 320px)' }}>
          EDITIONS
        </h2>
      </div>

      <div className="absolute top-8 left-6 sm:left-12 z-50">
        <span className="text-xs font-semibold uppercase text-white/90 tracking-[0.2em] font-sans">
          The Impact Ledger
        </span>
      </div>

      {/* Carousel Items */}
      <div className="absolute inset-0 z-20">
        {displayIssues.map((issue, i) => {
          let role = '';
          if (i === activeIndex) role = 'center';
          else if (i === (activeIndex + 3) % 4) role = 'left';
          else if (i === (activeIndex + 1) % 4) role = 'right';
          else role = 'back';

          const styles: any = {
            center: { transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.4})`, filter: 'blur(0px)', opacity: 1, zIndex: 40, left: '50%', height: isMobile ? '55%' : '85%', bottom: isMobile ? '25%' : '0' },
            left: { transform: `translateX(-50%) scale(0.9)`, filter: 'blur(4px)', opacity: 0.7, zIndex: 30, left: isMobile ? '15%' : '25%', height: isMobile ? '25%' : '40%', bottom: isMobile ? '35%' : '15%' },
            right: { transform: `translateX(-50%) scale(0.9)`, filter: 'blur(4px)', opacity: 0.7, zIndex: 30, left: isMobile ? '85%' : '75%', height: isMobile ? '25%' : '40%', bottom: isMobile ? '35%' : '15%' },
            back: { transform: `translateX(-50%) scale(0.8)`, filter: 'blur(8px)', opacity: 0.4, zIndex: 20, left: '50%', height: isMobile ? '20%' : '30%', bottom: isMobile ? '40%' : '20%' },
          };

          return (
            <div 
              key={i} 
              className="absolute transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ ...styles[role], willChange: 'transform, filter, opacity' }}
            >
              <img src={issue.coverImage} alt={issue.title} className="w-full h-full object-contain object-bottom drop-shadow-2xl" draggable={false} />
            </div>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-8 left-6 sm:bottom-16 sm:left-16 z-50 max-w-[320px]">
        <p className="font-sans font-bold uppercase tracking-widest text-base sm:text-xl text-white/95 mb-3">
          {displayIssues[activeIndex].title}
        </p>
        <p className="hidden sm:block text-sm text-white/80 leading-relaxed mb-6 font-sans">
          Dive into our latest deep-dives, exclusive interviews, and stunning photojournalism covering grassroots initiatives worldwide.
        </p>
        <div className="flex gap-4">
          <button onClick={() => navigate('prev')} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <button onClick={() => navigate('next')} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 sm:bottom-16 sm:right-16 z-50">
        <Link to={`/magazine`} className="flex items-center gap-4 text-white hover:opacity-80 transition-opacity font-display text-3xl sm:text-5xl tracking-tight">
          READ NOW <ArrowRight size={32} />
        </Link>
      </div>
    </div>
  );
};

// --- Panel 2 Auto Carousel ---
const PanelCarousel = () => {
  const items = [
    "Exclusive interviews with global NGO leaders.",
    "Data-driven reports on climate sustainability.",
    "Community spotlights from emerging markets.",
    "High-impact photojournalism and editorials."
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(prev => (prev + 1) % items.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center relative min-h-[200px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl font-sans text-primary/90 leading-relaxed font-medium"
        >
          {items[idx]}
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 mt-8">
        {items.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i === idx ? 'bg-primary' : 'bg-primary/20'}`} />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const { data: magazineIssues = mockMagazineIssues } = useQuery({ queryKey: ['magazineIssues'], queryFn: () => api.getMagazineIssues() });

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-primary text-white">
      
      {/* --- HERO SECTION (Style 1 + 2) --- */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ChatGPT Image Jul 22, 2026, 03_34_46 PM.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-80 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent"></div>
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>
        </div>

        {/* Floating Navbar (Liquid Glass) */}
        <nav className="absolute top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="liquid-glass rounded-full px-4 py-2 hover:bg-white/10 transition-colors duration-300">
            <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden lg:flex liquid-glass rounded-full px-2 py-2 items-center gap-2">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Home</Link>
            <Link to="/stories" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Editorial</Link>
            <Link to="/magazine" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Magazine</Link>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Contact</Link>
            <button className="bg-white text-primary px-5 py-2 rounded-full text-sm font-bold ml-2 hover:scale-105 transition-transform duration-300">Subscribe</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
            <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"><Search size={20} /></button>
            <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"><Menu size={20} /></button>
          </motion.div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6 inline-flex items-center gap-3 liquid-glass rounded-full px-4 py-2">
            <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">New</span>
            <span className="text-sm text-white/90 pr-2 font-sans">Latest Digital Issue Available Now</span>
          </motion.div>

          <BlurText 
            text="Documenting Stories That Change The World" 
            className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-white leading-[0.9] tracking-tight max-w-4xl"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl font-sans font-light leading-relaxed"
          >
            Discover the universe of positive transformation. Our pioneering journalism and breakthrough editorials bring grassroots initiatives within reach—secure and extraordinary.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-10 flex flex-wrap items-center gap-6">
            <Link to="/stories" className="liquid-glass-strong rounded-full px-8 py-4 text-sm md:text-base font-semibold text-white flex items-center gap-3 hover:bg-white/10 transition-all">
              Explore Editorial <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- 3D MAGAZINE CAROUSEL (Style 3) --- */}
      <section className="relative w-full h-screen border-y border-white/10">
        <MagazineCarousel issues={magazineIssues} />
      </section>


      {/* --- 3-PANEL FOOTER GRID (Style 1) --- */}
      <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] bg-background-warm text-primary min-h-[400px]">
        {/* Panel 1 */}
        <div className="bg-[#ECEDEC] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
          <div className="z-10 relative">
            <h3 className="font-sans font-medium text-3xl md:text-4xl leading-[1.1] tracking-tight max-w-[350px] mb-8">
              Start your journey into impactful journalism.
            </h3>
            <Link to="/subscribe" className="font-sans text-lg underline underline-offset-4 hover:opacity-70 transition-opacity">
              Subscribe to the Digest
            </Link>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80" 
            className="absolute right-0 bottom-0 h-full w-2/3 object-cover mix-blend-multiply opacity-20 pointer-events-none"
            alt="Decorative"
          />
        </div>

        {/* Panel 2 */}
        <div className="bg-[#FEFDF9] p-10 md:p-16">
          <PanelCarousel />
        </div>

        {/* Panel 3 */}
        <div className="bg-primary text-white p-10 md:p-16 flex items-center gap-8">
          <div className="w-1/3 aspect-[4/3] overflow-hidden rounded-sm">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" alt="Community" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading italic text-5xl md:text-6xl mb-2">+14K</h4>
            <p className="text-white/60 font-sans text-lg leading-snug">
              Readers have already joined the global movement for verified impact.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
