export const revalidate = 0;
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getIndustries, PageData } from '@/lib/data';
import IndustryClientPage from '@/components/templates/industry-client-page';
import PvcClientPage from '@/components/templates/pvc-client-page';

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

  if (slug === 'pvc-manufacturing') {
    return {
      title: 'From Polymer to Pipe: Connected ERP for PVC Manufacturers | Prixgen',
      description: 'Discover how a connected Odoo ERP operating model eliminates six disconnected systems in PVC & plastics manufacturing — from raw material to dispatch.',
      keywords: [
        'Odoo ERP for PVC manufacturers',
        'plastics manufacturing ERP software',
        'pipe manufacturing ERP solution',
        'batch traceability plastics manufacturing',
        'inventory management for pipe manufacturers',
        'predictive maintenance plastics industry',
        'OEE tracking manufacturing',
        'extrusion production planning software'
      ],
    };
  }

  return {
    title: industry?.seo?.title || `${industry?.title || 'Industrial Sector'} | Prixgen`,
    description: industry?.seo?.metaDesc || "Enterprise solutions and digital transformation for industrial sectors.",
    keywords: industry?.seo?.keywords || [],
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  
  if (!industry && slug !== 'pvc-manufacturing') {
    notFound();
  }

  if (slug === 'pvc-manufacturing') {
    return <PvcClientPage industry={industry} />;
  }

  return <IndustryClientPage industry={industry} />;
}

