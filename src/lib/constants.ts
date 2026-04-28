/**
 * Centralized data structures for the Prixgen Enterprise website.
 * Contains elevated Tier-1 consultancy copy.
 * Synchronized with src/lib/data.ts slugs.
 */

export const MENU_DATA = {
  services: [
    { title: "IT & Management Consulting", href: "/services/it-consulting", description: "Aligning technology with strategy." },
    { title: "Supply Chain & WMS", href: "/services/supply-chain-wms", description: "Frictionless logistics ecosystems." },
    { title: "IIoT & Engineering Services", href: "/services/iiot-engineering", description: "Real-time industrial intelligence." },
    { title: "Managed Infrastructure", href: "/services/it-infrastructure", description: "High-availability cloud environments." },
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
  office_india: "#244 Kalabhairaveshwara Complex, 1st Stage, Niveditha Nagara, Mysuru, Karnataka 570022",
  office_australia: "Sydney, Australia (Regional Desk)",
  tagline: "Architecting unified enterprise ecosystems for global industrial leaders.",
};

export const HOME_COPY = {
  hero: {
    title: "Intelligent Operations. Unified Enterprise.",
    subheadline: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Built on Odoo, SAP, and proven industrial intelligence.",
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
