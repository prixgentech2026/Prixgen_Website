'use client';
import { motion } from 'framer-motion';

/**
 * AmbientGlow Component
 * Creates a layered, atmospheric background with drifting blurred orbs.
 * Designed to be placed as the first child of a relative container.
 */
export function AmbientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-prixgen-blue/10 rounded-full mix-blend-multiply filter blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -100, 100, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-prixgen-lightblue/10 rounded-full mix-blend-multiply filter blur-[150px]"
      />
    </div>
  );
}
