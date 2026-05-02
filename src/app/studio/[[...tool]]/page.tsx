'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  const [mounted, set_mounted] = useState(false);

  useEffect(() => {
    set_mounted(true);
  }, []);

  if (!mounted) return null;

  return <NextStudio config={config} />;
}
