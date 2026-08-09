export const revalidate = 0;
import { notFound } from 'next/navigation';
import { getSolutionBySlug, getSolutions, PageData } from '@/lib/data';
import SolutionClientPage from '@/components/templates/solution-client-page';
import LeccaClientPage from '@/components/templates/lecca-client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((solution: PageData) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  return {
    title: solution?.seo?.title ? { absolute: solution.seo.title } : `${solution?.title || 'Solution'} | Prixgen`,
    description: solution?.seo?.metaDesc || "Enterprise-grade solutions for digital operational excellence.",
    keywords: solution?.seo?.keywords,
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  
  if (!solution) {
    notFound();
  }

  if (slug === 'lecca-ai') {
    return <LeccaClientPage solution={solution} />;
  }

  return <SolutionClientPage solution={solution} />;
}
