import { notFound } from 'next/navigation';
import { industriesData } from '@/lib/data';
import IndustryClientPage from '@/components/templates/industry-client-page';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return industriesData.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);
  return {
    title: industry?.seo.title,
    description: industry?.seo.metaDesc,
  };
}

export default function IndustryPage({ params }: PageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);
  
  if (!industry) {
    notFound();
  }

  return <IndustryClientPage industry={industry} />;
}
