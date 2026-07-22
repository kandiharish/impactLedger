import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, ArrowRight } from 'lucide-react';
import { api } from '../api';

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
    queryFn: () => api.getStories(selectedCategory, searchQuery)
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

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-primary">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/stories%20bg.png" 
          alt="Stories Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Floating Navbar (Liquid Glass) */}
      <nav className="absolute top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="liquid-glass rounded-full px-4 py-2 hover:bg-white/10 transition-colors duration-300">
          <Link to="/">
            <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden lg:flex liquid-glass rounded-full px-2 py-2 items-center gap-2">
          <Link to="/" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Home</Link>
          <Link to="/stories" className="px-4 py-2 text-sm font-medium text-white font-sans bg-white/10 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/magazine" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white/80 font-sans hover:text-white hover:bg-white/10 rounded-full transition-all duration-300">Contact</Link>
          <button className="bg-white text-primary px-5 py-2 rounded-full text-sm font-bold ml-2 hover:scale-105 transition-transform duration-300">Subscribe</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
          <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"><Search size={20} className="text-white" /></button>
          <button className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"><Menu size={20} className="text-white" /></button>
        </motion.div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* Elegant Header */}
        <div className="text-center space-y-6 mb-16 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading italic text-white tracking-tight"
          >
            The Editorial
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto font-sans font-light"
          >
            Discover verified stories of sustainable impact, resilient leadership, and community transformation across the globe.
          </motion.p>
        </div>

        {/* Clean Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/20 pb-6"
        >
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => selectCategory('all')}
              className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'text-white border-b-2 border-white pb-1' 
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              All Stories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id || cat.id}
                onClick={() => selectCategory(cat.slug)}
                className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                  selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                    ? 'text-white border-b-2 border-white pb-1' 
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-white/30 px-2 py-2 text-sm text-white focus:outline-none focus:border-white placeholder-white/40 transition-colors"
            />
            <Search size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </motion.div>

        {/* Clean, Uniform Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : stories.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
          >
            <AnimatePresence mode="popLayout">
              {stories.map((story) => (
                <motion.div
                  layout
                  key={story._id || story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col"
                >
                  <Link to={`/stories/${story.slug}`} className="block overflow-hidden rounded-2xl mb-6 bg-white/5 aspect-[4/3]">
                    <img 
                      src={story.featuredImage} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-3">
                      {story.category}
                    </span>
                    <Link to={`/stories/${story.slug}`}>
                      <h3 className="text-2xl font-heading text-white leading-snug mb-3 group-hover:text-accent transition-colors duration-300">
                        {story.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-white/70 font-sans line-clamp-3 mb-6 font-light leading-relaxed">
                      {story.summary}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        to={`/stories/${story.slug}`} 
                        className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
                      >
                        Read Story <ArrowRight size={14} className="text-accent" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <h3 className="font-serif text-2xl text-white/50">No Stories Found</h3>
            <p className="text-sm text-white/40">Try adjusting your category or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
