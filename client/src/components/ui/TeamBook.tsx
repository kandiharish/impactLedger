import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

const TEAM_MEMBERS = [
  { name: "Eleanor Wright", role: "Editor-in-Chief", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600", bio: "Eleanor has spent two decades at the intersection of journalism and social change. She ensures every story meets the highest editorial standards, bridging the gap between rigorous data analysis and compelling storytelling." },
  { name: "David Chen", role: "Investigative Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600", bio: "With a background in forensic accounting, David specializes in uncovering the true impact metrics behind corporate social responsibility claims. He leads the data verification process for all published case studies." },
  { name: "Sarah Al-Fayed", role: "Sustainability Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600", bio: "Sarah evaluates the long-term environmental and social viability of the initiatives we cover. She ensures comprehensive reporting that looks beyond immediate results to evaluate generational impact." },
  { name: "Marcus Johnson", role: "Field Reporter", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600", bio: "Marcus travels globally to document grassroots movements, bringing authentic, ground-level perspectives to The Impact Ledger. His interviews provide the human element behind the statistics." }
];

export default function TeamBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const nextPage = () => {
    if (isFlipping) return;
    if (currentPage === TEAM_MEMBERS.length - 1) {
      setIsOpen(false);
      setCurrentPage(0); // Reset page on close
      return;
    }
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsFlipping(false);
    }, 700);
  };

  const prevPage = () => {
    if (isFlipping) return;
    if (currentPage === 0) {
      setIsOpen(false);
      return;
    }
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(prev => prev - 1);
      setIsFlipping(false);
    }, 700);
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 w-full" style={{ perspective: '3000px' }}>
      
      {!isOpen ? (
        <motion.div 
          initial={{ rotateY: 15, rotateX: 5 }}
          animate={{ rotateY: 0, rotateX: 0 }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: -22, 
            rotateX: 4, 
            boxShadow: "30px 30px 40px rgba(0,0,0,0.22)" 
          }}
          onClick={() => setIsOpen(true)}
          className="relative w-full max-w-xs md:max-w-sm aspect-[3/4] rounded-r-3xl bg-[#1e1a15] text-white shadow-2xl cursor-pointer border-l-[10px] border-[#8B7355] origin-left transition-all duration-700 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cover Design */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between items-center text-center border-2 border-[#3a3227] rounded-r-2xl m-2 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]">
            <div className="pt-12 space-y-4 font-serif">
              <span className="text-[#c4a47c] uppercase tracking-widest text-xs font-bold block font-sans">The Impact Ledger</span>
              <h2 className="text-4xl md:text-5xl italic text-[#FAF9F6] leading-[1.1] tracking-wide">Behind<br/>The<br/>Impact<br/>Ledger</h2>
            </div>
            
            <div className="pb-8 flex flex-col items-center gap-4">
              <div className="w-16 h-[1px] bg-[#c4a47c]/50"></div>
              <p className="text-[10px] text-[#c4a47c] uppercase tracking-widest flex items-center gap-2 font-semibold font-sans">
                <BookOpen size={14} />
                Click to Open
              </p>
            </div>
          </div>
          
          {/* Paper Edge Effect */}
          <div className="absolute right-0 top-2 bottom-2 w-2 bg-gradient-to-r from-gray-200 to-white rounded-r-sm translate-x-full" style={{ transform: 'translateZ(-4px)' }}></div>
          <div className="absolute right-0 top-3 bottom-3 w-3 bg-gradient-to-r from-gray-300 to-gray-100 rounded-r-sm translate-x-full" style={{ transform: 'translateZ(-8px)' }}></div>
        </motion.div>
      ) : (
        <div className="w-full max-w-5xl overflow-visible relative">
          
          {/* --- DESKTOP 2-PAGE BOOK LAYOUT --- */}
          <motion.div 
            initial={{ opacity: 0, rotateY: 45, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="hidden md:flex relative w-full bg-[#f6f5f0] shadow-2xl rounded-sm border border-[#e3ded2] overflow-visible select-none"
            style={{ minHeight: '550px', transformStyle: 'preserve-3d' }}
          >
            {/* Book Spine Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[8px] bg-gradient-to-r from-gray-400/30 via-gray-500/50 to-gray-400/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] -translate-x-1/2 z-50 pointer-events-none"></div>
            
            {/* Left Page */}
            <div 
              onClick={prevPage}
              className="w-1/2 p-12 flex flex-col items-center justify-center border-r border-[#e8e4d9] bg-white shadow-[inset_-20px_0_30px_-20px_rgba(0,0,0,0.1)] relative cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <div className="w-full max-w-sm aspect-[4/5] relative rounded-sm overflow-hidden shadow-md p-2 bg-white border border-gray-100 pointer-events-none">
                <img 
                  src={TEAM_MEMBERS[currentPage].img} 
                  alt={TEAM_MEMBERS[currentPage].name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700" 
                />
              </div>
              <div className="absolute bottom-6 left-8 text-xs font-serif italic text-gray-400 pointer-events-none">
                Page {currentPage * 2 + 1} {currentPage === 0 && "(Click to Close)"}
              </div>
            </div>

            {/* Right Page */}
            <div 
              onClick={nextPage}
              className="w-1/2 p-16 flex flex-col justify-center bg-[#FAF9F6] shadow-[inset_20px_0_30px_-20px_rgba(0,0,0,0.05)] relative cursor-pointer hover:bg-[#f6f5ee] transition-colors"
            >
              <span className="text-xs uppercase tracking-widest text-[#8B7355] font-semibold mb-4 pointer-events-none">{TEAM_MEMBERS[currentPage].role}</span>
              <h3 className="text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight pointer-events-none">{TEAM_MEMBERS[currentPage].name}</h3>
              <p className="text-gray-600 font-sans leading-relaxed text-base font-light pointer-events-none">
                {TEAM_MEMBERS[currentPage].bio}
              </p>
              <div className="absolute bottom-6 right-8 text-xs font-serif italic text-gray-400 pointer-events-none">
                Page {currentPage * 2 + 2} {currentPage === TEAM_MEMBERS.length - 1 && "(Click to Close)"}
              </div>
            </div>

            {/* Flipping Page */}
            {isFlipping && (
              <motion.div
                initial={{ rotateY: flipDirection === 'next' ? 0 : -180 }}
                animate={{ 
                  rotateY: flipDirection === 'next' ? -180 : 0,
                  scale: [1, 1.03, 1]
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-[#faf9f6] z-45 border-l border-r border-[#e8e4d9] origin-left shadow-2xl pointer-events-none"
                style={{ 
                  left: '50%',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <motion.div 
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-black/15 mix-blend-multiply"
                />

                <div className="absolute inset-0 p-8 flex flex-col justify-center bg-[#FAF9F6] shadow-[inset_20px_0_30px_-20px_rgba(0,0,0,0.05)]" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <span className="text-xs uppercase tracking-widest text-[#8B7355] font-semibold mb-4">
                    {TEAM_MEMBERS[flipDirection === 'next' ? currentPage : currentPage - 1]?.role}
                  </span>
                  <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                    {TEAM_MEMBERS[flipDirection === 'next' ? currentPage : currentPage - 1]?.name}
                  </h3>
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-center bg-white shadow-[inset_-20px_0_30px_-20px_rgba(0,0,0,0.1)]" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <div className="w-full aspect-[4/5] relative rounded-sm overflow-hidden shadow-md p-2 bg-white border border-gray-100">
                    <img 
                      src={TEAM_MEMBERS[flipDirection === 'next' ? currentPage + 1 : currentPage]?.img} 
                      alt="Next Page Member" 
                      className="w-full h-full object-cover grayscale" 
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* --- MOBILE CARD LAYOUT --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex md:hidden flex-col bg-[#FAF9F6] border border-[#e3ded2] rounded-2xl shadow-xl overflow-hidden cursor-pointer"
            onClick={nextPage}
          >
            <div className="w-full aspect-[4/3] relative overflow-hidden bg-white border-b border-gray-200">
              <img 
                src={TEAM_MEMBERS[currentPage].img} 
                alt={TEAM_MEMBERS[currentPage].name} 
                className="w-full h-full object-cover grayscale" 
              />
              <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white">
                Member {currentPage + 1} of {TEAM_MEMBERS.length}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#8B7355] font-bold">{TEAM_MEMBERS[currentPage].role}</span>
              <h3 className="text-2xl font-serif font-bold text-gray-900">{TEAM_MEMBERS[currentPage].name}</h3>
              <p className="text-gray-600 font-sans text-xs leading-relaxed font-light">
                {TEAM_MEMBERS[currentPage].bio}
              </p>
              <div className="pt-2 text-[10px] text-center text-gray-400 font-sans uppercase tracking-widest">
                {currentPage === TEAM_MEMBERS.length - 1 ? "Click Card to Close Book" : "Click Card to Turn Page"}
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-20 left-0 right-0 flex justify-center items-center gap-6 z-30">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                prevPage();
              }}
              disabled={isFlipping}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-sm text-gray-900 hover:text-[#8B7355] hover:border-[#8B7355] transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            
            <div className="flex gap-2">
              {TEAM_MEMBERS.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentPage ? 'bg-[#8B7355]' : 'bg-gray-300'}`} />
              ))}
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                nextPage();
              }}
              disabled={isFlipping}
              className="p-3 rounded-full bg-white border border-gray-200 shadow-sm text-gray-900 hover:text-[#8B7355] hover:border-[#8B7355] transition-all"
            >
              <ArrowRight size={18} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setCurrentPage(0);
              }}
              className="ml-4 px-4 py-2 rounded-full bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B7355] transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
