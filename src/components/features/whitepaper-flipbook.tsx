'use client';

import React, { useState, useEffect, useRef } from 'react';

interface WhitepaperFlipbookProps {
  onOpenDownloadModal?: () => void;
  className?: string;
}

export function WhitepaperFlipbook({ onOpenDownloadModal, className = '' }: WhitepaperFlipbookProps) {
  const [playCount, setPlayCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSettled, setIsSettled] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Trigger playback when component mounts or user requests replay
  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(false);
    setIsSettled(false);
    // Force clean DOM reset
    setTimeout(() => {
      setPlayCount((prev) => prev + 1);
      setIsPlaying(true);
    }, 40);
  };

  // Mark settled after 4.3s so the cover seamlessly locks into 100% native Retina crispness with zero overlap
  useEffect(() => {
    setIsSettled(false);
    const timer = setTimeout(() => {
      setIsSettled(true);
    }, 4300);
    return () => clearTimeout(timer);
  }, [playCount]);

  // IntersectionObserver to auto-play when scrolled into view
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            if (playCount === 1) {
              handleReplay();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center w-full select-none ${className}`} style={{ contain: 'layout' }}>
      {/* Embedded 3D CSS Animation Stylesheet */}
      <style>{`
        :root {
          --wp-hold-start: 0.6s;
          --wp-flip-duration: 1.0s;
          --wp-flip-stagger: 0.8s;
          --wp-cover-delay: 3.0s;
          --wp-cover-duration: 1.1s;
          --wp-total-duration: 4.4s;
          --wp-flip-ease: cubic-bezier(0.45, 0.05, 0.25, 1);
        }

        .wp-book-perspective {
          perspective: 1800px;
          perspective-origin: 50% 50%;
        }

        .wp-book-3d {
          transform-style: preserve-3d;
        }

        /* Continuous Stage Re-centering during flip */
        .wp-book-animating {
          animation: wpBookMotion var(--wp-total-duration) cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes wpBookMotion {
          0%, 65% {
            transform: translateX(0px) rotateX(4deg) rotateY(-2deg);
          }
          82%, 100% {
            transform: translateX(-165px) rotateX(3deg) rotateY(1deg);
          }
        }

        /* Base Left Page: Hides swiftly as the cover lifts (at 3.0s) so nothing peeks out */
        .wp-left-page-animating {
          animation: wpLeftPageFade var(--wp-total-duration) ease forwards;
        }

        @keyframes wpLeftPageFade {
          0%, 66% {
            opacity: 1;
            visibility: visible;
          }
          72%, 100% {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
        }

        /* Spine Crease: Fades out cleanly when closed */
        .wp-spine-animating {
          animation: wpSpineFade var(--wp-total-duration) cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes wpSpineFade {
          0%, 68% {
            opacity: 1;
          }
          78%, 100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* Shadow Morphing from Wide Spread to Single Closed Book */
        .wp-shadow-animating {
          animation: wpShadowMotion var(--wp-total-duration) cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes wpShadowMotion {
          0%, 65% {
            width: 660px;
            left: 0px;
            opacity: 0.45;
          }
          82%, 100% {
            width: 330px;
            left: 330px;
            opacity: 0.65;
            filter: blur(18px);
          }
        }

        /* Leaf 3D Physics (Rotate, translateZ lift, rotateX/skewY curl) */
        @keyframes wpLeafFlip {
          0% {
            transform: rotateY(0deg) translateZ(0px) rotateX(0deg) skewY(0deg);
          }
          30% {
            transform: rotateY(55deg) translateZ(32px) rotateX(3.5deg) skewY(-2.5deg);
          }
          50% {
            transform: rotateY(90deg) translateZ(42px) rotateX(4.5deg) skewY(-3.5deg);
          }
          70% {
            transform: rotateY(135deg) translateZ(30px) rotateX(2.5deg) skewY(-2deg);
          }
          100% {
            transform: rotateY(180deg) translateZ(0px) rotateX(0deg) skewY(0deg);
          }
        }

        @keyframes wpLeafShade {
          0%, 100% { opacity: 0; }
          45%, 55% { opacity: 0.35; }
        }

        /* Leaf 1: Starts at 0.6s */
        .wp-leaf-1-anim {
          animation: wpLeafFlip var(--wp-flip-duration) var(--wp-flip-ease) var(--wp-hold-start) forwards;
        }
        .wp-leaf-1-anim .wp-leaf-shade {
          animation: wpLeafShade var(--wp-flip-duration) var(--wp-flip-ease) var(--wp-hold-start) forwards;
        }

        /* Leaf 2: Starts at 1.4s */
        .wp-leaf-2-anim {
          animation: wpLeafFlip var(--wp-flip-duration) var(--wp-flip-ease) calc(var(--wp-hold-start) + var(--wp-flip-stagger)) forwards;
        }
        .wp-leaf-2-anim .wp-leaf-shade {
          animation: wpLeafShade var(--wp-flip-duration) var(--wp-flip-ease) calc(var(--wp-hold-start) + var(--wp-flip-stagger)) forwards;
        }

        /* Leaf 3: Starts at 2.2s */
        .wp-leaf-3-anim {
          animation: wpLeafFlip var(--wp-flip-duration) var(--wp-flip-ease) calc(var(--wp-hold-start) + (var(--wp-flip-stagger) * 2)) forwards;
        }
        .wp-leaf-3-anim .wp-leaf-shade {
          animation: wpLeafShade var(--wp-flip-duration) var(--wp-flip-ease) calc(var(--wp-hold-start) + (var(--wp-flip-stagger) * 2)) forwards;
        }

        /* Front Cover Closing: Starts at 3.0s */
        @keyframes wpCoverClose {
          0% {
            transform: rotateY(0deg) translateZ(0px) rotateX(0deg);
          }
          35% {
            transform: rotateY(60deg) translateZ(35px) rotateX(3deg);
          }
          50% {
            transform: rotateY(95deg) translateZ(48px) rotateX(3.5deg);
          }
          75% {
            transform: rotateY(145deg) translateZ(28px) rotateX(1.8deg);
          }
          100% {
            transform: rotateY(180deg) translateZ(0px) rotateX(0deg);
          }
        }

        .wp-cover-anim {
          animation: wpCoverClose var(--wp-cover-duration) var(--wp-flip-ease) var(--wp-cover-delay) forwards;
        }

        .crisp-book-image {
          image-rendering: auto;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transform: translateZ(0);
        }
      `}</style>

      {/* 1000x600 Stage Container (Transparent Background) */}
      <div
        ref={stageRef}
        key={playCount}
        onClick={() => handleReplay()}
        className="wp-book-perspective relative w-full max-w-[900px] aspect-[1000/600] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
        title="Click to replay 4.5s page-flip animation"
      >
        {/* =========================================================================
            STATE 1: SETTLED RAZOR-SHARP COVER (Zero Blur, Zero Overlap, 100% Crisp)
            ========================================================================= */}
        {isSettled ? (
          <div className="relative w-[340px] h-[470px] flex items-center justify-center">
            {/* High-Definition Natural Drop Shadow */}
            <div 
              className="absolute inset-0 top-[20px] -bottom-[12px] rounded-r-2xl rounded-l-md pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(0, 0, 0, 0.45) 0%, rgba(0,0,0,0.12) 60%, transparent 75%)',
                filter: 'blur(16px)'
              }}
            />

            {/* Pristine Book Hardcover Card */}
            <div
              className="relative w-full h-full bg-white rounded-r-[14px] rounded-l-[3px] overflow-hidden shadow-[0_22px_50px_rgba(0,0,0,0.28),0_4px_14px_rgba(0,0,0,0.14)] border border-slate-200/90 select-none"
              style={{
                transform: 'rotateX(2deg) rotateY(1deg)',
                transformStyle: 'flat'
              }}
            >
              {/* Left Spine Book Crease with 3D Depth Highlight */}
              <div
                className="absolute left-0 top-0 bottom-0 w-3.5 z-30 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.06) 50%, rgba(255,255,255,0.25) 80%, rgba(0,0,0,0.02) 100%)'
                }}
              />

              {/* Multi-Page Stack Thickness Hint on Right Edge */}
              <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-slate-200 to-slate-300 border-l border-slate-300/80 z-30 pointer-events-none" />

              {/* 100% Crisp Native Resolution Cover Image */}
              <img
                src="/images/pvc/whitepaper_cover.png"
                alt="From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers"
                className="crisp-book-image w-full h-full object-fill rounded-r-[13px]"
                loading="eager"
              />
            </div>
          </div>
        ) : (
          /* =========================================================================
              STATE 2: 3D BOOK FLIPPING ANIMATION (0.0s - 4.3s)
              ========================================================================= */
          <div
            className={`wp-book-3d relative w-[660px] h-[450px] z-10 ${
              isPlaying ? 'wp-book-animating' : ''
            }`}
          >
            {/* Morphing drop shadow */}
            <div
              className={`absolute inset-0 top-[25px] rounded-[30px] filter pointer-events-none -z-10 ${
                isPlaying ? 'wp-shadow-animating' : 'w-[660px] left-0 opacity-45 blur-xl'
              }`}
              style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 70%)' }}
            />

            {/* Center Spine Crease (Fades when closed) */}
            <div
              className={`absolute left-[330px] top-0 bottom-0 w-6 -translate-x-1/2 z-30 pointer-events-none ${isPlaying ? 'wp-spine-animating' : ''}`}
              style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.14) 100%)' }}
            />

            {/* -------------------------------------------------------------
                1. BASE LEFT SPREAD (Figure 12 Bar Charts - Page 10)
                ------------------------------------------------------------- */}
            <div className={`absolute left-0 top-0 w-[330px] h-[450px] bg-white rounded-l-lg border border-r-0 border-slate-300 p-6 flex flex-col justify-between overflow-hidden shadow-inner z-[2] ${isPlaying ? 'wp-left-page-animating' : ''}`}>
              <div>
                <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-400 font-bold border-b border-slate-100 pb-1 mb-2">
                  <span>FIGURE 12</span>
                  <span>PAGE 10</span>
                </div>
                <h4 className="text-[11px] font-bold text-slate-900 leading-snug mb-2">
                  Which of the following have had the biggest impact on your organization&apos;s transformation successes?
                </h4>
                <div className="flex gap-2 text-[8px] font-bold text-slate-500 mb-2">
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#002B49]" /> Beginner</span>
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#0072CE]" /> Intermediate</span>
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" /> Advanced</span>
                  <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#76E042]" /> Leader</span>
                </div>
                {/* Stacked Bars */}
                <div className="space-y-2 text-[8px]">
                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5 font-medium"><span>Data-driven decision making</span><span className="font-mono font-bold">100%</span></div>
                    <div className="w-full bg-slate-100 h-2.5 rounded flex overflow-hidden border border-slate-200">
                      <div className="bg-[#002B49] h-full w-1/4" />
                      <div className="bg-[#0072CE] h-full w-1/4" />
                      <div className="bg-[#00A3E0] h-full w-1/4" />
                      <div className="bg-[#76E042] h-full w-1/4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5 font-medium"><span>Continuous optimization mindset</span><span className="font-mono font-bold">100%</span></div>
                    <div className="w-full bg-slate-100 h-2.5 rounded flex overflow-hidden border border-slate-200">
                      <div className="bg-[#002B49] h-full w-1/5" />
                      <div className="bg-[#0072CE] h-full w-[28%]" />
                      <div className="bg-[#00A3E0] h-full w-[27%]" />
                      <div className="bg-[#76E042] h-full w-1/4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5 font-medium"><span>Dedicated change team</span><span className="font-mono font-bold">38%</span></div>
                    <div className="w-full bg-slate-100 h-2.5 rounded flex overflow-hidden border border-slate-200">
                      <div className="bg-[#0072CE] h-full w-[38%]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[8px] font-mono text-slate-400 flex justify-between">
                <span>THE CAPABILITY MINDSET</span>
                <span>10</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                2. BASE RIGHT SPREAD (Figure 13 Impact Metrics - Page 11)
                ------------------------------------------------------------- */}
            <div className="absolute left-[330px] top-0 w-[330px] h-[450px] bg-white rounded-r-lg border border-l-0 border-slate-300 p-6 flex flex-col justify-between overflow-hidden shadow-inner z-[2]">
              <div>
                <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-400 font-bold border-b border-slate-100 pb-1 mb-2">
                  <span>FIGURE 13</span>
                  <span>PAGE 11</span>
                </div>
                <div className="text-[9px] font-mono font-bold text-[#004B87] uppercase mb-1">
                  ACCELERATE WHAT MATTERS
                </div>
                <h4 className="text-[10.5px] font-bold text-slate-900 leading-tight mb-2">
                  If your transformation projects continue to succeed, what impact would each result have?
                </h4>
                <div className="space-y-1.5 text-[8px]">
                  <div className="p-1.5 rounded bg-slate-50 border border-slate-200">
                    <div className="text-slate-800 font-medium">90% user adoption within 90 days</div>
                    <div className="flex gap-1 mt-1 font-bold">
                      <span className="bg-[#004B87] text-white px-1.5 py-0.2 rounded">6% High</span>
                      <span className="bg-[#00A3E0] text-slate-950 px-1.5 py-0.2 rounded">28% Exceptional</span>
                    </div>
                  </div>
                  <div className="p-1.5 rounded bg-slate-50 border border-slate-200">
                    <div className="text-slate-800 font-medium">&gt;80% common enterprise data models</div>
                    <div className="flex gap-1 mt-1 font-bold">
                      <span className="bg-[#004B87] text-white px-1.5 py-0.2 rounded">30% High</span>
                      <span className="bg-[#00A3E0] text-slate-950 px-1.5 py-0.2 rounded">21% Exceptional</span>
                    </div>
                  </div>
                  <div className="p-1.5 rounded bg-slate-50 border border-slate-200">
                    <div className="text-slate-800 font-medium">25% employee productivity boost</div>
                    <div className="flex gap-1 mt-1 font-bold">
                      <span className="bg-[#004B87] text-white px-1.5 py-0.2 rounded">41% High</span>
                      <span className="bg-[#00A3E0] text-slate-950 px-1.5 py-0.2 rounded">25% Exceptional</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[8px] font-mono text-slate-400 flex justify-between">
                <span>RESEARCH SURVEY [N=414]</span>
                <span>11</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                3. FLIPPING LEAF 1 (Dark Green Key Findings Page 08 / Diagnostic Page 07)
                ------------------------------------------------------------- */}
            <div
              className={`wp-book-3d absolute left-0 top-0 w-[330px] h-[450px] z-10 ${isPlaying ? 'wp-leaf-1-anim' : ''}`}
              style={{ transformOrigin: 'right center', willChange: 'transform' }}
            >
              {/* Front Face: Dark Green Key Findings (Page 08) */}
              <div
                className="absolute inset-0 bg-[#0A2E1F] text-white rounded-l-lg p-6 flex flex-col justify-between overflow-hidden shadow-md"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="wp-leaf-shade absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/70 pointer-events-none" />
                <div>
                  <div className="text-[9px] font-mono font-bold text-[#76E042] tracking-wider uppercase mb-1">
                    EXECUTIVE SUMMARY
                  </div>
                  <h3 className="text-sm font-extrabold text-white mb-2">Key Findings</h3>
                  <div className="space-y-2 text-[8.5px] text-emerald-100 leading-snug">
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#76E042] font-bold">•</span>
                      <span><strong>Visibility vs. Capacity:</strong> Data visibility consistently outperforms pure machine capacity expansion.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#76E042] font-bold">•</span>
                      <span><strong>Recipe Precision:</strong> Continuous recipe locking eliminates 2-4% costly polymer over-give.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-[#76E042] font-bold">•</span>
                      <span><strong>Audit Speed:</strong> 10-link lot serialization reduces recall isolation from 3 days to under 3 minutes.</span>
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-900/80 text-[8px] font-mono text-[#76E042] flex justify-between">
                  <span>SECTION 04 // SYNTHESIS</span>
                  <span>PAGE 08</span>
                </div>
              </div>

              {/* Back Face: Operational Audit & Seven Fault Lines (Page 07) */}
              <div
                className="absolute inset-0 bg-white rounded-r-lg p-6 flex flex-col justify-between overflow-hidden shadow-md border border-l-0 border-slate-300"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="wp-leaf-shade absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
                <div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 font-bold border-b border-slate-100 pb-1 mb-2">
                    <span>SECTION 03 // DIAGNOSTIC</span>
                    <span>PAGE 07</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A] mb-2">Seven Operational Fault Lines</h4>
                  <div className="space-y-1.5 text-[8px]">
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">01. Demand Volatility & Material Gaps</div>
                      <div className="text-slate-600">Uncoordinated resin silo purchasing at volatile spot rates.</div>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">02. Unmodelled Changeover Scrap</div>
                      <div className="text-slate-600">Shooting waste quietly absorbed into general plant COGS.</div>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">03. Disconnected Quality Gates</div>
                      <div className="text-slate-600">Paper hydrostatic test sheets missing from lot serialization.</div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[8px] font-mono text-slate-400 flex justify-between">
                  <span>OPERATIONAL AUDIT</span>
                  <span>07</span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                4. FLIPPING LEAF 2 (Table of Contents Page 04 / Executive Preface Page 03)
                ------------------------------------------------------------- */}
            <div
              className={`wp-book-3d absolute left-0 top-0 w-[330px] h-[450px] z-11 ${isPlaying ? 'wp-leaf-2-anim' : ''}`}
              style={{ transformOrigin: 'right center', willChange: 'transform' }}
            >
              {/* Front Face: Table of Contents (Page 04) */}
              <div
                className="absolute inset-0 bg-white rounded-l-lg p-6 flex flex-col justify-between overflow-hidden shadow-md border border-r-0 border-slate-300"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="wp-leaf-shade absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/70 pointer-events-none" />
                <div>
                  <div className="text-[9px] font-mono font-bold text-[#004B87] uppercase mb-1">OUTLINE</div>
                  <h3 className="text-xs font-extrabold text-slate-900 mb-2.5">Table of Contents</h3>
                  <div className="space-y-1.5 text-[8.5px] text-slate-700 font-mono">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-semibold text-slate-800">01. One Value Chain, Six Silos</span>
                      <span className="text-[#004B87] font-bold">p. 04</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-semibold text-slate-800">02. Five Structural Industry Shifts</span>
                      <span className="text-[#004B87] font-bold">p. 06</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-semibold text-slate-800">03. 10-Step Extrusion Operating Flow</span>
                      <span className="text-[#004B87] font-bold">p. 08</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-semibold text-slate-800">04. 10-Link Traceability Architecture</span>
                      <span className="text-[#004B87] font-bold">p. 10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-800">05. Implementation Lessons from 10+ Plants</span>
                      <span className="text-[#004B87] font-bold">p. 12</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[8px] font-mono text-slate-400 flex justify-between">
                  <span>TABLE OF CONTENTS</span>
                  <span>04</span>
                </div>
              </div>

              {/* Back Face: Executive Preface (Page 03) */}
              <div
                className="absolute inset-0 bg-white rounded-r-lg p-6 flex flex-col justify-between overflow-hidden shadow-md border border-l-0 border-slate-300"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="wp-leaf-shade absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
                <div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 font-bold border-b border-slate-100 pb-1 mb-2">
                    <span>EXECUTIVE PREFACE</span>
                    <span>PAGE 03</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-900 mb-1.5">From Polymer to Pipe: Building Connected Control</h4>
                  <div className="p-2 bg-sky-50/80 rounded border-l-2 border-[#004B87] text-[8px] text-slate-700 italic leading-snug mb-2">
                    &ldquo;The future of plastics manufacturing is not automated production alone. It is connected decision-making across the entire value chain.&rdquo;
                  </div>
                  <p className="text-[8px] text-slate-600 leading-relaxed">
                    Walk through any PVC pipe plant and physical flow is easy to follow from resin silo to dispatch. But information flow is fragmented across six operational silos. What we have learned implementing ERP for more than 10 polymer manufacturers is that competitive advantage comes from real-time visibility.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[8px] font-mono text-slate-400 flex justify-between">
                  <span>BY KARTHIK S HATTI, CBO</span>
                  <span>03</span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                5. FLIPPING LEAF 3 (Pillars Page 02 / Title Page 01)
                ------------------------------------------------------------- */}
            <div
              className={`wp-book-3d absolute left-0 top-0 w-[330px] h-[450px] z-12 ${isPlaying ? 'wp-leaf-3-anim' : ''}`}
              style={{ transformOrigin: 'right center', willChange: 'transform' }}
            >
              {/* Front Face: Six Pillars Architecture (Page 02) */}
              <div
                className="absolute inset-0 bg-slate-50 rounded-l-lg p-6 flex flex-col justify-between overflow-hidden shadow-md border border-r-0 border-slate-300"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="wp-leaf-shade absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/70 pointer-events-none" />
                <div>
                  <div className="text-[9px] font-mono font-bold text-[#004B87] uppercase mb-1">ARCHITECTURE</div>
                  <h3 className="text-xs font-bold text-slate-900 mb-2">Six Enterprise Pillars</h3>
                  <div className="grid grid-cols-2 gap-1.5 text-[7.5px]">
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">1. Inward Weighbridge</div>
                      <div className="text-slate-500">Gross/tare silo sync</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">2. PLC Recipe Lock</div>
                      <div className="text-slate-500">Automated chemical dosing</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">3. Extrusion IIoT</div>
                      <div className="text-slate-500">Thermal profile sync</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">4. SPC Quality Gate</div>
                      <div className="text-slate-500">Hydrostatic burst log</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">5. Yard Barcoding</div>
                      <div className="text-slate-500">5-dimension lot tag</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-bold text-[#004B87]">6. Real-Time Costing</div>
                      <div className="text-slate-500">Resin price indexing</div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[8px] font-mono text-slate-400 flex justify-between">
                  <span>SYSTEM ARCHITECTURE</span>
                  <span>02</span>
                </div>
              </div>

              {/* Back Face: Title & Metadata Page (Page 01) */}
              <div
                className="absolute inset-0 bg-white rounded-r-lg p-6 flex flex-col justify-between overflow-hidden shadow-md border border-l-0 border-slate-300"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="wp-leaf-shade absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
                <div>
                  <div className="text-[8.5px] font-mono font-bold text-[#004B87] uppercase tracking-wider mb-2">
                    PRIXGEN RESEARCH • 2026
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight mb-2">
                    The Capability Mindset: Turning Business Transformation Into A Repeatable Discipline
                  </h3>
                  <p className="text-[8px] text-slate-500 leading-relaxed mb-3">
                    A comprehensive operating framework for PVC, HDPE, and polymer manufacturing enterprises.
                  </p>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[8px] space-y-1 text-slate-600">
                    <div><strong>Published:</strong> Prixgen Enterprise Research</div>
                    <div><strong>Author:</strong> Karthik S Hatti, Co-Founder & CBO</div>
                    <div><strong>Document Ref:</strong> PX-PVC-WP-2026</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[8px] font-mono text-slate-400 flex justify-between">
                  <span>PRIXGEN WHITE PAPER</span>
                  <span>01</span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                6. FRONT COVER (Starts at 3.0s, duration 1.1s, settles & holds)
                ------------------------------------------------------------- */}
            <div
              className={`wp-book-3d absolute left-0 top-0 w-[330px] h-[450px] z-20 ${
                isPlaying ? 'wp-cover-anim' : ''
              }`}
              style={{ transformOrigin: 'right center' }}
            >
              {/* Inside Cover Face */}
              <div
                className="absolute inset-0 bg-slate-100 border border-slate-300 rounded-l-lg p-6 flex flex-col justify-between"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-[8px] font-mono text-slate-400">INSIDE COVER • ENDPAPER</div>
                <div className="text-[9px] font-mono text-slate-500 text-center">
                  PRIXGEN ENTERPRISE SYSTEMS • BANGALORE
                </div>
              </div>

              {/* Outside Face: Cover Art */}
              <div
                className="absolute inset-0 bg-white rounded-r-[14px] overflow-hidden shadow-2xl border border-l-0 border-slate-300"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55), inset 6px 0 12px rgba(0,0,0,0.22)',
                }}
              >
                {/* Left Spine Shadow Strip */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-3.5 z-30 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 100%)' }}
                />

                {/* Exact Landing Page Cover Image */}
                <img
                  src="/images/pvc/whitepaper_cover.png"
                  alt="From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers"
                  className="crisp-book-image w-full h-full object-fill rounded-r-[13px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
