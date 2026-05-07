import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ShieldCheck, Store, Recycle, FlaskConical } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax transforms for different depth layers
  const b1MouseX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const b2MouseX = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const trustIcons = [ShieldCheck, Store, Recycle, FlaskConical];

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#ffffff]"
    >
      {/* Ambient Premium Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_#f8fafc_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_#f0fdfa_0%,_transparent_50%)] opacity-40" />
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl pt-10 lg:pt-0"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-black" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">
                {t.hero.eyebrow}
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-gray-900 leading-[0.95] mb-8"
            >
              <span className="block">{t.hero.headlineLine1}</span>
              <span className="block text-gray-400">{t.hero.headlineLine2}</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-12 max-w-lg font-medium"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('products');
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                }}
                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-black rounded-full hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center gap-3">
                  {t.hero.explore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('contact');
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                }}
                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-full hover:border-gray-400 hover:text-black hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] active:scale-95 active:translate-y-0 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{t.hero.contact}</span>
              </a>
            </motion.div>

            {/* ── MOBILE ONLY: product cards between buttons and badges ── */}
            <motion.div variants={itemVariants} className="flex lg:hidden justify-center gap-4 mb-10">
              {[
                { img: '/pellerino-universal.png', label: 'Universal', tag: 'text-green-600 bg-green-50', specs: '20°–95°' },
                { img: '/pellerino-color.png',     label: 'Color',     tag: 'text-purple-600 bg-purple-50', specs: '20°–60°' },
              ].map(({ img, label, tag, specs }) => (
                <div
                  key={label}
                  className="w-40 bg-white rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9)' }}
                >
                  <div className="bg-gradient-to-b from-gray-50 to-white px-4 pt-4 pb-1 flex items-center justify-center h-36">
                    <img src={img} alt={`Pellerino ${label}`} className="h-full w-auto object-contain drop-shadow-lg" draggable={false} />
                  </div>
                  <div className="px-3 py-3 border-t border-gray-50">
                    <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 ${tag}`}>{label}</span>
                    <p className="text-xs font-semibold text-gray-900 leading-tight">Pellerino Waschmittel</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">137 Wäschen · {specs}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {t.hero.badges.map((badge, index) => {
                const Icon = trustIcons[index];
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <Icon className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 leading-tight">
                      {badge}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side: Product Cards — DESKTOP only */}
          <div className="hidden lg:block relative h-[800px]" style={{ perspective: '1200px' }}>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-100/60 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl" />
            </div>

            {/* Card 1 — Universal */}
            <motion.div
              style={{ y: y1, x: b1MouseX, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 120, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 22 }}
              whileHover={{ rotate: -2, scale: 1.04, zIndex: 30, transition: { duration: 0.35, ease: [0.16,1,0.3,1] } }}
              className="absolute left-0 top-[8%] w-52 z-10 cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut', delay: 1 }}
                    className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                  />
                  <div className="bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-2 flex items-center justify-center h-52">
                    <img src="/pellerino-universal.png" alt="Pellerino Universal" className="h-full w-auto object-contain drop-shadow-xl" draggable={false} />
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-50">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-1.5">Universal</span>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">Pellerino Waschmittel</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">137 Wäschen · 20°–95°</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2 — Color */}
            <motion.div
              style={{ y: y2, x: b2MouseX, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 140, rotate: 7 }}
              animate={{ opacity: 1, y: 60, rotate: 5 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 160, damping: 22 }}
              whileHover={{ rotate: 1, scale: 1.04, zIndex: 30, transition: { duration: 0.35, ease: [0.16,1,0.3,1] } }}
              className="absolute right-0 bottom-[8%] w-52 z-20 cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="bg-white rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 24px 70px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut', delay: 2.5 }}
                    className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                  />
                  <div className="bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-2 flex items-center justify-center h-52">
                    <img src="/pellerino-color.png" alt="Pellerino Color" className="h-full w-auto object-contain drop-shadow-xl" draggable={false} />
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-gray-50">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mb-1.5">Color</span>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">Pellerino Waschmittel</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">137 Wäschen · 20°–60°</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
