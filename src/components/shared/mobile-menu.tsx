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
              Navigate through Prixgen&apos;s services, solutions, and company information.
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

            <Link 
              href="/who-we-are" 
              onClick={(e) => { e.preventDefault(); handleNavigate('/who-we-are'); }}
              className="block text-2xl font-bold text-prixgen-blue pb-4 border-b border-prixgen-gray/20"
            >
              Who We Are
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
                      className="flex items-center justify-between text-lg font-bold text-prixgen-blue group"
                    >
                      {item.title}
                      <ChevronRight className="h-5 w-5 text-prixgen-lightblue group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {item.subItems && (
                      <ul className="mt-3 ml-2 pl-4 border-l-2 border-prixgen-lightblue/30 space-y-3">
                        {item.subItems.map((sub) => (
                          <li key={sub.title}>
                            <Link 
                              href={sub.href} 
                              onClick={(e) => { e.preventDefault(); handleNavigate(sub.href); }}
                              className="text-base font-medium text-prixgen-blue/80 hover:text-prixgen-blue block w-full"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-prixgen-gray/20">
                <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest">Engineering Services</h3>
                <Link 
                  href="/engineering-services" 
                  onClick={(e) => { e.preventDefault(); handleNavigate('/engineering-services'); }} 
                  className="text-xs font-bold text-prixgen-lightblue hover:underline"
                >
                  Architecture →
                </Link>
              </div>
              <ul className="space-y-4">
                {MENU_DATA.engineering_services.map((item) => (
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
              <h3 className="text-xs font-bold text-prixgen-dark/40 uppercase tracking-widest mb-6">Resources</h3>
              <ul className="space-y-6">
                {MENU_DATA.resources.map((item) => {
                  const isPdf = item.href.endsWith('.pdf');
                  return (
                    <li key={item.title}>
                      <Link 
                        href={item.href} 
                        target={isPdf ? "_blank" : undefined}
                        rel={isPdf ? "noopener noreferrer" : undefined}
                        onClick={(e) => { 
                          if (!isPdf) {
                            e.preventDefault(); 
                            handleNavigate(item.href); 
                          } else {
                            setOpen(false);
                          }
                        }}
                        className="group block"
                      >
                        <div className="flex items-center justify-between text-2xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors">
                          <div className="flex items-center gap-2">
                            <span>{item.title}</span>
                            {isPdf && (
                              <span className="text-[10px] font-black uppercase tracking-wider bg-prixgen-blue/10 text-prixgen-blue px-2 py-0.5 rounded">
                                PDF
                              </span>
                            )}
                          </div>
                          <ChevronRight className="h-6 w-6 text-prixgen-lightblue" />
                        </div>
                        <p className="text-sm text-prixgen-dark/50 mt-1 font-medium">{item.description}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
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
