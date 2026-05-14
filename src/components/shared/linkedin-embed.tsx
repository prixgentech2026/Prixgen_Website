'use client';

import React from 'react';

interface LinkedInEmbedProps {
  url: string;
}

export function LinkedInEmbed({ url }: LinkedInEmbedProps) {
  // Extract the numeric activity ID from the LinkedIn URL
  // Example formats:
  // https://www.linkedin.com/posts/activity-7195415705332514816-uvmE
  // https://www.linkedin.com/feed/update/urn:li:activity:7195415705332514816
  const extractId = (url: string) => {
    const activityMatch = url.match(/activity-(\d+)/);
    if (activityMatch) return activityMatch[1];
    
    const urnMatch = url.match(/activity:(\d+)/);
    if (urnMatch) return urnMatch[1];

    const shareMatch = url.match(/share:(\d+)/);
    if (shareMatch) return shareMatch[1];
    
    // Fallback for some other common formats
    const genericMatch = url.match(/-(\d+)/);
    if (genericMatch) return genericMatch[1];

    return null;
  };

  const postId = extractId(url);

  if (!postId) {
    return (
      <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
        <p className="text-slate-500 font-medium italic">Invalid LinkedIn URL provided.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-slate-100 flex justify-center">
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${postId}`}
        height="800"
        width="100%"
        frameBorder="0"
        allowFullScreen={true}
        title="Embedded LinkedIn Post"
        className="max-w-full"
      />
    </div>
  );
}
