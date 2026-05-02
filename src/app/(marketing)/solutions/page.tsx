import { Metadata } from 'next';
import { getSolutions } from '@/lib/data';
import SolutionsClient from './solutions-client';

export const metadata: Metadata = {
  title: "Solutions | Strategic ERP & AI Architectures",
  description: "Discover our specialized solutions including Odoo Enterprise, SAP Ecosystems, Microsoft Dynamics 365, and Lecca AI.",
};

export default async function SolutionsIndexPage() {
  const solutionsData = await getSolutions();
  return <SolutionsClient solutions={solutionsData} />;
}
