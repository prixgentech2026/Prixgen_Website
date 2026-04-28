'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Play } from 'lucide-react';

/**
 * Video facade component to avoid heavy iframe loading on initial page load.
 */
export function VideoFacade({ videoId, title }: { videoId: string; title: string }) {
  const [showVideo, setShowVideo] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (showVideo) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video w-full rounded-xl overflow-hidden shadow-xl group cursor-pointer"
      onClick={() => setShowVideo(true)}
    >
      <OptimizedImage
        src={thumbnailUrl}
        alt={title}
        fill
        className="group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-prixgen-blue/20 group-hover:bg-prixgen-blue/10 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
          <Play className="w-10 h-10 text-prixgen-blue fill-current ml-1" />
        </div>
      </div>
      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-sm font-medium uppercase tracking-widest opacity-80 mb-1">Watch Video</p>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
}
