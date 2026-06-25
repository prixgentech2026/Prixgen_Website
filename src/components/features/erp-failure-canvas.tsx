'use client';

import React from 'react';
import { 
  Cpu, Users, Milestone, Factory, RefreshCw, Wand2, TrendingUp, LifeBuoy, 
  Box, Wrench, Car, Settings, Gem, Armchair, FlaskConical, Utensils, Package, Shirt, Server
} from 'lucide-react';

export function ERPFailureCanvas() {
  return (
    <div className="space-y-12">
      {/* INTRO */}
      <p className="text-base md:text-lg leading-relaxed text-slate-500 font-medium">
        An ERP implementation failure is <strong className="text-prixgen-blue font-bold">almost never a technology issue.</strong> Most organisations over-invest in software selection and underestimate what truly drives success: business processes, industry-specific workflows, change management, and long-term strategic planning. When these are ignored, even the most powerful platform becomes an expensive operational burden instead of a growth enabler.
      </p>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {[
          { value: "70%", label: "ERP projects fail to meet objectives on time or on budget" },
          { value: "55%", label: "Failures traced to poor consulting & change management" },
          { value: "15+", label: "Complex sectors served by Prixgen globally" },
          { value: "3×", label: "Higher ROI when post-go-live support is structured" }
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center hover:shadow-md transition-all group">
            <div className="text-3xl md:text-4xl font-black text-prixgen-blue mb-2 group-hover:scale-105 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ROOT CAUSES */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-black text-prixgen-blue tracking-tighter flex items-center gap-3">
          <span className="h-5 w-1 bg-gradient-to-b from-prixgen-blue to-prixgen-lightblue rounded-full" />
          Root Causes of ERP Failure
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Cpu,
              title: "Software Obsession",
              desc: "Over-focus on platform selection while neglecting process design and business readiness."
            },
            {
              icon: Users,
              title: "People & Adoption",
              desc: "Ignoring stakeholder engagement and user training until after go-live — which is too late."
            },
            {
              icon: Milestone,
              title: "No Long-term Vision",
              desc: "Systems built only for today's requirements with no scalability or compliance headroom."
            }
          ].map((cause, i) => (
            <div key={i} className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
              <div className="p-3 bg-prixgen-blue/5 rounded-xl text-prixgen-blue">
                <cause.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-prixgen-blue text-base mb-2">{cause.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{cause.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 MISTAKES */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-black text-prixgen-blue tracking-tighter flex items-center gap-3">
          <span className="h-5 w-1 bg-gradient-to-b from-prixgen-blue to-prixgen-lightblue rounded-full" />
          5 Critical Consultant Mistakes to Avoid
        </h2>

        <div className="space-y-6">
          {[
            {
              num: "01",
              icon: Factory,
              title: "Lack of Industry Expertise",
              desc: "Generic templates do not work. A manufacturing setup with complex production planning and batch traceability cannot run on the same logic as a retail chain or a service organisation. Each sector demands a specialist implementation approach.",
              risk: "Operational mismatch"
            },
            {
              num: "02",
              icon: RefreshCw,
              title: "Ignoring Change Management",
              desc: "ERP touches every department and every employee. If user readiness and stakeholder engagement are planned only after go-live, adoption will fail. Change management must begin on day one of the project.",
              risk: "Low adoption, rollback pressure"
            },
            {
              num: "03",
              icon: Wand2,
              title: "Treating Technology as a Magic Bullet",
              desc: "Automation does not fix broken workflows — it accelerates them. Processes must be optimised, bottlenecks removed, and KPIs defined before any software is configured. The system reflects the business, not the other way around.",
              risk: "Automating dysfunction"
            },
            {
              num: "04",
              icon: TrendingUp,
              title: "Overlooking Future Scalability",
              desc: "Do not design for today's requirements alone. A robust architecture — such as Odoo's modular framework — allows you to start with core foundations and scale progressively into advanced BI, operations, and compliance without a complete rebuild.",
              risk: "Costly rebuild in 2–3 years"
            },
            {
              num: "05",
              icon: LifeBuoy,
              title: "Limited Post-Go-Live Support",
              desc: "The launch date is the beginning of the ERP journey, not the finish line. Continuous hypercare, performance monitoring, and ongoing optimisation are essential to extract compounding value year after year. Most consultants disappear at go-live.",
              risk: "Value erosion post-launch"
            }
          ].map((mistake, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all relative overflow-hidden group">
              <div className="absolute top-2 right-4 text-7xl font-black text-slate-100/70 select-none group-hover:scale-105 transition-transform duration-500">
                {mistake.num}
              </div>
              <div className="p-3 bg-prixgen-blue/5 rounded-xl text-prixgen-blue h-fit w-fit z-10">
                <mistake.icon size={24} />
              </div>
              <div className="flex-1 space-y-2 z-10">
                <h3 className="text-base md:text-lg font-bold text-prixgen-blue">{mistake.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-slate-500 font-medium max-w-2xl">{mistake.desc}</p>
                <span className="inline-block mt-2 font-bold text-[9px] uppercase tracking-wider bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-100">
                  {mistake.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIFFERENTIATOR */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-black text-prixgen-blue tracking-tighter flex items-center gap-3">
          <span className="h-5 w-1 bg-gradient-to-b from-prixgen-blue to-prixgen-lightblue rounded-full" />
          The Prixgen Difference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Others card */}
          <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full w-fit">
                Typical Consultants
              </span>
              <h3 className="text-lg font-bold text-slate-700">Configure Software</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Treat ERP purely as an IT project. They deploy standard modules, run basic user training, hand over credentials, and close the ticket. The focus is on technical checkmarks rather than business performance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 text-slate-400 text-xs font-semibold">
              Result: Underutilized software and low organizational adoption.
            </div>
          </div>

          {/* Prixgen card */}
          <div className="p-8 rounded-2xl border border-prixgen-blue/10 bg-gradient-to-br from-prixgen-blue to-indigo-950 text-white flex flex-col justify-between shadow-xl shadow-prixgen-blue/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-lightblue/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest bg-prixgen-lightblue/20 text-prixgen-lightblue px-3 py-1 rounded-full w-fit">
                The Prixgen Edge
              </span>
              <h3 className="text-lg font-bold text-white">Transform Operations</h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                Every implementation is a strategic business transformation. We map your specific industrial workflows, align your people before go-live, architect for five-year scalability, and stay engaged long after launch.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-prixgen-lightblue text-xs font-semibold relative z-10">
              Result: A high-performing, unified enterprise with continuous ROI.
            </div>
          </div>
        </div>
      </div>

      {/* CXO QUOTE */}
      <div className="relative group p-6 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden text-left my-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-prixgen-blue/5 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000" />
        
        <blockquote className="relative z-10 border-l-4 border-prixgen-lightblue pl-6">
          <p className="text-base md:text-lg text-prixgen-blue font-bold tracking-tight leading-relaxed italic">
            "Are your consultants simply configuring software — or are they actively transforming the way your business operates?"
          </p>
          <cite className="block mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 not-italic">
            The ultimate question for Managing Directors &amp; CXOs · Prixgen Strategic ERP Advisory
          </cite>
        </blockquote>
      </div>

      {/* SECTORS */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-black text-prixgen-blue tracking-tighter flex items-center gap-3">
          <span className="h-5 w-1 bg-gradient-to-b from-prixgen-blue to-prixgen-lightblue rounded-full" />
          Industries Transformed with Odoo
        </h2>
        
        <div className="flex flex-wrap gap-2.5">
          {[
            { label: "PVC & Plastics", icon: Box },
            { label: "Engineering", icon: Wrench },
            { label: "Automobile", icon: Car },
            { label: "Precision Manufacturing", icon: Settings },
            { label: "Diamond Manufacturing", icon: Gem },
            { label: "Furniture & Timber", icon: Armchair },
            { label: "Chemicals", icon: FlaskConical },
            { label: "Food Processing", icon: Utensils },
            { label: "Meat Processing", icon: Utensils },
            { label: "Packaging", icon: Package },
            { label: "Retail", icon: Shirt },
            { label: "IT Services", icon: Server }
          ].map((sector, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:text-prixgen-blue hover:bg-prixgen-blue/5 hover:border-prixgen-blue/20 transition-all font-bold text-xs uppercase tracking-wider cursor-default">
              <sector.icon size={13} className="text-prixgen-lightblue shrink-0" />
              {sector.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
