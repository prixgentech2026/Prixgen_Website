'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * RevealText Component
 * Animates text lines or blocks with a premium mask-reveal effect.
 */
export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
