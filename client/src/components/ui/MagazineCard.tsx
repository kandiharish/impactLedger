import { Link } from 'react-router-dom';
import type { MagazineIssue } from '../../data/mockData';

export default function MagazineCard({ issue }: { issue: MagazineIssue }) {
  return (
    <div className="group flex flex-col md:flex-row bg-surface-pure border border-border-light rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="md:w-1/3 relative aspect-[3/4] bg-primary overflow-hidden">
        <img 
          src={issue.coverImage} 
          alt={issue.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1">{issue.issueNumber}</span>
          <h4 className="font-serif text-lg font-bold leading-tight">{issue.title}</h4>
          <span className="text-xs text-gray-300 font-sans mt-1">{issue.month} {issue.year}</span>
        </div>
      </div>
      <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Editor's Note</span>
            <p className="text-sm italic text-text-secondary font-serif mt-2 leading-relaxed">
              "{issue.editorsNote}"
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-2">Featured In This Issue</span>
            <ul className="space-y-1">
              {issue.featuredArticles.map((title, index) => (
                <li key={index} className="text-xs text-text-primary flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span className="line-clamp-1 font-sans">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link 
          to={`/magazine/${issue.id}`} 
          className="inline-flex justify-center items-center bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-button transition-all text-center md:self-start"
        >
          Read Full Edition
        </Link>
      </div>
    </div>
  );
}
