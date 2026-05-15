export const revalidate = 0;
import React from 'react';
import { Metadata } from 'next';
import PrivacyClient from '@/app/(marketing)/privacy/privacy-client';
import { getPrivacyData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy | Prixgen Enterprise',
  description: 'Our commitment to data protection and transparency. Read the Prixgen Privacy Policy.',
};

export default async function PrivacyPage() {
  const data = await getPrivacyData();
  return <PrivacyClient data={data} />;
}
