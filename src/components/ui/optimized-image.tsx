'use client';
import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  wrapperClassName?: string;
  fallbackSrc?: string;
}

/**
 * Hardened OptimizedImage component
 * Features:
 * 1. Robust loading states with transitions
 * 2. Error handling with fallback support
 * 3. Priority loading optimization
 * 4. Automatic alt text safety
 */
export function OptimizedImage({ 
  wrapperClassName, 
  className, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(props.src);

  // Sync state if src changes
  useEffect(() => {
    setImgSrc(props.src);
    setError(false);
    setIsLoaded(false);
  }, [props.src]);

  if (!imgSrc || imgSrc === '') {
    return (
      <div className={cn("relative w-full h-full bg-slate-100 flex items-center justify-center", wrapperClassName)}>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Missing Asset</span>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-slate-50/50", wrapperClassName)}>
      {/* Loading Shimmer */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 z-10 bg-slate-100 animate-pulse" />
      )}

      {/* Error Fallback UI */}
      {error && (
        <div className="absolute inset-0 z-20 bg-slate-50 flex items-center justify-center flex-col gap-2 p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">!</div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Failed to load resource</span>
        </div>
      )}

      <Image
        {...props}
        src={imgSrc}
        alt={alt || "Prixgen Enterprise Architecture"}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          console.error(`Image load failed: ${imgSrc}`);
          if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          } else {
            setError(true);
          }
        }}
        className={cn(
          "transition-all duration-1000 ease-in-out",
          !isLoaded ? "opacity-0 scale-105 blur-md" : "opacity-100 scale-100 blur-0",
          className
        )}
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
    </div>
  );
}
