/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: blob: https://img.youtube.com https://images.unsplash.com https://*.unsplash.com https://*.hubspot.com https://cdn.sanity.io https://*.sanity.io https://www.googletagmanager.com https://www.google-analytics.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hs-scripts.com https://*.hubspot.com https://*.hs-analytics.net https://*.hs-banner.com https://www.googletagmanager.com https://cdn.amplitude.com https://*.amplitude.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com https://*.hubspot.com https://*.hsforms.com; connect-src 'self' https://*.hubspot.com https://*.sanity.io https://*.api.sanity.io https://*.sanity.work https://www.google-analytics.com https://*.amplitude.com; worker-src 'self' blob:;"
          }
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/who-we-are',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/solutions/odoo-enterprise',
        destination: '/solutions/odoo',
        permanent: true,
      },
      {
        source: '/solutions/sap-ecosystems',
        destination: '/solutions/sap',
        permanent: true,
      },
      {
        source: '/services/warehouse-management',
        destination: '/services/prixgen-warehouse-management-solution',
        permanent: true,
      },
      {
        source: '/solutions/warehouse-management',
        destination: '/services/prixgen-warehouse-management-solution',
        permanent: true,
      },
      {
        source: '/industries/fmcg-distribution',
        destination: '/industries/consumer-goods-distribution',
        permanent: true,
      },
      {
        source: '/hiring-odoo-developers',
        destination: '/services/hiring-odoo-developers',
        permanent: true,
      },
      // --- New Redirects to fix Google Search errors ---
      {
        source: '/career',        // Fixing the old WordPress link
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/job-openings',   // Another common link seen in your screenshot
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/contact-us',     // Google often has this cached
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/consulting',     // Fixing the plural/singular mismatches
        destination: '/services/it-consulting',
        permanent: true,
      },
      {
        source: '/services/consulting',
        destination: '/services/it-consulting',
        permanent: true,
      },
      {
        source: '/solutions/ai-ml',
        destination: '/services/ai-machine-learning',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/industries/warehouse-industry',
        destination: '/services/prixgen-warehouse-management-solution',
        permanent: true,
      },
      {
        source: '/career/hiring-functional-consultants',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/career/we-are-hiring-web-developers',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/solutions/industrial-internet-of-things',
        destination: '/engineering-services/iiot-telemetry',
        permanent: true,
      },
      {
        source: '/industries/consumer-goods-distribution/agile-manufacturing',
        destination: '/industries/consumer-goods-distribution',
        permanent: true,
      },
      {
        source: '/industries/fmcg-distribution/agile-manufacturing',
        destination: '/industries/consumer-goods-distribution',
        permanent: true,
      },
      {
        source: '/solutions/sap/sap-s-4-hana',
        destination: '/solutions/sap',
        permanent: true,
      },
      {
        source: '/solutions/sap-ecosystems/sap-s-4-hana',
        destination: '/solutions/sap',
        permanent: true,
      },
      {
        source: '/pipe-counting',
        destination: '/solutions/image-processing',
        permanent: true,
      },
      {
        source: '/whitepaper',
        destination: '/PVC_whitepaper.pdf',
        permanent: false,
      },
      {
        source: '/white-paper',
        destination: '/PVC_whitepaper.pdf',
        permanent: false,
      }
    ];
  },
  transpilePackages: [
    'next-sanity',
    'sanity',
    '@sanity/ui',
    '@sanity/icons',
    '@sanity/insert-menu',
    '@sanity/vision',
    '@codemirror/theme-one-dark'
  ],
  compiler: {
    styledComponents: true,
  },
  experimental: {
    cpus: 1,
  },
};
export default nextConfig;
