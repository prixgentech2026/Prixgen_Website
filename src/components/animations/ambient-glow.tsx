'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * AmbientGlow Component
 * Creates a layered, atmospheric background with drifting blurred orbs.
 * Opacity and blend mode optimized for high visibility of overlaying text.
 */
export function AmbientGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        style={{ 
          y: y1, 
          x: x1,
          willChange: 'transform, opacity', 
          transform: 'translateZ(0)' 
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-prixgen-blue/15 rounded-full filter blur-[120px]"
      />
      <motion.div
        style={{ 
          y: y2, 
          x: x2,
          willChange: 'transform, opacity', 
          transform: 'translateZ(0)' 
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-prixgen-lightblue/10 rounded-full filter blur-[150px]"
      />
    </div>
  );
}
