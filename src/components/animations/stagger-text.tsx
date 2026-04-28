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
 * Premium StaggerText with absolute visibility.
 * Uses solid high-contrast colors to ensure legibility across all displays.
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
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // mode="dark" -> for WHITE background -> needs DARK text (Prixgen Blue)
  // mode="light" -> for BLUE background -> needs WHITE text
  const colorClass = mode === 'dark' ? "text-prixgen-blue" : "text-white";

  return (
    <motion.h1 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={cn(className, colorClass, "font-extrabold")}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-[0.25em] whitespace-nowrap">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
