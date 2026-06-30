import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Magazine from './pages/Magazine';
import About from './pages/About';
import Contact from './pages/Contact';
import SubmitStory from './pages/SubmitStory';
import PageTransition from './components/layout/PageTransition';

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-warm text-text-primary">
      <header className="sticky top-0 z-50 bg-surface-pure/80 backdrop-blur-md border-b border-border-light px-6 py-4 md:px-20 flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-primary">
          THE IMPACT LEDGER
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/stories" className="hover:text-accent transition-colors">Stories</Link>
          <Link to="/magazine" className="hover:text-accent transition-colors">Magazine</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </nav>
        <Link to="/submit-story" className="bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-button transition-all">
          Submit Story
        </Link>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-12 md:px-20">
        {children}
      </main>

      <footer className="bg-primary text-white border-t border-border-light px-6 py-12 md:px-20">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h2 className="font-serif text-xl font-bold mb-3 tracking-tight">THE IMPACT LEDGER</h2>
            <p className="text-sm text-gray-400 max-w-sm font-sans">
              Every Impact Deserves to Be Remembered. Documenting and amplifying stories of change, leadership, and sustainability.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 text-sm">
            <div>
              <h3 className="font-sans font-semibold mb-3 tracking-wider uppercase text-xs text-accent">Contact</h3>
              <p className="text-gray-400">theimpactledger@gmail.com</p>
              <p className="text-gray-400">+91 9502343555</p>
            </div>
            <div>
              <h3 className="font-sans font-semibold mb-3 tracking-wider uppercase text-xs text-accent">Legal</h3>
              <Link to="/privacy" className="block text-gray-400 hover:text-white mb-2">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white">Terms & Conditions</Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto border-t border-gray-800 mt-8 pt-6 text-xs text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} The Impact Ledger. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="py-12 text-center space-y-4">
      <h1 className="text-4xl font-serif font-bold text-primary">{title}</h1>
      <p className="text-text-secondary">This section is currently under development.</p>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/stories" element={<PageTransition><Stories /></PageTransition>} />
            <Route path="/stories/:slug" element={<PageTransition><StoryDetail /></PageTransition>} />
            <Route path="/magazine" element={<PageTransition><Magazine /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/submit-story" element={<PageTransition><SubmitStory /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><PlaceholderPage title="Privacy Policy" /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><PlaceholderPage title="Terms & Conditions" /></PageTransition>} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
