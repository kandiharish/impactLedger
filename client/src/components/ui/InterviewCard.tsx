import { Link } from 'react-router-dom';
import type { Interview } from '../../data/mockData';

export default function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <div className="group bg-surface-pure border border-border-light rounded-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row">
      <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100">
        <img 
          src={interview.photo} 
          alt={interview.interviewee} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
      </div>
      <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1">Spotlight Interview</span>
            <h3 className="font-serif text-2.5xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
              "{interview.title}"
            </h3>
          </div>
          <p className="text-sm font-serif italic text-text-secondary leading-relaxed border-l-2 border-accent pl-4">
            "{interview.quote}"
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {interview.highlights.slice(0, 2).map((highlight, index) => (
              <span key={index} className="text-[10px] bg-background-warm text-text-secondary px-3 py-1 rounded-full border border-border-light font-sans">
                ✓ {highlight}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-border-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-xs font-semibold text-primary">{interview.interviewee}</p>
            <p className="text-[10px] text-text-secondary">{interview.position}, {interview.organization}</p>
          </div>
          <Link 
            to={`/interviews/${interview.id}`} 
            className="inline-flex justify-center items-center bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-button transition-all text-center"
          >
            Read Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
