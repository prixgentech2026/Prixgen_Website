'use client';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggerTextProps {
  text: string;
  className?: string;
  variant?: 'default' | 'gradient';
  mode?: 'dark' | 'light'; // dark for white bg, light for dark/blue bg
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

/**
 * Premium StaggerText with absolute visibility.
 * Uses solid high-contrast colors to ensure legibility across all displays.
 */
export function StaggerText({ 
  text, 
  className, 
  variant = 'default', 
  mode = 'dark',
  as: Component = 'h1'
}: StaggerTextProps) {
  const words = text.split(" ");
  
  const MotionComponent = motion[Component as keyof typeof motion] as any;
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  // mode="dark" -> for WHITE background -> needs DARK text (Prixgen Blue)
  // mode="light" -> for BLUE background -> needs WHITE text
  const colorClass = mode === 'dark' ? "text-prixgen-blue" : "text-white";

  return (
    <MotionComponent 
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
    </MotionComponent>
  );
}
