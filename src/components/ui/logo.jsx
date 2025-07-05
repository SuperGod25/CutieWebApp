import React from 'react';

const CutieLogo = ({ className = "h-8 w-8" }) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular background */}
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        className="text-violet-400"
      />
      
      {/* Flower stems and leaves */}
      <g className="text-mint-600">
        <path 
          d="M75 85 Q80 75 85 65 Q87 60 85 55" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <path 
          d="M80 75 Q85 70 90 68" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1"
        />
        <path 
          d="M78 68 Q82 65 85 62" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1"
        />
      </g>
      
      {/* Flowers */}
      <g className="text-purple-500">
        {/* First flower */}
        <circle cx="85" cy="55" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="82" cy="52" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="88" cy="52" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="82" cy="58" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="88" cy="58" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
        
        {/* Second flower */}
        <circle cx="90" cy="68" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="88" cy="66" r="1.5" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="92" cy="66" r="1.5" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="88" cy="70" r="1.5" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="92" cy="70" r="1.5" fill="none" stroke="currentColor" strokeWidth="1"/>
      </g>
      
      {/* Text "cutie" */}
      <text 
        x="35" 
        y="68" 
        fontSize="18" 
        fontWeight="bold" 
        className="text-purple-700 fill-current"
        fontFamily="Manrope, sans-serif"
      >
        cutie
      </text>
      
      {/* Subtitle */}
      <text 
        x="25" 
        y="78" 
        fontSize="6" 
        className="text-violet-600 fill-current"
        fontFamily="Manrope, sans-serif"
      >
        florărie și cafenea
      </text>
    </svg>
  );
};

export default CutieLogo;
