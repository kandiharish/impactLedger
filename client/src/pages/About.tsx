import { Link } from 'react-router-dom';
import FadeIn from '../components/ui/FadeIn';

export default function About() {
  return (
    <div className="space-y-16 max-w-3xl mx-auto">
      <div className="text-center space-y-4">
        <FadeIn direction="up">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Our Mission & Purpose</span>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">About The Impact Ledger</h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-text-secondary font-sans leading-relaxed">
            Building the world's most trusted digital archive for stories of positive societal transformation.
          </p>
        </FadeIn>
      </div>

      <FadeIn direction="up" delay={0.3}>
        <div className="aspect-video w-full rounded-card overflow-hidden bg-gray-100 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
            alt="Collaboration and community"
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      <div className="space-y-12 font-sans text-base md:text-lg leading-relaxed text-text-primary">
        <FadeIn direction="up">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Why We Exist</h2>
            <p>
              In a media landscape dominated by breaking news cycles and fleeting attention, long-term positive change is often overlooked. Corporations commit millions through CSR, NGOs operate selflessly at the grassroots, and visionary leaders change lives—but their stories are rarely documented in detail.
            </p>
            <p>
              The Impact Ledger was founded to serve as a permanent editorial journal. We believe that recording progress is essential to inspire future action: <strong>"Every Impact Deserves to Be Remembered."</strong>
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Our Editorial Standard</h2>
            <p>
              Unlike typical press release sites or promotional blogs, The Impact Ledger maintains a rigorous journalistic standard. Every case study and feature profile we publish undergoes editorial review to verify:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-text-secondary">
              <li>Measurable, verified social or environmental metrics.</li>
              <li>Direct local community feedback and involvement.</li>
              <li>Sustainable methodologies that can be replicated in other geographies.</li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn direction="up">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Our Vision</h2>
            <p>
              To build a global community of CSR professionals, social innovators, and readers who are inspired to actively participate in community and global development.
            </p>
          </div>
        </FadeIn>
      </div>

      <FadeIn direction="up">
        <div className="bg-primary text-white rounded-card p-8 md:p-12 text-center space-y-4 shadow-md">
          <h3 className="font-serif text-xl font-bold">Interested in collaborating?</h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            Partner with us to feature your organization's case studies, sponsor monthly editions, or contribute stories.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-accent hover:bg-yellow-600 text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-button transition-all"
            >
              Get In Touch
            </Link>
            <Link 
              to="/submit-story" 
              className="bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-button transition-all"
            >
              Submit a Case Study
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
