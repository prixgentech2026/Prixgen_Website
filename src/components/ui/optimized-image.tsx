'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  wrapperClassName?: string;
}

export function OptimizedImage({ wrapperClassName, className, alt, ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-prixgen-gray/5", wrapperClassName)}>
      <motion.div
        initial={{ opacity: props.priority ? 1 : 0.1, scale: 1.02 }}
        animate={{ 
          opacity: 1, 
          scale: 1 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Image
          {...props}
          alt={alt || "Prixgen Enterprise"}
          onLoad={() => setIsLoaded(true)}
          className={cn("object-cover", className)}
          sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </motion.div>
    </div>
  );
}
