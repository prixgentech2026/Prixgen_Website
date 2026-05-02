'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MENU_DATA } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (href: string) => {
    setOpen(false);
    // Use a small timeout to ensure the modal closing doesn't interrupt Next.js navigation
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="lg:hidden p-2" aria-label="Open Menu">
          <Menu className="h-8 w-8 text-prixgen-blue" />
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 w-full h-[100dvh] sm:max-w-none p-0 bg-white translate-x-0 translate-y-0 left-0 top-0 border-none rounded-none overflow-hidden flex flex-col">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between bg-prixgen-gray/20">
            <DialogTitle className="font-bold text-prixgen-blue text-xl">Prixgen Menu</DialogTitle>
            <DialogDescription className="sr-only">
              Navigate through Prixgen's services, solutions, and company information.
            </DialogDescription>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto p-6 space-y-8 pb-20"
            data-lenis-prevent
          >
            <Link 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}
              className="block text-2xl font-bold text-prixgen-blue pb-4 border-b border-prixgen-gray/20"
            >
              Home
            </Link>

            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-prixgen-gray/20">
                <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest">Services</h3>
                <Link 
                  href="/services" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('/services'); }} 
                  className="text-xs font-bold text-prixgen-lightblue hover:underline"
                >
                  Explore All →
                </Link>
              </div>
              <ul className="space-y-4">
                {MENU_DATA.services.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}
                      className="flex items-center justify-between text-lg font-bold text-prixgen-blue group"
                    >
                      {item.title}
                      <ChevronRight className="h-5 w-5 text-prixgen-lightblue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-prixgen-gray/20">
                <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest">Solutions</h3>
                <Link 
                  href="/solutions" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('/solutions'); }} 
                  className="text-xs font-bold text-prixgen-lightblue hover:underline"
                >
                  Explore All →
                </Link>
              </div>
              <ul className="space-y-4">
                {MENU_DATA.solutions.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}
                      className="flex items-center justify-between text-lg font-bold text-prixgen-blue"
                    >
                      {item.title}
                      <ChevronRight className="h-5 w-5 text-prixgen-lightblue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-prixgen-gray/20">
                <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest">Industries</h3>
                <Link 
                  href="/industries" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('/industries'); }} 
                  className="text-xs font-bold text-prixgen-lightblue hover:underline"
                >
                  Explore All →
                </Link>
              </div>
              <ul className="space-y-4">
                {MENU_DATA.industries.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}
                      className="flex items-center justify-between text-lg font-bold text-prixgen-blue"
                    >
                      {item.title}
                      <ChevronRight className="h-5 w-5 text-prixgen-lightblue" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-prixgen-gray">
              <Link 
                href="/who-we-are" 
                onClick={(e) => { e.preventDefault(); handleNavigate('/who-we-are'); }}
                className="block text-lg font-bold text-prixgen-blue mb-4"
              >
                Who We Are
              </Link>
              <Link 
                href="/careers" 
                onClick={(e) => { e.preventDefault(); handleNavigate('/careers'); }}
                className="block text-lg font-bold text-prixgen-blue mb-4"
              >
                Careers
              </Link>
              <Link 
                href="/contact" 
                onClick={(e) => { e.preventDefault(); handleNavigate('/contact'); }}
                className="block text-lg font-bold text-prixgen-blue mb-4"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="p-6 border-t bg-prixgen-gray/10">
            <Button className="w-full h-14 text-lg shadow-xl">Get Started</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
