import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { EditorialPortfolio } from './components/EditorialPortfolio';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { LightboxModal } from './components/LightboxModal';
import { PortfolioItem } from './types';
import { SITE_CONFIG } from './data/content';

export default function App() {
  const [selectedLook, setSelectedLook] = useState<PortfolioItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    const cleanPhone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    const defaultMsg = encodeURIComponent("Hi Melissa, I'd love to enquire about booking a hair and makeup appointment.");
    window.open(`https://wa.me/${cleanPhone}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  const handleExplorePortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2ECE6] text-[#3E2023] font-sans selection:bg-[#C29A3A]/25 selection:text-[#3E2023] flex flex-col">
      {/* Top Luxury Navigation */}
      <Navigation
        onOpenWhatsApp={handleOpenWhatsApp}
        isMobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={setMobileMenuOpen}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* Section 01: Bespoke Hero */}
        <Hero
          onExplorePortfolio={handleExplorePortfolio}
        />

        {/* Section 02: High-End Editorial Portfolio */}
        <EditorialPortfolio
          onSelectLook={(item) => setSelectedLook(item)}
        />
      </main>

      {/* Editorial Colophon Footer */}
      <Footer />

      {/* Persistent WhatsApp Booking Widget (hidden when mobile drawer menu is active) */}
      <WhatsAppWidget isHidden={mobileMenuOpen} />

      {/* Interactive Look Lightbox Modal (strictly dedicated to the 2 shoot images) */}
      <LightboxModal
        item={selectedLook}
        onClose={() => setSelectedLook(null)}
      />
    </div>
  );
}
