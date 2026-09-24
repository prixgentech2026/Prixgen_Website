'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { WhitepaperDownloadModal } from '@/components/features/whitepaper-download-modal';
import { WhitepaperFlipbook } from '@/components/features/whitepaper-flipbook';
import { JsonLd } from '@/components/seo/json-ld';
import { FadeUp } from '@/components/animations/fade-up';
import { Magnetic } from '@/components/animations/magnetic';
import { RevealText } from '@/components/animations/reveal-text';
import { StaggerText } from '@/components/animations/stagger-text';
import {
  ArrowRight,
  ArrowLeft,
  Factory,
  Layers,
  Cpu,
  ShieldCheck,
  SearchCheck,
  TrendingDown,
  Gauge,
  Boxes,
  Wrench,
  BarChart4,
  Network,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Scale,
  RefreshCw,
  Sliders,
  Database,
  ArrowUpRight,
  Phone,
  Mail,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Activity,
  FileText,
  Download,
  X,
  Maximize2,
  ChevronDown,
  BookOpen,
  Award,
  HelpCircle,
  UserCheck
} from 'lucide-react';

interface PvcClientPageProps {
  industry?: any;
}

// Diagram Image with Interactive Zoom Lightbox
function DiagramImage({ 
  src, 
  alt, 
  caption, 
  className,
  imageClassName,
}: { 
  src: string; 
  alt: string; 
  caption?: string; 
  className?: string;
  imageClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <figure className={`my-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all hover:shadow-md ${className || ''}`}>
      <div 
        className="relative overflow-hidden bg-slate-50 cursor-pointer flex items-center justify-center p-2 sm:p-3"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className={`w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01] ${imageClassName || 'max-h-[360px] sm:max-h-[440px]'}`}
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="px-5 py-3 bg-slate-50/90 border-t border-slate-200/80 text-xs text-slate-600 font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#004B87] shrink-0" />
          <span>{caption}</span>
        </figcaption>
      )}

      {/* Lightbox Modal (Clean Fullscreen with Blurred Backdrop, Only the Image) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
              aria-label="Close popup"
            >
              <X size={22} />
            </button>

            {/* Only the Image - Fits viewport cleanly with zero inner scroll */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-[94vw] max-h-[92vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-xl shadow-2xl drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}

// 1. Six Disconnected Systems Data
const DISCONNECTED_SYSTEMS = [
  { id: 'procurement', title: 'Procurement', icon: Scale, issue: 'Resin price volatility tracked in isolated supplier spreadsheets', metric: 'Resin Variance', fix: 'Live Resin Index Sync' },
  { id: 'formulation', title: 'Formulation', icon: Sliders, issue: 'Recipe batching variance and unrecorded regrind blending', metric: 'Recipe Drifts', fix: 'Automated Recipe Lock' },
  { id: 'production', title: 'Production', icon: Factory, issue: 'Extrusion line stoppages and changeovers missing from ERP', metric: 'OEE Gaps', fix: 'IIoT Telemetry Capture' },
  { id: 'quality', title: 'Quality', icon: ShieldCheck, issue: 'Hydrostatic and wall-thickness tests logged on paper clipboards', metric: 'Audit Delays', fix: 'Digital Inspection Gates' },
  { id: 'inventory', title: 'Inventory', icon: Boxes, issue: 'Physical yard stock vs system mismatches across pipe classes', metric: 'Ghost Stock', fix: '5-Dimension Lot Tracking' },
  { id: 'finance', title: 'Finance', icon: BarChart4, issue: 'Actual production scrap costs discovered weeks late at month-end', metric: 'EBITDA Leak', fix: 'Real-Time Job Costing' },
];

// Implementation Lessons Data (From Prixgen's 10+ Implementations)
const IMPLEMENTATION_LESSONS = [
  {
    num: '01',
    title: 'Get Product Master Data Right First',
    desc: 'A clean structure for diameter, pressure class, wall thickness, colour, and length prevents most downstream confusion in planning, pricing, and stock.'
  },
  {
    num: '02',
    title: 'Model the Process as it Really Runs',
    desc: 'Continuous extrusion, weight-based consumption, regrind and reclaim loops need to be reflected faithfully, not forced into a generic discrete-manufacturing template.'
  },
  {
    num: '03',
    title: 'Capture Data at Source',
    desc: 'Production, scrap, and weight recorded directly at the extrusion line, by shift, are far more reliable than figures reconstructed at the end of the day.'
  },
  {
    num: '04',
    title: 'Connect Quality to Batches from Day One',
    desc: 'Retrofitting digital traceability later is significantly harder and more disruptive than designing digital batch-locking in from day one.'
  },
  {
    num: '05',
    title: 'Involve Finance Early',
    desc: 'Our in-house Chartered Accountants and manufacturing finance consultants ensure costing, variance, and month-end closing work for plant operations, not just for auditors.'
  },
  {
    num: '06',
    title: 'Phase Sensibly',
    desc: 'Finance, inventory, and production core usually come first; advanced planning, predictive maintenance, and direct machine integration follow once the foundation is stable.'
  },
  {
    num: '07',
    title: 'Never Subcontract Execution',
    desc: 'Because Prixgen never subcontracts project work, the same in-house team that designs your manufacturing architecture is the one that configures, tests, and supports it.'
  }
];

// PVC Industry FAQs Data
const PVC_FAQS = [
  {
    q: 'Is Odoo suitable for PVC pipe manufacturing?',
    a: 'Yes. With the right configuration, Odoo handles continuous extrusion, weight-based consumption, batch and lot traceability, quality checks, multi-warehouse inventory, and maintenance. Prixgen has implemented it for more than 10 PVC and polymer manufacturers, including multi-unit operations.'
  },
  {
    q: 'How can ERP reduce shooting waste and overweight pipes?',
    a: 'By recording scrap and weight per metre at each changeover and each shift, ERP makes these costs visible by line, product, and operator. Once visible, they can be managed through better run sequencing, reclaim control, and timely tool maintenance.'
  },
  {
    q: 'What does end-to-end traceability involve?',
    a: 'It means linking supplier batch, raw material lot, production order, machine and shift, inspection results, finished goods lot, storage location, and customer dispatch, so that any pipe can be traced backwards or forwards in minutes.'
  },
  {
    q: 'Where should a PVC manufacturer start its digital journey?',
    a: 'Start with a single, reliable foundation for finance, inventory, and production with clean product master data. Then add quality traceability, maintenance, and machine integration in planned phases.'
  }
];

// 2. Five Industry Shifts Data
const INDUSTRY_SHIFTS = [
  {
    num: '01',
    title: 'Demand Volatility & Forecasting Pressure',
    desc: 'Raw resin and finished pipe markets move significantly faster than periodic, manually reconciled planning cycles can accommodate.',
    impact: 'Requires real-time MRP linked to live resin pricing engines.',
    trend: '+42% market velocity'
  },
  {
    num: '02',
    title: 'SKU & Variant Explosion',
    desc: 'Combinations of diameter, pressure class, SDR ratings, and color stripes multiply master-data complexity exponentially.',
    impact: 'Demands automated matrix BOMs and variant configuration.',
    trend: '1,200+ active combinations'
  },
  {
    num: '03',
    title: 'Rising Traceability Expectations',
    desc: 'Infrastructure projects and strict standards require an unbroken, defensible batch-to-dispatch digital audit trail.',
    impact: 'Requires end-to-end 10-link lot serialization from resin silo to dispatch.',
    trend: '100% regulatory compliance'
  },
  {
    num: '04',
    title: 'Margin Pressure on Commodity Resin',
    desc: 'Razor-thin margins leave zero tolerance for unrecorded wall-thickness over-give, cold-start scrap, or unmanaged regrind.',
    impact: 'Shifts profitability focus directly to scrap reclamation and precision weighing.',
    trend: 'Zero unmodelled scrap'
  },
  {
    num: '05',
    title: 'From Capacity to Visibility & Control',
    desc: 'Competitive advantage is no longer just how many tons an extrusion line can pump out, but how accurately management can steer the plant.',
    impact: 'Transforms shop-floor telemetry into executive operating advantage.',
    trend: 'Real-time steering'
  }
];

// 3. Seven Fault Lines Data
const FAULT_LINES = [
  {
    id: 1,
    title: 'Demand & Forecasting Misalignment',
    operational: 'Production schedules based on stale monthly forecasts lead to emergency changeovers and stockouts.',
    financial: 'Excess working capital locked in slow-moving pipe diameters while high-velocity SKUs starve.',
    action: 'MRP Demand Sensing'
  },
  {
    id: 2,
    title: 'Material Planning Gaps',
    operational: 'Uncoordinated procurement of PVC resin, stabilizers, calcium carbonate, pigments, and packaging supplies.',
    financial: 'Expensive line starvation or emergency resin spot purchases at peak spot rates.',
    action: 'Multi-Resin Auto-Reorder'
  },
  {
    id: 3,
    title: 'Production Efficiency & Changeover Scrap',
    operational: 'Unscheduled die head swaps and temperature re-stabilization generate unrecorded purge waste.',
    financial: 'Hidden scrap cost quietly absorbed into cost of goods sold (COGS), suppressing true gross margins.',
    action: 'Closed-Loop Purge Reclaim'
  },
  {
    id: 4,
    title: 'Quality & Traceability Gaps',
    operational: 'Paper-based hydrostatic burst, tensile, and drop-weight test records disconnected from lot numbers.',
    financial: 'Customer disputes force massive plant-wide batch recalls instead of isolating single suspect lots.',
    action: 'Digital QC Gate Locking'
  },
  {
    id: 5,
    title: 'Inventory Accuracy & Yard Discrepancies',
    operational: 'Pipes stacked in outdoor yard racks without real-time bin allocation or batch identification.',
    financial: 'Year-end write-downs, duplicate production of already available stock, and shipping delays.',
    action: 'Yard Bay GPS & Barcoding'
  },
  {
    id: 6,
    title: 'Maintenance & Financial Disconnects',
    operational: 'Extruder barrel wear and vacuum pump failures tracked as isolated mechanical repairs.',
    financial: 'Unplanned downtime losses fail to map to specific job orders, distorting unit profitability.',
    action: 'IIoT Vibration Telemetry'
  },
  {
    id: 7,
    title: 'Unmodelled System Complexity',
    operational: 'Plant managers and dispatchers rely on personal spreadsheets to bridge gaps between disconnected software.',
    financial: 'Spreadsheet workarounds conceal systemic friction that quietly resurfaces as overhead cost.',
    action: 'Unified Transaction Ledger'
  }
];

// 4. Ten Step Journey Data
const PROCESS_STEPS = [
  { 
    step: '01', 
    title: 'Goods Receipt', 
    shortTitle: 'Goods Receipt',
    type: 'Upstream Control', 
    desc: 'Resin lot inspection, bulk density check, weighbridge gross/tare validation, and automated silo allocation with supplier COA digital verification.', 
    kpi: 'Silo Net Weight Sync',
    odooModule: 'Odoo Purchase & Weighbridge IoT',
    odooDesc: 'Automated Gross-Tare net weight deduction, Supplier COA attachment, and direct Silo Bin lot creation upon gate entry.'
  },
  { 
    step: '02', 
    title: 'Compounding', 
    shortTitle: 'Compounding',
    type: 'Upstream Control', 
    desc: 'High-speed mixer batching with automated PLC dosing for PVC polymer resin, thermal stabilizers, calcium carbonate, impact modifiers, and reclaimed regrind.', 
    kpi: 'Recipe Variance < 0.2%',
    odooModule: 'Odoo MRP Formulation & Recipe Lock',
    odooDesc: 'Enforces strict tolerance limits on chemical additives and automatically locks compound batch IDs before extrusion issue.'
  },
  { 
    step: '03', 
    title: 'Extrusion', 
    shortTitle: 'Extrusion',
    type: 'Production Core', 
    desc: 'Continuous melt temperature, screw RPM, melt pressure, and multi-zone barrel thermal profiling across twin-screw extruders.', 
    kpi: 'Thermal Profile Sync',
    odooModule: 'Odoo Shop-Floor & Industrial IoT',
    odooDesc: 'Captures real-time machine speed, motor load, melt temp, and cold-start scrap logging directly against work orders.'
  },
  { 
    step: '04', 
    title: 'Sizing & Calibration', 
    shortTitle: 'Sizing & Calibration',
    type: 'Production Core', 
    desc: 'Vacuum calibration tank monitoring ensuring precise outer diameter, roundness, and wall-thickness consistency before initial cooling.', 
    kpi: 'OD Tolerance ±0.05mm',
    odooModule: 'Odoo Quality & Dimensional IoT',
    odooDesc: 'Syncs vacuum tank sensor telemetry with SPC (Statistical Process Control) charts to catch dimensional drift immediately.'
  },
  { 
    step: '05', 
    title: 'Cooling Tanks', 
    shortTitle: 'Cooling Tanks',
    type: 'Production Core', 
    desc: 'Multi-stage immersion and spray water cooling with closed-loop chiller telemetry to freeze pipe crystalline structure and eliminate residual stresses.', 
    kpi: 'Chiller Temp 18°C',
    odooModule: 'Odoo Maintenance & Chiller Telemetry',
    odooDesc: 'Monitors water flow rate, chiller delta-T, and pump vibration to prevent thermal shock and unrecorded pipe warping.'
  },
  { 
    step: '06', 
    title: 'Haul-Off & Cutting', 
    shortTitle: 'Haul-Off & Cutting',
    type: 'Production Core', 
    desc: 'Synchronized caterpillar traction and planetary cutting to exact standard lengths (3m / 6m) with zero chamfer deformation.', 
    kpi: 'Length Accuracy ±1mm',
    odooModule: 'Odoo Manufacturing Execution (MES)',
    odooDesc: 'Logs accurate piece counts, cut length validation, and automated routing of cutting swarf directly into regrind inventory.'
  },
  { 
    step: '07', 
    title: 'Printing & Marking', 
    shortTitle: 'Printing & Marking',
    type: 'Downstream Control', 
    desc: 'Online continuous inkjet coding with BIS / ASTM standard mark, batch ID, pressure class, SDR rating, and exact timestamp.', 
    kpi: 'Inkjet Barcode Lock',
    odooModule: 'Odoo Serialization & Traceability',
    odooDesc: 'Generates unique 2D DataMatrix and GS1 barcode sequences linked directly to the parent compound batch and extrusion shift.'
  },
  { 
    step: '08', 
    title: 'Quality Inspection', 
    shortTitle: 'Quality Inspection',
    type: 'Downstream Control', 
    desc: 'Continuous ultrasonic wall measurement, laboratory hydrostatic burst pressure testing, tensile elongation, and drop-weight impact verification.', 
    kpi: 'Burst Pressure Pass',
    odooModule: 'Odoo Quality Lab & Gate Pass',
    odooDesc: 'Enforces mandatory QC pass sign-offs before inventory release; failed samples automatically trigger lot quarantine.'
  },
  { 
    step: '09', 
    title: 'Socketing & Bundling', 
    shortTitle: 'Socketing & Bundling',
    type: 'Downstream Control', 
    desc: 'Automated bell-mouth forming (elastomeric / solvent weld sockets), rubber sealing ring insertion, automated strapping, and bundle barcoding.', 
    kpi: 'Bundle Piece Count',
    odooModule: 'Odoo Packaging & Finished Goods Lotting',
    odooDesc: 'Bundles individual pipes into master warehouse packs, records gasket batch numbers, and prints master bundle barcode labels.'
  },
  { 
    step: '10', 
    title: 'Dispatch & Logistics', 
    shortTitle: 'Dispatch & Logistics',
    type: 'Downstream Control', 
    desc: 'Net weight weighbridge truck sync, digital gate pass issuance, automated e-Way Bill generation, and secondary dealer dispatch routing.', 
    kpi: 'Automated Gate Pass',
    odooModule: 'Odoo Delivery, e-Way Bill & DMS Portal',
    odooDesc: 'Reconciles outbound truck axle weights against ERP pick orders, generates e-Invoices, and syncs delivery tracking to dealer portal.'
  }
];

// 5. Ten Link Traceability Chain Data
const TRACEABILITY_LINKS = [
  { step: '01', label: 'Supplier Batch', detail: 'Polymer resin supplier COA & delivery invoice' },
  { step: '02', label: 'Raw Material Lot', detail: 'Silo number, moisture test, inward lot tag' },
  { step: '03', label: 'Material Issue', detail: 'Automated recipe requisition to mixer batch' },
  { step: '04', label: 'Production Order', detail: 'Job order with target length, SDR & weight spec' },
  { step: '05', label: 'Machine / Operator', detail: 'Extruder line #, die head ID, shift supervisor' },
  { step: '06', label: 'Production Batch', detail: 'Real-time telemetry stamp & melt temperature profile' },
  { step: '07', label: 'Inspection Result', detail: 'Ultrasonic wall log, burst pressure test pass' },
  { step: '08', label: 'Finished Goods Lot', detail: 'Bundle barcode with piece count & net weight' },
  { step: '09', label: 'Warehouse Location', detail: 'Yard rack, bay coordinate, allocated order ID' },
  { step: '10', label: 'Customer Dispatch', detail: 'Weighbridge slip, digital e-Way bill & dealer invoice' }
];

// 6. Scorecard Data
const SCORECARD_DOMAINS = [
  {
    domain: 'Commercial',
    metrics: [
      { name: 'Order Fill Rate (OTIF)', target: '> 98.2%', pct: 98, desc: 'Complete on-time dealer deliveries' },
      { name: 'Quote-to-Order Cycle', target: '< 4 Hours', pct: 92, desc: 'Automated dynamic resin pricing speed' },
      { name: 'Revenue Mix by Class', target: 'Live Breakdown', pct: 88, desc: 'High-margin fittings vs commodity pipes' }
    ]
  },
  {
    domain: 'Supply Chain',
    metrics: [
      { name: 'Resin Stock Coverage', target: '14 Days Buffer', pct: 94, desc: 'Dynamic safety buffer based on demand' },
      { name: 'Planning Cycle Time', target: '< 2 Hours', pct: 96, desc: 'Automated MRP explosion across SKUs' },
      { name: 'Supplier Delivery OTIF', target: '> 96.5%', pct: 96, desc: 'Raw material & additive delivery precision' }
    ]
  },
  {
    domain: 'Manufacturing',
    metrics: [
      { name: 'Overall OEE (Lines)', target: '> 86.5%', pct: 88, desc: 'Availability × Performance × Quality' },
      { name: 'Die Changeover Time', target: '< 45 Mins', pct: 90, desc: 'Standardized SMED tooling sequence' },
      { name: 'Shooting Waste Rate', target: '< 1.2%', pct: 95, desc: 'Purge loss tracked and routed to reclaim' }
    ]
  },
  {
    domain: 'Quality',
    metrics: [
      { name: 'First-Pass Yield (FPY)', target: '> 99.1%', pct: 99, desc: 'Pipes meeting dimensional spec on first run' },
      { name: 'Wall Variance Index', target: '< 1.5%', pct: 94, desc: 'Minimizes costly polymer over-give' },
      { name: 'Trace-Back Speed', target: '< 3 Mins', pct: 98, desc: 'Full batch-to-dispatch lineage discovery' }
    ]
  },
  {
    domain: 'Finance',
    metrics: [
      { name: 'Realized Margin by SKU', target: 'Live Contribution', pct: 92, desc: 'Exact resin cost vs selling price per meter' },
      { name: 'Unmodelled Scrap Cost', target: '₹0 Buried', pct: 100, desc: 'Scrap accounted as variance KPI' },
      { name: 'Working Capital Days', target: '< 42 Days', pct: 89, desc: 'Optimized raw inventory to cash cycle' }
    ]
  },
  {
    domain: 'Maintenance',
    metrics: [
      { name: 'Unplanned Downtime', target: '< 2.0%', pct: 95, desc: 'IIoT condition monitoring on screw motors' },
      { name: 'Mean Time to Repair (MTTR)', target: '< 35 Mins', pct: 91, desc: 'Digital spare parts & work order routing' },
      { name: 'Maintenance Cost / Ton', target: 'Target Trend', pct: 87, desc: 'Preventive maintenance ROI tracking' }
    ]
  }
];

export default function PvcClientPage({ industry }: PvcClientPageProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFault, setActiveFault] = useState(0);
  const [activeScorecardTab, setActiveScorecardTab] = useState(0);
  const [activeTraceLink, setActiveTraceLink] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Trace Simulation State
  const [isSimulatingTrace, setIsSimulatingTrace] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);

  // Trace Simulation Runner
  const runTraceSimulation = () => {
    if (isSimulatingTrace) return;
    setIsSimulatingTrace(true);
    setTraceProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveTraceLink(step - 1);
      setTraceProgress(step);

      if (step >= TRACEABILITY_LINKS.length) {
        clearInterval(interval);
        setTimeout(() => setIsSimulatingTrace(false), 800);
      }
    }, 450);
  };

  // Whitepaper Modal & Sticky Prompt State
  const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState(false);
  const [showStickyPrompt, setShowStickyPrompt] = useState(false);
  const [dismissedSticky, setDismissedSticky] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 600 && !dismissedSticky) {
            setShowStickyPrompt(true);
          } else if (window.scrollY <= 600) {
            setShowStickyPrompt(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissedSticky]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#004B87] selection:text-white font-sans">
      <JsonLd
        type="Article"
        data={{
          title: "From Polymer to Pipe: Connected ERP for PVC Manufacturers | Prixgen",
          description: "Discover how a connected Odoo ERP operating model eliminates six disconnected systems in PVC & plastics manufacturing — from raw material to dispatch.",
          author: { "@type": "Organization", "name": "Prixgen Enterprise" }
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.prixgen.com/industries" },
            { "@type": "ListItem", position: 3, name: "PVC Manufacturing", item: "https://www.prixgen.com/industries/pvc-manufacturing" }
          ]
        }}
      />

      {/* =========================================================================
          HERO SECTION: INDUSTRIAL GROUNDED LIGHT THEME WITH LIVE TELEMETRY
          ========================================================================= */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 px-4 sm:px-6 lg:px-10 overflow-hidden bg-white border-b border-slate-200/80">
        {/* Subtle Engineering Grid & Depth Gradients */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 85% 20%, rgba(0, 163, 224, 0.08), transparent 45%),
              radial-gradient(circle at 15% 80%, rgba(0, 75, 135, 0.05), transparent 45%),
              linear-gradient(rgba(0, 75, 135, 0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 75, 135, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px'
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Link 
              href="/industries"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#004B87] hover:text-[#00A3E0] transition-colors group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Industries Directory
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-left">
              <FadeUp delay={0.1}>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#004B87]/5 border border-[#00A3E0]/30 text-[#004B87] text-[11px] font-bold tracking-widest uppercase shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                  Connected ERP for PVC & Plastics Manufacturers
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                  From Polymer to Pipe: <br />
                  <span className="text-[#004B87]">Building a Connected Operating Model</span>
                </h1>
              </FadeUp>



              <FadeUp delay={0.3}>
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  Walk through any PVC pipe plant and the physical flow is easy to follow from resin to finished pipe. But information flow is fragmented across six operational silos. What we have learned implementing ERP for more than 10 PVC and polymer manufacturers is that the next competitive advantage is visibility, not just capacity.
                </p>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => setIsWhitepaperModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-[#004B87] hover:bg-[#003866] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      <Download size={16} className="text-white" />
                      <span className="text-white font-bold">Download White Paper</span>
                      <span className="text-[10px] bg-sky-400 text-slate-950 font-extrabold px-1.5 py-0.5 rounded font-mono">PDF</span>
                    </button>
                  </Magnetic>

                  <Magnetic>
                    <a 
                      href="#audit-form"
                      className="inline-flex items-center justify-center h-12 px-7 rounded-full border-2 border-slate-300 hover:border-[#004B87] bg-white hover:bg-slate-50 text-slate-800 hover:text-[#004B87] font-bold text-sm transition-all shadow-sm transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      <span>Schedule Plant Audit</span>
                    </a>
                  </Magnetic>
                </div>
              </FadeUp>

              {/* Quick Proof Metrics */}
              <FadeUp delay={0.5}>
                <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200 text-left">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-[#004B87]">10+ Plants</div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Deployments</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-[#004B87]">10 Links</div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Traceability</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-[#004B87]">&lt; 3 Min</div>
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Recall Speed</div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Side: Interactive 3D Whitepaper Flip-Book Preview */}
            <div className="lg:col-span-7 xl:col-span-7 w-full">
              <WhitepaperFlipbook onOpenDownloadModal={() => setIsWhitepaperModalOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY EXECUTIVE QUOTE & STATS BANNER (IMAGE 02)
          ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-10 bg-slate-100 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto text-center">
          <DiagramImage
            src="/images/pvc/02_stats.png"
            alt="Connected Decision Making Across the Entire PVC Value Chain"
            caption="The future of plastics manufacturing is not automated production alone. It is connected decision-making across the entire value chain."
            className="my-0 max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: ONE VALUE CHAIN, SIX DISCONNECTED SYSTEMS (IMAGES 03, 04, 05)
          ========================================================================= */}
      <section id="value-chain" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 01 // Structural Reality</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              One Value Chain, Six Disconnected Systems
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Procurement, formulation, production, quality, inventory, and finance are usually owned by six different teams, tracked in six different systems, and reconciled on six different schedules. Yet for a PVC manufacturer, this isn&apos;t six businesses — it is one continuous value chain.
            </p>
          </FadeUp>

          {/* Diagram 03: Resin & Additives */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/03_resin.jpg"
              alt="Raw Polymer Resin and Additive Compounding Batch Identity"
              caption="Every finished pipe starts as resin and additives, and every batch carries an identity worth tracking."
            />
          </FadeUp>

          {/* Value Chain Visual Map */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCONNECTED_SYSTEMS.map((silo, idx) => {
              const Icon = silo.icon;
              return (
                <FadeUp key={silo.id} delay={0.06 * idx}>
                  <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group hover:border-[#00A3E0]/60 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#004B87]/5 text-[#004B87] flex items-center justify-center group-hover:bg-[#004B87] group-hover:text-white transition-colors">
                          <Icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded border border-rose-100 flex items-center gap-1">
                          <AlertTriangle size={11} />
                          {silo.metric}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#004B87] transition-colors">
                        {silo.title}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2.5">
                        {silo.issue}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Odoo Connected Loop</span>
                      <span className="text-[#00A3E0] group-hover:translate-x-1 transition-transform">{silo.fix} →</span>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Diagram 04 & Diagram 05 Visual Flow */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeUp delay={0.2}>
              <DiagramImage
                src="/images/pvc/04_value_chain.jpg"
                alt="One Value Chain Managed in Separate Disconnected Systems"
                caption="One value chain, from procurement to dealers and finance, often managed in separate systems."
              />
            </FadeUp>
            <FadeUp delay={0.3}>
              <DiagramImage
                src="/images/pvc/05_one_business.jpg"
                alt="Six Operational Domains Connected by a Single Demand Flow"
                caption="Six operational domains connected by a single flow of demand, production and cash."
              />
            </FadeUp>
          </div>

          {/* Strategic Callout */}
          <FadeUp delay={0.4} className="mt-8">
            <div className="bg-gradient-to-r from-[#004B87] to-[#002D54] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-[10px] font-bold tracking-widest text-[#00A3E0] uppercase font-mono">THE KEY SHIFT IN THINKING</span>
                <p className="text-xl sm:text-2xl font-bold leading-snug">
                  &ldquo;A pipe manufacturer does not run six businesses. It runs one business, expressed through six operational lenses. Your systems should reflect that.&rdquo;
                </p>
              </div>
              <Magnetic>
                <Button size="lg" className="shrink-0 bg-[#00A3E0] hover:bg-white hover:text-[#004B87] text-[#0F172A] font-bold rounded-xl shadow-md" asChild>
                  <a href="#operating-model">See 5-Layer Model</a>
                </Button>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FIVE INDUSTRY SHIFTS
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 02 // Macro Drivers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Five Industry Shifts Manufacturers Can&apos;t Ignore
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Five structural shifts are reshaping the plastics and pipe manufacturing industry, and none of them is optional or reversible.
            </p>
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRY_SHIFTS.map((shift, idx) => (
              <FadeUp key={shift.num} delay={0.08 * idx} className={idx === 4 ? "md:col-span-2 lg:col-span-2" : ""}>
                <div className="h-full bg-slate-50 hover:bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#004B87]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-[#00A3E0] font-mono">{shift.num}</span>
                      <span className="text-[10px] font-mono font-bold bg-slate-200/70 text-slate-700 px-2.5 py-0.5 rounded">
                        {shift.trend}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-[#004B87] transition-colors">{shift.title}</h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">{shift.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/60 bg-[#004B87]/5 -mx-8 -mb-8 p-6 rounded-b-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#004B87] block mb-1 font-mono">Architecture Response</span>
                    <p className="text-xs font-semibold text-slate-700">{shift.impact}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="mt-12 text-center bg-slate-100 rounded-2xl p-6 border border-slate-200">
            <p className="text-base sm:text-lg font-bold text-[#004B87]">
              The manufacturing advantage is shifting from capacity alone to visibility, responsiveness and control.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SEVEN FAULT LINES IN MODERN PIPE MANUFACTURING (IMAGE 06)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 03 // Root Cause Analysis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Seven Fault Lines in Modern Pipe Manufacturing
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Most operational breakdowns in pipe manufacturing trace back to one of seven recurring fault lines between shop-floor physics and enterprise systems.
            </p>
          </FadeUp>

          {/* Diagram 06: Fault Lines */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/06_fault_lines.jpg"
              alt="Seven Places Where Disconnected Operations Typically Crack"
              caption="Seven places where disconnected operations typically crack."
            />
          </FadeUp>

          {/* Interactive Fault Line Selector */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Navigation list */}
            <div className="lg:col-span-5 space-y-2.5">
              {FAULT_LINES.map((fault, idx) => (
                <button
                  key={fault.id}
                  onClick={() => setActiveFault(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    activeFault === idx 
                      ? 'bg-[#004B87] text-white shadow-md scale-[1.02]' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono ${activeFault === idx ? 'text-[#00A3E0]' : 'text-slate-400'}`}>
                      0{fault.id}
                    </span>
                    <span className="line-clamp-1">{fault.title}</span>
                  </div>
                  <ArrowRight size={14} className={activeFault === idx ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>

            {/* Deep-Dive Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8 min-h-[420px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFault}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00A3E0] uppercase tracking-wider">
                      FAULT LINE 0{FAULT_LINES[activeFault].id} &bull; {FAULT_LINES[activeFault].action}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1.5">
                      {FAULT_LINES[activeFault].title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-rose-50/70 rounded-2xl p-6 border border-rose-100 space-y-2">
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle size={16} />
                        Operational Reality
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {FAULT_LINES[activeFault].operational}
                      </p>
                    </div>

                    <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-100 space-y-2">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                        <TrendingDown size={16} />
                        P&L / Balance Sheet Impact
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {FAULT_LINES[activeFault].financial}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white rounded-2xl p-6 flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-[#00A3E0] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] font-mono">The Connected Odoo Solution</div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        Eliminates manual re-entry by synchronizing line metrics, weighing buffers, recipe limits, and accounting into a unified real-time transaction ledger.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <FadeUp delay={0.4} className="mt-10 text-center font-mono text-sm text-slate-500">
            &ldquo;Complexity that is not modelled in the system is not eliminated. It simply resurfaces later, as cost.&rdquo;
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE 10-STEP JOURNEY (FROM POLYMER TO FINISHED PIPE) (IMAGE 07)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 04 // Manufacturing Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              From Polymer to Finished Pipe: The 10-Step Journey
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              A finished, dispatch-ready pipe passes through ten distinct stages. Upstream control points capture batch identity; downstream control points capture what shipped, to whom, and in what condition.
            </p>
          </FadeUp>

          {/* Diagram 07: Ten Control Points (Compact and visible in one go without multiple scrolls) */}
          <FadeUp delay={0.2} className="max-w-4xl mx-auto">
            <DiagramImage
              src="/images/pvc/07_polymer_to_pipe.jpg"
              alt="Ten Control Points from Goods Receipt to Customer Dispatch"
              caption="Ten control points from goods receipt to dispatch."
              className="my-4 shadow-sm"
              imageClassName="max-h-[280px] sm:max-h-[340px] w-auto mx-auto object-contain"
            />
          </FadeUp>

          {/* Interactive Process Pipeline */}
          <div className="mt-10 space-y-6">
            {/* 10 Step Selectors (2 rows of 5 for clear readability without cramped ellipses) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
              {PROCESS_STEPS.map((step, idx) => (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between min-h-[78px] ${
                    activeStep === idx 
                      ? 'bg-[#004B87] text-white border-[#004B87] shadow-xl ring-2 ring-[#00A3E0]/40 scale-[1.02] z-10' 
                      : 'bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono font-bold tracking-wider ${activeStep === idx ? 'text-[#38BDF8]' : 'text-[#004B87]'}`}>
                      STEP {step.step}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${activeStep === idx ? 'bg-[#38BDF8]' : 'bg-slate-300'}`} />
                  </div>
                  <div className={`text-xs sm:text-[13px] font-bold mt-1.5 leading-snug ${activeStep === idx ? 'text-white' : 'text-slate-900'}`}>
                    {step.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Step Showcase Card with Large Legible Fonts */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 flex flex-col lg:flex-row items-stretch justify-between gap-8 shadow-2xl relative overflow-hidden"
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left Step Details */}
                <div className="space-y-4 max-w-2xl relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004B87]/50 border border-[#00A3E0]/40 text-[#38BDF8] text-xs font-bold uppercase tracking-wider font-mono">
                      {PROCESS_STEPS[activeStep].type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                      <CheckCircle2 size={12} />
                      Target: {PROCESS_STEPS[activeStep].kpi}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Step {PROCESS_STEPS[activeStep].step}: {PROCESS_STEPS[activeStep].title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
                    {PROCESS_STEPS[activeStep].desc}
                  </p>
                </div>

                {/* Right Odoo Connected Touchpoint Box */}
                <div className="bg-slate-900/95 rounded-2xl p-6 sm:p-7 border border-slate-800 shrink-0 w-full lg:w-[420px] flex flex-col justify-between space-y-4 relative z-10 shadow-xl">
                  <div>
                    <div className="text-slate-400 font-mono font-bold uppercase text-[10px] tracking-widest flex items-center gap-1.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                      ERP INTEGRATION TOUCHPOINT
                    </div>
                    
                    <div className="text-base sm:text-lg font-extrabold text-[#38BDF8] font-mono leading-snug">
                      {PROCESS_STEPS[activeStep].odooModule}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 mt-2.5 font-sans leading-relaxed">
                      {PROCESS_STEPS[activeStep].odooDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>STEP {PROCESS_STEPS[activeStep].step} OF 10</span>
                    <span className="text-[#38BDF8] font-bold">100% TRACEABLE</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TWO HIDDEN COSTS (IMAGE 08)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 05 // Unrecovered Margin Leaks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Two Hidden Costs: Shooting Waste & the Wall-Thickness Paradox
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Two costs quietly compound as a product range grows, and neither is tracked as its own line item by default.
            </p>
          </FadeUp>

          {/* Diagram 08: Hidden Costs */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/08_hidden_costs.jpg"
              alt="Shooting Waste and the Wall-Thickness Paradox in Pipe Extrusion"
              caption="Shooting waste and the wall-thickness paradox: two costs that rarely appear as their own line item."
            />
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cost 1: Shooting Waste */}
            <FadeUp delay={0.1}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-8 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Flame size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                    1. Shooting Waste (Purge Loss)
                  </h3>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    Every colour or diameter change forces the extruder to re-stabilise. Material produced during that stabilization window cannot be sold as first-quality, and the cost scales directly with the number of changeovers rather than production volume.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-[#004B87] uppercase tracking-wider font-mono">The Prixgen Odoo Control Loop</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Sequencing production runs dynamically by diameter/color matrix and routing scrap through an automated closed reclaim loop turns this into a measured KPI instead of a buried variance.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Cost 2: Wall-Thickness Paradox */}
            <FadeUp delay={0.2}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between space-y-8 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-[#00A3E0] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Scale size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                    2. The Wall-Thickness Paradox
                  </h3>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    A pipe that is too thin fails quality control and gets rejected — but one that is too thick still passes inspection, quietly absorbing extra grams of costly polymer resin with every single meter produced above target specification.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-[#004B87] uppercase tracking-wider font-mono">The Prixgen Odoo Control Loop</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Continuous ultrasonic condition-monitoring tracks tool and die wear, flagging replacement requirements and automatic calibration before excess resin is burned.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.3} className="mt-12 text-center bg-[#004B87]/5 rounded-2xl p-6 border border-[#004B87]/15">
            <p className="text-base sm:text-lg font-bold text-[#004B87]">
              Neither cost is tracked as its own line item by default. In a commodity-resin business, recovering even a small percentage of overweight and changeover scrap goes straight to the bottom line.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DEFENSIBLE TRACEABILITY (IMAGE 09)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
                <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 06 // Audit Integrity</span>
              </div>
              <Button
                onClick={runTraceSimulation}
                disabled={isSimulatingTrace}
                size="sm"
                className="bg-[#00A3E0] hover:bg-[#004B87] text-slate-950 hover:text-white font-bold text-xs rounded-xl shadow-md gap-2"
              >
                {isSimulatingTrace ? (
                  <>
                    <RotateCcw size={14} className="animate-spin" />
                    Tracing Link {traceProgress} of 10...
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    Run Batch Trace Simulation
                  </>
                )}
              </Button>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Traceability: One Question, Ten Links in the Chain
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              When a customer reports a failed pipe, answering &ldquo;where did this come from?&rdquo; requires ten linked records: supplier batch, raw material lot, material issue, production order, machine/shift, production batch, inspection result, finished goods lot, warehouse location, and customer dispatch.
            </p>
          </FadeUp>

          {/* Diagram 09: Traceability Chain */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/09_traceability.jpg"
              alt="A Defensible Traceability Chain from Supplier Batch to Customer Dispatch"
              caption="A defensible traceability chain from supplier batch to customer dispatch."
            />
          </FadeUp>

          {/* Interactive Trace Chain Flow */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-3.5">
              {TRACEABILITY_LINKS.map((link, idx) => {
                const isActive = activeTraceLink === idx;
                const isPassed = isSimulatingTrace && traceProgress > idx;
                return (
                  <button
                    key={link.step}
                    onClick={() => setActiveTraceLink(idx)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? 'bg-[#004B87] text-white border-[#004B87] shadow-lg scale-[1.02]'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#00A3E0]' : isPassed ? 'text-emerald-600' : 'text-slate-400'}`}>
                        LINK {link.step}
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-ping" />}
                      {isPassed && !isActive && <CheckCircle2 size={13} className="text-emerald-600" />}
                    </div>
                    <div className="font-bold text-sm mt-1">{link.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Link Description & Strategic Outcomes */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00A3E0] uppercase tracking-wider">
                  TRACE CHAIN LINK {TRACEABILITY_LINKS[activeTraceLink].step}
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">
                  {TRACEABILITY_LINKS[activeTraceLink].label}
                </h3>
                <p className="text-sm text-slate-300 mt-2 font-mono">
                  {TRACEABILITY_LINKS[activeTraceLink].detail}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-mono">3 Core Strategic Outcomes</span>
                
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <b className="text-white">1. Root-Cause Speed:</b> Trace a defect to the exact batch, extruder, operator, and shift in minutes, not days.
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <b className="text-white">2. Recall Precision:</b> Quarantine only the affected lot number, avoiding catastrophic plant-wide inventory recalls.
                  </div>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                    <b className="text-white">3. Audit Confidence:</b> Answer any regulatory (BIS/ISO) or customer inquiry with defensible end-to-end lineage.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FadeUp delay={0.4} className="mt-12 text-center font-mono text-sm text-slate-500">
            &ldquo;Traceability is not a quality-department feature. It is the audit trail that protects the entire business when something goes wrong.&rdquo;
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: INVENTORY INTELLIGENCE (IMAGE 10)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 07 // Warehouse Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              From Stock Visibility to Inventory Intelligence
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Knowing a stock quantity isn&apos;t the same as being able to plan against it. A trustworthy stock figure must be accurate on five dimensions at once: quantity, batch, location, allocation, and status.
            </p>
          </FadeUp>

          {/* Diagram 10: Inventory */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/10_inventory.jpg"
              alt="Moving From Knowing Stock Quantity to Batch, Location and Allocation Accuracy"
              caption="Moving from knowing how much stock you have to knowing which batch, where, and for whom."
            />
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { dim: '01', title: 'Quantity', desc: 'Exact piece count, bundled length & net weight via scale sync.' },
              { dim: '02', title: 'Batch & Lot', desc: 'Resin blend formulation date, color run & extruder line ID.' },
              { dim: '03', title: 'Location', desc: 'Precise silo, buffer zone, yard bay, or rack coordinate.' },
              { dim: '04', title: 'Allocation', desc: 'Hard-locked to confirmed dealer orders vs free unallocated stock.' },
              { dim: '05', title: 'QC Status', desc: 'Raw quarantined, tested first-choice, secondary, or reclaim.' }
            ].map((d, idx) => (
              <FadeUp key={d.dim} delay={0.06 * idx}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between group hover:-translate-y-1">
                  <div>
                    <div className="text-2xl font-black text-[#00A3E0] font-mono">{d.dim}</div>
                    <h3 className="text-lg font-bold text-[#0F172A] mt-2 mb-2 group-hover:text-[#004B87] transition-colors">{d.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{d.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-[#004B87] uppercase font-mono">
                    <CheckCircle2 size={12} className="text-[#00A3E0]" />
                    <span>Live Dimension</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="mt-12 text-center bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-base sm:text-lg font-bold text-[#004B87]">
              If your inventory report cannot tell you which batch a bundle belongs to and which customer it is reserved for, it is not really an inventory figure. It is an estimate.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FROM REACTIVE TO PREDICTIVE MAINTENANCE (IMAGE 11)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 08 &bull; Asset Reliability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              From Reactive to Predictive Maintenance
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Extruders, haul-offs, cutters and moulds are the heart of the plant. Maintenance maturity moves through three distinct stages — trading firefighting for foresight and delivering less unplanned downtime.
            </p>
          </FadeUp>

          {/* Diagram 11: Maintenance Maturity */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/11_maintenance.jpg"
              alt="Three Stages of Maintenance Maturity in Polymer Manufacturing"
              caption="Three stages of maintenance maturity: Reactive → Preventive → Predictive."
            />
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400">STAGE 1 &bull; LEGACY</span>
              <h3 className="text-2xl font-bold text-slate-900">Reactive Maintenance</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Emergency repairs after equipment stoppage. High rush-part freight spend and extended lost extrusion hours.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 space-y-4">
              <span className="text-xs font-mono font-bold text-[#004B87]">STAGE 2 &bull; STANDARD</span>
              <h3 className="text-2xl font-bold text-[#004B87]">Preventive Maintenance</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Calendar-based servicing routines and scheduled downtime for screw cleaning and die maintenance.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 space-y-4 shadow-xl">
              <span className="text-xs font-mono font-bold text-[#00A3E0]">STAGE 3 &bull; ODOO CONNECTED</span>
              <h3 className="text-2xl font-bold text-white">Predictive Maintenance</h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Machine integration captures runtime directly from equipment and triggers maintenance on actual run hours rather than elapsed calendar time.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-slate-100 rounded-2xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#004B87] uppercase">THE ONE METRIC EVERY PLANT SHOULD SHARE</span>
              <h4 className="text-xl font-bold text-slate-900 mt-1">Overall Equipment Effectiveness (OEE)</h4>
              <p className="text-sm text-slate-600 font-medium mt-1">Availability × Performance × Quality gives management a common language for line performance.</p>
            </div>
            <div className="shrink-0 font-mono text-xl font-black bg-white px-6 py-3 rounded-xl border border-slate-300 text-[#004B87] shadow-sm">
              OEE = A × P × Q
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: THE CONNECTED MANUFACTURING OPERATING MODEL (IMAGE 12)
          ========================================================================= */}
      <section id="operating-model" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#00A3E0]" />
              <span className="text-[11px] font-bold text-[#00A3E0] uppercase tracking-widest font-mono">Section 09 // Enterprise Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              The 5-Layer Connected Manufacturing Operating Model
            </h2>
            <p className="text-lg text-slate-300 font-medium max-w-3xl mt-4 leading-relaxed">
              Bringing this together, a modern PVC operation operates in five distinct layers. Data generated at lower layers becomes the raw material for the layers above.
            </p>
          </FadeUp>

          {/* Diagram 12: Five Layers Operating Model */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/12_operating_model.jpg"
              alt="Five Layers of a Connected Manufacturing Operating Model"
              caption="Five layers of a connected manufacturing operating model."
              className="border-slate-800 bg-slate-950 text-slate-300"
            />
          </FadeUp>

          <div className="mt-10 space-y-4">
            {[
              { layer: 'Layer 05', name: 'Experience & Dealer Portal', desc: 'Dashboards, mobile apps and portals for management, shop-floor teams, dealers, and customers.' },
              { layer: 'Layer 04', name: 'Business Applications (Odoo Core)', desc: 'ERP processes for sales, purchase, finance, and HR that consume the same data without re-keying.' },
              { layer: 'Layer 03', name: 'Digital Operations & Workflow', desc: 'Planning, production, quality, inventory, and maintenance running on shared, real-time data.' },
              { layer: 'Layer 02', name: 'Data & Intelligence Layer', desc: 'A single, clean data foundation that turns raw plant signals into usable operational intelligence.' },
              { layer: 'Layer 01', name: 'Connected Plant (Shop Floor)', desc: 'Machines, weighing scales, and sensors that record what actually happens on the line.' }
            ].map((l, idx) => (
              <FadeUp key={l.layer} delay={0.06 * idx}>
                <div className="bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-6 sm:p-7 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-[#00A3E0]/50">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-[#00A3E0] bg-[#00A3E0]/15 px-3 py-1 rounded border border-[#00A3E0]/30">
                      {l.layer}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{l.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium md:max-w-xl text-left md:text-right">
                    {l.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4} className="mt-10 text-center font-mono text-sm text-slate-400">
            &ldquo;A digital manufacturing platform is not a bigger ERP system. It is the point where operational data becomes an operating advantage.&rdquo;
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: WHAT SHOULD MANAGEMENT MEASURE? (IMAGE 13)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 10 // Real-Time Scorecard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              What Should Management Measure? The Scorecard
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              The value of this scorecard is not just the list of metrics. It is having every metric derived from the same transactions that run the business — refreshed continuously instead of assembled by hand.
            </p>
          </FadeUp>

          {/* Diagram 13: Scorecard */}
          <FadeUp delay={0.2}>
            <DiagramImage
              src="/images/pvc/13_scorecard.jpg"
              alt="One Real-Time Scorecard Across Every Operational Domain"
              caption="One real-time scorecard across every operational domain."
            />
          </FadeUp>

          {/* Tab buttons */}
          <div className="mt-10 flex flex-wrap gap-2.5 border-b border-slate-200 pb-4">
            {SCORECARD_DOMAINS.map((domain, idx) => (
              <button
                key={domain.domain}
                onClick={() => setActiveScorecardTab(idx)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeScorecardTab === idx
                    ? 'bg-[#004B87] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {domain.domain}
              </button>
            ))}
          </div>

          {/* Active Domain Metrics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCORECARD_DOMAINS[activeScorecardTab].metrics.map((metric, idx) => (
              <div key={metric.name} className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#00A3E0] uppercase tracking-wider">KPI 0{idx + 1}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">HEALTHY</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{metric.name}</h3>
                <div className="text-2xl font-black text-[#004B87]">{metric.target}</div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${metric.pct}%` }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[#004B87] h-full rounded-full"
                  />
                </div>
                
                <p className="text-xs text-slate-600 font-medium pt-1">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: LESSONS FROM 10+ PVC IMPLEMENTATIONS (NEW)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-[1400px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 11 // Field Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Lessons From 10+ PVC Implementations
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mt-4 leading-relaxed">
              Across our PVC and polymer manufacturing projects — from single-plant pipe makers to multi-unit industrial groups — a few hard-won lessons have proven true every time.
            </p>
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPLEMENTATION_LESSONS.map((lesson, idx) => (
              <FadeUp key={lesson.num} delay={0.06 * idx} className={idx === 6 ? "md:col-span-2 lg:col-span-3" : ""}>
                <div className={`h-full rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${
                  idx === 6 
                    ? 'bg-gradient-to-r from-slate-900 to-[#004B87] text-white border-slate-800 shadow-xl' 
                    : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-sm hover:shadow-md'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-black font-mono ${idx === 6 ? 'text-[#00A3E0]' : 'text-[#004B87]'}`}>
                        {lesson.num}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        idx === 6 ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        Core Principle
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2.5 ${idx === 6 ? 'text-white' : 'text-[#0F172A]'}`}>
                      {lesson.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${idx === 6 ? 'text-slate-200' : 'text-slate-600 font-medium'}`}>
                      {lesson.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: FREQUENTLY ASKED QUESTIONS (NEW)
          ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1000px] mx-auto text-left">
          <FadeUp>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} transition={{ duration: 0.6 }} className="h-0.5 bg-[#004B87]" />
              <span className="text-[11px] font-bold text-[#004B87] uppercase tracking-widest">Section 12 // Direct Answers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 font-medium mt-3 leading-relaxed">
              Common questions from plant promoters and operations directors evaluating ERP for plastics and pipe manufacturing.
            </p>
          </FadeUp>

          <div className="mt-12 space-y-4">
            {PVC_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <FadeUp key={faq.q} delay={0.06 * idx}>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/60 transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#0F172A] hover:text-[#004B87] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={20}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#004B87]' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-slate-600 font-medium leading-relaxed border-t border-slate-200/60 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: ABOUT THE AUTHOR (NEW)
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-slate-100 border-b border-slate-200/80">
        <div className="max-w-[1000px] mx-auto text-left">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start gap-6 sm:gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#004B87] to-[#00A3E0] text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              KH
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider">
                <UserCheck size={14} /> Author & ERP Strategist
              </div>
              <h3 className="text-2xl font-extrabold text-[#0F172A]">Karthik S Hatti</h3>
              <p className="text-xs font-semibold text-slate-500">
                Co-Founder, Director & Chief Business Officer &bull; Prixgen Tech Solutions Pvt Ltd
              </p>
              <p className="text-sm text-slate-600 font-medium leading-relaxed pt-1">
                Karthik is Co-Founder, Director and Chief Business Officer of Prixgen Tech Solutions Pvt Ltd, an Odoo Gold Partner and ERP consultancy headquartered in Mysuru, India, serving manufacturing clients across India, the Middle East and Southeast Asia. He works directly with promoters and CXOs on digital transformation, manufacturing operating models, and enterprise architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: DEDICATED STRATEGIC WHITEPAPER DOWNLOAD SHOWCASE
          ========================================================================= */}
      <section id="whitepaper-download" className="py-20 lg:py-24 px-4 sm:px-6 lg:px-10 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy & Highlights */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <FadeUp>
                <div className="text-xs font-semibold tracking-wider text-[#00A3E0] uppercase">
                  Technical Publication & Reference Architecture
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  From Polymer to Pipe: Building a Connected Operating Model
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                  The complete engineering executive whitepaper for PVC and plastics manufacturers — detailing recipe drift controls, ultrasonic sensor integrations, and closed-loop scrap purge accounting.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { title: '10-Link Traceability Matrix', desc: 'Audit chain mapping resin supplier COAs to customer dispatch lots.' },
                    { title: 'Wall-Thickness Over-Give Math', desc: 'Formulas to quantify and eliminate hidden resin giveaways.' },
                    { title: 'Purge Waste Closed-Loop Model', desc: 'Automated MRP regrind calculations for cold-start scrap reclaim.' },
                    { title: '5-Layer Odoo IIoT Blueprint', desc: 'Shop-floor extruder PLC integration into financial ledgers.' },
                  ].map((item) => (
                    <div key={item.title} className="p-4 rounded-xl bg-slate-800 border border-slate-700/80 text-left">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setIsWhitepaperModalOpen(true)}
                    className="h-13 px-8 rounded-xl font-bold text-sm bg-[#004B87] hover:bg-[#003866] text-white shadow-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Download Whitepaper (PDF)</span>
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Right Whitepaper Preview Card */}
            <div className="lg:col-span-5">
              <FadeUp delay={0.2}>
                <div className="bg-slate-800 rounded-2xl p-7 border border-slate-700 shadow-xl space-y-5 text-left max-w-sm mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Prixgen Research
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Executive Brief • PDF
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      From Polymer to Pipe: Building a Connected Operating Model
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Operational guide for PVC and plastics manufacturers modernizing plant systems and traceability.
                    </p>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-3.5 border border-slate-700/80 space-y-2 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>01. Six Disconnected Systems</span>
                      <span className="text-slate-500">p. 02</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>05. Raw Material to Dispatch</span>
                      <span className="text-slate-500">p. 06</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>06. Two Costs Hiding in Plain Sight</span>
                      <span className="text-slate-500">p. 07</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>10. Connected Operating Model</span>
                      <span className="text-slate-500">p. 11</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsWhitepaperModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Get PDF Copy</span>
                  </button>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA & LEAD CAPTURE
          ========================================================================= */}
      <section id="audit-form" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-mono font-bold text-[#00A3E0] uppercase tracking-wider">
                GET IN TOUCH // ENGINEERING CONSULTATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Can you connect the journey from polymer to pipe?
              </h2>
              <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
                Material, movement, transformation, money and people: a PVC business runs well when all five are visible in one place. If you would like to understand where the biggest visibility gaps are in your own operation, our manufacturing consultants would be happy to walk your plant with you.
              </p>

              {/* Direct Contact Info */}
              <div className="pt-6 border-t border-slate-800 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-300 font-medium">
                  <Mail size={16} className="text-[#00A3E0]" />
                  <span>sales@prixgen.com | info@prixgen.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 font-medium">
                  <Phone size={16} className="text-[#00A3E0]" />
                  <span>+91 99300 57159</span>
                </div>
              </div>
            </div>

            {/* Right Lead Capture Form */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200">
              <div className="mb-6 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#004B87] block mb-1">Zero-Cost Plant Architecture Audit</span>
                <h3 className="text-2xl font-bold text-slate-900">Request a Consultation</h3>
                <p className="text-xs text-slate-500 mt-1">Share your plant details to connect with our Odoo & PVC manufacturing architects.</p>
              </div>
              <LeadCaptureForm source="PVC Manufacturing Page" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY / FLOATING WHITEPAPER PROMPT BAR (ON SCROLL)
          ========================================================================= */}
      <AnimatePresence>
        {showStickyPrompt && (
          <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-3.5 shadow-xl text-white flex items-center justify-between gap-3">
            <div className="min-w-0 text-left">
              <div className="text-[11px] font-semibold text-[#00A3E0]">
                PVC Manufacturing Whitepaper
              </div>
              <div className="text-xs text-slate-300 font-medium truncate">
                From Polymer to Pipe (13 Pages)
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsWhitepaperModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#004B87] hover:bg-[#003866] text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Download PDF
              </button>

              <button
                type="button"
                onClick={() => {
                  setDismissedSticky(true);
                  setShowStickyPrompt(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Dismiss prompt"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          GATED WHITEPAPER DOWNLOAD MODAL
          ========================================================================= */}
      <WhitepaperDownloadModal
        isOpen={isWhitepaperModalOpen}
        onClose={() => setIsWhitepaperModalOpen(false)}
        whitepaperTitle="From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers"
        slug="pvc-manufacturing"
        downloadPath="/PVC_whitepaper.pdf"
      />
    </div>
  );
}

