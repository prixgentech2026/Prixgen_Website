'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Clock, AlertTriangle, CheckCircle2, ShieldCheck, 
  Calendar, Layers, FileSpreadsheet, ArrowRight, Activity, 
  HelpCircle, ChevronDown, ChevronUp, Briefcase, Zap, 
  Sliders, Award, Sparkles, UserX, FileText, Ban
} from 'lucide-react';
import Link from 'next/link';

export function ERPCapacityRiskCanvas() {
  // Phase Simulator State
  const [activePhaseIndex, setActivePhaseIndex] = useState(1); // Solution Design by default

  // Diagnostic Checklist State (Array of boolean for 6 signals)
  const [checkedSignals, setCheckedSignals] = useState<boolean[]>([false, false, false, false, false, false]);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleSignal = (index: number) => {
    setCheckedSignals(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const activeSignalsCount = checkedSignals.filter(Boolean).length;

  const phases = [
    {
      name: "1. Scoping & Prep",
      duration: "Weeks 1–3",
      hoursNeeded: 8,
      hoursSpare: 7,
      riskLevel: "Low",
      statusColor: "emerald",
      focus: "Project charter, stakeholder mapping, initial data audit",
      impact: "Manageable baseline effort. Standard meetings fit into normal calendar."
    },
    {
      name: "2. Solution Design",
      duration: "Weeks 4–10",
      hoursNeeded: 24,
      hoursSpare: 6,
      riskLevel: "Critical Gap (-18h)",
      statusColor: "rose",
      focus: "Business process blueprints, custom logic sign-offs, edge-case definitions",
      impact: "Workshops demand process owners. If unattended, consultants make generic default assumptions that fail in production."
    },
    {
      name: "3. Build & Cleansing",
      duration: "Weeks 11–18",
      hoursNeeded: 14,
      hoursSpare: 6,
      riskLevel: "Moderate Gap (-8h)",
      statusColor: "amber",
      focus: "Master data scrubbing, BOM verification, chart of accounts mapping",
      impact: "Data quality requires operational owners. Postponed data cleansing leads to bad opening balances."
    },
    {
      name: "4. User Acceptance Testing",
      duration: "Weeks 19–24",
      hoursNeeded: 28,
      hoursSpare: 4,
      riskLevel: "Severe Danger Zone (-24h)",
      statusColor: "rose",
      focus: "End-to-end multi-department scenario simulation, reconciliation, boundary tests",
      impact: "Testing squeezed into late nights catches obvious flaws but misses costly multi-department accounting bugs."
    },
    {
      name: "5. Cutover & Go-Live",
      duration: "Weeks 25–27",
      hoursNeeded: 35,
      hoursSpare: 2,
      riskLevel: "Maximum Peak (-33h)",
      statusColor: "purple",
      focus: "Opening stock physical audit, live transaction migration, freeze period",
      impact: "Full-time dedication needed. Normal day job must be 80% backfilled or paused."
    },
    {
      name: "6. Hypercare & Adoption",
      duration: "Weeks 28–32",
      hoursNeeded: 12,
      hoursSpare: 6,
      riskLevel: "Stabilizing (-6h)",
      statusColor: "sky",
      focus: "First month-end close, exception handling, user coaching",
      impact: "Process owners guide floor staff, preventing retreat to shadow spreadsheets."
    }
  ];

  const signals = [
    {
      title: "Absent Process Owners",
      description: "The same senior department heads repeatedly cancel workshops or send junior delegates without sign-off authority.",
      rootCause: "Nobody has been released from daily firefighting or routine clerical tasks."
    },
    {
      title: "Slow Design Sign-offs",
      description: "Process blueprints and architecture specifications sit unapproved for 3+ weeks awaiting review.",
      rootCause: "Decision rights are ambiguous or owners are completely overloaded with operational duties."
    },
    {
      title: "Thin Test Evidence",
      description: "UAT sheets are rubber-stamped with only 3–5 happy-path test runs and zero real-world edge cases.",
      rootCause: "Testing was squeezed into late evenings after a 9-hour work day instead of blocked working hours."
    },
    {
      title: "Master Data Postponement",
      description: "Item masters, vendor records, and bill-of-materials cleansing gets pushed phase after phase.",
      rootCause: "No single internal leader owns data hygiene as a measured KPI in their role."
    },
    {
      title: "Clashing Enterprise Initiatives",
      description: "Statutory audits, GST reconciliations, plant expansions, or new product launches happening in the same quarter.",
      rootCause: "Key financial and operational experts have been double-booked across competing company goals."
    },
    {
      title: "Visible Change Fatigue",
      description: "Middle management and operators respond with visible frustration: 'What system are we supposed to use now?'",
      rootCause: "Too many procedural changes landing simultaneously on an exhausted workforce."
    }
  ];

  const frameworkSteps = [
    {
      num: "01",
      title: "Build a Capacity Map Upfront",
      summary: "Map project hours vs realistic availability for every key user on a single page.",
      details: "Estimate the exact hours required per role and phase (e.g. Finance Head: 18 hrs/wk in Month 2). Compare against actual spare capacity. The gaps become transparent, allowing the board to make resourcing choices before signing."
    },
    {
      num: "02",
      title: "Name Owners with Real Decision Rights",
      summary: "One single accountable owner per process stream with full sign-off autonomy.",
      details: "From Procure-to-Pay to Extrusion to Order-to-Cash, assign a single owner empowered to make definitive architectural calls. Consensus committees that escalate every toggle will paralyze implementation velocity."
    },
    {
      num: "03",
      title: "Free Up 30–50% Time via Backfill",
      summary: "Budget for temporary backfill and work offloading as legitimate project costs.",
      details: "During Blueprint and UAT phases, core owners need 30% to 50% of their working week. Offload routine reconciliation, assign temporary coordinators, or pause non-critical projects. If nothing is taken off their plate, the ERP will be."
    },
    {
      num: "04",
      title: "Sequence Around Business Peaks",
      summary: "Lock schedules away from March fiscal closing, GST filings, and peak seasonal demand.",
      details: "Never schedule Blueprint sign-offs or Cutover during year-end statutory audits or peak dispatch months. Moving a project kickoff by 3 weeks costs zero; rescuing a derailed go-live costs millions."
    },
    {
      num: "05",
      title: "Protect Testing in Normal Working Hours",
      summary: "Conduct UAT with dedicated calendar blocks, realistic data, and complex scenarios.",
      details: "Testing conducted after hours catches superficial UI glitches and misses multi-department ledger misalignments. Block 4-hour dedicated daytime sprints with real operational scenarios."
    },
    {
      num: "06",
      title: "Enforce Go / No-Go Capacity Gates",
      summary: "Before transitioning to the next phase, verify internal team availability.",
      details: "Leadership must ask one plain question before Design, Build, and Go-Live: 'Are our people genuinely ready and available for this next phase?' If not, phase the scope or pause. Starting with an unavailable team always finishes late."
    }
  ];

  const faqs = [
    {
      q: "How much time should our key users realistically commit to an ERP project?",
      a: "It varies by company size and scope, but during Solution Design and User Acceptance Testing (UAT), core process owners typically need to commit 30% to 50% of their working week (15 to 25 hours). Outside those peak phases, demand drops to 6–10 hours per week. The critical requirement is estimating it phase-by-phase and protecting that time on the calendar, rather than assuming it can simply be squeezed on top of a 50-hour day job."
    },
    {
      q: "Can we simply let the implementation partner make the business decisions?",
      a: "A top-tier partner like Prixgen will bring industry best practices, proven architectural patterns, and deep product mastery. However, the specific business rules—such as credit approval thresholds, scrap valuation logic, or commission formulas—must be owned by your business leaders. Decisions made without business buy-in are almost always rejected after go-live, which is the most expensive and disruptive time to rewrite them."
    },
    {
      q: "Is delaying an ERP project start ever the right strategic call?",
      a: "Yes, absolutely. If you cannot free up your primary process owners, or if a major statutory audit or plant expansion is consuming the same key personnel, delaying the start date by a few weeks or opting for a phased rollout (e.g. Finance & Inventory first, followed by Manufacturing) is far cheaper and more predictable than attempting to recover a stalled, compromised implementation later."
    },
    {
      q: "What is change fatigue, and how does capacity risk trigger it?",
      a: "Change fatigue is the cognitive and operational exhaustion teams experience when forced to absorb new software, procedural overhauls, and shifting KPIs while maintaining 100% daily output. Overworked teams stop engaging in design reviews, rush through testing, and inevitably retreat to shadow Excel spreadsheets once the vendor leaves, destroying the ROI of the software investment."
    }
  ];

  const currentPhase = phases[activePhaseIndex];

  return (
    <div className="space-y-16 selection:bg-[#004B87] selection:text-white">
      
      {/* 1. EXECUTIVE QUOTE BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#002B49] via-[#004B87] to-[#0A2540] p-8 md:p-10 text-white shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[#00D2FF] text-[10px] font-mono font-bold tracking-widest uppercase">
            <Clock className="w-3.5 h-3.5" /> THE MISSING LINE ITEM
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug">
            &ldquo;Every ERP proposal has a clean commercial quote: licences, consulting, data migration, support. What none of them have is a line that reads <span className="text-[#00D2FF] underline decoration-[#00D2FF]/40 underline-offset-4">&lsquo;Hours your own managers must give to this project.&rsquo;</span> Yet that missing line decides more ERP outcomes than any software feature.&rdquo;
          </h2>
          <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs text-slate-300 font-medium">
            <span>By <strong>Karthik S Hatti</strong>, Co-Founder & CBO, Prixgen Tech Solutions</span>
            <span className="hidden sm:inline-block font-mono text-[#00D2FF]">100+ Enterprise ERP Implementations</span>
          </div>
        </div>
      </div>

      {/* ORIGINAL DOCX SCENE 1: EXECUTIVE OFFICE */}
      <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
        <img 
          src="/images/blog/erp-capacity/scene_office.jpg" 
          alt="An ERP Is Built From Your Knowledge, Not Just Our Code - Prixgen Executive Advisory" 
          className="w-full h-auto object-cover"
        />
        <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
          Figure 1: An ERP is built from your knowledge, not just our code. The people who know how your business runs are the ones the project needs most.
        </figcaption>
      </figure>

      {/* 2. THE CORE PREMISE STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            stat: "30%–50%",
            label: "Time Required from Key Users",
            sub: "During Solution Design & UAT phases",
            color: "text-[#004B87]",
            bg: "bg-sky-50/80 border-sky-100"
          },
          {
            stat: "60%+",
            label: "ERP Delays Traced to Capacity",
            sub: "Overstretched managers unable to sign off",
            color: "text-amber-600",
            bg: "bg-amber-50/80 border-amber-100"
          },
          {
            stat: "-18 to -33 hrs",
            label: "Peak Weekly Capacity Deficit",
            sub: "When project lands on top of day jobs",
            color: "text-rose-600",
            bg: "bg-rose-50/80 border-rose-100"
          },
          {
            stat: "100%",
            label: "In-House Delivery at Prixgen",
            sub: "Full-time consultants, zero subcontracting",
            color: "text-[#00A3E0]",
            bg: "bg-slate-50 border-slate-200"
          }
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${item.bg} transition-all hover:shadow-md group`}>
            <div className={`text-3xl font-black ${item.color} tracking-tight mb-1 group-hover:scale-105 transition-transform duration-300`}>
              {item.stat}
            </div>
            <div className="text-xs font-bold text-slate-900 mb-1 leading-tight">{item.label}</div>
            <div className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* 3. INTERACTIVE CAPACITY GAP SIMULATOR */}
      <div className="space-y-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
              <Sliders className="w-4 h-4 text-[#00A3E0]" /> Interactive Project Phase Simulator
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Where the Internal Team Capacity Gap Opens Up
            </h3>
          </div>
          <div className="text-xs text-slate-500 font-medium max-w-xs">
            Click across project phases to see how workload spikes create hidden operational risks.
          </div>
        </div>

        {/* Phase Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {phases.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            const deficit = phase.hoursNeeded - phase.hoursSpare;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-[#004B87] text-white border-[#004B87] shadow-lg ring-2 ring-[#00A3E0]/40 -translate-y-0.5' 
                    : 'bg-white text-slate-700 border-slate-200/80 hover:border-[#00A3E0]/60 hover:bg-slate-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#004B87]'
                  }`}>
                    {phase.duration}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : deficit > 15 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                        : deficit > 0 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {deficit > 0 ? `-${deficit}h Deficit` : 'Balanced'}
                  </span>
                </div>

                <div className={`font-black text-sm md:text-base leading-snug ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-[#004B87]'}`}>
                  {phase.name}
                </div>

                <div className={`text-xs mt-2 flex items-center justify-between font-medium ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                  <span>Demanded: <strong className={isSelected ? 'text-white' : 'text-slate-900'}>{phase.hoursNeeded}h/wk</strong></span>
                  <span>Spare: <strong className={isSelected ? 'text-white' : 'text-slate-900'}>{phase.hoursSpare}h/wk</strong></span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Gap Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Active Phase Focus
              </span>
              <h4 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
                {currentPhase.name} • <span className="text-[#004B87] font-semibold">{currentPhase.focus}</span>
              </h4>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${
              currentPhase.hoursNeeded > 20 
                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                : currentPhase.hoursNeeded > 10 
                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              <AlertTriangle className="w-3.5 h-3.5" />
              {currentPhase.riskLevel}
            </div>
          </div>

          {/* Visual Hours Bar Comparison */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  ERP Project Hours Demanded:
                </span>
                <span className="font-mono text-rose-600">{currentPhase.hoursNeeded} hrs / week</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (currentPhase.hoursNeeded / 40) * 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Actual Spare Capacity (While Running Day Job):
                </span>
                <span className="font-mono text-emerald-600">{currentPhase.hoursSpare} hrs / week</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (currentPhase.hoursSpare / 40) * 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Business Impact Note */}
          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-[#004B87] text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold block mb-1">What Happens If Capacity Is Ignored:</strong>
            {currentPhase.impact}
          </div>
        </div>

        {/* Figure 3 Graphic from Docx */}
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <img 
            src="/images/blog/erp-capacity/03_capacity_gap.png" 
            alt="Figure 3: Demand on internal process owners peaks exactly when the business can least afford it" 
            className="w-full h-auto object-contain rounded-xl"
          />
          <figcaption className="mt-3 text-center text-xs text-slate-500 font-medium">
            Figure 3: Demand on internal process owners peaks exactly when the business can least afford it (Illustrative model: gold = demand exceeds realistic availability).
          </figcaption>
        </figure>
      </div>

      {/* 4. THE 5-STEP FAILURE CASCADE */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
            HOW CAPACITY BREAKS AN IMPLEMENTATION
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            The 5-Step Cascade: From Small Compromises to P&amp;L Defects
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Capacity problems never announce themselves loudly. They compound quietly through reasonable-sounding compromises until after go-live:
          </p>
        </div>

        {/* Figure 2 Graphic from Docx */}
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <img 
            src="/images/blog/erp-capacity/02_cascade.png" 
            alt="Figure 2: How an Overloaded Team Turns Into a Go-Live Problem" 
            className="w-full h-auto object-contain rounded-xl"
          />
          <figcaption className="mt-3 text-center text-xs text-slate-500 font-medium">
            Figure 2: Small compromises during the project become visible business problems after go-live.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {[
            {
              step: "01",
              title: "Workshops Lose Decision-Makers",
              desc: "Plant managers join for 15 mins; the finance head sends a junior. Needs are noted, but nobody with authority signs off.",
              icon: UserX,
              badge: "Month 1–2"
            },
            {
              step: "02",
              title: "Decisions Drift to Partner",
              desc: "When client teams can't decide, consultants make default choices. Good for a generic business, not for yours.",
              icon: Sliders,
              badge: "Month 2–3"
            },
            {
              step: "03",
              title: "Testing Squeezed to Nights",
              desc: "UAT is done as overtime on happy-path data. Complex edge cases, scrap logs, and GST returns are skipped.",
              icon: Clock,
              badge: "Month 4–5"
            },
            {
              step: "04",
              title: "Defects Hit the P&L",
              desc: "After go-live, problems land where leadership looks: delayed invoices, wrong stock valuations, and missed dispatches.",
              icon: AlertTriangle,
              badge: "Go-Live"
            },
            {
              step: "05",
              title: "Quiet Retreat to Excel",
              desc: "Users who didn't shape the software distrust it. Shadow spreadsheets return and ERP becomes an expensive data-entry tool.",
              icon: FileSpreadsheet,
              badge: "Month +1"
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-black text-[#004B87] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-2 leading-snug group-hover:text-[#004B87] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ORIGINAL DOCX SCENE 2: TEAM OVERLOAD */}
      <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
        <img 
          src="/images/blog/erp-capacity/scene_overload.jpg" 
          alt="Warning Signs Your Team Is Already Overcommitted" 
          className="w-full h-auto object-cover"
        />
        <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
          When the ERP project lands on top of a full day job, something has to give.
        </figcaption>
      </figure>

      {/* 5. INTERACTIVE 6-SIGNAL CAPACITY RISK DIAGNOSTIC */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#002B49] p-6 md:p-10 text-white shadow-xl space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D2FF] uppercase tracking-widest">
              <Activity className="w-4 h-4" /> Self-Assessment Tool
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Is Your Project Carrying Capacity Risk?
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Select any warning signals currently present in your enterprise. If 3 or more are active, your implementation requires immediate executive intervention.
            </p>
          </div>

          {/* Live Score Counter */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 flex items-center gap-4 shrink-0">
            <div className={`text-4xl font-black font-mono ${
              activeSignalsCount >= 3 ? 'text-rose-400' : activeSignalsCount > 0 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {activeSignalsCount}/6
            </div>
            <div className="text-xs">
              <div className="font-bold uppercase tracking-wider text-white">Risk Rating</div>
              <div className="text-slate-300">
                {activeSignalsCount >= 3 ? (
                  <span className="text-rose-300 font-bold">🚨 Critical Capacity Risk</span>
                ) : activeSignalsCount > 0 ? (
                  <span className="text-amber-300 font-bold">⚠️ Warning Level</span>
                ) : (
                  <span className="text-emerald-300 font-bold">✅ Healthy Capacity</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((sig, i) => {
            const isChecked = checkedSignals[i];
            return (
              <div
                key={i}
                onClick={() => toggleSignal(i)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all select-none flex flex-col justify-between ${
                  isChecked 
                    ? 'bg-rose-950/40 border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className={`text-sm font-bold leading-snug ${isChecked ? 'text-rose-200' : 'text-white'}`}>
                      {sig.title}
                    </h4>
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => {}} 
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {sig.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-sky-200/80 font-mono">
                  <strong>Root Cause:</strong> {sig.rootCause}
                </div>
              </div>
            );
          })}
        </div>

        {activeSignalsCount >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs text-rose-200 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                <strong>Action Needed:</strong> Your core team is overcommitted. Before entering the next phase, pause, sequence scope, or offload routine operational tasks.
              </span>
            </div>
            <a 
              href="mailto:karthik@prixgen.com?subject=ERP%20Capacity%20Readiness%20Assessment"
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold whitespace-nowrap transition-colors"
            >
              Get Expert Advisory
            </a>
          </motion.div>
        )}
      </div>

      {/* 6. THE PRIXGEN 6-STEP CAPACITY READINESS FRAMEWORK */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
            EXECUTIVE PLAYBOOK
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            The Prixgen Capacity Readiness Framework
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Across 100+ ERP deployments, projects that went live on time shared one habit: capacity was planned as rigorously as software architecture. We run these 6 checks with every client:
          </p>
        </div>

        {/* Figure 4 Graphic from Docx */}
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <img 
            src="/images/blog/erp-capacity/04_framework.png" 
            alt="Figure 4: The Prixgen Capacity Readiness Framework - Six checks to clear before the kickoff meeting" 
            className="w-full h-auto object-contain rounded-xl"
          />
          <figcaption className="mt-3 text-center text-xs text-slate-500 font-medium">
            Figure 4: Six checks to clear before an ERP project starts.
          </figcaption>
        </figure>

        {/* ORIGINAL DOCX SCENE 3: FACTORY & BACKFILL */}
        <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
          <img 
            src="/images/blog/erp-capacity/scene_factory.jpg" 
            alt="Free up time through backfill and offloading" 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            In manufacturing, the plant keeps running while the ERP is being built, so project time must be planned around production.
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworkSteps.map((step, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-[#004B87]">
                  {step.num}
                </span>
                <span className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-[#004B87] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <h4 className="text-base font-black text-slate-900 leading-snug">
                {step.title}
              </h4>
              <p className="text-xs font-semibold text-[#004B87]">
                {step.summary}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. WHAT LEADERSHIP SHOULD DO THIS QUARTER */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-[#00D2FF]" />
          <div>
            <h4 className="text-lg md:text-xl font-black text-white tracking-tight">
              What Leadership Should Do This Quarter
            </h4>
            <p className="text-xs text-slate-400">
              5 low-cost executive actions that dramatically improve ERP success odds:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="font-bold text-[#00D2FF]">1. Demand Internal Effort Estimates</div>
            <p className="text-slate-300 leading-relaxed">
              Ask your implementation partner to quote client-side hours by role and phase—not just their own consultant rates.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="font-bold text-[#00D2FF]">2. Cross-Check Annual Initiatives</div>
            <p className="text-slate-300 leading-relaxed">
              List every major corporate initiative planned for the next 12 months and verify which key people appear in more than one.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="font-bold text-[#00D2FF]">3. Formalise What to Stop</div>
            <p className="text-slate-300 leading-relaxed">
              Document in writing what your core process owners will delegate, postpone, or halt during Blueprint &amp; Testing.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="font-bold text-[#00D2FF]">4. Budget Backfill as Project Cost</div>
            <p className="text-slate-300 leading-relaxed">
              Treat temporary backfill salaries as legitimate project expenses, alongside software licences and partner fees.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <div className="font-bold text-[#00D2FF]">5. Align User Appraisals to Project</div>
            <p className="text-slate-300 leading-relaxed">
              Make ERP milestone delivery a formal part of key users&apos; annual review goals so project effort is rewarded, not squeezed.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-500/30 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="font-bold text-emerald-400">A Strategic Note on Phasing</div>
              <p className="text-slate-300 leading-relaxed">
                If capacity is tight, a phased rollout (Finance &amp; Inventory first, then Manufacturing) is far wiser than high-risk big-bang releases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. THE PRIXGEN ADVANTAGE BENTO BOX */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider">
            THE PRIXGEN COMMITMENT
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            How Prixgen Protects Clients from Capacity Risk
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#004B87] font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Internal Effort Upfront</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our proposals explicitly project expected client-side hours by department, so leadership can resource appropriately before signing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#004B87] font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">100% In-House Payroll</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never subcontract functional or technical delivery. Our dedicated consultants maintain accountability and team continuity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#004B87] font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Chartered Accountants In-House</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Qualified finance consultants shoulder complex tax, GST, and closing design, relieving pressure on your internal accounting teams.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#004B87] font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Readiness Gate Governance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every phase begins with an honest readiness checkpoint. We will advise a phased schedule whenever it protects the client&apos;s outcome.
            </p>
          </div>
        </div>
      </div>

      {/* 9. EXECUTIVE FAQ ACCORDION */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
            EXECUTIVE FAQS
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions on ERP Resourcing
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#004B87] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 10. BOTTOM CONSULTATION CTA BANNER */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#002B49] to-[#004B87] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            TALK TO PRIXGEN
          </span>
          <h4 className="text-xl md:text-2xl font-black text-white">
            Planning an Odoo, Business Central, or SAP Initiative?
          </h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Prixgen&apos;s senior enterprise consultants can help you run a Capacity Readiness Assessment before committing to budget and go-live dates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="mailto:karthik@prixgen.com?subject=ERP%20Capacity%20Readiness%20Assessment%20Inquiry"
            className="px-6 py-3 rounded-xl bg-[#00D2FF] text-[#002B49] hover:bg-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-cyan-500/20"
          >
            Email Karthik Hatti
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Book Assessment
          </Link>
        </div>
      </div>

    </div>
  );
}
