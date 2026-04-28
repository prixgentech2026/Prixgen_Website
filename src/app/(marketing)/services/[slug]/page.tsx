import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/data';
import ServiceClientPage from '@/components/templates/service-client-page';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Prixgen Enterprise`,
    description: service.seo.metaDesc,
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceClientPage service={service} />;
}
