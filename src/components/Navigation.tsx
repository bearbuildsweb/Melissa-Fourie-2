import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';
import { Logo } from './Logo';

interface NavigationProps {
  onOpenWhatsApp: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: (isOpen: boolean) => void;
}

/**
 * Bespoke Editorial Hamburger Icon
 * - Increased weight with solid 2px strokes
 * - Cast in warm ivory light tone (#F2ECE6) matching the WhatsApp widget text
 * - Intentionally asymmetric proportions (20px top / 14px bottom)
 * - Understated hover glide transition that aligns lengths smoothly
 * - Seamlessly transitions into a clean diagonal cross when open
 */
const EditorialHamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div
      className="relative w-5 h-3.5 flex flex-col justify-between items-end overflow-visible select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]"
      aria-hidden="true"
    >
      {/* Top Stroke - Weighted 2px */}
      <span
        className={`block h-[2px] bg-[#F2ECE6] rounded-full transition-all duration-300 ease-out origin-center ${
          isOpen
            ? 'w-[18px] translate-y-[5.5px] rotate-45'
            : 'w-5 opacity-95 group-hover:opacity-100'
        }`}
      />

      {/* Bottom Stroke - Weighted 2px with intentional asymmetry & smooth hover glide */}
      <span
        className={`block h-[2px] bg-[#F2ECE6] rounded-full transition-all duration-300 ease-out origin-center ${
          isOpen
            ? 'w-[18px] -translate-y-[5.5px] -rotate-45'
            : 'w-[14px] opacity-95 group-hover:w-5 group-hover:opacity-100'
        }`}
      />
    </div>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  onOpenWhatsApp,
  isMobileMenuOpen: externalMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);

  const cleanPhone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const defaultMsg = encodeURIComponent("Hi Melissa, I'd love to enquire about booking a hair and makeup appointment.");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${defaultMsg}`;

  const mobileMenuOpen = externalMobileMenuOpen !== undefined ? externalMobileMenuOpen : internalMobileMenuOpen;

  const setMobileMenuOpen = (open: boolean) => {
    if (onToggleMobileMenu) {
      onToggleMobileMenu(open);
    } else {
      setInternalMobileMenuOpen(open);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const desktopNavLinks = [
    { name: 'The Looks', href: '#portfolio' },
  ];

  const drawerNavLinks = [
    { name: 'The Looks', href: '#portfolio' },
    { name: 'Meet Melissa', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className="fixed top-0 left-0 right-0 z-40 bg-[#F2ECE6]/95 backdrop-blur-md py-4 sm:py-5 border-b border-[#E0D6CB] transition-all duration-300 shadow-[0_2px_15px_rgba(62,32,35,0.03)]"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            id="brand-logo-link"
            className="group focus:outline-none focus:ring-0"
          >
            <Logo
              size="md"
              sublineText="HAIR & MAKEUP ARTISTRY"
              sparkleArtistry
              variant="dark"
            />
          </a>

          {/* Navigation Links & Action Area (Desktop & Mobile) */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            {/* Desktop Navigation Link */}
            <div className="hidden md:flex items-center space-x-8">
              {desktopNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[11px] uppercase tracking-[0.24em] text-[#75595C] hover:text-[#3E2023] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C29A3A] hover:after:w-full after:transition-all after:duration-300 font-light"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Bespoke Editorial Hamburger Icon inside Warm Taupe Pill — Active on ALL Viewports */}
            <button
              id="header-editorial-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex items-center justify-center px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#B8A193] shadow-[inset_0_2px_4px_rgba(62,32,35,0.18),_inset_0_1px_2px_rgba(62,32,35,0.12),_inset_0_-1px_1px_rgba(255,255,255,0.25)] border border-[#A58E80]/40 focus:outline-none transition-all duration-300 hover:brightness-[1.03] hover:shadow-[inset_0_2.5px_5px_rgba(62,32,35,0.22)] active:scale-[0.97] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <EditorialHamburgerIcon isOpen={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Navigation Drawer (Universal across all viewports) */}
      {mobileMenuOpen && (
        <div
          id="editorial-nav-drawer"
          className="fixed inset-0 z-50 flex justify-end animate-fade-in"
        >
          {/* Backdrop for click-to-dismiss */}
          <div
            className="fixed inset-0 bg-[#3E2023]/25 backdrop-blur-[2px] transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Stage: Full width on mobile, sleek luxury panel on tablet/desktop */}
          <div
            className="relative z-10 w-full sm:max-w-md bg-[#F2ECE6] flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-8 sm:px-12 border-l border-[#E0D6CB] shadow-[0_25px_60px_rgba(62,32,35,0.18)] transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[#E0D6CB] pb-3">
                <p className="text-[9px] tracking-[0.34em] uppercase text-[#75595C] font-light">
                  Index
                </p>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[9px] uppercase tracking-[0.24em] text-[#75595C] hover:text-[#C29A3A] transition-colors font-light"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {drawerNavLinks.map((link, idx) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group font-serif text-3xl sm:text-4xl font-light text-[#3E2023] hover:text-[#C29A3A] transition-colors flex items-center justify-between"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.name}
                    </span>
                    <span className="text-[10px] font-sans tracking-widest text-[#C29A3A]/70">
                      0{idx + 1}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-[#E0D6CB]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full py-4 bg-[#3E2023] text-[#F2ECE6] text-[11px] uppercase tracking-[0.24em] font-light flex items-center justify-center space-x-2.5 hover:bg-[#4E2C30] transition-all duration-300 shadow-sm border border-[#3E2023] hover:border-[#C29A3A]/40"
              >
                <MessageCircle className="w-4 h-4 text-[#C29A3A]" />
                <span>Enquire with Melissa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
