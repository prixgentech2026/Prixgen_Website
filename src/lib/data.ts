import { client } from '@/sanity/lib/client';
import { 
  homeQuery, 
  industryBySlugQuery, 
  solutionBySlugQuery, 
  serviceBySlugQuery,
  industriesQuery,
  solutionsQuery,
  servicesQuery,
  servicesPageQuery,
  aboutQuery,
  contactQuery
} from '@/sanity/lib/queries';

/**
 * SANITY FETCHING LAYER
 * These functions fetch data from Sanity if a Project ID is provided.
 * Otherwise, they fallback to the local mock data defined below.
 */

export async function getHomeData() {
  if (!client) return homeData;
  try {
    const data = await client.fetch(homeQuery);
    return data || homeData;
  } catch (error) {
    console.error('Sanity Fetch Error (Home):', error);
    return homeData;
  }
}

export async function getAboutData() {
  if (!client) return aboutData;
  try {
    const data = await client.fetch(aboutQuery);
    return data || aboutData;
  } catch (error) {
    console.error('Sanity Fetch Error (About):', error);
    return aboutData;
  }
}

export async function getContactData() {
  if (!client) return contactData;
  try {
    const data = await client.fetch(contactQuery);
    return data || contactData;
  } catch (error) {
    console.error('Sanity Fetch Error (Contact):', error);
    return contactData;
  }
}

export async function getIndustries() {
  if (!client) return industriesData;
  try {
    const data = await client.fetch(industriesQuery);
    return data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : industriesData;
  } catch (error) {
    console.error('Sanity Fetch Error (Industries):', error);
    return industriesData;
  }
}

export async function getIndustryBySlug(slug: string) {
  if (!client) {
    return industriesData.find(i => i.slug === slug);
  }
  try {
    const data = await client.fetch(industryBySlugQuery, { slug });
    return data || industriesData.find(i => i.slug === slug);
  } catch (error) {
    console.error(`Sanity Fetch Error (Industry: ${slug}):`, error);
    return industriesData.find(i => i.slug === slug);
  }
}

export async function getSolutions() {
  if (!client) return solutionsData;
  try {
    const data = await client.fetch(solutionsQuery);
    return data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : solutionsData;
  } catch (error) {
    console.error('Sanity Fetch Error (Solutions):', error);
    return solutionsData;
  }
}

export async function getSolutionBySlug(slug: string) {
  if (!client) {
    return solutionsData.find(s => s.slug === slug);
  }
  try {
    const data = await client.fetch(solutionBySlugQuery, { slug });
    return data || solutionsData.find(s => s.slug === slug);
  } catch (error) {
    console.error(`Sanity Fetch Error (Solution: ${slug}):`, error);
    return solutionsData.find(s => s.slug === slug);
  }
}

export async function getServices() {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  if (!client) return servicesData.filter(s => !engineeringSlugs.includes(s.slug));
  try {
    const data = await client.fetch(servicesQuery);
    const allServices = data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : servicesData;
    return allServices.filter((s: any) => !engineeringSlugs.includes(s.slug));
  } catch (error) {
    console.error('Sanity Fetch Error (Services):', error);
    return servicesData.filter(s => !engineeringSlugs.includes(s.slug));
  }
}

export async function getServiceBySlug(slug: string) {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  if (engineeringSlugs.includes(slug)) return null;

  if (!client) {
    return servicesData.find(s => s.slug === slug);
  }
  try {
    const data = await client.fetch(serviceBySlugQuery, { slug });
    return data || servicesData.find(s => s.slug === slug);
  } catch (error) {
    console.error(`Sanity Fetch Error (Service: ${slug}):`, error);
    return servicesData.find(s => s.slug === slug);
  }
}

export async function getServicesPageData() {
  if (!client) return servicesPageMockData;
  try {
    const data = await client.fetch(servicesPageQuery);
    if (!data) return servicesPageMockData;
    
    // Ensure we show all services even if Sanity only has a few
    return {
      ...data,
      coreServices: data.coreServices && data.coreServices.length >= servicesPageMockData.coreServices.length
        ? data.coreServices 
        : servicesPageMockData.coreServices
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Services Page):', error);
    return servicesPageMockData;
  }
}

export async function getEngineeringServices() {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  return servicesData.filter(s => engineeringSlugs.includes(s.slug));
}

export async function getEngineeringServiceBySlug(slug: string) {
  const services = await getEngineeringServices();
  return services.find(s => s.slug === slug) || null;
}

/**
 * MOCK DATA (Fallback)
 */

export interface PortableTextSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key?: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: PortableTextSpan[];
}

export interface SEOData {
  title: string;
  metaDesc: string;
}

export interface PageData {
  slug: string;
  title: string;
  headline: string;
  content: PortableTextBlock[];
  seo: SEOData;
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
}

export interface ServicesPageData {
  title: string;
  subtitle: string;
  heroSubheadline: string;
  methodology: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  outcomes: {
    title: string;
    description: string;
    icon: string;
  }[];
  coreServices: {
    title: string;
    headline: string;
    slug: string;
  }[];
  seo: SEOData;
}

export const clientsData = [
  { name: "Licious" }, { name: "Curefit" }, { name: "Zetwerk" }, 
  { name: "Designcafe" }, { name: "Ravago" }, { name: "BI Worldwide" },
  { name: "Murudeshwar Ceramics" }, { name: "Vahini Irrigations" }
];

export const testimonialsData = [
  {
    quote: "We replaced all legacy SAP, Tally, and Daily Tracker applications with Odoo Enterprise Edition. Now, all our teams are interconnected, and everything is happening paperless. Thanks to Prixgen's professional efforts and expert knowledge.",
    author: "Karan Shetty",
    title: "Executive Director, Murudeshwar Ceramics Limited"
  },
  {
    quote: "The COVID-19 shift forced us to adapt quickly. Odoo ERP drastically reduced reporting and reconciliation time for my team. Prixgen configured the platform without disrupting our current practices. A strong implementation partner with exceptional product knowledge.",
    author: "Kshiraj Prakash",
    title: "Finance Controller, BI Worldwide"
  },
  {
    quote: "Our experience with Prixgen has been exceptional. The breadth and depth of the offering has met all our requirements, and the team has been incredibly responsive to all our needs.",
    author: "Hemraj Sencha",
    title: "Managing Director, Vahini Irrigations"
  }
];

export const homeData = {
  title: "Intelligent Operations. Unified Enterprise.",
  heroImage: {
    _type: 'image',
    asset: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
  },
  subheadline: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Built on Odoo, SAP, and proven industrial intelligence." }]
    }
  ],
  heroPrimaryCTA: "Schedule an Architecture Audit",
  heroSecondaryCTA: "Read the 2026 Manufacturing Benchmark",
  socialProof: "Trusted by leading industrial operators across APAC and Australia to process billions in supply chain volume.",
  clients: clientsData,
  testimonials: testimonialsData,
  ctaTitle: "Ready to architect your operational intelligence?",
  ctaDescription: "Join 500+ industrial leaders who have unified their global operations. Start your transformation with a zero-cost architecture audit.",
  ctaButtonText: "Book an Architecture Audit",
  seo: {
    title: "Prixgen | Enterprise ERP Architecture & Strategy",
    metaDesc: "Architecting unified enterprise ecosystems for global industrial leaders through Odoo, SAP, and IIoT integration.",
  }
};

export const aboutData = {
  title: "Global Architects of Enterprise Intelligence.",
  subtitle: "Pioneering enterprise intelligence through a specialized fusion of IoT, BI, and Analytics.",
  content: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Prixgen ensures the best ROI for companies by streamlining business processes. Driven by the idea of providing innovative solutions through ERP, IIoT, and AI, we are an elite team of IT professionals with over 30+ years of combined experience in enterprise implementations." }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "We don't just deploy software; we future-proof your digital journey. Our methodology is rooted in architectural integrity and zero-tolerance for operational friction." }]
    }
  ],
  vision: "To be the global benchmark for operational intelligence and industrial digital transformation.",
  mission: "Empowering enterprises through unified ecosystems that turn data into decisive competitive advantage.",
  stats: [
    { label: "Years Experience", value: "30+" },
    { label: "Implementations", value: "500+" },
    { label: "Architect Team", value: "Elite" },
    { label: "Odoo Partner", value: "Gold" },
  ],
  whyChooseUsIntro: "We provide an uncompromising technical edge for industrial leaders who demand reliability and scale.",
  whyChooseUs: [
    {
      title: "Assured Services",
      description: "Zero-latency support and multi-layered quality assurance for your entire enterprise stack."
    },
    {
      title: "Future-Proofed Innovation",
      description: "Architectures designed to evolve with AI, machine learning, and global supply chain shifts."
    },
    {
      title: "Expert Engineering",
      description: "Clean code and modular scalability from a team with decades of industrial expertise."
    }
  ],
  experienceSection: {
    title: "15 Years of Industrial Excellence",
    description: "Our journey has been defined by rescuing failed implementations and architecting unified global ecosystems.",
    points: [
      "Certified Gold Partners for Odoo and SAP Business One.",
      "Proprietary AI and IIoT telemetry extraction models.",
      "Global delivery centers across APAC and EMEA."
    ]
  },
  featuredImage: {
    sourceUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    altText: "The Prixgen Elite Team"
  },
  seo: {
    title: "About Us | Global Architects of Enterprise Intelligence",
    metaDesc: "Prixgen is an elite team of IT professionals with over 30+ years of combined experience in ERP, IIoT, and AI implementations.",
  }
};

export const contactData = {
  title: "Let's Transform Your Operations.",
  description: "Whether you are rescuing a failed implementation, architecting a new global ecosystem, or exploring proprietary AI solutions, our senior consultants are ready to assist.",
  address: "#244 Kalabhairaveshwara Complex,\n1st Stage, Niveditha Nagara,\nMysuru, Karnataka 570022",
  email: "solutions@prixgen.com",
  phone: "+91 (821) 400-XXXX",
  seo: {
    title: "Contact Us | Let's Transform Your Operations",
    metaDesc: "Connect with Prixgen Enterprise Headquarters in Mysuru to discuss your operational intelligence roadmap and ERP strategy.",
  }
};

export const industriesData: PageData[] = [
  {
    slug: "manufacturing",
    title: "Advanced Manufacturing",
    headline: "Engineered for the Factory of the Future.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We architect unified ERP and IIoT ecosystems that connect shop-floor machinery directly to top-floor financial dashboards. Eliminate data silos, optimize production scheduling, and achieve real-time visibility across global manufacturing hubs." }]
      }
    ],
    seo: {
      title: "Advanced Manufacturing ERP & IIoT | Prixgen",
      metaDesc: "Architecting unified ERP and IIoT ecosystems for the factory of the future.",
    }
  },
  {
    slug: "chemicals",
    title: "Chemicals & Process Manufacturing",
    headline: "Precision, Compliance, and Batch Intelligence.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Process manufacturing demands zero-tolerance for error. We deploy architectures that natively handle complex batch management, strict regulatory compliance, and dynamic shelf-life tracking, eliminating fragmented legacy spreadsheets." }]
      }
    ],
    seo: {
      title: "Chemical ERP & Regulatory Compliance | Prixgen",
      metaDesc: "Precision ERP architectures for complex batch management and chemical compliance.",
    }
  },
  {
    slug: "fmcg-distribution",
    title: "Consumer Goods & Distribution (FMCG)",
    headline: "Velocity and Visibility in Consumer Goods.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In FMCG, latency is a liability. We deploy hyper-scalable supply chain architectures that optimize inventory routing, accelerate fulfillment, and protect profit margins from procurement to delivery." }]
      }
    ],
    seo: {
      title: "FMCG Supply Chain & WMS Solutions | Prixgen",
      metaDesc: "Optimize inventory routing and accelerate fulfillment with Prixgen's FMCG architectures.",
    }
  },
  {
    slug: "retail",
    title: "Retail Operations",
    headline: "Omnichannel Retail Architecture.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Transform legacy retail operations into unified omnichannel experiences. We integrate complex point-of-sale systems with back-end ERPs to provide real-time inventory visibility and synchronized financial reporting." }]
      }
    ],
    seo: {
      title: "Omnichannel Retail ERP Integration | Prixgen",
      metaDesc: "Transforming legacy retail into unified omnichannel experiences with real-time inventory visibility.",
    }
  },
  {
    slug: "dairy",
    title: "Dairy & Perishables",
    headline: "Time-Critical Supply Chain Management.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We implement specialized routing and cold-chain ERP tracking modules designed specifically for the extreme time-sensitivity of dairy and perishable distribution." }]
      }
    ],
    seo: {
      title: "Dairy & Perishable Supply Chain ERP | Prixgen",
      metaDesc: "Specialized cold-chain tracking and time-critical supply chain modules for the dairy industry.",
    }
  }
];

export const solutionsData: PageData[] = [
  {
    slug: "odoo-enterprise",
    title: "Odoo Enterprise Integration",
    headline: "Odoo Architecture, Engineered for Scale.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "As a certified Gold Partner, we don't just install Odoo—we engineer it to fit complex, multi-national workflows. From multi-warehouse inventory routing to automated procurement, we turn Odoo into an uncompromising enterprise engine." }]
      }
    ],
    seo: {
      title: "Odoo Enterprise Gold Partner | Prixgen",
      metaDesc: "Engineering complex Odoo workflows for multi-national enterprise scale.",
    }
  },
  {
    slug: "sap-ecosystems",
    title: "SAP Ecosystems",
    headline: "Unlocking the Full Value of SAP.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We guide mid-market and enterprise clients through complex SAP deployments and migrations. We focus on phase-zero architectural audits to ensure your SAP environment aligns perfectly with your long-term operational strategy." }]
      }
    ],
    seo: {
      title: "SAP Business One Deployment & Migration | Prixgen",
      metaDesc: "Unlocking SAP value through architectural audits and strategic mid-market deployments.",
    }
  },
  {
    slug: "microsoft-dynamics",
    title: "Microsoft Dynamics 365",
    headline: "Unified CRM and ERP Capabilities.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Break down data silos and modernize your business with Dynamics 365. We deploy intelligent cloud applications (including Power BI and Dynamics NAV) that unify financial management, supply chain operations, and customer insights into a single pane of glass." }]
      }
    ],
    seo: {
      title: "Microsoft Dynamics 365 & Power BI Integration | Prixgen",
      metaDesc: "Unifying finance, supply chain, and customer insights through Dynamics 365.",
    }
  },
  {
    slug: "lecca-ai",
    title: "Lecca: Computer Vision & AI",
    headline: "AI-Powered Industrial Image Processing.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Eliminate manual errors and accelerate quality control with Lecca, our proprietary neural network. Designed for complex object detection and segmentation in extreme manufacturing environments (such as automated pipe-counting), Lecca digitizes physical inventory with unparalleled accuracy." }]
      }
    ],
    seo: {
      title: "Lecca AI | Proprietary Industrial Computer Vision | Prixgen",
      metaDesc: "Proprietary AI for industrial image processing, automated inventory counting, and quality control.",
    }
  }
];

export const servicesData: any[] = [
  {
    slug: "business-strategy",
    title: "Business Strategy & Transformation",
    headline: "Architecting Long-term Value and Market Leadership.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Business Strategy" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We partner with enterprise leaders to redefine their operational models, identifying high-impact opportunities for digital transformation and sustainable growth. Our strategic framework focuses on building resilient business architectures that can adapt to rapid market shifts while maintaining high margins." }]
      }
    ],
    features: [
      { title: "Market Analysis", description: "Deep-dive competitive intelligence and market trend forecasting." },
      { title: "Operational Audit", description: "Identifying inefficiencies in current business processes." },
      { title: "Transformation Roadmap", description: "Phased implementation plans for digital modernization." },
      { title: "ROI Projection", description: "Data-backed forecasting of transformation benefits." }
    ],
    process: [
      { title: "Discovery & Alignment", description: "We align with your executive vision and identify core business objectives." },
      { title: "Strategic Architecture", description: "Designing the new operational model and technical requirements." },
      { title: "Implementation Governance", description: "Managing the transition with minimal operational disruption." }
    ],
    seo: {
      title: "Business Strategy & Digital Transformation | Prixgen",
      metaDesc: "Strategic consultancy for long-term value creation and operational optimization.",
    }
  },
  {
    slug: "it-consulting",
    title: "IT & Management Consulting",
    headline: "Aligning Technology with Business Strategy.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", altText: "IT Consulting" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "A company's technology should accelerate its strategy, not constrain it. We conduct deep architectural audits to identify workflow bottlenecks, eliminate technical debt, and build a modern roadmap for digital transformation." }]
      }
    ],
    features: [
      { title: "System Integration", description: "Seamlessly connecting disparate enterprise applications." },
      { title: "Legacy Modernization", description: "Migrating from outdated systems to high-velocity cloud stacks." },
      { title: "Cybersecurity Audit", description: "Comprehensive vulnerability assessment and hardening." },
      { title: "Tech-Stack Optimization", description: "Right-sizing your software licenses and infrastructure." }
    ],
    process: [
      { title: "Technical Audit", description: "Evaluating existing hardware, software, and networking assets." },
      { title: "Gap Analysis", description: "Identifying the distance between current state and business goals." },
      { title: "Deployment & Training", description: "Rolling out solutions and ensuring team adoption." }
    ],
    seo: {
      title: "Strategic IT & Management Consulting | Prixgen",
      metaDesc: "Aligning technology with business strategy through deep architectural audits.",
    }
  },
  {
    slug: "accounting-advisory",
    title: "Accounting & Financial Advisory",
    headline: "Precision, Compliance, and Financial Intelligence.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000", altText: "Accounting Advisory" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Modern enterprises require real-time financial visibility. We deploy integrated accounting architectures that ensure multi-currency compliance, automated reconciliation, and machine-learning backed financial forecasting." }]
      }
    ],
    features: [
      { title: "Multi-Entity Consolidation", description: "Unified financial reporting for global corporate groups." },
      { title: "Tax Compliance", description: "Automated regulatory reporting and multi-jurisdictional compliance." },
      { title: "Cash Flow Analytics", description: "Real-time tracking of liquidity and operational spend." },
      { title: "Audit Readiness", description: "Ensuring all financial data is accurate and verifiable." }
    ],
    process: [
      { title: "Financial Diagnostics", description: "Reviewing current accounting workflows and compliance status." },
      { title: "System Engineering", description: "Implementing automated financial control systems." },
      { title: "Continuous Advisory", description: "Ongoing strategic financial guidance and performance review." }
    ],
    seo: {
      title: "Enterprise Accounting Advisory & Systems | Prixgen",
      metaDesc: "Achieve financial precision and compliance with Prixgen's integrated accounting architectures.",
    }
  },
  {
    slug: "management-consulting",
    title: "Management Consulting",
    headline: "Operational Excellence through Process Engineering.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000", altText: "Management Consulting" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We optimize your human and technical capital by re-engineering core business processes for maximum efficiency and zero operational friction." }]
      }
    ],
    features: [
      { title: "Change Management", description: "Guiding organizations through complex cultural and structural shifts." },
      { title: "KPI Engineering", description: "Defining and tracking the metrics that actually drive growth." },
      { title: "Talent Optimization", description: "Aligning human resources with strategic business goals." },
      { title: "Process Automation", description: "Eliminating manual touchpoints in high-frequency workflows." }
    ],
    process: [
      { title: "Process Mapping", description: "Visualizing current workflows and identifying friction points." },
      { title: "Solution Design", description: "Creating the 'To-Be' model for maximum efficiency." },
      { title: "Scale & Sustain", description: "Standardizing improvements across the entire enterprise." }
    ],
    seo: {
      title: "Management Consulting & Process Engineering | Prixgen",
      metaDesc: "Driving operational excellence and efficiency through expert management consulting.",
    }
  },
  {
    slug: "supply-chain-consulting",
    title: "Supply Chain Consulting",
    headline: "End-to-End Logistics and Supply Chain Optimization.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1000", altText: "Supply Chain Consulting" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In a global economy, your supply chain is your competitive edge. We architect resilient, high-velocity logistics networks that reduce latency and protect margins." }]
      }
    ],
    features: [
      { title: "Inventory Optimization", description: "Reducing carrying costs while ensuring 100% service levels." },
      { title: "Network Design", description: "Architecting optimal warehouse and distribution hub locations." },
      { title: "Supplier Governance", description: "Implementing rigorous quality and performance standards." },
      { title: "Logistics Analytics", description: "Real-time visibility into global shipment status and costs." }
    ],
    process: [
      { title: "Network Audit", description: "Analyzing current transportation and storage performance." },
      { title: "Resilience Strategy", description: "Identifying and mitigating potential supply chain disruptions." },
      { title: "Digital Integration", description: "Connecting supply chain data to your core ERP/WMS." }
    ],
    seo: {
      title: "Supply Chain Strategy & Optimization | Prixgen",
      metaDesc: "Architecting resilient, high-velocity logistics networks for global industrial leaders.",
    }
  },
  {
    slug: "wms",
    title: "Warehouse Management Systems (WMS)",
    headline: "Intelligent Inventory and Fulfillment Automation.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000", altText: "Warehouse Management Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Eliminate manual errors and optimize warehouse space with our intelligent WMS architectures. We provide real-time inventory tracking, automated picking routes, and seamless ERP integration." }]
      }
    ],
    features: [
      { title: "Automated Picking", description: "Intelligent route planning to minimize picker travel time." },
      { title: "Real-time Tracking", description: "Zero-latency visibility into every SKU in your facility." },
      { title: "Slotting Optimization", description: "Dynamic reorganization of stock based on velocity." },
      { title: "ERP Syncing", description: "Perfect alignment between physical stock and digital records." }
    ],
    process: [
      { title: "Facility Blueprinting", description: "Digital mapping of your warehouse for WMS configuration." },
      { title: "Hardware Deployment", description: "Setting up RFID, scanning, and mobile data terminals." },
      { title: "Go-Live Support", description: "On-site assistance during the critical transition period." }
    ],
    seo: {
      title: "Enterprise WMS & Warehouse Automation | Prixgen",
      metaDesc: "Next-generation warehouse management systems for intelligent inventory and fulfillment.",
    }
  },
  {
    slug: "hiring-odoo-developers",
    title: "Dedicated Odoo Talent Services",
    headline: "Scaling Your Technical Capacity with Elite Odoo Experts.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000", altText: "Odoo Developers" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Access our pre-vetted pool of senior Odoo developers and architects. We provide dedicated technical talent that integrates seamlessly with your internal teams to accelerate your digital roadmap." }]
      }
    ],
    features: [
      { title: "Pre-vetted Experts", description: "Only the top 3% of Odoo developers make it into our pool." },
      { title: "Full-Stack Capability", description: "Frontend, backend, and PostgreSQL database experts." },
      { title: "Agile Integration", description: "Talent that adapts to your existing DevOps and PM workflows." },
      { title: "Technical Oversight", description: "All projects monitored by our senior technical architects." }
    ],
    process: [
      { title: "Requirements Definition", description: "Understanding the specific skills and seniority you need." },
      { title: "Talent Matching", description: "Shortlisting candidates who fit your technical and cultural profile." },
      { title: "Seamless Onboarding", description: "Integrating talent into your communication and dev cycles." }
    ],
    seo: {
      title: "Hire Senior Odoo Developers & Architects | Prixgen",
      metaDesc: "Scale your Odoo projects with dedicated, elite technical talent from Prixgen.",
    }
  },
  {
    slug: "iiot-telemetry",
    title: "IIoT & Telemetry Engineering",
    headline: "Unlocking Real-Time Intelligence from the Shop Floor.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", altText: "IIoT Engineering" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We bridge the gap between physical machinery and digital dashboards. Our IIoT architectures extract high-frequency telemetry data to enable predictive maintenance and real-time production visibility." }]
      }
    ],
    features: [
      { title: "Sensor Integration", description: "Connecting legacy machinery via industrial protocols (MQTT, OPC UA)." },
      { title: "Edge Computing", description: "Processing data locally for zero-latency machine control." },
      { title: "Predictive Analytics", description: "Identifying equipment failure before it causes downtime." },
      { title: "Custom Dashboards", description: "High-visibility production monitoring for plant managers." }
    ],
    process: [
      { title: "Field Survey", description: "Physical assessment of machinery and connectivity options." },
      { title: "Infrastructure Setup", description: "Deploying gateways, sensors, and secure edge devices." },
      { title: "Data Visualization", description: "Building the digital twin and real-time alerts." }
    ],
    seo: {
      title: "IIoT Engineering & Telemetry Solutions | Prixgen",
      metaDesc: "Extracting shop-floor intelligence through custom IIoT and telemetry architectures.",
    }
  },
  {
    slug: "automation",
    title: "Factory & Industrial Automation",
    headline: "Robotics and Intelligent Control Systems.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1000", altText: "Industrial Automation" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We design and deploy automated control systems that reduce human error and maximize production throughput in high-stakes manufacturing environments." }]
      }
    ],
    features: [
      { title: "Robotic Integration", description: "Deploying cobots and autonomous mobile robots (AMRs)." },
      { title: "PLC Programming", description: "Custom logic for complex industrial control systems." },
      { title: "Vision Systems", description: "AI-backed quality control and automated inspection." },
      { title: "HMI Design", description: "Intuitive interfaces for complex machine operations." }
    ],
    process: [
      { title: "Workflow Simulation", description: "Testing automation logic in a 3D digital environment." },
      { title: "Hardware Integration", description: "On-site installation and mechanical synchronization." },
      { title: "Stress Testing", description: "Validating systems under peak production loads." }
    ],
    seo: {
      title: "Industrial Automation & Robotics Systems | Prixgen",
      metaDesc: "Engineering intelligent factory automation and robotic control systems.",
    }
  },
  {
    slug: "cloud-infrastructure",
    title: "Managed Industrial Cloud Infrastructure",
    headline: "High-Availability Ecosystems for Mission-Critical Apps.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", altText: "Cloud Infrastructure" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We architect and manage secure, industrial-grade cloud environments optimized for ERP performance and data integrity. Zero operational friction, guaranteed uptime." }]
      }
    ],
    features: [
      { title: "Hybrid Cloud Architecture", description: "Combining on-premise security with cloud scalability." },
      { title: "Disaster Recovery", description: "Automated backups and zero-data-loss failover protocols." },
      { title: "Performance Tuning", description: "Optimizing database and application server latency." },
      { title: "Managed Security", description: "24/7 monitoring and threat detection for your infrastructure." }
    ],
    process: [
      { title: "Cloud Strategy", description: "Defining the right infrastructure for your workload needs." },
      { title: "Migration Execution", description: "Moving data and apps with zero downtime." },
      { title: "Performance Lifecycle", description: "Continuous monitoring and resource optimization." }
    ],
    seo: {
      title: "Industrial Cloud Hosting & Infrastructure | Prixgen",
      metaDesc: "Architecting high-availability cloud environments for Zero Operational Friction.",
    }
  }
];

export const servicesPageMockData: ServicesPageData = {
  title: "Enterprise Application Services",
  subtitle: "Architectural Services",
  heroSubheadline: "Prixgen Preferred Care: We traverse a stringent, economical, and customer-driven methodology to enable technical confidence and exact solutions.",
  methodology: [
    { step: "01", title: "Discover : We Listen", description: "We define and discuss your goals and challenges, helping you envision new, innovative ways to improve operational experiences.", icon: "Search" },
    { step: "02", title: "Design : We Strategize", description: "We design successful, outcomes-based learning and operational strategies tailored specifically to the needs of our enterprise partners.", icon: "PenTool" },
    { step: "03", title: "Develop : We Create", description: "We offer thoughtful, relevant, and engaging development services, crafting a technical solution that works best for your exact needs.", icon: "Code" }
  ],
  outcomes: [
    { title: "Increase Efficiency", description: "Automate day-to-day tasks, eliminate repetitive processes, and streamline cross-departmental workflows within a single platform.", icon: "Activity" },
    { title: "Promote Collaboration", description: "Break down data silos. Link remote teams, headquarters, and offshore units through secure internet, intranet, and IoT highways.", icon: "Users" },
    { title: "Accurate Forecasting", description: "Leverage centralized databases and advanced analytics to ensure data integrity and generate realistic, machine-learning-backed forecasts.", icon: "LineChart" },
    { title: "Lower Operational Costs", description: "Anticipate disruptions and manage impact effectively. Real-time data across production and supply chain keeps operating costs strictly within budget.", icon: "TrendingUp" },
    { title: "Data Security & Compliance", description: "Guard against breaches with single-warehouse access controls, while meeting myriad business requirements through built-in regulatory reporting.", icon: "ShieldCheck" },
    { title: "SaaS Advantages", description: "Scale effortlessly, access data anywhere, integrate existing apps, and eliminate maintenance downtime with a low capital outlay.", icon: "Server" }
  ],
  coreServices: [
    { title: "Business Strategy", headline: "Long-term value creation and optimization.", slug: "business-strategy" },
    { title: "IT Consulting", headline: "Aligning technology with enterprise goals.", slug: "it-consulting" },
    { title: "Accounting Advisory", headline: "Financial precision and compliance.", slug: "accounting-advisory" },
    { title: "Management Consulting", headline: "Operational excellence and efficiency.", slug: "management-consulting" },
    { title: "Supply Chain Consulting", headline: "End-to-end logistics optimization.", slug: "supply-chain-consulting" },
    { title: "WMS", headline: "Intelligent warehouse management systems.", slug: "wms" },
    { title: "Hiring Odoo Developers", headline: "Dedicated talent for Odoo ecosystems.", slug: "hiring-odoo-developers" },
    { title: "IIoT & Telemetry", headline: "Real-time shop-floor intelligence.", slug: "iiot-telemetry" },
    { title: "Factory Automation", headline: "Robotics and automated control systems.", slug: "automation" },
    { title: "Cloud Infrastructure", headline: "High-availability industrial cloud.", slug: "cloud-infrastructure" }
  ],
  seo: {
    title: "Services | Enterprise Application Services | Prixgen",
    metaDesc: "Prixgen Preferred Care methodology: Discover, Design, and Develop outcomes-based learning and operational strategies for modern industrial enterprises.",
  }
};
