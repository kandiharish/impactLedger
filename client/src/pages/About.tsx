import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Globe2, BookOpen } from 'lucide-react';
import TeamBook from '../components/ui/TeamBook';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-gray-900">
      {/* Background Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* Main Editorial Manifesto */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-16 space-y-16">
        
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <span className="text-xs uppercase tracking-widest text-accent font-semibold inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            Our Mission
            <span className="w-8 h-[1px] bg-accent"></span>
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
            Chronicling the <br className="hidden md:block"/> Business of Change
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            The Impact Ledger is the definitive editorial voice documenting how grassroots NGOs, corporate CSR, and environmental initiatives are rewriting the social contract.
          </p>
        </motion.section>



        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="space-y-4 p-8 rounded-2xl bg-[#FAF9F6] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Globe2 className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-serif font-bold text-gray-900">Global Reach</h3>
            <p className="text-gray-600 font-light leading-relaxed text-sm">
              Sourcing authentic stories from remote field operations across three continents, bypassing traditional media filters.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-[#FAF9F6] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <BookOpen className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-serif font-bold text-gray-900">Premium Journal</h3>
            <p className="text-gray-600 font-light leading-relaxed text-sm">
              Published daily through our immersive digital newsstand, and annually in a high-end physical compendium.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-[#FAF9F6] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-serif font-bold text-gray-900">The Coalition</h3>
            <p className="text-gray-600 font-light leading-relaxed text-sm">
              Read by CSR directors, philanthropic foundations, and policy makers seeking actionable blueprints for change.
            </p>
          </div>
        </motion.section>

        {/* --- Team Section --- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12 pt-16 border-t border-gray-150 overflow-hidden"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Our Team</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">The visionaries and journalists behind the Impact Ledger.</p>
          </div>

          <TeamBook />
        </motion.section>

      </div>
    </div>
  );
}
