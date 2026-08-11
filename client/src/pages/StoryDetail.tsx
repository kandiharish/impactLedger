import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// Unused imports removed
import { api } from '../api';

// --- 3D Tilt Component ---
function TiltCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion values for a premium feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees (subtle: max 5 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the center of the card (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
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
      className={`perspective-1000 ${className}`}
    >
      {/* Optional subtle glare effect could go here */}
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

// --- Main Page Component ---
export default function StoryDetail() {
  const { slug } = useParams();
  
  // Setup Scroll tracking for parallax and progress
  const { scrollY, scrollYProgress } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  const { data: story, isLoading, error } = useQuery({
    queryKey: ['story', slug],
    queryFn: () => api.getStoryBySlug(slug || ''),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white space-y-4">
        <h2 className="font-heading italic text-4xl">Story Not Found</h2>
        <Link to="/stories" className="text-white/70 hover:text-white transition-colors">
          &larr; Return to directory
        </Link>
      </div>
    );
  }

  // Split content into paragraphs for staggered reveal
  const paragraphs = story.content.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="bg-white min-h-screen text-gray-900 relative">
      
      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* Progress Bar at very top edge */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* --- Cinematic Parallax Hero --- */}
      <div className="relative h-[calc(100vh-96px)] w-full overflow-hidden flex flex-col justify-end">
        <motion.div 
          className="absolute inset-0 z-0 origin-bottom"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <img 
            src={story.featuredImage} 
            alt={story.title} 
            className="w-full h-full object-cover"
          />
          {/* Heavy gradient to ensure text is perfectly readable - kept dark for editorial feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent"></div>
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pb-12 md:pb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="space-y-6"
          >
            <span className="text-accent text-xs font-bold uppercase tracking-widest drop-shadow-md">
              {story.category} • {story.publishedDate}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic leading-[0.9] tracking-tight text-white">
              {story.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-sans font-light max-w-2xl mx-auto leading-relaxed">
              {story.summary}
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Article Content (Realtime Staggered Reveal) --- */}
      <article className="relative z-20 bg-white w-full max-w-3xl mx-auto px-6 md:px-0 py-20">
        
        {/* Author Block (3D Tilt) */}
        <TiltCard className="mb-16 -mt-32 relative z-30 w-full max-w-sm mx-auto">
          <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white font-heading text-2xl">
              {story.author.avatar}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-sans tracking-widest uppercase mb-1">Words By</p>
              <p className="text-xl font-heading text-gray-900">{story.author.name}</p>
              <p className="text-xs text-accent font-sans">{story.author.role}</p>
            </div>
          </div>
        </TiltCard>

        {/* Dynamic Text Blocks */}
        <div className="space-y-12 text-gray-800">
          {paragraphs.map((paragraph, index) => {
            // First paragraph styling (Drop Cap)
            if (index === 0) {
              return (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="text-xl md:text-2xl text-gray-800 font-sans font-light leading-relaxed first-letter:text-7xl first-letter:font-heading first-letter:italic first-letter:text-accent first-letter:float-left first-letter:mr-4 first-letter:-mt-2"
                >
                  {paragraph}
                </motion.p>
              );
            }

            // Pseudo-randomly inject a 3D blockquote styling for variety if it's the 3rd paragraph (just for demonstration of editorial style)
            if (index === 2 && paragraphs.length > 3) {
              return (
                <TiltCard key={index} className="my-16">
                  <motion.blockquote
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="border-l-4 border-accent pl-8 py-2"
                  >
                    <p className="text-3xl md:text-4xl font-heading italic text-gray-900 leading-tight">
                      "{paragraph}"
                    </p>
                  </motion.blockquote>
                </TiltCard>
              );
            }

            // Standard Paragraph
            return (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-lg md:text-xl text-gray-700 font-sans font-light leading-relaxed"
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* End of Article */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest font-sans">
            Published {story.publishedDate} • {story.readingTime}
          </p>
          <div className="flex gap-4">
            <Link to="/stories" className="bg-[#FAF9F6] border border-gray-200 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors text-gray-800">
              Next Story &rarr;
            </Link>
          </div>
        </motion.div>
      </article>

    </div>
  );
}
