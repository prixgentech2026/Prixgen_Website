'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { HeroBackground } from '@/components/shared/hero-background';
import { RevealText as BaseRevealText } from '@/components/animations/reveal-text';
import { FadeUp as BaseFadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { solutionsData } from '@/lib/data';
import {
  ArrowLeft,
  Users,
  Factory,
  Package,
  Cpu,
  LineChart,
  Sliders,
  ArrowRight,
  Sparkles,
  ClipboardList
} from 'lucide-react';

const RevealText = (props: any) => <BaseRevealText {...props} once={false} />;
const FadeUp = (props: any) => <BaseFadeUp {...props} once={false} />;

export default function OdooClientPage({ solution }: { solution: any }) {
  const [activeView, setActiveView] = useState<'launcher' | 'crm' | 'mrp' | 'wms' | 'iiot' | 'bi'>('launcher');

  const odooProcessSteps = [
    {
      title: "Phase-Zero Blueprint Alignment",
      description: "We implement world-class enterprise blueprinting standards during phase-zero discovery. Instead of basic requirements mapping, we conduct a rigorous GAP audit of warehouse logic, transactional speed dependencies, and multi-subsidiary ledgers. We set the standard that others follow."
    },
    {
      title: "Clean Core Architecture Implementation",
      description: "We enforce a strict 'Clean Core' philosophy in your Odoo configuration. By maintaining standard objects and building modular integration plugins on top, we prevent customized database dependencies, ensuring upgrade paths remain 100% frictionless."
    },
    {
      title: "Consolidated Financial Blueprinting",
      description: "Multi-entity consolidation is built to comply with the most rigorous global financial control frameworks. We set up automated inter-company accounts, localized tax structures, and automated GAAP reconciliation streams natively in Odoo."
    },
    {
      title: "Industrial Hardware & Telemetry Standard",
      description: "IIoT telemetry, PLC scanners, and weighbridge connections are hardcoded to core WMS moves via high-availability MQTT brokers, delivering true industrial-grade transparency that other ERP installations struggle to achieve."
    },
    {
      title: "Managed Transition & Zero-Latency Go-Live",
      description: "We execute testing protocols based on strict enterprise QA criteria. Load testing, end-to-end integration audits, and localized user sign-offs guarantee a flawless, zero-downtime database cutover."
    }
  ];

  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    if (img.sourceUrl) return img.sourceUrl;
    return img.asset?.url || null;
  };



  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <JsonLd 
        type="Service" 
        data={{ 
          name: "Odoo Enterprise Integration - Certified Gold Partner", 
          description: "Certified Odoo Gold Partner engineering high-performance ERP, supply chain, and IIoT ecosystems. Minimal customization core focus for scalable migrations.",
          provider: { "@type": "Organization", "name": "Prixgen Tech Solutions" }
        }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        data={{ 
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.prixgen.com/solutions" },
            { "@type": "ListItem", position: 3, name: "Odoo Enterprise Integration", item: "https://www.prixgen.com/solutions/odoo" }
          ]
        }} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .odoo-launcher-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 16px;
        }

        .odoo-app-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 14px 10px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 75, 135, 0.08);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 75, 135, 0.02);
        }

        .odoo-app-card:hover {
          transform: translateY(-4px);
          border-color: var(--r4-lightblue);
          box-shadow: 0 12px 24px -8px rgba(0, 163, 224, 0.15);
        }

        .odoo-app-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-weight: bold;
          margin-bottom: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .odoo-app-label {
          font-family: monospace;
          font-size: 9px;
          font-weight: 750;
          color: #334155;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Mockup console styles */
        .odoo-mockup-window {
          background: #FFFFFF;
          border: 1px solid rgba(0, 75, 135, 0.12);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(0, 75, 135, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .odoo-mockup-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          border-bottom: 1px solid rgba(0, 75, 135, 0.08);
          background: #F8FAFC;
        }

        .odoo-mockup-address {
          flex: 1;
          max-w-[280px];
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 8px;
          padding: 4px 12px;
          font-family: monospace;
          font-size: 9px;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid rgba(0, 75, 135, 0.06);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .odoo-mockup-body {
          flex: 1;
          background: #FAFAFA;
          display: flex;
          flex-direction: column;
        }

        /* Kanban Pipeline */
        .odoo-kanban {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 12px;
          flex: 1;
        }

        .odoo-kanban-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #F1F5F9;
          border-radius: 12px;
          padding: 10px;
        }

        .odoo-kanban-header {
          font-size: 8px;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding-bottom: 6px;
          display: flex;
          justify-content: space-between;
        }

        .odoo-kanban-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        /* Gantt Scheduling */
        .odoo-gantt-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 12px;
          align-items: center;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(0,0,0,0.03);
        }

        .odoo-gantt-label {
          font-family: monospace;
          font-size: 8px;
          font-weight: 750;
          color: #475569;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .odoo-gantt-track {
          height: 14px;
          background: #E2E8F0;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .odoo-gantt-bar {
          height: 100%;
          border-radius: 4px;
          position: absolute;
          animation: odoo-gantt-fill 2s ease-out forwards;
        }

        @keyframes odoo-gantt-fill {
          from { width: 0; }
        }

        /* WMS Stock */
        .odoo-wms-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          padding: 12px;
        }

        .odoo-wms-bin {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Log console */
        .odoo-terminal {
          background: #0B0F19;
          font-family: monospace;
          font-size: 9.5px;
          color: #00A3E0;
          padding: 12px;
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .odoo-terminal span {
          display: block;
          line-height: 1.4;
        }
      ` }} />

      {/* Hero Header */}
      <section className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden bg-white">
        <HeroBackground />
        
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-left flex flex-col items-start">
              <FadeUp delay={0.1} className="space-y-6 flex flex-col items-start text-left">
                <Link 
                  href="/solutions" 
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue hover:bg-prixgen-blue hover:text-white transition-all font-black text-[10px] uppercase tracking-widest group mb-1"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Solutions
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-prixgen-blue block">
                    Certified Odoo Gold Partner
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                </div>
                
                <StaggerText 
                  text="Odoo Architecture, Engineered for Scale." 
                  variant="gradient"
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-left"
                />
                
                <div className="max-w-xl text-left">
                  <RevealText delay={0.2}>
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                      We don't just implement Odoo software; we architect custom operations engines. Gold Partner expertise dedicated to zero-customization core design, complex migrations, and native IIoT integrations.
                    </p>
                  </RevealText>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
                    <span className="text-xl font-bold text-prixgen-blue">100%</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-tight">In-House<br/>Team</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
                    <span className="text-xl font-bold text-prixgen-blue">Zero</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide leading-tight">System<br/>Latency</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Odoo Mockup Switcher Console */}
            <div className="lg:col-span-6 relative">
              <FadeUp delay={0.3}>
                <div className="odoo-mockup-window">
                  <div className="odoo-mockup-nav">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] opacity-80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] opacity-80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] opacity-80"></span>
                      
                      {activeView !== 'launcher' && (
                        <button 
                          onClick={() => setActiveView('launcher')}
                          className="ml-3 flex items-center gap-1 text-[9px] font-bold text-[#004B87] hover:text-[#00A3E0] transition-colors"
                        >
                          ← Switch App
                        </button>
                      )}
                    </div>
                    
                    <div className="odoo-mockup-address">
                      <span className="w-1.5 h-1.5 rounded-full bg-prixgen-blue animate-pulse"></span>
                      <span>odoo.prixgen.com/web{activeView !== 'launcher' ? `#action=${activeView}` : ''}</span>
                    </div>

                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      {activeView === 'launcher' ? 'Launchpad' : activeView}
                    </div>
                  </div>

                  <div className="odoo-mockup-body">
                    {activeView === 'launcher' && (
                      <div className="flex-1 flex flex-col justify-between p-4">
                        <div>
                          <div className="text-[10px] font-bold text-[#004B87] uppercase tracking-widest px-4 pt-2 pb-4">
                            Prixgen Enterprise Modules
                          </div>
                          
                          <div className="odoo-launcher-grid">
                            {/* CRM Icon */}
                            <div className="odoo-app-card" onClick={() => setActiveView('crm')}>
                              <div className="odoo-app-icon bg-indigo-600">
                                <Users className="w-5 h-5" />
                              </div>
                              <span className="odoo-app-label">CRM & Sales</span>
                            </div>

                            {/* MRP Icon */}
                            <div className="odoo-app-card" onClick={() => setActiveView('mrp')}>
                              <div className="odoo-app-icon bg-orange-500">
                                <Factory className="w-5 h-5" />
                              </div>
                              <span className="odoo-app-label">Manufacturing</span>
                            </div>

                            {/* WMS Icon */}
                            <div className="odoo-app-card" onClick={() => setActiveView('wms')}>
                              <div className="odoo-app-icon bg-blue-500">
                                <Package className="w-5 h-5" />
                              </div>
                              <span className="odoo-app-label">Inventory</span>
                            </div>

                            {/* IIoT Icon */}
                            <div className="odoo-app-card" onClick={() => setActiveView('iiot')}>
                              <div className="odoo-app-icon bg-teal-500">
                                <Cpu className="w-5 h-5" />
                              </div>
                              <span className="odoo-app-label">IIoT Link</span>
                            </div>

                            {/* BI Icon */}
                            <div className="odoo-app-card" onClick={() => setActiveView('bi')}>
                              <div className="odoo-app-icon bg-emerald-600">
                                <LineChart className="w-5 h-5" />
                              </div>
                              <span className="odoo-app-label">Financials</span>
                            </div>

                            {/* Studio Icon */}
                            <div className="odoo-app-card" onClick={() => setActiveView('launcher')}>
                              <div className="odoo-app-icon bg-purple-600">
                                <Sliders className="w-5 h-5" />
                              </div>
                              <span className="odoo-app-label">BI Studio</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500">SELECT AN APP TO PREVIEW PRIXGEN INTERACTION</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                      </div>
                    )}

                    {/* CRM View */}
                    {activeView === 'crm' && (
                      <div className="flex-1 flex flex-col p-4 justify-between">
                        <div className="odoo-kanban">
                          <div className="odoo-kanban-col">
                            <div className="odoo-kanban-header">
                              <span>New Lead</span>
                              <span>2</span>
                            </div>
                            <div className="odoo-kanban-card space-y-1">
                              <div className="text-[9px] font-bold text-slate-800 leading-tight">Odoo Migration proposal</div>
                              <div className="text-[7.5px] text-slate-400 font-bold">$45,000 · FMCG Leader</div>
                            </div>
                            <div className="odoo-kanban-card space-y-1">
                              <div className="text-[9px] font-bold text-slate-800 leading-tight">IIoT Weighbridge Setup</div>
                              <div className="text-[7.5px] text-slate-400 font-bold">$12,000 · Metal Corp</div>
                            </div>
                          </div>

                          <div className="odoo-kanban-col">
                            <div className="odoo-kanban-header">
                              <span>Qualified</span>
                              <span>1</span>
                            </div>
                            <div className="odoo-kanban-card space-y-1 border-l-2 border-prixgen-blue">
                              <div className="text-[9px] font-bold text-slate-800 leading-tight">Multi-warehouse audit</div>
                              <div className="text-[7.5px] text-slate-400 font-bold">$30,000 · Food Logistics</div>
                            </div>
                          </div>

                          <div className="odoo-kanban-col">
                            <div className="odoo-kanban-header">
                              <span>Won</span>
                              <span>1</span>
                            </div>
                            <div className="odoo-kanban-card space-y-1 border-l-2 border-emerald-500 bg-emerald-50/20">
                              <div className="text-[9px] font-bold text-slate-800 leading-tight">Lecca Vision License</div>
                              <div className="text-[7.5px] text-emerald-600 font-bold">$92,000 · Shipped</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center justify-between">
                            <div>
                              <div className="text-[8px] font-bold text-slate-400 uppercase">Conversion Rate</div>
                              <div className="text-sm font-black text-slate-800">84.2%</div>
                            </div>
                            <span className="text-xs">📈</span>
                          </div>
                          <div className="bg-white p-3 border border-slate-100 rounded-xl flex items-center justify-between">
                            <div>
                              <div className="text-[8px] font-bold text-slate-400 uppercase">Won Volume</div>
                              <div className="text-sm font-black text-[#004B87]">$179,000</div>
                            </div>
                            <span className="text-xs">🎯</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MRP View */}
                    {activeView === 'mrp' && (
                      <div className="flex-1 flex flex-col p-4 justify-between">
                        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                          <div className="odoo-gantt-row bg-slate-50 border-b border-slate-100">
                            <span className="odoo-gantt-label font-bold">WORK CENTER</span>
                            <span className="odoo-gantt-label font-bold text-right pr-4">TIMELINE</span>
                          </div>

                          <div className="odoo-gantt-row">
                            <span className="odoo-gantt-label">Assembly Line 1</span>
                            <div className="odoo-gantt-track">
                              <div className="odoo-gantt-bar bg-prixgen-blue" style={{ width: '80%' }}></div>
                            </div>
                          </div>

                          <div className="odoo-gantt-row">
                            <span className="odoo-gantt-label">Packaging Cell</span>
                            <div className="odoo-gantt-track">
                              <div className="odoo-gantt-bar bg-[#00A3E0]" style={{ width: '45%' }}></div>
                            </div>
                          </div>

                          <div className="odoo-gantt-row">
                            <span className="odoo-gantt-label">QC Station 2</span>
                            <div className="odoo-gantt-track">
                              <div className="odoo-gantt-bar bg-amber-500" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="bg-white p-3 border border-slate-100 rounded-xl text-center">
                            <div className="text-[7.5px] font-bold text-slate-400 uppercase">Work orders</div>
                            <div className="text-xs font-black text-slate-800">14 Active</div>
                          </div>
                          <div className="bg-white p-3 border border-slate-100 rounded-xl text-center">
                            <div className="text-[7.5px] font-bold text-slate-400 uppercase">Yield Index</div>
                            <div className="text-xs font-black text-emerald-600">99.2%</div>
                          </div>
                          <div className="bg-white p-3 border border-slate-100 rounded-xl text-center">
                            <div className="text-[7.5px] font-bold text-slate-400 uppercase">Capacity</div>
                            <div className="text-xs font-black text-slate-800">88.5%</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* WMS View */}
                    {activeView === 'wms' && (
                      <div className="flex-1 flex flex-col p-4 justify-between">
                        <div className="odoo-wms-grid">
                          <div className="odoo-wms-bin border-l-2 border-emerald-500">
                            <span className="text-[8px] font-bold text-slate-400">BIN A-102</span>
                            <span className="text-[10px] font-black text-[#004B87]">94%</span>
                          </div>
                          <div className="odoo-wms-bin border-l-2 border-emerald-500">
                            <span className="text-[8px] font-bold text-slate-400">BIN A-103</span>
                            <span className="text-[10px] font-black text-[#004B87]">88%</span>
                          </div>
                          <div className="odoo-wms-bin border-l-2 border-amber-500">
                            <span className="text-[8px] font-bold text-slate-400">BIN B-204</span>
                            <span className="text-[10px] font-black text-[#004B87]">45%</span>
                          </div>
                          <div className="odoo-wms-bin border-l-2 border-slate-200">
                            <span className="text-[8px] font-bold text-slate-400">BIN B-205</span>
                            <span className="text-[10px] font-black text-slate-300">EMPTY</span>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-xl p-3 flex-1 flex flex-col justify-between mt-2">
                          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Live warehouse flow</div>
                          <div className="space-y-1.5 font-mono text-[8px] text-slate-500">
                            <div className="flex justify-between items-center bg-slate-50 p-1 rounded">
                              <span>RECEIPT #942</span>
                              <span className="text-emerald-600 font-bold">COMPLETED</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-1 rounded">
                              <span>TRANSFER #1048</span>
                              <span className="text-[#00A3E0] font-bold">ROUTING</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-1 rounded">
                              <span>DELIVERY #2904</span>
                              <span className="text-slate-400 font-bold">PENDING</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* IIoT View */}
                    {activeView === 'iiot' && (
                      <div className="flex-1 flex flex-col">
                        <div className="odoo-terminal">
                          <span>[10:42:01] MQTT: Connected to broker.hivemq.com</span>
                          <span>[10:42:02] IIOT: Machine speed ingestion calibrated</span>
                          <span>[10:42:03] IIOT: Packaging cell 2 speed: 124 packages/min</span>
                          <span className="text-amber-400">[10:42:04] IIOT: Warning - temperature threshold warning at sensor 14</span>
                          <span>[10:42:05] MQTT: Ingested telemetry packet #4902</span>
                          <span className="text-emerald-400">[10:42:06] IIOT: Auto-adjust signal sent. Calibration verified.</span>
                        </div>
                      </div>
                    )}

                    {/* BI View */}
                    {activeView === 'bi' && (
                      <div className="flex-1 flex flex-col p-4 justify-between">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 border border-slate-100 rounded-2xl">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Company Profit</span>
                            <span className="text-xl font-bold text-slate-800">+$242,500</span>
                            <span className="text-[8px] font-bold text-emerald-600 block mt-1">+14.2% MoM</span>
                          </div>
                          <div className="bg-white p-4 border border-slate-100 rounded-2xl">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cash Inflow</span>
                            <span className="text-xl font-bold text-[#004B87]">$1.48M</span>
                            <span className="text-[8px] font-bold text-slate-400 block mt-1">Direct ERP reconciliation</span>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-2xl p-4 flex-1 flex flex-col justify-between mt-4">
                          <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reconciliation Yield</div>
                          <div className="flex items-end justify-between gap-1 flex-1 h-[45px] pt-2">
                            <div className="bg-slate-100 hover:bg-prixgen-blue w-6 rounded-t transition-all h-[40%]" title="Jan"></div>
                            <div className="bg-slate-100 hover:bg-prixgen-blue w-6 rounded-t transition-all h-[55%]" title="Feb"></div>
                            <div className="bg-slate-100 hover:bg-prixgen-blue w-6 rounded-t transition-all h-[80%]" title="Mar"></div>
                            <div className="bg-[#00A3E0] w-6 rounded-t h-[95%]" title="Apr"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Solution Detail copy */}
          <article className="lg:col-span-2 space-y-12">
            
            {/* Executive Summary */}
            <FadeUp className="relative bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,102,204,0.05)] border border-slate-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-prixgen-blue/5 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-prixgen-blue" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Integration Strategy</h3>
              </div>

              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
                <p className="font-medium">
                  At Prixgen, we look at Odoo differently. Many partners resell generic software configurations and build heavy, customized layers that break during subsequent upgrades. We build Odoo Enterprise solutions based on a <strong>minimal-customization core strategy</strong>.
                </p>
                <p>
                  By leveraging standard Odoo objects and writing robust integration plugins on top, we ensure that your database remains highly maintainable. This guarantees long-term scalability and reduces the technical debt of your ERP system.
                </p>
                <p>
                  From complex multi-subsidiary financial reconciliations to automated shop-floor operations with IIoT telemetry overlays, our gold partner consultants map every single functional pipeline to ensure your manufacturing schedules run smoothly.
                </p>
              </div>
            </FadeUp>

            {/* Key Capabilities */}
            <div className="space-y-8">
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tighter">
                  Enterprise <span className="italic text-prixgen-blue">Capabilities</span>
                </h2>
              </FadeUp>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {solution.features?.map((feature: any, i: number) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div className="group h-full p-8 bg-white border border-slate-100 hover:border-prixgen-blue/20 hover:shadow-[0_20px_45px_rgba(0,75,135,0.08)] rounded-[2.5rem] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-prixgen-blue/[0.02] to-transparent pointer-events-none" />
                      
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-prixgen-blue group-hover:bg-[#004B87] group-hover:text-white transition-all duration-300">
                          {i === 0 ? <Users className="w-5 h-5" /> : i === 1 ? <Package className="w-5 h-5" /> : i === 2 ? <Sliders className="w-5 h-5" /> : <LineChart className="w-5 h-5" />}
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-slate-900 group-hover:text-prixgen-blue transition-colors tracking-tight">
                            {feature.title}
                          </h4>
                          <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Strategic Outcomes Banner */}
            <FadeUp className="relative rounded-[3rem] bg-[#004B87] overflow-hidden p-8 lg:p-12 shadow-2xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-prixgen-blue/40 to-transparent opacity-30 pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-prixgen-lightblue tracking-tighter">Zero</div>
                  <h4 className="font-bold text-md">Upgrade friction</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Minimal customization core strategy keeps you upgrade-ready.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-prixgen-lightblue tracking-tighter">Gold</div>
                  <h4 className="font-bold text-md">Partner Standard</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Elite developers verified by Odoo for high-stakes ERP rescue operations.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-prixgen-lightblue tracking-tighter">100%</div>
                  <h4 className="font-bold text-md">Telemetry Sync</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Weighbridge, barcodes, and PLC sensors piped directly to core inventory objects.</p>
                </div>
              </div>
            </FadeUp>

            {/* Timeline */}
            <div className="space-y-10">
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tighter">
                  Implementation <span className="italic text-prixgen-blue">Roadmap</span>
                </h2>
              </FadeUp>
              
              <div className="space-y-0 relative pl-6 md:pl-10">
                <div className="absolute top-0 bottom-0 left-[23px] md:left-[35px] w-0.5 bg-gradient-to-b from-prixgen-blue/30 via-slate-200 to-transparent" />
                
                {odooProcessSteps.map((step: any, i: number) => (
                  <FadeUp key={i} delay={i * 0.1} className="relative flex gap-6 md:gap-8 group pb-12 last:pb-0">
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-prixgen-blue/10 flex items-center justify-center font-black text-prixgen-blue text-sm shadow-sm group-hover:border-prixgen-blue group-hover:bg-[#004B87] group-hover:text-white transition-all duration-300">
                      {i + 1}
                    </div>
                    <div className="space-y-2 pt-1.5">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-prixgen-blue transition-colors tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

          </article>

          {/* Right Column: Sticky Lead Capture Audit Form */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <FadeUp delay={0.4} className="bg-white p-8 rounded-[3rem] border border-prixgen-blue/10 shadow-2xl shadow-prixgen-blue/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-full blur-3xl -mr-16 -mt-16" />
                
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-prixgen-blue">Solution Audit</span>
                  <Sparkles className="w-3.5 h-3.5 text-prixgen-blue animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-950 relative z-10">Request an Audit</h3>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed font-medium relative z-10">
                  Arrange a consultation with our gold partner team to evaluate your current setup, database size, and target architecture.
                </p>
                <div className="relative z-10">
                  <LeadCaptureForm source="Solution: Odoo Enterprise Integration" />
                </div>
              </FadeUp>

              {/* Related solutions list */}
              <div className="p-8 bg-prixgen-blue/[0.02] border border-prixgen-blue/5 rounded-[3rem]">
                <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">Other Solutions</h4>
                <div className="space-y-3">
                  {solutionsData
                    .filter(s => s.slug !== 'odoo')
                    .slice(0, 3)
                    .map((related, i) => (
                      <Link 
                        key={i} 
                        href={`/solutions/${related.slug}`}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all group"
                      >
                        <span className="font-bold text-slate-600 group-hover:text-prixgen-blue text-sm">{related.title}</span>
                        <div className="w-6 h-6 rounded-full bg-prixgen-blue/5 flex items-center justify-center text-prixgen-blue group-hover:bg-[#004B87] group-hover:text-white transition-colors">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Integrated Bottom CTA Card */}
      <div className="container mx-auto px-4 pb-16">
        <FadeUp className="mt-8">
          <div className="relative rounded-[3rem] bg-white border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,102,204,0.05)] p-8 lg:p-12 overflow-hidden text-center max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/[0.01] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-prixgen-blue/[0.01] rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold text-[10px] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00A3E0] animate-pulse" />
                <span>In-House Gold Partner Integration</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter max-w-2xl mx-auto leading-tight">
                Ready to Architect Your Enterprise Core?
              </h2>
              
              <p className="text-slate-500 font-medium text-base leading-relaxed max-w-2xl mx-auto">
                We design and deploy ERP ecosystems built around a minimal customization core strategy, ensuring long-term upgradeability and zero operational friction. Get an elite-standard system audit from our certified team today.
              </p>
              
              <div className="pt-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#004B87] hover:bg-[#003B6B] text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-prixgen-blue/10 hover:scale-[1.02] group"
                >
                  <span>Schedule a System Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
