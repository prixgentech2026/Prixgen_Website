import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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
    default: 'Prixgen | Odoo, SAP, Software Consulting, Managed Cloud & AI/ML',
  },
  description: 'Enterprise IT consulting specializing in Odoo, SAP, software consulting, managed cloud, and AI/ML solutions for manufacturing and FMCG.',
  keywords: [
    "Odoo Gold Partner",
    "SAP Implementation",
    "Enterprise ERP",
    "Industrial IoT",
    "Supply Chain Digital Transformation",
    "Software Consulting",
    "Managed Cloud",
    "AI & ML"
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.prixgen.com',
    siteName: 'Prixgen Enterprise',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Prixgen - Odoo Gold Partner & Enterprise IT Solutions',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero.png'],
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/icon.png',
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
  verification: {
    google: 'h1i3ADOSlBxDHfbv-6vQy68uPn9k8ZT1RGeRF4XkSc4',
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
      <body className="overflow-x-hidden" suppressHydrationWarning>
        {/* Google Analytics - Placed globally, immediately after the head element */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JP6M0LYK27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JP6M0LYK27');
          `}
        </Script>
        {children}

        <Script id="apollo-visitor-tracking" strategy="afterInteractive">
          {`
            function initApollo(){
              var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"6a473c70ceb7ee0014ef694c"})},
              document.head.appendChild(o)
            }
            initApollo();
          `}
        </Script>

        {/* Amplitude Analytics */}
        <Script id="amplitude-analytics" strategy="afterInteractive">
          {`
            (function() {
              var s = document.createElement('script');
              s.src = 'https://cdn.amplitude.com/script/3fe5d101a65855246c115a5a77d13be1.js';
              s.async = true;
              s.onload = function() {
                if (window.amplitude && window.sessionReplay) {
                  window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
                  window.amplitude.init('3fe5d101a65855246c115a5a77d13be1', {"fetchRemoteConfig":true,"autocapture":true});
                }
              };
              document.head.appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
