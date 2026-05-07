import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  name: string;
  benefit: string;
  features: string[];
  description: string;
  specs: ProductSpec[];
}

interface ProductModalProps {
  product: Product | null;
  imageUrl: string;
  onClose: () => void;
}

export default function ProductModal({ product, imageUrl, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}>
              {/* Product image */}
              <div className="sm:w-56 shrink-0 bg-gray-50 flex items-center justify-center p-6 sm:p-8">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-40 sm:w-full object-contain drop-shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 sm:p-10 overflow-y-auto">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {product.benefit}
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
