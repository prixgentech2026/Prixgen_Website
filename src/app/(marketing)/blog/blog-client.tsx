'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, ChevronRight, Share2 } from 'lucide-react';
import { BlogPost } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      {/* Section 1: Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32 overflow-hidden bg-white">
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
                Industrial Intelligence
              </span>
              <div className="h-[1px] w-8 bg-prixgen-blue/30" />
            </div>
            
            <StaggerText 
              text="Strategic Insights & Architecture" 
              variant="gradient"
              className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter"
            />
            
            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-4xl mx-auto">
              Expert perspectives on Industry 4.0, enterprise digital transformation, and the future of resilient industrial ecosystems.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      {/* Section 2: Featured Post (Immersive) */}
      {featuredPost && (
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <FadeUp>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Featured Analysis</span>
              </div>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-[3.5rem] bg-prixgen-blue overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,102,204,0.3)]"
            >
              <div className="grid lg:grid-cols-2 min-h-[500px]">
                <div className="relative overflow-hidden h-[400px] lg:h-auto">
                  <OptimizedImage
                    src={featuredPost.mainImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-prixgen-blue/80 to-transparent z-10" />
                </div>

                <div className="relative p-12 lg:p-20 flex flex-col justify-center text-white z-20">
                  <div className="flex items-center gap-6 mb-8">
                    {featuredPost.categories?.map((cat: { title: string }) => (
                      <span key={cat.title} className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        {cat.title}
                      </span>
                    ))}
                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={14} className="text-prixgen-lightblue" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tighter group-hover:text-prixgen-lightblue transition-colors duration-500">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-xl text-white/70 font-medium mb-10 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-10 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      {featuredPost.author?.image && (
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-prixgen-lightblue rotate-3 group-hover:rotate-0 transition-transform">
                          <OptimizedImage src={featuredPost.author.image} alt={featuredPost.author.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-lg">{featuredPost.author?.name}</div>
                        <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Strategic Lead</div>
                      </div>
                    </div>
                    
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-prixgen-blue shadow-xl"
                      >
                        <ArrowRight size={28} />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Section 3: Insights Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/60 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 text-left">
            <FadeUp className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Industrial Feed</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-prixgen-blue tracking-tighter leading-tight">
                Latest <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">Architectural Reviews</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} className="max-w-md">
              <p className="text-lg lg:text-xl text-slate-500 font-medium">
                Deep dives into technical excellence and operational resiliency.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {remainingPosts.length > 0 ? (
              remainingPosts.map((post, idx) => (
                <FadeUp key={post.slug} delay={idx * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="relative p-8 bg-white rounded-[2.5rem] h-full flex flex-col transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,102,204,0.15)] border border-transparent hover:border-prixgen-blue/10 overflow-hidden"
                    >
                      <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-8">
                        <OptimizedImage
                          src={post.mainImage || "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-prixgen-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute top-6 left-6 z-10">
                          {post.categories?.[0] && (
                            <span className="px-4 py-1 rounded-full bg-white/90 backdrop-blur-md text-prixgen-blue text-[10px] font-black uppercase tracking-widest shadow-xl">
                              {post.categories[0].title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-6 flex-grow text-left">
                        <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          <Clock size={12} className="text-prixgen-lightblue" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 font-medium leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-prixgen-blue">
                            <User size={16} />
                          </div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{post.author?.name}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-prixgen-blue/5 flex items-center justify-center text-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              ))
            ) : (
              !featuredPost && (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-300">
                  <h3 className="text-2xl font-bold text-prixgen-blue mb-4">Architectural Reviews Pending</h3>
                  <p className="text-slate-500 font-medium">We are currently synthesizing our next batch of strategic industrial intelligence.</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Newsletter / Stay Informed */}
      <section className="py-24 lg:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-gradient-to-br from-prixgen-blue to-indigo-950 rounded-[3.5rem] lg:rounded-[5rem] p-12 lg:p-32 overflow-hidden shadow-2xl group"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center text-left">
              <FadeUp className="space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-sm uppercase tracking-widest">
                  <span className="w-2 h-2 bg-prixgen-lightblue rounded-full animate-pulse" />
                  Industrial Briefing
                </div>
                <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                  Stay ahead of the <span className="text-prixgen-lightblue italic">industrial curve.</span>
                </h2>
                <p className="text-xl text-white/60 max-w-xl font-medium">
                  Get our quarterly executive review of Industry 4.0 shifts and architectural breakthroughs.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="max-w-md ml-auto bg-white/5 backdrop-blur-2xl p-8 lg:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-2">Work Email</label>
                        <input 
                          type="email" 
                          placeholder="arvinth@prixgen.com" 
                          className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-white outline-none focus:border-prixgen-lightblue focus:bg-white/20 transition-all"
                        />
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 bg-white text-prixgen-blue rounded-2xl font-black text-lg shadow-xl hover:bg-prixgen-lightblue hover:text-white transition-all"
                      >
                        Subscribe to Insights
                      </motion.button>
                      <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-widest">
                        Zero spam. Pure industrial intelligence.
                      </p>
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
