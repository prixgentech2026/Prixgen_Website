import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com';

  // Force production domain if NEXT_PUBLIC_SITE_URL is not set, set to local, or pointing to Vercel/Netlify preview domains
  if (!baseUrl || baseUrl.includes('vercel.app') || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    baseUrl = 'https://www.prixgen.com';
  }

  // Remove trailing slash if present to avoid double slashes like https://www.prixgen.com//sitemap.xml
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
