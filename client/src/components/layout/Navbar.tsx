import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/stories', label: 'Stories' },
  { to: '/magazine', label: 'Magazine' },
  { to: '/editorial', label: 'Editorial' },
  { to: '/contact', label: 'Contact Us' },
];

/** Height of the fixed bar; pages offset their first section by at least this much. */
export const NAVBAR_HEIGHT = 80;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
      {/* Fixed, always-solid bar: same size, position and look on every page and scroll position */}
      <header
        className="fixed top-0 inset-x-0 z-50 bg-paper/90 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-18px_rgba(40,28,12,0.25)]"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <nav className="h-full max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="The Impact Ledger — Home">
            <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 w-auto object-contain" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-serif text-[15px] font-semibold tracking-[0.08em] text-ink">THE IMPACT LEDGER</span>
              <span className="text-[9px] uppercase tracking-[0.32em] text-accent-deep mt-1.5">Stories of Change</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.to);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 xl:px-4 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                    active ? 'text-ink' : 'text-stone-500 hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-3 right-3 xl:left-4 xl:right-4 -bottom-0.5 h-[2px] rounded-full bg-accent transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/submit-story" className="hidden sm:inline-flex btn btn-gold !px-5 !py-2.5 !text-[13px] hover:!translate-y-0">
              Submit Story <ArrowUpRight size={15} />
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-white border border-line text-ink"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — opens below the bar, which itself stays put */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-paper flex flex-col justify-between px-6 pt-4 pb-8 overflow-y-auto"
            style={{ top: NAVBAR_HEIGHT }}
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-baseline justify-between py-4 border-b border-line font-heading text-4xl ${
                    isActive(link.to) ? 'text-accent-deep italic' : 'text-ink'
                  }`}
                >
                  {link.label}
                  <span className="font-sans text-xs text-stone-400">0{i + 1}</span>
                </Link>
              ))}
            </nav>
            <Link to="/submit-story" className="btn btn-gold w-full !py-4 mt-8">
              Submit Story <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
