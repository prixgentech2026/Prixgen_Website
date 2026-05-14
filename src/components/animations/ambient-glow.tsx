'use client';
import { motion } from 'framer-motion';

/**
 * AmbientGlow Component
 * Creates a layered, atmospheric background with drifting blurred orbs.
 * Opacity and blend mode optimized for high visibility of overlaying text.
 */
export function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-prixgen-blue/15 rounded-full filter blur-[120px]"
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      />
      <motion.div
        animate={{
          x: [0, -50, 50, 0],
          y: [0, -30, 30, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-prixgen-lightblue/10 rounded-full filter blur-[150px]"
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      />
    </div>
  );
}
