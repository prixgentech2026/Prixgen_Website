'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, PenTool, Code, 
  TrendingUp, Users, ShieldCheck, 
  LineChart, Server, Activity,
  ArrowRight, Globe, Zap, Database
} from "lucide-react";
import Link from 'next/link';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { ServicesPageData } from '@/lib/data';
import { AnimatedConnector } from '@/components/shared/animated-connector';
import { HeroBadge } from '@/components/shared/hero-badge';
import { HeroBackground } from '@/components/shared/hero-background';

const IconMap: Record<string, any> = {
  Search, PenTool, Code, 
  TrendingUp, Users, ShieldCheck, 
  LineChart, Server, Activity,
  Globe, Zap, Database
};

const getIcon = (name: string) => IconMap[name] || Globe;

export default function ServicesClient({ data }: { data: ServicesPageData }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      {/* Section 1: The Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-12 overflow-hidden bg-white">
        <HeroBackground />

        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <FadeUp className="space-y-6">
            
            <StaggerText 
              text={data.title} 
              variant="gradient"
              className="text-5xl md:text-6xl font-black leading-[0.9] mb-8 tracking-tighter"
            />
            
            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-4xl mx-auto">
              {data.heroSubheadline}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/contact"
                    className="inline-block px-10 py-5 bg-prixgen-blue text-white rounded-2xl font-bold text-lg shadow-xl shadow-prixgen-blue/20 hover:bg-prixgen-dark transition-colors"
                  >
                    Book a Strategy Session
                  </Link>
                </motion.div>
               <Link href="#methodology" className="group flex items-center gap-3 text-prixgen-blue font-bold text-lg">
                 Explore Methodology
                 <motion.div
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                 >
                   <ArrowRight size={20} />
                 </motion.div>
               </Link>
            </div>
          </FadeUp>
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20">
          <AnimatedConnector height="h-32" />
        </div>
      </section>

      {/* Section 2: Our Methodology (The Voyage) */}
      <section id="methodology" className="py-10 lg:py-16 bg-slate-100/50 border-t border-slate-200/60 relative overflow-hidden">
        {/* Architectural Background Pattern for Section Demarcation */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#0047ab 1px, transparent 1px), linear-gradient(90deg, #0047ab 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Process Intelligence</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-prixgen-blue tracking-tighter">
                Our <span className="text-prixgen-lightblue">Methodology</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} className="max-w-md text-right hidden lg:block">
              <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                We don&apos;t just implement software; we engineer operational success through a three-stage strategic voyage.
              </p>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 z-0 hidden md:block" />
            
            {data.methodology.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <FadeUp key={i} delay={i * 0.2} className="relative z-10">
                  <motion.div 
                    whileHover={{ y: -20, scale: 1.02 }}
                    whileInView={{ 
                      backgroundColor: ["#f5f3ff", "#f0f0ff", "#f3f0ff", "#f5f3ff"],
                      borderColor: ["rgba(139, 92, 246, 0.1)", "rgba(139, 92, 246, 0.2)", "rgba(139, 92, 246, 0.1)"]
                    }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ 
                      backgroundColor: { duration: 10, repeat: Infinity, ease: "linear", delay: i * 2 },
                      borderColor: { duration: 5, repeat: Infinity, ease: "linear" },
                      y: { type: "spring", stiffness: 300 },
                      scale: { type: "spring", stiffness: 300 }
                    }}
                    className="group relative p-12 rounded-[4rem] border shadow-2xl shadow-indigo-100/50 h-full overflow-hidden flex flex-col"
                  >
                    {/* Static Subdued Background */}
                    <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />

                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] z-0`} />
                    
                    <div className="absolute top-8 right-12 text-8xl lg:text-9xl font-black text-transparent [WebkitTextStroke:1px_rgba(99,102,241,0.15)] group-hover:[WebkitTextStroke:1px_rgba(139,92,246,0.3)] transition-all duration-700 select-none z-0 pointer-events-none">
                      {item.step}
                    </div>
                    
                    <div className="relative z-10 space-y-8 flex-grow">
                      <motion.div 
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        className={`w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon size={36} />
                      </motion.div>
                      <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-indigo-900 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                        <p className="text-lg text-indigo-950/60 leading-relaxed text-left font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-12 h-1.5 w-full bg-indigo-100/50 rounded-full overflow-hidden relative z-10">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: i * 0.3 }}
                        className={`h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-[length:200%_100%] animate-gradient`}
                      />
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Core Capabilities */}
      <section className="py-10 lg:py-14 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Core Capabilities</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-prixgen-blue tracking-tighter leading-tight">
                What is your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">challenge?</span>
              </h2>
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mt-6">
                We specialize in high-stakes architectural pivots and enterprise-grade system modernization.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
               <Link href="/contact" className="px-8 py-4 border-2 border-prixgen-blue text-prixgen-blue rounded-xl font-bold hover:bg-prixgen-blue hover:text-white transition-all inline-block">
                 Schedule an Audit
               </Link>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.coreServices.filter(s => s !== null).map((service, i) => {
              const getImageUrl = (img: any) => {
                if (!img) return null;
                if (typeof img === 'string') return img;
                return img.sourceUrl || img.asset?.url || null;
              };

              const serviceImages: Record<string, string> = {
                "business-strategy": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
                "it-consulting": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
                "accounting-advisory": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000",
                "management-consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
                "supply-chain-consulting": "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1000",
                "warehouse-management": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
                "hiring-odoo-developers": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
                "iiot-telemetry": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
                "automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
                "cloud-infrastructure": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
              };

              const bgImage = service.externalImageUrl || getImageUrl(service.featuredImage) || serviceImages[service.slug] || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000";

              const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
              const basePath = engineeringSlugs.includes(service.slug) ? "/engineering-services" : "/services";

              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <Link href={`${basePath}/${service.slug}`} className="block group h-full">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="relative p-12 bg-prixgen-gray/30 rounded-[3rem] h-full flex flex-col justify-between transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.2)] border border-transparent hover:border-prixgen-blue/10 overflow-hidden"
                    >
                      {/* Background Image Layer */}
                      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
                        <motion.img 
                          src={bgImage}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          initial={{ filter: "grayscale(100%)", opacity: 0.3 }}
                          whileHover={{ 
                            filter: "grayscale(0%)", 
                            opacity: 1,
                            scale: 1.1, 
                            rotate: 0 
                          }}
                          transition={{ 
                            duration: 0.8,
                            scale: { duration: 10 }
                          }}
                        />
                      </div>
                      
                      <div className="space-y-8 relative z-10">
                         <motion.div 
                           whileHover={{ scale: 1.1, backgroundColor: "#0047ab", color: "#fff" }}
                           className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500"
                         >
                           <Globe size={28} />
                         </motion.div>
                         <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-prixgen-blue leading-tight group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{service.title}</h3>
                            <p className="text-lg text-prixgen-dark/80 leading-relaxed text-left font-bold group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                              {service.headline}
                            </p>
                         </div>
                      </div>
                      
                      <div className="mt-12 relative z-10 flex items-center text-prixgen-blue font-bold text-sm uppercase tracking-widest group-hover:text-white group-hover:translate-x-2 transition-all duration-300 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        View Service <ArrowRight className="ml-2" size={16} />
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Enterprise Outcomes */}
      <section className="py-10 lg:py-14 bg-[#020617] text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 z-0 opacity-20" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-prixgen-lightblue" />
                <span className="text-prixgen-lightblue font-bold tracking-[0.4em] uppercase text-[10px]">Outcome-Based Engineering</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tighter">
                The Value of <br />
                <span className="text-prixgen-lightblue">Modernization</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg lg:text-xl text-white/50 leading-relaxed font-medium">
                We translate technical complexity into measurable business value, ensuring your enterprise stays agile, efficient, and future-proof.
              </p>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.outcomes.map((outcome, i) => {
              const Icon = getIcon(outcome.icon);
              return (
                <FadeUp key={i} delay={i * 0.1} className="group">
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all h-full"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <div className="w-14 h-14 bg-prixgen-blue/10 rounded-2xl flex items-center justify-center text-prixgen-blue group-hover:scale-110 group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500">
                        <Icon size={28} />
                      </div>
                      <div className="text-white/5 text-6xl font-black italic select-none">0{i+1}</div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-prixgen-lightblue transition-colors">{outcome.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-left text-lg font-light">
                        {outcome.description}
                      </p>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA (The Destination) */}
      <section className="py-10 lg:py-14 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-gradient-to-br from-prixgen-blue to-indigo-900 rounded-[3.5rem] lg:rounded-[5rem] p-12 lg:p-32 overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,71,171,0.4)] group"
          >
            {/* Static Background Elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/[0.02] blur-[80px] translate-y-1/2 -translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeUp className="text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-sm uppercase tracking-widest">
                  <span className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                  Get Started
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  Ready to <span className="text-indigo-300 italic font-medium">streamline</span> <br /> your business?
                </h2>
                <p className="text-xl text-indigo-100/80 max-w-xl font-medium leading-relaxed">
                  Submit your requirements for a prioritized response from our expert strategy team.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="max-w-md ml-auto bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-[3rem] text-left text-prixgen-dark shadow-2xl border border-white/20">
                   <div className="mb-6 border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-bold text-prixgen-blue">Quick Inquiry</h4>
                      <p className="text-sm text-slate-500 font-medium">We&apos;ll get back to you shortly.</p>
                   </div>
                   <div className="scale-95 origin-top">
                     <LeadCaptureForm source="Services Page" />
                   </div>
                </div>
              </FadeUp>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
