'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingProps {
  children: ReactNode;
  duration?: number;
  y?: number;
  x?: number;
  rotate?: number;
  className?: string;
  delay?: number;
}

/**
 * Floating Component
 * Creates a persistent, subtle drifting motion for decorative elements.
 */
export function Floating({ 
  children, 
  duration = 4, 
  y = 10, 
  x = 5, 
  rotate = 2,
  className = "",
  delay = 0
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -y, 0],
        x: [0, x, 0],
        rotate: [0, rotate, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
