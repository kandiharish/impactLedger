import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { api } from '../api';

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
          <Link to="/stories" className="px-3 py-1.5 text-xs font-medium text-gray-700 font-sans hover:text-accent hover:bg-white/40 rounded-full transition-all duration-300">Editorial</Link>
          <Link to="/contact" className="px-3 py-1.5 text-xs font-bold text-accent font-sans bg-white/40 shadow-sm rounded-full transition-all duration-300">Contact Us</Link>
          <Link to="/submit-story" className="hidden sm:inline-block bg-accent text-white px-5 py-2 rounded-full text-xs font-bold ml-2 hover:bg-[#B3936B] transition-colors shadow-sm">Submit Story</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Details Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent"></span>
                Corporate Desk
              </span>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">Get In Touch</h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md">
                Reach out to our editorial desk, advertise with us, or discuss strategic impact partnerships.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-200">
              <div className="group flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FAF9F6] border border-gray-200 text-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-xs mb-1">Mailing Desk</h3>
                  <a href="mailto:theimpactledger@gmail.com" className="text-gray-600 hover:text-accent transition-colors">
                    theimpactledger@gmail.com
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FAF9F6] border border-gray-200 text-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-xs mb-1">Call Representative</h3>
                  <p className="text-gray-600">+91 9502343555</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#FAF9F6] border border-gray-200 text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 uppercase tracking-wider text-xs mb-1">Headquarters</h3>
                  <p className="text-gray-600">The Impact Ledger</p>
                  <p className="text-gray-400 text-sm">Media Park, Mumbai, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
              {/* Decorative subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              {success ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="h-full min-h-[400px] flex flex-col justify-center items-center text-center space-y-6 relative z-10"
                >
                  <div className="w-20 h-20 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full flex items-center justify-center text-4xl shadow-sm">
                    ✓
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-gray-900">Message Received</h3>
                  <p className="text-lg text-gray-600 max-w-md font-light">
                    Thank you for contacting The Impact Ledger. A representative will reach out to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Your Name</label>
                      <input
                        type="text"
                        {...register('name')}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Email Address</label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Organization <span className="text-gray-400 lowercase">(Optional)</span></label>
                      <input
                        type="text"
                        {...register('organization')}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Subject</label>
                      <input
                        type="text"
                        {...register('subject')}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors"
                        placeholder="How can we help?"
                      />
                      {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Message</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-accent text-gray-900 placeholder-gray-400 transition-colors resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-950 text-white hover:bg-gray-800 font-bold py-4 px-8 rounded-lg tracking-wider transition-colors duration-300 disabled:opacity-50 mt-4 shadow-sm"
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
