import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_dggdz7e';
const EMAILJS_TEMPLATE_ID = 'template_h55cpg8';
const EMAILJS_PUBLIC_KEY  = 'fipURl57hPNbiEcoB';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { t, language } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:     form.name,
          email:    form.email,
          company:  form.company || '—',
          message:  form.message,
          language: language === 'en' ? 'English' : 'Deutsch',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
              {t.contact.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              {t.contact.description}
            </p>

            <div className="space-y-6">
              {[
                { Icon: Mail,   value: t.contact.details.email },
                { Icon: Phone,  value: t.contact.details.phone },
                { Icon: MapPin, value: t.contact.details.address },
              ].map(({ Icon, value }) => (
                <div key={value} className="flex items-center gap-4 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-gray-100 relative overflow-hidden"
          >
            {/* Success overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2rem] z-10 p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
                  >
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-5" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Message sent!' : 'Nachricht gesendet!'}
                  </h3>
                  <p className="text-gray-500 text-sm mb-8">
                    {language === 'en'
                      ? "We'll get back to you as soon as possible."
                      : 'Wir melden uns so schnell wie möglich bei Ihnen.'}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                  >
                    {language === 'en' ? 'Send another' : 'Weitere Nachricht'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.contact.form.name} *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.contact.form.email} *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.contact.form.company}</label>
                <input
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.contact.form.message} *</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors resize-none"
                />
              </div>

              {/* Error banner */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {language === 'en'
                      ? 'Something went wrong. Please try again.'
                      : 'Etwas ist schiefgelaufen. Bitte erneut versuchen.'}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 px-6 rounded-xl bg-black text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 active:scale-95 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-200"
              >
                {status === 'loading' ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    {language === 'en' ? 'Sending…' : 'Wird gesendet…'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.contact.form.submit}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
