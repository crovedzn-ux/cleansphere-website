import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const COOKIE_KEY = 'cleansphere_cookie_consent';

export default function CookieBanner() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  const copy = {
    en: {
      title: 'We use cookies',
      text: 'We use essential cookies to ensure the website functions properly and to remember your language preference. No tracking or advertising cookies are used.',
      accept: 'Accept',
      decline: 'Decline',
      privacy: 'Privacy Policy',
    },
    de: {
      title: 'Wir verwenden Cookies',
      text: 'Wir verwenden notwendige Cookies, damit die Website ordnungsgemäß funktioniert und Ihre Spracheinstellung gespeichert wird. Es werden keine Tracking- oder Werbe-Cookies verwendet.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
      privacy: 'Datenschutz',
    },
  };

  const c = copy[language];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-2xl"
        >
          <div
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-gray-100 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-0.5">{c.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{c.text}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-medium text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
              >
                {c.decline}
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:bg-gray-800 active:scale-95 transition-all duration-200"
              >
                {c.accept}
              </button>
            </div>

            {/* Close */}
            <button
              onClick={decline}
              className="absolute top-3 right-3 p-1 text-gray-300 hover:text-gray-600 transition-colors sm:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
