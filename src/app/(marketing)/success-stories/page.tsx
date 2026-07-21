export const revalidate = 0;
import { Metadata } from 'next';
import { getSuccessStories } from '@/lib/data';
import SuccessStoriesClient from './success-stories-client';

export const metadata: Metadata = {
  title: "Client Success Stories & Case Studies | Prixgen",
  description: "Discover how Prixgen engineers Odoo and SAP solutions to optimize enterprise operations, automate finance, and transform supply chains.",
  keywords: ["Client Success Stories", "Enterprise Case Studies", "Odoo Implementation Success", "SAP Case Studies", "Industrial Transformation"]
};

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories();
  return <SuccessStoriesClient stories={stories} />;
}
