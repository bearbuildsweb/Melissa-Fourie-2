import React from 'react';
import { Instagram } from 'lucide-react';
import aboutImg from '../assets/images/ABOUT/1.jpg';
import { SITE_CONFIG } from '../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Melissa Fourie"
      className="relative w-full bg-[#FAF7F2] rounded-[3px] border border-[#DCD1C4] px-8 py-12 sm:px-14 sm:py-16 md:px-20 md:py-24 overflow-hidden shadow-[0_1px_3px_rgba(46,24,27,0.04),0_6px_18px_-3px_rgba(46,24,27,0.06)]"
    >
      {/* Top Hairline Category Accent with Weightier EST. 2004 */}
      <div className="w-full flex items-center justify-between pb-6 sm:pb-8 border-b border-[#E3D9CD]/70 mb-10 sm:mb-14 md:mb-16">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#7A5F62]/85 font-light">
          MELISSA FOURIE &bull; HAIR &amp; MAKEUP ARTISTRY
        </span>

        {/* EST. 2004 — Distinctive, Weighty & Present */}
        <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#EFE9DF] border border-[#D5C7B7] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_1px_2px_rgba(62,32,35,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C29A3A] shadow-xs" />
          <span className="text-xs sm:text-[13px] tracking-[0.22em] text-[#3E2023] font-medium font-sans uppercase">
            EST. 2004
          </span>
        </div>
      </div>

      {/* Main Minimalist Composition (Direct Visual Restraint from Reference) */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-start pb-8 sm:pb-12">
        
        {/* Label + Organic Curved Photo Vessel */}
        <div className="flex items-start space-x-4 sm:space-x-6 mb-10 sm:mb-14 md:mb-16">
          {/* Label matching "Moringa Oil" placement */}
          <span className="text-sm sm:text-base md:text-lg font-semibold text-[#3E2023] tracking-tight whitespace-nowrap pt-1">
            Melissa Fourie
          </span>

          {/* Organic Pebble Frame */}
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 overflow-hidden rounded-[38%_62%_63%_37%/41%_44%_56%_59%] border border-[#D8CEC2] bg-[#EAE2D8] shadow-[0_14px_32px_-8px_rgba(62,32,35,0.12),inset_0_1px_2px_rgba(255,255,255,0.7)] group shrink-0">
            <img
              src={aboutImg}
              alt="Melissa Fourie atelier portrait"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.99] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* Soft inner ambient vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(62,32,35,0.06)]"
            />
          </div>
        </div>

        {/* Lower Composition: Pure Stacked Typography & Overlapping Wireframe Circle */}
        <div className="relative w-full">
          {/* Delicate Geometric Wireframe Circle (Intersects 'Behind' & 'Every Glow') */}
          <div
            aria-hidden="true"
            className="absolute left-[38%] sm:left-[44%] md:left-[42%] -top-10 sm:-top-14 md:-top-16 w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full border border-[#D5C7B7]/80 pointer-events-none z-0"
          />

          {/* Clean High-Contrast Stacked Headline ("Refined Experience Behind Every Glow") */}
          <h3 className="relative z-10 font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#3E2023] font-normal tracking-[-0.035em] leading-[1.04] select-none max-w-3xl">
            <span className="block">Refined Experience</span>
            <span className="block">Behind</span>
            <span className="block">Every Glow</span>
          </h3>
        </div>

      </div>

      {/* Lower Right-Hand Instagram Icon Link */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-14 z-20">
        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit Melissa Fourie on Instagram (${SITE_CONFIG.instagram})`}
          className="group relative inline-flex items-center space-x-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#FAF7F2] hover:bg-[#3E2023] border border-[#D8CEC2] hover:border-[#3E2023] shadow-[0_2px_8px_rgba(62,32,35,0.06)] hover:shadow-[0_4px_14px_rgba(62,32,35,0.18)] transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#3E2023] group-hover:text-[#F2ECE6] transition-colors duration-300 shrink-0" />
          <span className="hidden sm:inline text-[11px] font-sans tracking-[0.16em] uppercase text-[#7A5F62] group-hover:text-[#F2ECE6] transition-colors duration-300 font-normal">
            {SITE_CONFIG.instagram}
          </span>
        </a>
      </div>
    </section>
  );
};
