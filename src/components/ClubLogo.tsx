import React from 'react';

interface ClubLogoProps {
  className?: string;
  size?: number;
  withShadow?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({ 
  className = "w-16 h-16", 
  withShadow = true 
}) => {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${withShadow ? 'filter drop-shadow-md' : ''}`}
      aria-label="উত্তর গাজীপুর সূর্যতরুণ ক্লাব লোগো"
    >
      {/* Outer Shield Path */}
      <path
        d="M 20 28 C 65 24, 135 24, 180 28 C 180 90, 184 150, 100 228 C 16 150, 20 90, 20 28 Z"
        fill="#fbfdfb"
        stroke="#063b20"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Inner Thin Border Line */}
      <path
        d="M 28 35 C 70 32, 130 32, 172 35 C 172 92, 175 145, 100 216 C 25 145, 28 92, 28 35 Z"
        fill="none"
        stroke="#063b20"
        strokeWidth="1.5"
      />

      {/* Top Rising Sun Area */}
      <g>
        {/* Sun Disk */}
        <circle cx="100" cy="78" r="28" fill="#f59e0b" />
        
        {/* Radiating Sun Rays */}
        {/* Center Ray */}
        <polygon points="97,42 103,42 100,28" fill="#f59e0b" />
        {/* Left Rays */}
        <polygon points="82,46 87,49 76,33" fill="#f59e0b" />
        <polygon points="68,54 72,59 56,43" fill="#f59e0b" />
        <polygon points="56,66 59,72 40,60" fill="#f59e0b" />
        <polygon points="50,81 52,87 31,80" fill="#f59e0b" />
        {/* Right Rays */}
        <polygon points="113,49 118,46 124,33" fill="#f59e0b" />
        <polygon points="128,59 132,54 144,43" fill="#f59e0b" />
        <polygon points="141,72 144,66 160,60" fill="#f59e0b" />
        <polygon points="148,87 150,81 169,80" fill="#f59e0b" />

        {/* Horizon Arc */}
        <path
          d="M 42 92 Q 100 82 158 92"
          stroke="#f59e0b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Dark Green Banner Ribbon */}
      <g>
        {/* Banner Left End */}
        <path
          d="M 14 125 L 26 112 L 26 150 L 14 138 Z"
          fill="#042715"
        />
        {/* Banner Right End */}
        <path
          d="M 186 125 L 174 112 L 174 150 L 186 138 Z"
          fill="#042715"
        />

        {/* Main Ribbon Body */}
        <path
          d="M 16 115 C 65 120, 135 120, 184 115 L 180 156 C 135 162, 65 162, 20 156 Z"
          fill="#063b20"
          stroke="#063b20"
          strokeWidth="1.5"
        />

        {/* Banner Text - UTTAR GAZIPUR SURJO TORUN CLUB */}
        <text
          x="100"
          y="132"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11.5"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          letterSpacing="0.04em"
        >
          UTTAR GAZIPUR
        </text>
        <text
          x="100"
          y="148"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10.8"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
          letterSpacing="0.02em"
        >
          SURJO TORUN CLUB
        </text>
      </g>

      {/* Bottom Area: Three Icons (Book, Handshake, Heart) & Bangla Motto */}
      <g transform="translate(0, 5)">
        {/* 1. Open Book Icon (Left) */}
        <g transform="translate(56, 155) scale(0.65)">
          <path
            d="M 4 28 C 14 26, 22 26, 30 28 L 30 6 C 22 4, 14 4, 4 6 Z"
            fill="none"
            stroke="#063b20"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 30 28 C 38 26, 46 26, 56 28 L 56 6 C 46 4, 38 4, 30 6 Z"
            fill="none"
            stroke="#063b20"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <line x1="30" y1="6" x2="30" y2="28" stroke="#063b20" strokeWidth="3" />
        </g>

        {/* 2. Handshake Icon (Center) */}
        <g transform="translate(85, 155) scale(0.65)">
          <path
            d="M 6 16 L 16 8 L 22 13 L 20 18 L 14 18 L 10 22 L 6 18 Z"
            fill="#063b20"
          />
          <path
            d="M 40 16 L 30 8 L 24 13 L 26 18 L 32 18 L 36 22 L 40 18 Z"
            fill="#063b20"
          />
          {/* Clasped fingers */}
          <rect x="18" y="14" width="10" height="9" rx="3" fill="#063b20" />
        </g>

        {/* 3. Heart Icon (Right) */}
        <g transform="translate(118, 156) scale(0.65)">
          <path
            d="M 16 6 C 13 0, 0 2, 0 14 C 0 22, 10 28, 16 34 C 22 28, 32 22, 32 14 C 32 2, 19 0, 16 6 Z"
            fill="#063b20"
          />
        </g>

        {/* Bangla Motto: শিক্ষা ঐক্য / মানবতা */}
        <text
          x="100"
          y="186"
          textAnchor="middle"
          fill="#063b20"
          fontSize="11"
          fontWeight="700"
          fontFamily="'Hind Siliguri', 'Tiro Bangla', sans-serif"
        >
          শিক্ষা ঐক্য
        </text>
        <text
          x="100"
          y="200"
          textAnchor="middle"
          fill="#063b20"
          fontSize="11"
          fontWeight="700"
          fontFamily="'Hind Siliguri', 'Tiro Bangla', sans-serif"
        >
          মানবতা
        </text>
      </g>
    </svg>
  );
};
