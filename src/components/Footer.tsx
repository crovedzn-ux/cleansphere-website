import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenImprint: () => void;
}

export default function Footer({ onOpenImprint }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <img src="/mainlogo.svg" alt="Cleansphere" className="h-6 w-auto object-contain" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-400">
          <button 
            onClick={onOpenImprint}
            className="hover:text-gray-900 transition-colors"
          >
            {t.imprint.title}
          </button>
          <span>© {new Date().getFullYear()} Cleansphere. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
