import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockStories, mockCategories } from '../data/mockData';
import StoryCard from '../components/ui/StoryCard';
import FadeIn from '../components/ui/FadeIn';

export default function Stories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = searchParams.get('category') || 'all';

  const filteredStories = useMemo(() => {
    return mockStories.filter(story => {
      const matchesCategory = selectedCategory === 'all' || 
        story.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const selectCategory = (categorySlug: string) => {
    if (categorySlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categorySlug);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">Editorial Directory</h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <p className="text-sm text-text-secondary">
            Browse verified stories of impact, leadership, and community development.
          </p>
        </FadeIn>
      </div>

      <FadeIn direction="up" delay={0.2}>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-y border-border-light py-6">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button
              onClick={() => selectCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-text-secondary border-border-light hover:bg-background-warm'
              }`}
            >
              All Fields
            </button>
            {mockCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border transition-all ${
                  selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-text-secondary border-border-light hover:bg-background-warm'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-light rounded-input px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-accent placeholder-gray-400"
            />
          </div>
        </div>
      </FadeIn>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story) => (
              <motion.div
                layout
                key={story.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <FadeIn direction="up">
          <div className="py-20 text-center space-y-3 bg-surface-pure border border-border-light rounded-card">
            <h3 className="font-serif text-xl font-bold text-primary">No Stories Found</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto">
              We couldn't find any articles matching your search criteria. Try resetting the filters or check back later.
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
