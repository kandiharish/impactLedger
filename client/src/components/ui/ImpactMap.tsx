import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SplitHeading } from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

function CountingNumber({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [count, isInView, value, duration]);

  return <span ref={ref} className="tabular-nums">{displayValue < 10 ? `0${displayValue}` : displayValue}</span>;
}

const STATS = [
  { value: 48, label: 'Stories' },
  { value: 24, label: 'Organizations' },
  { value: 16, label: 'Communities' },
  { value: 8, label: 'Districts' },
];

export default function ImpactMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.04]);

  return (
    <section ref={sectionRef} className="w-full bg-transparent text-ink relative overflow-hidden font-sans">

      {/* MAP BACKGROUND CONTAINER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/image%20copy%202.png")',
            scale: mapScale,
          }}
        />
        {/* Blend the parchment into the page at the top and bottom edges */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* LEFT COLUMN: Typography */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-5">
            <Reveal y={12}><span className="eyebrow">Impact Across India</span></Reveal>
            <SplitHeading
              text="Stories from every corner of our nation"
              className="font-heading italic text-5xl md:text-6xl lg:text-[4.25rem] text-ink leading-[1]"
            />
          </div>

          <Reveal delay={0.15}>
            <p className="lede max-w-sm">
              Real stories. Real impact. From cities to remote villages, discover initiatives that are creating meaningful change across India.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <Link to="/stories" className="btn btn-dark btn-shine">
              Explore Stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* CENTER COLUMN: Spacer for Map */}
        <div className="lg:col-span-4 hidden lg:block h-[520px]">
           {/* Space reserved for map visibility */}
        </div>

        {/* RIGHT COLUMN: Interactive Stats Panel */}
        <div className="lg:col-span-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative rounded-[24px] p-7 space-y-6 overflow-hidden bg-white/55 backdrop-blur-xl border border-white/80 shadow-[0_30px_60px_-30px_rgba(90,60,20,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

            {/* Top State Info */}
            <div className="relative flex justify-between items-start border-b border-accent/20 pb-5">
              <div>
                <h3 className="text-[#3B2F22] font-serif text-2xl font-semibold tracking-[0.06em]">TELANGANA</h3>
                <p className="text-[#8B7355] text-xs mt-1 font-medium">South India</p>
              </div>
              <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white border border-accent/30 shadow-sm">
                <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping-slow" />
                <MapPin className="relative text-accent-deep w-5 h-5" />
              </span>
            </div>

            {/* Stats Grid */}
            <div className="relative grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/60 border border-white px-4 py-4 transition-all duration-500 hover:bg-white hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-3xl font-heading text-[#3B2F22] leading-none mb-2"><CountingNumber value={s.value} duration={2.5} /></div>
                  <div className="text-[#8B7355] text-[10px] font-semibold uppercase tracking-[0.18em]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Story Snippet */}
            <Link to="/stories" className="relative group flex gap-4 items-center rounded-2xl p-3 -mx-1 hover:bg-white/70 transition-colors">
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=200" alt="Students" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="text-[9px] text-[#8B7355] font-semibold uppercase tracking-[0.22em]">Featured Story</div>
                <h4 className="text-[#3B2F22] font-serif text-sm leading-snug">Empowering Rural Youth through Education</h4>
                <span className="text-accent-deep text-[10px] font-semibold uppercase tracking-[0.18em] flex items-center gap-1">
                  Read Story <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>

          <Reveal delay={0.1}>
            <button className="group w-full py-4 rounded-2xl flex justify-center items-center gap-3 bg-white/40 backdrop-blur border border-accent/30 hover:border-accent hover:bg-white/80 transition-all duration-500 text-[#3B2F22] text-[10px] uppercase tracking-[0.25em] font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-accent transition-transform group-hover:-rotate-6" />
              View All States
            </button>
          </Reveal>
        </div>

      </div>

      {/* BOTTOM QUOTE BAR */}
      <div className="w-full text-center pt-12 pb-24 md:pb-28 relative z-20">
         <Reveal className="max-w-3xl mx-auto px-6 relative">
            <span className="block font-heading text-8xl leading-none text-accent/50 h-12 select-none" aria-hidden="true">&ldquo;</span>
            <p className="text-2xl md:text-[2.1rem] font-heading italic text-ink leading-snug relative z-10">
              India's progress is written every day by the people who refuse to give up.
            </p>
            <div className="mt-7 flex items-center justify-center gap-4 text-accent-deep text-[11px] font-semibold tracking-[0.3em] uppercase">
              <span className="w-10 h-px bg-accent/60" />
              The Impact Ledger
              <span className="w-10 h-px bg-accent/60" />
            </div>
         </Reveal>
      </div>
    </section>
  );
}
