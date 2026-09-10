import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const current = TESTIMONIALS[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#F2ECE6] text-[#3E2023] overflow-hidden border-t border-[#DFD5CA]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.34em] text-[#7A5F62] font-light block">
            Client Words &bull; Defined Experiences
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#3E2023] tracking-tight">
            “Exactly how I imagined it.”
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5F62] font-light max-w-md mx-auto pt-1">
            Reflections from clients who trusted Melissa with their defining moments.
          </p>
        </div>

        {/* Editorial Quotation Stage */}
        <div className="relative bg-[#FAF6F1] border border-[#DDD2C5] p-8 sm:p-12 lg:p-16 transition-all duration-500 shadow-[0_15px_40px_rgba(62,32,35,0.04)]">
          
          {/* Subtle Decorative Quote Icon */}
          <div className="absolute top-6 left-6 lg:top-10 lg:left-10 text-[#C29A3A]/15 pointer-events-none">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 stroke-[0.75]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 min-h-[220px]">
            
            {/* Client Portrait (if available) */}
            {current.image && (
              <div className="shrink-0 relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border border-[#DDD2C5] bg-[#E8E0D7] shadow-sm">
                  <img
                    src={current.image}
                    alt={current.clientName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter contrast-[1.02]"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#FAF6F1] border border-[#C29A3A]/40 px-2 py-0.5 text-[7.5px] uppercase tracking-widest text-[#7A5F62] font-light">
                  Verified
                </div>
              </div>
            )}

            {/* Quote Content */}
            <div className="flex-1 flex flex-col justify-between space-y-6 text-center md:text-left">
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#3E2023] font-light leading-relaxed italic">
                “{current.quote}”
              </blockquote>

              <div className="pt-5 border-t border-[#E0D6CB] flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div>
                  <div className="font-serif text-lg sm:text-xl text-[#3E2023] font-normal">
                    — {current.clientName}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A5F62] font-light mt-0.5">
                    {current.role} &bull; <span className="text-[#553E41]">{current.occasion}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[9px] uppercase tracking-[0.26em] text-[#7A5F62] font-light block">Look</span>
                  <span className="text-xs font-serif italic text-[#3E2023]">{current.lookTitle}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Understated Controls & Indicators */}
          <div className="mt-10 pt-6 border-t border-[#E0D6CB] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-[2px] transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-[#C29A3A]'
                      : 'w-3 bg-[#DDD2C5] hover:bg-[#7A5F62]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#DDD2C5] bg-[#FAF6F1] text-[#3E2023] flex items-center justify-center hover:bg-[#3E2023] hover:text-[#F2ECE6] hover:border-[#3E2023] transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#DDD2C5] bg-[#FAF6F1] text-[#3E2023] flex items-center justify-center hover:bg-[#3E2023] hover:text-[#F2ECE6] hover:border-[#3E2023] transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
