import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

interface WhatsAppWidgetProps {
  customMessage?: string;
  isHidden?: boolean;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ customMessage, isHidden = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const portfolio = document.getElementById('portfolio');
      if (!portfolio) {
        setIsVisible(window.scrollY > 400);
        return;
      }

      const rect = portfolio.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Show widget once the start/top edge of the portfolio section enters view
      const reachedPortfolio = rect.top <= windowHeight * 0.7;

      // Hide widget when the user reaches the footer section
      const footer = document.getElementById('editorial-footer') || document.querySelector('footer');
      let reachedFooter = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        reachedFooter = footerRect.top <= windowHeight;
      }

      setIsVisible(reachedPortfolio && !reachedFooter);
    };

    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });
    window.addEventListener('load', checkScrollPosition);

    const timer = setTimeout(checkScrollPosition, 400);

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      window.removeEventListener('load', checkScrollPosition);
      clearTimeout(timer);
    };
  }, []);

  if (isHidden) {
    return null;
  }

  const defaultMsg = customMessage || "Hi Melissa, I'd love to enquire about booking a hair and makeup appointment.";
  
  const cleanPhone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(defaultMsg)}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Open in new window safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    e.preventDefault();
  };

  return (
    <div
      id="persistent-whatsapp-widget"
      className={`fixed bottom-6 right-6 md:right-8 z-40 flex items-center group transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Main Luxury WhatsApp Action Pill */}
      <a
        href={whatsappUrl}
        onClick={handleClick}
        id="whatsapp-direct-link"
        className="relative flex items-center bg-[#3E2023] text-[#F2ECE6] hover:bg-[#4E2C30] transition-all duration-300 shadow-[0_12px_32px_rgba(62,32,35,0.22)] active:scale-[0.98] border border-[#522E33] hover:border-[#C29A3A]/50 px-4 py-3 sm:px-5 sm:py-3.5"
        aria-label="Chat with Melissa on WhatsApp"
      >
        {/* Subtle Online Pulse Dot - refined gold jewellery accent */}
        <span className="relative flex h-2 w-2 mr-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C29A3A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C29A3A]"></span>
        </span>

        <MessageCircle className="w-4 h-4 mr-2 text-[#C29A3A]" />

        {/* Label shown on desktop, hidden on tiny mobile to stay compact */}
        <span className="text-[11px] uppercase tracking-[0.22em] font-normal hidden sm:inline whitespace-nowrap">
          Chat with Melissa
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] font-normal sm:hidden">
          WhatsApp
        </span>
      </a>
    </div>
  );
};

