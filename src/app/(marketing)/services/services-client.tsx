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
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        <AmbientGlow />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <FadeUp className="space-y-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
              <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px]">
                {data.subtitle || "Architectural Services"}
              </span>
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
            </div>
            
            <StaggerText 
              text={data.title} 
              variant="gradient"
              className="text-5xl md:text-6xl font-black leading-[0.9] mb-12 tracking-tighter"
            />
            
            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-4xl mx-auto">
              {data.heroSubheadline}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-10 py-5 bg-prixgen-blue text-white rounded-2xl font-bold text-lg shadow-xl shadow-prixgen-blue/20 hover:bg-prixgen-dark transition-colors"
               >
                 Book a Strategy Session
               </motion.button>
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
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-10 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-prixgen-blue">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-prixgen-blue to-transparent" />
        </motion.div>
      </section>

      {/* Section 2: Our Methodology (The Voyage) */}
      <section id="methodology" className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
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
                We don't just implement software; we engineer operational success through a three-stage strategic voyage.
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
                    whileHover={{ y: -15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative p-12 bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 h-full overflow-hidden flex flex-col"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-prixgen-blue to-prixgen-lightblue opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl`} />
                    
                    <div className="text-7xl lg:text-8xl font-black text-slate-50/50 absolute -bottom-6 -right-6 z-0 select-none group-hover:text-prixgen-blue/5 transition-all duration-700 italic group-hover:scale-110">
                      {item.step}
                    </div>
                    
                    <div className="relative z-10 space-y-8 flex-grow">
                      <div className={`w-20 h-20 bg-gradient-to-br from-prixgen-blue to-prixgen-lightblue rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                        <Icon size={36} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors">{item.title}</h3>
                        <p className="text-lg text-prixgen-dark/60 leading-relaxed text-left font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-12 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: i * 0.3 }}
                        className={`h-full bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue`}
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
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-4 space-y-8">
              <FadeUp>
                <h2 className="text-4xl lg:text-5xl font-bold text-prixgen-blue tracking-tighter leading-tight">
                  What is your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">challenge?</span>
                </h2>
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mt-6">
                  We specialize in high-stakes architectural pivots and enterprise-grade system modernization.
                </p>
              </FadeUp>
              
              <FadeUp delay={0.2} className="pt-6">
                 <Link href="/contact" className="px-8 py-4 border-2 border-prixgen-blue text-prixgen-blue rounded-xl font-bold hover:bg-prixgen-blue hover:text-white transition-all inline-block">
                   Schedule an Audit
                 </Link>
              </FadeUp>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.coreServices.map((service, i) => (
                <FadeUp key={i} delay={i * 0.1} className={i === 1 ? 'md:mt-12' : ''}>
                  <Link href={`/services/${service.slug}`} className="block group h-full">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-12 bg-prixgen-gray/30 rounded-[3rem] h-full flex flex-col justify-between transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.1)] border border-transparent hover:border-prixgen-blue/10"
                    >
                      <div className="space-y-8">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue shadow-sm group-hover:shadow-lg transition-all">
                           <Globe size={28} />
                         </div>
                         <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-prixgen-blue leading-tight">{service.title}</h3>
                            <p className="text-lg text-prixgen-dark/60 leading-relaxed text-left font-medium">
                              {service.headline}
                            </p>
                         </div>
                      </div>
                      <div className="mt-12 flex items-center text-prixgen-lightblue font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                        View Service <ArrowRight className="ml-2" size={16} />
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Enterprise Outcomes */}
      <section className="py-16 lg:py-24 bg-[#020617] text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-prixgen-blue/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
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

      {/* Section 5: Final CTA */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeUp>
            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="max-w-6xl mx-auto bg-prixgen-blue rounded-[5rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl"
            >
              <motion.div 
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent blur-[120px] pointer-events-none" 
              />
              
              <div className="relative z-10 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1] tracking-tighter">
                    Ready to <span className="italic opacity-60">streamline</span> <br /> your business?
                  </h2>
                  <p className="text-xl text-white/60 max-w-xl mx-auto font-medium">
                    Submit your requirements for a prioritized response from our strategy team.
                  </p>
                </div>
                
                <div className="max-w-2xl mx-auto bg-white p-10 lg:p-16 rounded-[4rem] text-left text-prixgen-dark shadow-2xl">
                   <LeadCaptureForm source="Services Page" />
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
