import { MetadataRoute } from 'next';
import { 
  getIndustries, 
  getSolutions, 
  getServices, 
  getEngineeringServices, 
  getPosts 
} from '@/lib/data';

/**
 * Dynamic sitemap generator.
 * Fetches real slugs from Sanity to generate the SEO sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com';

  const [
    industriesData, 
    solutionsData, 
    servicesData, 
    engineeringServicesData, 
    postsData
  ] = await Promise.all([
    getIndustries(),
    getSolutions(),
    getServices(),
    getEngineeringServices(),
    getPosts()
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

  const engineeringServices = (engineeringServicesData || []).filter(Boolean).map((node: any) => ({
    url: `${baseUrl}/engineering-services/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPosts = (postsData || []).filter(Boolean).map((node: any) => ({
    url: `${baseUrl}/blog/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/engineering-services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [
    ...staticPages,
    ...solutions,
    ...industries,
    ...services,
    ...engineeringServices,
    ...blogPosts,
  ];
}
