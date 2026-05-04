import { Metadata } from 'next';
import { getServicesPageData, getEngineeringServices } from '@/lib/data';
import EngineeringServicesClient from './engineering-services-client';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Engineering Services | Industrial Intelligence & Automation | Prixgen",
    description: "Prixgen's engineering services deliver high-frequency IIoT telemetry, factory automation, and bespoke industrial technical solutions.",
  };
}

export default async function EngineeringServicesPage() {
  const servicesPageData = await getServicesPageData();
  const engineeringServices = await getEngineeringServices();
  
  const adaptedData = {
    ...servicesPageData,
    title: "Engineering Services",
    subtitle: "Industrial Intelligence",
    heroSubheadline: "Fusing mechanical precision with digital intelligence. We architect the telemetry and control systems that drive the factory of the future.",
    coreServices: engineeringServices.map(s => ({
      title: s.title,
      headline: s.headline,
      slug: s.slug
    }))
  };

  return <EngineeringServicesClient data={adaptedData as any} />;
}
