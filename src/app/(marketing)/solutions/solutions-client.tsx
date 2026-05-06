'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Server, Globe, Zap, Database, BarChart } from "lucide-react";
import Link from 'next/link';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { PageData } from '@/lib/data';

const IconMap: Record<string, any> = {
  'odoo-enterprise': Server,
  'sap-business-one': Database,
  'microsoft-dynamics-365': Globe,
  'lecca-ai': Cpu,
};

const getIcon = (slug: string) => IconMap[slug] || Zap;

export default function SolutionsClient({ solutions }: { solutions: PageData[] }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-32 overflow-hidden bg-white">
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
                Architecture Suite
              </span>
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
            </div>
            
            <StaggerText 
              text="Solutions" 
              variant="gradient"
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] mb-12 tracking-tighter"
            />
            
            <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-4xl mx-auto">
              We don't just sell software. We engineer operational engines that empower global enterprises to scale without limits.
            </p>
          </FadeUp>
        </motion.div>
        
      </section>

      {/* Solutions Grid */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            {solutions.map((solution, i) => {
              const Icon = getIcon(solution.slug);
              return (
                <FadeUp key={solution.slug} delay={i * 0.1}>
                  <Link href={`/solutions/${solution.slug}`} className="group block h-full">
                    <motion.div 
                      whileHover={{ y: -15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-16 bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 h-full overflow-hidden flex flex-col justify-between"
                    >
                      <div className="space-y-10">
                        <div className="flex justify-between items-start">
                          <div className="w-24 h-24 bg-gradient-to-br from-prixgen-blue to-prixgen-lightblue rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                            <Icon size={48} />
                          </div>
                          <div className="text-[10px] font-bold text-prixgen-blue/40 uppercase tracking-[0.2em] pt-2">
                            {solution.title.includes('AI') ? 'Proprietary' : 'Enterprise'}
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-4xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors leading-tight">
                            {solution.title}
                          </h3>
                          <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {solution.headline}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-16 pt-8 border-t border-slate-50 flex items-center text-prixgen-lightblue font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                        View Deployment Roadmap <ArrowRight className="ml-2" size={16} />
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="max-w-6xl mx-auto bg-prixgen-blue rounded-[5rem] p-12 lg:p-32 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-12">
                <h2 className="text-5xl md:text-7xl font-bold leading-[1] tracking-tighter">
                  Ready to architect <br /> <span className="italic opacity-60">your future?</span>
                </h2>
                <Link href="/contact" className="inline-block px-12 py-6 bg-white text-prixgen-blue rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-transform">
                  Schedule an Audit
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
