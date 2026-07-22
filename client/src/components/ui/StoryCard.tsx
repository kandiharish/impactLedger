import { Link } from 'react-router-dom';
import type { Story } from '../../data/mockData';

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link 
      to={`/stories/${story.slug}`} 
      className="group flex flex-col overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-video w-full bg-gray-100 border border-gray-200">
        <img 
          src={story.featuredImage} 
          alt={story.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
          {story.category}
        </div>
      </div>
      <div className="flex flex-col flex-1 pt-4 space-y-2">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
          <span>{story.publishedDate}</span>
          <span className="w-1 h-1 bg-accent"></span>
          <span>{story.readingTime}</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
          {story.title}
        </h3>
        <p className="text-xs text-text-secondary line-clamp-3 font-sans leading-relaxed">
          {story.summary}
        </p>
        <div className="pt-4 mt-auto border-t border-gray-200 flex items-center gap-3">
          <div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">By {story.author.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
