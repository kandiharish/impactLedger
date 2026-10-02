import { motion } from 'framer-motion';
import { Users, Globe2, BookOpen } from 'lucide-react';
import TeamBook from '../components/ui/TeamBook';
import { Reveal, SectionHeading, SplitHeading } from '../components/ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    icon: Globe2,
    title: 'Global Reach',
    desc: 'Sourcing authentic stories from remote field operations across three continents, bypassing traditional media filters.',
  },
  {
    icon: BookOpen,
    title: 'Premium Journal',
    desc: 'Published daily through our immersive digital newsstand, and annually in a high-end physical compendium.',
  },
  {
    icon: Users,
    title: 'The Coalition',
    desc: 'Read by CSR directors, philanthropic foundations, and policy makers seeking actionable blueprints for change.',
  },
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-ink">

      {/* Main Editorial Manifesto */}
      <section className="relative overflow-hidden pt-40 md:pt-48 pb-20 md:pb-28">
        {/* Oversized watermark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute left-1/2 top-24 -translate-x-1/2 font-heading italic text-[28vw] leading-none text-accent/[0.05] select-none pointer-events-none whitespace-nowrap"
          aria-hidden="true"
        >
          Mission
        </motion.span>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center space-y-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="eyebrow eyebrow-center"
          >
            Our Mission
          </motion.span>

          <h1 className="display-title text-[3.25rem] md:text-7xl lg:text-8xl">
            <SplitHeading as="span" animateOnMount delay={0.3} text="Chronicling the" className="block" />
            <SplitHeading as="span" animateOnMount delay={0.5} text="Business of Change" className="block italic text-gold-gradient pb-2" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE }}
            className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed max-w-3xl mx-auto"
          >
            The Impact Ledger is the definitive editorial voice documenting how grassroots NGOs, corporate CSR, and environmental initiatives are rewriting the social contract.
          </motion.p>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
            className="mx-auto w-px h-20 origin-top bg-gradient-to-b from-accent to-transparent"
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.1}>
              <div className="card card-hover gold-edge group p-9 h-full">
                <div className="flex items-start justify-between mb-10">
                  <div className="icon-badge">
                    <p.icon className="w-6 h-6" strokeWidth={1.6} />
                  </div>
                  <span className="font-heading italic text-5xl text-stone-200 group-hover:text-accent/40 transition-colors duration-500">0{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-ink mb-3">{p.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-[15px]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="relative py-24 md:py-32 bg-white/50 border-y border-line overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-10">
          <SectionHeading
            align="center"
            title="Our Team"
            lede="The visionaries and journalists behind the Impact Ledger."
          />
          <Reveal delay={0.1}>
            <TeamBook />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
