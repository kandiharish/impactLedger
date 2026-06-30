import FadeIn from './FadeIn';

const row1Images = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
];

const row2Images = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
];

export default function CommunityGallery() {
  // Duplicate images for infinite scroll illusion
  const list1 = [...row1Images, ...row1Images, ...row1Images];
  const list2 = [...row2Images, ...row2Images, ...row2Images];

  return (
    <section className="space-y-8 overflow-hidden py-12 bg-surface-pure border-y border-border-light">
      <FadeIn direction="up">
        <div className="text-center max-w-xl mx-auto px-6 space-y-2">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Community Footprint</span>
          <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Inside The Impact Cohorts</h2>
          <p className="text-sm text-text-secondary">
            Moments from our workshops, field reviews, and cohort meetups celebrating local change.
          </p>
        </div>
      </FadeIn>

      <div className="space-y-6 pt-4">
        {/* Row 1: Right to Left */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-left gap-6 flex">
            {list1.map((url, index) => (
              <div 
                key={`r1-${index}`} 
                className="w-72 md:w-80 aspect-[4/3] rounded-card overflow-hidden border border-border-light shadow-sm flex-shrink-0 group transform md:-skew-x-2 transition-transform duration-300"
              >
                <img 
                  src={url} 
                  alt="Community moment" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-right gap-6 flex">
            {list2.map((url, index) => (
              <div 
                key={`r2-${index}`} 
                className="w-72 md:w-80 aspect-[4/3] rounded-card overflow-hidden border border-border-light shadow-sm flex-shrink-0 group transform md:-skew-x-2 transition-transform duration-300"
              >
                <img 
                  src={url} 
                  alt="Community moment" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
