/**
 * Centralized data structures for the Prixgen Enterprise website.
 * Contains elevated Tier-1 consultancy copy.
 * Synchronized with src/lib/data.ts slugs.
 */

export const MENU_DATA = {
  services: [
    { title: "Business Strategy", href: "/services/business-strategy", description: "Long-term value creation and optimization." },
    { title: "IT Consulting", href: "/services/it-consulting", description: "Aligning technology with enterprise goals." },
    { title: "Accounting Advisory", href: "/services/accounting-advisory", description: "Financial precision and compliance." },
    { title: "Management Consulting", href: "/services/management-consulting", description: "Operational excellence and efficiency." },
    { title: "Supply Chain Consulting", href: "/services/supply-chain-consulting", description: "End-to-end logistics optimization." },
    { title: "WMS", href: "/services/wms", description: "Intelligent warehouse management systems." },
    { title: "Hiring Odoo Developers", href: "/services/hiring-odoo-developers", description: "Dedicated talent for Odoo ecosystems." },
  ],
  engineering_services: [
    { title: "IIoT & Telemetry", href: "/engineering-services/iiot-telemetry", description: "Real-time shop-floor intelligence." },
    { title: "Factory Automation", href: "/engineering-services/automation", description: "Robotics and automated control systems." },
    { title: "Cloud Infrastructure", href: "/engineering-services/cloud-infrastructure", description: "High-availability industrial cloud." },
  ],
  solutions: [
    { title: "Odoo", href: "/solutions/odoo-enterprise", description: "Gold Partner precision for scale." },
    { title: "SAP", href: "/solutions/sap-ecosystems", description: "Intelligent core management." },
    { 
      title: "Microsoft Dynamics", 
      href: "/solutions/microsoft-dynamics",
      description: "Unified business applications.",
      subItems: [
        { title: "Power BI", href: "/solutions/power-bi" },
        { title: "Dynamics NAV", href: "/solutions/dynamics-nav" }
      ]
    },
    { title: "IIoT", href: "/engineering-services/iiot-telemetry", description: "Real-time industrial intelligence." },
    { 
      title: "AI & ML", 
      href: "/services/ai-machine-learning",
      description: "Proprietary industrial intelligence.",
      subItems: [
        { title: "Image Processing", href: "/solutions/image-processing" },
        { title: "Lecca", href: "/solutions/lecca-ai" }
      ]
    },
  ],
  industries: [
    { title: "Manufacturing", href: "/industries/manufacturing", description: "Shop-floor to top-floor synchronization." },
    { title: "Retail", href: "/industries/retail", description: "Omnichannel commerce and architecture." },
    { title: "Chemicals", href: "/industries/chemicals", description: "Precision process and safety compliance." },
    { title: "Information Services", href: "/industries/information-services", description: "Digital infrastructure and enterprise software." },
    { title: "Consumer Goods & Distribution", href: "/industries/fmcg-distribution", description: "High-velocity supply chain management." },
    { title: "Dairy", href: "/industries/dairy", description: "Time-critical perishables logistics." },
    { title: "Electronics", href: "/industries/electronics", description: "High-precision engineering and assembly." },
  ],
};

export const FOOTER_DATA = {
  office_india: "No 2622, Krishna Kaveri Complex, Panchayat, opposite to Bogadi, Mysuru, Karnataka 570026",
  office_australia: "Unit 3 / 5 Murphy Street, Oconnor, Perth, WA 6163, Australia",
  phone: "+91 (0821) 2548666",
  mobile: "+91 95138 41111",
  salesPhone: "+91 99300 57159",
  email: "info@prixgen.com",
  website: "https://www.prixgen.com",
  tagline: "Architecting unified enterprise ecosystems for global industrial leaders.",
};

export const HOME_COPY = {
  hero: {
    title: "Intelligent Operations. Unified Enterprise.",
    subheadline: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Powered by AI, GenAI, and IoT, our solutions fuse Odoo and SAP with proven industrial intelligence.",
    primaryCTA: "Schedule an Architecture Audit",
    secondaryCTA: "Read the 2026 Manufacturing Benchmark",
  },
  socialProof: "Trusted by leading industrial operators across APAC and Australia to process billions in supply chain volume.",
  props: [
    {
      title: "Frictionless Deployments",
      content: "We eliminate the 70% failure rate of traditional ERP integrations through meticulous phase-zero architecture.",
    },
    {
      title: "Shop-Floor to Top-Floor",
      content: "Connecting heavy IIoT machinery directly to C-suite financial dashboards for real-time visibility.",
    },
  ],
};
