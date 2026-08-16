'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<any>(null);

  // Sync scroll to top on pathname change
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      options={{ 
        duration: 1.0,
        lerp: 0.12, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children as any}
    </ReactLenis>

  );
}

