import { notFound } from 'next/navigation';
import { getEngineeringServiceBySlug, getEngineeringServices, PageData } from '@/lib/data';
import ServiceClientPage from '@/components/templates/service-client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getEngineeringServices();
  return services.map((service: PageData) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await getEngineeringServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Prixgen Engineering`,
    description: service.seo.metaDesc,
  };
}

export default async function EngineeringServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getEngineeringServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceClientPage service={service} />;
}
