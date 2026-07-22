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

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="bg-white text-gray-800 px-6 py-16 md:px-12 border-t border-[#E5D5C0]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-200 pb-12">
          <div className="md:col-span-4">
            <h2 className="font-serif text-2xl font-bold mb-4 tracking-tight text-gray-900">THE IMPACT LEDGER</h2>
            <p className="text-xs text-gray-600 max-w-sm font-sans leading-relaxed">
              Every Impact Deserves to Be Remembered. A premium digital editorial publication documenting stories of change, leadership, and sustainability across the globe.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-sans font-bold mb-4 tracking-widest uppercase text-[10px] text-accent">Sections</h3>
            <div className="flex flex-col gap-3 text-xs text-gray-600">
              <Link to="/stories" className="hover:text-accent transition-colors">Latest Stories</Link>
              <Link to="/magazine" className="hover:text-accent transition-colors">The Magazine</Link>
              <Link to="/stories" className="hover:text-accent transition-colors">Fields of Impact</Link>
              <Link to="/about" className="hover:text-accent transition-colors">Interviews</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-sans font-bold mb-4 tracking-widest uppercase text-[10px] text-accent">Organization</h3>
            <div className="flex flex-col gap-3 text-xs text-gray-600">
              <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
              <Link to="/submit-story" className="hover:text-accent transition-colors">Submit a Story</Link>
              <Link to="/about" className="hover:text-accent transition-colors">Advertise</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-sans font-bold mb-4 tracking-widest uppercase text-[10px] text-accent">Subscribe to the Digest</h3>
            <p className="text-xs text-gray-600 mb-4">Receive monthly updates of verified case studies and premium publications.</p>
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <input type="email" placeholder="Your email address" className="bg-[#FAF9F6] text-gray-800 text-xs px-4 py-2 w-full focus:outline-none" />
              <button className="bg-accent hover:bg-[#B3936B] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest gap-4">
          <div>&copy; {new Date().getFullYear()} The Impact Ledger. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          </div>
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
