import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const submissionSchema = z.object({
  organization: z.string().min(3, 'Organization name must be at least 3 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  storyTitle: z.string().min(10, 'Story title must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  summary: z.string().min(20, 'Please write a summary (minimum 20 characters)'),
  impactMetrics: z.string().min(10, 'Describe the impact metrics (minimum 10 characters)'),
});

import { api } from '../api';

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
    <div className="max-w-3xl mx-auto space-y-12 pt-8">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Editorial Board Submissions</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">Submit Your Story</h1>
        <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
          Has your organization achieved measurable social or environmental change? Submit a case study registry draft for editorial review.
        </p>
      </div>

      <div className="bg-surface-pure border border-border-light rounded-card p-8 shadow-sm">
        {success ? (
          <div className="flex flex-col justify-center items-center text-center py-12 space-y-4">
            <div className="w-12 h-12 bg-green-50 text-success-green border border-green-200 rounded-full flex items-center justify-center text-2xl">
              ✓
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">Draft Submission Logged</h3>
            <p className="text-sm text-text-secondary max-w-sm">
              Your impact report draft has been successfully logged. Our editorial panel will review the metrics and outreach details within 5 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Organization Name</label>
                <input
                  type="text"
                  {...register('organization')}
                  className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                  placeholder="e.g. Himalayan Seed Trust"
                />
                {errors.organization && <p className="text-[10px] text-error-red font-semibold">{errors.organization.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Contact Person</label>
                <input
                  type="text"
                  {...register('contactPerson')}
                  className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                  placeholder="e.g. Sunita Devi"
                />
                {errors.contactPerson && <p className="text-[10px] text-error-red font-semibold">{errors.contactPerson.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Contact Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                  placeholder="sunita@himalayanseed.org"
                />
                {errors.email && <p className="text-[10px] text-error-red font-semibold">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Impact Category</label>
                <select
                  {...register('category')}
                  className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                >
                  <option value="">Select focus area...</option>
                  <option value="CSR">CSR Initiative</option>
                  <option value="NGO">NGO Achievement</option>
                  <option value="Healthcare">Healthcare Access</option>
                  <option value="Education">Education Transition</option>
                  <option value="Women Empowerment">Women Empowerment</option>
                  <option value="Environment">Environmental Action</option>
                </select>
                {errors.category && <p className="text-[10px] text-error-red font-semibold">{errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider">Story Working Title</label>
              <input
                type="text"
                {...register('storyTitle')}
                className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                placeholder="e.g. Bringing Water Springs Back to Life in Uttarakhand"
              />
              {errors.storyTitle && <p className="text-[10px] text-error-red font-semibold">{errors.storyTitle.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider">Executive Summary</label>
              <textarea
                rows={4}
                {...register('summary')}
                className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400 resize-none"
                placeholder="Brief summary of the grassroots challenge and resolution..."
              ></textarea>
              {errors.summary && <p className="text-[10px] text-error-red font-semibold">{errors.summary.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider">Key Impact Metrics</label>
              <textarea
                rows={3}
                {...register('impactMetrics')}
                className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400 resize-none"
                placeholder="e.g. 450 hectares reforested, 3,000 households secured with water, etc."
              ></textarea>
              {errors.impactMetrics && <p className="text-[10px] text-error-red font-semibold">{errors.impactMetrics.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold py-3.5 rounded-button transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting draft report...' : 'Submit Draft Report'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
