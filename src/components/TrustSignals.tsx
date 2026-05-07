import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Zap, Globe2, Award } from 'lucide-react';

export default function TrustSignals() {
  const { t } = useLanguage();
  const icons = [ShieldCheck, Zap, Globe2, Award];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            {t.trust.title}
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.trust.badges.map((badge, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="text-gray-300">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-gray-600">{badge}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
