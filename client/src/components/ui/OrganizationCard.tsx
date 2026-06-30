import { Link } from 'react-router-dom';
import type { Organization } from '../../data/mockData';

export default function OrganizationCard({ org }: { org: Organization }) {
  return (
    <div className="group bg-surface-pure border border-border-light rounded-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-background-warm border border-border-light flex items-center justify-center text-2xl shadow-inner">
            {org.logo}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-border-light text-primary px-3 py-1 rounded-full">
            {org.category}
          </span>
        </div>
        <div>
          <h4 className="font-serif text-lg font-bold text-primary mb-1">{org.name}</h4>
          <p className="text-xs text-text-secondary font-sans">{org.location}</p>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
          {org.impactSummary}
        </p>
      </div>
      <div className="pt-6 mt-6 border-t border-border-light flex items-center justify-between">
        <Link 
          to="/stories" 
          className="text-xs font-semibold text-accent hover:underline flex items-center gap-1.5"
        >
          View Case Studies
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
