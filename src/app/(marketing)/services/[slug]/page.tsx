import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices, PageData } from '@/lib/data';
import ServiceClientPage from '@/components/templates/service-client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service: PageData) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Prixgen Enterprise`,
    description: service.seo.metaDesc,
    keywords: service.seo.keywords,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceClientPage service={service} />;
}
