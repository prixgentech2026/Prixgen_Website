'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Globe2, Target, Eye, ShieldCheck, Cpu, Code2 } from 'lucide-react';

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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
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
                className="text-7xl lg:text-[10rem] font-black leading-[0.85] mb-12 -ml-1 lg:-ml-2"
              />
            </FadeUp>
            
            <div className="flex flex-col lg:flex-row gap-12 items-end">
              <FadeUp delay={0.4} className="max-w-2xl">
                <p className="text-2xl lg:text-3xl text-slate-500 font-medium leading-tight">
                  Pioneering enterprise intelligence through a specialized fusion of **IoT, BI, and Analytics.**
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
                        normal: ({ children }) => <p className="text-xl lg:text-3xl text-slate-600 leading-relaxed font-medium mb-10">{children}</p>,
                        blockquote: ({ children }) => (
                          <motion.blockquote 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="border-l-[12px] border-prixgen-blue pl-10 my-16 italic text-3xl lg:text-5xl text-prixgen-blue font-black leading-tight tracking-tight bg-slate-50 p-12 lg:p-20 rounded-r-[4rem] shadow-sm"
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
                <span className="text-6xl font-black italic">30+</span>
                <span className="text-xs uppercase tracking-widest font-bold opacity-70">Years Combined Exp</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR FOUNDATION (Vision & Mission) */}
      <section className="py-32 lg:py-48 bg-[#020617] text-white relative overflow-hidden">
        {/* Animated Foundation Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Pulsing Orbs */}
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[60%] aspect-square rounded-full bg-prixgen-blue/20 blur-[150px] pointer-events-none opacity-50"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[60%] aspect-square rounded-full bg-prixgen-lightblue/10 blur-[150px] pointer-events-none opacity-40"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mb-24">
            <FadeUp>
              <h2 className="text-5xl lg:text-[8rem] font-black mb-8 tracking-tight uppercase italic leading-none opacity-90">
                Our <span className="text-prixgen-lightblue">Foundation</span>
              </h2>
              <div className="w-40 h-3 bg-gradient-to-r from-prixgen-blue to-transparent rounded-full mb-12" />
              <p className="text-2xl lg:text-3xl text-slate-400 font-medium leading-relaxed max-w-3xl">
                The core architectural pillars that inform every solution we engineer.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <FadeUp delay={0.1}>
              <motion.div 
                whileHover={{ y: -20, scale: 1.02 }}
                className="group h-full bg-white/[0.02] backdrop-blur-3xl p-12 lg:p-20 rounded-[5rem] border border-white/10 hover:border-prixgen-blue/50 transition-all duration-700 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-prixgen-blue/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-prixgen-blue/30 transition-all duration-700" />
                <div className="mb-12 w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-5xl group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-white/10 shadow-inner">
                  <Eye size={52} strokeWidth={1} />
                </div>
                <h3 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter uppercase text-white/90">Our Vision</h3>
                <p className="text-2xl lg:text-4xl text-slate-300 leading-snug font-bold italic group-hover:text-white transition-colors duration-700">
                  "{data.vision}"
                </p>
              </motion.div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <motion.div 
                whileHover={{ y: -20, scale: 1.02 }}
                className="group h-full bg-prixgen-blue p-12 lg:p-20 rounded-[5rem] shadow-2xl transition-all duration-700 relative overflow-hidden border border-white/20"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-3xl rounded-full -mr-40 -mt-40" />
                <div className="mb-12 w-24 h-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center text-5xl group-hover:bg-white group-hover:text-prixgen-blue transition-all duration-500 ring-1 ring-white/30 shadow-2xl">
                  <Target size={52} strokeWidth={1} />
                </div>
                <h3 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter uppercase relative z-10 text-white">Our Mission</h3>
                <p className="text-2xl lg:text-4xl text-white leading-snug font-medium relative z-10 opacity-95">
                  {data.mission}
                </p>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mb-24">
            <FadeUp>
              <h2 className="text-6xl lg:text-9xl font-black text-prixgen-blue mb-10 tracking-tighter">Why Choose Us</h2>
              <p className="text-2xl lg:text-4xl text-slate-500 leading-tight font-medium max-w-4xl">
                {data.whyChooseUsIntro}
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {data.whyChooseUs?.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.15}>
                <motion.div 
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="p-12 bg-gradient-to-br from-white to-slate-50 rounded-[4rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group transition-all duration-500 hover:shadow-[0_48px_96px_-32px_rgba(0,174,239,0.15)] flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-prixgen-blue/10 transition-colors" />
                  
                  <div className="mb-10 w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-prixgen-blue shadow-xl shadow-slate-200/50 group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 ring-1 ring-slate-100">
                    {i === 0 && <ShieldCheck size={40} strokeWidth={1.5} />}
                    {i === 1 && <Cpu size={40} strokeWidth={1.5} />}
                    {i === 2 && <Code2 size={40} strokeWidth={1.5} />}
                  </div>
                  <h4 className="text-3xl font-black mb-6 uppercase tracking-tight text-prixgen-blue">{item.title}</h4>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION */}
      <section className="py-32 lg:py-48 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Floating Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute -left-20 top-40 text-[25rem] font-black text-slate-100/50 select-none leading-none pointer-events-none italic">15</div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <FadeUp>
              <div className="relative">
                <div className="absolute -left-8 top-0 w-3 h-32 bg-prixgen-blue rounded-full hidden lg:block" />
                <h2 className="text-6xl lg:text-8xl font-black mb-10 tracking-tight text-slate-900 leading-[1]">
                  {data.experienceSection?.title}
                </h2>
                <div className="space-y-8">
                  {data.experienceSection?.points?.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-6 group"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500 shrink-0 ring-1 ring-slate-100 border border-slate-50">
                        <ShieldCheck size={32} strokeWidth={1.5} />
                      </div>
                      <p className="text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed pt-1 group-hover:text-slate-900 transition-colors">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative group">
                {/* Decorative border frame */}
                <div className="absolute -inset-4 border-2 border-prixgen-blue/20 rounded-[5.5rem] rotate-3 transition-transform group-hover:rotate-0 duration-700 pointer-events-none" />
                <ImageReveal src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="Prixgen Excellence" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 6. STATS SECTION */}
      <section className="py-32 lg:py-48 bg-[#020617] relative overflow-hidden border-t border-white/5">
        {/* Sync background with Foundation section */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            {data.stats?.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="text-center group">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-7xl lg:text-[10rem] font-black mb-6 text-white tracking-tighter leading-none"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="h-2 w-16 bg-prixgen-blue mx-auto mb-8 group-hover:w-32 group-hover:bg-prixgen-lightblue transition-all duration-700 rounded-full" />
                  <p className="text-lg lg:text-2xl text-slate-400 font-black uppercase tracking-[0.3em] opacity-80">
                    {stat.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-32 lg:py-48 bg-white relative">
        <div className="container mx-auto px-4">
          <FadeUp className="bg-prixgen-blue p-16 lg:p-32 rounded-[6rem] text-white text-center relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/10 to-transparent group-hover:from-white/20 transition-all duration-1000" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-black mb-12 leading-[0.9] tracking-tighter">
                Scale your vision with Prixgen.
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Button size="lg" variant="secondary" className="h-24 px-16 text-3xl font-black rounded-3xl shadow-xl hover:scale-105 transition-transform" asChild>
                  <Link href="/contact">Architecture Audit</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-24 px-16 text-3xl font-black rounded-3xl border-white/30 text-white hover:bg-white hover:text-prixgen-blue shadow-xl transition-all" asChild>
                  <Link href="/solutions">View Solutions</Link>
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
