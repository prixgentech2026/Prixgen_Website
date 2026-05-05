import { Metadata } from 'next';
import { getContactData } from '@/lib/data';
import ContactClientPage from '@/components/templates/contact-client-page';

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getContactData();
  return {
    title: contactData.seo.title,
    description: contactData.seo.metaDesc,
  };
}

export default async function ContactPage() {
  const contactData = await getContactData();

  return <ContactClientPage contactData={contactData} />;
}
