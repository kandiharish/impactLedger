import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Magazine from './pages/Magazine';
import About from './pages/About';
import Contact from './pages/Contact';
import SubmitStory from './pages/SubmitStory';
import Editorial from './pages/Editorial';
import NotFound from './pages/NotFound';

import PageTransition from './components/layout/PageTransition';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-text-primary bg-transparent">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 space-y-5">
      <span className="eyebrow eyebrow-center">The Impact Ledger</span>
      <h1 className="display-title text-5xl md:text-7xl italic">{title}</h1>
      <p className="lede">This section is currently under development.</p>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  return (
    // Start every new page at the top, once the outgoing page has faded out
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/stories" element={<PageTransition><Stories /></PageTransition>} />
        <Route path="/stories/:slug" element={<PageTransition><StoryDetail /></PageTransition>} />
        <Route path="/magazine" element={<PageTransition><Magazine /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />

        <Route path="/editorial" element={<PageTransition><Editorial /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/submit-story" element={<PageTransition><SubmitStory /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PlaceholderPage title="Privacy Policy" /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><PlaceholderPage title="Terms & Conditions" /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <Router>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </MotionConfig>
    </QueryClientProvider>
  );
}
