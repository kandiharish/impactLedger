import { Link } from 'react-router-dom';
import type { MagazineIssue } from '../../data/mockData';

export default function MagazineCard({ issue }: { issue: MagazineIssue }) {
  return (
    <div className="group flex flex-col md:flex-row bg-surface-pure border border-primary overflow-hidden transition-all duration-300">
      <div className="md:w-1/3 relative aspect-[3/4] bg-primary overflow-hidden border-r border-primary">
        <img 
          src={issue.coverImage} 
          alt={issue.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-6 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1">{issue.issueNumber}</span>
          <h4 className="font-serif text-2xl font-bold leading-tight">{issue.title}</h4>
          <span className="text-[10px] text-gray-300 font-sans mt-2 tracking-widest uppercase">{issue.month} {issue.year}</span>
        </div>
      </div>
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent flex items-center gap-2">
              <span className="w-4 h-px bg-accent"></span> Editor's Note
            </span>
            <p className="text-base md:text-lg italic text-text-primary font-serif mt-4 leading-relaxed border-l-2 border-accent pl-4">
              "{issue.editorsNote}"
            </p>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-4">Inside This Edition</span>
            <ul className="space-y-3">
              {issue.featuredArticles.map((title, index) => (
                <li key={index} className="text-xs text-text-secondary flex items-start gap-3">
                  <span className="text-accent text-[10px] mt-0.5">■</span>
                  <span className="font-sans leading-relaxed">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link 
          to={`/magazine/${issue.id}`} 
          className="inline-flex justify-center items-center bg-transparent border-2 border-primary hover:bg-primary hover:text-white text-primary text-[10px] uppercase tracking-widest font-bold px-8 py-4 transition-all text-center md:self-start"
        >
          Explore Edition
        </Link>
      </div>
    </div>
  );
}
