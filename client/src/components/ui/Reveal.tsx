import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into view once, as they scroll into the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Splits a headline into words that rise out of a mask one after another. */
export function SplitHeading({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  animateOnMount?: boolean;
}) {
  const words = text.split(' ');
  const trigger = animateOnMount
    ? { animate: { y: '0%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-60px' } };

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em] last:mr-0" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            {...trigger}
            transition={{ duration: 1, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Eyebrow + title + optional lede, the standard header for every section. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={`space-y-5 ${centered ? 'text-center mx-auto max-w-2xl' : ''} ${className}`}>
      {eyebrow && (
        <Reveal y={12}>
          <span className={`eyebrow ${centered ? 'eyebrow-center' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <SplitHeading text={title} className="section-title" />
      {lede && (
        <Reveal delay={0.15} y={16}>
          <p className={`lede ${centered ? 'mx-auto' : ''} max-w-xl`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
