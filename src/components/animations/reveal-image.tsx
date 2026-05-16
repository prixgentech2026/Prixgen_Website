'use client';
import { ReactNode } from 'react';

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  margin?: string;
}

/**
 * RevealImage Component (Simplified)
 * Removed clip-path animation as requested to ensure all images are visible immediately.
 */
export function RevealImage({ children, className }: RevealImageProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
