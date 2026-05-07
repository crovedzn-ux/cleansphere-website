import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function Performance() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
              {t.performance.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.performance.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[260px] sm:h-[340px] lg:h-[400px]"
          >
            <BeforeAfterSlider
              beforeSrc="/beforewash.png"
              afterSrc="/afterwash.png"
              beforeLabel={t.performance.before}
              afterLabel={t.performance.after}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
