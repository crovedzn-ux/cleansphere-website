/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductGrid from './components/ProductGrid';
import Performance from './components/Performance';
import Sustainability from './components/Sustainability';
import TrustSignals from './components/TrustSignals';
import RetailPartners from './components/RetailPartners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ImprintModal from './components/ImprintModal';
import CookieBanner from './components/CookieBanner';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [isImprintOpen, setIsImprintOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-teal selection:text-brand-teal-dark">
        <Navbar />
        <main>
          <Hero />
          <TrustSignals />
          <About />
          <ProductGrid />
          <Performance />
          <Sustainability />
          <RetailPartners />
          <Contact />
        </main>
        <Footer onOpenImprint={() => setIsImprintOpen(true)} />
        <ImprintModal isOpen={isImprintOpen} onClose={() => setIsImprintOpen(false)} />
        <WhatsAppButton />
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}
