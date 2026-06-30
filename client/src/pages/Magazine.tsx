import { mockMagazineIssues } from '../data/mockData';
import MagazineCard from '../components/ui/MagazineCard';

export default function Magazine() {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">Magazine Archive</h1>
        <p className="text-sm text-text-secondary">
          Explore past and present digital editions of The Impact Ledger.
        </p>
      </div>

      <div className="space-y-12 max-w-4xl mx-auto">
        {mockMagazineIssues.map((issue) => (
          <MagazineCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
