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
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
