import React from 'react';

/**
 * BrandMark Component
 * Replaces transform: scale with logical sizes to ensure proper flex layout.
 * Sizes: 'small' (nav), 'medium' (footer), 'large' (hero)
 */
const BrandMark = ({ variant = 'gold', size = 'medium', className = '', collapsed = false }) => {
  const isGold = variant === 'gold';
  
  // Logical styling based on size prop
  const sizeStyles = {
    small: {
      svgWidth: 48,
      svgHeight: 40,
      nameSize: 'text-[10px]',
      legalGap: 'gap-2',
      legalText: 'text-[8px]',
      taglineSize: 'text-[9px]',
      containerGap: 'gap-1',
      nameMargin: 'mb-0',
      legalMargin: 'mb-0',
      svgMargin: 'mb-1'
    },
    medium: {
      svgWidth: 84,
      svgHeight: 70,
      nameSize: 'text-lg',
      legalGap: 'gap-4',
      legalText: 'text-[11px]',
      taglineSize: 'text-xs',
      containerGap: 'gap-1.5',
      nameMargin: 'mb-1',
      legalMargin: 'mb-1',
      svgMargin: 'mb-2'
    },
    large: {
      svgWidth: 168,
      svgHeight: 140,
      nameSize: 'text-4xl md:text-6xl',
      legalGap: 'gap-10', // Significantly wider for hero
      legalText: 'text-sm md:text-lg',
      taglineSize: 'text-base md:text-xl',
      containerGap: 'gap-6', // Increased gap for hero
      nameMargin: 'mb-4',
      legalMargin: 'mb-4',
      svgMargin: 'mb-8'
    }
  };

  const style = sizeStyles[size] || sizeStyles.medium;
  
  // Colors based on variant
  let svgStroke, nameColor, legalColor, taglineColor, useGlow;

  if (variant === 'black') {
    svgStroke = '#000000'; // Pure pitch black for the logo mark
    nameColor = '#000000'; // Pure pitch black for the firm name
    legalColor = '#000000'; // Pure pitch black for 'LEGAL'
    taglineColor = '#000000'; // Pure pitch black for the tagline
    useGlow = false;
  } else if (variant === 'gold') {
    svgStroke = 'url(#goldGradient)'; // Gold gradient for the mark
    nameColor = '#F1E1C6'; // Bright Premium Ivory Gold for perfect dark background contrast
    legalColor = '#D4AF37'; // Classic Gold
    taglineColor = '#C5A059'; // Soft Gold
    useGlow = size !== 'small';
  } else {
    // Maroon fallback
    svgStroke = 'url(#maroonGradient)';
    nameColor = '#800000';
    legalColor = '#800000';
    taglineColor = '#800000';
    useGlow = false;
  }

  if (collapsed) {
    return (
      <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        <svg 
          width={style.svgWidth} 
          height={style.svgHeight} 
          viewBox="0 0 120 100" 
          preserveAspectRatio="xMidYMid meet"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
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
          
          <circle cx="60" cy="50" r="46" stroke={svgStroke} strokeWidth="1" opacity="0.6" />
          <circle cx="60" cy="50" r="42" stroke={svgStroke} strokeWidth="0.5" strokeDasharray="3 2" opacity="0.4" />
          
          <g 
            stroke={svgStroke} 
            strokeWidth={size === 'small' ? "2.5" : "1.8"}
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter={useGlow ? "url(#goldGlow)" : "none"}
          >
            <path d="M60 16V80M52 80H68M55 20H65" />
            <path d="M36 28H84" />
            <path d="M36 28L28 48H44L36 28" />
            <path d="M84 28L76 48H92L84 28" />
            <path d="M46 54V72L60 62L74 72V54" opacity="0.8" />
            <path d="M48 60C48 56 72 56 72 64C72 72 48 70 48 76" opacity="0.7" />
            <circle cx="60" cy="62" r="14" strokeWidth="1.2" opacity="0.8" />
          </g>
        </svg>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col items-center select-none ${className} ${style.containerGap}`}>
      {/* MSO Monogram SVG */}
      <svg 
        width={style.svgWidth} 
        height={style.svgHeight} 
        viewBox="0 0 120 100" 
        preserveAspectRatio="xMidYMid meet"
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
        
        {/* Outer Circular Crest */}
        <circle cx="60" cy="50" r="46" stroke={svgStroke} strokeWidth="1" opacity="0.6" />
        <circle cx="60" cy="50" r="42" stroke={svgStroke} strokeWidth="0.5" strokeDasharray="3 2" opacity="0.4" />
        
        <g 
          stroke={svgStroke} 
          strokeWidth={size === 'small' ? "2.5" : "1.8"}
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter={useGlow ? "url(#goldGlow)" : "none"}
        >
          {/* Scales of Justice Balance Pillar */}
          <path d="M60 16V80M52 80H68M55 20H65" />
          {/* Crossbeam */}
          <path d="M36 28H84" />
          {/* Left Pan */}
          <path d="M36 28L28 48H44L36 28" />
          {/* Right Pan */}
          <path d="M84 28L76 48H92L84 28" />
          
          {/* Intertwined 'M', 'S', 'O' monogram inside */}
          {/* Stylized 'M' */}
          <path d="M46 54V72L60 62L74 72V54" opacity="0.8" />
          {/* Stylized 'S' looping between elements */}
          <path d="M48 60C48 56 72 56 72 64C72 72 48 70 48 76" opacity="0.7" />
          {/* Stylized 'O' surrounding the center intersection */}
          <circle cx="60" cy="62" r="14" strokeWidth="1.2" opacity="0.8" />
        </g>
      </svg>

      {/* Primary Firm Name */}
      <h2 
        className={`font-serif-heading font-bold tracking-[0.25em] ${style.nameSize} ${style.nameMargin} whitespace-nowrap`}
        style={{ 
          color: nameColor,
          textShadow: useGlow ? '0 15px 30px rgba(0,0,0,0.6)' : 'none'
        }}
      >
        M. S. OCHIENG
      </h2>

      {/* LEGAL with flanking lines */}
      <div className={`flex items-center ${style.legalGap} ${style.legalMargin} w-full px-4`}>
        <div className="h-[1.5px] grow" style={{ background: legalColor, opacity: variant === 'black' ? 1 : 0.5 }} />
        <span 
          className={`font-serif-sub tracking-[0.6em] ${style.legalText} uppercase font-extrabold whitespace-nowrap`}
          style={{ color: legalColor }}
        >
          LEGAL
        </span>
        <div className="h-[1.5px] grow" style={{ background: legalColor, opacity: variant === 'black' ? 1 : 0.5 }} />
      </div>

      {/* Italic Tagline */}
      <p 
        className={`font-serif-sub italic tracking-widest md:tracking-[0.4em] ${style.taglineSize} font-extrabold opacity-100`}
        style={{ color: taglineColor }}
      >
        Innovation. Integrity. Excellence.
      </p>
    </div>
  );
};

export default BrandMark;
