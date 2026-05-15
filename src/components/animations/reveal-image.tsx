'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealImageProps {
  children: ReactNode;
  className?: string;
}

/**
 * RevealImage Component
 * Creates a premium clip-path reveal animation when the image enters the viewport.
 */
export function RevealImage({ children, className }: RevealImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
