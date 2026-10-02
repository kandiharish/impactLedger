import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { api } from '../api';
import { SplitHeading } from '../components/ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

function StorySkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="skeleton aspect-[4/3] rounded-[20px]" />
      <div className="skeleton h-3 w-24 rounded-full" />
      <div className="skeleton h-6 w-4/5 rounded-full" />
      <div className="skeleton h-4 w-full rounded-full" />
      <div className="skeleton h-4 w-2/3 rounded-full" />
    </div>
  );
}

export default function Stories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = searchParams.get('category') || 'all';

  // Fetch categories and stories from MERN backend
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories()
  });

  const { data: stories = [], isLoading: loadingStories } = useQuery({
    queryKey: ['stories', selectedCategory, searchQuery],
    queryFn: () => api.getStories(selectedCategory, searchQuery),
    placeholderData: (prev) => prev,
  });

  const selectCategory = (categorySlug: string) => {
    if (categorySlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categorySlug);
    }
    setSearchParams(searchParams);
  };

  const isLoading = loadingCategories || loadingStories;

  const filters = [{ slug: 'all', name: 'All Stories', key: 'all' }, ...categories.map((c) => ({ slug: c.slug, name: c.name, key: c._id || c.id || c.slug }))];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-transparent text-ink">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 bg-transparent pointer-events-none">
        <img
          src="/stories%20bg.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-paper/90 to-paper"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-40 md:pt-44 pb-28">

        {/* Elegant Header */}
        <div className="text-center space-y-7 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="eyebrow eyebrow-center"
          >
            The Impact Ledger
          </motion.span>
          <SplitHeading
            as="h1"
            animateOnMount
            delay={0.25}
            text="Stories"
            className="display-title italic text-7xl md:text-9xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            className="text-lg text-stone-600 max-w-2xl mx-auto font-sans font-light leading-relaxed"
          >
            Discover verified stories of sustainable impact, resilient leadership, and community transformation across the globe.
          </motion.p>
        </div>

        {/* Category Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
          className="sticky top-24 z-20 mb-14 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-2 rounded-[28px] lg:rounded-full bg-white/75 backdrop-blur-xl border border-line shadow-[0_14px_40px_-24px_rgba(40,28,12,0.35)]"
        >
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {filters.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.key}
                  onClick={() => selectCategory(cat.slug)}
                  className={`relative shrink-0 px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
                    active ? 'text-white' : 'text-stone-500 hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="story-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search stories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-paper/80 border border-line rounded-full pl-11 pr-10 py-2.5 text-sm text-ink focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 placeholder-stone-400 transition-all"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-200 hover:bg-ink hover:text-white text-stone-600 flex items-center justify-center transition-colors"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Story Grid */}
        {isLoading && stories.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {Array.from({ length: 6 }).map((_, i) => <StorySkeleton key={i} />)}
          </div>
        ) : stories.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          >
            <AnimatePresence mode="popLayout">
              {stories.map((story, i) => (
                <motion.article
                  layout
                  key={story._id || story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: EASE }}
                  className="group flex flex-col"
                >
                  <Link to={`/stories/${story.slug}`} className="relative block overflow-hidden rounded-[20px] mb-6 bg-stone-100 aspect-[4/3] shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-lift)] transition-shadow duration-700">
                    <img
                      src={story.featuredImage}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
                      {story.category}
                    </span>
                    <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-3 uppercase tracking-[0.14em]">
                      <span>{story.publishedDate}</span>
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span>{story.readingTime}</span>
                    </div>
                    <Link to={`/stories/${story.slug}`}>
                      <h3 className="text-[1.65rem] font-heading text-ink leading-[1.15] mb-3 group-hover:text-accent-deep transition-colors duration-300">
                        {story.title}
                      </h3>
                    </Link>
                    <p className="text-[15px] text-stone-600 font-sans line-clamp-3 mb-6 font-light leading-relaxed">
                      {story.summary}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/stories/${story.slug}`}
                        className="link-draw text-[11px] font-semibold text-ink uppercase tracking-[0.2em] hover:text-accent-deep transition-colors duration-300"
                      >
                        Read Story <ArrowUpRight size={14} className="text-accent" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center space-y-4 max-w-md mx-auto"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-accent-soft flex items-center justify-center text-accent-deep mb-6">
              <Search size={22} />
            </div>
            <h3 className="font-heading italic text-4xl text-ink">No Stories Found</h3>
            <p className="text-sm text-stone-500">Try adjusting your category or search term.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
