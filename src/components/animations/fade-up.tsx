'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

/**
 * Optimized FadeUp animation.
 * Removed continuous floating effect to prioritize scroll performance.
 */
export function FadeUp({ 
  children, 
  className, 
  delay = 0,
  duration = 0.8,
  y = 30,
  once = true
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(className)}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

