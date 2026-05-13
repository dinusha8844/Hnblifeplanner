import React from 'react';

export default function HNBLogo({ className = "h-10" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg 
        viewBox="0 0 320 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        preserveAspectRatio="xMinYMid meet"
      >
        {/* HNB Text - Cyan */}
        <text 
          x="0" 
          y="70" 
          fill="#00ADEF" 
          style={{ 
            fontSize: '56px', 
            fontWeight: 900, 
            fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          HNB
        </text>
        
        {/* Life Text - Navy */}
        <text 
          x="120" 
          y="70" 
          fill="#133E8D" 
          style={{ 
            fontSize: '56px', 
            fontWeight: 700, 
            fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          Life
        </text>

        {/* Wing Mark - Positioned to the right of "Life" */}
        <g transform="translate(230, 20) scale(0.8)">
          {/* Blue part */}
          <path 
            d="M15 55C15 55 35 30 35 15C35 5 10 0 10 0C10 0 15 15 22 30C28 45 15 55 15 55Z" 
            fill="#133E8D" 
          />
          {/* Yellow part */}
          <path 
            d="M18 55C18 55 55 48 70 30C85 12 75 0 75 0C75 0 70 15 55 35C40 50 18 55 18 55Z" 
            fill="#FAB818" 
          />
        </g>
      </svg>
    </div>
  );
}
