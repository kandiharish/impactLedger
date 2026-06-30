import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(15, 'Message must be at least 15 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      console.log('Contact form submitted:', data);
      setLoading(false);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 8000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
      {/* Contact Details Column */}
      <div className="md:col-span-5 space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Editorial Board</span>
          <h1 className="text-4xl font-serif font-bold text-primary leading-tight">Get In Touch</h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Reach out to our editorial desk, advertise with us, or discuss strategic partnerships.
          </p>
        </div>

        <div className="space-y-6 text-sm font-sans">
          <div>
            <h3 className="font-semibold text-primary uppercase tracking-wider text-xs mb-1">Mailing Desk</h3>
            <a href="mailto:theimpactledger@gmail.com" className="text-accent hover:underline">
              theimpactledger@gmail.com
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-primary uppercase tracking-wider text-xs mb-1">Call Representative</h3>
            <p className="text-text-secondary">+91 9502343555</p>
            <p className="text-[10px] text-text-secondary mt-1">Available Mon-Fri, 9:00 AM - 6:00 PM IST</p>
          </div>
          <div>
            <h3 className="font-semibold text-primary uppercase tracking-wider text-xs mb-1">Partnership Desk</h3>
            <p className="text-text-secondary">corporate.desk@theimpactledger.com</p>
          </div>
        </div>
      </div>

      {/* Form Column */}
      <div className="md:col-span-7 bg-surface-pure border border-border-light rounded-card p-8 shadow-sm">
        {success ? (
          <div className="h-full flex flex-col justify-center items-center text-center py-12 space-y-4">
            <div className="w-12 h-12 bg-green-50 text-success-green border border-green-200 rounded-full flex items-center justify-center text-2xl">
              ✓
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">Message Received</h3>
            <p className="text-sm text-text-secondary max-w-sm">
              Thank you for contacting The Impact Ledger. A representative from our editorial or corporate desk will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-[10px] text-error-red font-semibold">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-[10px] text-error-red font-semibold">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider">Organization (Optional)</label>
              <input
                type="text"
                {...register('organization')}
                className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                placeholder="Himalayan Trust / Corporate Corp"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider">Subject</label>
              <input
                type="text"
                {...register('subject')}
                className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400"
                placeholder="Inquiry about sponsorship / story cover"
              />
              {errors.subject && <p className="text-[10px] text-error-red font-semibold">{errors.subject.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                {...register('message')}
                className="w-full bg-background-warm border border-border-light rounded-input px-4 py-3 text-xs focus:outline-none focus:border-accent text-primary placeholder-gray-400 resize-none"
                placeholder="Brief details about your request..."
              ></textarea>
              {errors.message && <p className="text-[10px] text-error-red font-semibold">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-white text-xs uppercase tracking-wider font-semibold py-3.5 rounded-button transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting request...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
