import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    // Animation timing sequence:
    // Total animation runs ~1.7s, then initiates exit dissolve
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, prefersReducedMotion ? 900 : 1750);

    // Call onComplete after exit transition concludes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, prefersReducedMotion ? 1200 : 2250);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, [onComplete, prefersReducedMotion]);

  // Letters of the wordmark with custom styling & individual rhythm
  const letters = [
    { char: 'L', delay: 0.25, duration: 0.55, special: 'leading' },
    { char: 'I', delay: 0.42, duration: 0.48 },
    { char: 'Y', delay: 0.58, duration: 0.56, special: 'accent' },
    { char: 'A', delay: 0.74, duration: 0.52, special: 'accent' },
    { char: 'N', delay: 0.90, duration: 0.48 },
    { char: 'A', delay: 1.05, duration: 0.58, special: 'finishing' },
  ];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="bespoke-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -12,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1], // Luxury smooth cubic bezier
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F2ECE6] select-none pointer-events-none overflow-hidden"
          aria-live="polite"
          aria-label="Loading Melissa Fourie"
        >
          {/* Subtle Ambient Background Vignette for High-Fashion Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(242,236,230,0.8)_0%,_rgba(242,236,230,1)_70%)] pointer-events-none" />

          {/* Central Stage */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-xl w-full text-center">
            
            {/* Top Micro-Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: prefersReducedMotion ? 0.1 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-3 sm:mb-4"
            >
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-[#7A5F62] font-light">
                MELISSA FOURIE
              </span>
            </motion.div>

            {/* Primary Wordmark Container */}
            <div className="relative py-2 px-4 flex items-center justify-center">
              
              {/* Artisanal Brush Sweep Line */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
                  {/* The fine makeup stroke guide */}
                  <motion.div
                    initial={{ x: '-105%', opacity: 0, scaleX: 0.6 }}
                    animate={{
                      x: ['-105%', '0%', '115%'],
                      opacity: [0, 0.7, 0.85, 0],
                      scaleX: [0.6, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.25,
                      delay: 0.2,
                      times: [0, 0.5, 1],
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#C29A3A] to-transparent"
                  />
                  {/* Soft dewy glow */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{
                      x: ['-100%', '0%', '120%'],
                      opacity: [0, 0.45, 0],
                    }}
                    transition={{
                      duration: 1.25,
                      delay: 0.2,
                      times: [0, 0.5, 1],
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-24 h-12 -my-6 bg-[radial-gradient(circle,_rgba(194,154,58,0.25)_0%,_transparent_70%)] blur-md"
                  />
                </div>
              )}

              {/* Progressive Letter-by-Letter Application */}
              <h1 className="flex items-center justify-center tracking-[0.24em] sm:tracking-[0.32em] font-serif text-4xl sm:text-5xl md:text-6xl text-[#3E2023] font-light">
                {letters.map((item, index) => (
                  <span
                    key={index}
                    className="relative inline-block overflow-hidden py-1"
                  >
                    {prefersReducedMotion ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="inline-block"
                      >
                        {item.char}
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{
                          opacity: 0,
                          y: 8,
                          filter: 'blur(6px)',
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                          scale: 1,
                        }}
                        transition={{
                          duration: item.duration,
                          delay: item.delay,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                      >
                        {item.char}
                      </motion.span>
                    )}
                  </span>
                ))}
              </h1>
            </div>

            {/* Sub-Descriptor & Editorial Anchor */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: prefersReducedMotion ? 0.3 : 1.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-3 sm:mt-4 flex items-center space-x-3"
            >
              <span className="w-4 sm:w-6 h-[1px] bg-[#E0D6CB]" />
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.34em] uppercase text-[#7A5F62] font-normal">
                HAIR &amp; MAKEUP &middot; CAPETOWN &bull; WORLDWIDE
              </span>
              <span className="w-4 sm:w-6 h-[1px] bg-[#E0D6CB]" />
            </motion.div>

          </div>

          {/* Bottom Hairline Brand Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{
              duration: 0.6,
              delay: prefersReducedMotion ? 0.4 : 1.5,
            }}
            className="absolute bottom-8 text-[9px] tracking-[0.24em] text-[#7A5F62] uppercase font-light"
          >
            MELISSA FOURIE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
