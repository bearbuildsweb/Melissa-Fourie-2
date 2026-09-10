import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubline?: boolean;
  sublineText?: string;
  className?: string;
  sparkleArtistry?: boolean;
}

/**
 * Organic Golden Dust Particles
 * - Subtle, weightless micro-particles floating organically
 * - Cast in the signature warm gold accent tone (#C29A3A) with light, airy opacity
 * - Omits star sparkles in favor of natural drifting cosmetic/pixie dust motes
 */
export const GoldenDustParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span
      className={`inline-flex items-center select-none relative h-3 ${className.includes('ml-') || className.includes('m-') ? '' : 'ml-2'} ${className}`}
      aria-label="Golden dust particles"
    >
      {/* Constellation of light, subtle floating golden dust specks */}
      <span className="relative flex items-center space-x-1.5">
        {/* Particle 1: High light float */}
        <span className="w-[2px] h-[2px] rounded-full bg-[#C29A3A] opacity-70 -translate-y-[2.5px] shadow-[0_0_2px_rgba(194,154,58,0.4)]" />
        
        {/* Particle 2: Lower micro drift */}
        <span className="w-[1.5px] h-[1.5px] rounded-full bg-[#C29A3A] opacity-50 translate-y-[1.5px]" />
        
        {/* Particle 3: Subtle mid particle */}
        <span className="w-[2.5px] h-[2.5px] rounded-full bg-[#C29A3A] opacity-65 -translate-y-[0.5px] shadow-[0_0_2px_rgba(194,154,58,0.3)]" />
        
        {/* Particle 4: Fading micro speck */}
        <span className="w-[1.5px] h-[1.5px] rounded-full bg-[#C29A3A] opacity-45 translate-y-[2px]" />
        
        {/* Particle 5: Ethereal trailing speck */}
        <span className="w-[1px] h-[1px] rounded-full bg-[#C29A3A] opacity-40 -translate-y-[1.5px]" />
      </span>
    </span>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubline = true,
  sublineText = 'HAIR & MAKEUP ARTISTRY',
  className = '',
  sparkleArtistry = false,
}) => {
  const isLight = variant === 'light';

  // Palette tokens for quiet luxury branding
  const textPrimary = isLight ? '#F2ECE6' : '#3E2023';
  const textSecondary = isLight ? '#D1C4B8' : '#75595C';

  const config = {
    sm: {
      wordmarkClass: 'text-lg sm:text-xl font-light tracking-[0.22em]',
      sublineClass: 'text-[7px] tracking-[0.32em]',
    },
    md: {
      wordmarkClass: 'text-xl sm:text-2xl font-light tracking-[0.24em]',
      sublineClass: 'text-[8px] sm:text-[8.5px] tracking-[0.34em]',
    },
    lg: {
      wordmarkClass: 'text-2xl sm:text-3xl lg:text-[34px] font-light tracking-[0.26em]',
      sublineClass: 'text-[9px] tracking-[0.36em]',
    },
  }[size];

  return (
    <div
      className={`inline-flex flex-col justify-center select-none transition-opacity duration-300 hover:opacity-85 ${className.includes('items-') ? '' : 'items-start'} ${className}`}
    >
      {/* Refined Old-Money Fashion House Wordmark */}
      <div
        className={`leading-none flex items-center ${config.wordmarkClass} uppercase font-serif`}
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          color: textPrimary,
        }}
      >
        <span>MELISSA FOURIE</span>
      </div>

      {showSubline && (
        <span
          style={{ color: textSecondary }}
          className={`${config.sublineClass} uppercase font-light font-sans mt-1.5 flex items-center justify-center md:justify-start`}
        >
          {sparkleArtistry && sublineText.includes('ARTISTRY') ? (
            <span className="inline-flex items-center">
              <span>{sublineText.replace(/\s*ARTISTRY\s*/i, '').trim()}</span>
              <GoldenDustParticles />
            </span>
          ) : (
            sublineText
          )}
        </span>
      )}
    </div>
  );
};
