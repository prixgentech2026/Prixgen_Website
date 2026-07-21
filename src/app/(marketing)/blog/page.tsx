export const revalidate = 0;
import { Metadata } from 'next';
import { getPosts } from '@/lib/data';
import BlogClient from './blog-client';

export const metadata: Metadata = {
  title: "Insights & Blog | Prixgen",
  description: "Explore strategic insights, Industry 5.0 whitepapers, and enterprise digital transformation guides from Prixgen's senior consultants.",
  keywords: ["Industrial Intelligence", "Manufacturing Insights", "Enterprise Strategy", "Digital Transformation Blog", "Industry 5.0 Whitepapers", "Cloud"]
};

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogClient posts={posts} />;
}
