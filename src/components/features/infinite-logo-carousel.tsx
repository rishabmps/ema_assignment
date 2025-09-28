'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, memo, useMemo } from 'react';

interface Company {
  name: string;
  domain: string;
  color?: string;
  hoverColor?: string;
}

interface InfiniteLogoCarouselProps {
  companies: Company[];
  direction: 'left' | 'right';
  speed?: number; // in seconds
  className?: string;
}

export const InfiniteLogoCarousel = memo(function InfiniteLogoCarousel({ 
  companies, 
  direction, 
  speed = 60,
  className = ''
}: InfiniteLogoCarouselProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
  
  // Create many duplicates to ensure seamless looping with no visible resets
  const duplicatedCompanies = useMemo(() => [
    ...companies, ...companies, ...companies, 
    ...companies, ...companies, ...companies
  ], [companies]);

  const LogoItem = memo(({ company, index }: { company: Company; index: number }) => (
    <motion.div
      key={`${company.name}-${index}`}
      whileHover={{ scale: 1.1, y: -2 }}
      className="group flex-shrink-0"
    >
      <div className="relative w-20 h-14 mx-auto flex items-center justify-center">
        {isClient ? (
          <img 
            src={`https://logo.clearbit.com/${company.domain}`}
            alt={company.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'block';
              }
            }}
          />
        ) : (
          <div className={`${company.color || 'text-blue-600'} font-bold text-xs text-center leading-tight`}>
            {company.name}
          </div>
        )}
        <div className={`${company.color || 'text-blue-600'} font-bold text-xs text-center leading-tight hidden`}>
          {company.name}
        </div>
      </div>
      <span className={`block text-xs font-medium text-white mt-2 text-center group-hover:${company.hoverColor || 'text-blue-300'} transition-colors`}>
        {company.name}
      </span>
    </motion.div>
  ));

  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      <div className={animationClass}>
        <div className="flex gap-12 min-w-max">
          {duplicatedCompanies.map((company, index) => (
            <LogoItem key={`${company.name}-${index}`} company={company} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
});
