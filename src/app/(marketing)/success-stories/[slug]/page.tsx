export const revalidate = 0;
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSuccessStoryBySlug, getSuccessStories } from '@/lib/data';
import SuccessStoryClient from './success-story-client';

interface SuccessStoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SuccessStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);
  
  if (!story) return { title: "Success Story Not Found | Prixgen" };

  return {
    title: story.seo?.title || `${story.title} | Prixgen Success Story`,
    description: story.seo?.metaDesc || story.subtitle || `Read how Prixgen engineered solutions to drive operations value.`,
    keywords: story.seo?.keywords || ["Enterprise Case Study", "Industrial Success Story"],
  };
}

export default async function SuccessStoryPage({ params }: SuccessStoryPageProps) {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const allStories = await getSuccessStories();
  const relatedStories = allStories.filter(s => s.slug !== story.slug).slice(0, 3);

  return <SuccessStoryClient story={story} relatedStories={relatedStories} />;
}
