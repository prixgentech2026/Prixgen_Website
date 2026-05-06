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
  industriesPageQuery,
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

export async function getServicesPageData() {
  if (!client) return servicesPageMockData;
  try {
    const data = await client.fetch(servicesPageQuery);
    if (!data) return servicesPageMockData;

    // Ensure we show all services even if Sanity only has a few
    const cleanCoreServices = (data.coreServices || []).filter((s: any) => s !== null);
    
    return {
      ...data,
      seo: data.seo || servicesPageMockData.seo,
      coreServices: cleanCoreServices.length >= servicesPageMockData.coreServices.length
        ? cleanCoreServices
        : servicesPageMockData.coreServices
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Services Page):', error);
    return servicesPageMockData;
  }
}

export async function getIndustriesPageData() {
  if (!client) return industriesPageMockData;
  try {
    const data = await client.fetch(industriesPageQuery);
    if (!data) return industriesPageMockData;

    // Ensure we show all industries even if Sanity only has a few
    const cleanCoreIndustries = (data.coreIndustries || []).filter((i: any) => i !== null);
    
    return {
      ...data,
      seo: data.seo || industriesPageMockData.seo,
      coreIndustries: cleanCoreIndustries.length >= industriesPageMockData.coreIndustries.length
        ? cleanCoreIndustries
        : industriesPageMockData.coreIndustries
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Industries Page):', error);
    return industriesPageMockData;
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

export interface IndustriesPageData {
  title: string;
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
  coreIndustries: {
    title: string;
    headline: string;
    slug: string;
    image?: string;
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
      children: [{ _type: 'span', text: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Powered by AI, GenAI, and IoT, our solutions fuse Odoo and SAP with proven industrial intelligence." }]
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
  address: "#244, Kalabairaweshwara Complex, 1st Stage, Nivedithanagar, Mysuru - 570022, Karnataka, India.",
  email: "info@prixgen.com",
  phone: "+91 (0821) 2548666",
  salesPhone: "+91 99300 57159",
  website: "https://www.prixgen.com",
  australiaAddress: "Unit 3 / 5 Murphy Street, Oconnor, Perth, WA 6163, Australia",
  australiaPhone: "08 9337 7907",
  australiaEmail: "info@prixgen.com.au",
  seo: {
    title: "Contact Us | Let's Transform Your Operations",
    metaDesc: "Connect with Prixgen Enterprise Headquarters in Mysuru to discuss your operational intelligence roadmap and ERP strategy.",
  }
};

export const industriesData: any[] = [
  {
    slug: "manufacturing",
    title: "Discrete & Process Manufacturing",
    headline: "Engineering the Smart Factory of the Future.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", altText: "Manufacturing" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop", altText: "Modern Industrial Facility" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Manufacturing is no longer just about physical production; it's about digital intelligence. We help discrete and process manufacturers transition to Industry 4.0 by integrating their shop-floor machinery with enterprise-grade ERP systems. Our solutions provide real-time visibility into production cycles, allowing for precise tracking of work-in-progress (WIP) and automated quality control." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in optimizing complex Bills of Materials (BOM) and routing logic, ensuring that your production planning is as efficient as possible. By implementing IIoT sensors and edge computing, we enable predictive maintenance that identifies equipment failure before it causes costly downtime. Our manufacturing architectures are designed for high-stakes environments where precision and uptime are the primary drivers of profitability." }]
      }
    ],
    features: [
      { title: "BOM Optimization", description: "Complex multi-level Bill of Materials management and costing." },
      { title: "Shop Floor Control", description: "Real-time production tracking and operator management." },
      { title: "Predictive Maintenance", description: "AI-backed monitoring to eliminate unplanned downtime." },
      { title: "Quality Assurance", description: "Automated inspection points throughout the production cycle." }
    ],
    process: [
      { title: "Floor Audit", description: "Physical assessment of production lines and data touchpoints." },
      { title: "Digital Integration", description: "Syncing shop-floor hardware with core ERP logic." },
      { title: "Performance Scaling", description: "Optimizing throughput through continuous data analysis." }
    ],
    seo: {
      title: "Industry 4.0 Manufacturing ERP Solutions | Prixgen",
      metaDesc: "Achieve Zero Operational Friction in manufacturing with integrated IIoT and ERP architectures.",
    }
  },
  {
    slug: "chemicals",
    title: "Chemicals & Process Manufacturing",
    headline: "Precision, Compliance, and Batch Intelligence.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1532187875605-1ef6c237f146?auto=format&fit=crop&q=80&w=1000", altText: "Chemical Industry" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6ad?q=80&w=2000&auto=format&fit=crop", altText: "Chemical Process Control" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Process manufacturing in the chemical industry demands zero-tolerance for error. We deploy architectures that natively handle complex batch management, strict regulatory compliance, and dynamic shelf-life tracking, eliminating fragmented legacy spreadsheets." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our chemical ERP solutions include integrated Quality Management Systems (QMS) that automatically enforce compliance checks at every stage of the production process. We provide real-time batch costing and yield analysis, helping you optimize resource utilization and reduce waste. With Prixgen, your chemical operations achieve a new level of technical precision and regulatory confidence." }]
      }
    ],
    features: [
      { title: "Batch Management", description: "Granular tracking of raw materials and finished goods by batch." },
      { title: "Regulatory Compliance", description: "Automated enforcement of industry standards and safety protocols." },
      { title: "Yield Analysis", description: "Real-time monitoring of production efficiency and waste reduction." },
      { title: "Shelf-Life Tracking", description: "Dynamic management of perishable and volatile chemical components." }
    ],
    process: [
      { title: "Compliance Audit", description: "Reviewing regulatory requirements and safety touchpoints." },
      { title: "Batch Logic Design", description: "Architecting the tracking and costing modules for your specific products." },
      { title: "System Validation", description: "Rigorous testing to ensure data integrity and compliance enforcement." }
    ],
    seo: {
      title: "Chemical ERP & Regulatory Compliance | Prixgen",
      metaDesc: "Precision ERP architectures for complex batch management and compliance.",
    }
  },
  {
    slug: "fmcg-distribution",
    title: "FMCG & Distribution",
    headline: "Velocity and Visibility in Consumer Goods.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=1000", altText: "FMCG" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop", altText: "FMCG Distribution Hub" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In the fast-moving consumer goods industry, latency is a liability. We deploy hyper-scalable supply chain architectures that optimize inventory routing, accelerate fulfillment, and protect profit margins from procurement to delivery. Our FMCG solutions are built to handle the complexity of high-volume, multi-channel distribution with zero-fault accuracy." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "By integrating real-time demand forecasting with your procurement cycle, we ensure you maintain optimal stock levels across all distribution hubs. Our warehouse management modules are optimized for the high-velocity picking and packing required in the FMCG sector, while our logistics tracking provides end-to-end visibility into every shipment. With Prixgen, your supply chain becomes a high-speed engine of growth." }]
      }
    ],
    features: [
      { title: "Demand Forecasting", description: "Machine-learning backed inventory planning for high-volume SKUs." },
      { title: "Omnichannel Sync", description: "Unified inventory across retail, e-commerce, and wholesale." },
      { title: "Automated Fulfillment", description: "High-speed picking and packing workflows for distribution centers." },
      { title: "Margin Protection", description: "Real-time tracking of procurement costs and logistics overhead." }
    ],
    process: [
      { title: "Supply Chain Mapping", description: "Identifying latency points in your current distribution network." },
      { title: "System Engineering", description: "Deploying high-velocity inventory and fulfillment architectures." },
      { title: "Visibility Rollout", description: "Implementing real-time tracking for stakeholders across the chain." }
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
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000", altText: "Retail" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Modern retail is no longer just about the storefront; it's about a unified omnichannel experience. We help retailers transform legacy operations into synchronized digital ecosystems where inventory, customer data, and financial reporting are all linked in real-time. Our solutions ensure that whether a customer buys in-store, online, or via mobile, the experience and data remain consistent." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in integrating complex point-of-sale (POS) systems with back-end ERPs, providing a 'single pane of glass' view into your entire retail operation. This integration enables advanced features like click-and-collect, cross-store returns, and real-time loyalty program management. Our retail architectures are designed to help you scale your store count and digital presence with zero operational friction." }]
      }
    ],
    features: [
      { title: "Unified Inventory", description: "Real-time stock visibility across all physical and digital channels." },
      { title: "POS Integration", description: "Deep syncing of storefront sales with back-end financial systems." },
      { title: "Loyalty Management", description: "Personalized customer experiences and reward tracking." },
      { title: "Click-and-Collect", description: "Automated workflows for modern consumer fulfillment models." }
    ],
    process: [
      { title: "Channel Audit", description: "Assessing current performance across physical and digital storefronts." },
      { title: "Unified Design", description: "Architecting the central data hub for all retail operations." },
      { title: "Experience Deployment", description: "Rolling out synchronized features to staff and customers." }
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
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1550583760-d80392be8c42?auto=format&fit=crop&q=80&w=1000", altText: "Dairy Industry" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The dairy and perishable industry operates on an extreme clock where minutes can impact product safety and profit margins. We implement specialized cold-chain ERP tracking and routing modules designed for this level of time-sensitivity. Our solutions ensure that every batch is tracked from farm to shelf, with integrated temperature monitoring and shelf-life alerts." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our perishable-specific routing logic optimizes delivery paths to ensure maximum freshness and minimum waste. We integrate batch-level financial tracking, allowing you to monitor margins on a granular level and identify any leakage in your cold chain. With Prixgen, you gain the technical precision needed to lead in the complex perishables market." }]
      }
    ],
    features: [
      { title: "Cold-Chain Tracking", description: "Integrated temperature and location monitoring for perishables." },
      { title: "Batch-Level Margin", description: "Tracking profitability for every specific production lot." },
      { title: "Freshness Alerts", description: "Automated notifications for items nearing shelf-life limits." },
      { title: "Specialized Routing", description: "Time-optimized logistics for perishable distribution." }
    ],
    process: [
      { title: "Chain Assessment", description: "Physical audit of temperature control and tracking points." },
      { title: "Module Customization", description: "Configuring ERP logic for perishable-specific workflows." },
      { title: "Integrity Rollout", description: "Implementing end-to-end monitoring for quality assurance." }
    ],
    seo: {
      title: "Dairy & Perishable Supply Chain ERP | Prixgen",
      metaDesc: "Specialized cold-chain tracking and time-critical supply chain modules for the dairy industry.",
    },
  },
  {
    slug: "information-services",
    title: "Information Services",
    headline: "Digital Infrastructure and Enterprise Software.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000", altText: "Information Services" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In the information age, data is the most valuable asset. We architect high-availability digital infrastructures that allow information-heavy enterprises to process, secure, and monetize their data assets. Our solutions focus on eliminating data silos and creating a unified digital core that supports rapid innovation and global scale." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "From managing complex software-as-a-service (SaaS) environments to deploying enterprise-wide knowledge management systems, we provide the technical depth required to lead in the information sector. Our architectures are designed for high throughput and zero-latency access, ensuring that your teams have the intelligence they need, exactly when they need it." }]
      }
    ],
    features: [
      { title: "Data Core Sync", description: "Unifying fragmented data sources into a single source of truth." },
      { title: "SaaS Governance", description: "Optimizing software ecosystems for maximum ROI and performance." },
      { title: "Knowledge Management", description: "Intelligent systems for capturing and sharing enterprise intelligence." },
      { title: "Scalable Infrastructure", description: "Cloud-native architectures built for high-growth digital environments." }
    ],
    process: [
      { title: "Data Audit", description: "Identifying silos and security vulnerabilities in your digital stack." },
      { title: "Architecture Blueprint", description: "Designing the unified digital core for your enterprise." },
      { title: "Scale Deployment", description: "Rolling out the new infrastructure with zero downtime." }
    ],
    seo: {
      title: "Enterprise Information Services & Data Architecture | Prixgen",
      metaDesc: "Architecting high-availability digital cores for information-heavy enterprise leaders.",
    }
  },
  {
    slug: "electronics",
    title: "Electronics",
    headline: "High-Precision Engineering and Assembly.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000", altText: "Electronics" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The electronics industry demands a level of precision and supply chain agility that traditional systems often fail to deliver. We implement specialized ERP architectures that handle micro-BOM management, complex component sourcing, and high-velocity assembly lines. Our solutions provide end-to-end traceability for every component, ensuring quality and compliance in a fast-moving market." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "By integrating real-time shop-floor data with procurement and inventory modules, we help electronics manufacturers minimize waste and optimize their production cycles. Our architectures support advanced manufacturing techniques like surface-mount technology (SMT) and automated optical inspection (AOI), providing the visibility needed to maintain high yields and competitive margins. With Prixgen, your electronics operations achieve the technical precision required for global leadership." }]
      }
    ],
    features: [
      { title: "Micro-BOM Management", description: "Handling thousands of components with absolute precision and costing." },
      { title: "Component Traceability", description: "End-to-end tracking from raw material to finished electronic unit." },
      { title: "SMT Integration", description: "Direct syncing of assembly line machinery with enterprise dashboards." },
      { title: "Global Sourcing Sync", description: "Managing complex vendor networks and lead times in real-time." }
    ],
    process: [
      { title: "Engineering Audit", description: "Reviewing assembly line data points and BOM complexity." },
      { title: "Logic Customization", description: "Tailoring ERP modules for electronics-specific workflows." },
      { title: "Precision Deployment", description: "Rolling out the synchronized system across the production floor." }
    ],
    seo: {
      title: "Electronics Manufacturing ERP & Supply Chain | Prixgen",
      metaDesc: "High-precision ERP architectures for electronics assembly and component traceability.",
    }
  }
];

export const solutionsData: any[] = [
  {
    slug: "odoo-enterprise",
    title: "Odoo Enterprise Integration",
    headline: "Odoo Architecture, Engineered for Scale.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Odoo ERP" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "As a certified Odoo Gold Partner, we don't just install software; we engineer complex operational engines. We specialize in high-stakes Odoo Enterprise migrations and greenfield implementations for multi-national organizations. Our approach focuses on minimal customization of the core, ensuring long-term maintainability while delivering maximum functional depth." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "From multi-warehouse inventory routing to automated global procurement and localized financial reporting, we turn Odoo into an uncompromising enterprise engine. Our elite team of developers and consultants ensures that every module is optimized for performance, providing your team with the real-time data needed to make decisive business moves." }]
      }
    ],
    features: [
      { title: "Multi-Entity Consolidation", description: "Seamless financial and operational syncing across global subsidiaries." },
      { title: "Advanced WMS", description: "AI-optimized warehouse routing and real-time inventory tracking." },
      { title: "Automated Procurement", description: "Smart reordering rules and vendor management integration." },
      { title: "Custom BI Dashboards", description: "Tailored reporting engines for executive-level decision making." }
    ],
    process: [
      { title: "GAP Analysis", description: "Detailed mapping of business requirements against Odoo standards." },
      { title: "Architectural Design", description: "Designing the data flows and integration touchpoints." },
      { title: "Agile Deployment", description: "Phased rollout with continuous feedback and optimization." }
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
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000", altText: "SAP Solutions" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We guide mid-market and enterprise clients through the complexities of SAP Business One and S/4HANA deployments. Our methodology begins with a Phase-Zero architectural audit, identifying hidden inefficiencies in your current stack before a single line of code is moved. We focus on creating a 'clean core' that allows for rapid scaling and easy integration with external systems." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Whether you are migrating from legacy systems or optimizing an existing SAP environment, our consultants bring decades of industrial expertise to the table. We ensure that your SAP ecosystem aligns perfectly with your long-term operational strategy, providing the stability and visibility required for global industrial leadership." }]
      }
    ],
    features: [
      { title: "SAP S/4HANA Migration", description: "Secure and optimized transition to the latest SAP core." },
      { title: "Architectural Audits", description: "Phase-zero assessments to identify scaling bottlenecks." },
      { title: "Inter-company Sync", description: "Unified data flow across complex corporate structures." },
      { title: "Compliance Mapping", description: "Ensuring global regulatory standards are natively enforced." }
    ],
    process: [
      { title: "Strategic Audit", description: "Deep-dive into current operational gaps and data silos." },
      { title: "Blueprint Engineering", description: "Developing the technical roadmap for your SAP ecosystem." },
      { title: "Managed Rollout", description: "Carefully orchestrated implementation with zero business disruption." }
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
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=1000", altText: "Dynamics 365" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Break down data silos and modernize your business with Microsoft Dynamics 365. We deploy intelligent cloud applications that unify financial management, supply chain operations, and customer insights into a single pane of glass. Our solutions leverage the full power of the Microsoft Power Platform, including Power BI and Power Automate, to create a truly connected enterprise." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in tailoring Dynamics 365 Business Central and F&O for industrial environments, ensuring that your field service, sales, and manufacturing teams are all working from a single source of truth. With Prixgen, your Microsoft ecosystem becomes a driver of innovation, providing the agility needed to respond to changing market demands." }]
      }
    ],
    features: [
      { title: "Power Platform Sync", description: "Deep integration with Power BI, Apps, and Automate." },
      { title: "Unified CRM & ERP", description: "Seamless data flow between customer facing and back-end teams." },
      { title: "Cloud Architecture", description: "Scalable, secure, and always-on enterprise environment." },
      { title: "Predictive Analytics", description: "Leveraging Azure AI for demand and financial forecasting." }
    ],
    process: [
      { title: "Ecosystem Mapping", description: "Evaluating current Microsoft 365 usage and integration points." },
      { title: "Tailored Architecture", description: "Building the custom modules and data flows for your industry." },
      { title: "Success Rollout", description: "Comprehensive training and phased deployment for maximum adoption." }
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
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000", altText: "Lecca AI" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Lecca is our proprietary AI platform designed specifically for industrial environments. We use advanced computer vision to automate quality control, safety monitoring, and asset tracking. By processing visual data at the edge, Lecca provides real-time alerts that prevent accidents and ensure that every product leaving your facility meets the highest standards." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our AI models are trained on hundreds of thousands of industrial data points, making them highly resilient to the challenging lighting and environmental conditions of a factory floor. Lecca integrates directly with your core ERP, turning visual observations into actionable data points for your management team. Experience the next generation of industrial intelligence with Lecca." }]
      }
    ],
    features: [
      { title: "Automated QC", description: "Visual inspection at production speed with zero-error tolerance." },
      { title: "Safety Monitoring", description: "Real-time detection of PPE compliance and hazardous conditions." },
      { title: "Asset Tracking", description: "AI-powered identification and location tracking of industrial assets." },
      { title: "Edge Processing", description: "Low-latency analysis performed directly on-site for immediate action." }
    ],
    process: [
      { title: "Vision Audit", description: "Identifying high-value automation points on your production line." },
      { title: "Model Training", description: "Developing custom AI models for your specific product or environment." },
      { title: "Hardware Sync", description: "Deploying cameras and edge computing units for live monitoring." }
    ],
    seo: {
      title: "Lecca Industrial AI & Computer Vision | Prixgen",
      metaDesc: "Automate quality control and safety with Lecca's proprietary industrial AI platform.",
    }
  },
  {
    slug: "warehouse-management",
    title: "Warehouse Management",
    headline: "Intelligent Inventory and Fulfillment Automation.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000", altText: "Warehouse Management Systems" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop", altText: "Warehouse Efficiency" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Eliminate manual errors and optimize warehouse space with our intelligent WMS architectures. Prixgen's WMS solutions provide zero-latency visibility into every SKU in your facility, enabling real-time inventory tracking and automated fulfillment routes. We design systems that handle the complexity of high-volume, multi-channel distribution with ease." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our intelligent picking algorithms minimize travel time for warehouse staff, while automated slotting optimization ensures that your high-velocity items are always in the most accessible locations. We integrate seamlessly with your existing ERP, ensuring that your physical inventory and digital records are always perfectly in sync, eliminating the 'ghost stock' issues that plague traditional warehouses." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Beyond software, we provide the technical expertise to deploy modern hardware—from RFID systems to mobile data terminals—that empowers your workforce. With a Prixgen-designed WMS, your warehouse becomes a high-performance hub that accelerates your entire supply chain." }]
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
      title: "Enterprise Warehouse Management Systems (WMS) | Prixgen",
      metaDesc: "Next-generation warehouse management systems for intelligent inventory and fulfillment.",
    }
  }
];

export const servicesData: any[] = [
  {
    slug: "business-strategy",
    title: "Business Strategy & Transformation",
    headline: "Architecting Long-term Value and Market Leadership.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Business Transformation" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop", altText: "Modernizing Enterprise Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In an era of unprecedented digital disruption, a static business strategy is no longer viable. We partner with enterprise leaders to redefine their operational models, identifying high-impact opportunities for digital transformation and sustainable growth. Our approach goes beyond simple efficiency gains; we focus on building resilient business architectures that can adapt to rapid market shifts while maintaining high margins and customer loyalty." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our strategic framework is built on three pillars: Operational Agility, Technical Excellence, and Market Innovation. By conducting deep-dive audits of your existing value chain, we pinpoint bottlenecks that hinder growth and replace them with streamlined, automated workflows. This transformation ensures that your organization remains competitive in a global economy that rewards speed and precision." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We don't just provide a roadmap; we govern the entire implementation process. From aligning executive vision to ensuring front-line adoption, our consultants work side-by-side with your teams to deliver measurable ROI. Whether you are looking to enter new markets or optimize your core operations, Prixgen provides the strategic clarity needed to achieve market leadership." }]
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
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop", altText: "IT Strategy Session" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "A company's technology should accelerate its strategy, not constrain it. Our IT and Management Consulting services are designed to bridge the gap between technical infrastructure and business objectives. We conduct deep architectural audits to identify workflow bottlenecks, eliminate technical debt, and build a modern roadmap for digital transformation that scales with your growth." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In today's complex technical landscape, choosing the right stack is critical. We assist organizations in navigating the myriad of software and hardware options, ensuring that every investment delivers long-term value. Our expertise spans legacy system modernization, hybrid cloud migrations, and the implementation of high-velocity DevOps cultures that reduce time-to-market for your internal applications." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Security and compliance are integrated into everything we do. Beyond optimization, we ensure your IT infrastructure is hardened against modern threats and compliant with global data regulations. With Prixgen as your consulting partner, your technology becomes a powerful engine for innovation rather than a maintenance burden." }]
      }
    ],
    features: [
      { title: "Enterprise Architecture Audit", description: "Deep-dive assessment of your current technical debt, system bottlenecks, and scalability potential." },
      { title: "Legacy System Modernization", description: "Seamless migration of mission-critical workflows from aging infrastructure to high-velocity cloud stacks." },
      { title: "Strategic Tech-Stack Governance", description: "Expert guidance on software selection and license optimization to ensure maximum ROI on IT spend." },
      { title: "Cybersecurity Hardening", description: "Comprehensive vulnerability mapping and implementation of zero-trust security frameworks." },
      { title: "Cloud Infrastructure Strategy", description: "Designing resilient, auto-scaling hybrid cloud environments for industrial-scale operations." }
    ],
    process: [
      { title: "Discovery & Technical Audit", description: "We conduct an exhaustive review of your existing hardware, software assets, and team workflows." },
      { title: "Strategic Design & Gap Analysis", description: "Developing a phased modernization roadmap that aligns technical capabilities with business growth goals." },
      { title: "Governance & Continuous Optimization", description: "Providing ongoing oversight and technical advisory to ensure your architecture evolves with market demands." }
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
        children: [{ _type: 'span', text: "Modern enterprises require real-time financial visibility to make informed decisions at the speed of the market. We deploy integrated accounting architectures that ensure multi-currency compliance, automated reconciliation, and machine-learning backed financial forecasting. Our advisory services go beyond record-keeping; we turn your financial data into a strategic asset." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Managing complex global corporate groups requires a unified financial view. We specialize in multi-entity consolidation and tax compliance across different jurisdictions, reducing the risk of regulatory friction. By automating high-frequency financial tasks, we free your finance team to focus on high-value analysis and strategic capital allocation." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our systems are designed for maximum audit-readiness and transparency. With Prixgen, you gain a robust financial foundation that supports rapid scaling and provides stakeholders with the technical confidence they demand. We ensure your financial stack is as sophisticated as your business goals." }]
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
        children: [{ _type: 'span', text: "We optimize your human and technical capital by re-engineering core business processes for maximum efficiency and zero operational friction. Our management consulting practice is built on the principle that operational excellence is the foundation of market leadership. We work with you to eliminate organizational silos and create a culture of continuous improvement." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our process engineering approach identifies 'hidden' costs in your current workflows—manual tasks, redundant approvals, and communication gaps—and replaces them with lean, automated alternatives. We don't just recommend changes; we help you navigate the complex change management required to ensure these new processes stick and deliver long-term value." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "By defining and tracking the right KPIs, we provide your leadership team with a clear view of operational performance. Whether you are scaling a startup or modernizing a legacy enterprise, Prixgen ensures your management structure is lean, agile, and perfectly aligned with your strategic vision." }]
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
        children: [{ _type: 'span', text: "In a global economy where disruptions are the new normal, your supply chain is your competitive edge. We architect resilient, high-velocity logistics networks that reduce latency and protect margins. Our consultants bring deep expertise in network design, supplier governance, and real-time logistics analytics to ensure your physical products move as fast as your digital data." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We help organizations optimize their inventory levels, reducing carrying costs without sacrificing service levels. By implementing advanced demand forecasting and supply chain visibility tools, we enable you to anticipate disruptions and react with agility. Our network design services ensure your warehouse and distribution hubs are located for maximum efficiency and minimum transportation costs." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Integrating your supply chain into your core ERP and WMS is essential for end-to-end transparency. Prixgen provides the technical bridge needed to sync your physical operations with your digital strategy, resulting in a supply chain that is not just a cost center, but a driver of profitability." }]
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
    slug: "warehouse-management",
    title: "Warehouse Management Systems (WMS)",
    headline: "Intelligent Inventory and Fulfillment Automation.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000", altText: "Warehouse Management Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Eliminate manual errors and optimize warehouse space with our intelligent WMS architectures. Prixgen's WMS solutions provide zero-latency visibility into every SKU in your facility, enabling real-time inventory tracking and automated fulfillment routes. We design systems that handle the complexity of high-volume, multi-channel distribution with ease." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our intelligent picking algorithms minimize travel time for warehouse staff, while automated slotting optimization ensures that your high-velocity items are always in the most accessible locations. We integrate seamlessly with your existing ERP, ensuring that your physical inventory and digital records are always perfectly in sync, eliminating the 'ghost stock' issues that plague traditional warehouses." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Beyond software, we provide the technical expertise to deploy modern hardware—from RFID systems to mobile data terminals—that empowers your workforce. With a Prixgen-designed WMS, your warehouse becomes a high-performance hub that accelerates your entire supply chain." }]
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
        children: [{ _type: 'span', text: "Finding elite Odoo talent is one of the biggest challenges in digital transformation. We provide access to our pre-vetted pool of senior Odoo developers and architects who have built complex enterprise systems across multiple industries. Our talent services are designed to scale your technical capacity instantly, providing the expertise needed to accelerate your digital roadmap." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our developers are more than just coders; they are business-aware architects who understand how Odoo's core modules interact with your operational goals. Whether you need custom module development, complex API integrations, or database performance tuning, our dedicated talent integrates seamlessly with your internal teams, following your DevOps and communication protocols." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We handle the entire vetting and onboarding process, ensuring that the developers we provide have the exact technical and cultural profile your project demands. With Prixgen's dedicated Odoo talent, you eliminate the overhead of traditional hiring and gain immediate access to technical excellence." }]
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
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop", altText: "Industrial Data Intelligence" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The future of manufacturing lies in the bridge between physical machinery and digital intelligence. Our IIoT and Telemetry Engineering services extract high-frequency data from your shop floor, transforming raw machine signals into actionable insights. We design secure, scalable architectures that enable predictive maintenance and provide real-time production visibility." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in connecting legacy machinery via modern industrial protocols like MQTT and OPC UA, ensuring that your entire plant is integrated into your digital dashboard. By utilizing edge computing, we process critical machine data locally, enabling zero-latency control systems and reducing the bandwidth required for cloud-based analytics. Our custom dashboards provide plant managers with a 360-degree view of production health." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Predictive maintenance is no longer a luxury; it is a necessity for protecting your equipment ROI. Our systems identify potential failures before they result in costly downtime, allowing you to schedule repairs during planned maintenance windows. With Prixgen's IIoT engineering, your factory floor becomes a data-driven engine of efficiency." }]
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
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop", altText: "Advanced Robotics" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We design and deploy automated control systems that reduce human error and maximize production throughput in high-stakes manufacturing environments. From robotic arm integration to complete assembly line automation, our engineering team builds the intelligent systems that drive the modern factory. We focus on zero-fault logic and high-speed execution." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our expertise includes the deployment of Collaborative Robots (cobots) and Autonomous Mobile Robots (AMRs) that work safely alongside your human workforce. We provide custom PLC programming and HMI design, ensuring that your operators have intuitive, powerful control over complex machine operations. Our AI-backed vision systems enable high-precision quality control and automated inspection, reducing scrap and increasing yields." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We utilize advanced 3D simulation to validate automation logic before a single machine is moved on the factory floor. This 'Digital Twin' approach reduces commissioning time and ensures that your automation project delivers the projected ROI from day one. Prixgen is your partner in engineering the future of autonomous manufacturing." }]
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
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop", altText: "Secure Cloud Ecosystem" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Prixgen architects and manages secure, industrial-grade cloud environments optimized for ERP performance and data integrity. We understand that for an industrial enterprise, downtime is not just an inconvenience—it's a massive financial loss. That's why our infrastructure is built for high-availability, with zero-data-loss failover and automated disaster recovery protocols." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our hybrid cloud architectures allow you to maintain the security of on-premise data while leveraging the scalability and performance of the public cloud. We perform continuous performance tuning, optimizing your database and application servers to ensure that your mission-critical apps run with zero latency. Our 24/7 managed security service provides proactive threat detection and mitigation, keeping your industrial data safe from modern cyber threats." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "With Prixgen managing your cloud infrastructure, your technical team is free to focus on innovation instead of server maintenance. We provide a stable, high-performance ecosystem that supports your entire digital transformation roadmap, ensuring that your technical foundation is as strong as your business strategy." }]
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
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    headline: "Empower your enterprise with predictive analytics and generative AI.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", altText: "AI & Machine Learning" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop", altText: "Enterprise Intelligence" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Artificial Intelligence and Machine Learning are no longer buzzwords; they are essential tools for gaining a competitive edge. We help organizations harness the power of AI to drive data-backed decision making, automate repetitive tasks, and unlock new revenue streams. From predictive analytics to natural language processing and generative AI, we build models that solve real-world industrial problems." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our approach integrates AI directly into your existing enterprise architecture. Whether you need an intelligent supply chain forecasting model, an automated customer support agent, or deep visual inspection algorithms on the factory floor, our data scientists and engineers deploy solutions that deliver measurable ROI." }]
      }
    ],
    features: [
      { title: "Predictive Analytics", description: "Anticipating market trends, demand shifts, and equipment failures." },
      { title: "Generative AI", description: "Automating content, code, and reporting workflows." },
      { title: "Computer Vision", description: "High-precision automated inspection and safety monitoring." },
      { title: "Data Integration", description: "Feeding AI models with clean, structured data from your ERP." }
    ],
    process: [
      { title: "Data Audit", description: "Assessing the quality and structure of your enterprise data." },
      { title: "Model Training", description: "Developing and refining AI algorithms tailored to your use case." },
      { title: "Enterprise Deployment", description: "Integrating AI seamlessly into your operational workflows." }
    ],
    seo: {
      title: "AI & Machine Learning Solutions | Prixgen",
      metaDesc: "Drive innovation and efficiency with enterprise-grade predictive analytics and Generative AI.",
      keywords: ["AI", "Machine Learning", "Generative AI", "Predictive Analytics", "Computer Vision"]
    }
  },
  {
    slug: "business-transformation",
    title: "Business Transformation",
    headline: "Comprehensive digital transformation strategies to modernize legacy systems.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Business Transformation" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop", altText: "Modernizing Enterprise Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "True digital transformation requires more than just upgrading software; it demands a fundamental shift in how your organization operates. We partner with executive teams to design and execute comprehensive transformation strategies that modernize legacy systems, optimize cross-functional workflows, and build scalable, future-proof operations." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our holistic approach covers every aspect of transformation: technology architecture, process re-engineering, and cultural change management. We identify high-impact areas where digital tools can eliminate friction, reduce costs, and enhance the customer experience, ensuring that your enterprise remains agile and competitive in a rapidly evolving market." }]
      }
    ],
    features: [
      { title: "Legacy Modernization", description: "Seamless transition from outdated systems to modern cloud architectures." },
      { title: "Process Re-engineering", description: "Redesigning workflows for maximum efficiency and automation." },
      { title: "Change Management", description: "Guiding your teams through cultural and operational shifts." },
      { title: "Strategic Roadmap", description: "Phased implementation plans aligned with your business objectives." }
    ],
    process: [
      { title: "Strategic Discovery", description: "Aligning transformation goals with your core business vision." },
      { title: "Architecture Design", description: "Mapping out the new technological and operational ecosystem." },
      { title: "Agile Execution", description: "Iterative rollout with continuous measurement and refinement." }
    ],
    seo: {
      title: "Digital Business Transformation | Prixgen",
      metaDesc: "Modernize legacy systems and optimize operations with holistic transformation strategies.",
      keywords: ["Business Transformation", "Digital Strategy", "Legacy Modernization", "Process Re-engineering"]
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
    { title: "WMS", headline: "Intelligent warehouse management systems.", slug: "warehouse-management" },
    { title: "Hiring Odoo Developers", headline: "Dedicated talent for Odoo ecosystems.", slug: "hiring-odoo-developers" },
    { title: "IIoT & Telemetry", headline: "Real-time shop-floor intelligence.", slug: "iiot-telemetry" },
    { title: "Factory Automation", headline: "Robotics and automated control systems.", slug: "automation" },
    { title: "Cloud Infrastructure", headline: "High-availability industrial cloud.", slug: "cloud-infrastructure" },
    { title: "AI & Machine Learning", headline: "Empower your enterprise with predictive analytics and generative AI.", slug: "ai-machine-learning" },
    { title: "Business Transformation", headline: "Comprehensive digital transformation strategies to modernize legacy systems.", slug: "business-transformation" }
  ],
  seo: {
    title: "Services | Enterprise Application Services | Prixgen",
    metaDesc: "Prixgen Preferred Care methodology: Discover, Design, and Develop outcomes-based learning and operational strategies for modern industrial enterprises.",
  }
};

export const industriesPageMockData: IndustriesPageData = {
  title: "Transforming Global Industries",
  heroSubheadline: "We architect resilient, data-driven ecosystems across the world's most demanding industrial sectors.",
  methodology: [
    { step: "01", title: "Analyze : Industrial Audit", description: "We conduct deep-dive technical audits of your existing shop-floor and supply chain workflows.", icon: "Search" },
    { step: "02", title: "Architect : Digital Core", description: "We design high-availability digital cores that unify legacy hardware with modern cloud intelligence.", icon: "PenTool" },
    { step: "03", title: "Automate : Scale Operations", description: "We deploy autonomous systems and AI models that drive measurable throughput and efficiency.", icon: "Settings" }
  ],
  outcomes: [
    { title: "Zero Operational Friction", description: "Eliminate data silos and manual bottlenecks across your global production network.", icon: "Zap" },
    { title: "Predictive Intelligence", description: "Shift from reactive repairs to predictive maintenance using shop-floor telemetry.", icon: "LineChart" },
    { title: "High-Precision Costing", description: "Gain absolute visibility into batch-level profitability and resource utilization.", icon: "BarChart3" },
    { title: "Regulatory Confidence", description: "Automated compliance reporting and end-to-end traceability for every unit.", icon: "ShieldCheck" },
    { title: "Supply Chain Resilience", description: "Anticipate disruptions with real-time demand sensing and inventory optimization.", icon: "Network" },
    { title: "Rapid Modernization", description: "Transform legacy factories into smart facilities with minimal operational downtime.", icon: "Factory" }
  ],
  coreIndustries: [
    { title: "Manufacturing", headline: "Industry 4.0 Smart Factories.", slug: "manufacturing", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
    { title: "Chemicals", headline: "Precision Batch Intelligence.", slug: "chemicals", image: "https://images.unsplash.com/photo-1532187875605-1ef6c237f146?auto=format&fit=crop&q=80&w=1000" },
    { title: "FMCG", headline: "High-Velocity Distribution.", slug: "fmcg-distribution", image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=1000" },
    { title: "Information Services", headline: "Digital Infrastructure & Data.", slug: "information-services", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" },
    { title: "Electronics", headline: "High-Precision Engineering.", slug: "electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" }
  ],
  seo: {
    title: "Industries | Enterprise Digital Transformation | Prixgen",
    metaDesc: "Discover how Prixgen architects operational intelligence for Manufacturing, Chemicals, FMCG, and high-precision Electronics.",
  }
};
