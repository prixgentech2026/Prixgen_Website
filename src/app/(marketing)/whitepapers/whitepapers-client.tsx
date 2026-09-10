'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FileText, Download, CheckCircle2, ArrowRight, 
  Layers, Cpu, Activity, ShieldCheck, Sparkles, BookOpen
} from 'lucide-react';
import { WhitepaperDownloadModal } from '@/components/features/whitepaper-download-modal';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { HeroBadge } from '@/components/shared/hero-badge';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';

interface WhitepaperItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  pages: string;
  publishedDate: string;
  downloadPath: string;
  keyTakeaways: string[];
  topics: string[];
  isFeatured?: boolean;
}

const WHITEPAPERS: WhitepaperItem[] = [
  {
    id: 'pvc-operating-model',
    slug: 'pvc-manufacturing',
    title: 'From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers',
    subtitle: 'A comprehensive 13-page technical blueprint and reference architecture for modernizing extrusion lines, raw material compounding, and ERP synchronization.',
    description: 'Traditional PVC manufacturing operations struggle with siloed compounding, opaque resin lot genealogy, and delayed batch costing. This comprehensive research benchmark details how leading plants deploy an integrated Odoo & IIoT digital backbone to achieve sub-second scrap accountability, real-time extrusion telemetry, and automated formulation scaling.',
    badge: '13-Page Reference Architecture • Industry 4.0',
    pages: '13 Pages',
    publishedDate: 'Q3 2026',
    downloadPath: '/PVC_whitepaper.pdf',
    isFeatured: true,
    keyTakeaways: [
      'End-to-end resin batch tracking and multi-stage formulation recipes',
      'Real-time extruder line SCADA & speed/temperature telemetry synchronization',
      'Accurate regrind & scrap recovery accounting tied directly to GL ledger',
      'Multi-plant production scheduling and unified quality compliance checklists'
    ],
    topics: [
      'Raw Material Sourcing & Formulation',
      'Live Extrusion SCADA Telemetry',
      'Scrap & Regrind Accounting',
      'Batch Genealogy & Traceability'
    ]
  }
];

export default function WhitepapersClient() {
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<WhitepaperItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (item: WhitepaperItem) => {
    setSelectedWhitepaper(item);
    setModalOpen(true);
  };

  const featured = WHITEPAPERS.find(w => w.isFeatured) || WHITEPAPERS[0];
  const others = WHITEPAPERS.filter(w => !w.isFeatured);

  return (
    <div className="bg-white min-h-screen selection:bg-prixgen-blue selection:text-white pb-24">
      {/* Header spacing */}
      <div className="h-20" />

      {/* Hero Header Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        <AmbientGlow />
        
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#004B87 1px, transparent 1px)', 
            backgroundSize: '36px 36px' 
          }} 
        />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <FadeUp className="space-y-4">
            <HeroBadge text="Executive & Engineering Research" align="center" className="mb-2" />
            
            <StaggerText 
              text="Industrial White Papers & Technical Benchmarks" 
              variant="gradient"
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-4 tracking-tighter"
            />
            
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
              In-depth operational blueprints, enterprise architecture frameworks, and real-world system benchmarks engineered by Prixgen's senior industrial consultants.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured Whitepaper Showcase */}
      <section className="py-8 lg:py-12 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-prixgen-blue animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">
              Featured Technical Benchmark
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden shadow-2xl border border-slate-800"
          >
            {/* Background Accent Grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 p-8 md:p-12 relative z-10 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-prixgen-lightblue text-[10px] font-black uppercase tracking-[0.2em]">
                  <Sparkles size={13} className="text-prixgen-lightblue" />
                  {featured.badge}
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] text-white">
                  {featured.title}
                </h2>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                  {featured.description}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-black uppercase tracking-widest text-prixgen-lightblue">
                    What You Will Discover:
                  </p>
                  <div className="grid gap-2">
                    {featured.keyTakeaways.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-prixgen-lightblue shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-slate-200 font-medium leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => handleOpenModal(featured)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-prixgen-lightblue to-prixgen-blue hover:from-prixgen-blue hover:to-[#003866] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-prixgen-blue/30 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group"
                  >
                    <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                    Download Free Whitepaper (PDF)
                  </button>
                  <span className="text-xs text-slate-400 font-semibold">
                    Instant PDF Download • 13 Pages
                  </span>
                </div>
              </div>

              {/* Right Column: PDF Preview Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div 
                  onClick={() => handleOpenModal(featured)}
                  className="relative group/doc cursor-pointer w-full max-w-[320px] aspect-[1/1.4] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 shadow-2xl hover:border-prixgen-lightblue/40 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Technical Report</span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-prixgen-lightblue/20 text-prixgen-lightblue uppercase">PDF</span>
                    </div>

                    <div className="pt-2">
                      <div className="h-10 w-10 rounded-xl bg-prixgen-blue/30 border border-prixgen-lightblue/30 flex items-center justify-center text-prixgen-lightblue mb-4">
                        <FileText size={22} />
                      </div>
                      <h4 className="text-base font-bold text-white leading-snug line-clamp-3">
                        From Polymer to Pipe
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        Operating Model for PVC & Plastics Extrusion Manufacturers.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Format: PDF</span>
                      <span>Length: 13 Pages</span>
                    </div>
                    <div className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-prixgen-lightblue hover:text-slate-900 transition-colors text-center text-xs font-black uppercase tracking-widest text-white flex items-center justify-center gap-2">
                      <Download size={13} />
                      Access Document
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Whitepapers & Research Catalog */}
      {others.length > 0 && (
        <section className="py-16 bg-slate-50/60 border-t border-slate-100 mt-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-left mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-prixgen-blue">
                Research Library
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-prixgen-dark tracking-tight mt-1">
                More Industrial Intelligence Benchmarks
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {others.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-wider text-prixgen-blue bg-prixgen-blue/5 border border-prixgen-blue/10 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{item.pages}</span>
                    </div>

                    <h4 className="text-lg font-black text-prixgen-dark group-hover:text-prixgen-blue transition-colors leading-snug tracking-tight">
                      {item.title}
                    </h4>

                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      {item.subtitle}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-50">
                      {item.keyTakeaways.slice(0, 2).map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-prixgen-blue shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Published {item.publishedDate}</span>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-prixgen-blue/5 hover:bg-prixgen-blue text-prixgen-blue hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Download size={13} />
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Architecture Audit Contact Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-950 to-slate-900 border-r border-white/5">
              <div className="space-y-6">
                <span className="text-[10px] text-prixgen-lightblue font-black uppercase tracking-[0.25em]">Consulting Engagement</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
                  Need Custom Architecture Engineered?
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Our senior industrial architects evaluate your current manufacturing workflow gap and design a custom Odoo ERP & IIoT roadmap.
                </p>
              </div>

              <div className="space-y-4 pt-10 border-t border-white/10 mt-8">
                {[
                  "Deep-dive technical assessment of plant processes",
                  "Phase-Zero blueprint before code commit",
                  "Zero data re-entry with live machine SCADA feeds"
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-prixgen-lightblue h-5 w-5 shrink-0" />
                    <span className="text-xs text-slate-300 font-semibold">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-12 bg-white text-slate-800">
              <h4 className="text-lg font-black text-prixgen-blue mb-6 tracking-tight">Schedule an Industrial Audit</h4>
              <LeadCaptureForm source="Whitepapers Landing Page" />
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper Lead Capture & Download Modal */}
      {selectedWhitepaper && (
        <WhitepaperDownloadModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          whitepaperTitle={selectedWhitepaper.title}
          slug={selectedWhitepaper.slug}
          downloadPath={selectedWhitepaper.downloadPath}
        />
      )}
    </div>
  );
}
