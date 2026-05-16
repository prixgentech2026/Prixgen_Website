'use client';

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { MENU_DATA } from "@/lib/constants";

/**
 * MegaMenu component using Radix UI Navigation Menu.
 */
export function MegaMenu() {
  return (
    <ul className="flex items-center gap-1">
      {/* Who We Are - Simple Link */}
      <li>
        <Link href="/who-we-are" className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue">
          Who We Are
        </Link>
      </li>

      {/* Services - Dropdown */}
      <li className="relative group/menu flex items-center">
        <button className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue">
          Services
          <ChevronIcon />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50">
          <div className="w-[600px] p-6 bg-white rounded-xl shadow-2xl border border-slate-100">
            <ul className="grid gap-3 grid-cols-2 mb-4">
              {MENU_DATA.services.map((item) => (
                <li key={item.title}>
                  <ListItem title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-100 pt-4">
              <Link href="/services" className="text-sm font-bold text-prixgen-lightblue hover:underline flex items-center px-3">
                Explore All Services <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </li>

      {/* Industries - Dropdown */}
      <li className="relative group/menu flex items-center">
        <button className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue">
          Industries
          <ChevronIcon />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50">
          <div className="w-[600px] p-6 bg-white rounded-xl shadow-2xl border border-slate-100">
            <ul className="grid gap-3 grid-cols-2 mb-4">
              {MENU_DATA.industries.map((item) => (
                <li key={item.title}>
                  <ListItem title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-100 pt-4">
              <Link href="/industries" className="text-sm font-bold text-prixgen-lightblue hover:underline flex items-center px-3">
                Explore All Industries <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </li>

      {/* Solutions - Nested Dropdown */}
      <li className="relative group/menu flex items-center">
        <button className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue">
          Solutions
          <ChevronIcon />
        </button>
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50">
          <div className="w-[350px] p-4 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-visible">
            <ul className="flex flex-col gap-1">
              {MENU_DATA.solutions.map((item) => (
                <li key={item.title} className="relative group/sol-item">
                  <ListItem title={item.title} href={item.href} className="pr-10">
                    <div className="flex items-center justify-between">
                      <span>{item.description}</span>
                      {item.subItems && (
                        <svg 
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover/sol-item:text-prixgen-blue transition-colors" 
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      )}
                    </div>
                  </ListItem>

                  {item.subItems && (
                    <div className="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/sol-item:opacity-100 group-hover/sol-item:visible transition-all duration-200 z-50">
                      <div className="w-[220px] bg-white rounded-xl shadow-2xl border border-slate-100 py-2">
                        <ul className="flex flex-col">
                          {item.subItems.map((sub) => (
                            <li key={sub.title}>
                              <Link 
                                href={sub.href}
                                className="block px-6 py-3 text-sm font-bold text-slate-600 hover:text-prixgen-blue hover:bg-slate-50 border-b border-slate-50 last:border-0"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t border-slate-100 pt-3 px-3">
              <Link href="/solutions" className="text-xs font-black text-prixgen-lightblue hover:underline uppercase tracking-widest">
                All Solutions <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </li>

      {/* Engineering - Dropdown */}
      <li className="relative group/menu flex items-center">
        <button className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue">
          Engineering
          <ChevronIcon />
        </button>
        <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50">
          <div className="w-[600px] p-6 bg-white rounded-xl shadow-2xl border border-slate-100">
            <ul className="grid gap-3 grid-cols-2 mb-4">
              {MENU_DATA.engineering_services.map((item) => (
                <li key={item.title}>
                  <ListItem title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-100 pt-4">
              <Link href="/engineering-services" className="text-sm font-bold text-prixgen-lightblue hover:underline flex items-center px-3">
                Industrial Architecture <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </li>

      {/* Resources - Dropdown */}
      <li className="relative group/more flex items-center">
        <button className="group/more inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue focus:bg-prixgen-gray focus:text-prixgen-blue focus:outline-none">
          Resources
          <ChevronIcon />
        </button>
        <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-200 z-50">
          <div className="w-[300px] p-4 bg-white rounded-xl shadow-2xl border border-slate-100">
            <ul className="flex flex-col gap-1">
              {MENU_DATA.resources.map((item) => (
                <li key={item.title}>
                  <ListItem title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </ul>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover/menu:rotate-180 group-hover/more:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

interface ListItemProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  ListItemProps
>(({ className, title, children, href = "#", ...props }, ref) => {
  return (
    <Link
      href={href}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue",
        className
      )}
      {...props}
    >
      <div className="text-sm font-bold leading-none">{title}</div>
      <div className="line-clamp-2 text-sm leading-snug text-prixgen-dark/60 mt-1">
        {children}
      </div>
    </Link>
  );
});
ListItem.displayName = "ListItem";
