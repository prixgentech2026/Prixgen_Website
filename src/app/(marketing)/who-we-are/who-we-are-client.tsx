'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Globe2, Target, Eye, ShieldCheck, Cpu, Code2, X, Zap, Shield } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

interface Advantage {
  title: string;
  description: string;
  icon?: string;
}

interface ExperienceSection {
  title: string;
  description: string;
  points: string[];
}

interface WhoWeAreProps {
  data: {
    title: string;
    subtitle: string;
    content: any;
    vision: string;
    mission: string;
    stats: Stat[];
    whyChooseUs: Advantage[];
    whyChooseUsIntro: string;
    experienceSection: ExperienceSection;
  };
}

const ImageReveal = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
  <motion.div 
    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className={`relative overflow-hidden ${className}`}
  >
    <motion.div
      initial={{ scale: 1.4 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </motion.div>
  </motion.div>
);

export function WhoWeAreClient({ data }: WhoWeAreProps) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [selectedInsight, setSelectedInsight] = React.useState<any>(null);

  // Map for deep-dive content
  const detailedInsights: any = {
    "Assured Services": {
      content: "Our commitment to assurance goes beyond simple SLAs. We implement a multi-layered Quality Management System (QMS) that monitors every deployment phase. From initial requirement mapping to post-live support, our internal 'Enterprise Health Checks' ensure that your architecture remains stable, secure, and performant as you scale.",
      stats: ["99.9% Uptime Guarantee", "Real-time Monitoring", "ISO Certified Workflows"],
      methodology: "Phase-based validation with 24/7 oversight.",
      icon: <ShieldCheck className="text-prixgen-blue" size={32} />
    },
    "Future-Proofed Innovation": {
      content: "Prixgen operates a unified global service fabric designed for multi-national enterprises. Our 'Follow-the-Sun' architecture ensures that whether your operations are in APAC, EMEA, or AMER regions, you have access to Tier-3 engineering support 24/7. We specialize in the orchestration of multi-country rollouts, navigating fragmented tax laws, and synchronizing global supply chains through a single, unified digital core.",
      stats: ["5 Integrated Global Hubs", "Multi-Jurisdictional Compliance", "Cross-Border ERP Orchestration"],
      methodology: "Global governance with localized execution.",
      icon: <Globe2 className="text-prixgen-blue" size={32} />
    },
    "Expert Engineering": {
      content: "Our engineering philosophy is rooted in 'Clean Architecture' and modular scalability. We go beyond simple coding to build robust API ecosystems and data-driven infrastructures. By leveraging cutting-edge DevOps pipelines and containerized deployments, we ensure that your enterprise platform is not just functional today, but ready for AI integration and predictive analytics tomorrow.",
      stats: ["CI/CD Automated Pipelines", "AI-Ready Data Architecture", "100% Modular Scalability"],
      methodology: "Future-proof engineering with modular design.",
      icon: <Code2 className="text-prixgen-blue" size={32} />
    }
  };

  // Safe lookup: try title match first, then index match as fallback
  const getInsightData = (item: any) => {
    if (!item) return null;
    
    // 1. Try direct title match
    if (detailedInsights[item.title]) return detailedInsights[item.title];
    
    // 2. Fallback to index mapping (0=Assured, 1=Innovation, 2=Engineering)
    const titles = Object.keys(detailedInsights);
    const index = data.whyChooseUs?.findIndex((i: any) => i.title === item.title);
    if (index !== -1 && titles[index]) {
      return detailedInsights[titles[index]];
    }
    
    return null;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      <AnimatePresence>
        {selectedInsight && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInsight(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedInsight(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-prixgen-blue hover:text-white transition-all z-20"
              >
                <X size={24} />
              </button>

              <div className="lg:w-1/3 bg-slate-50 p-10 flex flex-col justify-between border-r border-slate-200">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-white/10">
                  {getInsightData(selectedInsight)?.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-prixgen-blue mb-2 uppercase tracking-tight">{selectedInsight.title}</h3>
                  <p className="text-sm font-bold text-prixgen-lightblue tracking-widest uppercase">Methodology</p>
                  <p className="text-slate-600 font-medium">{getInsightData(selectedInsight)?.methodology}</p>
                </div>
              </div>

              <div className="lg:w-2/3 p-10 lg:p-14">
                <h4 className="text-sm font-bold text-prixgen-lightblue tracking-[0.2em] uppercase mb-4">Deep Dive</h4>
                <p className="text-xl text-slate-700 leading-relaxed font-medium mb-10">
                  {getInsightData(selectedInsight)?.content}
                </p>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Performance Indicators</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getInsightData(selectedInsight)?.stats.map((stat: string) => (
                      <div key={stat} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <CheckCircle2 className="text-prixgen-blue shrink-0" size={20} />
                        <span className="text-slate-700 font-bold text-sm">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 px-4 overflow-hidden">
        <AmbientGlow />
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="inline-block px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px] mb-8">
                {data.subtitle || "About Our Company"}
              </span>
              <StaggerText 
                text={data.title || "Who We Are"} 
                variant="gradient"
                className="text-5xl lg:text-8xl font-bold leading-tight mb-8 -ml-1 tracking-tighter"
              />
            </FadeUp>
            
            <div className="flex flex-col lg:flex-row gap-12 items-end">
              <FadeUp delay={0.4} className="max-w-2xl">
                <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed">
                  Pioneering enterprise intelligence through a specialized fusion of <span className="text-prixgen-blue">IoT, BI, and Analytics.</span>
                </p>
              </FadeUp>
              <FadeUp delay={0.6} className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center animate-spin-slow">
                  <ArrowRight className="text-prixgen-blue rotate-90" size={32} />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <motion.div 
          style={{ y: yParallax }}
          className="absolute right-[-10%] top-[20%] w-[40%] aspect-square rounded-full bg-gradient-to-br from-prixgen-blue/10 to-transparent blur-3xl opacity-50"
        />
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-24 lg:py-40 px-4 bg-white relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm76-52c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-11c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM11 17c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm13 30c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm39-26c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-4-14c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM25 1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm67 66c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM7 23c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm90 7c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM86 52c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2 27c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM27 94c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM42 74c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm51-7c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-82-8c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm19-13c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-6-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM42 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-13 1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-8-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2 1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-13 1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm16 71c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-8-7c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm18-10c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM41 58c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm12-6c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM25 33c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm14 4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm27 30c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm13-20c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm23 47c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM38 74c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm10-14c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm5-26c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm30 10c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-14c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-25-46c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM9 19c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm13 53c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm77 4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-43-49c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-7-12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm14 24c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-56 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-7 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm15 33c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm82-26c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM82 14c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-10-6c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-7 7c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-30-6c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-12 10c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM74 45c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-7 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM33 33c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-5 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm66 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-5 8c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-37-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-18-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-19-6c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-5-8c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-4-5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-5-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-4-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-5-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-5-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-4-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-2-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-1-1c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z'/%3E%3C/svg%3E")` }}></div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="prose prose-2xl prose-slate max-w-none">
                <PortableText 
                  value={data.content} 
                  components={{
                    block: {
                      normal: ({ children }) => <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mb-8">{children}</p>,
                      blockquote: ({ children }) => (
                        <motion.blockquote 
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          className="border-l-[8px] border-prixgen-blue pl-8 my-12 italic text-2xl lg:text-3xl text-prixgen-blue font-bold leading-relaxed tracking-tight bg-slate-50 p-10 lg:p-16 rounded-r-[3rem] shadow-sm"
                        >
                          {children}
                        </motion.blockquote>
                      ),
                    }
                  }}
                />
              </div>
            </FadeUp>
          </div>
          
          <div className="lg:col-span-5 relative">
            <ImageReveal 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" 
              alt="Prixgen High-Tech Office"
              className="aspect-[4/5] rounded-[4rem] shadow-2xl z-20 relative"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-prixgen-blue rounded-full flex flex-col items-center justify-center text-white z-30 shadow-2xl"
            >
              <span className="text-4xl font-bold">30+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Years Combined Exp</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* 3. OUR FOUNDATION (Vision & Mission) */}
    <section className="py-24 lg:py-32 bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[60%] aspect-square rounded-full bg-prixgen-blue/20 blur-[150px] pointer-events-none opacity-50"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mb-24">
          <FadeUp>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight uppercase leading-tight opacity-90">
              The <span className="text-prixgen-lightblue">Foundation</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-prixgen-blue to-transparent rounded-full mb-8" />
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <FadeUp delay={0.1}>
            <motion.div 
              whileHover={{ y: -20, scale: 1.02 }}
              className="group h-full bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-14 rounded-[4rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
            >
              <div className="mb-10 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                <Eye size={44} strokeWidth={1} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tighter uppercase text-white/90">Our Vision</h3>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-medium group-hover:text-white transition-colors duration-700">
                "{data.vision}"
              </p>
            </motion.div>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <motion.div 
              whileHover={{ y: -20, scale: 1.02 }}
              className="group h-full bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-14 rounded-[4rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-prixgen-blue/5 rounded-full blur-[80px] group-hover:bg-prixgen-blue/10 transition-all duration-700" />
              <div className="mb-10 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                <Target size={44} strokeWidth={1} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tighter uppercase relative z-10 text-white/90">Our Mission</h3>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-medium relative z-10 group-hover:text-white transition-colors duration-700">
                "{data.mission}"
              </p>
            </motion.div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <motion.div 
              whileHover={{ y: -20, scale: 1.02 }}
              className="group h-full bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-14 rounded-[4rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
            >
              <div className="mb-10 w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                <Globe2 size={44} strokeWidth={1} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 tracking-tighter uppercase relative z-10 text-white/90">Our Strategy</h3>
              <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-medium relative z-10 group-hover:text-white transition-colors duration-700">
                "We combine technical edge with strong business insight to architect future-proof enterprise operations."
              </p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>

    {/* 4. WHY CHOOSE US SECTION */}
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-prixgen-blue/5 rounded-full blur-[120px] -mr-[25rem] -mt-[25rem] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-prixgen-lightblue/5 rounded-full blur-[100px] -ml-[15rem] -mb-[15rem]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mb-24">
          <FadeUp>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-prixgen-blue" />
              <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-sm">Our Competitive Edge</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-prixgen-blue mb-8 tracking-tighter">Why Choose Us</h2>
            <p className="text-lg lg:text-2xl text-slate-500 leading-relaxed font-medium max-w-4xl">
              {data.whyChooseUsIntro}
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.whyChooseUs?.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.15}>
              <motion.div 
                whileHover={{ y: -20, scale: 1.02 }}
                className="group relative h-full"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-prixgen-blue/20 to-transparent rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="h-full p-12 bg-white/70 backdrop-blur-2xl rounded-[3.5rem] border border-slate-200/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group-hover:border-prixgen-blue/30 transition-all duration-500 flex flex-col relative overflow-hidden">
                  {/* Watermark Number */}
                  <div className="absolute -right-6 -bottom-6 text-[12rem] font-black text-slate-100/40 group-hover:text-prixgen-blue/[0.03] transition-colors duration-700 select-none leading-none">
                    {i + 1}
                  </div>

                  <div className="mb-12 w-20 h-20 bg-gradient-to-br from-prixgen-blue to-prixgen-lightblue rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-prixgen-blue/20 group-hover:rotate-[15deg] transition-transform duration-500 relative z-10">
                    {i === 0 && <ShieldCheck size={36} strokeWidth={1.5} />}
                    {i === 1 && <Cpu size={36} strokeWidth={1.5} />}
                    {i === 2 && <Code2 size={36} strokeWidth={1.5} />}
                  </div>

                  <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight text-prixgen-blue relative z-10">{item.title}</h4>
                  <p className="text-base lg:text-lg text-slate-500 leading-relaxed font-medium relative z-10 flex-1 group-hover:text-slate-700 transition-colors">
                    {item.description}
                  </p>

                  <button 
                    onClick={() => setSelectedInsight(item)}
                    className="mt-10 pt-8 border-t border-slate-100 flex items-center text-prixgen-lightblue font-bold text-sm group-hover:gap-4 transition-all gap-2 relative z-10 w-full text-left"
                  >
                    Strategic Insight <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* 5. EXPERIENCE SECTION */}
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute -left-10 top-40 text-[15rem] font-bold text-slate-100/40 select-none leading-none pointer-events-none italic">15</div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeUp>
            <div className="relative">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight text-slate-900 leading-tight">
                {data.experienceSection?.title}
              </h2>
              <div className="space-y-8">
                {data.experienceSection?.points?.map((point, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start gap-6 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-prixgen-blue shrink-0 ring-1 ring-slate-100 border border-slate-50">
                      <ShieldCheck size={32} strokeWidth={1.5} />
                    </div>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed pt-1 group-hover:text-slate-900 transition-colors">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <ImageReveal src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="Prixgen Excellence" />
          </FadeUp>
        </div>
      </div>
    </section>

    {/* 6. STATS SECTION */}
    <section className="py-24 lg:py-32 bg-[#020617] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {data.stats?.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="text-5xl lg:text-7xl font-bold mb-4 text-white tracking-tighter leading-none"
                >
                  {stat.value}
                </motion.div>
                <div className="h-2 w-16 bg-prixgen-blue mx-auto mb-8 group-hover:w-32 transition-all duration-700 rounded-full" />
                <p className="text-sm lg:text-base text-slate-400 font-bold uppercase tracking-[0.3em] opacity-80">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>

    {/* 7. FINAL CTA */}
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="container mx-auto px-4">
        <FadeUp className="bg-prixgen-blue p-12 lg:p-20 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl group">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight tracking-tighter">
              Scale your vision with Prixgen.
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform" asChild>
                <Link href="/contact">Architecture Audit</Link>
              </Button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  </div>
  );
}
