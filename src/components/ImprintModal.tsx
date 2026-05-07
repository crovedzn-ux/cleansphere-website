import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ImprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImprintModal({ isOpen, onClose }: ImprintModalProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 sm:p-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label={t.imprint.close}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
                {t.imprint.title}
              </h2>

              <div className="space-y-6 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900 mb-1">{t.imprint.disclaimer}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">{t.imprint.company}</p>
                  <p>CleanSphere UG (haftungsbeschränkt)</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">{t.imprint.owner}</p>
                  <p>Talha Büyükyildirim</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">{t.imprint.register}</p>
                  <p>Amtsgericht Krefeld</p>
                  <p>HRB 21427</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">{t.imprint.address}</p>
                  <p>Viersener Str. 30</p>
                  <p>47805 Krefeld</p>
                  <p>{t.contact.details.address.includes('Germany') ? 'Germany' : 'Deutschland'}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">{t.imprint.contact}</p>
                  <p>Tel: 0174 3347044</p>
                  <p>Email: CleanSphere.de@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
