import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { api } from '../../api';
import ImageReveal from '../ui/ImageReveal';
import { Reveal, SectionHeading } from '../ui/Reveal';

/** Lead story beside a column of editor's picks — the "front page" of the home screen. */
export default function FeaturedStories() {
  const { data: stories = [] } = useQuery({ queryKey: ['stories', 'all', ''], queryFn: () => api.getStories('all', '') });

  const featured = stories.find((s) => s.isFeatured) ?? stories[0];
  const picks = stories.filter((s) => s.isEditorsPick && s !== featured).slice(0, 3);

  if (!featured) return null;

  return (
    <section className="relative pt-20 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured" title="Latest Stories" />
          <Reveal>
            <Link to="/stories" className="btn btn-ghost !text-xs uppercase tracking-[0.18em]">
              All Stories <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Lead story */}
          <Link to={`/stories/${featured.slug}`} className="group lg:col-span-7 flex flex-col">
            <div className="relative">
              <ImageReveal
                src={featured.featuredImage}
                alt={featured.title}
                className="aspect-[16/11] rounded-[24px] shadow-[var(--shadow-lift)]"
                imgClassName="transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.18]"
              />
              <span className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-deep">
                {featured.category}
              </span>
              <span className="absolute bottom-5 right-5 z-10 w-14 h-14 rounded-full bg-white text-ink flex items-center justify-center shadow-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <ArrowUpRight size={20} />
              </span>
            </div>
            <Reveal delay={0.2} className="pt-8 space-y-4">
              <div className="flex items-center gap-3 text-[11px] text-stone-500 uppercase tracking-[0.16em]">
                <span>{featured.publishedDate}</span>
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span>{featured.readingTime}</span>
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span>{featured.author.name}</span>
              </div>
              <h3 className="font-heading text-4xl md:text-5xl text-ink leading-[1.05] group-hover:text-accent-deep transition-colors duration-500">
                {featured.title}
              </h3>
              <p className="lede max-w-2xl">{featured.summary}</p>
            </Reveal>
          </Link>

          {/* Editor's picks */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal className="flex items-center gap-4 pb-5 border-b border-ink">
              <span className="font-heading italic text-2xl text-ink">Editor's Picks</span>
            </Reveal>
            <div className="divide-y divide-line">
              {picks.map((story, i) => (
                <Reveal key={story.id || story._id} delay={0.1 + i * 0.1}>
                  <Link to={`/stories/${story.slug}`} className="group flex gap-5 py-7">
                    <span className="font-heading italic text-3xl text-accent/60 group-hover:text-accent transition-colors w-9 shrink-0 leading-none pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 space-y-2.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-deep">{story.category}</span>
                      <h4 className="font-serif text-xl text-ink leading-snug group-hover:text-accent-deep transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-sm text-stone-500 font-light line-clamp-2 leading-relaxed">{story.summary}</p>
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden">
                      <img src={story.featuredImage} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
