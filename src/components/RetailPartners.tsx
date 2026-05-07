import { motion } from 'motion/react';
import { animate } from 'motion';
import { useLanguage } from '../context/LanguageContext';

export default function RetailPartners() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-5xl font-semibold tracking-tight mb-6"
          >
            {t.retail.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-10"
          >
            {t.retail.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  animate(window.scrollY, offsetPosition, {
                    duration: 0.9,
                    ease: [0.65, 0, 0.35, 1],
                    onUpdate: (latest) => window.scrollTo(0, latest)
                  });
                }
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20 active:scale-95 active:translate-y-0 transition-all duration-200"
            >
              {t.retail.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
