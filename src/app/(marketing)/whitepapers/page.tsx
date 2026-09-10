import { Metadata } from 'next';
import WhitepapersClient from './whitepapers-client';

export const metadata: Metadata = {
  title: 'White Papers & Technical Benchmarks | Prixgen Enterprise',
  description: 'Download in-depth industrial technical reference architectures, Industry 4.0 operating models, and ERP benchmarks published by Prixgen.',
  keywords: [
    'PVC Whitepaper',
    'Manufacturing Whitepaper',
    'ERP Architecture Benchmark',
    'Industry 4.0 Operating Model',
    'Prixgen Research',
    'Odoo ERP PVC Manufacturing'
  ],
};

export default function WhitepapersPage() {
  return <WhitepapersClient />;
}
