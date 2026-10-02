import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, BarChart3, Scale, ArrowRight, Quote } from 'lucide-react';
import { Reveal, SectionHeading, SplitHeading } from '../components/ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    title: "Rigorous Verification",
    icon: ShieldCheck,
    desc: "Every impact story we publish is cross-checked with raw data, testimonials, and on-ground reports to ensure complete authenticity."
  },
  {
    title: "Measurable Impact",
    icon: BarChart3,
    desc: "We focus on initiatives that deliver quantifiable social, environmental, or economic change, moving beyond mere intent."
  },
  {
    title: "Objective Reporting",
    icon: Scale,
    desc: "Our editorial team maintains a strict boundary between reporting and advocacy, presenting facts clearly and without bias."
  }
];

const PROCESS = [
  { step: "01", title: "Submission", desc: "Organizations submit their impact reports with supporting data." },
  { step: "02", title: "Initial Review", desc: "Our editors assess the alignment with our core themes and criteria." },
  { step: "03", title: "Data Verification", desc: "We independently verify the metrics, reaching out to stakeholders if needed." },
  { step: "04", title: "Drafting", desc: "Our writers craft a compelling narrative around the verified facts." },
  { step: "05", title: "Publication", desc: "The story goes live across our premium digital and print editions." },
];

export default function Editorial() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-ink">

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-40 md:pt-44 pb-28 space-y-28 md:space-y-36">

        {/* --- Hero Section --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="eyebrow"
            >
              Our Standards
            </motion.span>

            <h1 className="display-title text-7xl md:text-8xl lg:text-[7.5rem]">
              <SplitHeading as="span" animateOnMount delay={0.3} text="Truth in" className="block" />
              <SplitHeading as="span" animateOnMount delay={0.45} text="Impact." className="block italic text-gold-gradient pb-2" />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-lg font-sans"
            >
              The Impact Ledger is committed to showcasing authentic, verified stories of change. We don't just report on good intentions; we document measurable outcomes that shape our world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="pt-2"
            >
              <Link to="/submit-story" className="btn btn-dark btn-shine !px-8 !py-4 md:!text-base">
                Submit for Review <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="relative"
          >
            {/* Stacked paper behind the quote card */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-[32px] bg-accent-soft/70 border border-line" />
            <div className="relative rounded-[32px] p-10 md:p-14 overflow-hidden bg-ink text-white shadow-[0_40px_80px_-40px_rgba(21,19,15,0.7)]">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/25 blur-3xl" />
              <Quote className="relative w-14 h-14 text-accent mb-10" strokeWidth={1.2} />
              <div className="relative space-y-6">
                <span className="text-[11px] uppercase tracking-[0.28em] text-accent font-semibold block">Editorial Process</span>
                <p className="text-3xl md:text-4xl font-heading italic leading-[1.15]">
                  "Stories that matter, backed by data you can trust."
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-accent to-transparent" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- Pillars Section --- */}
        <section className="space-y-16">
          <SectionHeading
            align="center"
            title="Editorial Pillars"
            lede="The foundational principles that guide every article, interview, and case study we publish."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="card card-hover gold-edge group p-9 h-full overflow-hidden">
                  <pillar.icon className="absolute -right-8 -bottom-8 w-40 h-40 text-accent/[0.06] transition-all duration-700 group-hover:text-accent/[0.12] group-hover:-rotate-6" strokeWidth={1} />
                  <div className="icon-badge mb-8">
                    <pillar.icon className="w-6 h-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-ink mb-4">{pillar.title}</h3>
                  <p className="relative text-[15px] text-stone-600 font-sans font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- The Review Process --- */}
        <section className="surface p-8 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-16">
            <SectionHeading
              align="center"
              title="The Review Process"
              lede="Getting published in The Impact Ledger means your initiative has passed our stringent multi-stage review. Here is what to expect when you submit your story."
            />

            <div ref={timelineRef} className="relative">
              {/* Track + progress line */}
              <div className="absolute left-[27px] md:left-[35px] top-2 bottom-2 w-px bg-line" />
              <motion.div
                style={{ scaleY: lineScale }}
                className="absolute left-[27px] md:left-[35px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-deep"
              />

              <div className="space-y-6">
                {PROCESS.map((process, idx) => (
                  <Reveal key={idx} delay={0.05}>
                    <div className="group relative flex gap-6 md:gap-8 items-start">
                      <div className="relative z-10 shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-white border border-line flex items-center justify-center shadow-[var(--shadow-soft)] group-hover:border-accent group-hover:bg-ink transition-all duration-500">
                        <span className="font-heading italic text-2xl md:text-3xl text-accent transition-colors duration-500">
                          {process.step}
                        </span>
                      </div>
                      <div className="flex-1 card p-6 md:p-7 group-hover:border-accent/40 group-hover:translate-x-1">
                        <h3 className="text-xl md:text-2xl font-serif font-semibold text-ink mb-2">{process.title}</h3>
                        <p className="text-[15px] text-stone-600 font-sans font-light leading-relaxed">
                          {process.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
