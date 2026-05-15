export const revalidate = 0;
import { Metadata } from 'next';
import { getSolutionsPageData } from '@/lib/data';
import SolutionsClient from './solutions-client';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSolutionsPageData();
  return {
    title: data.seo?.title || "Solutions | Strategic ERP & AI Architectures",
    description: data.seo?.metaDesc || "Discover our specialized solutions including Odoo Enterprise, SAP Ecosystems, Microsoft Dynamics 365, and Lecca AI.",
    keywords: data.seo?.keywords || [],
  };
}

export default async function SolutionsIndexPage() {
  const data = await getSolutionsPageData();
  return <SolutionsClient data={data} />;
}
