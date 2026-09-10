import React from 'react';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';
import { GoldenDustParticles } from './Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const cleanPhone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const defaultMsg = encodeURIComponent("Hi Melissa, I'd love to enquire about booking a hair and makeup appointment.");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${defaultMsg}`;

  return (
    <footer
      id="editorial-footer"
      className="relative bg-[#3E2023] text-[#F2ECE6] overflow-hidden border-t border-[#542F34] select-none"
    >
      {/* Tactile Stationery Underlay & Subtle Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#3E2023] via-[#391C20] to-[#301618] opacity-95"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#F2ECE6_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 flex flex-col justify-between">
        
        {/* =========================================================================
            THE EDITORIAL STATEMENT (CENTRAL HERO MOMENT)
            ========================================================================= */}
        <div className="text-center relative flex flex-col items-center justify-center">
          
          {/* Subtle Decorative Accent Rule with Header Golden Sparkle */}
          <div className="flex items-center justify-center space-x-4 mb-8 sm:mb-10 w-full max-w-xs sm:max-w-md">
            <span className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A3A]/40 to-transparent flex-grow" />
            <GoldenDustParticles className="ml-0 mx-2" />
            <span className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A3A]/40 to-transparent flex-grow" />
          </div>

          {/* Central Editorial Statement */}
          <blockquote className="max-w-3xl mx-auto px-4 sm:px-6">
            <p
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-light italic text-[#F2ECE6] leading-[1.38] tracking-wide"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              “Trusted by clients and celebrated across the world.”
            </p>
          </blockquote>

          {/* Editorial Caption / Brand Subtitle */}
          <div className="mt-8 sm:mt-9 flex items-center justify-center space-x-2.5 sm:space-x-3 text-[9.5px] sm:text-[11px] tracking-[0.32em] uppercase text-[#A89893] font-light">
            <span>CAPETOWN</span>
            <span className="text-[#C29A3A]">•</span>
            <span>WORLDWIDE</span>
          </div>

          {/* Refined Liaison Icon Channels */}
          <div className="mt-8 sm:mt-10">
            <div
              id="footer-icons-list"
              className="flex items-center gap-3.5 text-[#D4C8BF]"
              aria-label="Social and contact links"
            >
              <a
                id="footer-cta-instagram"
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 rounded-full border border-[#542F34] hover:border-[#C29A3A]/70 flex items-center justify-center text-[#D4C8BF] hover:text-[#C29A3A] transition-all duration-300 hover:bg-[#C29A3A]/10"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 stroke-[1.4] transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                id="footer-cta-email"
                href={`mailto:${SITE_CONFIG.email}`}
                className="group w-9 h-9 rounded-full border border-[#542F34] hover:border-[#C29A3A]/70 flex items-center justify-center text-[#D4C8BF] hover:text-[#C29A3A] transition-all duration-300 hover:bg-[#C29A3A]/10"
                aria-label={`Email ${SITE_CONFIG.email}`}
              >
                <Mail className="w-4 h-4 stroke-[1.4] transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                id="footer-cta-chat"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 rounded-full border border-[#542F34] hover:border-[#C29A3A]/70 flex items-center justify-center text-[#D4C8BF] hover:text-[#C29A3A] transition-all duration-300 hover:bg-[#C29A3A]/10"
                aria-label="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4 stroke-[1.4] transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

        </div>

        {/* =========================================================================
            LOWER PART: ARCHITECTURAL BACKGROUND WORDMARK (FULLY FITTED TO VIEWPORT)
            ========================================================================= */}
        <div
          className="w-full pt-10 sm:pt-14 pb-6 sm:pb-8 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1100 100"
            className="w-full max-w-5xl h-auto px-2"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="78"
              fontWeight="300"
              letterSpacing="0.22em"
              fill="#F2ECE6"
              className="uppercase opacity-[0.14] sm:opacity-[0.06] transition-opacity duration-300"
            >
              MELISSA FOURIE
            </text>
          </svg>
        </div>

        {/* =========================================================================
            ARCHIVAL COLOPHON BAR (BOTTOM)
            ========================================================================= */}
        <div className="pt-6 border-t border-[#542F34] flex items-center justify-center text-center text-[10.5px] sm:text-[11px] text-[#A89893] font-light">
          <p className="uppercase tracking-[0.22em]">
            &copy; {currentYear} MELISSA FOURIE MAKEUP. ESTABLISHED EXCELLENCE.
          </p>
        </div>

      </div>
    </footer>
  );
};
