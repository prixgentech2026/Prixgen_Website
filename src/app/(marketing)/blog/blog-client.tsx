'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { FadeUp } from '@/components/animations/fade-up';
import { StaggerText } from '@/components/animations/stagger-text';
import { AmbientGlow } from '@/components/animations/ambient-glow';
import { HeroBadge } from '@/components/shared/hero-badge';

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  
  // Hero Parallax with Spring for smoothness
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]); // Deeper parallax

  return (
    <div className="bg-white overflow-hidden selection:bg-prixgen-blue selection:text-white">
      {/* Section 1: Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-28 pb-12 overflow-hidden bg-white">
        <AmbientGlow />
        
        <motion.div 
          style={{ 
            backgroundImage: 'radial-gradient(#0066cc 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            y: bgY 
          }} 
          className="absolute inset-0 z-0 opacity-[0.03] will-change-transform" 
        />

        {/* Floating Decorative Nodes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 90, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-72 h-72 bg-prixgen-blue/10 rounded-full blur-[80px] opacity-20"
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              x: [0, -30, 0],
              rotate: [0, -60, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-prixgen-lightblue/10 rounded-full blur-[100px] opacity-20"
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <FadeUp className="space-y-4">
            <HeroBadge text="Industrial Intelligence" align="center" className="mb-2" />
            
            <StaggerText 
              text="Strategic Insights & Architecture" 
              variant="gradient"
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.0] mb-4 tracking-tighter"
            />
            
            <p className="text-base lg:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Resilient perspectives on digital transformation, architecture, and technology leadership.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      {/* Section 2: Featured Post (Immersive) */}
      {featuredPost && (
        <section className="py-8 lg:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <FadeUp>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-10 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Featured Analysis</span>
              </div>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl bg-prixgen-blue overflow-hidden shadow-xl"
            >
              <div className="grid lg:grid-cols-2 min-h-[400px]">
                <div className="relative overflow-hidden h-[300px] lg:h-auto">
                  <OptimizedImage
                    src={featuredPost.mainImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-prixgen-blue/80 to-transparent z-10" />
                </div>

                <div className="relative p-8 lg:p-12 flex flex-col justify-center text-white z-20">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {featuredPost.categories?.map((cat: { title: string }) => (
                      <span key={cat.title} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-[0.2em]">
                        {cat.title}
                      </span>
                    ))}
                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={12} className="text-prixgen-lightblue" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-black mb-4 leading-tight tracking-tighter group-hover:text-prixgen-lightblue transition-colors duration-500">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-base text-white/70 font-medium mb-6 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {featuredPost.author?.image && (
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-prixgen-lightblue rotate-3 group-hover:rotate-0 transition-transform bg-white p-0.5">
                          <OptimizedImage src={featuredPost.author.image} alt={featuredPost.author.name} fill className="object-contain" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-base">{featuredPost.author?.name}</div>
                        <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">
                          {featuredPost.author?.position || "Strategic Lead"}
                        </div>
                      </div>
                    </div>
                    
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-prixgen-blue shadow-lg group/btn"
                      >
                        <motion.div
                          animate={{ x: [0, 2, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight size={20} />
                        </motion.div>
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
      <section className="py-10 lg:py-16 bg-slate-50 border-y border-slate-200/60 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12 text-left relative">
            <motion.div 
              animate={{ 
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute left-[-10%] top-1/2 w-72 h-72 bg-prixgen-blue/5 rounded-full blur-[100px] pointer-events-none"
            />
            <FadeUp className="max-w-xl">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] w-10 bg-prixgen-blue" />
                <span className="text-prixgen-blue font-bold tracking-[0.2em] uppercase text-[10px]">Industrial Feed</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-prixgen-blue tracking-tighter leading-tight">
                Latest <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prixgen-blue to-prixgen-lightblue">Architectural Reviews</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2} className="max-w-sm">
              <p className="text-base text-slate-500 font-medium">
                Deep dives into technical excellence and operational resiliency.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.length > 0 ? (
              remainingPosts.map((post, idx) => (
                <FadeUp key={post.slug} delay={idx * 0.05}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <motion.div 
                      whileHover={{ y: -6, scale: 1.01 }}
                      className="relative p-6 bg-white rounded-2xl h-full flex flex-col transition-all duration-500 hover:shadow-lg border border-slate-100 hover:border-prixgen-blue/20 overflow-hidden group"
                    >
                      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6">
                        <OptimizedImage
                          src={post.mainImage || "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-prixgen-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute top-4 left-4 z-10">
                          {post.categories?.[0] && (
                            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-prixgen-blue text-[9px] font-black uppercase tracking-widest shadow-md">
                              {post.categories[0].title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4 flex-grow text-left">
                        <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                          <Clock size={10} className="text-prixgen-lightblue" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        
                        <h3 className="text-xl font-bold text-prixgen-blue group-hover:text-prixgen-lightblue transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 font-medium text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-prixgen-blue">
                            <User size={12} />
                          </div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{post.author?.name}</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-prixgen-blue/5 flex items-center justify-center text-prixgen-blue group-hover:bg-prixgen-blue group-hover:text-white transition-all overflow-hidden relative">
                          <ArrowRight size={14} className="relative z-10" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              ))
            ) : (
              !featuredPost && (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                  <h3 className="text-xl font-bold text-prixgen-blue mb-2">Architectural Reviews Pending</h3>
                  <p className="text-slate-500 font-medium">We are currently synthesizing our next batch of strategic industrial intelligence.</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Newsletter / Stay Informed */}
      <section className="py-10 lg:py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative bg-gradient-to-br from-prixgen-blue to-indigo-950 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-xl group"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center text-left">
              <FadeUp className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold text-xs uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-prixgen-lightblue rounded-full animate-pulse" />
                  Industrial Briefing
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
                  Stay ahead of the <span className="text-prixgen-lightblue italic">industrial curve.</span>
                </h2>
                <p className="text-base text-white/60 max-w-lg font-medium">
                  Get our quarterly executive review of Industry 5.0 shifts and architectural breakthroughs.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="max-w-md ml-auto bg-white/5 backdrop-blur-2xl p-6 lg:p-8 rounded-2xl border border-white/10 shadow-lg">
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Work Email</label>
                        <input 
                          type="email" 
                          placeholder="arvinth@prixgen.com" 
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-prixgen-lightblue focus:bg-white/20 transition-all"
                        />
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-white text-prixgen-blue rounded-xl font-black text-base shadow-lg hover:bg-prixgen-lightblue hover:text-white transition-all cursor-pointer"
                      >
                        Subscribe to Insights
                      </motion.button>
                      <p className="text-[9px] text-center text-white/30 font-bold uppercase tracking-widest">
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
