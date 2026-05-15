'use client';

import Link from 'next/link';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { MegaMenu } from '@/components/shared/mega-menu';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Magnetic } from '@/components/animations/magnetic';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo className="w-32 md:w-40" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 mr-auto ml-8">
          <Magnetic>
            <Link href="/" className="text-sm font-bold uppercase tracking-wider hover:text-prixgen-lightblue transition-colors whitespace-nowrap">Home</Link>
          </Magnetic>
          <MegaMenu />
        </nav>

        <div className="flex items-center gap-4">
          <Magnetic>
            <Button className="hidden sm:flex shadow-lg shadow-prixgen-blue/20 bg-prixgen-blue hover:bg-prixgen-dark" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </Magnetic>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

