'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { ShieldCheck, Lock, Eye, FileText, Globe, Server, UserCheck, Scale } from 'lucide-react';
import { PrivacyPageData } from '@/lib/data';

interface PrivacyClientProps {
  data: PrivacyPageData;
}

const iconMap: Record<string, any> = {
  Eye: Eye,
  Server: Server,
  Lock: Lock,
  Globe: Globe,
  ShieldCheck: ShieldCheck,
  UserCheck: UserCheck,
  FileText: FileText,
  Scale: Scale
};

export default function PrivacyClient({ data }: PrivacyClientProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-white selection:bg-prixgen-blue selection:text-white pt-32 pb-24 px-4 overflow-hidden">
      <AmbientGlow />
      
      {/* Interactive Mouse Glow */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 400, 
          y: mousePos.y - 400 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50 }}
        className="fixed top-0 left-0 w-[800px] h-[800px] bg-prixgen-blue/[0.02] rounded-full blur-[120px] pointer-events-none z-10"
      />

      <div className="container mx-auto relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
              <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px]">
                {data.subtitle}
              </span>
            </div>
            <StaggerText 
              text={data.title} 
              variant="gradient"
              className="text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tighter"
            />
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-16">
              {data.heroDescription}
            </p>
          </FadeUp>

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {data.principles.map((principle: any, i: number) => {
              const IconComponent = iconMap[principle.icon] || ShieldCheck;
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:border-prixgen-blue/30 transition-all group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl ring-1 ring-slate-200/50 group-hover:scale-110 transition-transform">
                      <IconComponent className="text-prixgen-blue" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-prixgen-blue mb-4 uppercase tracking-tight">{principle.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {principle.content}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Detailed Content Section */}
          <div className="prose prose-slate max-w-none space-y-16">
            {data.detailedSections.map((section: any, i: number) => (
              <FadeUp key={i}>
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4 uppercase">
                    <span className="w-8 h-8 rounded-lg bg-prixgen-blue/10 flex items-center justify-center text-prixgen-blue text-sm">{String(i + 1).padStart(2, '0')}</span>
                    {section.title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {section.content}
                  </p>
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 mt-8">
                      {section.keyPoints.map((point: string, j: number) => (
                        <li key={j} className="flex items-center gap-4 text-slate-700 font-bold text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="w-2 h-2 rounded-full bg-prixgen-blue" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Footer of the page */}
          <FadeUp delay={0.4}>
            <div className="mt-24 p-12 bg-[#020617] rounded-[4rem] text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-prixgen-blue/20 to-transparent opacity-50" />
              <div className="relative z-10 text-center">
                <Scale className="mx-auto mb-6 text-prixgen-lightblue" size={48} strokeWidth={1} />
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Legal Inquiries</h3>
                <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
                  Have questions about our data practices? Our compliance team is ready to provide the transparency you need.
                </p>
                <a 
                  href="mailto:legal@prixgen.com" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-prixgen-blue rounded-2xl font-bold hover:bg-prixgen-lightblue transition-all shadow-xl shadow-prixgen-blue/20"
                >
                  Contact Compliance <FileText size={18} />
                </a>
              </div>
            </div>
          </FadeUp>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              Last Updated: {data.lastUpdated} | Reference ID: {data.referenceId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
