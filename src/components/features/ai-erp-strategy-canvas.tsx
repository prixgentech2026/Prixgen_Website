'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  Sparkles,
  Sliders,
  ShieldCheck,
  Factory,
  Database,
  Search,
  Filter,
  Activity,
  Workflow,
  Check,
  Eye,
  Bot,
  BrainCircuit,
  Lock,
  Compass
} from 'lucide-react';

export default function AiErpStrategyCanvas() {
  const [activeStrategy, setActiveStrategy] = useState<'activate' | 'extend' | 'build'>('activate');
  const [activeMatrixFilter, setActiveMatrixFilter] = useState<'all' | 'activate' | 'extend' | 'build'>('all');
  const [searchMatrix, setSearchMatrix] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // 5 Tests Interactive State
  const [testAnswers, setTestAnswers] = useState<{ [key: string]: boolean }>({
    value: false,
    standard: false,
    data: false,
    boundary: false,
    ownership: false,
  });

  const toggleTest = (key: string) => {
    setTestAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testsPassed = Object.values(testAnswers).filter(Boolean).length;

  const strategies = {
    activate: {
      title: "1. ACTIVATE",
      subtitle: "Use Native Enterprise & Cloud Platform AI",
      badge: "Fastest ROI • Lowest Risk",
      color: "#00A3E0",
      bg: "bg-sky-50/80 border-sky-200",
      pillBg: "bg-[#00A3E0] text-white",
      summary: "Use capabilities already available within your ERP (like Odoo), cloud platform, or existing enterprise software suite.",
      bestFor: "Common, repeatable commodity workflows that operate identically across thousands of enterprises.",
      corePrinciple: "Never build custom software for a commodity capability that standard platform configurations can solve.",
      examples: [
        "Document & invoice OCR extraction",
        "Natural-language standard ERP reporting",
        "Automated AP / AR reconciliation matching",
        "Basic forecasting based on historical sales ledger",
        "Standard employee knowledge chatbots & summarizers",
        "Native transaction anomaly detection"
      ]
    },
    extend: {
      title: "2. EXTEND",
      subtitle: "Connect Specialized Intelligence to the Clean Core ERP",
      badge: "High Impact • Cross-System",
      color: "#004B87",
      bg: "bg-indigo-50/80 border-indigo-200",
      pillBg: "bg-[#004B87] text-white",
      summary: "Keep ERP as the single source of truth / transactional backbone, while connecting specialized ML, IIoT, or computer vision around it.",
      bestFor: "Processes that cross beyond the software boundary into shop-floor machines, cameras, telemetry, or multi-cloud services.",
      corePrinciple: "Protect the clean ERP core. Innovate at the edges with modular microservices and event-driven APIs.",
      examples: [
        "ERP + IIoT: Machine telemetry + work orders + maintenance schedules",
        "ERP + Computer Vision: Automated visual quality inspection & scrap logging",
        "ERP + AI Agents: Autonomous quote triage with human authorization",
        "ERP + Demand Intelligence: Weather, market indices & commodity pricing augmentation",
        "Intelligent Warehouse Routing: Sensor-assisted putaway & pick wave batching"
      ]
    },
    build: {
      title: "3. BUILD",
      subtitle: "Own Proprietary Competitive Advantage",
      badge: "Differentiating IP • Board Asset",
      color: "#7C3AED",
      bg: "bg-purple-50/80 border-purple-200",
      pillBg: "bg-[#7C3AED] text-white",
      summary: "Engineer proprietary algorithms and models when your unique process knowledge directly expands gross margin, quality, or yield.",
      bestFor: "Processes where proprietary knowledge (formulations, scrap chemistry, polymer recipes, machine tolerances) is your core IP.",
      corePrinciple: "Only build what creates true competitive differentiation. Commodity logic belongs in standard ERP.",
      examples: [
        "Proprietary chemical formulation & resin blending optimization",
        "Plant-specific yield prediction based on deep machine sensor history",
        "Complex multi-tier production sequencing for high-mix manufacturing",
        "Customer-specific dynamic pricing based on historical contract margins",
        "Proprietary scrap reclamation algorithms"
      ]
    }
  };

  const matrixItems = [
    {
      requirement: "Invoice information extraction & OCR",
      approach: "activate",
      approachLabel: "Activate",
      tagColor: "bg-sky-100 text-sky-800 border-sky-200",
      reason: "Mature packaged capabilities exist directly in modern ERP platforms like Odoo without custom code."
    },
    {
      requirement: "Natural-language conversational ERP queries",
      approach: "activate",
      approachLabel: "Activate / Extend",
      tagColor: "bg-sky-100 text-sky-800 border-sky-200",
      reason: "Start with native ERP platform copilots; extend with read-only vector databases if querying cross-system data lakes."
    },
    {
      requirement: "Demand & inventory forecasting",
      approach: "extend",
      approachLabel: "Activate / Extend",
      tagColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      reason: "ERP historical sales data provides the foundation; external market indices and lead times require an extended layer."
    },
    {
      requirement: "Predictive machine maintenance",
      approach: "extend",
      approachLabel: "Extend",
      tagColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      reason: "Requires combining ERP work orders and maintenance logs with high-frequency IIoT vibration and temperature sensor streams."
    },
    {
      requirement: "Automated shop-floor visual quality inspection",
      approach: "extend",
      approachLabel: "Extend / Build",
      tagColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      reason: "Edge vision models inspect physical parts and automatically log scrap or pass status back to ERP production orders."
    },
    {
      requirement: "Intelligent warehouse putaway & routing",
      approach: "activate",
      approachLabel: "Activate / Extend",
      tagColor: "bg-sky-100 text-sky-800 border-sky-200",
      reason: "Standard WMS rules handle 80% of operations; dynamic 3D optimization can be plugged in for mega-distribution hubs."
    },
    {
      requirement: "Proprietary product formulation & polymer mixing",
      approach: "build",
      approachLabel: "Build",
      tagColor: "bg-purple-100 text-purple-800 border-purple-200",
      reason: "Your proprietary recipe IP and resin behavior create your market advantage. You should own this system completely."
    },
    {
      requirement: "Industry-specific yield & scrap minimization",
      approach: "build",
      approachLabel: "Build / Extend",
      tagColor: "bg-purple-100 text-purple-800 border-purple-200",
      reason: "Correlates machine parameters, operator shifts, and ambient factory conditions with production batch yield."
    },
    {
      requirement: "Customer-specific margin & pricing intelligence",
      approach: "build",
      approachLabel: "Extend / Build",
      tagColor: "bg-purple-100 text-purple-800 border-purple-200",
      reason: "Depends on proprietary commercial relationships, tiered customer rebates, and live raw material cost indices."
    },
    {
      requirement: "General-purpose employee internal chatbot",
      approach: "activate",
      approachLabel: "Activate",
      tagColor: "bg-sky-100 text-sky-800 border-sky-200",
      reason: "Zero strategic value in re-inventing foundation LLM wrappers or custom chat engines."
    }
  ];

  const filteredMatrix = matrixItems.filter(item => {
    const matchesFilter = activeMatrixFilter === 'all' || item.approach === activeMatrixFilter;
    const matchesSearch = item.requirement.toLowerCase().includes(searchMatrix.toLowerCase()) || 
                          item.reason.toLowerCase().includes(searchMatrix.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const faqs = [
    {
      q: "Should we first evaluate AI already available in our ERP?",
      a: "Yes, absolutely. For common business processes (invoice OCR, standard reporting, reorder automation), existing platform functionality provides the fastest and lowest-risk path to validating value. Custom development should be reserved for differentiated workflows where standard capability cannot deliver your competitive advantage."
    },
    {
      q: "When does custom AI genuinely make strategic sense?",
      a: "When your business process, proprietary operating data, chemical formulation, or machine knowledge provides measurable differentiation that directly improves gross margin, scrap reduction, or customer retention, and justifies multi-year engineering ownership."
    },
    {
      q: "Should AI live directly inside the ERP database?",
      a: "Usually no. While standard transaction assists work well natively inside ERP, heavy machine learning models, video streams, or IIoT telemetry should live in an adjacent modular layer. This preserves your Clean Core ERP, guarantees database performance, and keeps future ERP upgrades effortless."
    },
    {
      q: "Is clean data mandatory before launching any AI initiative?",
      a: "Perfect data is a myth, but baseline discipline is non-negotiable. Master data (item codes, BOMs, vendor IDs, machine logs) requires clear ownership and consistency. AI can help flag inconsistencies, but it cannot fix broken source data on its own."
    },
    {
      q: "Can AI automatically trigger ERP financial transactions?",
      a: "Technically yes, but governance must define the boundary. High-performing enterprises use a 3-tier boundary: Automate for low-risk rule-bound thresholds, Assist for manager sign-offs, and Escalate for unexpected anomalies."
    },
    {
      q: "Who should own an ERP + AI initiative in the enterprise?",
      a: "The operational business leader (COO, CFO, Plant Head) must own the business outcome and KPI. IT and the implementation partner (like Prixgen) own architecture, APIs, and data integrity. Executive leadership governs the risk and decision boundaries."
    }
  ];

  return (
    <div className="space-y-16 text-slate-800 leading-relaxed font-sans">
      
      {/* 1. STRATEGIC QUOTE HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#004B87] via-[#002D54] to-slate-950 p-8 md:p-12 text-white shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#00A3E0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00A3E0] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Executive Decision Framework
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            The Real AI Decision Is Not <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E0] to-sky-300">Build vs Buy</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
            It is deciding what should stay standard, what should be connected, and what is valuable enough for your enterprise to own.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sky-200/80 font-mono">
            <span>By Karthik S Hatti • CBO, Prixgen Tech Solutions</span>
            <span>•</span>
            <span>Clean Core Architecture</span>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE CORE SUMMARY: 3 PILLARS */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
              THE 3-TIER ARCHITECTURAL MODEL
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Three Choices for Enterprise AI — Not Two
            </h3>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Toggle between the three pathways to understand where each creates maximum operational leverage.
          </p>
        </div>

        {/* 3-Way Interactive Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['activate', 'extend', 'build'] as const).map((key) => {
            const isSel = activeStrategy === key;
            const item = strategies[key];
            return (
              <button
                key={key}
                onClick={() => setActiveStrategy(key)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSel 
                    ? 'bg-[#004B87] text-white border-[#004B87] shadow-xl ring-2 ring-[#00A3E0]/40 -translate-y-1' 
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00A3E0]/60 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isSel ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                  {key === 'activate' && <Zap className={`w-4 h-4 ${isSel ? 'text-sky-300' : 'text-slate-400'}`} />}
                  {key === 'extend' && <Layers className={`w-4 h-4 ${isSel ? 'text-sky-300' : 'text-slate-400'}`} />}
                  {key === 'build' && <Cpu className={`w-4 h-4 ${isSel ? 'text-sky-300' : 'text-slate-400'}`} />}
                </div>
                <div className={`text-lg font-black tracking-tight ${isSel ? 'text-white' : 'text-slate-900 group-hover:text-[#004B87]'}`}>
                  {item.title}
                </div>
                <div className={`text-xs mt-1 font-medium line-clamp-1 ${isSel ? 'text-sky-200' : 'text-slate-500'}`}>
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Strategy Detail View */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Selected Approach</span>
              <h4 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                {strategies[activeStrategy].title}: <span className="text-[#004B87] font-semibold">{strategies[activeStrategy].subtitle}</span>
              </h4>
            </div>
            <div className="text-xs font-bold px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
              <strong>Best For:</strong> {strategies[activeStrategy].bestFor}
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
            {strategies[activeStrategy].summary}
          </p>

          <div className="p-4 rounded-2xl bg-white border-l-4 border-[#004B87] border-y border-r border-slate-200 text-xs text-slate-700 leading-relaxed shadow-sm">
            <strong className="text-slate-900 font-bold block mb-1">Guiding Principle:</strong>
            {strategies[activeStrategy].corePrinciple}
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
              Standard Enterprise Use Cases for This Tier:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {strategies[activeStrategy].examples.map((ex, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-800 font-medium">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* 4. THE 5-TEST READINESS CALCULATOR */}
      <div className="space-y-6 rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00A3E0] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-[#00A3E0]" /> Pre-Investment Governance
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Before Building Custom AI: Apply the Five Tests
            </h3>
          </div>
          
          {/* Live Outcome Badge */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 flex items-center gap-4 shrink-0">
            <div className="text-3xl font-black font-mono text-[#00A3E0]">
              {testsPassed}/5
            </div>
            <div className="text-xs">
              <div className="font-bold uppercase tracking-wider text-slate-300">Decision Outcome</div>
              <div className="text-white font-bold">
                {testsPassed === 5 ? (
                  <span className="text-purple-300">👑 Qualifies for Custom BUILD</span>
                ) : testsPassed >= 3 ? (
                  <span className="text-sky-300">⚡ Best Suited for EXTEND</span>
                ) : (
                  <span className="text-emerald-300">✅ ACTIVATE Native Platform AI</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Check off the tests your proposed AI initiative currently meets. If a project fails these tests, developing custom software creates technical debt instead of competitive advantage.
        </p>

        {/* The 5 Test Cards */}
        <div className="space-y-3">
          {[
            {
              key: 'value',
              num: '01',
              title: 'The Business Value Test',
              question: 'Can the outcome be explained without buzzwords (no "AI/agent/copilot") with a measured KPI?',
              example: '"Reduce raw material scrap by 2.8% on extrusion line 4" instead of "Deploy an AI shop-floor agent".'
            },
            {
              key: 'standard',
              num: '02',
              title: 'The Standardization Test',
              question: 'Is this process truly unique to your competitive advantage, rather than standard accounting or AP?',
              example: 'Invoice approvals and leave requests should remain standard ERP. Polymer recipe tuning should be proprietary.'
            },
            {
              key: 'data',
              num: '03',
              title: 'The Data & Telemetry Test',
              question: 'Is the underlying master data, BOM, and historical telemetry trustworthy and consistent?',
              example: 'AI cannot repair duplicate customers, inconsistent scrap reasons, or missing machine sensors.'
            },
            {
              key: 'boundary',
              num: '04',
              title: 'The Decision Boundary Test',
              question: 'Have you clearly defined where AI automates, where it assists, and where it must escalate?',
              example: 'Auto-schedule low-risk replenishment, but require CFO sign-off on high-value supplier adjustments.'
            },
            {
              key: 'ownership',
              num: '05',
              title: 'The Total Lifecycle Ownership Test',
              question: 'Have you allocated internal budget and headcount to maintain models, APIs, and updates for 5 years?',
              example: 'Custom code requires perpetual retraining, API monitoring, and upgrade validation.'
            }
          ].map((test) => {
            const isChecked = testAnswers[test.key];
            return (
              <div
                key={test.key}
                onClick={() => toggleTest(test.key)}
                className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer select-none flex items-start justify-between gap-4 ${
                  isChecked 
                    ? 'bg-sky-950/50 border-[#00A3E0] shadow-[0_0_20px_rgba(0,163,224,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-[#00A3E0]">TEST {test.num}</span>
                    <span className="text-sm md:text-base font-bold text-white">{test.title}</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 font-medium">
                    {test.question}
                  </p>
                  <p className="text-[11px] text-sky-200/70 italic font-mono pt-1">
                    Rule of Thumb: {test.example}
                  </p>
                </div>

                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={() => {}} 
                  className="w-5 h-5 rounded text-[#00A3E0] focus:ring-[#00A3E0] cursor-pointer mt-1 shrink-0"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. INTERACTIVE ACTIVATE-EXTEND-BUILD REQUIREMENT MATRIX */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
              DECISION BENCHMARK
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Practical Enterprise Requirement Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Search or filter across 10 real-world requirements to see the recommended architecture.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
            {[
              { key: 'all', label: 'All Requirements' },
              { key: 'activate', label: 'Activate' },
              { key: 'extend', label: 'Extend' },
              { key: 'build', label: 'Build' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setActiveMatrixFilter(f.key as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeMatrixFilter === f.key 
                    ? 'bg-white text-[#004B87] shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search use cases..."
              value={searchMatrix}
              onChange={(e) => setSearchMatrix(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
            />
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredMatrix.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.approachLabel}
                  </span>
                </div>
                <h4 className="text-sm md:text-base font-bold text-slate-900 mb-2 group-hover:text-[#004B87] transition-colors leading-snug">
                  {item.requirement}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CLEAN CORE ERP ARCHITECTURE STACK */}
      <div className="p-6 md:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
            MODULAR ENTERPRISE ARCHITECTURE
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Protect the Clean Core ERP
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
            An ERP system must remain a dependable transactional backbone (finance, inventory, BOMs, audit trails). Do not destabilize the core by hardcoding experimental AI models inside transactional database triggers.
          </p>
        </div>

        {/* 5-Layer Stack Visualization */}
        <div className="space-y-3">
          {[
            {
              layer: "01. ACTION",
              title: "Business Execution & Transaction",
              desc: "ERP Transactions • Workflows • Purchase Approvals • Machine Speed Setpoints",
              color: "border-emerald-500 bg-emerald-50/70 text-emerald-900",
              badge: "Execution Layer"
            },
            {
              layer: "02. DECISION",
              title: "Human Governance & Accountability",
              desc: "Employee • Plant Manager • Quality Inspector • CFO Sign-Off",
              color: "border-sky-500 bg-sky-50/70 text-sky-900",
              badge: "Human-In-The-Loop"
            },
            {
              layer: "03. INTELLIGENCE",
              title: "Specialized ML & Edge Models",
              desc: "Machine Learning • Computer Vision • Predictive Models • Anomaly Detection",
              color: "border-purple-500 bg-purple-50/70 text-purple-900",
              badge: "Modular AI Layer"
            },
            {
              layer: "04. CONNECTED OPERATIONS",
              title: "Physical Reality & Telemetry",
              desc: "Shop-Floor Machines • IIoT Vibration/Temp Sensors • WMS Handhelds • Cameras",
              color: "border-amber-500 bg-amber-50/70 text-amber-900",
              badge: "Operational Stream"
            },
            {
              layer: "05. SYSTEM OF RECORD",
              title: "Clean Core ERP (e.g. Odoo)",
              desc: "Finance • Inventory • BOMs • Production Orders • Costing • Audit Trails",
              color: "border-[#004B87] bg-blue-50/70 text-[#004B87]",
              badge: "Single Source of Truth"
            }
          ].map((st, i) => (
            <div key={i} className={`p-4 md:p-5 rounded-2xl border-l-4 ${st.color} border-y border-r shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3`}>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider opacity-75">{st.layer}</span>
                  <span className="text-sm font-black tracking-tight">{st.title}</span>
                </div>
                <div className="text-xs opacity-85 font-medium">{st.desc}</div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/80 shadow-xs shrink-0 self-start md:self-auto">
                {st.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. FIGURE 2 ENTERPRISE INTELLIGENCE FLOW */}
      <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950/20 flex items-center justify-center p-2">
          <img 
            src="/images/blog/ai-erp/prixgen-enterprise-intelligence-erp-ai.png" 
            alt="Figure 2: Enterprise intelligence connects physical operations, ERP, data and AI while keeping business decisions accountable."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl"
          />
        </div>
        <figcaption className="text-center text-xs text-slate-500 font-medium">
          <strong>Figure 2.</strong> Enterprise intelligence connects physical shop-floor operations, ERP, data pipelines, and AI while keeping human leadership accountable.
        </figcaption>
      </figure>

      {/* 8. 10-QUESTION LEADERSHIP PRE-APPROVAL CHECKLIST */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
            GOVERNANCE PROTOCOL
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            What Leadership Should Ask Before Approving Any AI Project
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            If your project sponsor cannot answer these questions clearly, purchasing software or writing code is premature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { num: "01", q: "What specific business problem are we solving?", sub: "Define the operational bottleneck before selecting technology." },
            { num: "02", q: "What KPI will change if this succeeds?", sub: "E.g., 15% faster month-end close or 3% higher extruder yield." },
            { num: "03", q: "Who in the business owns that KPI?", sub: "A business director must be accountable, not just the IT team." },
            { num: "04", q: "Does our ERP platform already do this?", sub: "Test native configurations before funding custom development." },
            { num: "05", q: "Does the workflow cross into the shop floor?", sub: "Clarify if edge devices, PLCs, or cameras are required." },
            { num: "06", q: "Is the underlying source data trustworthy?", sub: "Verify BOM accuracy, item masters, and sensor calibration." },
            { num: "07", q: "Is this process genuinely differentiating?", sub: "Commodity workflows belong in standard platform logic." },
            { num: "08", q: "Where is the decision boundary?", sub: "Specify what AI automates vs what requires manager approval." },
            { num: "09", q: "What happens when the AI is wrong?", sub: "Have fallback procedures, exception logs, and rollback controls." },
            { num: "10", q: "What will this cost to operate over 5 years?", sub: "Include API tokens, cloud servers, model retraining, and upgrades." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
              <span className="text-xs font-mono font-black text-[#004B87] bg-sky-50 px-2 py-1 rounded-md border border-sky-100 shrink-0">
                {item.num}
              </span>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 leading-snug">{item.q}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. THE PRIXGEN ADVANTAGE & ENGAGEMENT CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#004B87] to-[#00A3E0] p-8 md:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-200">
            <Compass className="w-4 h-4" /> Prixgen Strategic Advisory
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Ready to Connect Your ERP with Pragmatic Enterprise AI?
          </h3>
          <p className="text-sm md:text-base text-slate-100 leading-relaxed font-medium">
            Standardize what is common. Integrate what must connect. Build what creates competitive advantage. Prixgen helps enterprises design scalable clean-core architectures with Odoo, AI/ML, and IIoT integration.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#004B87] hover:bg-sky-50 font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              Book an Architecture Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/solutions/odoo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
            >
              Explore Odoo Clean-Core
            </Link>
          </div>
        </div>
      </div>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-mono font-bold text-[#004B87] uppercase tracking-wider mb-1">
            EXECUTIVE Q&A
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = expandedFaq === i;
            return (
              <div 
                key={i} 
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm md:text-base hover:text-[#004B87] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#004B87]' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-slate-100 bg-slate-50/60 p-5 text-xs md:text-sm text-slate-600 leading-relaxed font-medium"
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

    </div>
  );
}
