import { MetadataRoute } from 'next';
import { getIndustries, getSolutions, getServices } from '@/lib/data';

/**
 * Dynamic sitemap generator.
 * Fetches real slugs from Sanity to generate the SEO sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com';

  const [industriesData, solutionsData, servicesData] = await Promise.all([
    getIndustries(),
    getSolutions(),
    getServices()
  ]);

  const solutions = solutionsData.map((node: any) => ({
    url: `${baseUrl}/solutions/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const industries = industriesData.map((node: any) => ({
    url: `${baseUrl}/industries/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const services = servicesData.map((node: any) => ({
    url: `${baseUrl}/services/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [
    ...staticPages,
    ...solutions,
    ...industries,
    ...services,
  ];
}
