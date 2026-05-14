import { Metadata } from 'next';
import { getPosts } from '@/lib/data';
import BlogClient from './blog-client';

export const metadata: Metadata = {
  title: "Insights & Industrial Intelligence | Prixgen",
  description: "Explore strategic insights, Industry 4.0 whitepapers, and enterprise digital transformation guides from Prixgen's senior consultants.",
  keywords: ["Industrial Intelligence", "Manufacturing Insights", "Enterprise Strategy", "Digital Transformation Blog", "Industry 4.0 Whitepapers"]
};

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogClient posts={posts} />;
}
