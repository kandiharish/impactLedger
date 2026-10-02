import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { api } from '../../api';
import { Reveal } from './Reveal';

/**
 * Editorial placeholder shown where a section has no published content yet.
 * Pairs a short message with the latest edition, so readers always have somewhere to go next.
 */
export default function ComingSoon({
  eyebrow,
  title,
  message,
  secondary,
}: {
  eyebrow: string;
  title: string;
  message: string;
  secondary?: { to: string; label: string };
}) {
  const { data: issues = [] } = useQuery({ queryKey: ['magazineIssues'], queryFn: () => api.getMagazineIssues() });
  const latest = issues[0];
  const readTo = latest?.pageCount ? `/magazine/${latest.id || latest._id}/read` : '/magazine';

  return (
    <Reveal>
      <div className="surface overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(600px 300px at 0% 0%, rgba(184,147,95,0.12), transparent 70%)' }}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center p-8 md:p-14">
          <div className={latest ? 'md:col-span-8 space-y-6' : 'md:col-span-12 space-y-6 text-center'}>
            <span className={`eyebrow ${latest ? '' : 'eyebrow-center'}`}>{eyebrow}</span>
            <h3 className="font-heading italic text-4xl md:text-5xl text-ink leading-[1.05]">{title}</h3>
            <div className={`flex items-center gap-2 ${latest ? '' : 'justify-center'}`}>
              <span className="w-10 h-px bg-accent" />
              <span className="w-1.5 h-1.5 rotate-45 bg-accent" />
            </div>
            <p className={`lede text-[17px] ${latest ? 'max-w-xl' : 'max-w-xl mx-auto'}`}>{message}</p>
            <div className={`flex flex-wrap gap-3 pt-2 ${latest ? '' : 'justify-center'}`}>
              <Link to={readTo} className="btn btn-dark btn-shine">
                <BookOpen size={16} /> Read the Latest Edition
              </Link>
              {secondary && (
                <Link to={secondary.to} className="btn btn-ghost btn-arrow-up">
                  {secondary.label} <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {latest && (
            <Link to={readTo} className="md:col-span-4 group block [perspective:1200px]" aria-label={`Read ${latest.title}`}>
              <div className="cover aspect-[3/4] max-w-[260px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:translateY(-10px)_rotateY(-8deg)] group-hover:shadow-[0_40px_60px_-25px_rgba(40,28,12,0.55)]">
                <img src={latest.coverImage} alt={latest.title} className="w-full h-full object-cover" />
              </div>
              <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-deep">
                {latest.issueNumber} • {latest.month} {latest.year}
              </p>
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}
