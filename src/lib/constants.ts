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
    { title: "Odoo Enterprise", href: "/solutions/odoo-enterprise", description: "Gold Partner precision for scale." },
    { title: "SAP Ecosystems", href: "/solutions/sap-ecosystems", description: "Intelligent core management." },
    { title: "Microsoft Dynamics 365", href: "/solutions/microsoft-dynamics", description: "Unified business applications." },
    { title: "Lecca: Computer Vision & AI", href: "/solutions/lecca-ai", description: "Proprietary industrial intelligence." },
  ],
  industries: [
    { title: "Advanced Manufacturing", href: "/industries/manufacturing", description: "Shop-floor to top-floor sync." },
    { title: "Chemicals & Process", href: "/industries/chemicals", description: "Precision and compliance." },
    { title: "Consumer Goods (FMCG)", href: "/industries/fmcg-distribution", description: "High-velocity supply chains." },
    { title: "Retail Operations", href: "/industries/retail", description: "Omnichannel architecture." },
    { title: "Dairy & Perishables", href: "/industries/dairy", description: "Time-critical supply chain." },
  ],
};

export const FOOTER_DATA = {
  office_india: "#244, Kalabairaweshwara Complex, 1st Stage, Nivedithanagar, Mysuru - 570022, Karnataka, India.",
  office_australia: "Unit 3 / 5 Murphy Street, Oconnor, Perth, WA 6163, Australia",
  phone: "+91 (0821) 2548666",
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
