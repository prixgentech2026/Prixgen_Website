'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AmbientGlow } from '@/components/animations/ambient-glow';

export function HeroBackground() {
  return (
    <>
      {/* Ambient Glow & Grid Layer */}
      <div className="absolute inset-0 z-0">
        <AmbientGlow />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>


    </>
  );
}
