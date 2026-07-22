import React from 'react';
import Script from 'next/script';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { SmoothScroll } from '@/components/providers/smooth-scroll';

import { PageTransition } from '@/components/providers/page-transition';
import { PageLoader } from '@/components/shared/page-loader';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased bg-white text-prixgen-dark min-h-screen flex flex-col">
      {/* <PageLoader /> */}
      <SmoothScroll>
        <Header />

        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer />
      </SmoothScroll>
      {/* HubSpot Tracking Script - Only active when actual ID is provided */}
      {/* 
      <Script
        src="https://js.hs-scripts.com/YOUR_HUBSPOT_ID.js"
        strategy="lazyOnload"
      />
      */}
    </div>
  );
}
