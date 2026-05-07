'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, PenTool, Settings, 
  Zap, LineChart, BarChart3, 
  ShieldCheck, Network, Database,
  ArrowRight, Globe, Activity, TrendingUp
} from "lucide-react";
import Link from 'next/link';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { SolutionsPageData } from '@/lib/data';

const IconMap: Record<string, any> = {
  Search, PenTool, Settings, 
  Zap, LineChart, BarChart3, 
  ShieldCheck, Network, Database,
  Globe, Activity, TrendingUp
};

const getIcon = (name: string) => IconMap[name] || Globe;

export default function SolutionsClient({ data }: { data: SolutionsPageData }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      {/* Section 1: The Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-32 overflow-hidden bg-white">
        <AmbientGlow />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div 
          style={{ opacity, scale }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <FadeUp className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
              <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px]">
                {data.subtitle || "Architecture Suite"}
              </span>
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
            </div>
            
            <StaggerText 
              text={data.title} 
              variant="gradient"
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8 tracking-tighter"
            />
            
            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-4xl mx-auto">
              {data.heroSubheadline}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-10 py-5 bg-prixgen-blue text-white rounded-2xl font-bold text-lg shadow-xl shadow-prixgen-blue/20 hover:bg-prixgen-dark transition-colors"
               >
                 Consult an Architect
               </motion.button>
               <Link href="#methodology" className="group flex items-center gap-3 text-prixgen-blue font-bold text-lg">
                 Our Architecture Process
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
      </section>

      {/* Section 2: Methodology */}
      <section id="methodology" className="py-12 lg:py-20 bg-slate-100/50 border-t border-slate-200/60 relative overflow-hidden">
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
                Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">Engineering</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} className="max-w-md text-right hidden lg:block">
               <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                 We follow a rigorous, data-first methodology to ensure every solution is architected for long-term operational resilience.
               </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 z-0 hidden md:block" />
            
            {data.methodology?.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <FadeUp key={item.title} delay={i * 0.2} className="relative z-10">
                  <motion.div 
                    whileHover={{ y: -20, scale: 1.02 }}
                    whileInView={{ 
                      backgroundColor: ["#f0f9ff", "#f8fafc", "#f0f9ff"],
                      borderColor: ["rgba(0, 71, 171, 0.1)", "rgba(0, 71, 171, 0.2)", "rgba(0, 71, 171, 0.1)"]
                    }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ 
                      backgroundColor: { duration: 10, repeat: Infinity, ease: "linear", delay: i * 2 },
                      borderColor: { duration: 5, repeat: Infinity, ease: "linear" },
                      y: { type: "spring", stiffness: 300 },
                      scale: { type: "spring", stiffness: 300 }
                    }}
                    className="group relative p-12 rounded-[4rem] border border-slate-200 shadow-2xl shadow-blue-100/50 h-full overflow-hidden flex flex-col transition-shadow duration-500"
                  >
                    {/* Animated Radial Glow - Blue variant */}
                    <motion.div 
                      className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none"
                      whileInView={{
                        background: [
                          "radial-gradient(600px circle at 0% 0%, rgba(0, 71, 171, 0.15), transparent 40%)",
                          "radial-gradient(600px circle at 100% 100%, rgba(0, 71, 171, 0.15), transparent 40%)",
                          "radial-gradient(600px circle at 0% 100%, rgba(0, 71, 171, 0.15), transparent 40%)",
                          "radial-gradient(600px circle at 0% 0%, rgba(0, 71, 171, 0.15), transparent 40%)",
                        ]
                      }}
                      viewport={{ once: false }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-prixgen-blue/10 to-prixgen-lightblue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] z-0" />
                    
                    <div className="absolute top-8 right-12 text-8xl lg:text-9xl font-black text-transparent [WebkitTextStroke:1px_rgba(0,71,171,0.15)] group-hover:[WebkitTextStroke:1px_rgba(0,71,171,0.3)] transition-all duration-700 select-none z-0 pointer-events-none">
                      {item.step}
                    </div>
                    
                    <div className="relative z-10 space-y-8 flex-grow">
                      <motion.div 
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        className="w-20 h-20 bg-gradient-to-br from-prixgen-blue to-prixgen-lightblue rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500"
                      >
                        <Icon size={36} />
                      </motion.div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-prixgen-blue transition-colors duration-500">{item.title}</h3>
                        <p className="text-lg text-slate-500 leading-relaxed text-left font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-12 h-1.5 w-full bg-blue-100/50 rounded-full overflow-hidden relative z-10">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: i * 0.3 }}
                        className="h-full bg-gradient-to-r from-prixgen-blue via-prixgen-lightblue to-prixgen-blue bg-[length:200%_100%] animate-gradient"
                      />
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Core Solutions (The Fleet) */}
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8 text-left">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Strategic Ecosystems</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-prixgen-blue tracking-tighter leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">Solutions Fleet</span>
              </h2>
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mt-6">
                From global ERP ecosystems to specialized AI frameworks, our solutions are engineered for maximum business impact.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
               <Link href="/contact" className="px-8 py-4 border-2 border-prixgen-blue text-prixgen-blue rounded-xl font-bold hover:bg-prixgen-blue hover:text-white transition-all inline-block">
                 Schedule an Audit
               </Link>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.coreSolutions?.map((solution, i) => {
              const bgImage = solution.externalImageUrl || solution.featuredImage?.sourceUrl || solution.featuredImage?.url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000";
              
              const engineeringSlugs = ["iiot-telemetry"];
              const serviceSlugs = ["ai-machine-learning"];
              let basePath = "/solutions";
              if (engineeringSlugs.includes(solution.slug)) basePath = "/engineering-services";
              if (serviceSlugs.includes(solution.slug)) basePath = "/services";

              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <Link href={`${basePath}/${solution.slug}`} className="block group h-full">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="relative p-12 bg-prixgen-gray/30 rounded-[3rem] h-full flex flex-col justify-between transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.2)] border border-transparent hover:border-prixgen-blue/10 overflow-hidden"
                    >
                      {/* Background Image Layer */}
                      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
                        <motion.img 
                          src={bgImage}
                          alt={solution.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000";
                          }}
                          initial={{ filter: "grayscale(100%)", opacity: 0.3 }}
                          whileHover={{ 
                            filter: "grayscale(0%)", 
                            opacity: 1,
                            scale: 1.1 
                          }}
                          transition={{ 
                            duration: 0.8,
                            scale: { duration: 10 }
                          }}
                        />
                      </div>
                      
                      <div className="relative z-10 space-y-8 text-left">
                         <motion.div 
                           whileHover={{ scale: 1.1, backgroundColor: "#0047ab", color: "#fff" }}
                           className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500"
                         >
                           <Globe size={28} />
                         </motion.div>
                         <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-prixgen-blue leading-tight group-hover:text-white transition-colors">{solution.title}</h3>
                            <p className="text-lg text-prixgen-dark/80 leading-relaxed text-left font-bold group-hover:text-white transition-colors">
                              {solution.headline}
                            </p>
                         </div>
                      </div>
                      
                      <div className="mt-12 relative z-10 flex items-center text-prixgen-blue font-bold text-sm uppercase tracking-widest group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                        View Solution <ArrowRight className="ml-2" size={16} />
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
      <section className="py-12 lg:py-20 bg-[#020617] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-prixgen-blue/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute inset-0 z-0 opacity-20" 
               style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center text-left">
            <FadeUp>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-prixgen-lightblue" />
                <span className="text-prixgen-lightblue font-bold tracking-[0.4em] uppercase text-[10px]">Outcome-Based Engineering</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tighter">
                Engineered for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">Measurable Performance</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg lg:text-xl text-white/50 leading-relaxed font-medium">
                We translate technical complexity into measurable business value, ensuring your enterprise stays agile, efficient, and future-proof.
              </p>
            </FadeUp>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.outcomes?.map((outcome, i) => {
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
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-gradient-to-br from-prixgen-blue to-indigo-900 rounded-[3.5rem] lg:rounded-[5rem] p-12 lg:p-32 overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,71,171,0.4)] group"
          >
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeUp className="text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-sm uppercase tracking-widest">
                  <span className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                  Get Started
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  Ready to architect your <span className="text-indigo-300 italic font-medium">digital core?</span>
                </h2>
                <p className="text-xl text-indigo-100/80 max-w-xl font-medium leading-relaxed">
                  Schedule a diagnostic session with our solution architects to evaluate your current landscape.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="max-w-md ml-auto bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-[3rem] text-left text-prixgen-dark shadow-2xl border border-white/20">
                   <div className="mb-6 border-b border-slate-100 pb-4">
                      <h4 className="text-xl font-bold text-prixgen-blue">Quick Inquiry</h4>
                      <p className="text-sm text-slate-500 font-medium">We'll get back to you shortly.</p>
                   </div>
                   <div className="scale-95 origin-top">
                     <LeadCaptureForm source="Solutions Page" />
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
