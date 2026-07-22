import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, Menu, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { api } from '../api';

// --- 3D Magazine Cover Component ---
function Magazine3DCover({ image, title }: { image: string, title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Dynamic glare effect based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-[280px] md:w-[400px] aspect-[3/4] cursor-pointer perspective-1000 mx-auto"
    >
      <motion.div 
        className="w-full h-full relative rounded-r-lg rounded-l-sm overflow-hidden"
        style={{
          boxShadow: "-15px 20px 40px rgba(0,0,0,0.5), inset 2px 0 5px rgba(255,255,255,0.3)",
          transform: "translateZ(30px)"
        }}
      >
        {/* Magazine Cover Image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        {/* Paper Thickness/Spine effect */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-white/30"></div>

        {/* Dynamic Glare */}
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

// --- Main Magazine Archive Component ---
export default function Magazine() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: issues = [], isLoading, isError } = useQuery({
    queryKey: ['magazineIssues'],
    queryFn: () => api.getMagazineIssues()
  });

  // Define ambient background colors corresponding to issues
  const ambientColors = [
    '#0A192F', // Navy/Teal
    '#2A1B18', // Deep Warm
    '#1A2518', // Forest Green
    '#1A1A24', // Deep Purple
  ];

  const currentAmbientColor = ambientColors[activeIndex % ambientColors.length];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white space-y-4">
        <h2 className="text-3xl font-heading text-red-400">Unable to load magazine archive.</h2>
        <p className="text-white/60">Please ensure the backend API is running.</p>
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white space-y-4">
        <h2 className="text-3xl font-heading">No issues found.</h2>
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    );
  }

  const activeIssue = issues[activeIndex];

  if (!activeIssue) return null;

  const nextIssue = () => {
    setActiveIndex((prev) => (prev + 1) % issues.length);
  };

  const prevIssue = () => {
    setActiveIndex((prev) => (prev - 1 + issues.length) % issues.length);
  };

  return (
    <motion.div 
      animate={{ backgroundColor: currentAmbientColor }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex flex-col min-h-screen relative overflow-hidden text-white"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Floating Navbar (Liquid Glass) */}
      <nav className="absolute top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="liquid-glass rounded-full px-4 py-2 hover:bg-white/10 transition-colors duration-300">
          <Link to="/">
            <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden lg:flex liquid-glass rounded-full px-2 py-2 items-center gap-2">
          <Link to="/" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Home</Link>
          <Link to="/stories" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/magazine" className="px-4 py-2 text-sm font-medium text-white font-sans bg-white/10 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Contact</Link>
          <button className="bg-white text-primary px-5 py-2 rounded-full text-sm font-bold ml-2 hover:scale-105 transition-transform duration-300">Subscribe</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
          <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"><Search size={20} className="text-white" /></button>
          <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"><Menu size={20} className="text-white" /></button>
        </motion.div>
      </nav>

      {/* Main 3D Carousel Layout */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 pt-32 pb-24">
        
        {/* Left Side: 3D Floating Cover */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIssue._id || activeIssue.id}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            >
              <Magazine3DCover image={activeIssue.coverImage} title={activeIssue.title} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Issue Details & Interactive TOC */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIssue._id || activeIssue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="text-accent text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-accent"></span>
                  {activeIssue.issueNumber} • {activeIssue.month} {activeIssue.year}
                </p>
                <h1 className="text-5xl lg:text-7xl font-heading italic leading-none tracking-tight">
                  {activeIssue.title}
                </h1>
                <p className="text-lg text-white/70 font-sans font-light leading-relaxed max-w-md">
                  {activeIssue.editorsNote}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  <BookOpen size={18} />
                  Read Magazine
                </button>
              </div>

              {/* Interactive Table of Contents */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-white/50 mb-6 font-bold">In This Issue</h3>
                <div className="space-y-4">
                  {(activeIssue.featuredArticles || []).map((article, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="group flex items-center justify-between cursor-pointer border-b border-white/5 pb-3"
                    >
                      <span className="text-lg font-heading text-white/80 group-hover:text-accent transition-colors duration-300">
                        {article}
                      </span>
                      <span className="text-xs font-sans text-white/40 group-hover:text-white/80 transition-colors duration-300">
                        Pg {12 + (idx * 16)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center gap-6 pt-12">
            <button 
              onClick={prevIssue}
              className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:-translate-x-1"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-xs font-bold tracking-widest uppercase text-white/50">
              {activeIndex + 1} / {issues.length}
            </div>
            <button 
              onClick={nextIssue}
              className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:translate-x-1"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
