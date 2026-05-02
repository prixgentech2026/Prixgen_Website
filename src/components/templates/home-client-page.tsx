'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { VideoFacade } from '@/components/features/video-facade';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StaggerText } from '@/components/animations/stagger-text';
import { FadeUp } from '@/components/animations/fade-up';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { PortableText } from '@/components/ui/portable-text';

import InteractiveGlobe from '@/components/ui/interactive-globe';

/**
 * Custom component to handle patron logos with robust fallback
 */

const PatronLogo = ({ patron }: { patron: { id: string; name: string } }) => {
  const [error, setError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-w-[280px] grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 cursor-default opacity-60 hover:opacity-100 px-10 group">
      <div className="w-28 h-28 mb-4 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden p-6 border border-slate-100 group-hover:border-prixgen-blue/30 transition-all duration-300">
        {!error ? (
          <img 
            src={`/images/patron_${patron.id}.png`} 
            alt={patron.name} 
            className="w-full h-full object-contain"
            onError={() => setError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 text-prixgen-blue font-black text-2xl animate-in fade-in zoom-in duration-500">
            {patron.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
        )}
      </div>
      <span className="text-[10px] font-black text-prixgen-blue/80 tracking-[0.2em] uppercase text-center max-w-[200px] line-clamp-1">{patron.name}</span>
    </div>
  );
};

const PATRONS = [
  { id: 'elsteel', name: 'EL Steel' },
  { id: 'licious', name: 'Licious' },
  { id: 'curefit', name: 'Curefit' },
  { id: 'ravago', name: 'Ravago' },
  { id: 'zetwerk', name: 'Zetwerk' },
  { id: 'designcafe', name: 'Designcafe' },
  { id: 'starpipe', name: 'Starpipe' },
  { id: 'wittmann', name: 'Wittmann Battenfeld' },
  { id: 'worldoutdoor', name: 'World of Outdoor' },
  { id: 'murudeshwar', name: 'Murudeshwar' },
  { id: 'ceezet', name: 'Ceezet' },
  { id: 'sfdyes', name: 'SF Dyes' },
  { id: 'starflex', name: 'Star Flex' },
  { id: 'lseng', name: 'L S Engineering' },
  { id: 'synthesis', name: 'Synthesis Solutions' },
  { id: 'vahini', name: 'Vahini Irrigation' },
  { id: 'biworldwide', name: 'BI Worldwide' },
  { id: 'masfurniture', name: 'Mas Furniture' },
  { id: 'onetown', name: 'One Town Engineering' },
  { id: 'diamondmetal', name: 'Diamond Metal Screen' },
  { id: 'alansari', name: 'Al Ansari' },
  { id: 'morris', name: 'Morris And Sons' },
  { id: 'plymoduld', name: 'Plymoduld' },
  { id: 'instellars', name: 'Instellars' },
  { id: 'starwater', name: 'Star Water Tanker' },
];




export default function HomeClientPage({ homeData }: { homeData: any }) {
  return (
    <div className="bg-white">
      <JsonLd 
        type="Organization" 
        data={{ 
          name: "Prixgen Enterprise", 
          url: "https://www.prixgen.com",
          logo: "https://www.prixgen.com/logo.png" 
        }} 
      />
      
      <main>
        {/* 1. Hero Section (Exploring / Innovation) */}
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
          <AmbientGlow />
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-prixgen-lightblue font-bold tracking-[0.2em] uppercase text-sm">Exploring</p>
                <StaggerText 
                  text="Innovation" 
                  variant="gradient"
                  className="text-6xl lg:text-8xl font-extrabold leading-tight"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-prixgen-blue mb-6">
                  {homeData.title || "Intelligent Operations. Unified Enterprise."}
                </h1>
                {homeData.subheadline ? (
                  <PortableText 
                    value={homeData.subheadline} 
                    className="text-xl text-prixgen-dark max-w-xl leading-relaxed font-medium"
                  />
                ) : (
                  <p className="text-xl text-prixgen-dark max-w-xl leading-relaxed font-medium">
                    We architect, deploy, and manage scalable ERP and supply chain ecosystems for modern industrial enterprises.
                  </p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/contact">{homeData.heroPrimaryCTA || "Get Started"}</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link href="/solutions/odoo-enterprise">{homeData.heroSecondaryCTA || "Explore Architecture"}</Link>
                </Button>
              </motion.div>
            </div>
            <FadeUp delay={0.3} className="relative z-10 flex justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-prixgen-blue/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-prixgen-lightblue/10 rounded-full blur-3xl animate-pulse delay-700" />
                
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative z-20 rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
                >
                  <img 
                    src="/images/hero.png" 
                    alt="Industrial Intelligence"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-prixgen-blue/20 to-transparent pointer-events-none" />
                </motion.div>
                
                {/* Floating Data Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -right-8 top-1/4 z-30 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-100 hidden md:block"
                >
                  <div className="text-prixgen-blue font-bold text-2xl">500+</div>
                  <div className="text-xs text-prixgen-dark/40 font-bold uppercase tracking-widest">Enterprises Unified</div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 2. Services Section (Our Best Services / Prixgen Services) */}
        <section className="py-24 bg-prixgen-gray/10 relative">
          <div className="container mx-auto px-4">
            <FadeUp className="mb-16 text-center lg:text-left">
              <p className="text-prixgen-lightblue font-bold tracking-widest uppercase text-xs mb-4">Our Best Services</p>
              <h2 className="text-4xl md:text-5xl font-bold text-prixgen-blue mb-6">Prixgen Services</h2>
              <p className="text-prixgen-dark/70 max-w-3xl leading-relaxed">
                Prixgen’s voyage is extremely unique. We traverse through a stringent yet economical and customer driven solution method. Fundamental of any success derives from constant research and enabling a suitable solution.
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Consulting', desc: 'Prixgen Gold Partner with Oddo and is the best software consulting company in India providing IT consulting services.', link: '/services/it-consulting', icon: 'Strategy', img: '/images/consulting.png' },
                { title: 'Warehouse', desc: 'Better Warehouse management can be yours. Reduce inventory and warehouse costs while improving customer service.', link: '/solutions/warehouse-management', icon: 'Box', img: '/images/warehouse.png' },
                { title: 'IIoT', desc: 'Manage Millions of IIOT Device Connections And Support Applications That Open New Revenues For Industries.', link: '/solutions/industrial-internet-of-things', icon: 'Cpu', img: '/images/iiot.png' },
              ].map((service, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <Link href={service.link} className="block h-full group">
                    <div className="h-full bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-[2.5rem] shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,102,204,0.15)] hover:border-prixgen-blue/20 relative overflow-hidden group">
                      {/* Image Container with Zoom */}
                      <div className="h-64 overflow-hidden relative bg-slate-100">
                        <motion.img 
                          src={service.img} 
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg group-hover:bg-prixgen-blue group-hover:text-white transition-all duration-500">
                            <span className="text-xl">
                              {service.icon === 'Strategy' && '📊'}
                              {service.icon === 'Box' && '📦'}
                              {service.icon === 'Cpu' && '⚙️'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-10 pt-4 relative z-10">
                        <h3 className="text-2xl font-bold mb-4 text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-prixgen-dark/70 leading-relaxed mb-8 min-h-[80px]">
                          {service.desc}
                        </p>
                        <div className="flex items-center text-prixgen-lightblue font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                          Architecture Details 
                          <motion.span 
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Our Solutions Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
              <FadeUp className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-prixgen-blue mb-4">Our Solutions</h2>
                <p className="text-xl text-prixgen-dark/60">
                  What’s your challenge? Let’s work together to solve it.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/solutions">View All Architecture</Link>
                </Button>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Odoo Enterprise', desc: 'Engineering Odoo into a scalable enterprise engine for global workflows.', img: '/images/odoo.png', color: 'from-purple-500/10' },
                { title: 'SAP Business One', desc: 'Advanced ERP orchestration for high-growth industrial sectors.', img: '/images/sap.png', color: 'from-blue-600/10' },
                { title: 'Microsoft Dynamics', desc: 'Intelligent cloud ERP solutions for unified business processes.', img: '/images/microsoft.png', color: 'from-blue-400/10' },
                { title: 'Power BI Analytics', desc: 'Real-time industrial intelligence and predictive visualization.', img: '/images/powerbi.png', color: 'from-yellow-500/10' }
              ].map((sol, i) => (
                <FadeUp key={i} delay={i * 0.1} className="group cursor-pointer">
                  <div className={`h-full p-8 bg-prixgen-blue rounded-[2.5rem] text-white relative overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.4)] flex flex-col`}>
                    {/* Radial Glow Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10 flex-1">
                      <div className="aspect-square w-24 mb-6 rounded-2xl bg-white/10 p-4 flex items-center justify-center overflow-hidden">
                        <img src={sol.img} alt={sol.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{sol.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{sol.desc}</p>
                    </div>
                    
                    <div className="relative z-10 mt-8 flex items-center text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                      Learn Architecture <span className="ml-2">→</span>
                    </div>

                    <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110 -mb-4 -mr-4">
                      <div className="w-24 h-24 border-[4px] border-white rounded-full" />
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Our Patronage Section - Infinite Marquee */}
        <section className="py-24 bg-prixgen-gray/20 overflow-hidden relative border-y border-slate-200/50">
          <div className="container mx-auto px-4 relative z-10">
            <FadeUp className="text-center mb-16">
              <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Our Patronage</h2>
              <div className="w-20 h-1 bg-prixgen-lightblue mx-auto rounded-full" />
            </FadeUp>
          </div>
          
          <div className="relative flex overflow-x-hidden group">
            {/* Left and Right Gradients to hide edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-prixgen-gray/20 to-transparent z-20" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-prixgen-gray/20 to-transparent z-20" />

            <motion.div 
              className="flex whitespace-nowrap gap-0 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear"
                }
              }}
            >
              {[...PATRONS, ...PATRONS].map((patron, i) => (
                <PatronLogo key={`${patron.id}-${i}`} patron={patron} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Testimonials Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <FadeUp className="text-center mb-16">
              <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Success Voices</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Hear from the leaders who have transformed their operations with Prixgen.</p>
              <div className="w-20 h-1 bg-prixgen-lightblue mx-auto rounded-full mt-4" />
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Karan Shetty", 
                  company: "Murudeshwar Ceramics Limited", 
                  role: "Executive Director",
                  text: "We replace all legacy SAP, Tally, and Daily Tracker applications with Odoo Enterprise Edition. Now, we are working from home due to COVID-19 situation; all our teams are interconnected, and everything is happening paperless. Thanks to Prixgen's professional efforts and expert knowledge.",
                  id: "karan"
                },
                { 
                  name: "Mr. Hemraj Sencha", 
                  company: "Vahini Irrigations Private Limited", 
                  role: "Managing Director",
                  text: "Our experience with Prixgen has been exceptional. The breadth and depth of the offering has met all our requirements, and the team has been incredibly responsive to all our needs.",
                  id: "hemraj"
                },
                { 
                  name: "Kshiraj Prakash", 
                  company: "BI Worldwide", 
                  role: "Finance Controller",
                  text: "The COVID-19 forced us to start using Odoo. I must say Odoo ERP reduced a lot of reporting & reconsiliation time of my team. Prixgen team configured an accounting platform without disrupting current practices. We got a strong implementation partner with exceptional product knowledge.",
                  id: "kshiraj"
                }
              ].map((testimonial, i) => (
                <FadeUp key={i} delay={i * 0.1} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group hover:bg-prixgen-blue transition-all duration-500 h-full flex flex-col">
                  <div className="mb-6 text-prixgen-lightblue group-hover:text-white transition-colors">
                    <svg className="w-10 h-10 fill-current opacity-20" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V4H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.91241 16 4.01697 16H7.01697C7.56925 16 8.01697 15.5523 8.01697 15V9C8.01697 8.44772 7.56925 8 7.01697 8H3.01697C2.46468 8 2.01697 8.44772 2.01697 9V11C2.01697 11.5523 1.56925 12 1.01697 12H0.0169678V4H10.017V15C10.017 18.3137 7.33068 21 4.01697 21H2.01697Z"></path></svg>
                  </div>
                  <p className="text-slate-600 group-hover:text-white/90 transition-colors mb-8 text-lg italic flex-1">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-prixgen-gray flex items-center justify-center font-bold text-prixgen-blue group-hover:bg-white group-hover:text-prixgen-blue transition-colors">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-prixgen-blue group-hover:text-white transition-colors">{testimonial.name}</h4>
                      <p className="text-xs text-prixgen-lightblue group-hover:text-white/70 transition-colors uppercase tracking-widest leading-tight">{testimonial.company}</p>
                      <p className="text-[10px] text-slate-400 group-hover:text-white/50 transition-colors">{testimonial.role}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Stories Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <FadeUp>
                <h2 className="text-4xl font-bold text-prixgen-blue mb-4">Latest From Stories</h2>
                <p className="text-slate-500 max-w-2xl">Prixgen success stories and updates. Get latest information around Prixgen and its partners.</p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <Link href="/stories">
                  <Button variant="outline" className="rounded-full border-prixgen-blue text-prixgen-blue hover:bg-prixgen-blue hover:text-white">
                    View All Stories
                  </Button>
                </Link>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "The Future of Industrial AI", category: "Technology", date: "May 2026", color: "from-blue-500 to-indigo-600" },
                { title: "Optimizing Warehouse Workflows with IIoT", category: "Operations", date: "April 2026", color: "from-indigo-500 to-prixgen-blue" },
                { title: "SAP Business One vs. Odoo: A Guide", category: "Solutions", date: "March 2026", color: "from-prixgen-blue to-prixgen-lightblue" }
              ].map((story, i) => (
                <FadeUp key={i} delay={i * 0.1} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer h-full flex flex-col">
                  <div className={`aspect-video bg-gradient-to-br ${story.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-prixgen-blue text-[10px] font-bold uppercase tracking-widest rounded-full">{story.category}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest font-bold">{story.date}</p>
                    <h3 className="text-xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors line-clamp-2 mb-6">{story.title}</h3>
                    <div className="mt-auto flex items-center text-prixgen-lightblue font-bold text-sm">
                      Read Story <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Worldwide Presence Section */}
        <section className="py-32 bg-white border-t border-slate-100 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headquarters */}
              <FadeUp className="space-y-12">
                <div>
                  <p className="text-prixgen-lightblue font-bold tracking-widest uppercase text-xs mb-4">Headquarters</p>
                  <h2 className="text-4xl font-bold text-prixgen-blue mb-8 leading-tight">
                    Prixgen India
                  </h2>
                  <div className="space-y-6">
                    <p className="text-xl text-prixgen-dark font-bold leading-relaxed">
                      Prixgen Tech Solutions Pvt. Ltd.
                    </p>
                    <p className="text-lg text-prixgen-dark/70 leading-relaxed font-medium">
                      #244, Kalabairaweshwara Complex, 1st Stage Nivedithanagar, Mysuru – 570022, Karnataka, INDIA
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-prixgen-lightblue font-bold tracking-widest uppercase text-xs">Global Presence</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Australia', 'Dubai', 'Hong Kong', 'Philippines'].map((loc) => (
                      <div key={loc} className="flex items-center gap-2 text-prixgen-blue font-bold">
                        <div className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                        {loc}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <Button size="lg" className="h-14 px-10 text-lg shadow-2xl shadow-prixgen-blue/20 w-full lg:w-auto" asChild>
                    <Link href="/contact">Architecture Audit</Link>
                  </Button>
                </div>
              </FadeUp>
              
              {/* Center Column: Interactive 3D Canvas Globe */}
              <div className="relative flex justify-center items-center py-12 lg:py-0">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <InteractiveGlobe />
                </div>

              </div>


              {/* Right Column: Lead Form */}
              <FadeUp delay={0.2} className="relative">
                <div className="absolute inset-0 bg-prixgen-blue/5 rounded-[3rem] blur-3xl -z-10" />
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-lightblue/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <h3 className="text-2xl font-bold mb-8 text-prixgen-blue">Ready to scale worldwide?</h3>
                  <LeadCaptureForm source="Homepage Worldwide Section" />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

