'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggerTextProps {
  text: string;
  className?: string;
  variant?: 'default' | 'gradient';
}

/**
 * Premium StaggerText with support for brand gradients and blur entry.
 * Optimized for visibility with fallback colors.
 */
export function StaggerText({ text, className, variant = 'default' }: StaggerTextProps) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Base class ensures visibility. Gradient class adds the effect.
  const baseClass = "text-prixgen-blue";
  const gradientClass = variant === 'gradient' 
    ? "bg-clip-text text-transparent bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue" 
    : "";

  return (
    <motion.h1 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={cn(className, baseClass, gradientClass)}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
