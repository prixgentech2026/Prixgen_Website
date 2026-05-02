import { notFound } from 'next/navigation';
import { getIndustryBySlug, getIndustries, PageData } from '@/lib/data';
import IndustryClientPage from '@/components/templates/industry-client-page';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry: PageData) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const industry = await getIndustryBySlug(params.slug);
  return {
    title: industry?.seo.title,
    description: industry?.seo.metaDesc,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const industry = await getIndustryBySlug(params.slug);
  
  if (!industry) {
    notFound();
  }

  return <IndustryClientPage industry={industry} />;
}
