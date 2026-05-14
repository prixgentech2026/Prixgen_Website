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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{ 
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.8,
        },
        opacity: { duration: 0.8, delay },
        default: { ease: [0.16, 1, 0.3, 1] }
      }}
      viewport={{ margin: "-50px", once: false }}
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
