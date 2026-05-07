import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';
import ProductModal from './ProductModal';

const productImages = ['/pellerino-universal.png', '/pellerino-color.png'];

export default function ProductGrid() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            {t.products.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.products.items.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-72 bg-gray-50 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
                <img
                  src={index === 0 ? '/pellerino-universal.png' : '/pellerino-color.png'}
                  alt={product.name}
                  className="h-full w-full object-contain p-4 drop-shadow-lg"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{product.benefit}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {product.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedIndex(index)}
                className="w-full py-3 px-6 rounded-full border border-gray-200 text-sm font-medium hover:border-black hover:bg-black hover:text-white hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:translate-y-0 transition-all duration-200"
              >
                {product.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <ProductModal
      product={selectedIndex !== null ? t.products.items[selectedIndex] : null}
      imageUrl={selectedIndex !== null ? productImages[selectedIndex] : ''}
      onClose={() => setSelectedIndex(null)}
    />
    </>
  );
}
