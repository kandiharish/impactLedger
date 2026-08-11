import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { ArrowRight, BookOpen, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function CountingNumber({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [count, isInView, value, duration]);

  return <span ref={ref}>{displayValue < 10 ? `0${displayValue}` : displayValue}</span>;
}

export default function ImpactMap() {
  return (
    <section className="w-full bg-transparent text-gray-900 relative overflow-hidden font-sans border-t border-gray-200">
      
      {/* MAP BACKGROUND CONTAINER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("/image%20copy%202.png")'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Typography */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <span className="text-[#C4A47C] text-xs font-bold uppercase tracking-[0.2em]">Impact Across India</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Stories from<br />every corner of<br />our nation
            </h2>
          </div>
          
          <p className="text-gray-600 font-light leading-relaxed max-w-sm">
            Real stories. Real impact. From cities to remote villages, discover initiatives that are creating meaningful change across India.
          </p>
          
          <div className="pt-4 flex flex-col gap-12">
            <Link to="/stories" className="group flex items-center gap-3 text-[#C4A47C] text-xs font-bold uppercase tracking-widest hover:text-[#e0c4a0] transition-colors w-fit">
              Explore Stories 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* CENTER COLUMN: Spacer for Map */}
        <div className="lg:col-span-4 hidden lg:block h-[500px]">
           {/* Space reserved for map visibility */}
        </div>

        {/* RIGHT COLUMN: Interactive Stats Panel */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-transparent backdrop-blur-[2px] border border-[#C4A47C] rounded-lg p-6 space-y-6 shadow-[0_0_20px_rgba(196,164,124,0.6),inset_0_0_10px_rgba(196,164,124,0.3)] relative overflow-hidden"
          >
            {/* Top State Info */}
            <div className="flex justify-between items-start border-b border-[#C4A47C]/20 pb-5">
              <div>
                <h3 className="text-[#4A3B2C] font-serif text-xl font-bold tracking-wide">TELANGANA</h3>
                <p className="text-[#8B7355] text-xs mt-1 font-semibold">South India</p>
              </div>
              <MapPin className="text-[#C4A47C] w-6 h-6" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-y-6 border-b border-[#C4A47C]/20 pb-6">
              <div>
                <div className="text-2xl font-serif text-[#4A3B2C] mb-1"><CountingNumber value={48} duration={2.5} /></div>
                <div className="text-[#8B7355] text-[10px] font-bold uppercase tracking-wider">Stories</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-[#4A3B2C] mb-1"><CountingNumber value={24} duration={2.5} /></div>
                <div className="text-[#8B7355] text-[10px] font-bold uppercase tracking-wider">Organizations</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-[#4A3B2C] mb-1"><CountingNumber value={16} duration={2.5} /></div>
                <div className="text-[#8B7355] text-[10px] font-bold uppercase tracking-wider">Communities</div>
              </div>
              <div>
                <div className="text-2xl font-serif text-[#4A3B2C] mb-1"><CountingNumber value={8} duration={2.5} /></div>
                <div className="text-[#8B7355] text-[10px] font-bold uppercase tracking-wider">Districts</div>
              </div>
            </div>

            {/* Featured Story Snippet */}
            <div className="pt-2">
               <div className="text-[9px] text-[#8B7355] font-bold uppercase tracking-widest mb-3">Featured Story</div>
               <div className="flex gap-4 items-center">
                 <div className="flex-1 space-y-2">
                   <h4 className="text-[#4A3B2C] font-serif text-xs leading-snug">Empowering Rural Youth through Education</h4>
                   <Link to="/stories" className="text-[#C4A47C] hover:text-[#8B7355] text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 group transition-colors">
                     Read Story <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </div>
                 <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0 shadow-sm border border-[#C4A47C]/20">
                   <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=200" alt="Students" className="w-full h-full object-cover" />
                 </div>
               </div>
            </div>
          </motion.div>

          <button className="w-full py-3.5 border border-[#C4A47C]/30 hover:border-[#C4A47C]/60 bg-transparent hover:bg-[#C4A47C]/5 transition-colors rounded-lg flex justify-center items-center gap-3 text-[#4A3B2C] hover:text-[#2a2118] text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#C4A47C]" />
            View All States
          </button>
        </div>
        
      </div>

      {/* BOTTOM QUOTE BAR */}
      <div className="w-full text-center py-16 md:py-20 relative z-20 mt-8">
         <div className="max-w-3xl mx-auto px-6 relative">
            <span className="text-[#C4A47C] text-8xl font-serif absolute -top-8 md:-top-12 left-0 md:-left-8 opacity-40 pointer-events-none">“</span>
            <p className="text-2xl md:text-3xl font-serif text-gray-900 italic font-medium leading-relaxed relative z-10">
              India's progress is written every day by the people who refuse to give up.
            </p>
            <div className="mt-6 text-[#C4A47C] text-sm font-semibold tracking-widest uppercase">
              — The Impact Ledger —
            </div>
         </div>
      </div>
    </section>
  );
}
