import { Link } from 'react-router-dom';
import type { Organization } from '../../data/mockData';

export default function OrganizationCard({ org }: { org: Organization }) {
  return (
    <div className="group bg-surface-pure border-t border-primary pt-6 flex flex-col justify-between transition-all duration-300">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 bg-background-warm border border-gray-200 flex items-center justify-center text-3xl">
            {org.logo}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent px-1">
            {org.category}
          </span>
        </div>
        <div>
          <h4 className="font-serif text-2xl font-bold text-primary mb-1">{org.name}</h4>
          <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">{org.location}</p>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
          {org.impactSummary}
        </p>
      </div>
      <div className="pt-6 mt-6 border-t border-gray-200 flex items-center justify-between">
        <Link 
          to="/stories" 
          className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors flex items-center gap-1.5"
        >
          View Case Studies
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
