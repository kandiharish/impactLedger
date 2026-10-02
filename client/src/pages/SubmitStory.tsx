import { useState } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, ChevronDown, UploadCloud, Loader2 } from 'lucide-react';
import { api } from '../api';
import SuccessCheck from '../components/ui/SuccessCheck';
import FieldError from '../components/ui/FieldError';
import { SplitHeading } from '../components/ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

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

function FormSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-line">
        <span className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-heading italic text-lg">{number}</span>
        <h3 className="text-2xl font-serif text-ink font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SubmitStory() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const onSubmit = async (data: SubmissionFormData) => {
    setLoading(true);
    try {
      await api.submitStory(data);
      setSuccess(true);
      reset();
      setFileName(null);
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      console.error('Error submitting story draft:', err);
      alert('Failed to submit draft report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-ink">

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-40 md:pt-44 pb-28 space-y-14">

        <div className="text-center space-y-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-line text-[11px] uppercase tracking-[0.22em] text-accent-deep font-semibold"
          >
            <FileText size={14} /> Editorial Board Submissions
          </motion.span>
          <SplitHeading as="h1" animateOnMount delay={0.3} text="Submit Your Story" className="display-title italic text-6xl md:text-8xl" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Has your organization achieved measurable social or environmental change? Submit a case study registry draft for editorial review.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="surface p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="min-h-[500px] flex flex-col justify-center items-center text-center space-y-6 relative z-10"
              >
                <SuccessCheck />
                <h3 className="font-heading italic text-5xl text-ink">Draft Submitted</h3>
                <p className="text-lg text-stone-600 max-w-md font-light leading-relaxed">
                  Your impact report draft has been successfully logged. Our editorial panel will review the metrics and outreach details within 5 business days.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-12 relative z-10"
                noValidate
              >

                {/* Section 1: Organization Info */}
                <FormSection number="1" title="Organization Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="s-org" className="field-label">Organization Name</label>
                      <input id="s-org" type="text" {...register('organization')} aria-invalid={!!errors.organization} className="field" placeholder="e.g. Himalayan Seed Trust" />
                      <FieldError message={errors.organization?.message} />
                    </div>

                    <div>
                      <label htmlFor="s-contact" className="field-label">Contact Person</label>
                      <input id="s-contact" type="text" {...register('contactPerson')} aria-invalid={!!errors.contactPerson} className="field" placeholder="e.g. Sunita Devi" />
                      <FieldError message={errors.contactPerson?.message} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="s-email" className="field-label">Contact Email</label>
                    <input id="s-email" type="email" {...register('email')} aria-invalid={!!errors.email} className="field" placeholder="sunita@himalayanseed.org" />
                    <FieldError message={errors.email?.message} />
                  </div>
                </FormSection>

                {/* Section 2: Story Info */}
                <FormSection number="2" title="Editorial Brief">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="s-title" className="field-label">Story Title</label>
                      <input id="s-title" type="text" {...register('storyTitle')} aria-invalid={!!errors.storyTitle} className="field" placeholder="Catchy headline for your story" />
                      <FieldError message={errors.storyTitle?.message} />
                    </div>

                    <div>
                      <label htmlFor="s-category" className="field-label">Impact Category</label>
                      <div className="relative">
                        <select id="s-category" {...register('category')} aria-invalid={!!errors.category} className="field appearance-none pr-11 cursor-pointer">
                          <option value="">Select a category...</option>
                          <option value="csr">Corporate Social Responsibility</option>
                          <option value="ngos">NGOs & Non-Profits</option>
                          <option value="healthcare">Healthcare & Medicine</option>
                          <option value="education">Education & Literacy</option>
                          <option value="women-empowerment">Women Empowerment</option>
                          <option value="environment">Environment & Climate</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                      </div>
                      <FieldError message={errors.category?.message} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="s-summary" className="field-label">Executive Summary</label>
                    <textarea id="s-summary" {...register('summary')} rows={4} aria-invalid={!!errors.summary} className="field resize-none" placeholder="Briefly describe the challenge, your intervention, and the outcome..."></textarea>
                    <FieldError message={errors.summary?.message} />
                  </div>

                  <div>
                    <label htmlFor="s-metrics" className="field-label">Impact Metrics & Data</label>
                    <textarea id="s-metrics" {...register('impactMetrics')} rows={3} aria-invalid={!!errors.impactMetrics} className="field resize-none" placeholder="Provide hard numbers: e.g., 'Restored 450 hectares', 'Taught 1,200 students'..."></textarea>
                    <FieldError message={errors.impactMetrics?.message} />
                  </div>

                  <div>
                    <span className="field-label">Supporting Document (Optional)</span>
                    <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-stone-200 border-dashed rounded-2xl cursor-pointer bg-white/70 hover:bg-accent-soft/40 hover:border-accent transition-all duration-500">
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <span className="w-12 h-12 rounded-full bg-accent-soft text-accent-deep flex items-center justify-center mb-3 transition-transform duration-500 group-hover:-translate-y-1">
                          <UploadCloud size={22} />
                        </span>
                        {fileName ? (
                          <p className="text-sm text-ink font-medium truncate max-w-xs">{fileName}</p>
                        ) : (
                          <p className="mb-1 text-sm text-stone-500"><span className="font-semibold text-ink">Click to upload</span> or drag and drop</p>
                        )}
                        <p className="text-xs text-stone-400">PDF, DOC, DOCX (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                      />
                    </label>
                  </div>
                </FormSection>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-dark btn-shine w-full !py-5 !rounded-xl !text-base disabled:opacity-60 disabled:pointer-events-none"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Submitting Draft...</>
                  ) : (
                    <>Submit Draft for Review <Send size={18} /></>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
