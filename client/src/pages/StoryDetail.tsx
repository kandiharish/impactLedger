import React, { useRef } from 'react';
import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
// Unused imports removed
import { api } from '../api';
import { NAVBAR_HEIGHT } from '../components/layout/Navbar';

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-ink space-y-6 px-6 text-center">
        <h2 className="font-heading italic text-5xl">Story Not Found</h2>
        <Link to="/stories" className="btn btn-ghost">
          &larr; Return to directory
        </Link>
      </div>
    );
  }

  // Split content into paragraphs for staggered reveal
  const paragraphs = story.content.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="min-h-screen text-ink relative">
      
      {/* Reading progress along the navbar's bottom edge */}
      <motion.div 
        className="fixed left-0 right-0 h-[3px] bg-gradient-to-r from-accent-deep via-accent to-[#E2C9A0] z-[60] origin-left"
        style={{ top: NAVBAR_HEIGHT - 1, scaleX: scrollYProgress }}
      />

      {/* --- Cinematic Parallax Hero --- */}
      <div className="relative h-[92svh] min-h-[600px] w-full overflow-hidden flex flex-col justify-end">
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10"></div>
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pb-36 md:pb-44 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E2C9A0] text-[11px] font-semibold uppercase tracking-[0.22em]">
              {story.category} <span className="w-1 h-1 rounded-full bg-[#E2C9A0]" /> {story.publishedDate}
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
      <article className="relative z-20 w-full max-w-3xl mx-auto px-6 md:px-0 pt-4 pb-28">
        
        {/* Author Block (3D Tilt) */}
        <TiltCard className="mb-20 -mt-24 relative z-30 w-full max-w-sm mx-auto">
          <div className="bg-white/90 backdrop-blur-xl border border-line rounded-3xl p-6 flex items-center gap-5 shadow-[0_30px_60px_-30px_rgba(40,28,12,0.45)]">
            <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#C9A56F] to-accent-deep ring-4 ring-accent-soft flex items-center justify-center text-white font-heading text-2xl">
              {story.author.avatar}
            </div>
            <div>
              <p className="text-[10px] text-stone-500 font-sans tracking-[0.25em] uppercase mb-1">Words By</p>
              <p className="text-2xl font-heading text-ink leading-tight">{story.author.name}</p>
              <p className="text-xs text-accent-deep font-sans">{story.author.role}</p>
            </div>
          </div>
        </TiltCard>

        {/* Dynamic Text Blocks */}
        <div className="space-y-9 text-stone-800">
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
                  className="text-xl md:text-[1.4rem] text-stone-800 font-sans font-light leading-[1.75] first-letter:text-[5.5rem] first-letter:leading-[0.8] first-letter:font-heading first-letter:italic first-letter:text-accent-deep first-letter:float-left first-letter:mr-4 first-letter:mt-2"
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
                    className="relative border-l-2 border-accent pl-8 md:pl-10 py-4"
                  >
                    <span className="absolute -top-6 left-6 font-heading text-8xl leading-none text-accent/25 select-none" aria-hidden="true">&ldquo;</span>
                    <p className="relative text-3xl md:text-4xl font-heading italic text-ink leading-[1.2]">
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
                className="text-lg md:text-xl text-stone-700 font-sans font-light leading-[1.8]"
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
          className="mt-24 pt-10 border-t border-line flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[11px] text-stone-500 uppercase tracking-[0.22em] font-sans">
            Published {story.publishedDate} • {story.readingTime}
          </p>
          <div className="flex gap-4">
            <Link to="/stories" className="btn btn-dark btn-shine !text-xs uppercase tracking-[0.18em]">
              Next Story &rarr;
            </Link>
          </div>
        </motion.div>
      </article>

    </div>
  );
}
