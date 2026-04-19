import React from 'react';

/**
 * BrandMark Component
 * Replaces transform: scale with logical sizes to ensure proper flex layout.
 * Sizes: 'small' (nav), 'medium' (footer), 'large' (hero)
 */
const BrandMark = ({ variant = 'gold', size = 'medium', className = '' }) => {
  const isGold = variant === 'gold';
  
  // Logical styling based on size prop
  const sizeStyles = {
    small: {
      svgWidth: 58,
      svgHeight: 52,
      nameSize: 'text-[13px]',
      legalGap: 'gap-3',
      legalText: 'text-[8px]',
      taglineSize: 'text-[9px]',
      containerGap: 'gap-1',
      nameMargin: 'mb-0',
      legalMargin: 'mb-0',
      svgMargin: 'mb-1'
    },
    medium: {
      svgWidth: 80,
      svgHeight: 70,
      nameSize: 'text-lg',
      legalGap: 'gap-4',
      legalText: 'text-[10px]',
      taglineSize: 'text-xs',
      containerGap: 'gap-1.5',
      nameMargin: 'mb-1',
      legalMargin: 'mb-1',
      svgMargin: 'mb-2'
    },
    large: {
      svgWidth: 160,
      svgHeight: 140,
      nameSize: 'text-4xl md:text-6xl',
      legalGap: 'gap-10', // Significantly wider for hero
      legalText: 'text-sm md:text-base',
      taglineSize: 'text-base md:text-xl',
      containerGap: 'gap-6', // Increased gap for hero
      nameMargin: 'mb-4',
      legalMargin: 'mb-4',
      svgMargin: 'mb-8'
    }
  };

  const style = sizeStyles[size] || sizeStyles.medium;
  
  // Colors based on theme - switched to higher contrast golds for legibility on white
  const primaryColor = isGold ? '#996515' : '#800000'; // Deep Golden Brown
  const textColor = isGold ? '#7A5901' : '#800000';    // Dark Rich Gold
  
  return (
    <div className={`flex flex-col items-center select-none ${className} ${style.containerGap}`}>
      {/* MSO Monogram SVG */}
      <svg 
        width={style.svgWidth} 
        height={style.svgHeight} 
        viewBox="0 0 120 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={style.svgMargin}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="25%" stopColor="#F1E1C6" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="75%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#C5A059" />
          </linearGradient>
          <linearGradient id="maroonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800000" />
            <stop offset="50%" stopColor="#A30029" />
            <stop offset="100%" stopColor="#800000" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <g 
          stroke={isGold ? "url(#goldGradient)" : "url(#maroonGradient)"} 
          strokeWidth={size === 'small' ? "3" : "2"} // Thicker stroke for small size
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter={isGold && size !== 'small' ? "url(#goldGlow)" : "none"} // Disable glow on small for crispness
        >
          <path d="M10 80V20L35 55L60 20V80" />
          <path d="M40 30C25 30 20 40 20 50C20 65 70 65 70 80C70 90 60 95 45 95" />
          <circle cx="85" cy="50" r="30" strokeWidth="2.5" />
        </g>
      </svg>

      {/* Primary Firm Name */}
      <h2 
        className={`font-serif-heading font-normal tracking-[0.25em] ${style.nameSize} ${style.nameMargin} whitespace-nowrap`}
        style={{ 
          color: textColor,
          textShadow: isGold && size !== 'small' ? '0 15px 30px rgba(0,0,0,0.6)' : 'none'
        }}
      >
        M. S. OCHIENG
      </h2>

      {/* LEGAL with flanking lines */}
      <div className={`flex items-center ${style.legalGap} ${style.legalMargin} w-full px-4`}>
        <div className="h-px grow" style={{ background: primaryColor, opacity: 0.5 }} />
        <span 
          className={`font-serif-sub tracking-[0.6em] ${style.legalText} uppercase font-semibold whitespace-nowrap`}
          style={{ color: primaryColor }}
        >
          LEGAL
        </span>
        <div className="h-px grow" style={{ background: primaryColor, opacity: 0.5 }} />
      </div>

      {/* Italic Tagline */}
      <p 
        className={`font-serif-sub italic tracking-widest md:tracking-[0.4em] ${style.taglineSize} opacity-90`}
        style={{ color: textColor }}
      >
        Bold Law. Refined Strategy.
      </p>
    </div>
  );
};

export default BrandMark;
