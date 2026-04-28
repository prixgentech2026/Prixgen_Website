import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com'),
  title: {
    template: '%s | Prixgen Enterprise',
    default: 'Prixgen | ERP Implementation Experts',
  },
  description: 'Enterprise IT consulting and ERP implementation for manufacturing and FMCG.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.prixgen.com',
    siteName: 'Prixgen Enterprise',
  },
};

import { SmoothScroll } from '@/components/providers/smooth-scroll';

/**
 * Root Layout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-prixgen-dark min-h-screen flex flex-col">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        {/* HubSpot Tracking Script */}
        <Script
          src="https://js.hs-scripts.com/YOUR_HUBSPOT_ID.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
