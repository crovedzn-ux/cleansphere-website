import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Recycle, Droplets } from 'lucide-react';

export default function Sustainability() {
  const { t } = useLanguage();

  const icons = [Recycle, Droplets, Leaf];

  return (
    <section id="sustainability" className="py-24 bg-brand-teal/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative h-[500px] rounded-[2rem] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop" 
              alt="Sustainability" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-6">
              {t.sustainability.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              {t.sustainability.description}
            </p>

            <div className="space-y-6">
              {t.sustainability.points.map((point, index) => {
                const Icon = icons[index];
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <Icon className="w-5 h-5 text-brand-teal-dark" />
                    </div>
                    <span className="font-medium text-gray-900">{point}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
