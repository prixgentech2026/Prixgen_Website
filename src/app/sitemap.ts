import { MetadataRoute } from 'next';
import { wpFetch } from '@/lib/graphql/client';

/**
 * Dynamic sitemap generator.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.prixgen.com';

  // Fetch all solutions and industries slugs
  const data = await wpFetch<any>(`
    query GetAllSlugs {
      solutions(first: 100) {
        nodes {
          uri
          modified
        }
      }
      industries(first: 100) {
        nodes {
          uri
          modified
        }
      }
    }
  `);

  const solutions = data.solutions?.nodes.map((node: any) => ({
    url: `${baseUrl}${node.uri}`,
    lastModified: new Date(node.modified),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];

  const industries = data.industries?.nodes.map((node: any) => ({
    url: `${baseUrl}${node.uri}`,
    lastModified: new Date(node.modified),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...solutions,
    ...industries,
  ];
}
