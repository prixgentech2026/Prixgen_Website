'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxProps {
  children?: ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down';
}

/**
 * Parallax Component
 * Moves its children relative to the scroll position to create a sense of depth.
 */
export function Parallax({ 
  children, 
  offset = 50, 
  className = "", 
  direction = 'up' 
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' ? [offset, -offset] : [-offset, offset]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
