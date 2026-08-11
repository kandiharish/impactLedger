import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Scale, ArrowRight, Quote } from 'lucide-react';

export default function Editorial() {
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
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-16 space-y-24">
        
        {/* --- Hero Section --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-xs uppercase tracking-widest text-accent font-semibold inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent"></span>
              Our Standards
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-gray-900 leading-tight">
              Truth in <br /> Impact.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg font-sans">
              The Impact Ledger is committed to showcasing authentic, verified stories of change. We don't just report on good intentions; we document measurable outcomes that shape our world.
            </p>
            
            <div className="flex items-center gap-6 pt-4">
              <Link to="/submit-story" className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-4 text-sm md:text-base font-semibold flex items-center gap-3 shadow-md transition-all">
                Submit for Review <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#FAF9F6] border border-gray-100 rounded-3xl p-10 md:p-16 relative shadow-sm"
          >
            <Quote className="w-16 h-16 text-accent/20 absolute top-8 left-8" />
            <div className="relative z-10 pt-8 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-4 border-b border-gray-200 pb-2 inline-block">Editorial Process</span>
              <p className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-tight italic">
                "Stories that matter, backed by data you can trust."
              </p>
            </div>
          </motion.div>
        </section>

        {/* --- Pillars Section --- */}
        <section className="py-12 border-t border-gray-150">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Editorial Pillars</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              The foundational principles that guide every article, interview, and case study we publish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Rigorous Verification",
                icon: ShieldCheck,
                desc: "Every impact story we publish is cross-checked with raw data, testimonials, and on-ground reports to ensure complete authenticity."
              },
              {
                title: "Measurable Impact",
                icon: BarChart3,
                desc: "We focus on initiatives that deliver quantifiable social, environmental, or economic change, moving beyond mere intent."
              },
              {
                title: "Objective Reporting",
                icon: Scale,
                desc: "Our editorial team maintains a strict boundary between reporting and advocacy, presenting facts clearly and without bias."
              }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="p-4 w-fit rounded-full bg-[#FAF9F6] border border-gray-100 group-hover:bg-accent/5 transition-colors mb-6">
                  <pillar.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-sm text-gray-600 font-sans font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- The Review Process --- */}
        <section className="py-12 bg-[#FAF9F6] border border-gray-100 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-serif font-bold text-gray-900">The Review Process</h2>
              <p className="text-gray-600 font-light mx-auto">
                Getting published in The Impact Ledger means your initiative has passed our stringent multi-stage review. Here is what to expect when you submit your story.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { step: "01", title: "Submission", desc: "Organizations submit their impact reports with supporting data." },
                { step: "02", title: "Initial Review", desc: "Our editors assess the alignment with our core themes and criteria." },
                { step: "03", title: "Data Verification", desc: "We independently verify the metrics, reaching out to stakeholders if needed." },
                { step: "04", title: "Drafting", desc: "Our writers craft a compelling narrative around the verified facts." },
                { step: "05", title: "Publication", desc: "The story goes live across our premium digital and print editions." },
              ].map((process, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col sm:flex-row gap-6 items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="text-4xl md:text-5xl font-serif font-bold italic text-accent/30 leading-none">
                    {process.step}
                  </div>
                  <div className="space-y-2 mt-1">
                    <h3 className="text-xl font-serif font-bold text-gray-900">{process.title}</h3>
                    <p className="text-sm text-gray-600 font-sans font-light">
                      {process.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
