'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroBadgeProps {
  text: string;
  className?: string;
  align?: 'left' | 'center';
}

export function HeroBadge({ text, className, align = 'center' }: HeroBadgeProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 mb-8",
      align === 'center' ? "justify-center" : "justify-start",
      className
    )}>
      <div className="h-[2px] w-12 bg-prixgen-blue/10 relative overflow-hidden rounded-full">
        <motion.div 
          className="absolute inset-y-0 left-0 w-1/2 bg-prixgen-lightblue"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px] flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-lightblue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-prixgen-blue"></span>
        </span>
        {text}
      </span>
      {align === 'center' && (
        <div className="h-[2px] w-12 bg-prixgen-blue/10 relative overflow-hidden rounded-full transform rotate-180">
          <motion.div 
            className="absolute inset-y-0 left-0 w-1/2 bg-prixgen-lightblue"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
