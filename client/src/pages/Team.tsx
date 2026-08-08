import { motion } from 'framer-motion';
import TeamBook from '../components/ui/TeamBook';
import { Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Team() {
  const values = [
    { icon: <Shield className="w-8 h-8 text-accent" />, title: "Integrity First", desc: "Our journalists and researchers adhere to the highest standards of truth and accountability." },
    { icon: <Users className="w-8 h-8 text-accent" />, title: "Collaborative Spirit", desc: "We work hand-in-hand with grassroots organizations to highlight true stories of change." }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-white text-gray-900">
      {/* Background with Noise */}
      <div className="fixed inset-0 z-0 bg-[#FAF9F6]">
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
        {/* Subtle glowing orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-[120px]"></div>
      </div>

      {/* Floating Glass Pill Navbar */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>
          <Link to="/team" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Team</Link>
          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Header */}
        <div className="text-center space-y-6 mb-16 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading italic text-gray-900 tracking-tight"
          >
            The Editorial Board
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-sans font-light"
          >
            Meet the writers, researchers, and directors shape-shifting the landscape of global sustainability reporting.
          </motion.p>
        </div>

        {/* The Core Team Flipbook */}
        <div className="mb-24 flex justify-center">
          <TeamBook />
        </div>

        {/* Our Code of Ethics & Values */}
        <div className="border-t border-gray-200 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Our Editorial Standards</h2>
              <p className="text-gray-600 font-sans font-light leading-relaxed">
                We believe that every story we publish should inspire, inform, and be fully accurate. Our team commits to the highest standards of journalistic integrity.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-10 space-y-6 shadow-sm">
                  <div className="p-3 w-fit rounded-xl bg-accent/10">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold font-sans text-gray-900">{val.title}</h3>
                  <p className="text-gray-600 font-sans font-light leading-relaxed text-sm">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
