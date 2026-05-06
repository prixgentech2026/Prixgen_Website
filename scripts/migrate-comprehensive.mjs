import { createClient } from '@sanity/client';

if (!process.env.SANITY_API_TOKEN || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('ERROR: Missing environment variables.');
  console.error('Please ensure SANITY_API_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID are set.');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-04-30',
  useCdn: false,
});

const industriesData = [
  {
    slug: "manufacturing",
    title: "Discrete & Process Manufacturing",
    headline: "Engineering the Smart Factory of the Future.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
  },
  {
    slug: "chemicals",
    title: "Chemicals & Process Manufacturing",
    headline: "Precision, Compliance, and Batch Intelligence.",
    imageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1000",
  },
  {
    slug: "fmcg-distribution",
    title: "FMCG & Distribution",
    headline: "Velocity and Visibility in Consumer Goods.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    slug: "retail",
    title: "Retail Operations",
    headline: "Omnichannel Retail Architecture.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
  },
  {
    slug: "dairy",
    title: "Dairy & Perishables",
    headline: "Time-Critical Supply Chain Management.",
    imageUrl: "https://images.unsplash.com/photo-1559560923-3b80329ea420?auto=format&fit=crop&q=80&w=1000",
  },
  {
    slug: "information-services",
    title: "Information Services",
    headline: "Digital Infrastructure and Enterprise Software.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    slug: "electronics",
    title: "Electronics",
    headline: "High-Precision Engineering and Assembly.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
  }
];

const servicesData = [
  { slug: "business-strategy", title: "Business Strategy & Transformation" },
  { slug: "it-consulting", title: "IT & Management Consulting" },
  { slug: "accounting-advisory", title: "Accounting & Financial Advisory" },
  { slug: "management-consulting", title: "Management Consulting" },
  { slug: "supply-chain-consulting", title: "Supply Chain Consulting" },
  { slug: "warehouse-management", title: "Warehouse Management Systems (WMS)" },
  { slug: "hiring-odoo-developers", title: "Dedicated Odoo Talent Services" },
  { slug: "iiot-telemetry", title: "IIoT & Telemetry Engineering" },
  { slug: "automation", title: "Factory & Industrial Automation" },
  { slug: "cloud-infrastructure", title: "Managed Industrial Cloud Infrastructure" },
  { slug: "ai-machine-learning", title: "AI & Machine Learning" },
  { slug: "business-transformation", title: "Business Transformation" }
];

async function migrate() {
  console.log('Starting full content migration (Singletons + Items)...');

  try {
    const transaction = client.transaction();

    // 1. Industries Items
    industriesData.forEach(item => {
      transaction.createOrReplace({
        _id: `industry-${item.slug}`,
        _type: 'industry',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        headline: item.headline,
        externalImageUrl: item.imageUrl,
      });
    });

    // 2. Services Items
    servicesData.forEach(item => {
      transaction.createOrReplace({
        _id: `service-${item.slug}`,
        _type: 'service',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        headline: "High-Availability Operational Services.",
      });
    });

    // 3. Industries Page Singleton
    transaction.createOrReplace({
      _id: 'industriesPage',
      _type: 'industriesPage',
      title: "Transforming Global Industries",
      heroSubheadline: "We architect resilient, data-driven ecosystems across the world's most demanding industrial sectors.",
      methodology: [
        { _key: 'm1', step: "01", title: "Analyze : Industrial Audit", description: "Deep-dive technical audits of your existing shop-floor.", icon: "Search" },
        { _key: 'm2', step: "02", title: "Architect : Digital Core", description: "Designing high-availability digital cores.", icon: "PenTool" },
        { _key: 'm3', step: "03", title: "Automate : Scale Operations", description: "Deploying autonomous systems and AI models.", icon: "Settings" }
      ],
      outcomes: [
        { _key: 'o1', title: "Zero Operational Friction", description: "Eliminate manual bottlenecks.", icon: "Zap" },
        { _key: 'o2', title: "Predictive Intelligence", description: "Shift from reactive to predictive maintenance.", icon: "LineChart" }
      ],
      coreIndustries: industriesData.map(i => ({ _type: 'reference', _ref: `industry-${i.slug}`, _key: `ref-${i.slug}` })),
      seo: {
        title: "Industries | Enterprise Digital Transformation | Prixgen",
        metaDesc: "Discover how Prixgen architects operational intelligence for modern industrial enterprises."
      }
    });

    // 4. Services Page Singleton
    transaction.createOrReplace({
      _id: 'servicesPage',
      _type: 'servicesPage',
      title: "Enterprise Application Services",
      subtitle: "Architectural Services",
      heroSubheadline: "We traverse a customer-driven methodology to enable technical confidence and exact solutions.",
      methodology: [
        { _key: 'm1', step: "01", title: "Discover : We Listen", description: "Defining goals and challenges.", icon: "Search" },
        { _key: 'm2', step: "02", title: "Design : We Strategize", description: "Designing outcomes-based operational strategies.", icon: "PenTool" },
        { _key: 'm3', step: "03", title: "Develop : We Create", description: "Thoughtful, relevant development services.", icon: "Code" }
      ],
      outcomes: [
        { _key: 'o1', title: "Increase Efficiency", description: "Automate day-to-day tasks.", icon: "Activity" },
        { _key: 'o2', title: "Promote Collaboration", description: "Break down data silos.", icon: "Users" }
      ],
      coreServices: servicesData.map(s => ({ _type: 'reference', _ref: `service-${s.slug}`, _key: `ref-${s.slug}` })),
      seo: {
        title: "Services | Enterprise Application Services | Prixgen",
        metaDesc: "Prixgen Preferred Care methodology: Discover, Design, and Develop outcomes-based strategies."
      }
    });

    console.log('Committing extended dataset to Sanity...');
    await transaction.commit();
    console.log('FULL MIGRATION SUCCESSFUL!');
  } catch (err) {
    console.error('MIGRATION FAILED:', err.message);
    process.exit(1);
  }
}

migrate();
