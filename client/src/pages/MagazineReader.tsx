import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HTMLFlipBook from 'react-pageflip';
import { ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { api } from '../api';
import { NAVBAR_HEIGHT } from '../components/layout/Navbar';

/** How many pages either side of the current one get their image loaded. */
const PRELOAD_RADIUS = 4;

const BookPage = React.forwardRef<HTMLDivElement, { src?: string; number: number }>(({ src, number }, ref) => (
  <div ref={ref} className="bg-white overflow-hidden">
    {src ? (
      <img src={src} alt={`Page ${number}`} className="w-full h-full object-cover select-none" draggable={false} />
    ) : (
      <div className="w-full h-full skeleton" />
    )}
  </div>
));

export default function MagazineReader() {
  const { issueId = '' } = useParams();
  const { data: issue, isLoading, error } = useQuery({
    queryKey: ['magazineIssue', issueId],
    queryFn: () => api.getMagazineIssue(issueId),
  });

  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0); // zero-based index of the left-most visible page

  const flipNext = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);
  const flipPrev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') flipNext();
      if (e.key === 'ArrowLeft') flipPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipNext, flipPrev]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !issue || !issue.pageCount || !issue.pagesBaseUrl) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-6 px-6 pt-32">
        <h1 className="font-heading italic text-5xl text-ink">This issue isn't available to read online yet.</h1>
        <Link to="/magazine" className="btn btn-dark"><ArrowLeft size={16} /> Back to the Magazine</Link>
      </div>
    );
  }

  const total = issue.pageCount;
  const pageSrc = (i: number) => `${issue.pagesBaseUrl}/${String(i + 1).padStart(2, '0')}.webp`;
  const shownTo = Math.min(page + 2, total);

  return (
    <div className="bg-ink text-stone-300 flex flex-col" style={{ minHeight: '100vh', paddingTop: NAVBAR_HEIGHT }}>
      {/* Toolbar */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-4 flex items-center justify-between gap-4">
          <Link to="/magazine" className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors shrink-0">
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Magazine</span>
          </Link>
          <div className="text-center min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">{issue.issueNumber} • {issue.month} {issue.year}</p>
            <h1 className="font-heading italic text-lg md:text-2xl text-white truncate">{issue.title}</h1>
          </div>
          {issue.pdfUrl ? (
            <a href={issue.pdfUrl} download className="btn btn-gold !px-4 !py-2 !text-xs shrink-0">
              <Download size={14} /> <span className="hidden sm:inline">Download PDF</span>
            </a>
          ) : <span className="w-10" />}
        </div>
      </div>

      {/* Book */}
      <div className="flex-1 flex items-center justify-center gap-3 md:gap-6 px-3 md:px-6 py-8">
        <button
          onClick={flipPrev}
          disabled={page === 0}
          aria-label="Previous page"
          className="hidden md:flex w-12 h-12 shrink-0 rounded-full border border-white/15 items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft size={22} />
        </button>

        {/* A two-page spread is 1.414× as wide as it is tall (A4); cap the width so the whole spread fits the screen height */}
        <div className="w-full" style={{ maxWidth: 'min(1100px, calc((100svh - 300px) * 1.414))' }}>
          {/* @ts-ignore - react-pageflip's types don't model its required props cleanly */}
          <HTMLFlipBook
            ref={bookRef}
            width={500}
            height={707}
            size="stretch"
            minWidth={260}
            maxWidth={600}
            minHeight={368}
            maxHeight={850}
            showCover
            usePortrait
            mobileScrollSupport
            maxShadowOpacity={0.4}
            flippingTime={700}
            onFlip={(e: { data: number }) => setPage(e.data)}
            className="mx-auto"
          >
            {Array.from({ length: total }, (_, i) => (
              <BookPage
                key={i}
                number={i + 1}
                src={Math.abs(i - page) <= PRELOAD_RADIUS ? pageSrc(i) : undefined}
              />
            ))}
          </HTMLFlipBook>
        </div>

        <button
          onClick={flipNext}
          disabled={page >= total - 1}
          aria-label="Next page"
          className="hidden md:flex w-12 h-12 shrink-0 rounded-full border border-white/15 items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-ink transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Page counter + mobile controls */}
      <div className="pb-8 flex items-center justify-center gap-5">
        <button onClick={flipPrev} disabled={page === 0} aria-label="Previous page" className="md:hidden w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.2em] uppercase text-stone-400 tabular-nums">
            Page {page + 1}{shownTo > page + 1 && page > 0 ? `–${shownTo}` : ''} of {total}
          </span>
          <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${((page + 1) / total) * 100}%` }} />
          </div>
        </div>
        <button onClick={flipNext} disabled={page >= total - 1} aria-label="Next page" className="md:hidden w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white disabled:opacity-30">
          <ChevronRight size={18} />
        </button>
      </div>
      <p className="hidden md:block pb-8 text-center text-[10px] uppercase tracking-[0.25em] text-stone-500">Use the arrow keys or drag a page corner to turn</p>
    </div>
  );
}
