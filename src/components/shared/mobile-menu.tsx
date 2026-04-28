'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MENU_DATA } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../ui/dialog';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="lg:hidden p-2" aria-label="Open Menu">
          <Menu className="h-8 w-8 text-prixgen-blue" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full sm:max-w-none p-0 bg-white">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between bg-prixgen-gray/20">
            <span className="font-bold text-prixgen-blue text-xl">Prixgen Menu</span>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest mb-4">Services</h3>
              <ul className="space-y-4">
                {MENU_DATA.services.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      onClick={() => setOpen(false)}
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
              <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest mb-4">Solutions</h3>
              <ul className="space-y-4">
                {MENU_DATA.solutions.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      onClick={() => setOpen(false)}
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
              <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest mb-4">Industries</h3>
              <ul className="space-y-4">
                {MENU_DATA.industries.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      onClick={() => setOpen(false)}
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
                href="/about-us" 
                onClick={() => setOpen(false)}
                className="block text-lg font-bold text-prixgen-blue mb-4"
              >
                Who We Are
              </Link>
              <Link 
                href="/careers" 
                onClick={() => setOpen(false)}
                className="block text-lg font-bold text-prixgen-blue mb-4"
              >
                Careers
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setOpen(false)}
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
