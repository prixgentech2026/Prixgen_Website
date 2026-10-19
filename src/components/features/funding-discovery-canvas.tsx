'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Layers, 
  Coins, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Users, 
  Network, 
  Globe2, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Clock, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronRight, 
  Briefcase, 
  Scale, 
  Rocket, 
  PieChart, 
  Split, 
  UserCheck, 
  CalendarClock, 
  FileCheck2, 
  Tags, 
  Eye, 
  Send,
  HelpCircle,
  X
} from 'lucide-react';
import { LeadCaptureForm } from './lead-capture-form';

export function FundingDiscoveryCanvas() {
  // Tranche Simulator State
  const [trancheMode, setTrancheMode] = useState<'tranche2' | 'tranche3'>('tranche2');
  const [customRequestAmount, setCustomRequestAmount] = useState<number>(12000);
  
  // Traceability Chain Active Step
  const [activeStep, setActiveStep] = useState<number>(7); // Step 8: PR-0417 Request

  // Stakeholder Matrix Active Lens
  const [activeStakeholder, setActiveStakeholder] = useState<'funder' | 'director' | 'regulator' | 'startups' | 'finance'>('director');

  // Global Rulebook Active Region
  const [activeRegion, setActiveRegion] = useState<'us' | 'eu' | 'asia' | 'gcc'>('us');

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Challenge Matrix Active Filter
  const [challengeFilter, setChallengeFilter] = useState<'all' | 'funds' | 'people' | 'compliance'>('all');

  // Contact Form Modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Financial calculations based on tranche mode
  const totalAward = 500000;
  const receivedToDate = trancheMode === 'tranche2' ? 50000 : 85000; // Tranche 3 adds +$35,000
  const spent = 32000;
  const committed = 8000;
  const availableToCommit = receivedToDate - spent - committed; // $10,000 or $45,000
  const isBudgetApproved = customRequestAmount <= availableToCommit;
  const budgetShortfall = Math.max(0, customRequestAmount - availableToCommit);

  const chainSteps = [
    { id: 1, label: "Funder", category: "grant", title: "Federal & Foundation Sponsors", desc: "Award charter establishing terms, restricted funding conditions, and milestone schedules." },
    { id: 2, label: "Agreement", category: "grant", title: "Grant Agreement #GR-9042", desc: "120 discrete legal agreements running simultaneously, each with distinct cost eligibility definitions." },
    { id: 3, label: "Tranche", category: "grant", title: "Disbursement Tranches", desc: "Awarded != Received. Funds unlocked in quarterly tranches ($50k received in tranches 1 & 2; $35k in tranche 3)." },
    { id: 4, label: "Program", category: "grant", title: "Coastal Resilience Initiative", desc: "High-level academic program governing multiple multidisciplinary field projects." },
    { id: 5, label: "Project", category: "grant", title: "RiverSense Telemetry", desc: "Environmental monitoring venture led by research fellows with startup co-founders." },
    { id: 6, label: "Work Package", category: "grant", title: "WP-04 Sensor Calibration", desc: "Specific sub-project package for real-time hydrological sensor calibration." },
    { id: 7, label: "Budget Line", category: "grant", title: "Direct Equipment Account", desc: "Approved budget line dedicated to precision lab & testing instrumentation." },
    { id: 8, label: "Request", category: "execution", title: "PR-0417 ($12,000)", desc: "Scientist requisition for specialized calibration sensor needed for validation." },
    { id: 9, label: "Order", category: "execution", title: "PO-8819 Released", desc: "Automated budget check confirms cash in hand before purchasing issues order to vendor." },
    { id: 10, label: "Receipt", category: "execution", title: "Dock Intake & QA", desc: "Physical receipt and scientific calibration verification at Boston intake facility." },
    { id: 11, label: "Asset", category: "execution", title: "Asset Tag #AST-4412", desc: "Permanent serialized tag mapped to grant compliance and depreciation registers." },
    { id: 12, label: "Bill", category: "execution", title: "3-Way Invoice Match", desc: "System matches Vendor Invoice with PO and Receiving Slip, verifying analytic accounting." },
    { id: 13, label: "Payment", category: "execution", title: "Bank Disbursement", desc: "Treasury releases payment with automated GL entry back to original funding source." }
  ];

  const stakeholders = {
    funder: {
      role: "Public & Private Funder",
      badge: "Sponsorship & Accountability",
      question: "Where did my money go? Which milestones are met?",
      needs: "Disbursed vs. eligible spend, verifiable milestone deliverables, remaining cash balances.",
      realityWithoutPrixgen: "Receives quarterly retrospective spreadsheets 6 weeks late. Discrepancies lead to funding holdbacks on future tranches.",
      solutionWithPrixgen: "Live funder portal shows exact drawdown against milestone completion, with every invoice pre-validated for eligibility.",
      keyMetric: "100% audit-ready milestone reporting"
    },
    director: {
      role: "Program Director",
      badge: "Operational Leadership",
      question: "What is committed? Who can I hire? Which project is at risk?",
      needs: "Real-time commitments, multi-year staffing forecasts against award end dates, cross-project variance tracking.",
      realityWithoutPrixgen: "Blindsided when a purchase order is declined by finance while field engineers are already on site waiting.",
      solutionWithPrixgen: "Unified dashboard showing committed orders, available cash, and staffing burns across all 24 programs.",
      keyMetric: "Zero unexpected procurement stalls"
    },
    regulator: {
      role: "Government & Regulatory Auditor",
      badge: "Compliance & Governance",
      question: "Was every cost eligible? Where is the complete audit trail?",
      needs: "Cost eligibility by grant agreement, electronic approval chains, timestamped modification logs.",
      realityWithoutPrixgen: "Sampling 50 transactions requires 3 weeks of hunting through emails, paper receipts, and Dropbox folders.",
      solutionWithPrixgen: "One-click audit trail from the bank statement line down to the serial-tagged instrument on the lab bench.",
      keyMetric: "Sub-second traceability provenance"
    },
    startups: {
      role: "Incubated Startups (Cornea Cohort)",
      badge: "Venture Enablement",
      question: "What support is ours? What do we owe the incubator?",
      needs: "Clear agreement parameters, shared facility access, equipment logs, IP covenants, and tranche disbursements.",
      realityWithoutPrixgen: "Founders waste weeks arguing over shared equipment timesheets or whether travel was covered by their stipend.",
      solutionWithPrixgen: "Dedicated startup portal with clear allocation ledger: support received, milestone obligations, and zero billing ambiguity.",
      keyMetric: "Clean legal separation for 240 startups"
    },
    finance: {
      role: "CFO & Finance Leadership",
      badge: "Treasury & Trust Stewardship",
      question: "What is restricted? What can we legally commit today?",
      needs: "Restricted vs. unrestricted fund separation, awarded vs. received cash position, treasury liquidity exposure.",
      realityWithoutPrixgen: "Forced to rely on 14 separate spreadsheets that contradict each other. Constant fear of co-mingling restricted grants.",
      solutionWithPrixgen: "Hard system enforcement: restricted awards can never be co-mingled. Commitments strictly capped by verified cash in bank.",
      keyMetric: "Strict non-co-mingling fund isolation"
    }
  };

  const regions = {
    us: {
      name: "United States",
      flag: "🇺🇸",
      fundingMix: "Federal (NSF, NIH, DOE) and state research awards, private foundations, corporate sponsors, university partners.",
      rulebook: "Uniform Guidance (2 CFR 200), strict cost eligibility, F&A indirect-cost allocation, federal letter-of-credit drawdowns, and quarterly progress reporting."
    },
    eu: {
      name: "Europe",
      flag: "🇪🇺",
      fundingMix: "EU Framework Programmes (Horizon Europe), national innovation funds, university consortia, private scientific trusts.",
      rulebook: "Multi-partner consortia agreements, personnel unit-cost audits, strict timesheet mandates, complex cross-border VAT treatment, and milestone payment schedules."
    },
    asia: {
      name: "East Asia",
      flag: "🌏",
      fundingMix: "Government-backed science parks, statutory innovation authorities, university tech transfer offices, corporate VC partners.",
      rulebook: "Milestone-verified tranche releases, multi-entity holding models, multi-currency operations (USD, JPY, SGD, HKD), and localized statutory accounting."
    },
    gcc: {
      name: "GCC & Middle East",
      flag: "🌍",
      fundingMix: "National innovation programmes, sovereign-backed development funds, research foundations, enterprise partnerships.",
      rulebook: "Programme-level strategic governance, bilingual English-Arabic audit documentation, VAT compliance, multi-currency ledgers, and fast-track incubator grants."
    }
  };

  const operationalChallenges = [
    {
      id: "funds-awarded",
      category: "funds",
      challenge: "Awarded money treated as available",
      conventional: "Teams commit against the $500,000 top-line award. When orders hit the bank, cash bounces because only $50,000 has arrived.",
      solution: "Prixgen configures pre-commitment budget checks against funds actually received in bank. Over-commitments are hard-blocked with reason displayed on screen."
    },
    {
      id: "tranche-blind",
      category: "funds",
      challenge: "Tranche arrives, nobody knows",
      conventional: "A $35,000 deposit sits unallocated in the bank statement for 12 days while scientists wait and project milestones drift.",
      solution: "Automated bank reconciliation matches incoming deposits directly to grant agreements. Available balance unlocks instantly across all departments."
    },
    {
      id: "split-bills",
      category: "compliance",
      challenge: "One invoice, two work packages",
      conventional: "Invoices are manually dumped into whichever grant has cash, triggering audit penalties and ineligible cost write-offs.",
      solution: "Analytic accounting distributions cleanly split single vendor bills across multiple work packages with complete approval history."
    },
    {
      id: "external-faculty",
      category: "people",
      challenge: "Shared researchers on external payroll",
      conventional: "Researchers employed by universities work across 3 grants (40%/30%/30%). Counting them as employees corrupts payroll and tax filings.",
      solution: "Effort recorded on project timesheets and costed directly to eligible funding lines without ever placing external staff on the center's payroll."
    },
    {
      id: "expiring-grants",
      category: "people",
      challenge: "Hiring against an expiring award",
      conventional: "A team hires research fellows on 18-month contracts when only 8 months remain on the grant, leaving a disastrous unfunded liability.",
      solution: "Staffing forecasts compare headcount costs month-by-month against eligible funding curves through the exact award sunset date."
    },
    {
      id: "grant-extensions",
      category: "compliance",
      challenge: "Grant term extensions & amendments",
      conventional: "Informal promises from sponsors lead teams to spend past the project deadline, resulting in unrecoverable disallowed expenditures.",
      solution: "Formal sponsor extension workflows inside Odoo enforce a hard spending freeze until official sponsor approval documentation is logged."
    },
    {
      id: "procurement-trace",
      category: "compliance",
      challenge: "Fragmented purchase-to-payment",
      conventional: "PO in one system, delivery note on a clipboard, asset tag in Excel, and vendor bill in accounting software. Zero lineage.",
      solution: "PO, delivery receipt, serialized asset tag, and 3-way invoice match are locked into a single relational chain tied to the grant."
    },
    {
      id: "shadow-reporting",
      category: "compliance",
      challenge: "Fourteen spreadsheets, every version 'final'",
      conventional: "Every stakeholder builds their own shadow spreadsheet. Meeting time is wasted arguing about whose numbers are correct.",
      solution: "Role-based portals provide a single source of truth. Funder, Director, Auditor, and Startup see their view of the identical record."
    }
  ];

  const filteredChallenges = challengeFilter === 'all' 
    ? operationalChallenges 
    : operationalChallenges.filter(c => c.category === challengeFilter);

  return (
    <article className="space-y-16 text-slate-900 leading-relaxed font-sans">
      
      {/* 1. EDITORIAL PROLOGUE */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prixgen-blue/10 border border-prixgen-blue/20 text-prixgen-blue text-xs font-black tracking-wider uppercase">
          <Building2 className="w-3.5 h-3.5" />
          Prixgen Insights · Incubation & Grant-Funded Institutions
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-prixgen-blue tracking-tight leading-[1.1]">
          The Distance Between Funding and Discovery
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed border-l-4 border-prixgen-lightblue pl-4">
          Why incubation centers need one connected record, and how Prixgen builds it.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 py-2 border-y border-slate-100">
          <span className="text-slate-900">Karthik S Hatti</span>
          <span>·</span>
          <span>Co-Founder & CBO, Prixgen Tech Solutions Pvt Ltd</span>
          <span>·</span>
          <span>October 2026</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-prixgen-blue"><Clock className="w-3.5 h-3.5" /> 6 min read</span>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-4 pt-2">
          <p className="text-lg font-semibold text-slate-900 leading-relaxed">
            An incubation center is a custodian: funds flow in from many funders, support flows out to many startups.
          </p>
          <p>
            Imagine you are an incubation center. Call it <strong>Cornea Technologies</strong>.
          </p>
          <p>
            You are a custodian. You hold other people&apos;s money in trust, from government programmes, public innovation funds, foundations, corporate sponsors and universities. And you nurture the startups that turn that money into discovery.
          </p>
          <p>
            From the outside, it looks simple: <em>money comes in, research goes out</em>. From the inside, it is one of the most complex operating models in any industry. That gap is the subject of our new short film, and of this article.
          </p>
        </div>

        {/* Image 01 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/funding-discovery/01_custodian.jpg" 
            alt="Diagram of funders flowing into an incubation center that supports many startups" 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            An incubation center is a custodian: funds flow in from many funders, support flows out to many startups.
          </figcaption>
        </figure>
      </section>

      {/* 2. WATCH THE SHORT FILM SHOWCASE */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-[#0B1E36] to-[#002B49] text-white p-6 md:p-10 shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[#00D2FF] text-xs font-mono font-bold tracking-widest uppercase">
              <Play className="w-3 h-3 fill-current" />
              Watch the Film · 4 Minutes
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              The Distance Between Funding and Discovery
            </h3>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              When a scientist needs one $12,000 calibration unit to validate an environmental flood sensor, why does a $500,000 grant stall her lab? Watch how disconnected records halt research, and how one connected system unlocks it.
            </p>

            <div className="text-xs text-slate-400 font-mono space-y-1 pt-2 border-t border-white/10">
              <div><strong>Written & Produced by:</strong> Karthik S Hatti (Co-Founder & CBO)</div>
              <div><strong>Featuring:</strong> Cornea Technologies & RiverSense Telemetry</div>
            </div>
          </div>

          {/* Film Visual Card / Play Trigger */}
          <div className="w-full lg:w-80 shrink-0">
            <div 
              onClick={() => setIsVideoModalOpen(true)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-white/20 bg-slate-900 shadow-2xl aspect-video flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:border-[#00D2FF]"
            >
              <img 
                src="/images/blog/funding-discovery/01_custodian.jpg" 
                alt="Diagram of funders flowing into an incubation center that supports many startups" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Play Button */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#00D2FF] group-hover:text-white transition-all">
                <Play className="w-7 h-7 ml-1 fill-current" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-md backdrop-blur">
                  Click to Stream Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SCALE NOBODY SEES */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-lightblue">
            The Scale Nobody Sees
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            Cornea Technologies is Fictional. Its Shape Is Real.
          </h3>
          <p className="text-slate-600">
            A mid-sized incubation center manages thousands of moving parts across separate academic and commercial jurisdictions:
          </p>
        </div>

        {/* 8-Cluster Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "24", label: "Programs", desc: "Strategic university & sector charters" },
            { num: "96", label: "Projects", desc: "Discrete investigative operations" },
            { num: "288", label: "Sub-Projects", desc: "Work packages & experimental cohorts" },
            { num: "240", label: "Startups", desc: "Nurtured ventures, not owned assets" },
            { num: "960", label: "People", desc: "Researchers, fellows, and founders" },
            { num: "2,400", label: "Assignments", desc: "Time allocations across multiple grants" },
            { num: "50+", label: "Funders", desc: "Federal, state, corporate & trusts" },
            { num: "120", label: "Agreements", desc: "Distinct rulebooks running in parallel", highlight: true }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl border transition-all ${
                item.highlight 
                  ? 'bg-rose-50 border-rose-200 text-rose-950 shadow-sm' 
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className={`text-2xl md:text-3xl font-black font-mono tracking-tight ${item.highlight ? 'text-rose-600' : 'text-prixgen-blue'}`}>
                {item.num}
              </div>
              <div className="font-bold text-sm tracking-tight mt-1">{item.label}</div>
              <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Image 02 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/funding-discovery/02_scale.jpg" 
            alt="The number 120 in red with the label &quot;sets of rules&quot;" 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Each of those 120 agreements has its own eligible costs, its own release schedule, and its own reporting format.
          </figcaption>
        </figure>

        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-sm leading-relaxed space-y-2">
          <div className="font-bold flex items-center gap-2 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            The Multi-Jurisdictional Trap
          </div>
          <p>
            The startups are independent companies with their own founders and investors. Many researchers are employed by universities, not by the center. Count the assignments as employees and you are already wrong. <strong>120 agreements means 120 sets of rules, running in parallel.</strong>
          </p>
        </div>
      </section>

      {/* 4. THE CORE DILEMMA: ONE INSTRUMENT. $12,000. */}
      <section className="space-y-6 rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            The Core Dilemma
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            One Instrument. $12,000.
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl">
            In the film, a scientist needs one calibration instrument to finish a field validation. It costs $12,000. Her project grant is worth $500,000 over five years, so the purchase sounds trivial.
          </p>
        </div>

        {/* Image 03 Embed */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
          <img 
            src="/images/blog/funding-discovery/03_shortfall.jpg" 
            alt="$10,000 available compared with $12,000 needed" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Interactive Tranche Simulator Controls */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Simulate Tranche & Budget Check:
            </span>
            <div className="inline-flex rounded-xl bg-white/10 p-1 border border-white/15">
              <button
                onClick={() => setTrancheMode('tranche2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trancheMode === 'tranche2' 
                    ? 'bg-rose-600 text-white shadow' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Tranche 2 (Stalled: $50k in hand)
              </button>
              <button
                onClick={() => setTrancheMode('tranche3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trancheMode === 'tranche3' 
                    ? 'bg-emerald-600 text-white shadow' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Tranche 3 Arrives (+$35k Unlocked)
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-white/10 text-slate-300 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Financial Position</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Operational Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                <tr>
                  <td className="py-3 px-4 font-bold">Awarded (Five Years)</td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-slate-300">$500,000</td>
                  <td className="py-3 px-4 text-slate-400">The total sponsor promise — <em>not cash in hand</em></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Received to Date</td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-[#00D2FF]">
                    ${receivedToDate.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {trancheMode === 'tranche2' ? 'Two of twenty quarterly tranches' : 'Three quarterly tranches received in bank'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Spent</td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-slate-300">${spent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-400">Actual historical expenditure to date</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Committed</td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-slate-300">${committed.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-400">Open purchase orders already issued to vendors</td>
                </tr>
                <tr className="bg-white/10">
                  <td className="py-3 px-4 font-black text-white">Available to Commit</td>
                  <td className="py-3 px-4 font-mono font-black text-right text-emerald-400 text-base">
                    ${availableToCommit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    The only real number procurement can legally act on
                  </td>
                </tr>
                <tr className={isBudgetApproved ? 'bg-emerald-950/40' : 'bg-rose-950/40'}>
                  <td className="py-3 px-4 font-bold">Requisition Request</td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-amber-300">
                    ${customRequestAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {isBudgetApproved ? (
                      <span className="text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Passed: Sufficient cash available in grant line
                      </span>
                    ) : (
                      <span className="text-rose-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> Stalled: Short by ${budgetShortfall.toLocaleString()} until next tranche arrives
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 italic">
            *In an incubation center, restricted funds from other grants cannot legally be moved to cover the gap. The system must enforce this boundary before any purchase order is signed.
          </p>
        </div>
      </section>

      {/* 5. WHEN ONE PURCHASE STALLS, EVERYTHING WAITS */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            The Domino Effect
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            When One Purchase Stalls, Everything Waits
          </h3>
          <p className="text-slate-600">
            A $2,000 shortfall does not stay small. In an incubation center, every scientific project is wired to others across multiple cities and institutions:
          </p>
        </div>

        {/* Image 04 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-4">
          <img 
            src="/images/blog/funding-discovery/04_waiting.jpg" 
            alt="Procurement, flood model and field team cards all marked waiting" 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            One delayed purchase holds up procurement in Boston, modeling in Denver, and the field deployment team in the Gulf Coast.
          </figcaption>
        </figure>

        {/* Ripple Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Procurement Freeze",
              desc: "Procurement has checked three bids and approved the vendor, but cannot legally release the purchase order without confirmed cash backing."
            },
            {
              title: "Downstream Stoppage",
              desc: "Downstream teams wait: the numerical modeling team in Denver needs the sensor telemetry, and the field team on the Gulf Coast needs the calibrated model."
            },
            {
              title: "Cost Misallocation",
              desc: "An invoice is charged entirely to one work package when part of the work belonged to another, contaminating grant audits."
            },
            {
              title: "Multi-Grant Faculty Effort",
              desc: "A researcher employed by an external university works on three grants at once (40%, 30%, 30%) with no clean time tracking."
            },
            {
              title: "Blind Headcount Commitments",
              desc: "A program wants two research fellows for 18 months, but nobody can find an accurate funding forecast against the award expiration date."
            },
            {
              title: "Unapproved Award Extensions",
              desc: "A five-year award needs a sixth year extension, which only the sponsor can approve, but teams keep spending without sign-off."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {item.title}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center font-bold text-sm text-slate-700">
          Fourteen spreadsheets, six inboxes, and every version is called &quot;final&quot;.
        </div>
      </section>

      {/* 6. EVERYONE HAS A QUESTION */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Multi-Stakeholder Reality
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            Everyone Has a Question
          </h3>
          <p className="text-slate-600">
            An incubation center answers to many stakeholders at once. Each one asks a fundamentally different question of the same underlying operational facts:
          </p>
        </div>

        {/* Stakeholder Switcher Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'funder', label: '🏛️ Funder' },
            { id: 'director', label: '🧭 Program Director' },
            { id: 'regulator', label: '⚖️ Government Auditor' },
            { id: 'startups', label: '🚀 Startups' },
            { id: 'finance', label: '💼 Leadership & Finance' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStakeholder(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeStakeholder === tab.id
                  ? 'bg-prixgen-blue text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Stakeholder View Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStakeholder}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-prixgen-lightblue">
                  {stakeholders[activeStakeholder].badge}
                </span>
                <h4 className="text-xl md:text-2xl font-black text-slate-900">
                  {stakeholders[activeStakeholder].role}
                </h4>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                {stakeholders[activeStakeholder].keyMetric}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What they ask:
                </div>
                <div className="text-base md:text-lg font-bold text-prixgen-blue italic">
                  &quot;{stakeholders[activeStakeholder].question}&quot;
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-3">
                  What they need to see:
                </div>
                <p className="text-xs md:text-sm text-slate-600">
                  {stakeholders[activeStakeholder].needs}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                  <strong>Without Connected ERP:</strong> {stakeholders[activeStakeholder].realityWithoutPrixgen}
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong>With Prixgen Connected ERP:</strong> {stakeholders[activeStakeholder].solutionWithPrixgen}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Image 05 Embed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img 
              src="/images/blog/funding-discovery/05_questions.jpg" 
              alt="The Program Director asks: what is committed, who can I hire, which project is at risk" 
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-medium text-center">
              The Program Director&apos;s questions: commitments, hiring, and risk.
            </figcaption>
          </figure>

          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img 
              src="/images/blog/funding-discovery/06_nothing_connected.jpg" 
              alt="A dense tangle of lines with the words &quot;Everyone was right, and nothing was connected&quot;" 
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-medium text-center">
              In most centers, every answer exists somewhere. Everyone was right. Nothing was connected.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 7. GLOBAL RULEBOOK COMPARISON */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Global Perspective
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            Same Questions, Different Rulebooks
          </h3>
          <p className="text-slate-600">
            The questions do not change from region to region. The regulatory rulebook does:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(regions).map(([key, reg]) => (
            <div 
              key={key}
              onClick={() => setActiveRegion(key as any)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                activeRegion === key 
                  ? 'bg-prixgen-blue text-white shadow-lg ring-2 ring-prixgen-blue/30 scale-[1.02]' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="text-2xl mb-2">{reg.flag}</div>
                <h4 className="font-bold text-base tracking-tight mb-2">{reg.name}</h4>
                <div className={`text-[11px] leading-relaxed mb-3 ${activeRegion === key ? 'text-white/80' : 'text-slate-500'}`}>
                  <strong>Funding Mix:</strong> {reg.fundingMix}
                </div>
              </div>
              <div className={`pt-3 border-t text-[11px] leading-relaxed font-mono ${
                activeRegion === key ? 'border-white/20 text-sky-200' : 'border-slate-200 text-slate-600'
              }`}>
                <strong>Rulebook:</strong> {reg.rulebook}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHERE PRIXGEN COMES IN */}
      <section className="space-y-6 rounded-3xl bg-gradient-to-br from-[#0B2545] to-[#00172D] text-white p-6 md:p-10 shadow-xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-mono font-bold tracking-widest uppercase">
              <AwardIcon className="w-3.5 h-3.5" />
              Odoo Gold Partner · Enterprise Consulting
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Where Prixgen Comes In
            </h3>

            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Prixgen is a consulting and ERP implementation partner, and an <strong>Odoo Gold Partner</strong>. Our work with incubation-style organisations starts from one belief: <em>the rules are right</em>.
            </p>

            <blockquote className="border-l-4 border-[#00D2FF] pl-4 py-2 italic text-sm md:text-base text-sky-100 bg-white/5 rounded-r-xl">
              &quot;Restricted funds should stay restricted. Commitments should never exceed funds received. Every cost should have an eligible source, and every approval should have an owner. The problem is that those rules usually live in people&apos;s heads. <strong>We put them into the system.</strong>&quot;
            </blockquote>

            <p className="text-xs md:text-sm text-slate-300">
              We know what the funder asks, what the Program Director asks and what the government asks. So we design the ERP around those questions, not around a generic chart of accounts.
            </p>
          </div>

          <div className="space-y-4">
            <img 
              src="/images/blog/funding-discovery/07_prixgen.jpg" 
              alt="Prixgen, consulting and ERP implementation partner" 
              className="rounded-2xl border border-white/15 shadow-xl w-full"
            />
            <img 
              src="/images/blog/funding-discovery/08_we_know.jpg" 
              alt="Checklist: how incubators work, what the funder, Program Director and government ask" 
              className="rounded-2xl border border-white/15 shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* 9. WHAT ONE CONNECTED RECORD LOOKS LIKE (13-STEP TRACEABILITY) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            System Architecture
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            What One Connected Record Looks Like
          </h3>
          <p className="text-slate-600">
            In the connected model, every transaction traces back through a single unbroken chain:
          </p>
        </div>

        {/* Image 09 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-4">
          <img 
            src="/images/blog/funding-discovery/09_one_record.jpg" 
            alt="A single line tracing funder to payment through thirteen linked steps" 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            One record, from the funder&apos;s award to the instrument on the bench. Click any node below to trace its data contract.
          </figcaption>
        </figure>

        {/* Interactive 13-Step Horizontal Stepper */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center min-w-[850px] gap-1 relative px-2">
            {chainSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const isGrantSide = step.category === 'grant';
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`flex flex-col items-center group focus:outline-none transition-all ${
                      isSelected ? 'scale-110 z-10' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition-all ${
                      isSelected 
                        ? (isGrantSide ? 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-100' : 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-100')
                        : (isGrantSide ? 'bg-white text-blue-700 border-blue-600' : 'bg-white text-emerald-700 border-emerald-600')
                    }`}>
                      {step.id}
                    </div>
                    <span className="text-[10px] font-bold mt-1 text-slate-700 whitespace-nowrap">
                      {step.label}
                    </span>
                  </button>
                  {idx < chainSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 min-w-[24px] ${
                      idx < 7 ? 'bg-blue-500' : 'bg-emerald-500'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Step Information Card */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                chainSteps[activeStep].category === 'grant' ? 'bg-blue-500/30 text-blue-300' : 'bg-emerald-500/30 text-emerald-300'
              }`}>
                Step {chainSteps[activeStep].id} · {chainSteps[activeStep].category === 'grant' ? 'Grant Governance' : 'Operational Execution'}
              </span>
              <h5 className="font-bold text-base text-white">{chainSteps[activeStep].title}</h5>
            </div>
            <p className="text-xs md:text-sm text-slate-300">
              {chainSteps[activeStep].desc}
            </p>
          </div>
          <div className="text-xs text-sky-300 font-mono shrink-0">
            Linked to grant audit #GR-9042
          </div>
        </div>
      </section>

      {/* 10. THE CHALLENGE VS. CONNECTED SYSTEM MATRIX */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
              Comparison Matrix
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
              The Operational Challenges vs. The Connected System
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All (8)' },
              { id: 'funds', label: 'Cash & Tranches' },
              { id: 'people', label: 'Staffing & Payroll' },
              { id: 'compliance', label: 'Audits & POs' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setChallengeFilter(f.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  challengeFilter === f.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChallenges.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="font-black text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>{item.challenge}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                  {item.category}
                </span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-950">
                  <strong className="text-rose-700 block mb-1">Conventional Breakdown:</strong>
                  {item.conventional}
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-950">
                  <strong className="text-emerald-700 block mb-1">Prixgen Connected ERP Solution:</strong>
                  {item.solution}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Images 10 & 11 Embed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img 
              src="/images/blog/funding-discovery/10_budget_check.jpg" 
              alt="ERP budget check showing the request on hold until the next tranche" 
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-medium text-center">
              The budget check happens before anyone has to ask.
            </figcaption>
          </figure>

          <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img 
              src="/images/blog/funding-discovery/11_many_views.jpg" 
              alt="One record connected to funder, Program Director, government and startup views" 
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-medium text-center">
              One truth, many views: funder, Program Director, government, and startups.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 11. HOW WE WORK WITH INCUBATION CENTERS (6 PHASES) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Implementation Methodology
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            How We Work With Incubation Centers
          </h3>
          <p className="text-slate-600">
            A structured deployment methodology built specifically for grant-funded institutions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Map Funding & Rules",
              desc: "Catalog every funder, legal agreement, release schedule, eligible-cost rule, and reporting obligation before designing software."
            },
            {
              step: "02",
              title: "Design the Structure",
              desc: "Model programs, projects, work packages, startup participation, entities, and currencies the way the center actually runs."
            },
            {
              step: "03",
              title: "Configure Controls",
              desc: "Implement automated budget checks, approval paths, restricted-fund firewalls, and sub-second audit trail logging."
            },
            {
              step: "04",
              title: "Move Off Spreadsheets",
              desc: "Migrate active awards, committed POs, capital asset registries, and opening balances into one single verified record."
            },
            {
              step: "05",
              title: "Give Stakeholders Their View",
              desc: "Deploy role-based dashboards for leadership and finance, project views for directors, and compliance portals for funders."
            },
            {
              step: "06",
              title: "Train & Support",
              desc: "Train administrators and researchers so the system keeps running smoothly after go-live, when the next 120 agreements arrive."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 hover:bg-white hover:shadow-md transition-all">
              <div className="text-xs font-mono font-bold text-prixgen-lightblue tracking-widest">
                PHASE {item.step}
              </div>
              <h4 className="font-bold text-base text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. THE OUTCOME */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
            The Scientific Resolution
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            The Outcome: Field Validation Passed
          </h3>
        </div>

        {/* Image 12 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-4">
          <img 
            src="/images/blog/funding-discovery/12_validation.jpg" 
            alt="A stable sensor reading with the label &quot;field validation passed&quot;" 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            RiverSense · New Orleans: Field validation passed, with days to spare.
          </figcaption>
        </figure>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
          <p className="text-base md:text-lg leading-relaxed">
            In the film, the third tranche arrives. It is matched to the right agreement in minutes. $35,000 becomes available, the purchase order is released, and nine business days later the calibration instrument is on the scientist&apos;s bench. The reading holds, and the field validation passes.
          </p>

          <blockquote className="p-6 rounded-2xl bg-slate-900 text-white font-bold text-lg md:text-xl leading-snug border-l-4 border-emerald-400 not-italic">
            &quot;It was never really about $12,000. It was about knowing, instantly, which money, whose money, and when. When every decision connects, discovery moves forward.&quot;
          </blockquote>
        </div>
      </section>

      {/* 13. HIGH CONVERSION EXECUTIVE CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-prixgen-blue to-[#001f3f] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-8">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D2FF] uppercase tracking-widest">
            <Rocket className="w-4 h-4" />
            Executive Consultation
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Run an Incubator, Accelerator, Research Foundation, or Innovation Fund?
          </h3>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            Tell us which of these questions keeps you up at night. Prixgen works with grant-funded institutions across the United States, Europe, East Asia, and the GCC to replace disconnected spreadsheets with Odoo Enterprise.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="mailto:karthik@prixgen.com?subject=Incubation%20Center%20ERP%20Architecture%20Inquiry"
              className="px-6 py-3.5 rounded-xl bg-white text-prixgen-blue font-black hover:bg-sky-100 shadow-xl transition-all flex items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              Write to karthik@prixgen.com
            </a>
            
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all text-sm backdrop-blur"
            >
              Schedule Architecture Briefing
            </button>
          </div>
        </div>

        {/* Footnote Credits */}
        <div className="pt-6 border-t border-white/15 text-xs text-slate-300 font-mono space-y-1">
          <div><strong>Film, script, direction, story, dialogues, background score and production:</strong> Karthik S Hatti</div>
          <div>Cornea Technologies is an illustrative incubation center. Its people, programs, funders and figures are fictional.</div>
        </div>
      </section>

      {/* VIDEO STREAM MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/15 text-white"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Short Film Experience · The Distance Between Funding and Discovery
                </div>
                <button 
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Display */}
              <div className="aspect-video bg-black relative flex items-center justify-center">
                <video 
                  controls 
                  autoPlay
                  poster="/images/blog/funding-discovery/01_custodian.jpg"
                  className="w-full h-full object-contain"
                >
                  <source src="/videos/funding-discovery-film.mkv" type="video/webm" />
                  Your browser does not support embedded video playback.
                </video>
              </div>

              <div className="p-6 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-300">
                <div>
                  <div className="font-bold text-white text-sm">Official Release by Prixgen Tech Solutions</div>
                  <div>Directed by Karthik S Hatti · Runtime 4:00 min</div>
                </div>
                <a 
                  href="mailto:karthik@prixgen.com?subject=Private%20Screening%20%26%20Incubation%20ERP%20Briefing"
                  className="px-4 py-2 rounded-lg bg-prixgen-blue hover:bg-blue-600 text-white font-bold transition-all text-center"
                >
                  Request Executive Screening
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LEAD CAPTURE BRIEFING MODAL */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono font-bold text-prixgen-blue uppercase tracking-wider">
                  Incubation ERP Architecture
                </span>
                <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  Schedule an Executive Briefing
                </h4>
                <p className="text-xs text-slate-500">
                  Discuss your institution&apos;s grant structure, funder compliance rules, and Odoo architecture with our leadership team.
                </p>
              </div>

              <LeadCaptureForm source="Blog: The Distance Between Funding and Discovery" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </article>
  );
}

function AwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
