import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SplitHeading } from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

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

        {/* RIGHT COLUMN: what the map will hold */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative rounded-[24px] p-8 space-y-6 overflow-hidden bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_30px_60px_-30px_rgba(90,60,20,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent-deep font-semibold">The Impact Map</span>
              <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white border border-accent/30 shadow-sm">
                <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping-slow" />
                <MapPin className="relative text-accent-deep w-5 h-5" />
              </span>
            </div>
            <h3 className="font-heading italic text-3xl text-[#3B2F22] leading-tight">
              Charting change, state by state.
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-10 h-px bg-accent" />
              <span className="w-1.5 h-1.5 rotate-45 bg-accent" />
            </div>
            <p className="text-[15px] text-[#5C4A36] font-light leading-relaxed">
              With every edition, we add the initiatives, organisations and communities we feature to our map of impact across India.
              The state-by-state ledger opens soon.
            </p>
            <Link to="/magazine" className="group flex items-center justify-between gap-4 rounded-2xl bg-white/70 border border-white px-5 py-4 hover:bg-white hover:shadow-md transition-all duration-500">
              <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#3B2F22]">
                <BookOpen className="w-4 h-4 text-accent" /> Explore Our Editions
              </span>
              <ArrowUpRight className="w-4 h-4 text-accent-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
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
