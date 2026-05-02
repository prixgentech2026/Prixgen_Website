import { notFound } from 'next/navigation';
import { getSolutionBySlug, getSolutions, PageData } from '@/lib/data';
import SolutionClientPage from '@/components/templates/solution-client-page';

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
  if (!solution) return {};
  return {
    title: `${solution.title} | Prixgen Enterprise`,
    description: solution.seo.metaDesc,
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  
  if (!solution) {
    notFound();
  }

  return <SolutionClientPage solution={solution} />;
}
