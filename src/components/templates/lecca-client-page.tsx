'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { JsonLd } from '@/components/seo/json-ld';
import { HeroBackground } from '@/components/shared/hero-background';
import { AnimatedConnector } from '@/components/shared/animated-connector';
import { Magnetic } from '@/components/animations/magnetic';
import { RevealText as BaseRevealText } from '@/components/animations/reveal-text';
import { FadeUp as BaseFadeUp } from '@/components/animations/fade-up';

const RevealText = (props: any) => <BaseRevealText {...props} once={false} />;
const FadeUp = (props: any) => <BaseFadeUp {...props} once={false} />;
import { StaggerText } from '@/components/animations/stagger-text';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Settings, 
  Maximize2, 
  Camera,
  FileCheck,
  Database,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function LeccaClientPage({ solution }: { solution: any }) {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <JsonLd 
        type="Service" 
        data={{ 
          name: "Lecca — AI-Powered Pipe & Pipe-in-Pipe Counting", 
          description: "Lecca uses computer vision to count pipe stacks from a single photo — including pipes nested inside larger ones. Built by Prixgen Tech Solutions for manufacturers, traders, ports, and oilfield yards.",
          provider: { "@type": "Organization", "name": "Prixgen Tech Solutions" }
        }} 
      />
      <JsonLd 
        type="BreadcrumbList" 
        data={{ 
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prixgen.com" },
            { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.prixgen.com/solutions" },
            { "@type": "ListItem", position: 3, name: "Lecca AI Pipe Counting", item: "https://www.prixgen.com/solutions/lecca-ai" }
          ]
        }} 
      />

      {/* Hero Header */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden bg-white">
        <HeroBackground />
        
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Hero Dashboard Image (Vertical) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center relative px-6 py-4">
              
              {/* Floating Widget 1: Accuracy */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-2 left-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Live Accuracy</div>
                  <div className="text-xs font-black text-slate-800 whitespace-nowrap">99.7% Verified</div>
                </div>
              </motion.div>

              {/* Floating Widget 2: Speed */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-xl bg-prixgen-blue/5 flex items-center justify-center text-prixgen-blue flex-shrink-0">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                    <Settings className="w-5 h-5" />
                  </motion.div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Process Speed</div>
                  <div className="text-xs font-black text-slate-800 whitespace-nowrap">&lt; 1.0 Second</div>
                </div>
              </motion.div>

              <FadeUp delay={0.3} className="relative w-full max-w-lg aspect-[1122/1402] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-white p-2">
                <OptimizedImage
                  src="/images/lecca/image_1.png"
                  alt="Lecca AI pipe counting dashboard showing 2,842 pipes detected in a warehouse, with pipe-in-pipe and diameter breakdown."
                  fill
                  priority
                  className="object-contain transition-transform duration-700 hover:scale-105 rounded-[2rem]"
                />
              </FadeUp>
            </div>

            {/* Right Column: Hero Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left flex flex-col items-start">
              <FadeUp delay={0.1} className="space-y-6 flex flex-col items-start text-left">
                <Link 
                  href="/solutions" 
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue hover:bg-prixgen-blue hover:text-white transition-all font-black text-[10px] uppercase tracking-widest group mb-1"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Solutions
                </Link>

                {/* Eyebrow */}
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-prixgen-blue/60 block text-left">
                  A PRIXGEN TECH SOLUTIONS PRODUCT
                </span>
                
                {/* Title */}
                <StaggerText 
                  text="Count Every Pipe. Even the Ones Hiding Inside Another." 
                  variant="gradient"
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter text-left"
                />
                
                {/* Subheadline */}
                <div className="max-w-xl text-left">
                  <RevealText delay={0.2}>
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                      Lecca turns a single photo, video, or drone pass over a pipe stack into a verified, tagged count — in under a second, with pipe-in-pipe detection no manual count can match.
                    </p>
                  </RevealText>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto relative z-30">
                  <button 
                    onClick={() => scrollToId('request-pilot')}
                    className="px-8 py-4 rounded-2xl bg-prixgen-blue hover:bg-prixgen-blue/90 text-white font-bold transition-all duration-300 shadow-lg shadow-prixgen-blue/20 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Book a Free Pilot Count
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => scrollToId('how-lecca-works')}
                    className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    See How It Works
                  </button>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
          <AnimatedConnector height="h-32" />
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">

        {/* The Problem We Solve Section */}
        <section className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-[0_30px_60px_-15px_rgba(0,102,204,0.05)] border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-prixgen-blue/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-prixgen-blue/5 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-prixgen-blue" />
                </div>
                <RevealText>
                  <h3 className="text-2xl lg:text-3xl font-bold text-prixgen-dark tracking-tight">The Problem We Solve</h3>
                </RevealText>
              </div>
              <RevealText delay={0.1}>
                <h4 className="text-xl font-bold text-prixgen-blue">Pipe inventory is still counted by hand.</h4>
              </RevealText>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base space-y-4">
                <RevealText delay={0.2}>
                  <p>
                    Manufacturers, stockists, ports, and oilfield yards around the world still count pipe stacks the same way they did decades ago: a clipboard, a calculator, and a person doing the math. It's slow, it's tiring, and on a stack of stacked circular cross-sections, it's genuinely easy to get wrong by a few percent — which adds up fast across a full yard.
                  </p>
                </RevealText>
                <RevealText delay={0.3}>
                  <p className="border-l-4 border-prixgen-blue pl-4 italic text-slate-700 bg-prixgen-blue/[0.02] py-2 pr-2 rounded-r-lg font-medium">
                    Worse, a common industry practice — nesting smaller pipes inside larger ones for transport and storage efficiency — is completely invisible to a surface count. That inventory doesn't show up on the tally sheet at all.
                  </p>
                </RevealText>
              </div>
            </div>
            <div className="lg:col-span-5 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-slate-50 p-2 shadow-lg aspect-video relative">
              <OptimizedImage 
                src="/images/lecca/image_2.png"
                alt="Two warehouse workers manually counting a stack of steel pipes on a truck using a clipboard."
                fill
                className="object-cover rounded-[2rem]"
              />
            </div>
          </div>

          {/* What this costs a yard */}
          <div className="mt-16 pt-12 border-t border-slate-100">
            <RevealText>
              <h4 className="text-xl font-bold text-prixgen-dark mb-8">What this costs a yard</h4>
            </RevealText>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Inventory Errors", desc: "Errors compound across hundreds of racks, leading to inventory discrepancies." },
                { title: "Lost Time", desc: "Full-day stock-takes pull operational teams off high-value projects." },
                { title: "Disputes", desc: "Dispatch and billing disputes with clients, with no independent digital record to settle them." },
                { title: "Safety Risks", desc: "Workers climb tall, unstable pipe stacks, risking falls and injuries." },
                { title: "Invisible Stock", desc: "Nested 'pipe-in-pipe' cargo is never recorded, leading to untracked capital." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-prixgen-blue/20 hover:bg-white hover:shadow-lg transition-all duration-300 relative group cursor-pointer"
                >
                  <div className="absolute top-4 right-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-red-500 mb-4" />
                  <h5 className="text-base font-bold text-prixgen-dark mb-2">{item.title}</h5>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How Lecca Works Section */}
        <section id="how-lecca-works" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <RevealText>
              <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">OPERATIONAL FLOW</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter">How Lecca Works</h2>
            </RevealText>
            <RevealText delay={0.2}>
              <p className="text-slate-500 font-medium">Three steps. No new hardware required.</p>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column: Process Diagram */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <FadeUp className="w-full rounded-[2.5rem] border border-slate-100 bg-white p-3 shadow-xl overflow-hidden relative">
                <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden bg-slate-50">
                  <OptimizedImage 
                    src="/images/lecca/image_3.png"
                    alt="Diagram showing Lecca's process flow: Camera to Lecca AI to Pipe Count to Physical Stock to ERP Inventory, alongside a worker using a tablet to scan a pipe stack."
                    fill
                    className="object-contain"
                  />
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Steps List (Vertical) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              {[
                { step: "1", title: "Capture", icon: Camera, desc: "Point any camera, tablet, or drone at the pipe stack. No special rig or lighting setup needed — Lecca works with normal photos or short videos." },
                { step: "2", title: "Detect", icon: Maximize2, desc: "Lecca's computer-vision engine identifies every pipe end in the frame, tags it, and — critically — looks inside larger pipes for smaller nested ones." },
                { step: "3", title: "Verify", icon: FileCheck, desc: "The count is displayed instantly with a confidence score and diameter size breakdown, ready to push straight into your ERP with one tap." }
              ].map((s, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex gap-4 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-prixgen-blue/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-prixgen-blue/5 border border-prixgen-blue/10 flex items-center justify-center text-prixgen-blue font-black text-lg flex-shrink-0">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-prixgen-blue/60 tracking-wider">Step {s.step}</span>
                    <h3 className="text-base font-bold text-prixgen-dark leading-tight">{s.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Capabilities Section */}
        <section className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <RevealText>
              <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">PRODUCT FEATURES</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter">Key Capabilities</h2>
            </RevealText>
            <RevealText delay={0.2}>
              <p className="text-slate-500 font-medium">Proprietary AI engineering tailored for high-stakes yard audits.</p>
            </RevealText>
          </div>

          <div className="space-y-24 max-w-5xl mx-auto">
            {/* Capability 1 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 35 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <div className="text-xs font-bold uppercase tracking-widest text-prixgen-blue/60">SIGNATURE FEATURE</div>
                <h3 className="text-2xl font-bold text-prixgen-dark tracking-tight">Pipe-in-Pipe Detection</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  Lecca's signature capability. Smaller pipes nested inside larger ones — standard practice for freight efficiency — are detected and counted separately, closing a blind spot every manual count has.
                </p>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-2 shadow-lg aspect-video relative">
                <OptimizedImage 
                  src="/images/lecca/image_4.png"
                  alt="Close-up of pipe ends with AI detection overlay showing outer and inner pipe counts: 16 outer, 48 inner, 64 total, 99.7% accuracy."
                  fill
                  className="object-contain rounded-[2rem] bg-slate-50"
                />
              </div>
            </motion.div>

            {/* Capability 2 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 35 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-2 shadow-lg aspect-video relative">
                <OptimizedImage 
                  src="/images/lecca/image_5.png"
                  alt="Warehouse worker using a tablet showing AI pipe detection with diameter breakdown and pipe-in-pipe count of 93 on colorful PVC pipe stacks."
                  fill
                  className="object-contain rounded-[2rem] bg-slate-50"
                />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-prixgen-blue/60 font-sans">DIAMETER VERIFICATION</div>
                <h3 className="text-2xl font-bold text-prixgen-dark tracking-tight">Multi-Diameter Classification</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  Every detected pipe is automatically sorted by diameter, with a full size breakdown generated alongside the total count — no manual sorting required.
                </p>
              </div>
            </motion.div>

            {/* Capability 3 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 35 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <div className="text-xs font-bold uppercase tracking-widest text-prixgen-blue/60">YARD DISPATCH</div>
                <h3 className="text-2xl font-bold text-prixgen-dark tracking-tight">Dispatch Verification</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  Scans a load against the dispatch order in real time, confirming a match — or flagging a mismatch — before the truck ever leaves the yard, stopping shipping issues early.
                </p>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-2 shadow-lg aspect-video relative">
                <OptimizedImage 
                  src="/images/lecca/image_6.png"
                  alt="AI vision system scanning a loaded truck at a dispatch bay, with a screen showing dispatch order 420 matched and verified."
                  fill
                  className="object-contain rounded-[2rem] bg-slate-50"
                />
              </div>
            </motion.div>

            {/* Capability 4 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 35 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-2 shadow-lg aspect-video relative">
                <OptimizedImage 
                  src="/images/lecca/image_7.png"
                  alt="Pipe inspection overlay showing zero defects found, surface status OK, and measurement data for a stack of pipes."
                  fill
                  className="object-contain rounded-[2rem] bg-slate-50"
                />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-prixgen-blue/60">QUALITY CONTROL</div>
                <h3 className="text-2xl font-bold text-prixgen-dark tracking-tight">Defect & Quality Checks</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  Logs diameter, wall thickness, and surface condition alongside every count, flagging anomalies so a fast count never comes at the cost of quality.
                </p>
              </div>
            </motion.div>

            {/* Capability 5 */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 35 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <div className="text-xs font-bold uppercase tracking-widest text-prixgen-blue/60">FLEXIBLE HARDWARE</div>
                <h3 className="text-2xl font-bold text-prixgen-dark tracking-tight">Works Anywhere</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  From indoor manufacturing floors to open-air ports and desert oilfield yards, Lecca works with any camera, tripod, or drone — no fixed installation required.
                </p>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white p-2 shadow-lg aspect-video relative">
                <OptimizedImage 
                  src="/images/lecca/image_8.png"
                  alt="Fixed camera scanning a large stack of steel pipes at an oilfield yard, with a verified count of 642 pipes displayed."
                  fill
                  className="object-contain rounded-[2rem] bg-slate-50"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industries We Serve Section */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <RevealText>
              <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">SECTORS</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-prixgen-dark tracking-tighter">Industries We Serve</h2>
            </RevealText>
            <RevealText delay={0.2}>
              <p className="text-slate-500 font-medium">Optimizing tubular supply chain audits worldwide.</p>
            </RevealText>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-700 w-1/3">Industry</th>
                    <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-700">How Lecca Helps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { ind: "Steel Pipe & Tube Manufacturing", help: "Finished-goods yard counting, dispatch verification, production-line output counting" },
                    { ind: "Oil & Gas / OCTG", help: "Yard audits at mills, ports, and rig-site laydown yards; count reconciliation across the supply chain" },
                    { ind: "Pipe & Steel Trading / Stockists", help: "Inbound receipt verification and outbound dispatch counting to prevent shrinkage and disputes" },
                    { ind: "Ports & Logistics", help: "Independent, neutral load counts for tubular cargo, reducing disputes between shipper and receiver" },
                    { ind: "EPC & Construction Contractors", help: "Site-received material verification against purchase orders on large capital projects" }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6 text-sm font-extrabold text-prixgen-blue">{row.ind}</td>
                      <td className="p-6 text-sm text-slate-600 leading-relaxed font-medium">{row.help}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Lecca & By the Numbers */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-5xl mx-auto">
          
          {/* Why Lecca */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <RevealText>
                <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">ADVANTAGES</span>
              </RevealText>
              <RevealText delay={0.1}>
                <h2 className="text-3xl font-bold text-prixgen-dark tracking-tight">Why Lecca</h2>
              </RevealText>
            </div>
            <ul className="space-y-6">
              {[
                "Built by an Odoo Gold Partner — Lecca connects directly into your existing ERP inventory, sales, and purchase workflows",
                "Purpose-built for the industry's hardest counting problem: pipe-in-pipe nested detection",
                "Works with the camera you already have — no proprietary hardware required",
                "Deployed across manufacturing floors, ports, and oilfield yards, indoors and out",
                "Backed by Prixgen Tech Solutions, an enterprise ERP and digital transformation consultancy operating across India, the Middle East, and Southeast Asia"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-prixgen-blue" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* By the Numbers */}
          <div className="lg:col-span-5 space-y-8 bg-prixgen-blue/[0.01] p-8 rounded-[2.5rem] border border-prixgen-blue/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="space-y-2">
              <RevealText>
                <span className="text-xs font-black uppercase tracking-widest text-prixgen-blue">METRICS</span>
              </RevealText>
              <RevealText delay={0.1}>
                <h2 className="text-3xl font-bold text-prixgen-dark tracking-tight">By the Numbers</h2>
              </RevealText>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { metric: "Detection Accuracy", val: "Up to 99.7%", icon: Zap },
                { metric: "Processing Time", val: "Under 1 second", desc: "per scan", icon: Settings },
                { metric: "Largest Single Scan", val: "2,842 pipes", desc: "one pass", icon: Maximize2 },
                { metric: "Pipe-in-Pipe Coverage", val: "Outer & Inner", desc: "same frame", icon: Database }
              ].map((n, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-prixgen-blue/20 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-prixgen-blue/5 flex items-center justify-center text-prixgen-blue">
                    <n.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">{n.metric}</div>
                    <div className="text-base font-black text-prixgen-dark">
                      {n.val} <span className="text-xs text-slate-400 font-medium">{n.desc || ""}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </section>

        {/* CTA Section */}
        <section id="request-pilot" className="scroll-mt-24">
          <div className="rounded-[3rem] bg-prixgen-dark p-8 lg:p-12 shadow-2xl relative overflow-hidden text-white">
            
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-prixgen-blue/40 to-transparent opacity-30 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Callout */}
              <div className="lg:col-span-7 space-y-6">
                <RevealText>
                  <span className="text-xs font-black uppercase tracking-widest text-prixgen-lightblue">PILOT STAGES</span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                    See Lecca count your own yard — free.
                  </h2>
                </RevealText>
                <RevealText delay={0.2}>
                  <p className="text-white/60 text-base leading-relaxed font-medium">
                    We're offering a limited number of free pilot counts for manufacturers, traders, ports, and oilfield yards ready to see Lecca on their own inventory.
                  </p>
                </RevealText>

                {/* Email Callout */}
                <a 
                  href="mailto:info@prixgen.com"
                  className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl hover:border-white/30 transition-all group w-full sm:w-auto"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Book a Free Pilot Count</div>
                    <div className="text-sm font-black text-white group-hover:text-prixgen-lightblue transition-colors">info@prixgen.com</div>
                  </div>
                </a>

                {/* CTA Port Image */}
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 p-1 shadow-lg aspect-video max-w-md mt-6 relative">
                  <OptimizedImage 
                    src="/images/lecca/image_9.png"
                    alt="Worker in Lecca-branded safety vest using a tablet to verify a pipe load at Jebel Ali Port, UAE, at sunset."
                    fill
                    className="object-contain rounded-[1.25rem]"
                  />
                </div>
              </div>

              {/* Lead Form */}
              <div className="lg:col-span-5 bg-white border border-slate-100 p-8 rounded-[2rem] shadow-xl text-slate-800 relative z-10">
                <h3 className="text-xl font-bold mb-2 text-prixgen-dark">Request Pilot</h3>
                <p className="text-slate-500 text-xs mb-6 leading-relaxed font-medium">
                  Fill out the form below and our engineering team will get in touch to coordinate your pilot scan.
                </p>
                <LeadCaptureForm source="Lecca AI Custom Pilot Form" />
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
