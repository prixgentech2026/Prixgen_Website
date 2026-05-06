'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import Link from 'next/link';

export default function CareersClient() {
  return (
    <div className="bg-white selection:bg-prixgen-blue selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-white">
        <AmbientGlow />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeUp className="space-y-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
              <span className="px-4 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue font-bold tracking-widest uppercase text-[10px]">
                Global Engineering
              </span>
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
            </div>
            
            <StaggerText 
              text="Careers" 
              variant="gradient"
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] mb-12 tracking-tighter"
            />
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                Join an elite team of engineers, architects, and consultants. We are building the future of industrial intelligence.
              </p>
            </div>
          </FadeUp>
        </div>
        
      </section>

      <section className="container mx-auto px-4 py-32 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
          {/* Open Positions */}
          <div className="lg:col-span-2 space-y-20">
            <FadeUp>
              <h2 className="text-4xl font-bold text-prixgen-blue mb-12 flex items-center gap-4">
                Current Openings
                <span className="h-px flex-1 bg-slate-100" />
              </h2>
            </FadeUp>
            
            <div className="space-y-8">
              {[
                { title: 'Senior Python/Odoo Developer', type: 'Full-time', location: 'Mysuru', team: 'Engineering' },
                { title: 'Functional Consultant (ERP)', type: 'Full-time', location: 'Mysuru', team: 'Consulting' },
                { title: 'Technical Project Manager', type: 'Full-time', location: 'Mysuru', team: 'Project Management' },
              ].map((job, i) => (
                <FadeUp key={job.title} delay={i * 0.1}>
                  <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 hover:shadow-blue-500/10 transition-all duration-500 border border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                    <div className="space-y-4">
                      <div className="text-[10px] font-black text-prixgen-blue/40 uppercase tracking-[0.2em]">{job.team}</div>
                      <h3 className="text-3xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors duration-300">{job.title}</h3>
                      <div className="flex gap-6 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-blue-500/20" /> {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-green-500/20" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-2xl border-2 border-slate-100 text-prixgen-blue hover:bg-prixgen-blue hover:text-white px-10 h-16 font-bold text-base transition-all duration-300">
                      Apply Now
                    </Button>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Quick Application */}
          <div className="lg:col-span-1">
            <FadeUp delay={0.3} className="sticky top-24">
              <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6 text-prixgen-blue">Direct Application</h3>
                  <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    Submit your credentials directly for priority review by our engineering leads.
                  </p>
                  
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                      <input type="text" className="w-full p-6 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-prixgen-blue transition-all outline-none font-medium" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                      <input type="email" className="w-full p-6 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-prixgen-blue transition-all outline-none font-medium" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Resume (PDF)</label>
                      <div className="relative group cursor-pointer">
                        <div className="w-full p-12 border-2 border-dashed border-slate-100 rounded-2xl group-hover:border-prixgen-blue group-hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-slate-400 group-hover:text-prixgen-blue">
                          <span className="text-3xl mb-4 opacity-50 group-hover:scale-110 transition-transform">📄</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Select Roadmap</span>
                        </div>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf" />
                      </div>
                    </div>
                    <Button className="w-full py-8 text-lg rounded-2xl shadow-xl shadow-prixgen-blue/20 font-black tracking-widest uppercase">Send Credentials</Button>
                  </form>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}
