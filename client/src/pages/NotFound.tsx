import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-heading italic text-[42vw] md:text-[30vw] leading-none text-accent/[0.07] select-none pointer-events-none"
        aria-hidden="true"
      >
        404
      </motion.span>

      <div className="relative space-y-7 max-w-xl">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="eyebrow eyebrow-center">
          Page Not Found
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="display-title italic text-5xl md:text-7xl"
        >
          This page isn't in the ledger.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="lede"
        >
          The link may be broken, or the page may have moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          <Link to="/" className="btn btn-dark btn-shine">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Link to="/stories" className="btn btn-ghost btn-arrow-up">
            Read Stories <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
