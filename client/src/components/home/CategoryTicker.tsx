import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';

/** A slow, endless band of the fields we cover; each one opens the filtered story list. */
export default function CategoryTicker() {
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: () => api.getCategories() });
  if (categories.length === 0) return null;

  // Two identical halves so the -50% keyframe loops seamlessly
  const loop = [...categories, ...categories, ...categories, ...categories];

  return (
    <section className="relative border-y border-line bg-white/40 overflow-hidden py-7 md:py-9" aria-label="Fields of impact">
      {/* Fade the edges into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-gradient-to-l from-paper to-transparent" />

      <div className="animate-marquee-left items-center" style={{ animationDuration: '60s' }}>
        {loop.map((cat, i) => (
          <Link
            key={`${cat.slug}-${i}`}
            to={`/stories?category=${cat.slug}`}
            className="group flex items-center gap-10 md:gap-14 pr-10 md:pr-14 shrink-0"
            tabIndex={i < categories.length ? 0 : -1}
          >
            <span className="font-heading italic text-4xl md:text-6xl text-ink/80 group-hover:text-accent-deep transition-colors duration-500 whitespace-nowrap">
              {cat.name}
            </span>
            <span className="w-2.5 h-2.5 rotate-45 bg-accent/70 group-hover:bg-accent group-hover:rotate-[225deg] transition-all duration-700" />
          </Link>
        ))}
      </div>
    </section>
  );
}
