import { Link } from 'react-router-dom';
import type { Interview } from '../../data/mockData';

export default function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <div className="group bg-surface-pure border-t-2 border-primary flex flex-col md:flex-row pt-6 transition-all duration-300">
      <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100 border border-gray-200">
        <img 
          src={interview.photo} 
          alt={interview.interviewee} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-1 py-8 md:py-0 md:pl-12 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2">Spotlight Interview</span>
            <h3 className="font-serif text-3xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
              "{interview.title}"
            </h3>
          </div>
          <p className="text-base font-serif italic text-text-secondary leading-relaxed border-l-2 border-accent pl-4">
            "{interview.quote}"
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {interview.highlights.slice(0, 2).map((highlight, index) => (
               <span key={index} className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 border-l border-primary">
                {highlight}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-primary">{interview.interviewee}</p>
            <p className="text-[10px] text-text-secondary">{interview.position}, {interview.organization}</p>
          </div>
          <Link 
            to={`/interviews/${interview.id}`} 
            className="inline-flex justify-center items-center bg-transparent border border-primary hover:bg-primary hover:text-white text-primary text-[10px] uppercase tracking-widest font-bold px-6 py-3 transition-all text-center"
          >
            Read Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
