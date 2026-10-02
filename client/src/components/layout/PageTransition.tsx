import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { NAVBAR_HEIGHT } from './Navbar';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>

      {/* Gold rule that sweeps along the navbar's bottom edge on every page change */}
      <motion.div
        className="fixed left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-accent-deep via-accent to-accent-soft pointer-events-none"
        style={{ top: NAVBAR_HEIGHT - 1 }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.7, ease: EASE }, opacity: { duration: 0.3, delay: 0.6 } }}
      />
    </>
  );
}
