export const revalidate = 0;
import { Metadata } from 'next';
import { getServicesPageData } from '@/lib/data';
import ServicesClient from './services-client';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getServicesPageData();
  return {
    title: data?.seo?.title || "Services | Prixgen",
    description: data?.seo?.metaDesc || "Comprehensive enterprise application services and digital engineering.",
    keywords: data?.seo?.keywords || [],
  };
}

export default async function ServicesPage() {
  const data = await getServicesPageData();
  return <ServicesClient data={data} />;
}
