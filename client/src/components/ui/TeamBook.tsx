import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const TEAM_MEMBERS = [
  { name: "Eleanor Wright", role: "Editor-in-Chief", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600", bio: "Eleanor has spent two decades at the intersection of journalism and social change. She ensures every story meets the highest editorial standards, bridging the gap between rigorous data analysis and compelling storytelling.", theme: "editor" },
  { name: "David Chen", role: "Investigative Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600", bio: "With a background in forensic accounting, David specializes in uncovering the true impact metrics behind corporate social responsibility claims. He leads the data verification process for all published case studies.", theme: "investigative" },
  { name: "Sarah Al-Fayed", role: "Sustainability Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600", bio: "Sarah evaluates the long-term environmental and social viability of the initiatives we cover. She ensures comprehensive reporting that looks beyond immediate results to evaluate generational impact.", theme: "sustainability" },
  { name: "Marcus Johnson", role: "Field Reporter", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600", bio: "Marcus travels globally to document grassroots movements, bringing authentic, ground-level perspectives to The Impact Ledger. His interviews provide the human element behind the statistics.", theme: "reporter" }
];

const THEMES = {
  editor: {
    bg: 'bg-[#FCFBF8]',
    border: 'border-[#8B7355]/30',
    accent: 'text-[#8B7355]',
    pattern: 'radial-gradient(#d5c3b5 1px, transparent 1px)',
    patternSize: '24px 24px'
  },
  investigative: {
    bg: 'bg-[#F4F6F8]',
    border: 'border-[#34495E]/30',
    accent: 'text-[#34495E]',
    pattern: 'linear-gradient(90deg, #E5E7E9 1px, transparent 1px), linear-gradient(#E5E7E9 1px, transparent 1px)',
    patternSize: '40px 40px'
  },
  sustainability: {
    bg: 'bg-[#F9FCF9]',
    border: 'border-[#27AE60]/30',
    accent: 'text-[#27AE60]',
    pattern: 'radial-gradient(circle at 100% 100%, rgba(39, 174, 96, 0.05) 0%, transparent 60%)',
    patternSize: '100% 100%'
  },
  reporter: {
    bg: 'bg-[#FDF9F1]',
    border: 'border-[#D4AC0D]/30',
    accent: 'text-[#B7950B]',
    pattern: 'linear-gradient(45deg, rgba(212,172,13,0.03) 25%, transparent 25%, transparent 50%, rgba(212,172,13,0.03) 50%, rgba(212,172,13,0.03) 75%, transparent 75%, transparent)',
    patternSize: '30px 30px'
  }
};

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; number: number; className?: string; style?: React.CSSProperties }>((props, ref) => {
  return (
    <div className={`page shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] relative overflow-hidden ${props.className || ''}`} style={props.style} ref={ref}>
      {props.children}
    </div>
  );
});

export default function TeamBook() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 w-full relative z-10">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/office/paper_flip.ogg" preload="auto" />
      
      <div className="relative w-full max-w-5xl flex justify-center shadow-lg rounded-sm border border-[#e3ded2] bg-[#f6f5f0]">
        
        {/* @ts-ignore - HTMLFlipBook types are often incompatible with React 18+ strict mode */}
        <HTMLFlipBook 
          width={450} 
          height={550} 
          size="stretch" 
          minWidth={300} 
          maxWidth={1000} 
          minHeight={400} 
          maxHeight={1533} 
          maxShadowOpacity={0.3} 
          showCover={false} 
          mobileScrollSupport={true} 
          onFlip={playSound}
          className="flip-book z-40 bg-transparent"
        >
          {TEAM_MEMBERS.flatMap((member, i) => {
            const theme = THEMES[member.theme as keyof typeof THEMES];
            return [
              <Page 
                key={`img-${i}`} 
                number={i*2+1} 
                className={`border-r ${theme.border} ${theme.bg}`}
                style={{ backgroundImage: theme.pattern, backgroundSize: theme.patternSize }}
              >
                <div className="w-full h-full p-8 md:p-12 flex flex-col items-center justify-center relative">
                   <div className={`w-full max-w-sm aspect-[4/5] relative rounded-sm overflow-hidden shadow-sm p-1 bg-white border ${theme.border} pointer-events-none`}>
                      <img 
                        src={member.img} 
                        alt={member.name}
                        className="w-full h-full object-cover grayscale-[0.2]" 
                      />
                   </div>
                   <div className="absolute bottom-6 left-8 text-xs font-serif italic text-gray-400 pointer-events-none">
                      Page {i*2+1}
                   </div>
                </div>
              </Page>,
              
              <Page 
                key={`text-${i}`} 
                number={i*2+2} 
                className={`border-l ${theme.border} ${theme.bg}`}
                style={{ backgroundImage: theme.pattern, backgroundSize: theme.patternSize }}
              >
                <div className="w-full h-full p-10 md:p-16 flex flex-col justify-center relative">
                   <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                     <span className={`text-9xl font-serif font-black ${theme.accent}`}>{i+1}</span>
                   </div>
                   <span className={`text-xs uppercase tracking-widest ${theme.accent} font-bold mb-4 pointer-events-none`}>
                     {member.role}
                   </span>
                   <h3 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight pointer-events-none relative z-10">
                     {member.name}
                   </h3>
                   <div className={`w-12 h-1 mb-6 rounded-full bg-current ${theme.accent} opacity-50`}></div>
                   <p className="text-gray-600 font-sans leading-relaxed text-sm md:text-base font-light pointer-events-none relative z-10">
                     {member.bio}
                   </p>
                   
                   <div className="absolute bottom-6 right-8 text-xs font-serif italic text-gray-400 pointer-events-none">
                      Page {i*2+2}
                   </div>
                </div>
              </Page>
            ];
          })}
        </HTMLFlipBook>
      </div>

      <div className="mt-8 text-xs text-gray-500 uppercase tracking-widest font-semibold">
        Drag or click page corners to turn
      </div>
    </div>
  );
}
