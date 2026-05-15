export const revalidate = 0;
import React from 'react';
import { Metadata } from 'next';
import TermsClient from '@/app/(marketing)/terms/terms-client';
import { getTermsData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms of Service | Prixgen Enterprise',
  description: 'The legal framework for our enterprise partnerships. Read the Prixgen Terms of Service.',
};

export default async function TermsPage() {
  const data = await getTermsData();
  return <TermsClient data={data} />;
}
