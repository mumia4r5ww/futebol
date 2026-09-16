import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface DirectImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export const DirectImage: React.FC<DirectImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-contain',
  fallbackText
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center bg-[#272a32] text-[#bbcabf] rounded-lg text-xs font-semibold select-none p-1"
        title={alt}
      >
        <Shield className="w-4 h-4 text-[#4edea3] mb-0.5" />
        <span className="truncate max-w-[90%] text-[10px] uppercase font-bold text-center">
          {fallbackText || alt.slice(0, 3)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 bg-[#272a32] rounded animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
      />
    </div>
  );
};
