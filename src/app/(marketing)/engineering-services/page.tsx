export const revalidate = 0;
import { Metadata } from 'next';
import { getEngineeringServicesPageData } from '@/lib/data';
import EngineeringServicesClient from './engineering-services-client';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEngineeringServicesPageData();
  return {
    title: data.seo?.title || "Engineering Services | Industrial Intelligence & Automation | Prixgen",
    description: data.seo?.metaDesc || "Prixgen's engineering services deliver high-frequency IIoT telemetry, factory automation, and bespoke industrial technical solutions.",
    keywords: data.seo?.keywords || [],
  };
}

export default async function EngineeringServicesPage() {
  const data = await getEngineeringServicesPageData();
  return <EngineeringServicesClient data={data as any} />;
}
