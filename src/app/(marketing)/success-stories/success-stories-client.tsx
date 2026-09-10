'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Calendar, ArrowRight, TrendingUp, Cpu, Award } from 'lucide-react';
import { SuccessStory } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { HeroBadge } from '@/components/shared/hero-badge';

interface SuccessStoriesClientProps {
  stories: SuccessStory[];
}

function getStoryImageUrl(mainImg: any): string {
  if (!mainImg) return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200";
  if (typeof mainImg === 'string') return mainImg;
  return mainImg.url || mainImg.asset?.url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200";
}

export default function SuccessStoriesClient({ stories }: SuccessStoriesClientProps) {
  const featuredStory = stories[0];
  const remainingStories = stories.slice(1);

  // Parallax Scroll Animation
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 overflow-hidden bg-white">
        <AmbientGlow />
        
        <motion.div 
          style={{ 
            backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', 
            backgroundSize: '45px 45px',
            y: bgY 
          }} 
          className="absolute inset-0 z-0 opacity-[0.03] will-change-transform" 
        />

        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -25, 0],
              x: [0, 15, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[8%] w-64 h-64 bg-prixgen-blue/10 rounded-full blur-[80px] opacity-25"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[10%] w-[320px] h-[320px] bg-prixgen-lightblue/10 rounded-full blur-[90px] opacity-20"
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <FadeUp className="space-y-4">
            <HeroBadge text="Enterprise Proof" align="center" className="mb-2" />
            
            <StaggerText 
              text="Client Success Stories" 
              variant="gradient"
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.0] mb-4 tracking-tighter"
            />
            
            <p className="text-base lg:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Real-world industrial solutions engineered to scale. Explore how we align systems, optimize supply chains, and drive quantifiable value.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      {/* Featured Success Story */}
      {featuredStory && (
        <section className="py-8 lg:py-16 relative overflow-hidden bg-slate-50/50 border-y border-slate-100">
          <div className="container mx-auto px-4 relative z-10">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-10 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Featured Transformation</span>
              </div>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl bg-white overflow-hidden shadow-2xl border border-slate-100"
            >
              <div className="grid lg:grid-cols-12 min-h-[450px]">
                {/* Image Section - 100% Uncropped with Premium Showcase Framing */}
                <div className="relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-slate-100/40 to-slate-50 border-b lg:border-b-0 lg:border-r border-slate-100 lg:col-span-6 overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]">
                    <img
                      src={getStoryImageUrl(featuredStory.mainImage)}
                      alt={featuredStory.title}
                      className="w-full h-auto max-h-[420px] object-contain rounded-2xl shadow-md transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-8 lg:p-12 flex flex-col justify-center lg:col-span-6 bg-white">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {featuredStory.industry && (
                      <span className="px-3 py-1 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue text-[9px] font-black uppercase tracking-[0.2em]">
                        {featuredStory.industry}
                      </span>
                    )}
                    <span className="text-slate-400 text-xs font-semibold">
                      Client: {featuredStory.clientName || 'Partner'}
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-black mb-3 leading-tight tracking-tighter text-prixgen-dark hover:text-prixgen-blue transition-colors duration-300">
                    <Link href={`/success-stories/${featuredStory.slug}`}>
                      {featuredStory.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-3 leading-relaxed">
                    {featuredStory.subtitle}
                  </p>

                  {/* Highlights Metrics inside the card */}
                  {featuredStory.metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pt-6 border-t border-slate-100">
                      {featuredStory.metrics.slice(0, 3).map((metric, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-2xl font-black text-prixgen-blue tracking-tight">{metric.value}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <Link 
                      href={`/success-stories/${featuredStory.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-prixgen-blue text-white font-bold text-xs uppercase tracking-widest hover:bg-prixgen-blue/90 shadow-lg shadow-prixgen-blue/20 hover:shadow-xl hover:shadow-prixgen-blue/30 transition-all duration-300 group"
                    >
                      Read Case Study
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Grid of Remaining Stories */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          {remainingStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingStories.map((story, index) => (
                <motion.div
                  key={story.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image - 100% Uncropped Display */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 p-3 flex items-center justify-center border-b border-slate-100">
                      <img
                        src={getStoryImageUrl(story.mainImage)}
                        alt={story.title}
                        className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        {story.industry && (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-100 text-prixgen-blue text-[8px] font-black uppercase tracking-[0.15em] shadow-sm">
                            {story.industry}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-black text-prixgen-dark mb-2 leading-snug tracking-tight group-hover:text-prixgen-blue transition-colors duration-300 line-clamp-2">
                        <Link href={`/success-stories/${story.slug}`}>
                          {story.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-6 font-medium">
                        {story.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Stat Badge Footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                    {story.metrics && story.metrics.length > 0 ? (
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-prixgen-blue leading-none">{story.metrics[0].value}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{story.metrics[0].label}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Case Study</span>
                    )}
                    <Link 
                      href={`/success-stories/${story.slug}`}
                      className="text-xs font-bold text-prixgen-blue hover:text-prixgen-blue/80 flex items-center gap-1.5 transition-colors group/link"
                    >
                      View
                      <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            remainingStories.length === 0 && !featuredStory && (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100 max-w-lg mx-auto">
                <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">Publishing Success Stories</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto px-4">
                  We are preparing our case studies. Visit Sanity Studio to compose and publish your transformation records.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 md:py-24 bg-prixgen-dark relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10"
          >
            <Cpu className="text-prixgen-lightblue h-8 w-8" />
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Ready to Accelerate Your Enterprise Operations?
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
              Join leading APAC and global enterprises leveraging Odoo & SAP ecosystems to eliminate inefficiencies, automate accounting, and achieve real-time compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link 
              href="/contact"
              className="px-8 py-4 rounded-xl bg-prixgen-blue hover:bg-prixgen-blue/90 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-prixgen-blue/20 hover:shadow-xl hover:shadow-prixgen-blue/30 transition-all duration-300"
            >
              Partner with Us
            </Link>
            <Link 
              href="/services"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
