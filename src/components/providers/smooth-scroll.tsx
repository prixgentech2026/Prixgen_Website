'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global Smooth Scroll Provider using Lenis.
 * Architected for high-fidelity, inertial scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with optimal enterprise easing
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      duration: 0.8,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
