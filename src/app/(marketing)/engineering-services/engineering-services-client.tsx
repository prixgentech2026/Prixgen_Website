'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, PenTool, Code, 
  TrendingUp, Users, ShieldCheck, 
  LineChart, Server, Activity,
  ArrowRight, Globe, Zap, Database,
  Cpu, Settings, ZapOff, ClipboardCheck
} from "lucide-react";
import Link from 'next/link';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { ServicesPageData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/json-ld';

const IconMap: Record<string, any> = {
  Search, PenTool, Code, 
  TrendingUp, Users, ShieldCheck, 
  LineChart, Server, Activity,
  Globe, Zap, Database, Cpu, Settings, ZapOff, ClipboardCheck
};

const getIcon = (name: string) => IconMap[name] || Cpu;

export default function EngineeringServicesClient({ data }: { data: ServicesPageData }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative overflow-hidden bg-white min-h-screen selection:bg-prixgen-blue selection:text-white">
      <JsonLd 
        type="WebPage" 
        data={{ 
          title: "Industrial Engineering Services | Prixgen", 
          description: "Precision-engineered solutions for the modern industry. From mechanical design to complete manufacturing automation." 
        }} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-white">
        {/* Advanced Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-prixgen-blue/5 rounded-full blur-[140px] animate-pulse" />
        
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#0066cc 1px, transparent 1px), linear-gradient(90deg, #0066cc 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <FadeUp className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-2 text-[10px] font-black text-prixgen-blue/40 uppercase tracking-[0.2em]"
            >
              <Link href="/" className="hover:text-prixgen-blue transition-colors">Home</Link>
              <span className="opacity-20">/</span>
              <span className="text-prixgen-blue">Engineering Services</span>
            </motion.div>
            
            <header className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue text-[10px] font-bold tracking-widest uppercase mx-auto">
                Precision Engineering
              </div>
              
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-prixgen-dark leading-[0.85] tracking-tighter">
                <StaggerText text={data.title} />
              </h1>
              
              <div className="max-w-4xl mx-auto pt-4">
                <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                  {data.heroSubheadline}
                </p>
              </div>
            </header>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
              <Button size="lg" className="rounded-full px-10 h-16 text-lg shadow-2xl shadow-prixgen-blue/20" asChild>
                <Link href="#capabilities">View Capabilities</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg border-prixgen-blue/10 hover:bg-prixgen-blue/5" asChild>
                <Link href="/contact">Technical Consultation</Link>
              </Button>
            </div>
          </FadeUp>
        </motion.div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 relative bg-white overflow-hidden border-t border-prixgen-blue/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-20 text-center lg:text-left">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="h-[1px] w-12 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.4em] uppercase text-[10px]">Methodology</span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-bold text-prixgen-dark tracking-tighter leading-[1.1]">
                Our Engineering <span className="italic text-prixgen-blue">Process</span>
              </h2>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {data.methodology.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="group relative p-10 bg-prixgen-blue/[0.03] border border-prixgen-blue/5 rounded-[3rem] hover:bg-prixgen-blue/[0.06] hover:border-prixgen-blue/20 transition-all duration-500 h-full flex flex-col">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue border border-prixgen-blue/10 shadow-sm mb-8 transition-transform duration-500 group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-prixgen-dark mb-4 group-hover:text-prixgen-blue transition-colors">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeUp>
              <h2 className="text-4xl lg:text-7xl font-bold text-prixgen-dark tracking-tighter leading-tight">
                Industrial <span className="italic text-prixgen-blue">Capabilities</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium mt-6">
                From IIoT telemetry to factory-floor automation, we engineer the physical-to-digital bridge.
              </p>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.coreServices.map((service, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <Link href={`/engineering-services/${service.slug}`} className="block group h-full">
                  <div className="p-10 bg-prixgen-blue/[0.03] border border-prixgen-blue/5 rounded-[3.5rem] h-full flex flex-col justify-between transition-all duration-500 hover:bg-prixgen-blue/[0.06] hover:border-prixgen-blue/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-prixgen-blue/10">
                    <div className="space-y-8">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue border border-prixgen-blue/10 shadow-sm transition-transform duration-500 group-hover:rotate-6">
                        <Cpu size={28} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-prixgen-dark leading-tight group-hover:text-prixgen-blue transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium">
                          {service.headline}
                        </p>
                      </div>
                    </div>
                    <div className="mt-12 flex items-center gap-3 text-prixgen-blue font-bold text-xs uppercase tracking-widest">
                      Capabilities <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="max-w-6xl mx-auto bg-white rounded-[5rem] p-12 lg:p-24 text-center text-prixgen-dark relative overflow-hidden border border-prixgen-blue/5 shadow-2xl">
              <div className="relative z-10 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter">
                    Ready to <span className="italic text-prixgen-blue">optimize</span> <br /> your production?
                  </h2>
                  <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                    Our engineering leads are ready to review your technical requirements.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-full max-w-3xl bg-prixgen-blue/[0.03] p-10 lg:p-16 rounded-[4rem] text-left border border-prixgen-blue/5">
                    <div className="mb-10 space-y-4">
                      <h3 className="text-3xl font-bold text-prixgen-dark">Technical Brief</h3>
                      <p className="text-slate-500 font-medium">Schedule a deep-dive session with our industrial engineering team.</p>
                    </div>
                    <LeadCaptureForm source="Engineering Services Page" />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
