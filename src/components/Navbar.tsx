import { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, animate } from 'motion/react';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px' }
    );

    const sections = ['about', 'products', 'sustainability', 'contact'];
    // Small delay to ensure DOM is fully loaded
    setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(targetId);
    
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      animate(window.scrollY, offsetPosition, {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  const navLinks = [
    { id: 'about', label: t.nav.about },
    { id: 'products', label: t.nav.products },
    { id: 'sustainability', label: t.nav.sustainability },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center z-50">
            <img src="/mainlogo.svg" alt="Cleansphere" className="h-8 w-auto object-contain" />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative transition-colors py-1 ${activeSection === link.id ? 'text-black' : 'hover:text-black'}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`relative transition-colors py-1 ${activeSection === 'contact' ? 'text-black' : 'hover:text-black'}`}
            >
              {t.nav.contact}
              {activeSection === 'contact' && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          </div>

          <div className="flex items-center gap-4 z-50">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black px-3 py-1.5 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md active:scale-95 active:translate-y-0 transition-all duration-200"
            >
              {t.nav.contact}
            </a>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold tracking-tight mt-8">
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)} 
                  className={`transition-colors flex items-center gap-4 ${activeSection === link.id ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {activeSection === link.id && (
                    <motion.div layoutId="mobileActiveSection" className="w-2 h-2 rounded-full bg-black" />
                  )}
                  <span className={activeSection === link.id ? '' : 'ml-6'}>{link.label}</span>
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')} 
                className={`transition-colors flex items-center gap-4 ${activeSection === 'contact' ? 'text-black' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {activeSection === 'contact' && (
                  <motion.div layoutId="mobileActiveSection" className="w-2 h-2 rounded-full bg-black" />
                )}
                <span className={activeSection === 'contact' ? '' : 'ml-6'}>{t.nav.contact}</span>
              </a>
            </div>
            <div className="mt-auto pb-8">
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="flex items-center justify-center w-full py-4 text-base font-semibold text-white bg-black rounded-full active:scale-95 transition-all duration-200"
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
