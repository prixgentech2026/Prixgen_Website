export const revalidate = 0;
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/data';
import PostClient from './post-client';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: "Post Not Found | Prixgen" };

  return {
    title: `${post.title} | Prixgen Insights`,
    description: post.excerpt || `Read our latest insight on ${post.title}`,
    keywords: [...(post.seo?.keywords || []), ...(post.categories?.map(c => c.title) || [])],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return <PostClient post={post} relatedPosts={relatedPosts} />;
}
