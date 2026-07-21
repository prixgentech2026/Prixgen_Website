'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { 
  ArrowLeft, Calendar, Layout, 
  Settings, CheckCircle, TrendingUp 
} from 'lucide-react';
import { SuccessStory } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { LeadCaptureForm } from '@/components/features/lead-capture-form';
import { urlFor } from '@/sanity/lib/image';

interface SuccessStoryClientProps {
  story: SuccessStory;
  relatedStories?: SuccessStory[];
}

// Custom portable text components to match the design system
const customPortableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-xl md:text-2xl font-black text-prixgen-blue mt-8 mb-4 tracking-tighter leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg md:text-xl font-bold text-prixgen-blue mt-8 mb-4 tracking-tighter flex items-center gap-3">
        <span className="h-5 w-1 bg-gradient-to-b from-prixgen-blue to-prixgen-lightblue rounded-full" />
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base md:text-lg font-bold text-prixgen-blue mt-6 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm md:text-base leading-[1.7] text-slate-600 mb-5 font-medium">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative border-l-4 border-prixgen-blue bg-slate-50 p-5 italic my-6 rounded-r-2xl shadow-inner">
        <span className="absolute top-2 left-2 text-4xl text-prixgen-blue/10 font-serif">"</span>
        <div className="relative z-10 text-sm md:text-base text-prixgen-blue font-bold tracking-tight leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none mb-6 space-y-2 text-slate-600 text-sm md:text-base font-medium ml-4">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-prixgen-lightblue shrink-0" />
        <div>{children}</div>
      </li>
    ),
  },
  types: {
    image: ({ value }: any) => {
      try {
        const imageUrl = urlFor(value).url();
        return (
          <figure className="my-8 max-w-3xl mx-auto group">
            <div className="relative w-full overflow-hidden shadow-xl border border-slate-100 bg-white rounded-2xl">
              <img 
                src={imageUrl} 
                alt={value.alt || 'Case Study Visual'} 
                className="w-full h-auto" 
              />
            </div>
            {value.alt && (
              <figcaption className="mt-3 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      } catch (err) {
        return null;
      }
    }
  }
};

export default function SuccessStoryClient({ story, relatedStories = [] }: SuccessStoryClientProps) {
  return (
    <div className="bg-white min-h-screen selection:bg-prixgen-blue selection:text-white pb-16">
      {/* Header spacing */}
      <div className="h-20" />

      {/* Top Navigation & Client Badge */}
      <div className="border-b border-slate-100 bg-white sticky top-20 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/success-stories"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-prixgen-blue transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Success Stories
          </Link>
          
          {story.clientLogo && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Client Profile</span>
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-1">
                <OptimizedImage 
                  src={story.clientLogo} 
                  alt={story.clientName || 'Client'} 
                  fill 
                  className="object-contain" 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-white">
        <AmbientGlow />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="space-y-6">
            {story.industry && (
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-prixgen-blue/5 border border-prixgen-blue/10 text-prixgen-blue text-[10px] font-black uppercase tracking-[0.2em]">
                {story.industry}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-prixgen-dark tracking-tighter leading-[1.1]">
              {story.title}
            </h1>

            {story.subtitle && (
              <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed max-w-3xl">
                {story.subtitle}
              </p>
            )}

            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest pt-2">
              <Calendar size={13} className="text-prixgen-lightblue" />
              {new Date(story.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Main Visual */}
          {story.mainImage && (
            <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 mt-12">
              <OptimizedImage 
                src={story.mainImage} 
                alt={story.title} 
                fill 
                className="object-cover" 
              />
            </div>
          )}
        </div>
      </section>

      {/* Metrics Dashboard */}
      {story.metrics && story.metrics.length > 0 && (
        <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="text-center mb-10">
              <span className="text-[10px] text-prixgen-lightblue font-black uppercase tracking-[0.25em]">Impact Metrics</span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight mt-1">The Numbers After 90 Days</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {story.metrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-md shadow-lg"
                >
                  <p className="text-3xl md:text-4xl font-black text-prixgen-lightblue tracking-tight leading-none mb-2">
                    {metric.value}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-snug">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Narrative Split: Challenge vs. Approach */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Left: Challenge Badge */}
            <div className="md:col-span-4 space-y-4 md:sticky md:top-36">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">The Problem Space</span>
              </div>
              <h2 className="text-2xl font-black text-prixgen-dark tracking-tight leading-tight">
                What Was Holding the Business Back?
              </h2>
            </div>

            {/* Right: Challenge Copy */}
            <div className="md:col-span-8 bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm">
              <div className="prose max-w-none text-slate-600">
                <PortableText 
                  value={story.challenge || []} 
                  components={customPortableTextComponents} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineered Features Section */}
      {story.features && story.features.length > 0 && (
        <section className="py-16 bg-slate-50/50 border-y border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <span className="text-[10px] text-prixgen-blue font-black uppercase tracking-[0.25em]">Solution Scope</span>
              <h2 className="text-2xl md:text-3xl font-black text-prixgen-dark tracking-tight mt-1">
                What Prixgen Actually Engineered
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {story.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-prixgen-blue/5 border border-prixgen-blue/10 flex items-center justify-center shrink-0 text-prixgen-blue">
                    <Settings size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-prixgen-dark text-sm md:text-base leading-snug">
                      {feature.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Body narrative */}
      {story.body && story.body.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose max-w-none">
              <PortableText 
                value={story.body} 
                components={customPortableTextComponents} 
              />
            </div>
          </div>
        </section>
      )}

      {/* Capture Form Container */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Details Left */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-950 to-slate-900 border-r border-white/5">
              <div className="space-y-6">
                <span className="text-[10px] text-prixgen-lightblue font-black uppercase tracking-[0.25em]">Audit Scheduling</span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
                  Need a Similar System Engineered?
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Let's audit your current IT architecture. Our senior consultants will evaluate your current workflow gap and design a custom Odoo/SAP integration roadmap.
                </p>
              </div>

              <div className="space-y-4 pt-10 border-t border-white/10 mt-8">
                {[
                  "No generic software packages — customized for your exact operations",
                  "Direct database integrations — no fragile double-entry",
                  "Built for scale and multi-location deployment"
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-prixgen-lightblue h-5 w-5 shrink-0" />
                    <span className="text-xs text-slate-300 font-semibold">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Right */}
            <div className="lg:col-span-7 p-8 md:p-12 bg-white text-slate-800">
              <h4 className="text-lg font-black text-prixgen-blue mb-6 tracking-tight">Schedule an Architecture Audit</h4>
              <LeadCaptureForm source={`Case Study: ${story.title}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Success Stories */}
      {relatedStories.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <h3 className="text-lg font-black text-prixgen-dark mb-8 tracking-tight flex items-center gap-2">
              <TrendingUp className="text-prixgen-blue" size={20} />
              Other Success Stories
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedStories.map((related) => (
                <div 
                  key={related.slug}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {related.industry && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-prixgen-blue bg-prixgen-blue/5 border border-prixgen-blue/10 px-2 py-0.5 rounded-full inline-block">
                        {related.industry}
                      </span>
                    )}
                    <h4 className="font-black text-prixgen-dark text-sm leading-snug line-clamp-2">
                      <Link href={`/success-stories/${related.slug}`} className="hover:text-prixgen-blue transition-colors">
                        {related.title}
                      </Link>
                    </h4>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-slate-50 flex justify-between items-center">
                    {related.metrics && related.metrics.length > 0 && (
                      <span className="text-xs font-black text-prixgen-blue">{related.metrics[0].value} {related.metrics[0].label}</span>
                    )}
                    <Link 
                      href={`/success-stories/${related.slug}`}
                      className="text-xs font-bold text-prixgen-blue hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
