import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../api';
import SuccessCheck from '../components/ui/SuccessCheck';
import FieldError from '../components/ui/FieldError';
import { SplitHeading } from '../components/ui/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

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

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await api.submitContact({
        name: data.name,
        email: data.email,
        organization: data.organization,
        subject: data.subject,
        message: data.message,
        type: 'general',
      });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      console.error('Error submitting contact request:', err);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Mailing Desk',
      body: (
        <a href="mailto:theimpactledger@gmail.com" className="link-draw text-ink hover:text-accent-deep transition-colors">
          theimpactledger@gmail.com
        </a>
      ),
    },
    {
      icon: Phone,
      label: 'Call Representative',
      body: (
        <>
          <p className="text-ink">+91 9502343555</p>
          <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-[0.18em]">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
        </>
      ),
    },
    {
      icon: MapPin,
      label: 'Headquarters',
      body: (
        <>
          <p className="text-ink">The Impact Ledger</p>
          <p className="text-stone-500 text-sm">Media Park, Mumbai, India</p>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-transparent text-ink">

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-40 md:pt-44 pb-28">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="eyebrow"
              >
                Corporate Desk
              </motion.span>
              <SplitHeading as="h1" animateOnMount delay={0.3} text="Get In Touch" className="display-title italic text-6xl md:text-8xl" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                className="text-lg text-stone-600 font-light leading-relaxed max-w-md"
              >
                Reach out to our editorial desk, advertise with us, or discuss strategic impact partnerships.
              </motion.p>
            </div>

            <div className="space-y-3">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: EASE }}
                  className="group flex items-start gap-5 p-5 rounded-2xl border border-transparent hover:border-line hover:bg-white/70 transition-all duration-500"
                >
                  <div className="icon-badge !w-12 !h-12 !rounded-xl shrink-0">
                    <item.icon className="w-5 h-5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-500 uppercase tracking-[0.2em] text-[10px] mb-1.5 font-sans">{item.label}</h3>
                    {item.body}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="surface p-8 md:p-12 overflow-hidden">
              {/* Decorative subtle glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="min-h-[480px] flex flex-col justify-center items-center text-center space-y-6 relative z-10"
                  >
                    <SuccessCheck />
                    <h3 className="font-heading italic text-4xl text-ink">Message Received</h3>
                    <p className="text-lg text-stone-600 max-w-md font-light">
                      Thank you for contacting The Impact Ledger. A representative will reach out to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 relative z-10"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="c-name" className="field-label">Your Name</label>
                        <input id="c-name" type="text" {...register('name')} aria-invalid={!!errors.name} className="field" placeholder="John Doe" />
                        <FieldError message={errors.name?.message} />
                      </div>

                      <div>
                        <label htmlFor="c-email" className="field-label">Email Address</label>
                        <input id="c-email" type="email" {...register('email')} aria-invalid={!!errors.email} className="field" placeholder="john@example.com" />
                        <FieldError message={errors.email?.message} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="c-org" className="field-label">Organization <span className="text-stone-400 normal-case tracking-normal">(Optional)</span></label>
                        <input id="c-org" type="text" {...register('organization')} className="field" placeholder="Your Company" />
                      </div>

                      <div>
                        <label htmlFor="c-subject" className="field-label">Subject</label>
                        <input id="c-subject" type="text" {...register('subject')} aria-invalid={!!errors.subject} className="field" placeholder="How can we help?" />
                        <FieldError message={errors.subject?.message} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="field-label">Message</label>
                      <textarea id="c-message" {...register('message')} rows={6} aria-invalid={!!errors.message} className="field resize-none" placeholder="Write your message here..."></textarea>
                      <FieldError message={errors.message?.message} />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-dark btn-shine w-full !py-4 !rounded-xl mt-2 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {loading ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending Message...</>
                      ) : (
                        <>Send Message <ArrowRight size={18} /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
