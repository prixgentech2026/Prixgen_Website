/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    formats: ['image/avif', 'image/webp'],
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
            value: "default-src 'self'; img-src 'self' data: https://img.youtube.com https://images.unsplash.com https://*.hubspot.com https://cdn.sanity.io; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.hs-scripts.com https://*.hubspot.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://www.youtube.com; connect-src 'self' https://registry.npmjs.org https://*.hubspot.com https://*.sanity.io https://*.sanity.api;" 
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
    ];
  },
  transpilePackages: ['next-sanity', 'sanity'],
};
export default nextConfig;
