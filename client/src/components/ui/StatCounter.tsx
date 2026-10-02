import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  value: string; // e.g. "150+" or "240K+" or "12"
  label: string;
}

export default function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the numeric part and suffix
    const numberMatch = value.match(/^(\d+)([K+]*)$/);
    if (!numberMatch) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numberMatch[1], 10);
    const suffix = numberMatch[2] || '';
    
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad curve
      const ease = progress * (2 - progress);
      const current = Math.floor(ease * target);
      
      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <div ref={ref} className="space-y-2">
      <p className="text-3xl md:text-4xl font-serif font-bold text-accent">{displayValue}</p>
      <p className="text-xs uppercase tracking-wider text-text-secondary font-semibold">{label}</p>
    </div>
  );
}
