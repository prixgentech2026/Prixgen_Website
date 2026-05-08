import { Metadata } from 'next';
import CareersClient from './careers-client';
import { getCareersData } from '@/lib/data';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareersData();
  return {
    title: data.seo?.title || "Careers | Build the Future of Industrial Automation",
    description: data.seo?.metaDesc || "Join an elite team of engineers, architects, and consultants at Prixgen.",
  };
}

export default async function CareersPage() {
  const data = await getCareersData();
  return <CareersClient data={data} />;
}
