'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedConnectorProps {
  className?: string;
  duration?: number;
  delay?: number;
  height?: string;
  color?: string;
}

export function AnimatedConnector({ 
  className, 
  duration = 2.5, 
  delay = 0,
  height = "h-24",
  color = "bg-prixgen-lightblue"
}: AnimatedConnectorProps) {
  return (
    <div className={cn("relative w-full flex justify-center z-20", height, className)}>
      <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-prixgen-blue/50 to-transparent relative overflow-hidden">
        <motion.div 
          className={cn("absolute top-0 left-0 w-full h-1/3 shadow-[0_0_20px_#00A3E0] blur-[1px]", color)}
          initial={{ y: "-100%" }}
          animate={{ y: ['-100%', '500%'] }}
          transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        />
      </div>
    </div>
  );
}
