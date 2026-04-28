/**
 * Local Mock Data Store for Prixgen Enterprise.
 * Centralized content for a CMS-independent development workflow.
 * Standard: Tier-1 Global Consultancy (Elevated Copy).
 */

export interface SEOData {
  title: string;
  metaDesc: string;
}

export interface PageData {
  slug: string;
  title: string;
  headline: string;
  content: string;
  seo: SEOData;
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
}

export const homeData = {
  title: "Intelligent Operations. Unified Enterprise.",
  subheadline: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Built on Odoo, SAP, and proven industrial intelligence.",
  heroPrimaryCTA: "Schedule an Architecture Audit",
  heroSecondaryCTA: "Read the 2026 Manufacturing Benchmark",
  socialProof: "Trusted by leading industrial operators across APAC and Australia to process billions in supply chain volume.",
  seo: {
    title: "Prixgen | Enterprise ERP Architecture & Strategy",
    metaDesc: "Architecting unified enterprise ecosystems for global industrial leaders through Odoo, SAP, and IIoT integration.",
  }
};

export const industriesData: PageData[] = [
  {
    slug: "manufacturing",
    title: "Advanced Manufacturing",
    headline: "Engineered for the Factory of the Future.",
    content: "<p>We architect unified ERP and IIoT ecosystems that connect shop-floor machinery directly to top-floor financial dashboards. Eliminate data silos, optimize production scheduling, and achieve real-time visibility across global manufacturing hubs.</p>",
    seo: {
      title: "Advanced Manufacturing ERP & IIoT | Prixgen",
      metaDesc: "Architecting unified ERP and IIoT ecosystems for the factory of the future.",
    }
  },
  {
    slug: "chemicals",
    title: "Chemicals & Process Manufacturing",
    headline: "Precision, Compliance, and Batch Intelligence.",
    content: "<p>Process manufacturing demands zero-tolerance for error. We deploy architectures that natively handle complex batch management, strict regulatory compliance, and dynamic shelf-life tracking, eliminating fragmented legacy spreadsheets.</p>",
    seo: {
      title: "Chemical ERP & Regulatory Compliance | Prixgen",
      metaDesc: "Precision ERP architectures for complex batch management and chemical compliance.",
    }
  },
  {
    slug: "fmcg-distribution",
    title: "Consumer Goods & Distribution (FMCG)",
    headline: "Velocity and Visibility in Consumer Goods.",
    content: "<p>In FMCG, latency is a liability. We deploy hyper-scalable supply chain architectures that optimize inventory routing, accelerate fulfillment, and protect profit margins from procurement to delivery.</p>",
    seo: {
      title: "FMCG Supply Chain & WMS Solutions | Prixgen",
      metaDesc: "Optimize inventory routing and accelerate fulfillment with Prixgen's FMCG architectures.",
    }
  },
  {
    slug: "retail",
    title: "Retail Operations",
    headline: "Omnichannel Retail Architecture.",
    content: "<p>Transform legacy retail operations into unified omnichannel experiences. We integrate complex point-of-sale systems with back-end ERPs to provide real-time inventory visibility and synchronized financial reporting.</p>",
    seo: {
      title: "Omnichannel Retail ERP Integration | Prixgen",
      metaDesc: "Transforming legacy retail into unified omnichannel experiences with real-time inventory visibility.",
    }
  },
  {
    slug: "dairy",
    title: "Dairy & Perishables",
    headline: "Time-Critical Supply Chain Management.",
    content: "<p>We implement specialized routing and cold-chain ERP tracking modules designed specifically for the extreme time-sensitivity of dairy and perishable distribution.</p>",
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
    content: "<p>As a certified Gold Partner, we don't just install Odoo—we engineer it to fit complex, multi-national workflows. From multi-warehouse inventory routing to automated procurement, we turn Odoo into an uncompromising enterprise engine.</p>",
    seo: {
      title: "Odoo Enterprise Gold Partner | Prixgen",
      metaDesc: "Engineering complex Odoo workflows for multi-national enterprise scale.",
    }
  },
  {
    slug: "sap-ecosystems",
    title: "SAP Ecosystems",
    headline: "Unlocking the Full Value of SAP.",
    content: "<p>We guide mid-market and enterprise clients through complex SAP deployments and migrations. We focus on phase-zero architectural audits to ensure your SAP environment aligns perfectly with your long-term operational strategy.</p>",
    seo: {
      title: "SAP Business One Deployment & Migration | Prixgen",
      metaDesc: "Unlocking SAP value through architectural audits and strategic mid-market deployments.",
    }
  },
  {
    slug: "microsoft-dynamics",
    title: "Microsoft Dynamics 365",
    headline: "Unified CRM and ERP Capabilities.",
    content: "<p>Break down data silos and modernize your business with Dynamics 365. We deploy intelligent cloud applications (including Power BI and Dynamics NAV) that unify financial management, supply chain operations, and customer insights into a single pane of glass.</p>",
    seo: {
      title: "Microsoft Dynamics 365 & Power BI Integration | Prixgen",
      metaDesc: "Unifying finance, supply chain, and customer insights through Dynamics 365.",
    }
  },
  {
    slug: "lecca-ai",
    title: "Lecca: Computer Vision & AI",
    headline: "AI-Powered Industrial Image Processing.",
    content: "<p>Eliminate manual errors and accelerate quality control with Lecca, our proprietary neural network. Designed for complex object detection and segmentation in extreme manufacturing environments (such as automated pipe-counting), Lecca digitizes physical inventory with unparalleled accuracy.</p>",
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
    content: "<p>A company's technology should accelerate its strategy, not constrain it. We conduct deep architectural audits to identify workflow bottlenecks, eliminate technical debt, and build a modern roadmap for digital transformation.</p>",
    seo: {
      title: "Strategic IT & Management Consulting | Prixgen",
      metaDesc: "Aligning technology with business strategy through deep architectural audits.",
    }
  },
  {
    slug: "supply-chain-wms",
    title: "Supply Chain & WMS Consulting",
    headline: "Next-Generation Warehouse Automation.",
    content: "<p>Shaping the future of automation. We provide end-to-end warehousing operations consulting, helping you reduce inventory holding costs while dramatically improving order accuracy and fulfillment speed.</p>",
    seo: {
      title: "Supply Chain & WMS Consulting | Prixgen",
      metaDesc: "End-to-end warehousing operations consulting and automation strategies.",
    }
  },
  {
    slug: "iiot-engineering",
    title: "IIoT & Engineering Services",
    headline: "The Industrial Internet of Things.",
    content: "<p>Manage millions of IIoT device connections. We build custom engineering solutions that extract telemetry data from legacy hardware, open new revenue streams, and enable predictive maintenance models.</p>",
    seo: {
      title: "IIoT Engineering & Predictive Maintenance | Prixgen",
      metaDesc: "Extracting telemetry from legacy hardware to enable predictive maintenance.",
    }
  },
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure & Managed Hosting",
    headline: "High-Availability Cloud Environments.",
    content: "<p>Heterogeneous IT environments create operational drag. We architect, host, and manage scalable cloud architectures, resolving latency and standardizing processes so your enterprise can exceed its SLAs with zero operational friction.</p>",
    seo: {
      title: "Managed Cloud Hosting & Infrastructure | Prixgen",
      metaDesc: "Architecting high-availability cloud environments for Zero Operational Friction.",
    }
  }
];
