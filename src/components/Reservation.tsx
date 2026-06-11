import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { Calendar, Users, Clock, ArrowRight } from 'lucide-react';

export const Reservation = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate network request
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <section id="reserve" className="py-24 relative overflow-hidden bg-dark-600">
      {/* Background with slight image overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-md">{t.reservation.title}</h2>
          <div className="w-12 h-1 bg-brand-500 mx-auto mb-12"></div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-2xl"
        >
          {formState === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-400 mb-6 border border-brand-500/50">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Reservation Confirmed</h3>
              <p className="text-gray-400">We look forward to hosting you at Basta.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input 
                  type="date" 
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 transition-colors [color-scheme:dark]"
                />
              </div>

              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <select 
                  required
                  defaultValue=""
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 transition-colors appearance-none"
                >
                  <option value="" disabled>Select Time</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              <div className="relative group md:col-span-2">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input 
                  type="number" 
                  min="1" 
                  max="12"
                  placeholder="Number of Guests"
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>

              <button 
                disabled={formState === 'loading'}
                className="md:col-span-2 py-4 bg-brand-500 text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-400 transition-colors rounded-lg flex justify-center items-center gap-2 group disabled:opacity-70"
              >
                {formState === 'loading' ? 'Processing...' : t.reservation.submit}
                {formState !== 'loading' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};
