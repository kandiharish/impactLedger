import { motion } from 'framer-motion';

/** A gold ring and tick that draw themselves in, for form success states. */
export default function SuccessCheck({ size = 96 }: { size?: number }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping-slow" />
      <svg viewBox="0 0 52 52" className="relative w-full h-full">
        <circle cx="26" cy="26" r="25" fill="#FBF8F2" />
        <motion.circle
          cx="26" cy="26" r="24" fill="none" stroke="#B8935F" strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        <motion.path
          d="M15 27 l7 7 l15 -16" fill="none" stroke="#8C6B3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  );
}
