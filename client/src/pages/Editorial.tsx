import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Compass } from 'lucide-react';

export default function Editorial() {
  return (
    <div className="flex flex-col min-h-screen relative bg-white text-gray-900">
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Fixed Navbar */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>
          <Link to="/team" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Team</Link>
          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-16 space-y-16">
        
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <span className="text-xs uppercase tracking-widest text-accent font-semibold inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            Editor's Desk
            <span className="w-8 h-[1px] bg-accent"></span>
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
            The Editorial <br className="hidden md:block"/> Perspective
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Deep-dives, opinions, and analyses on the shifting paradigms of global impact, curated by our senior editors.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Featured Editorial Piece */}
          <div className="md:col-span-2 relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=1200&h=800" alt="Featured Editorial" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 space-y-4">
              <span className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full">Featured Opinion</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">The Green Standard is <br /> No Longer Enough</h2>
              <p className="text-gray-200 max-w-2xl text-lg font-light">Why mere compliance with environmental standards is failing the test of time, and how radical sustainability is becoming the new baseline.</p>
              <div className="flex items-center gap-3 text-white text-sm pt-4">
                <span className="font-bold">By Sarah Jenkins</span>
                <span className="w-1 h-1 rounded-full bg-accent"></span>
                <span className="text-gray-300">July 2026</span>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Pieces */}
          <div className="space-y-4 p-8 rounded-2xl bg-[#FAF9F6] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <FileText className="w-8 h-8 text-accent mb-4" />
            <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Analysis</span>
            <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-accent transition-colors">Decoding Philanthropic Capital</h3>
            <p className="text-gray-600 font-light leading-relaxed text-sm">
              An inside look at how large foundations are restructuring their grants to demand measurable, long-term impact rather than short-term deliverables.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-[#FAF9F6] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <Compass className="w-8 h-8 text-accent mb-4" />
            <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Op-Ed</span>
            <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-accent transition-colors">The Myth of Scale</h3>
            <p className="text-gray-600 font-light leading-relaxed text-sm">
              Bigger isn't always better. How hyper-local interventions are outperforming globally scaled solutions in education and healthcare outcomes.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
