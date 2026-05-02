import { client } from '@/sanity/lib/client';
import { 
  homeQuery, 
  industryBySlugQuery, 
  solutionBySlugQuery, 
  serviceBySlugQuery,
  industriesQuery,
  solutionsQuery,
  servicesQuery,
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
  if (!client) return servicesData;
  try {
    const data = await client.fetch(servicesQuery);
    return data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : servicesData;
  } catch (error) {
    console.error('Sanity Fetch Error (Services):', error);
    return servicesData;
  }
}

export async function getServiceBySlug(slug: string) {
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
  stats: [
    { label: "Years Experience", value: "30+" },
    { label: "Implementations", value: "500+" },
    { label: "Architect Team", value: "Elite" },
    { label: "Odoo Partner", value: "Gold" },
  ],
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

export const servicesData: PageData[] = [
  {
    slug: "it-consulting",
    title: "IT & Management Consulting",
    headline: "Aligning Technology with Business Strategy.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "A company's technology should accelerate its strategy, not constrain it. We conduct deep architectural audits to identify workflow bottlenecks, eliminate technical debt, and build a modern roadmap for digital transformation." }]
      }
    ],
    seo: {
      title: "Strategic IT & Management Consulting | Prixgen",
      metaDesc: "Aligning technology with business strategy through deep architectural audits.",
    }
  },
  {
    slug: "supply-chain-wms",
    title: "Supply Chain & WMS Consulting",
    headline: "Next-Generation Warehouse Automation.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Shaping the future of automation. We provide end-to-end warehousing operations consulting, helping you reduce inventory holding costs while dramatically improving order accuracy and fulfillment speed." }]
      }
    ],
    seo: {
      title: "Supply Chain & WMS Consulting | Prixgen",
      metaDesc: "End-to-end warehousing operations consulting and automation strategies.",
    }
  },
  {
    slug: "iiot-engineering",
    title: "IIoT & Engineering Services",
    headline: "The Industrial Internet of Things.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Manage millions of IIoT device connections. We build custom engineering solutions that extract telemetry data from legacy hardware, open new revenue streams, and enable predictive maintenance models." }]
      }
    ],
    seo: {
      title: "IIoT Engineering & Predictive Maintenance | Prixgen",
      metaDesc: "Extracting telemetry from legacy hardware to enable predictive maintenance.",
    }
  },
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure & Managed Hosting",
    headline: "High-Availability Cloud Environments.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Heterogeneous IT environments create operational drag. We architect, host, and manage scalable cloud architectures, resolving latency and standardizing processes so your enterprise can exceed its SLAs with zero operational friction." }]
      }
    ],
    seo: {
      title: "Managed Cloud Hosting & Infrastructure | Prixgen",
      metaDesc: "Architecting high-availability cloud environments for Zero Operational Friction.",
    }
  }
];
