import { createClient } from '@sanity/client';


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const servicesPageData = {
  _type: 'servicesPage',
  _id: 'servicesPage', // Singleton ID
  title: "Enterprise Application Services",
  subtitle: "Architectural Services",
  heroSubheadline: "Prixgen Preferred Care: We traverse a stringent, economical, and customer-driven methodology to enable technical confidence and exact solutions.",
  methodology: [
    { 
      _key: 'step1',
      step: "01", 
      title: "Discover : We Listen", 
      description: "We define and discuss your goals and challenges, helping you envision new, innovative ways to improve operational experiences.", 
      icon: "Search" 
    },
    { 
      _key: 'step2',
      step: "02", 
      title: "Design : We Strategize", 
      description: "We design successful, outcomes-based learning and operational strategies tailored specifically to the needs of our enterprise partners.", 
      icon: "PenTool" 
    },
    { 
      _key: 'step3',
      step: "03", 
      title: "Develop : We Create", 
      description: "We offer thoughtful, relevant, and engaging development services, crafting a technical solution that works best for your exact needs.", 
      icon: "Code" 
    }
  ],
  outcomes: [
    { _key: 'o1', title: "Increase Efficiency", description: "Automate day-to-day tasks, eliminate repetitive processes, and streamline cross-departmental workflows within a single platform.", icon: "Activity" },
    { _key: 'o2', title: "Promote Collaboration", description: "Break down data silos. Link remote teams, headquarters, and offshore units through secure internet, intranet, and IoT highways.", icon: "Users" },
    { _key: 'o3', title: "Accurate Forecasting", description: "Leverage centralized databases and advanced analytics to ensure data integrity and generate realistic, machine-learning-backed forecasts.", icon: "LineChart" },
    { _key: 'o4', title: "Lower Operational Costs", description: "Anticipate disruptions and manage impact effectively. Real-time data across production and supply chain keeps operating costs strictly within budget.", icon: "TrendingUp" },
    { _key: 'o5', title: "Data Security & Compliance", description: "Guard against breaches with single-warehouse access controls, while meeting myriad business requirements through built-in regulatory reporting.", icon: "ShieldCheck" },
    { _key: 'o6', title: "SaaS Advantages", description: "Scale effortlessly, access data anywhere, integrate existing apps, and eliminate maintenance downtime with a low capital outlay.", icon: "Server" }
  ],
  seo: {
    title: "Services | Enterprise Application Services | Prixgen",
    metaDesc: "Prixgen Preferred Care methodology: Discover, Design, and Develop outcomes-based learning and operational strategies for modern industrial enterprises.",
  }
};

async function migrate() {
  console.log('🚀 Starting Services Page migration...');

  try {
    // 1. Fetch current service IDs to link as references
    const services = await client.fetch('*[_type == "service"]{_id, slug}');
    const coreSlugs = [
      'business-strategy',
      'it-consulting',
      'accounting-advisory',
      'management-consulting',
      'supply-chain-consulting',
      'wms',
      'hiring-odoo-developers',
      'iiot-telemetry',
      'automation',
      'cloud-infrastructure'
    ];
    
    const coreServiceRefs = services
      .filter((s) => coreSlugs.includes(s.slug.current))
      .map((s) => ({
        _type: 'reference',
        _ref: s._id,
        _key: s._id
      }));

    const finalData = {
      ...servicesPageData,
      coreServices: coreServiceRefs
    };

    // 2. Create or Update the singleton document
    await client.createOrReplace(finalData);
    
    console.log('✅ Services Page migration successful!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrate();
