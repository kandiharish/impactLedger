import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../api';

const submissionSchema = z.object({
  organization: z.string().min(3, 'Organization name must be at least 3 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  storyTitle: z.string().min(10, 'Story title must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  summary: z.string().min(20, 'Please write a summary (minimum 20 characters)'),
  impactMetrics: z.string().min(10, 'Describe the impact metrics (minimum 10 characters)'),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

export default function SubmitStory() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const onSubmit = async (data: SubmissionFormData) => {
    setLoading(true);
    try {
      await api.submitStory(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      console.error('Error submitting story draft:', err);
      alert('Failed to submit draft report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-white text-gray-900">
      {/* Background Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Fixed Navbar (Floating Glass Pill - Logo on left without BG, Links inside glassy pill on right) */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-12 z-50 flex items-center justify-between pointer-events-none">
        <Link to="/" className="pointer-events-auto">
          <img src="/main%20logo.png" alt="The Impact Ledger" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full px-6 py-2.5 shadow-md">
          <Link to="/" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Home</Link>
          <Link to="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">About Us</Link>

          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Stories</Link>
          <Link to="/magazine" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Magazine</Link>
          <Link to="/editorial" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-24 pb-16 space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <span className="text-xs uppercase tracking-widest text-accent font-semibold inline-flex items-center gap-2">
            <FileText size={14} /> Editorial Board Submissions
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">Submit Your Story</h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Has your organization achieved measurable social or environmental change? Submit a case study registry draft for editorial review.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden"
        >
          {success ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="h-full min-h-[500px] flex flex-col justify-center items-center text-center space-y-6 relative z-10"
            >
              <div className="w-24 h-24 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full flex items-center justify-center text-5xl shadow-sm">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="font-serif text-4xl font-bold text-gray-900">Draft Submitted</h3>
              <p className="text-lg text-gray-600 max-w-md font-light leading-relaxed">
                Your impact report draft has been successfully logged. Our editorial panel will review the metrics and outreach details within 5 business days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative z-10">
              
              {/* Section 1: Organization Info */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-serif text-gray-900 font-bold">1. Organization Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Organization Name</label>
                    <input
                      type="text"
                      {...register('organization')}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="e.g. Himalayan Seed Trust"
                    />
                    {errors.organization && <p className="text-xs text-red-500">{errors.organization.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Contact Person</label>
                    <input
                      type="text"
                      {...register('contactPerson')}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="e.g. Sunita Devi"
                    />
                    {errors.contactPerson && <p className="text-xs text-red-500">{errors.contactPerson.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Contact Email</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                    placeholder="sunita@himalayanseed.org"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              {/* Section 2: Story Info */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-serif text-gray-900 font-bold">2. Editorial Brief</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Story Title</label>
                    <input
                      type="text"
                      {...register('storyTitle')}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                      placeholder="Catchy headline for your story"
                    />
                    {errors.storyTitle && <p className="text-xs text-red-500">{errors.storyTitle.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Impact Category</label>
                    <div className="relative">
                      <select
                        {...register('category')}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 appearance-none transition-colors"
                      >
                        <option value="" className="text-gray-800">Select a category...</option>
                        <option value="csr" className="text-gray-800">Corporate Social Responsibility</option>
                        <option value="ngos" className="text-gray-800">NGOs & Non-Profits</option>
                        <option value="healthcare" className="text-gray-800">Healthcare & Medicine</option>
                        <option value="education" className="text-gray-800">Education & Literacy</option>
                        <option value="women-empowerment" className="text-gray-800">Women Empowerment</option>
                        <option value="environment" className="text-gray-800">Environment & Climate</option>
                      </select>
                    </div>
                    {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Executive Summary</label>
                  <textarea
                    {...register('summary')}
                    rows={4}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors resize-none"
                    placeholder="Briefly describe the challenge, your intervention, and the outcome..."
                  ></textarea>
                  {errors.summary && <p className="text-xs text-red-500">{errors.summary.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Impact Metrics & Data</label>
                  <textarea
                    {...register('impactMetrics')}
                    rows={3}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors resize-none"
                    placeholder="Provide hard numbers: e.g., 'Restored 450 hectares', 'Taught 1,200 students'..."
                  ></textarea>
                  {errors.impactMetrics && <p className="text-xs text-red-500">{errors.impactMetrics.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Supporting Document (Optional)</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF, DOC, DOCX (MAX. 10MB)</p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-950 text-white hover:bg-gray-800 font-bold py-5 px-8 rounded-lg tracking-wider transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group shadow-sm"
                >
                  {loading ? 'Submitting Draft...' : 'Submit Draft for Review'}
                  {!loading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
