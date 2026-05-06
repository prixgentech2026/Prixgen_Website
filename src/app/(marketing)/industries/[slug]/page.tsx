import { notFound } from 'next/navigation';
import { getIndustryBySlug, getIndustries, PageData } from '@/lib/data';
import IndustryClientPage from '@/components/templates/industry-client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry: PageData) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  return {
    title: industry?.seo?.title || `${industry?.title || 'Industrial Sector'} | Prixgen`,
    description: industry?.seo?.metaDesc || "Enterprise solutions and digital transformation for industrial sectors.",
    keywords: industry?.seo?.keywords || [],
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  
  if (!industry) {
    notFound();
  }

  return <IndustryClientPage industry={industry} />;
}
