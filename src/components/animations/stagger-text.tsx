'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggerTextProps {
  text: string;
  className?: string;
  variant?: 'default' | 'gradient';
  mode?: 'dark' | 'light'; // dark for white bg, light for dark/blue bg
}

/**
 * Premium StaggerText with high-visibility modes and gradient support.
 * Mode 'dark' (default): Best for white/light backgrounds.
 * Mode 'light': Best for blue/dark backgrounds (White/Silver Gradient).
 */
export function StaggerText({ 
  text, 
  className, 
  variant = 'default', 
  mode = 'dark' 
}: StaggerTextProps) {
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

  // Determine colors based on mode
  const baseColor = mode === 'dark' ? "text-prixgen-blue" : "text-white";
  const gradientColors = mode === 'dark' 
    ? "from-prixgen-blue to-prixgen-lightblue" 
    : "from-white to-white/60";

  const gradientClass = variant === 'gradient' 
    ? `bg-clip-text text-transparent bg-gradient-to-r ${gradientColors}` 
    : "";

  return (
    <motion.h1 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={cn(className, baseColor, gradientClass)}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
