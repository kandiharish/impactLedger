import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

// Names and titles as printed in the magazine's masthead (Vol. 2, No. 1)
const TEAM_MEMBERS = [
  {
    name: 'Lahari Rami Reddy',
    role: 'Editor-in-Chief',
    img: '/team/lahari.webp',
    quote: 'Some stories are meant to be read. Others are meant to be remembered.',
    bio: 'Lahari leads the editorial direction of The Impact Ledger, bringing together stories of purpose, perseverance and progress from across India and beyond.',
  },
  {
    name: 'Varanasi Aditya Kiran',
    role: 'Chief Executive Officer',
    img: '/team/aditya.webp',
    quote: 'Stories of impact. Change that matters.',
    bio: 'Aditya leads The Impact Ledger as Chief Executive Officer, guiding the publication and its mission to document and amplify the people and organisations creating meaningful change.',
  },
];

const PAPER_STYLE: React.CSSProperties = {
  backgroundColor: '#FCFAF5',
  backgroundImage: 'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.9), rgba(244,236,222,0.6))',
};

const COVER_STYLE: React.CSSProperties = {
  backgroundImage: 'radial-gradient(120% 80% at 30% 0%, #26344A 0%, #171F2A 55%, #10161E 100%)',
};

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; style?: React.CSSProperties }>((props, ref) => {
  return (
    <div className={`page relative overflow-hidden ${props.className || ''}`} style={props.style} ref={ref}>
      {props.children}
    </div>
  );
});

/** Running header shared by every inside page, like a printed magazine. */
function RunningHead({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`absolute top-6 inset-x-8 md:inset-x-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#A08A6A] pointer-events-none ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      <span>The Impact Ledger</span>
      <span className="flex-1 h-px bg-[#C4A47C]/30" />
      <span>Our Team</span>
    </div>
  );
}

function Folio({ n, side }: { n: number; side: 'left' | 'right' }) {
  return (
    <div className={`absolute bottom-6 ${side === 'left' ? 'left-8 md:left-10' : 'right-8 md:right-10'} font-heading italic text-sm text-[#A08A6A] pointer-events-none`}>
      {String(n).padStart(2, '0')}
    </div>
  );
}

export default function TeamBook() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isClosed, setIsClosed] = useState(true);

  const handleFlip = (e: { data: number }) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { /* browsers may block sound until the visitor interacts */ });
    }
    // The cover sits alone on the right; centre the book while it's closed
    setIsClosed(e.data === 0);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 w-full relative z-10">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/office/paper_flip.ogg" preload="auto" />

      <div className="relative w-full max-w-5xl flex justify-center">
        {/* @ts-ignore - HTMLFlipBook types are often incompatible with React 18+ strict mode */}
        <HTMLFlipBook
          width={450}
          height={580}
          size="stretch"
          minWidth={290}
          maxWidth={520}
          minHeight={380}
          maxHeight={680}
          maxShadowOpacity={0.35}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className={`flip-book z-40 bg-transparent transition-transform duration-700 ease-in-out ${isClosed ? 'md:-translate-x-1/4' : 'translate-x-0'}`}
        >
          {/* Front Cover */}
          <Page className="bg-[#171F2A] shadow-[10px_0_30px_rgba(0,0,0,0.5)]" style={COVER_STYLE}>
            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/40 via-white/[0.06] to-transparent pointer-events-none" />
            <div className="w-full h-full flex flex-col justify-center items-center relative p-7 md:p-8">
              <div className="w-full h-full border border-[#C4A47C]/40 flex flex-col justify-center items-center p-8 text-center relative">
                <div className="absolute inset-3 border border-[#C4A47C]/20 pointer-events-none" />
                {['top-6 left-6', 'top-6 right-6 rotate-90', 'bottom-6 right-6 rotate-180', 'bottom-6 left-6 -rotate-90'].map((pos) => (
                  <span key={pos} className={`absolute ${pos} w-5 h-5 border-t border-l border-[#C4A47C]/70 pointer-events-none`} />
                ))}
                <span className="w-16 h-16 rounded-full bg-[#FDF9F1] flex items-center justify-center mb-8 shadow-[0_0_0_6px_rgba(196,164,124,0.15)]">
                  <img src="/main%20logo.png" alt="" className="h-9 w-auto" />
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C4A47C] font-semibold mb-6">The Impact Ledger</span>
                <h2 className="text-5xl md:text-7xl font-heading italic text-[#FDF9F1] leading-[0.95]">
                  Our<br />Team
                </h2>
                <div className="w-12 h-[2px] mt-10 bg-gradient-to-r from-transparent via-[#C4A47C] to-transparent" />
                <span className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[#C4A47C]/80">Stories of Impact. Change That Matters.</span>
              </div>
            </div>
          </Page>

          {TEAM_MEMBERS.flatMap((member, i) => [
            /* Portrait page (left) */
            <Page key={`img-${i}`} className="border-r border-[#C4A47C]/25" style={PAPER_STYLE}>
              <RunningHead side="left" />
              <div className="w-full h-full px-8 md:px-12 pt-14 pb-14 flex flex-col items-center justify-center">
                {/* Double gold frame around the portrait */}
                <div className="relative w-full max-w-[300px] p-2 border border-[#C4A47C]/60 bg-white shadow-[0_18px_40px_-22px_rgba(60,42,18,0.45)] pointer-events-none">
                  <div className="absolute -inset-2 border border-[#C4A47C]/25" />
                  <div className="aspect-[4/5] overflow-hidden bg-[#F6F2EA]">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover object-top" draggable={false} />
                  </div>
                </div>
              </div>
              <Folio n={i * 2 + 1} side="left" />
            </Page>,

            /* Profile page (right) */
            <Page key={`text-${i}`} className="border-l border-[#C4A47C]/25" style={PAPER_STYLE}>
              <RunningHead side="right" />
              <div className="w-full h-full px-9 md:px-14 pt-14 pb-14 flex flex-col justify-center relative">
                <span className="absolute right-8 md:right-12 top-16 font-heading italic text-[7rem] md:text-[9rem] leading-none text-[#C4A47C]/15 pointer-events-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8C6B3E] font-semibold mb-4 pointer-events-none">
                  {member.role}
                </span>
                <h3 className="relative font-heading text-4xl md:text-5xl text-[#15130F] leading-[1.02] mb-6 pointer-events-none">
                  {member.name}
                </h3>
                <div className="relative flex items-center gap-2 mb-6">
                  <span className="w-10 h-px bg-[#C4A47C]" />
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#C4A47C]" />
                </div>
                <p className="relative font-heading italic text-xl md:text-2xl text-[#3B2F22] leading-snug mb-5 pointer-events-none">
                  &ldquo;{member.quote}&rdquo;
                </p>
                <p className="relative text-stone-600 font-sans leading-relaxed text-sm md:text-[15px] font-light pointer-events-none">
                  {member.bio}
                </p>
              </div>
              <Folio n={i * 2 + 2} side="right" />
            </Page>,
          ])}

          {/* Back Cover */}
          <Page className="bg-[#171F2A] shadow-[-10px_0_30px_rgba(0,0,0,0.5)]" style={COVER_STYLE}>
            <div className="w-full h-full flex flex-col justify-center items-center gap-5 relative">
              <span className="w-14 h-14 rounded-full bg-[#FDF9F1] flex items-center justify-center shadow-[0_0_0_6px_rgba(196,164,124,0.15)]">
                <img src="/main%20logo.png" alt="" className="h-8 w-auto" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C4A47C]/80 font-semibold">Every Impact Deserves to Be Remembered</span>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>

      <div className="mt-10 flex items-center gap-3 text-[10px] text-stone-500 uppercase tracking-[0.3em] font-semibold">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-accent animate-ping-slow" />
          <span className="relative w-2 h-2 rounded-full bg-accent" />
        </span>
        Drag or click page corners to turn
      </div>
    </div>
  );
}
