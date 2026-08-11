import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../api';

// --- 3D Magazine Cover Component (For Spotlight) ---
function Magazine3DCover({ image, title }: { image: string, title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-sm aspect-[3/4] cursor-pointer perspective-1000 mx-auto"
    >
      <motion.div 
        className="w-full h-full relative rounded-r-lg rounded-l-sm overflow-hidden"
        style={{
          boxShadow: "-15px 20px 40px rgba(0,0,0,0.5), inset 2px 0 5px rgba(255,255,255,0.3)",
          transform: "translateZ(30px)"
        }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover filter sepia-[0.3] contrast-125 mix-blend-luminosity" />
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/30"></div>
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
            x: glareX,
            y: glareY,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// --- Small Interactive Card (For Pulse & Vault) ---
function MiniIssueCard({ issue }: { issue: any }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group flex flex-col gap-4 cursor-pointer w-[200px] shrink-0"
    >
      <div className="relative aspect-[3/4] rounded-r-md rounded-l-sm overflow-hidden shadow-xl transition-shadow group-hover:shadow-2xl">
        <img src={issue.coverImage} alt={issue.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.3] contrast-125 mix-blend-luminosity" />
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent mix-blend-multiply"></div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <span className="text-white font-bold tracking-widest text-xs uppercase border border-white/50 px-4 py-2 rounded-full">
            Read
          </span>
        </div>
      </div>
      <div>
        <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">{issue.issueNumber} • {issue.month} {issue.year}</p>
        <h3 className="text-lg font-heading text-white leading-tight group-hover:text-accent transition-colors">{issue.title}</h3>
      </div>
    </motion.div>
  );
}

// --- Archival Vault Carousel ---
function VaultSlider({ issues }: { issues: any[] }) {
  const [currentIndex, React_setCurrentIndex] = React.useState(0);

  if (!issues || issues.length === 0) return null;

  const nextSlide = () => {
    React_setCurrentIndex((prev) => (prev === issues.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    React_setCurrentIndex((prev) => (prev === 0 ? issues.length - 1 : prev - 1));
  };

  const currentIssue = issues[currentIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center py-6 md:py-12 px-4 md:px-16">
      
      {/* Desktop Left Arrow */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-0 z-10 p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:-translate-x-1 items-center justify-center text-gray-900 hover:text-accent"
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full"
      >
        <div className="w-56 sm:w-64 md:w-80 shrink-0 mx-auto">
          <div className="relative aspect-[3/4] rounded-r-lg rounded-l-sm overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
             <img src={currentIssue.coverImage} alt={currentIssue.title} className="w-full h-full object-cover filter sepia-[0.3] contrast-125 mix-blend-luminosity" />
             <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/50 to-transparent mix-blend-multiply"></div>
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6 text-center md:text-left flex-1">
          <p className="text-accent text-xs md:text-sm font-bold uppercase tracking-widest">{currentIssue.issueNumber} • {currentIssue.month} {currentIssue.year}</p>
          <h3 className="text-3xl md:text-5xl font-heading text-gray-900 leading-tight">{currentIssue.title}</h3>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
            {currentIssue.editorsNote || "Delve into our historical archives to explore timeless stories of systemic impact and profound change."}
          </p>
          <div className="pt-2 md:pt-4">
            <button className="px-6 py-2.5 md:px-8 md:py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full font-bold uppercase tracking-widest text-xs transition-colors">
              Read This Volume
            </button>
          </div>
        </div>
      </motion.div>

      {/* Desktop Right Arrow */}
      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-0 z-10 p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-50 transition-all hover:translate-x-1 items-center justify-center text-gray-900 hover:text-accent"
      >
        <ChevronRight size={24} />
      </button>

      {/* Mobile Arrows */}
      <div className="flex md:hidden mt-10 gap-6">
        <button 
          onClick={prevSlide}
          className="p-3 w-14 h-14 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm active:bg-gray-50 transition-colors text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 w-14 h-14 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm active:bg-gray-50 transition-colors text-gray-900"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
}

// --- Main Magazine Newsstand Component ---
export default function Magazine() {
  const { data: issues = [], isLoading, isError } = useQuery({
    queryKey: ['magazineIssues'],
    queryFn: () => api.getMagazineIssues()
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !issues || issues.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white space-y-4">
        <h2 className="text-3xl font-heading text-red-400">Unable to load newsstand.</h2>
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    );
  }

  // Segment the data
  const latestIssue = issues[0];
  const pulseIssues = issues.filter(i => i.isTrending || i.isMostRead);
  const archivalIssues = issues.slice(1); // Everything except the latest

  return (
    <div className="flex flex-col min-h-screen relative bg-white text-gray-900">
      
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 bg-white">
        <img 
          src="/magazine%20bg.png" 
          alt="Newsstand Background" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 space-y-16">
        
        {/* --- 1. The Spotlight (Latest Issue) --- */}
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Magazine3DCover image={latestIssue.coverImage} title={latestIssue.title} />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/50 text-accent text-xs font-bold uppercase tracking-widest">
                <Flame size={14} className="animate-pulse" /> Latest Release
              </div>
              <h1 className="text-5xl md:text-7xl font-heading italic text-gray-900 leading-none tracking-tight">
                {latestIssue.title}
              </h1>
              <p className="text-xl text-gray-600 font-sans font-light leading-relaxed">
                {latestIssue.editorsNote}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-gray-950 text-white hover:bg-gray-800 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <BookOpen size={18} />
                Read Issue
              </button>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-bold">Featured Inside</h3>
              <ul className="space-y-2">
                {(latestIssue.featuredArticles || []).map((article, idx) => (
                  <li key={idx} className="text-gray-700 font-heading text-lg">
                    • {article}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* --- 2. The Pulse (Trending Scroll) --- */}
        {pulseIssues.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-heading text-gray-900">The Pulse</h2>
              <span className="text-gray-400 font-sans text-sm">/ Most Read This Week</span>
            </div>
            
            <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x">
              {pulseIssues.map((issue) => (
                <div key={issue.id || issue._id} className="snap-start">
                  <MiniIssueCard issue={issue} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- 3. Digital Archives (The Vault) --- */}
        <section className="space-y-8 border-t border-gray-200 pt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-heading text-gray-900">Digital Archives</h2>
              <span className="text-gray-400 font-sans text-sm">/ Past Editions</span>
            </div>
          </div>

          <VaultSlider issues={archivalIssues} />
        </section>

      </div>
    </div>
  );
}
