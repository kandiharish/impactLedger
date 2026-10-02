import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Quote } from 'lucide-react';
import { api } from '../../api';
import ImageReveal from '../ui/ImageReveal';
import { Reveal, SplitHeading } from '../ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Dark editorial band: the lead interview, its Q&A, and reader testimonials. */
export default function SpotlightInterview() {
  const { data: interviews = [] } = useQuery({ queryKey: ['interviews'], queryFn: () => api.getInterviews() });
  const { data: testimonials = [] } = useQuery({ queryKey: ['testimonials'], queryFn: () => api.getTestimonials() });
  const [openQ, setOpenQ] = useState<number | null>(0);

  const interview = interviews[0];
  if (!interview) return null;

  return (
    <section className="relative bg-ink text-stone-300 overflow-hidden py-24 md:py-36">
      {/* Ambient gold light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(600px 500px at 0% 0%, rgba(184,147,95,0.14), transparent 70%), radial-gradient(500px 400px at 100% 100%, rgba(184,147,95,0.09), transparent 70%)' }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 space-y-24 md:space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">

          {/* Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-3 md:-inset-4 border border-accent/25 rounded-[34px] pointer-events-none" />
            <ImageReveal
              src={interview.photo}
              alt={interview.interviewee}
              className="aspect-[4/5] rounded-[28px]"
              curtainClassName="bg-ink"
            />
            <Reveal delay={0.5} className="absolute -bottom-6 left-6 right-6 md:left-auto md:-right-8 md:w-72">
              <div className="rounded-2xl bg-ink/90 backdrop-blur-xl border border-accent/25 p-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
                <p className="font-heading text-2xl text-white leading-tight">{interview.interviewee}</p>
                <p className="text-xs text-accent mt-1">{interview.position}, {interview.organization}</p>
              </div>
            </Reveal>
          </div>

          {/* Interview body */}
          <div className="lg:col-span-7 space-y-10 pt-8 lg:pt-0">
            <Reveal y={12}>
              <span className="eyebrow !text-accent">Spotlight Interview</span>
            </Reveal>

            <SplitHeading
              text={`"${interview.title}"`}
              className="font-heading italic text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02]"
            />

            <Reveal delay={0.15}>
              <blockquote className="relative pl-8 border-l border-accent/50">
                <p className="text-xl md:text-2xl font-light text-stone-300 leading-relaxed">{interview.quote}</p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.25}>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {interview.highlights.map((h, i) => (
                  <li key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-accent/40 transition-all duration-500">
                    <span className="block font-heading italic text-accent text-2xl mb-3">0{i + 1}</span>
                    <span className="text-sm text-stone-300 leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Q&A */}
            <Reveal delay={0.35} className="border-t border-white/10">
              {interview.questions.map((qa, i) => {
                const open = openQ === i;
                return (
                  <div key={i} className="border-b border-white/10">
                    <button
                      onClick={() => setOpenQ(open ? null : i)}
                      aria-expanded={open}
                      className="w-full flex items-center gap-5 py-6 text-left group"
                    >
                      <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold w-6 shrink-0">Q{i + 1}</span>
                      <span className="flex-1 font-serif text-lg md:text-xl text-white group-hover:text-accent transition-colors">{qa.q}</span>
                      <motion.span
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-colors ${open ? 'bg-accent border-accent text-ink' : 'border-white/20 text-stone-400'}`}
                      >
                        <Plus size={15} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pl-11 pr-14 pb-7 text-stone-400 font-light leading-relaxed">{qa.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.id || t._id || i} delay={i * 0.12}>
                <figure className="group relative h-full rounded-[24px] border border-white/10 bg-white/[0.03] p-9 md:p-11 overflow-hidden hover:border-accent/40 transition-colors duration-500">
                  <Quote className="absolute top-8 right-8 w-16 h-16 text-accent/10 group-hover:text-accent/25 group-hover:-rotate-6 transition-all duration-700" strokeWidth={1} />
                  <blockquote className="relative pr-12 md:pr-16 font-heading italic text-2xl md:text-[1.75rem] text-white leading-snug">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="relative mt-8 flex items-center gap-4">
                    <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C9A56F] to-accent-deep flex items-center justify-center text-white font-heading text-lg">
                      {t.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                    <span>
                      <span className="block text-sm text-white font-medium">{t.author}</span>
                      <span className="block text-xs text-stone-500">{t.role}, {t.organization}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
