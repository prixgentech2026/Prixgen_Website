'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { MegaMenu } from '@/components/shared/mega-menu';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

/**
 * Global Header component.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-prixgen-blue rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-2xl font-bold text-prixgen-blue hidden sm:block tracking-tight">Prixgen</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 mr-auto ml-12">
          <Link href="/" className="text-sm font-medium hover:text-prixgen-lightblue transition-colors">Home</Link>
          <MegaMenu />
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden sm:flex shadow-lg hover:scale-105 transition-transform" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
