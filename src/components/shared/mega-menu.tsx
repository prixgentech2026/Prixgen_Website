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
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:text-prixgen-blue">Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] md:w-[500px] lg:w-[600px] p-4">
              <ul className="grid gap-3 md:grid-cols-2 mb-4">
                {MENU_DATA.services.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
              <div className="border-t border-prixgen-gray pt-4">
                <Link href="/services" className="text-sm font-bold text-prixgen-lightblue hover:underline flex items-center px-3">
                  Explore All Services <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:text-prixgen-blue">Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] md:w-[500px] lg:w-[600px] p-4">
              <ul className="grid gap-3 md:grid-cols-2 mb-4">
                {MENU_DATA.solutions.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
              <div className="border-t border-prixgen-gray pt-4">
                <Link href="/solutions" className="text-sm font-bold text-prixgen-lightblue hover:underline flex items-center px-3">
                  Explore All Solutions <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:text-prixgen-blue">Industries</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[400px] md:w-[500px] lg:w-[600px] p-4">
              <ul className="grid gap-3 md:grid-cols-2 mb-4">
                {MENU_DATA.industries.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
              <div className="border-t border-prixgen-gray pt-4">
                <Link href="/industries" className="text-sm font-bold text-prixgen-lightblue hover:underline flex items-center px-3">
                  Explore All Industries <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/case-studies" legacyBehavior passHref>
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue focus:bg-prixgen-gray focus:text-prixgen-blue focus:outline-none disabled:pointer-events-none disabled:opacity-50">
              Case Studies
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-prixgen-gray hover:text-prixgen-blue focus:bg-prixgen-gray focus:text-prixgen-blue",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-prixgen-dark/60 mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
