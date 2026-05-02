import { Metadata } from 'next';
import { getIndustries } from '@/lib/data';
import IndustriesClient from './industries-client';

export const metadata: Metadata = {
  title: "Industries | Enterprise ERP Solutions for Global Sectors",
  description: "Explore how Prixgen Enterprise architects unified ecosystems for Manufacturing, Chemicals, FMCG, Retail, and Dairy.",
};

export default async function IndustriesIndexPage() {
  const industriesData = await getIndustries();
  return <IndustriesClient industries={industriesData} />;
}
