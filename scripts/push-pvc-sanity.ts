import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity configuration. Please check your environment variables (.env.local).');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

function generateKey() {
  return Math.random().toString(36).substring(2, 11);
}

const pvcDoc = {
  _type: 'industry',
  _id: 'industry-pvc-manufacturing',
  title: 'PVC Manufacturing',
  slug: { _type: 'slug', current: 'pvc-manufacturing' },
  headline: 'Transforming PVC Manufacturing with Intelligent Enterprise Operations.',
  externalImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000',
  content: [
    {
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: 'PVC manufacturers currently struggle with severe margin erosion, lack of real-time operational visibility, and significant process inefficiencies that collectively undermine profitability and production stability. The Prixgen PVC Manufacturing Solution systematically addresses these leakages by integrating weighbridges, recipe management, and automated dealer networks.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: 'Through dynamic resin pricing engines, digital recipe variance control, and direct IoT connectivity, our solutions eliminate manual entry errors, reduce powder dust loss, and automate collections. With Prixgen, PVC operations achieve end-to-end traceability and a direct boost to EBITDA.'
        }
      ]
    }
  ],
  features: [
    {
      _key: generateKey(),
      title: 'Dynamic Pricing Engine',
      description: 'Enforce automated quotation workflows and credit control automation to secure profitability against volatile resin pricing.'
    },
    {
      _key: generateKey(),
      title: 'MRP-based Recipe Management',
      description: 'Optimize recipe consistencies, batch traceability, and scrap accounting to prevent powder loss and regrind ratio misuse.'
    },
    {
      _key: generateKey(),
      title: 'IoT Weighbridge Link & Gate Passes',
      description: 'Connect scales to digital systems to automate net weight gate passes and dispatch syncing.'
    },
    {
      _key: generateKey(),
      title: 'Dealer Management System (DMS)',
      description: 'Automate secondary sales, rules-based schemes, claims approvals, and reduce dispute delays.'
    }
  ],
  process: [
    {
      _key: generateKey(),
      title: 'Process Audit',
      description: 'Identify raw material wastage, weighbridge setups, and secondary sales gaps.'
    },
    {
      _key: generateKey(),
      title: 'Solution Blueprint',
      description: 'Outline custom integrations for scales, recipe controls, and ERP distribution loops.'
    },
    {
      _key: generateKey(),
      title: 'Phased Implementation',
      description: 'Seamlessly deploy automated quote workflows, MRP calculations, and dealer network digitization.'
    },
    {
      _key: generateKey(),
      title: 'EBITDA & ROI Tracking',
      description: 'Monitor scrap reductions, quotation speed improvements, and collection cycle compressions.'
    }
  ],
  seo: {
    title: 'PVC Manufacturing ERP & Digital Supply Chain | Prixgen',
    metaDesc: 'Scale your PVC manufacturing operations with automated weighbridge integration, dynamic resin pricing, recipe controls, and dealer networks.',
    keywords: ['PVC Manufacturing', 'Weighbridge Integration', 'Dealer Management System', 'Recipe Management', 'PVC ERP']
  }
};

async function pushPvcData() {
  try {
    console.log('1. Pushing PVC Industry Document to Sanity...');
    await client.createIfNotExists({ _type: 'industry', _id: 'industry-pvc-manufacturing' });
    const result = await client.patch('industry-pvc-manufacturing').set(pvcDoc).commit();
    console.log(`[SUCCESS] PVC Industry document synced: ${result._id}`);

    console.log('2. Verifying and linking PVC in industriesPage...');
    const pageDoc = await client.fetch('*[_type == "industriesPage"][0]{_id, coreIndustries}');
    
    if (!pageDoc) {
      console.warn('[WARN] No industriesPage document found in Sanity. Skipping relation update.');
      return;
    }

    const coreIndustries = pageDoc.coreIndustries || [];
    const alreadyLinked = coreIndustries.some((ref: any) => ref._ref === 'industry-pvc-manufacturing');

    if (!alreadyLinked) {
      console.log('Adding PVC Reference to industriesPage coreIndustries...');
      await client.patch(pageDoc._id)
        .setIfMissing({ coreIndustries: [] })
        .append('coreIndustries', [{
          _key: generateKey(),
          _type: 'reference',
          _ref: 'industry-pvc-manufacturing'
        }])
        .commit();
      console.log('[SUCCESS] Link added to industriesPage.');
    } else {
      console.log('[INFO] PVC Reference is already linked in industriesPage.');
    }
    
    console.log('ALL SANITY UPDATES COMPLETED SUCCESSFULLY!');
  } catch (error: any) {
    console.error('[ERROR] Sanity push failed:', error.message || error);
    process.exit(1);
  }
}

pushPvcData();
