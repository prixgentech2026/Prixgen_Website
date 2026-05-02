import { Metadata } from 'next';
import { getContactData } from '@/lib/data';
import ContactClient from './contact-client';

export async function generateMetadata(): Promise<Metadata> {
  const contactData = await getContactData();
  return {
    title: contactData.seo.title,
    description: contactData.seo.metaDesc,
  };
}

export default async function ContactPage() {
  const contactData = await getContactData();

  return <ContactClient contactData={contactData} />;
}
