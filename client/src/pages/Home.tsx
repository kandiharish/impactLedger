import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  mockStories, 
  mockCategories, 
  mockMagazineIssues, 
  mockOrganizations, 
  mockInterviews, 
  mockTestimonials, 
  mockFAQs 
} from '../data/mockData';
import StoryCard from '../components/ui/StoryCard';
import MagazineCard from '../components/ui/MagazineCard';
import OrganizationCard from '../components/ui/OrganizationCard';
import InterviewCard from '../components/ui/InterviewCard';
import FAQAccordion from '../components/ui/FAQAccordion';
import FadeIn from '../components/ui/FadeIn';
import StatCounter from '../components/ui/StatCounter';
import CommunityGallery from '../components/ui/CommunityGallery';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter stories for different sections
  const featuredStory = mockStories.find(s => s.isFeatured) || mockStories[0];
  const editorsPicks = mockStories.filter(s => s.isEditorsPick);
  const latestStories = mockStories.slice(0, 3);
  const currentMagazine = mockMagazineIssues[0];
  const spotlightInterview = mockInterviews[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        <div className="lg:col-span-6 space-y-6">
          <FadeIn direction="up">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Editorial Front Page</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-[1.1] tracking-tight">
              Celebrating Stories That Change Lives.
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed font-sans max-w-xl">
              The Impact Ledger is a premium editorial publication celebrating positive transformation. We document CSR triumphs, grassroots NGO efforts, and community-led sustainability initiatives across the globe.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/stories" 
                className="bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-button transition-all shadow-sm transform hover:-translate-y-0.5"
              >
                Explore Stories
              </Link>
              <Link 
                to="/submit-story" 
                className="bg-white hover:bg-background-warm text-primary border border-border-light text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-button transition-all"
              >
                Submit Your Story
              </Link>
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-6">
          <FadeIn direction="none" delay={0.2}>
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-md group">
              <img 
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80" 
                alt="Community transformation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Story Spotlight */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4 flex justify-between items-end">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Featured Spotlight</h2>
            <span className="text-xs text-accent font-semibold uppercase tracking-wider">Read Cover Story</span>
          </div>
        </FadeIn>
        {featuredStory && (
          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-surface-pure border border-border-light rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[300px] overflow-hidden group">
                <img 
                  src={featuredStory.featuredImage} 
                  alt={featuredStory.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent">{featuredStory.category}</span>
                  <h3 className="font-serif text-2.5xl md:text-3xl font-bold text-primary leading-tight">
                    {featuredStory.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    {featuredStory.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-border-light flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs">
                      {featuredStory.author.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary">{featuredStory.author.name}</p>
                      <p className="text-[10px] text-text-secondary">{featuredStory.author.role}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/stories/${featuredStory.slug}`} 
                    className="bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold px-5 py-3 rounded-button transition-all"
                  >
                    Read Story
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </section>

      {/* Editor's Picks */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Editor's Picks</h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {editorsPicks.map((story, i) => (
            <FadeIn key={story.id} direction="up" delay={i * 0.1}>
              <StoryCard story={story} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Impact Categories */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Impact Fields</h2>
            <p className="text-sm text-text-secondary mt-1">Explore articles organized by focus area</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((cat, i) => (
            <FadeIn key={cat.id} direction="up" delay={i * 0.05}>
              <Link 
                to={`/stories?category=${cat.slug}`}
                className="group bg-surface-pure border border-border-light rounded-card p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[160px] transform hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <span className="text-accent text-xs font-semibold uppercase tracking-widest">{cat.name}</span>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
                    {cat.description}
                  </p>
                </div>
                <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1.5 self-start mt-4">
                  Browse Field &rarr;
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Editorial Core Philosophy Banner */}
      <FadeIn direction="up">
        <section className="bg-primary text-white rounded-card p-8 md:p-16 text-center space-y-6 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <span className="text-xs uppercase tracking-widest text-accent font-semibold relative z-10">Our Philosophy</span>
          <h2 className="text-3.5xl md:text-5xl font-serif font-bold italic max-w-3xl mx-auto leading-tight relative z-10">
            "Every Impact Deserves to Be Remembered"
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-xl mx-auto font-sans relative z-10">
            We believe in recording real, measurable human triumphs to build a permanent registry of positive change for future generations.
          </p>
          <div className="pt-4 relative z-10">
            <Link 
              to="/about" 
              className="inline-block bg-accent hover:bg-yellow-600 text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-button transition-all"
            >
              Read Our Vision
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* Featured Magazine Edition */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Latest Digital Issue</h2>
          </div>
        </FadeIn>
        {currentMagazine && (
          <FadeIn direction="up" delay={0.1}>
            <MagazineCard issue={currentMagazine} />
          </FadeIn>
        )}
      </section>

      {/* Latest Stories Grid */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4 flex justify-between items-end">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Latest Publications</h2>
            <Link to="/stories" className="text-xs font-bold text-accent hover:underline">
              View All Publications &rarr;
            </Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestStories.map((story, i) => (
            <FadeIn key={story.id} direction="up" delay={i * 0.1}>
              <StoryCard story={story} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Spotlight Interview */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Spotlight Interview</h2>
          </div>
        </FadeIn>
        {spotlightInterview && (
          <FadeIn direction="up" delay={0.1}>
            <InterviewCard interview={spotlightInterview} />
          </FadeIn>
        )}
      </section>

      {/* Featured Organizations */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Featured Collaborators</h2>
            <p className="text-sm text-text-secondary mt-1">NGOs and corporations enabling active societal impact</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockOrganizations.map((org, i) => (
            <FadeIn key={org.id} direction="up" delay={i * 0.1}>
              <OrganizationCard org={org} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Impact Statistics */}
      <FadeIn direction="up">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-surface-pure border border-border-light rounded-card p-8 text-center shadow-sm">
          <StatCounter value="150+" label="Stories Published" />
          <StatCounter value="85+" label="NGOs Collaborated" />
          <StatCounter value="240K+" label="Active Readers" />
          <StatCounter value="12" label="Digital Volumes" />
        </section>
      </FadeIn>

      {/* Community Gallery */}
      <CommunityGallery />

      {/* Testimonials */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Community Voices</h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTestimonials.map((t, i) => (
            <FadeIn key={t.id} direction="up" delay={i * 0.1}>
              <div className="bg-surface-pure border border-border-light rounded-card p-8 space-y-4 shadow-sm relative h-full">
                <span className="text-4xl text-accent font-serif absolute top-4 right-6 opacity-30">“</span>
                <p className="text-sm italic text-text-secondary font-serif leading-relaxed relative z-10">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-border-light">
                  <p className="text-xs font-bold text-primary">{t.author}</p>
                  <p className="text-[10px] text-text-secondary">{t.role}, {t.organization}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="border-b border-border-light pb-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Frequently Asked Questions</h2>
          </div>
        </FadeIn>
        <FAQAccordion items={mockFAQs} />
      </section>

      {/* Newsletter Signup */}
      <FadeIn direction="up">
        <section className="bg-surface-pure border border-border-light rounded-card p-8 md:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">Stay Informed</span>
            <h2 className="text-2.5xl md:text-3.5xl font-serif font-bold text-primary">Subscribe to the Impact Digest</h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              Get monthly updates of verified case studies, NGO reports, and premium digital publications directly in your inbox.
            </p>
          </div>
          {subscribed ? (
            <div className="bg-green-50 text-success-green border border-green-200 rounded-button p-4 text-xs font-semibold animate-fade">
              ✓ Subscription successful! Welcome to The Impact Ledger family.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background-warm border border-border-light rounded-input px-4 py-3 text-sm focus:outline-none focus:border-accent text-primary placeholder-gray-400"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-button transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>
      </FadeIn>
    </div>
  );
}
