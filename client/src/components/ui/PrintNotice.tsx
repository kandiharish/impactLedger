import { ShieldAlert } from 'lucide-react';

/** The publisher's notice that accompanies every edition, as printed in the magazine. */
export const PRINT_NOTICE =
  'Unauthorised printing of this document is prohibited. This copy is intended solely for marketing demonstration purposes.';

export default function PrintNotice({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark';
  return (
    <p
      role="note"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-[13px] leading-relaxed ${
        dark ? 'border-white/10 bg-white/[0.04] text-stone-400' : 'border-accent/25 bg-accent-soft/40 text-stone-600'
      } ${className}`}
    >
      <ShieldAlert size={16} className={`shrink-0 mt-0.5 ${dark ? 'text-accent' : 'text-accent-deep'}`} />
      <span>
        <strong className={`font-semibold ${dark ? 'text-stone-200' : 'text-ink'}`}>Note:</strong> {PRINT_NOTICE}
      </span>
    </p>
  );
}
