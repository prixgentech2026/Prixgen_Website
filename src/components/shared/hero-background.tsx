'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AmbientGlow } from '@/components/animations/ambient-glow';

export function HeroBackground() {
  return (
    <>
      {/* Ambient Glow & Grid Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Subtle static gradient instead of moving circles */}
        <div className="absolute inset-0 bg-gradient-to-tr from-prixgen-blue/[0.02] via-transparent to-prixgen-lightblue/[0.02]" />
      </div>


    </>
  );
}
