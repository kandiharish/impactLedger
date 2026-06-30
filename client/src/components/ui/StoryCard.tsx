import { Link } from 'react-router-dom';
import type { Story } from '../../data/mockData';

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link 
      to={`/stories/${story.slug}`} 
      className="group flex flex-col bg-surface-pure border border-border-light rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img 
          src={story.featuredImage} 
          alt={story.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
          {story.category}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{story.publishedDate}</span>
          <span className="w-1 h-1 rounded-full bg-border-light"></span>
          <span>{story.readingTime}</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
          {story.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-3 font-sans leading-relaxed">
          {story.summary}
        </p>
        <div className="pt-4 mt-auto border-t border-border-light flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs">
            {story.author.avatar}
          </div>
          <div>
            <p className="text-xs font-semibold text-primary">{story.author.name}</p>
            <p className="text-[10px] text-text-secondary">{story.author.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
