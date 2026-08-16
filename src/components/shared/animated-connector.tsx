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
  return null;
}
