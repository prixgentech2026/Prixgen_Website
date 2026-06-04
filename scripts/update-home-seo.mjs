import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('❌ Missing Sanity configuration. Please run with: node --env-file .env.local scripts/update-home-seo.mjs');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

async function updateHomeSEO() {
  console.log('🚀 Fetching Home document ID from Sanity...');
  try {
    const homeDoc = await client.fetch('*[_type == "home"][0]{_id}');
    if (!homeDoc || !homeDoc._id) {
      throw new Error('No document of type "home" was found in Sanity.');
    }
    const homeId = homeDoc._id;
    console.log(`ℹ️ Found active Home document ID: ${homeId}`);

    const seoData = {
      title: "Odoo Gold Partner, SAP Experts, Software Consulting, Managed Cloud & AI/ML | Prixgen",
      metaDesc: "Global enterprise IT consultants specializing in Odoo, SAP, software consulting, managed cloud, AI/ML, and IIoT integration for manufacturing, FMCG, and industrial sectors.",
      keywords: [
        "Odoo Gold Partner",
        "SAP Implementation",
        "Enterprise ERP",
        "Industrial IoT",
        "Supply Chain Digital Transformation",
        "Software Consulting",
        "Managed Cloud",
        "AI & ML"
      ]
    };

    console.log('🚀 Patching SEO field...');
    await client
      .patch(homeId)
      .set({ seo: seoData })
      .commit();

    console.log('✅ Home SEO Metadata updated successfully!');
  } catch (error) {
    console.error('❌ Failed to update Home SEO:', error.message || error);
    process.exit(1);
  }
}

updateHomeSEO();
