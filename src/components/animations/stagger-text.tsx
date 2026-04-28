'use client';
import { motion } from 'framer-motion';

export function StaggerText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.h1 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={className}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
