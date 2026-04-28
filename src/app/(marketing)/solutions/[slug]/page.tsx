import { notFound } from 'next/navigation';
import { solutionsData } from '@/lib/data';
import SolutionClientPage from '@/components/templates/solution-client-page';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return solutionsData.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const solution = solutionsData.find((s) => s.slug === params.slug);
  if (!solution) return {};
  return {
    title: `${solution.title} | Prixgen Enterprise`,
    description: solution.seo.metaDesc,
  };
}

export default function SolutionPage({ params }: PageProps) {
  const solution = solutionsData.find((s) => s.slug === params.slug);
  
  if (!solution) {
    notFound();
  }

  return <SolutionClientPage solution={solution} />;
}
