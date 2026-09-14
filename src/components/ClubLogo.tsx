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
    <img
      src="/logo.jpeg"
      alt="উত্তর গাজীপুর সূর্যতরুণ ক্লাব লোগো"
      className={`${className} object-contain ${withShadow ? 'filter drop-shadow-md' : ''}`}
    />
  );
};
