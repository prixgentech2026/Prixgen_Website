'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'default' | 'light';
}

/**
 * Clean version of the Prixgen Logo with just the stylized text and tagline.
 * Removes the arc/aura as requested.
 */
export function Logo({ className, showTagline = true, variant = 'default' }: LogoProps) {
  const isLight = variant === 'light';
  const blueColor = isLight ? "#FFFFFF" : "#004B87";
  const greenColor = "#43913A";

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <svg
        viewBox="0 0 200 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Text Section - Positioned at top now since arc is gone */}
        <g id="LogoText" transform="translate(5, 45)">
          {/* ... (existing text paths) ... */}
          <text
            x="0"
            y="0"
            fill={blueColor}
            style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'Inter, sans-serif' }}
          >
            Pri
          </text>
          
          <text
            x="58"
            y="0"
            fill={greenColor}
            style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'Inter, sans-serif' }}
          >
            x
          </text>
          
          <text
            x="82"
            y="0"
            fill={blueColor}
            style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'Inter, sans-serif' }}
          >
            gen
          </text>
        </g>

        {/* Tagline - Increased vertical padding (from 68 to 72) */}
        {showTagline && (
          <g id="LogoTagline" transform="translate(90, 72)">
            <text
              x="0"
              y="0"
              fill={greenColor}
              style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
            >
              Exploring
            </text>
            <text
              x="52"
              y="0"
              fill={blueColor}
              style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
            >
              Innovation
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
