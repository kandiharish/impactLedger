import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Flame, ChevronLeft, ChevronRight, ArrowUpRight, Download } from 'lucide-react';
import { api } from '../api';
import PrintNotice from '../components/ui/PrintNotice';
import { Reveal, SectionHeading } from '../components/ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Opens the in-site reader when the issue has page images; otherwise renders a plain button. */
function ReadLink({ issue, className, children }: { issue: any; className: string; children: React.ReactNode }) {
  if (issue.pageCount && issue.pagesBaseUrl) {
    return <Link to={`/magazine/${issue.id || issue._id}/read`} className={className}>{children}</Link>;
  }
  return <button className={className}>{children}</button>;
}

// --- 3D Magazine Cover Component (For Spotlight) ---
function Magazine3DCover({ image, title }: { image: string, title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
    <div className="relative [perspective:1400px]">
      {/* Soft pedestal glow */}
      <div className="absolute -inset-10 rounded-full bg-accent/25 blur-[80px] pointer-events-none" />
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[260px] sm:w-[320px] md:w-[360px] aspect-[3/4] cursor-pointer mx-auto"
      >
        <motion.div
          className="cover w-full h-full"
          style={{
            boxShadow: "-20px 30px 60px -10px rgba(40,28,12,0.45), 0 2px 4px rgba(0,0,0,0.1)",
            transform: "translateZ(30px)"
          }}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, transparent 55%)",
              x: glareX,
              y: glareY,
            }}
          />
        </motion.div>
        {/* Page edges */}
        <div
          className="absolute top-[1.5%] bottom-[1.5%] -right-2 w-3 rounded-r-sm bg-[repeating-linear-gradient(90deg,#f6f1e7_0px,#f6f1e7_1px,#e3d9c6_2px)]"
          style={{ transform: "translateZ(10px)" }}
        />
      </motion.div>
    </div>
  );
}

// --- Small Interactive Card (For Pulse & Vault) ---
function MiniIssueCard({ issue }: { issue: any }) {
  return (
    <div className="group flex flex-col gap-5 cursor-pointer w-[220px] shrink-0">
      <div className="cover aspect-[3/4] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2.5 group-hover:shadow-[0_36px_50px_-24px_rgba(40,28,12,0.55)]">
        <img src={issue.coverImage} alt={issue.title} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
        {/* Hover overlay */}
        <div className="absolute inset-0 z-[3] bg-ink/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-white font-semibold tracking-[0.25em] text-[10px] uppercase border border-white/60 px-5 py-2.5 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            Read
          </span>
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-accent-deep text-[10px] font-semibold uppercase tracking-[0.22em]">{issue.issueNumber} • {issue.month} {issue.year}</p>
        <h3 className="text-xl font-heading text-ink leading-tight group-hover:text-accent-deep transition-colors">{issue.title}</h3>
      </div>
    </div>
  );
}

// --- Archival Vault Carousel ---
function VaultSlider({ issues }: { issues: any[] }) {
  const [[currentIndex, direction], setSlide] = React.useState<[number, number]>([0, 0]);

  if (!issues || issues.length === 0) return null;

  const nextSlide = () => {
    setSlide(([prev]) => [prev === issues.length - 1 ? 0 : prev + 1, 1]);
  };

  const prevSlide = () => {
    setSlide(([prev]) => [prev === 0 ? issues.length - 1 : prev - 1, -1]);
  };

  const goTo = (i: number) => setSlide(([prev]) => [i, i > prev ? 1 : -1]);

  const currentIssue = issues[currentIndex];
  const multiple = issues.length > 1;

  const arrowClass = "w-14 h-14 flex items-center justify-center rounded-full bg-white border border-line shadow-[var(--shadow-soft)] text-ink hover:bg-ink hover:text-white hover:border-ink transition-all duration-300";

  return (
    <div
      className="relative w-full surface overflow-hidden px-6 py-12 md:px-20 md:py-16"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }}
    >
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Desktop Left Arrow */}
      {multiple && <button onClick={prevSlide} aria-label="Previous issue" className={`hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 ${arrowClass}`}>
        <ChevronLeft size={22} />
      </button>}

      <div className="relative min-h-[520px] md:min-h-[420px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full"
          >
            <motion.div
              initial={{ rotate: direction * 4, scale: 0.94 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="w-56 sm:w-64 md:w-72 shrink-0 mx-auto"
            >
              <div className="cover aspect-[3/4] transition-transform hover:scale-[1.03] duration-700">
                <img src={currentIssue.coverImage} alt={currentIssue.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <div className="space-y-5 md:space-y-6 text-center md:text-left flex-1">
              <p className="text-accent-deep text-xs font-semibold uppercase tracking-[0.25em]">{currentIssue.issueNumber} • {currentIssue.month} {currentIssue.year}</p>
              <h3 className="text-4xl md:text-6xl font-heading text-ink leading-[1.02]">{currentIssue.title}</h3>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-xl mx-auto md:mx-0">
                {currentIssue.editorsNote || "Delve into our historical archives to explore timeless stories of systemic impact and profound change."}
              </p>
              <div className="pt-2 md:pt-4">
                <ReadLink issue={currentIssue} className="btn btn-ghost !text-xs uppercase tracking-[0.18em]">
                  Read This Volume <ArrowUpRight size={14} />
                </ReadLink>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop Right Arrow */}
      {multiple && <button onClick={nextSlide} aria-label="Next issue" className={`hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 ${arrowClass}`}>
        <ChevronRight size={22} />
      </button>}

      {/* Progress dots + mobile arrows */}
      {multiple && <div className="relative mt-10 flex items-center justify-center gap-6">
        <button onClick={prevSlide} aria-label="Previous issue" className={`md:hidden ${arrowClass} !w-11 !h-11`}>
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {issues.map((issue, i) => (
            <button
              key={issue.id || issue._id || i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${issue.title}`}
              className="relative h-1.5 rounded-full bg-stone-200 overflow-hidden transition-all duration-500"
              style={{ width: i === currentIndex ? 36 : 10 }}
            >
              {i === currentIndex && <motion.span layoutId="vault-dot" className="absolute inset-0 bg-accent rounded-full" />}
            </button>
          ))}
        </div>
        <button onClick={nextSlide} aria-label="Next issue" className={`md:hidden ${arrowClass} !w-11 !h-11`}>
          <ChevronRight size={18} />
        </button>
      </div>}

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !issues || issues.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-ink space-y-5 px-6 text-center">
        <h2 className="text-4xl font-heading italic text-ink">Unable to load newsstand.</h2>
        <Link to="/" className="btn btn-dark">Return Home</Link>
      </div>
    );
  }

  // Segment the data
  const latestIssue = issues[0];
  const pulseIssues = issues.filter(i => i.isTrending || i.isMostRead);
  const archivalIssues = issues.slice(1); // Everything except the latest

  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-ink">

      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 bg-transparent pointer-events-none">
        <img
          src="/magazine%20bg.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/75 via-paper/90 to-paper"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-36 md:pt-40 pb-28 space-y-28">

        {/* --- 1. The Spotlight (Latest Issue) --- */}
        <section className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 min-h-[70vh]">
          <div className="w-full lg:w-1/2 flex justify-center order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotateY: 25, y: 40 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <div className="animate-float">
                <Magazine3DCover image={latestIssue.coverImage} title={latestIssue.title} />
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-10 order-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-accent/30 text-accent-deep text-[11px] font-semibold uppercase tracking-[0.2em]"
              >
                <Flame size={14} className="text-accent animate-pulse" /> Latest Release
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: EASE }}
                className="display-title italic text-5xl md:text-7xl"
              >
                {latestIssue.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
                className="text-lg md:text-xl text-stone-600 font-sans font-light leading-relaxed max-w-xl"
              >
                {latestIssue.editorsNote}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <ReadLink issue={latestIssue} className="btn btn-dark btn-shine !px-8 !py-4">
                  <BookOpen size={18} />
                  Read Issue
                </ReadLink>
                {latestIssue.pdfUrl && (
                  <a href={latestIssue.pdfUrl} download className="btn btn-ghost !px-6 !py-4">
                    <Download size={16} /> Download PDF
                  </a>
                )}
              </div>
              <PrintNotice className="mt-6 max-w-xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="pt-8 border-t border-line"
            >
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-5 font-semibold font-sans">Featured Inside</h3>
              <ul className="divide-y divide-line">
                {(latestIssue.featuredArticles || []).map((article, idx) => (
                  <li key={idx} className="group flex items-center gap-5 py-3.5 cursor-default">
                    <span className="font-heading italic text-accent text-lg w-6">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-ink font-heading text-xl group-hover:translate-x-1.5 transition-transform duration-500">{article}</span>
                    <ArrowUpRight size={16} className="text-stone-300 group-hover:text-accent transition-colors" />
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* --- 2. The Pulse (Trending Scroll) --- */}
        {pulseIssues.length > 0 && (
          <section className="space-y-10">
            <Reveal className="flex items-baseline gap-4">
              <h2 className="section-title font-heading font-normal italic">The Pulse</h2>
              <span className="text-stone-400 font-sans text-sm">/ Most Read This Week</span>
            </Reveal>

            <div className="flex overflow-x-auto gap-8 pb-10 pt-4 -mx-6 px-6 md:-mx-12 md:px-12 scrollbar-hide snap-x">
              {pulseIssues.map((issue, i) => (
                <Reveal key={issue.id || issue._id} delay={i * 0.08} className="snap-start">
                  <MiniIssueCard issue={issue} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* --- 3. Digital Archives (The Vault) --- */}
        <section className="space-y-12">
          <SectionHeading eyebrow="Past Editions" title="Digital Archives" />
          <Reveal>
            <VaultSlider issues={archivalIssues} />
          </Reveal>
        </section>

      </div>
    </div>
  );
}
