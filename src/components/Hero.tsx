import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Curated Hero Campaign Photography (assets/images/HERO/)
import hero1 from '../assets/images/HERO/1.jpg';
import hero2 from '../assets/images/HERO/2.jpg';
import hero3 from '../assets/images/HERO/3.jpg';
import hero4 from '../assets/images/HERO/4.jpg';

interface HeroProps {
  onExplorePortfolio: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  index: string;
  location: string;
  focalPosition: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-01',
    image: hero1,
    index: '01',
    location: 'Webersburg 2026',
    focalPosition: 'object-[49%_42%]',
  },
  {
    id: 'hero-02',
    image: hero2,
    index: '02',
    location: 'Constantia 2026',
    focalPosition: 'object-[52%_45%]',
  },
  {
    id: 'hero-03',
    image: hero3,
    index: '03',
    location: 'Webersburg 2026',
    focalPosition: 'object-[49%_38%]',
  },
  {
    id: 'hero-04',
    image: hero4,
    index: '04',
    location: 'Nuy Valley 2026',
    focalPosition: 'object-[38%_44%]',
  },
];

const SLIDE_INTERVAL = 5000;

export const Hero: React.FC<HeroProps> = ({ onExplorePortfolio }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const touchStartXRef = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay with 5-second duration
  useEffect(() => {
    if (isPaused || isPreloading) return;
    const timer = setInterval(handleNext, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, isPreloading, handleNext]);

  // Preload gallery photographs with cascading preloader sequencing
  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const preloadPromises = HERO_SLIDES.map((slide) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(preloadPromises).then(() => {
      const elapsed = Date.now() - startTime;
      // Allow 1.35s for the cascading preloader panels to unfold gracefully
      const delay = Math.max(0, 1350 - elapsed);
      setTimeout(() => {
        if (isMounted) setIsPreloading(false);
      }, delay);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      id="hero"
      aria-label="Editorial Bridal Portrait Exhibition"
      className="relative w-full min-h-[calc(100vh-80px)] pt-[72px] sm:pt-[80px] pb-14 sm:pb-16 bg-[#F2ECE6] text-[#3E2023] flex flex-col justify-start items-center overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================================= */}
      {/* 01. ANTIQUE BRASS GALLERY RAIL (Aligned with Header Content Start & End) */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none z-30" aria-hidden="true">
        <div className="relative w-full flex items-center mt-2 sm:mt-2.5">
          {/* Header-to-Rail Architectural Mounting Brackets (Anchoring rail visibly below header base) */}
          <div className="absolute left-0 -top-2.5 w-3 h-2.5 bg-gradient-to-b from-[#8F6E24] to-[#B89230] border-x border-t border-[#6E5318]" />
          <div className="hidden sm:block absolute left-1/4 -translate-x-1/2 -top-2.5 w-2.5 h-2.5 bg-gradient-to-b from-[#8F6E24] to-[#B89230] border-x border-t border-[#6E5318]" />
          <div className="hidden sm:block absolute right-1/4 translate-x-1/2 -top-2.5 w-2.5 h-2.5 bg-gradient-to-b from-[#8F6E24] to-[#B89230] border-x border-t border-[#6E5318]" />
          <div className="absolute right-0 -top-2.5 w-3 h-2.5 bg-gradient-to-b from-[#8F6E24] to-[#B89230] border-x border-t border-[#6E5318]" />

          {/* Continuous Solid Brass Gallery Hanging Rail */}
          <div className="w-full h-[4.5px] sm:h-[5.5px] rounded-[1.5px] bg-gradient-to-r from-[#8F6E24] via-[#E2C775] via-50% to-[#8F6E24] shadow-[0_3px_6px_rgba(62,32,35,0.28),0_1px_2px_rgba(0,0,0,0.2)] border-y border-[#6E5318]/50" />

          {/* Left Wall Rosette / Finial (Starts exactly at the beginning of the header content) */}
          <div className="absolute left-0 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#F0DA8F] via-[#C29A3A] to-[#6E5318] border border-[#523C0E] shadow-[0_2px_4px_rgba(0,0,0,0.32)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3E2023] shadow-inner" />
          </div>

          {/* Subtle Intermediate Architectural Standoffs */}
          <div className="hidden md:flex absolute left-1/4 -translate-x-1/2 w-2.5 h-3 bg-gradient-to-b from-[#E2C775] to-[#8F6E24] border border-[#6E5318] rounded-[1px] shadow-xs" />
          <div className="hidden md:flex absolute right-1/4 translate-x-1/2 w-2.5 h-3 bg-gradient-to-b from-[#E2C775] to-[#8F6E24] border border-[#6E5318] rounded-[1px] shadow-xs" />

          {/* Right Wall Rosette / Finial (Ends exactly at the ending of the header content) */}
          <div className="absolute right-0 translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#F0DA8F] via-[#C29A3A] to-[#6E5318] border border-[#523C0E] shadow-[0_2px_4px_rgba(0,0,0,0.32)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3E2023] shadow-inner" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 02. PHYSICALLY SUSPENDED PORTRAIT FRAME ASSEMBLY                         */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        <div className="relative flex flex-col items-center w-full max-w-[310px] sm:max-w-[370px] md:max-w-[400px] lg:max-w-[420px] mx-auto">
          
          {/* Fine Tension Suspension Cables (Dropping from Rail to Frame) */}
          <div className="w-full h-12 sm:h-16 lg:h-20 relative pointer-events-none" aria-hidden="true">
            {/* Left Rail Carriage Slider (clipping onto rail above) */}
            <div className="absolute -top-1 left-6 sm:left-8 -translate-x-1/2 w-3 h-3 bg-gradient-to-b from-[#E2C775] to-[#8F6E24] border border-[#6E5318] rounded-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#4A3810]" />
            </div>
            {/* Left Cable */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8F6E24] via-[#C29A3A] to-[#8F6E24] shadow-[0.5px_0_1.5px_rgba(62,32,35,0.18)]" />

            {/* Right Rail Carriage Slider (clipping onto rail above) */}
            <div className="absolute -top-1 right-6 sm:right-8 translate-x-1/2 w-3 h-3 bg-gradient-to-b from-[#E2C775] to-[#8F6E24] border border-[#6E5318] rounded-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.25)] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#4A3810]" />
            </div>
            {/* Right Cable */}
            <div className="absolute right-6 sm:right-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#8F6E24] via-[#C29A3A] to-[#8F6E24] shadow-[0.5px_0_1.5px_rgba(62,32,35,0.18)]" />
          </div>

          {/* 03. Suspended Frame Container with Micro-Physical Pendulum Float */}
          <motion.div
            animate={{
              rotate: [0, 0.2, 0, -0.2, 0],
              y: [0, -1.5, 0, 1.2, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full"
          >
            {/* Precision Brass Frame Clamps / Hinges (clutching top edge of frame) */}
            <div className="absolute -top-3 left-6 sm:left-8 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full border border-[#8F6E24] bg-[#D4AF37] shadow-xs" />
              <div className="w-3.5 h-3.5 bg-gradient-to-b from-[#D4AF37] to-[#8F6E24] border border-[#6E5318] rounded-b-[1px] shadow-[0_1.5px_3px_rgba(0,0,0,0.22)] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#3E2023]" />
              </div>
            </div>

            <div className="absolute -top-3 right-6 sm:right-8 translate-x-1/2 z-30 pointer-events-none flex flex-col items-center" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full border border-[#8F6E24] bg-[#D4AF37] shadow-xs" />
              <div className="w-3.5 h-3.5 bg-gradient-to-b from-[#D4AF37] to-[#8F6E24] border border-[#6E5318] rounded-b-[1px] shadow-[0_1.5px_3px_rgba(0,0,0,0.22)] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#3E2023]" />
              </div>
            </div>

            {/* Museum Gallery Frame Structure with Tangible Depth and Ambient Wall Shadow */}
            <div
              onClick={onExplorePortfolio}
              className="group relative bg-[#FAF6F1] border-2 sm:border-[2.5px] border-[#3E2023] p-3 sm:p-4 rounded-[1px] shadow-[0_28px_60px_-15px_rgba(62,32,35,0.22),_0_10px_20px_-6px_rgba(62,32,35,0.10),_0_2px_6px_rgba(62,32,35,0.06)] transition-all duration-700 cursor-pointer"
              title="Click to explore portfolio"
            >
              {/* 4:5 Portrait Photographic Window with Archival Aperture */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8E0D7] border border-[#3E2023] shadow-[inset_0_2px_8px_rgba(62,32,35,0.08)]">
                {/* 01. Unfolding / Cascading Elegant Preloader */}
                <AnimatePresence>
                  {isPreloading && (
                    <motion.div
                      key="cascading-hero-preloader"
                      initial={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.55, delay: 0.45 },
                      }}
                      className="absolute inset-0 z-30 flex flex-col justify-between overflow-hidden bg-[#FAF6F1]"
                      aria-live="polite"
                      aria-busy="true"
                    >
                      {/* Cascading Unfolding Vertical Panels (staggered louvers) */}
                      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-10">
                        {[0, 1, 2, 3].map((colIdx) => (
                          <motion.div
                            key={colIdx}
                            initial={{ scaleY: 1 }}
                            exit={{
                              scaleY: 0,
                              transition: {
                                duration: 0.7,
                                delay: colIdx * 0.1, // Staggered unfolding cascade
                                ease: [0.76, 0, 0.24, 1],
                              },
                            }}
                            style={{ originY: colIdx % 2 === 0 ? 0 : 1 }}
                            className="w-full h-full bg-[#EDE6DC] border-r border-[#DCD1C4] last:border-none relative"
                          >
                            {/* Fine Antique Gold Hairline running down each cascading panel */}
                            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#C29A3A]/45 to-transparent" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Center Archival Editorial Preloader Crest */}
                      <motion.div
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.3 } }}
                        className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 text-center"
                      >
                        {/* Unfolding Geometric Emblem */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="w-10 h-10 rounded-full border border-[#C29A3A]/70 flex items-center justify-center mb-3 bg-[#FAF6F1]/95 shadow-[0_2px_8px_rgba(62,32,35,0.06)]"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                            className="text-[11px] text-[#8F6E24] font-serif"
                          >
                            ✦
                          </motion.span>
                        </motion.div>

                        {/* Atelier Brand Callout */}
                        <motion.span
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#3E2023] font-medium"
                        >
                          Melissa Fourie
                        </motion.span>

                        {/* Unfolding Horizontal Hairline Accent */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          style={{ originX: 0.5 }}
                          className="w-16 h-[1px] bg-[#C29A3A]/60 my-2"
                        />

                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.45, duration: 0.6 }}
                          className="text-[8px] uppercase tracking-[0.24em] text-[#75595C]/80 font-light"
                        >
                          Exhibition Study
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 02. Active Photographic Slide Presentation */}
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <motion.img
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.03 }}
                      transition={{ duration: 5.0, ease: 'easeOut' }}
                      src={currentSlide.image}
                      alt={`Bridal portrait study — Hair and makeup artistry by Melissa Fourie`}
                      loading={currentIndex === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover filter contrast-[1.02] brightness-[0.99] ${currentSlide.focalPosition}`}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Cascading Shutter Louver Transition between slide changes */}
                {!isPreloading && (
                  <motion.div
                    key={`slide-shutter-${currentSlide.id}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.65, delay: 0.18 }}
                    className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3"
                  >
                    {[0, 1, 2].map((col) => (
                      <motion.div
                        key={col}
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: col * 0.08,
                          ease: [0.77, 0, 0.175, 1],
                        }}
                        style={{ originY: col % 2 === 0 ? 0 : 1 }}
                        className="w-full h-full bg-[#FAF6F1]/80 backdrop-blur-[1px] border-r border-[#DCD1C4]/40 last:border-none"
                      />
                    ))}
                  </motion.div>
                )}

                {/* Soft ambient inner lens vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none shadow-[inset_0_0_16px_rgba(62,32,35,0.05)]"
                />
              </div>

              {/* Sub-Placard Inset in Archival Frame */}
              <div className="pt-2.5 pb-0.5 px-0.5 flex items-center justify-between text-[8px] sm:text-[8.5px] uppercase tracking-[0.26em] text-[#75595C] font-light">
                <span className="text-[#3E2023]/80 font-normal">{currentSlide.location}</span>
                <span className="text-[#C29A3A] font-serif tracking-[0.2em]">
                  {currentSlide.index} / 0{HERO_SLIDES.length}
                </span>
              </div>
            </div>

            {/* 04. Indexing & Actions Under the Hero Frame */}
            <div className="flex flex-col items-center mt-3.5 sm:mt-4 space-y-3">
              {/* Minimalist Slide Index Tabs with 5-Second Duration Progress Bar */}
              <div className="flex items-center justify-center space-x-4">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    aria-label={`View portrait 0${idx + 1}`}
                    className="py-1 px-1.5 focus:outline-none cursor-pointer group flex flex-col items-center min-w-[28px]"
                  >
                    <span
                      className={`text-[9.5px] font-serif transition-colors duration-300 block ${
                        idx === currentIndex
                          ? 'text-[#3E2023] font-normal'
                          : 'text-[#75595C]/45 hover:text-[#3E2023] font-light'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    {/* 5-Second Linear Progress Hairline */}
                    <div className="w-full h-[1.5px] mt-0.5 bg-[#DCD1C4]/30 overflow-hidden rounded-full">
                      {idx === currentIndex && !isPreloading ? (
                        <motion.div
                          key={`progress-${currentIndex}-${isPaused}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isPaused ? undefined : 1 }}
                          transition={{ duration: 5.0, ease: 'linear' }}
                          style={{ originX: 0 }}
                          className="w-full h-full bg-[#C29A3A] rounded-full"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${
                            idx === currentIndex ? 'bg-[#C29A3A]' : 'bg-transparent'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* "VIEW PORTFOLIO" Pill Button with same warm taupe debossed depth as hamburger icon */}
              <button
                id="hero-view-portfolio-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onExplorePortfolio?.();
                }}
                className="group relative inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#B8A193] shadow-[inset_0_2px_4px_rgba(62,32,35,0.18),_inset_0_1px_2px_rgba(62,32,35,0.12),_inset_0_-1px_1px_rgba(255,255,255,0.25)] border border-[#A58E80]/40 focus:outline-none transition-all duration-300 hover:brightness-[1.03] hover:shadow-[inset_0_2.5px_5px_rgba(62,32,35,0.22)] active:scale-[0.97] cursor-pointer"
                aria-label="View Portfolio"
              >
                <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.24em] font-normal text-[#F2ECE6] drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] whitespace-nowrap">
                  VIEW PORTFOLIO
                </span>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
