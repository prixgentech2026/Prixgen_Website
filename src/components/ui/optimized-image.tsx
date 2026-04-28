import Image, { ImageProps } from 'next/image';

/**
 * Optimized Image component wrapper for Next.js Image.
 * Automatically sets sizes for better performance.
 */
export function OptimizedImage({ alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      {...props}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover ${props.className || ''}`}
    />
  );
}
