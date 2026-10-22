import React, { useState, useEffect } from 'react';

interface PromptizLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
}

export const PromptizLogo: React.FC<PromptizLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedLogo = localStorage.getItem('promptiz_custom_logo');
    if (savedLogo) {
      setCustomLogoUrl(savedLogo);
    }

    const handleLogoChange = () => {
      setCustomLogoUrl(localStorage.getItem('promptiz_custom_logo'));
    };

    window.addEventListener('promptiz_logo_updated', handleLogoChange);
    return () => window.removeEventListener('promptiz_logo_updated', handleLogoChange);
  }, []);

  const sizeDimensions = {
    sm: { icon: 'w-6 h-6', text: 'text-sm tracking-[0.25em]' },
    md: { icon: 'w-8 h-8', text: 'text-base tracking-[0.25em]' },
    lg: { icon: 'w-11 h-11', text: 'text-xl tracking-[0.3em]' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl tracking-[0.35em]' },
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {customLogoUrl ? (
        <div
          className={`${sizeDimensions[size].icon} rounded-lg overflow-hidden border border-current/20 bg-current/5 flex items-center justify-center p-0.5 shadow-sm`}
        >
          <img
            src={customLogoUrl}
            alt="PROMPTIZ Logo"
            className="w-full h-full object-contain filter grayscale contrast-125"
          />
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          {/* Animated orbital aura ring near logo */}
          <div className="absolute -inset-1.5 rounded-xl border border-dashed border-current/20 animate-logo-spin pointer-events-none opacity-60" />
          <div className="absolute -inset-2.5 rounded-full border border-dotted border-current/10 animate-logo-reverse pointer-events-none opacity-40" />

          <div
            className={`${sizeDimensions[size].icon} relative flex items-center justify-center rounded-lg border border-current/20 bg-current/5 p-1.5 shadow-sm group transition-all duration-300 animate-logo-breath hover:border-current/40`}
          >
            {/* The User's Architectural Geometric 'P' Monogram */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-current transition-transform duration-300 group-hover:scale-105 p-0.5"
            >
              <path
                d="M 38 18 L 50 18 L 50 68 L 38 80 L 26 80 L 26 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
              />
              <path
                d="M 50 18 L 62 18 L 74 30 L 74 50 L 62 62 L 50 62 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
              />
            </svg>
          </div>
        </div>
      )}

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold uppercase font-sans text-current ${sizeDimensions[size].text}`}
            >
              PROMPTIZ
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 border border-current/20 px-1 py-0.2 rounded">
              AI
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.22em] opacity-60 font-medium">
            Senior Prompt Architecture
          </span>
        </div>
      )}
    </div>
  );
};
