import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';

const SECTIONS = [
  { to: '/stories', label: 'Latest Stories' },
  { to: '/magazine', label: 'The Magazine' },
  { to: '/stories', label: 'Fields of Impact' },
  { to: '/about', label: 'Interviews' },
];

const ORGANIZATION = [
  { to: '/about', label: 'About Us' },
  { to: '/submit-story', label: 'Submit a Story' },
  { to: '/about', label: 'Advertise' },
  { to: '/contact', label: 'Contact' },
];

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-sans font-semibold mb-5 tracking-[0.25em] uppercase text-[10px] text-accent">{title}</h3>
      <ul className="flex flex-col gap-3 text-sm text-stone-400">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="link-draw hover:text-white transition-colors duration-300">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-ink text-stone-300 overflow-hidden">
      {/* Soft gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(700px 300px at 50% 0%, rgba(184,147,95,0.13), transparent 70%)' }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-4 space-y-5"
          >
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-paper flex items-center justify-center">
                <img src="/main%20logo.png" alt="" className="h-7 w-auto" />
              </span>
              <h2 className="font-serif text-xl font-semibold tracking-[0.08em] text-white">THE IMPACT LEDGER</h2>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-light">
              Every Impact Deserves to Be Remembered. A premium digital editorial publication documenting stories of change, leadership, and sustainability across the globe.
            </p>
          </motion.div>

          <div className="md:col-span-2">
            <FooterColumn title="Sections" links={SECTIONS} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Organization" links={ORGANIZATION} />
          </div>

          <div className="md:col-span-4">
            <h3 className="font-sans font-semibold mb-5 tracking-[0.25em] uppercase text-[10px] text-accent">Subscribe to the Digest</h3>
            <p className="text-sm text-stone-400 mb-5 font-light">Receive monthly updates of verified case studies and premium publications.</p>
            <form onSubmit={(e) => e.preventDefault()} className="group flex items-center rounded-full bg-white/5 border border-white/10 focus-within:border-accent/60 focus-within:bg-white/[0.07] transition-colors p-1.5">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                className="bg-transparent text-white text-sm pl-4 pr-2 py-2 w-full focus:outline-none placeholder-stone-500"
              />
              <button type="submit" className="btn btn-gold !px-5 !py-2.5 !text-xs uppercase tracking-[0.15em] shrink-0">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="py-10 select-none overflow-hidden" aria-hidden="true">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading italic text-[15vw] md:text-[11vw] leading-[0.85] text-center bg-gradient-to-b from-white/[0.14] to-white/[0.02] bg-clip-text text-transparent whitespace-nowrap"
          >
            The Impact Ledger
          </motion.p>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 uppercase tracking-[0.2em] gap-4">
          <div>&copy; {new Date().getFullYear()} The Impact Ledger. All rights reserved.</div>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
