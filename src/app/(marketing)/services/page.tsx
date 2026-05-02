import { Metadata } from 'next';
import { getServicesPageData } from '@/lib/data';
import ServicesClient from './services-client';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getServicesPageData();
  return {
    title: data.seo.title,
    description: data.seo.metaDesc,
  };
}

export default async function ServicesPage() {
  const data = await getServicesPageData();
  return <ServicesClient data={data} />;
}
