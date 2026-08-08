import { motion } from 'framer-motion';

const TEAM_MEMBERS = [
  { name: "Eleanor Wright", role: "Editor-in-Chief", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600", bio: "Eleanor has spent two decades at the intersection of journalism and social change. She ensures every story meets the highest editorial standards, bridging the gap between rigorous data analysis and compelling storytelling." },
  { name: "David Chen", role: "Investigative Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600", bio: "With a background in forensic accounting, David specializes in uncovering the true impact metrics behind corporate social responsibility claims. He leads the data verification process for all published case studies." },
  { name: "Sarah Al-Fayed", role: "Sustainability Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600", bio: "Sarah evaluates the long-term environmental and social viability of the initiatives we cover. She ensures comprehensive reporting that looks beyond immediate results to evaluate generational impact." },
  { name: "Marcus Johnson", role: "Field Reporter", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600", bio: "Marcus travels globally to document grassroots movements, bringing authentic, ground-level perspectives to The Impact Ledger. His interviews provide the human element behind the statistics." }
];

export default function TeamShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full py-8">
      {TEAM_MEMBERS.map((member, idx) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
        >
          {/* Image Container */}
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src={member.img} 
              alt={member.name} 
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
            />
          </div>
          
          {/* Overlay that appears on hover with Bio */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
            <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">{member.name}</h3>
              <span className="text-[10px] uppercase tracking-widest text-accent font-bold block mb-4 border-b border-accent/30 pb-2 inline-block">{member.role}</span>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-light font-sans line-clamp-5">
                {member.bio}
              </p>
            </div>
          </div>
          
          {/* Default visible bottom bar (hides on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-sm border-t border-gray-100 group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900">{member.name}</h3>
            <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">{member.role}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
