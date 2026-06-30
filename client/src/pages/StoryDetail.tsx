import { useParams, Link } from 'react-router-dom';
import { mockStories } from '../data/mockData';

export default function StoryDetail() {
  const { slug } = useParams();
  const story = mockStories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-primary">Story Not Found</h2>
        <p className="text-text-secondary">The requested article could not be located in our ledger.</p>
        <Link to="/stories" className="text-accent hover:underline text-sm font-semibold">
          &larr; Return to directory
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Link to={`/stories?category=${story.category.toLowerCase()}`} className="text-xs uppercase tracking-widest text-accent font-semibold hover:underline">
            {story.category}
          </Link>
          <span className="w-1 h-1 rounded-full bg-border-light"></span>
          <span className="text-xs text-text-secondary">{story.publishedDate}</span>
        </div>
        <h1 className="text-3.5xl md:text-5xl font-serif font-bold text-primary leading-tight tracking-tight">
          {story.title}
        </h1>
        <p className="text-lg text-text-secondary font-sans leading-relaxed border-l-4 border-accent/40 pl-6 py-1">
          {story.summary}
        </p>
      </div>

      <div className="aspect-video w-full rounded-card overflow-hidden bg-gray-100 shadow-sm">
        <img 
          src={story.featuredImage} 
          alt={story.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Author and Reading Time Header */}
      <div className="border-y border-border-light py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
            {story.author.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">{story.author.name}</p>
            <p className="text-xs text-text-secondary">{story.author.role}</p>
          </div>
        </div>
        <span className="text-xs font-sans text-text-secondary uppercase tracking-widest">{story.readingTime}</span>
      </div>

      {/* Article Content */}
      <div className="prose max-w-none text-text-primary space-y-6 font-sans text-base md:text-lg leading-relaxed whitespace-pre-line">
        {story.content}
      </div>

      <div className="pt-12 border-t border-border-light flex justify-between items-center">
        <Link to="/stories" className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5">
          &larr; Back to directory
        </Link>
        <Link to="/submit-story" className="text-xs font-bold text-primary hover:underline">
          Have an impact story to share? Submit here &rarr;
        </Link>
      </div>
    </article>
  );
}
