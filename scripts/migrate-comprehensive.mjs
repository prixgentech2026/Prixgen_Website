import { createClient } from '@sanity/client';

if (!process.env.SANITY_API_TOKEN || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('ERROR: Missing environment variables.');
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
  { slug: "manufacturing", title: "Discrete & Process Manufacturing", imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
  { slug: "chemicals", title: "Chemicals & Process Manufacturing", imageUrl: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1000" },
  { slug: "fmcg-distribution", title: "FMCG & Distribution", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" },
  { slug: "retail", title: "Retail Operations", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" },
  { slug: "dairy", title: "Dairy & Perishables", imageUrl: "https://images.unsplash.com/photo-1559560923-3b80329ea420?auto=format&fit=crop&q=80&w=1000" },
  { slug: "information-services", title: "Information Services", imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" },
  { slug: "electronics", title: "Electronics", imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" }
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

const solutionsData = [
  { slug: "odoo-enterprise", title: "Odoo Enterprise Integration" },
  { slug: "sap-ecosystems", title: "SAP Ecosystems" },
  { slug: "microsoft-dynamics", title: "Microsoft Dynamics 365" },
  { slug: "lecca-ai", title: "Lecca: Computer Vision & AI" }
];

async function migrate() {
  console.log('Starting full content migration with SEO fixes...');

  try {
    const transaction = client.transaction();

    // 1. Industries
    industriesData.forEach(item => {
      transaction.createOrReplace({
        _id: `industry-${item.slug}`,
        _type: 'industry',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        headline: `${item.title} Industrial Intelligence.`,
        externalImageUrl: item.imageUrl,
        seo: {
          title: `${item.title} | Industrial Solutions | Prixgen`,
          metaDesc: `Architecting operational excellence in the ${item.title} sector.`
        }
      });
    });

    // 2. Services
    servicesData.forEach(item => {
      transaction.createOrReplace({
        _id: `service-${item.slug}`,
        _type: 'service',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        headline: "High-Availability Operational Services.",
        seo: {
          title: `${item.title} | Enterprise Services | Prixgen`,
          metaDesc: `Professional ${item.title} services for modern industrial enterprises.`
        }
      });
    });

    // 3. Solutions
    solutionsData.forEach(item => {
      transaction.createOrReplace({
        _id: `solution-${item.slug}`,
        _type: 'solution',
        title: item.title,
        slug: { _type: 'slug', current: item.slug },
        headline: "Unified Enterprise Ecosystems.",
        seo: {
          title: `${item.title} | Enterprise Solutions | Prixgen`,
          metaDesc: `Integrated ${item.title} solutions to drive operational intelligence.`
        }
      });
    });

    // 4. Page Singletons
    transaction.patch('industriesPage', {
      set: {
        seo: {
          title: "Industries | Enterprise Digital Transformation | Prixgen",
          metaDesc: "Discover how Prixgen architects operational intelligence for modern industrial enterprises."
        }
      }
    });

    transaction.patch('servicesPage', {
      set: {
        seo: {
          title: "Services | Enterprise Application Services | Prixgen",
          metaDesc: "Prixgen Preferred Care methodology: Discover, Design, and Develop outcomes-based strategies."
        }
      }
    });

    console.log('Committing extended dataset with SEO to Sanity...');
    await transaction.commit();
    console.log('FULL MIGRATION SUCCESSFUL!');
  } catch (err) {
    console.error('MIGRATION FAILED:', err.message);
    process.exit(1);
  }
}

migrate();
