import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * An image uncovered by a curtain that slides up as it enters the viewport,
 * then drifts gently against the scroll for a subtle parallax.
 * `curtainClassName` should match the background the image sits on.
 */
export default function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  curtainClassName = 'bg-paper',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  curtainClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  // The outer box watches the viewport; the curtain and image inherit its state via variants
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative overflow-hidden isolate ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        variants={{
          hidden: { scale: 1.25 },
          shown: { scale: 1.12, transition: { duration: 1.8, delay, ease: EASE } },
        }}
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
      />
      <motion.div
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 1 },
          shown: { scaleY: 0, transition: { duration: 1.2, delay, ease: EASE } },
        }}
        className={`absolute inset-0 z-10 origin-top ${curtainClassName}`}
      />
    </motion.div>
  );
}
