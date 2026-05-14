'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with high-performance responsive settings
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1, 
      duration: 1.2, 
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Global click listener for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash, {
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    window.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top on pathname change with a slight delay for transitions
  useEffect(() => {
    if (lenisRef.current) {
      // Small timeout to allow PageTransition to start its enter animation
      const timer = setTimeout(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
        // Force a resize/refresh to ensure Lenis has correct dimensions
        lenisRef.current?.resize();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}
