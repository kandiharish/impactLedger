import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Editorial() {
  const standards = [
    {
      icon: <ShieldCheck size={32} className="text-accent mb-4" />,
      title: "Rigorous Verification",
      desc: "Every impact story we publish is cross-checked with raw data, testimonials, and on-ground reports to ensure complete authenticity."
    },
    {
      icon: <Target size={32} className="text-accent mb-4" />,
      title: "Measurable Impact",
      desc: "We focus on initiatives that deliver quantifiable social, environmental, or economic change, moving beyond mere intent."
    },
    {
      icon: <Search size={32} className="text-accent mb-4" />,
      title: "Objective Reporting",
      desc: "Our editorial team maintains a strict boundary between reporting and advocacy, presenting facts clearly and without bias."
    }
  ];

  const processSteps = [
    { num: "01", title: "Submission", desc: "Organizations submit their impact reports with supporting data." },
    { num: "02", title: "Initial Review", desc: "Our editors assess the alignment with our core themes and criteria." },
    { num: "03", title: "Data Verification", desc: "We independently verify the metrics, reaching out to stakeholders if needed." },
    { num: "04", title: "Drafting", desc: "Our writers craft a compelling narrative around the verified facts." },
    { num: "05", title: "Publication", desc: "The story goes live across our premium digital and print editions." },
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-white text-gray-900">
      {/* Background with Noise */}
      <div className="fixed inset-0 z-0 bg-[#FAF9F6]">
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none"></div>
        {/* Subtle glowing orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-[100px]"></div>
      </div>

      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
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

      {/* Main Content Area */}
      <div className="relative z-10 w-full pt-32 pb-24">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold text-accent tracking-widest uppercase">
                <CheckCircle2 size={14} /> Our Standards
              </div>
              <h1 className="text-5xl md:text-7xl font-heading italic text-gray-900 leading-[1.1]">
                Truth in <br /> Impact.
              </h1>
              <p className="text-lg text-gray-600 font-sans font-light leading-relaxed max-w-lg">
                The Impact Ledger is committed to showcasing authentic, verified stories of change. We don't just report on good intentions; we document measurable outcomes that shape our world.
              </p>
              <div className="pt-4">
                <Link to="/submit-story" className="inline-flex items-center gap-2 bg-gray-950 text-white hover:bg-gray-800 font-bold py-4 px-8 rounded-full tracking-wider transition-all duration-300 group shadow-lg">
                  Submit for Review
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50"
            >
              <img 
                src="https://images.unsplash.com/photo-1455390582262-044cdead2708?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Editorial Process" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="font-serif text-2xl italic">"Stories that matter, backed by data you can trust."</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Pillars */}
        <div className="bg-white py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Editorial Pillars</h2>
              <p className="text-gray-500 font-light max-w-2xl mx-auto">The foundational principles that guide every article, interview, and case study we publish.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {standards.map((std, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-[#FAF9F6] p-10 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  {std.icon}
                  <h3 className="text-xl font-bold font-sans text-gray-900 mb-4">{std.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{std.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* The Process */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 self-start">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">The Review Process</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Getting published in The Impact Ledger means your initiative has passed our stringent multi-stage review. Here is what to expect when you submit your story.
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              {processSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 md:gap-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="text-4xl md:text-5xl font-serif font-bold text-gray-200 group-hover:text-accent transition-colors duration-300">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 font-light">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
