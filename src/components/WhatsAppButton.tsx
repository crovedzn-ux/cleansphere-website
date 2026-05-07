import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const PHONE = '491743347044'; // +49 174 3347044
const getMessage = (lang: string) =>
  encodeURIComponent(
    lang === 'en'
      ? 'Hello, I am interested in distributing Pellerino products. Could we arrange a call?'
      : 'Hallo, ich interessiere mich für den Vertrieb von Pellerino-Produkten. Können wir einen Termin vereinbaren?'
  );

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState(false);

  const label = language === 'en' ? 'Chat with us' : 'Schreiben Sie uns';
  const href = `https://wa.me/${PHONE}?text=${getMessage(language)}`;

  return (
    <div className="fixed right-5 bottom-24 z-[150] flex items-center justify-end gap-3">

      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 22 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] transition-shadow duration-300"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ backgroundColor: '#25D366' }} />

        {/* WhatsApp SVG */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.74.7 5.43 2.04 7.83L.5 31.5l7.86-2.06A15.44 15.44 0 0016 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.18a13.6 13.6 0 01-6.93-1.9l-.5-.3-5.1 1.34 1.36-4.96-.33-.52A13.62 13.62 0 1116 28.68zm7.47-10.2c-.41-.2-2.42-1.19-2.8-1.33-.37-.13-.64-.2-.9.21-.27.41-1.04 1.33-1.27 1.6-.23.28-.46.31-.87.1-.41-.2-1.73-.64-3.3-2.03a12.36 12.36 0 01-2.28-2.83c-.24-.41-.03-.63.18-.84.18-.18.41-.47.61-.7.2-.24.27-.41.41-.68.13-.27.07-.51-.04-.71-.1-.2-.9-2.17-1.24-2.97-.32-.78-.65-.67-.9-.68l-.77-.01c-.27 0-.7.1-1.07.51-.37.41-1.4 1.37-1.4 3.33s1.44 3.87 1.64 4.14c.2.27 2.83 4.32 6.86 6.06.96.41 1.71.66 2.29.84.96.3 1.84.26 2.53.16.77-.12 2.37-.97 2.71-1.9.33-.94.33-1.74.23-1.9-.1-.18-.37-.28-.78-.48z"/>
        </svg>
      </motion.a>
    </div>
  );
}
