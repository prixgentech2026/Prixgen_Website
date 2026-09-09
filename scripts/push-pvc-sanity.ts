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
  headline: 'From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers',
  externalImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
  content: [
    {
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: 'The journey from raw polymer to a finished, dispatched pipe involves far more than production. For most PVC and plastics manufacturers, it means six disconnected systems — procurement, formulation, production, quality, inventory, and finance — each owned by a different team, tracked differently, and reconciled on its own schedule. This strategic framework explores what a truly connected manufacturing operating model looks like, and why visibility — not just capacity — is becoming the real competitive edge.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: '1. One Value Chain, Six Disconnected Systems'
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
          text: 'Procurement, formulation, production, quality, inventory, and finance are usually owned by six different teams, tracked in six different systems, and reconciled on six different schedules. Yet for a PVC or plastics manufacturer, this isn\'t six businesses — it\'s one continuous value chain running from polymer procurement through formulation, extrusion, inspection, packing and dispatch, to dealers and finance. When these functions operate in isolation, the business loses the ability to see itself as a single connected system. The future of plastics manufacturing is not automated production alone. It is connected decision-making across the entire value chain.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: '2. Five Industry Shifts Manufacturers Can\'t Ignore'
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
          text: 'Five structural shifts are reshaping the plastics and pipe manufacturing industry: Demand Volatility & Forecasting Pressure, SKU & Variant Explosion, Rising Traceability Expectations, Margin Pressure on Commodity Resin, and the decisive shift from Capacity to Visibility, Response & Control.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: '3. Seven Fault Lines in Modern Pipe Manufacturing'
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
          text: 'Most operational breakdowns in pipe manufacturing trace back to seven recurring fault lines: demand and forecasting misalignment, material planning gaps between polymer and additive needs, production efficiency lost to changeovers and cold-start scrap, quality and traceability gaps in the audit chain, inventory accuracy issues across yard bins, maintenance and financial control disconnects between downtime and the P&L, and system complexity that quietly resurfaces as cost.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: '4. The 10-Step Journey: From Polymer to Finished Pipe'
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
          text: 'A finished, dispatch-ready pipe passes through ten distinct stages: goods receipt, compounding, extrusion, sizing and calibration, cooling, cutting, printing and marking, inspection, packing, and dispatch. Upstream control points capture batch identity; downstream control points capture what shipped, to whom, and in what condition.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: '5. Two Hidden Costs: Shooting Waste & the Wall-Thickness Paradox'
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
          text: 'Shooting Waste (purge material lost during stabilization across color and diameter changes) and the Wall-Thickness Paradox (excess grams of costly resin consumed by pipes exceeding target thickness that still pass QC) compound silently as product ranges expand unless deliberately measured and controlled in the ERP.'
        }
      ]
    },
    {
      _type: 'block',
      _key: generateKey(),
      style: 'h2',
      children: [
        {
          _type: 'span',
          _key: generateKey(),
          text: '6. Defensible 10-Link Batch-to-Dispatch Traceability'
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
          text: 'A defensible traceability chain links a supplier batch all the way through to customer dispatch across ten linked points: supplier batch, raw material lot, material issue, production order, machine/operator/shift, production batch, inspection result, finished goods lot, warehouse location, and customer dispatch. This delivers rapid root-cause isolation, pinpoint recall precision, and unshakable regulatory compliance.'
        }
      ]
    }
  ],
  features: [
    {
      _key: generateKey(),
      title: 'Dynamic Resin Pricing Engine',
      description: 'Enforce automated quotation workflows and credit control automation to secure gross margins against volatile commodity resin pricing.'
    },
    {
      _key: generateKey(),
      title: 'MRP-based Recipe Variance & Scrap Reclaim',
      description: 'Optimize batch consistencies, formulation tolerances, and closed-loop scrap accounting to prevent additive leakage and regrind misuse.'
    },
    {
      _key: generateKey(),
      title: 'IoT Weighbridge Sync & Digital Gate Passes',
      description: 'Connect weighbridge scales directly to Odoo to automate net weight gate passes, axle load validations, and dispatch syncing.'
    },
    {
      _key: generateKey(),
      title: 'End-to-End 10-Link Batch Traceability',
      description: 'Full digital audit trail from resin supplier COA to customer dispatch note, enabling rapid defect root-cause discovery in under 3 minutes.'
    },
    {
      _key: generateKey(),
      title: 'Ultrasonic Wall-Thickness Telemetry',
      description: 'Real-time telemetry and die wear condition monitoring to prevent material over-give and eliminate hidden resin over-consumption.'
    },
    {
      _key: generateKey(),
      title: 'Dealer Management System (DMS)',
      description: 'Digitize secondary sales, automated volume rebate schemes, claims approval workflows, and minimize dealer dispute delays.'
    }
  ],
  process: [
    {
      _key: generateKey(),
      title: 'Plant & Silo Diagnostic Audit',
      description: 'Identify raw material weighbridge gaps, recipe variance leakages, scrap reclaim loops, and secondary sales friction.'
    },
    {
      _key: generateKey(),
      title: 'Architecture Blueprint & Matrix BOM Setup',
      description: 'Model custom integrations for scales, recipe controls, pipe SKU matrices, and ERP distribution logic.'
    },
    {
      _key: generateKey(),
      title: 'Phased Odoo ERP & IIoT Implementation',
      description: 'Seamlessly deploy dynamic quote workflows, live extruder telemetry, MRP calculations, and dealer network portals.'
    },
    {
      _key: generateKey(),
      title: 'Real-Time Scorecard & EBITDA Realization',
      description: 'Track ongoing scrap reductions, wall-thickness precision, quotation speed acceleration, and working capital optimization.'
    }
  ],
  seo: {
    title: 'From Polymer to Pipe: Connected ERP for PVC Manufacturers | Prixgen',
    metaDesc: 'Discover how a connected Odoo ERP operating model eliminates six disconnected systems in PVC & plastics manufacturing — from raw material to dispatch.',
    keywords: [
      'Odoo ERP for PVC manufacturers',
      'plastics manufacturing ERP software',
      'pipe manufacturing ERP solution',
      'batch traceability plastics manufacturing',
      'inventory management for pipe manufacturers',
      'predictive maintenance plastics industry',
      'OEE tracking manufacturing',
      'extrusion production planning software'
    ]
  }
};

async function pushPvcData() {
  try {
    console.log('1. Checking whitepaper file asset...');
    const asset = await client.fetch('*[_type == "sanity.fileAsset" && originalFilename match "*PVC*"][0]');
    
    const docToPush = {
      ...pvcDoc,
      ...(asset && {
        whitepaperPdf: {
          _type: 'file',
          asset: { _type: 'reference', _ref: asset._id }
        },
        whitepaperTitle: 'From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers'
      })
    };

    console.log('2. Pushing PVC Industry Document to Sanity...');
    await client.createIfNotExists({ _type: 'industry', _id: 'industry-pvc-manufacturing' });
    const result = await client.patch('industry-pvc-manufacturing').set(docToPush).commit();
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
