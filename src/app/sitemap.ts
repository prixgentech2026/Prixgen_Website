import { MetadataRoute } from 'next';
import { industriesData, solutionsData, servicesData } from '@/lib/data';

/**
 * Dynamic sitemap generator.
 * Refactored to use Local Mock Data for CMS-independent builds.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com';

  const solutions = solutionsData.map((node) => ({
    url: `${baseUrl}/solutions/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const industries = industriesData.map((node) => ({
    url: `${baseUrl}/industries/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const services = servicesData.map((node) => ({
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
