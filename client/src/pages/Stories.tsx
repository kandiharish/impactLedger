import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-transparent text-gray-900">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 bg-transparent">
        <img 
          src="/stories%20bg.png" 
          alt="Stories Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
        
        {/* Elegant Header */}
        <div className="text-center space-y-6 mb-16 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading italic text-gray-900 tracking-tight"
          >
            Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-sans font-light"
          >
            Discover verified stories of sustainable impact, resilient leadership, and community transformation across the globe.
          </motion.p>
        </div>

        {/* Clean Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-gray-200 pb-6"
        >
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => selectCategory('all')}
              className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'text-gray-900 border-b-2 border-accent pb-1' 
                  : 'text-gray-400 hover:text-gray-600'
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
                    ? 'text-gray-900 border-b-2 border-accent pb-1' 
                    : 'text-gray-400 hover:text-gray-600'
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
              className="w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 placeholder-gray-400 transition-colors"
            />
            <Search size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Clean, Uniform Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
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
                  <Link to={`/stories/${story.slug}`} className="block overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-[4/3] border border-gray-100">
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
                      <h3 className="text-2xl font-heading text-gray-900 leading-snug mb-3 group-hover:text-accent transition-colors duration-300 font-bold">
                        {story.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 font-sans line-clamp-3 mb-6 font-light leading-relaxed">
                      {story.summary}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        to={`/stories/${story.slug}`} 
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-widest hover:text-accent transition-all duration-300"
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
