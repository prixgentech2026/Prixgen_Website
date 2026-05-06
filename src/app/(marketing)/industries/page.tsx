import { Metadata } from 'next';
import { getIndustriesPageData } from '@/lib/data';
import IndustriesClient from './industries-client';

export async function generateMetadata() {
  const data = await getIndustriesPageData();
  return {
    title: data?.seo?.title || "Industries | Prixgen",
    description: data?.seo?.metaDesc || "Explore how Prixgen Enterprise architects unified ecosystems for various industries.",
  };
}

export default async function IndustriesIndexPage() {
  const pageData = await getIndustriesPageData();
  return <IndustriesClient data={pageData} />;
}
