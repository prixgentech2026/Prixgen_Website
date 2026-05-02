'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Enhanced FadeUp with high-fidelity blur and scale physics.
 * Travel distance increased to 80px for a more dramatic entrance.
 */
export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, filter: 'blur(10px)', scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={cn(className)}
      style={{ 
        willChange: 'opacity, transform', 
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden' 
      }}
    >
      {children}
    </motion.div>
  );
}
