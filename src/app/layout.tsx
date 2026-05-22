import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    (() => {
      let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com';
      if (!baseUrl || baseUrl.includes('vercel.app') || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
        baseUrl = 'https://www.prixgen.com';
      }
      if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
      }
      return baseUrl;
    })()
  ),
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
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
};

/**
 * Root Layout component.
 * This is now a barebones wrapper. The main site layout is in (marketing)/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
