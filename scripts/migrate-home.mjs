import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const homeData = {
  _type: 'home',
  _id: 'home-singleton',
  title: "Intelligent Operations. Unified Enterprise.",
  heroImage: {
    _type: 'image',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070'
  },
  subheadline: [
    {
      _key: 'h1',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'c1', _type: 'span', text: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Built on Odoo, SAP, and proven industrial intelligence." }]
    }
  ],
  heroPrimaryCTA: "Schedule an Architecture Audit",
  heroSecondaryCTA: "Read the 2026 Manufacturing Benchmark",
  socialProof: "Trusted by leading industrial operators across APAC and Australia to process billions in supply chain volume.",
  clients: [
    { _key: 'c1', name: "Licious" }, 
    { _key: 'c2', name: "Curefit" }, 
    { _key: 'c3', name: "Zetwerk" }, 
    { _key: 'c4', name: "Designcafe" }, 
    { _key: 'c5', name: "Ravago" }, 
    { _key: 'c6', name: "BI Worldwide" },
    { _key: 'c7', name: "Murudeshwar Ceramics" }, 
    { _key: 'c8', name: "Vahini Irrigations" }
  ],
  testimonials: [
    {
      _key: 't1',
      quote: "We replaced all legacy SAP, Tally, and Daily Tracker applications with Odoo Enterprise Edition. Now, all our teams are interconnected, and everything is happening paperless. Thanks to Prixgen's professional efforts and expert knowledge.",
      author: "Karan Shetty",
      title: "Executive Director, Murudeshwar Ceramics Limited"
    },
    {
      _key: 't2',
      quote: "The COVID-19 shift forced us to adapt quickly. Odoo ERP drastically reduced reporting and reconciliation time for my team. Prixgen configured the platform without disrupting our current practices. A strong implementation partner with exceptional product knowledge.",
      author: "Kshiraj Prakash",
      title: "Finance Controller, BI Worldwide"
    },
    {
      _key: 't3',
      quote: "Our experience with Prixgen has been exceptional. The breadth and depth of the offering has met all our requirements, and the team has been incredibly responsive to all our needs.",
      author: "Hemraj Sencha",
      title: "Managing Director, Vahini Irrigations"
    }
  ],
  ctaTitle: "Ready to architect your operational intelligence?",
  ctaDescription: "Join 500+ industrial leaders who have unified their global operations. Start your transformation with a zero-cost architecture audit.",
  ctaButtonText: "Book an Architecture Audit",
  seo: {
    title: "Prixgen | Enterprise ERP Architecture & Strategy",
    metaDesc: "Architecting unified enterprise ecosystems for global industrial leaders through Odoo, SAP, and IIoT integration.",
  }
};

async function migrate() {
  console.log('🚀 Starting Homepage migration...');
  try {
    await client.createOrReplace(homeData);
    console.log('✅ Homepage content migrated successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
