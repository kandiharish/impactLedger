import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';

const TEAM_MEMBERS = [
  { name: "Sarah Jenkins", role: "Editor-in-Chief", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800", bio: "Former investigative lead at global news outlets, now dedicated to solution journalism. Sarah has spent two decades documenting systemic change across the globe, bringing unparalleled rigor to our editorial process." },
  { name: "David Chen", role: "Head of Archives", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=800", bio: "Curator of The Vault, bringing order to decades of environmental and social impact data. David specializes in historical data analysis and ensuring our records of impact remain immutable." },
  { name: "Amara Okoro", role: "Field Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800", bio: "Oversees ground operations and authentic sourcing in emerging markets. Amara spends 9 months of the year on the frontlines, ensuring our stories reflect ground realities." },
  { name: "Elena Rostova", role: "Senior Analyst", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800", bio: "Expert in philanthropic capital allocation and CSR efficiency tracking. Elena's data models have reshaped how Fortune 500s measure their social ROI." },
  { name: "Michael Chang", role: "Visual Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800", bio: "Award-winning photojournalist responsible for The Impact Ledger's distinct visual identity. His lens captures the dignity and resilience of human endeavor." },
  { name: "Priya Sharma", role: "Policy Correspondent", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=800", bio: "Navigates the complex web of global legislation, translating bureaucratic shifts into actionable insights for our readers." },
  { name: "James Holden", role: "Environmental Editor", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800", bio: "A former marine biologist turned journalist. James focuses exclusively on ecological restoration projects and blue economy initiatives." },
  { name: "Anita Desai", role: "Social Impact Lead", image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=600&h=800", bio: "Specializes in grassroots empowerment and education models. Anita's work bridges the gap between high-level policy and community action." },
  { name: "Carlos Mendez", role: "Global Affairs", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800", bio: "Analyzes macroeconomic trends and their effects on international aid flows. Carlos provides the critical economic context for our investigations." },
  { name: "Lisa Wong", role: "Managing Editor", image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=600&h=800", bio: "The operational heart of the publication. Lisa orchestrates our global network of contributors and ensures our daily and annual releases are flawless." },
];

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number?: number; isCover?: boolean }>(
  ({ children, isCover }, ref) => {
    return (
      <div className={`page h-full bg-white shadow-xl ${isCover ? 'bg-[#FAF9F6]' : ''}`} ref={ref}>
        <div className={`h-full w-full flex flex-col ${isCover ? 'justify-center items-center text-center p-12' : 'p-8'}`}>
          {children}
        </div>
      </div>
    );
  }
);

export default function Team() {
  return (
    <div className="flex flex-col min-h-screen relative bg-white text-gray-900 overflow-hidden">
      {/* Background Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Fixed Navbar */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>
          <Link to="/team" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Team</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-12 pt-32 pb-16 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-accent font-semibold inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            Meet The Editorial Board
            <span className="w-8 h-[1px] bg-accent"></span>
          </span>
          <p className="text-gray-500 font-light text-sm italic">Drag the pages or click the corners to flip the book.</p>
        </motion.div>

        {/* 3D Book Container */}
        <div className="flex justify-center w-full pb-20 drop-shadow-2xl">
          {/* @ts-ignore - react-pageflip typing requires all props even if optional at runtime */}
          <HTMLFlipBook 
            width={400} 
            height={600} 
            size="stretch"
            minWidth={300}
            maxWidth={500}
            minHeight={400}
            maxHeight={700}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="book-element"
          >
            
            {/* Cover Page */}
            <Page isCover>
              <div className="h-full flex flex-col items-center justify-center border-4 border-gray-900 p-8 relative">
                 <div className="absolute top-4 left-4 right-4 bottom-4 border border-gray-900/20 pointer-events-none"></div>
                 <h1 className="text-4xl font-serif font-bold text-gray-900 uppercase tracking-widest leading-tight">The<br/>Impact<br/>Ledger</h1>
                 <div className="w-16 h-[2px] bg-accent my-8"></div>
                 <h2 className="text-xl font-heading text-gray-800">The Editorial Board</h2>
                 <p className="mt-8 text-xs text-gray-500 tracking-widest uppercase">Volume I</p>
              </div>
            </Page>

            {/* Inner Pages (Team Members) */}
            {TEAM_MEMBERS.map((member, index) => (
              <Page key={index} number={index + 1}>
                <div className="flex flex-col h-full border border-gray-100 bg-[#FAFAFA] rounded shadow-sm overflow-hidden">
                  <div className="h-3/5 w-full bg-gray-200 relative">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-2xl font-serif font-bold text-white">{member.name}</h3>
                      <p className="text-accent text-xs font-bold tracking-widest uppercase">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <p className="text-gray-700 font-light text-sm leading-relaxed">
                      "{member.bio}"
                    </p>
                    <div className="text-right text-xs text-gray-400 font-mono">
                      pg. {index + 1}
                    </div>
                  </div>
                </div>
              </Page>
            ))}

            {/* Back Cover */}
            <Page isCover>
              <div className="h-full flex flex-col items-center justify-center bg-gray-900 text-white p-12">
                 <img src="/main%20logo.png" alt="Logo" className="h-16 w-auto mb-8 filter brightness-0 invert opacity-50" />
                 <p className="text-sm font-light text-center text-gray-400 max-w-xs">
                   Documenting the systemic shifts that define our era.
                 </p>
              </div>
            </Page>

          </HTMLFlipBook>
        </div>

      </div>
    </div>
  );
}
