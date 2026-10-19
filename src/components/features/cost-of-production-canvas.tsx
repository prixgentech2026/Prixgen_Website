'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Calculator, 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Database, 
  ShieldCheck, 
  Boxes, 
  Scale, 
  FileSpreadsheet, 
  AlertCircle, 
  Split, 
  DollarSign, 
  Gauge, 
  Send,
  X,
  Clock,
  Workflow,
  PieChart,
  Calendar,
  Check
} from 'lucide-react';
import { LeadCaptureForm } from './lead-capture-form';

export function CostOfProductionCanvas() {
  // Volume Sensitivity Simulator State (tonnes per month)
  const [outputVolume, setOutputVolume] = useState<number>(500);

  // Bulk Order Marginal Cost Simulator State
  const [capacityScenario, setCapacityScenario] = useState<'full' | 'idle'>('full');
  const [orderQuantity, setOrderQuantity] = useState<number>(50000); // 50 tonnes = 50,000 kg
  const [offeredPrice, setOfferedPrice] = useState<number>(95); // ₹95/kg

  // Cost Types Active Quadrant
  const [activeLens, setActiveLens] = useState<'all' | 'direct_var' | 'direct_fix' | 'ind_var' | 'ind_fix'>('all');

  // Worked Example Tab
  const [activeExample, setActiveExample] = useState<'pvc' | 'paint'>('pvc');

  // Overhead Absorption Base Simulator
  const [absorptionBase, setAbsorptionBase] = useState<'machine' | 'labour'>('machine');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 6 Costing Sins Checklist State
  const [checkedSins, setCheckedSins] = useState<boolean[]>([false, false, false, false, false, false]);

  // Executive Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Calculations for Volume Sensitivity Simulator
  // Variable cost is constant at ₹87.64 per kg
  // Total fixed costs = ₹34.00 lakh factory overheads per month
  const fixedOverheadsLakh = 34.0;
  const variableCostPerKg = 87.64;
  const fixedCostPerKg = (fixedOverheadsLakh * 100000) / (outputVolume * 1000);
  const totalCostOfProductionPerKg = variableCostPerKg + fixedCostPerKg;
  const totalProductionCostLakh = (variableCostPerKg * outputVolume * 1000) / 100000 + fixedOverheadsLakh;

  // Calculations for Marginal Cost Simulator
  // Scenario: full line requires ₹4 lakh third extruder hire + ₹1.50/kg overtime
  // Scenario: idle capacity requires only variable cost of ₹87.64/kg
  const marginalCostPerKg = capacityScenario === 'full' 
    ? (orderQuantity * (variableCostPerKg + 1.50) + 400000) / orderQuantity // ₹97.14
    : variableCostPerKg; // ₹87.64
  
  const orderRevenueLakh = (orderQuantity * offeredPrice) / 100000;
  const orderCostLakh = (orderQuantity * marginalCostPerKg) / 100000;
  const orderNetContributionLakh = orderRevenueLakh - orderCostLakh;
  const isOrderProfitable = orderNetContributionLakh > 0;

  const toggleSin = (idx: number) => {
    setCheckedSins(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const activeSinsCount = checkedSins.filter(Boolean).length;

  const faqs = [
    {
      q: "Is cost of production the same as COGS?",
      a: "No. Cost of production is the cost of goods produced in a period. Cost of goods sold (COGS) is the cost of goods actually sold in that period. The difference is the change in finished goods inventory: COGS = Opening Finished Goods + Cost of Production − Closing Finished Goods."
    },
    {
      q: "Should administration costs be included in cost of production?",
      a: "Generally, no. General administration, corporate leadership, selling, marketing, distribution, and finance costs are period costs. The exception is factory-level administration that relates specifically to manufacturing operations (e.g., plant manager's office, factory HR, plant safety), which forms part of factory overheads."
    },
    {
      q: "Is direct labour a fixed or variable cost?",
      a: "It depends on how your workforce is structured and compensated. Piece-rate, shift-incentive, and per-shift contract labour behave as variable costs. Permanent machine operators on fixed monthly salaries who are paid regardless of line downtime behave more like fixed costs in the short run. Classify them by how they actually behave in your plant."
    },
    {
      q: "How often should overhead absorption rates and standard costs be updated?",
      a: "At minimum once a year during annual budgeting, and additionally whenever there is a material change in capacity utilisation, primary input prices, major electricity tariffs, or product mix. Reviewing actual absorption against actual overheads every month will show you when a rate revision is necessary."
    },
    {
      q: "What is a good benchmark cost of production?",
      a: "There is no universal benchmark across industries. A good cost of production is one that is accurate, understood by individual SKU and cost element, competitive within your industry, and continuously improving over time. Begin by making it transactionally reliable; competitive advantage follows from managing it."
    },
    {
      q: "Can small and mid-sized manufacturers afford this level of costing?",
      a: "Yes. Modern ERP platforms such as Odoo bring multi-level BOM costing, work-centre hourly rates, landed costs on purchase receipts, automated inventory valuation, and variance reporting within reach of growing manufacturing SMEs. The bigger requirement is shop-floor discipline in recording transactions, not heavy software licensing."
    }
  ];

  return (
    <article className="space-y-16 text-slate-900 leading-relaxed font-sans">
      
      {/* 1. EDITORIAL HEADER & PROLOGUE */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-prixgen-blue/10 border border-prixgen-blue/20 text-prixgen-blue text-xs font-black tracking-wider uppercase">
          <Factory className="w-3.5 h-3.5" />
          Prixgen Insights · Manufacturing & ERP
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-prixgen-blue tracking-tight leading-[1.1]">
          Cost of Production: The Complete Guide to the Formula, Cost Types and Getting Your True Unit Cost with ERP
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed border-l-4 border-prixgen-lightblue pl-4">
          A definitive handbook for CXOs, finance heads, plant heads, and ERP owners on escaping the margin illusion and securing real-time unit economics.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 py-2 border-y border-slate-100">
          <span className="text-slate-900">Karthik S Hatti</span>
          <span>·</span>
          <span>Co-Founder & CBO, Prixgen Tech Solutions Pvt Ltd</span>
          <span>·</span>
          <span>October 2026</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-prixgen-blue"><Clock className="w-3.5 h-3.5" /> 18 min read</span>
          <span>·</span>
          <span className="text-slate-700">For CXOs, Finance Heads, Plant Heads & ERP Owners</span>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-4 pt-2">
          <p className="text-base md:text-lg leading-relaxed">
            Some years ago I sat across the table from the managing director of a mid-sized manufacturer who told me, with complete confidence, that his flagship product earned a <strong>14% margin</strong>. His accountant agreed. His sales team priced every quote on that number.
          </p>
          <p>
            When we finished mapping his actual material consumption, scrap, machine time, and overheads during the ERP blueprint, the real margin on that product was <strong>a little over 6%</strong>. Nobody had been dishonest. The cost sheet had simply been built on a standard formulation from three years earlier, an overhead rate nobody had revisited, and a scrap figure that existed only on paper.
          </p>
          <blockquote className="border-l-4 border-prixgen-blue pl-4 py-2 italic text-slate-800 bg-slate-50 rounded-r-xl">
            &quot;In 23 years of implementing and consulting on ERP across PVC, polymer, paints, chemicals, food processing, dairy, engineering, furniture and many other industries, I have found that most manufacturers know their selling price to the rupee but know their cost of production only approximately. And in a business where raw material can be 70–80% of the cost, <strong>‘approximately’ is where the profit disappears.</strong>&quot;
          </blockquote>
          <p>
            This guide explains what cost of production really includes, the formula and its variations, the different types of cost and how each behaves, two fully worked examples from the shop floor, and the practical levers that bring the number down. Throughout, I will point out where an ERP system earns its keep — and where implementations commonly go wrong.
          </p>
        </div>

        {/* Key Takeaways Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B2545] text-white p-6 md:p-8 space-y-4 shadow-xl border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            <Sparkles className="w-4 h-4" />
            Executive Takeaways
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white">
            Five Fundamentals of Modern Production Costing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-200">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <strong className="text-white block font-bold">1. Stops at the Factory Gate:</strong>
              Direct materials, direct labour, direct expenses, and factory overheads, adjusted for WIP and scrap. Admin and selling belong to cost of sales.
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <strong className="text-white block font-bold">2. Cost Behaviour Matters:</strong>
              Knowing whether a cost is fixed, variable, or semi-variable decides your true break-even volume and the floor price for tender quotes.
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <strong className="text-white block font-bold">3. Material & Yield Dominate:</strong>
              In process industries, resin and chemicals make up 70–80% of costs. A 1% improvement in consumption beats a 10% cut in labour.
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <strong className="text-white block font-bold">4. Real-Time Floor Integration:</strong>
              ERP only delivers true unit cost if BOMs, routings, machine rates, and stock transactions mirror what happens on the physical plant floor.
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS COST OF PRODUCTION & RELATED TERMS */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Conceptual Precision
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            What Is Cost of Production? (Works / Factory Cost)
          </h3>
          <p className="text-slate-600">
            Cost of production is the total expenditure incurred to convert raw materials and components into finished goods ready for sale. It covers everything consumed inside the factory gate:
          </p>
        </div>

        {/* Cost vs Related Terms Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Costing Term</th>
                <th className="py-3 px-4">What It Includes</th>
                <th className="py-3 px-4">Where It Is Used in Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Prime Cost</td>
                <td className="py-3 px-4 font-mono text-xs">Direct Materials + Direct Labour + Direct Expenses</td>
                <td className="py-3 px-4 text-slate-500">Fast snapshot of costs directly traceable to each unit produced</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Conversion Cost</td>
                <td className="py-3 px-4 font-mono text-xs">Direct Labour + Factory Overheads</td>
                <td className="py-3 px-4 text-slate-500">Measuring efficiency of the plant conversion process, independent of fluctuating material prices</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="py-3 px-4 font-black text-prixgen-blue">Cost of Production</td>
                <td className="py-3 px-4 font-mono text-xs font-bold text-prixgen-blue">Prime Cost + Factory Overheads (+ Opening WIP − Closing WIP − Scrap Credit)</td>
                <td className="py-3 px-4 font-semibold text-slate-900">Inventory valuation on balance sheet, product costing, minimum pricing floor</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Cost of Goods Sold (COGS)</td>
                <td className="py-3 px-4 font-mono text-xs">Cost of Production of goods sold (+ Opening FG − Closing FG)</td>
                <td className="py-3 px-4 text-slate-500">Profit & loss statement; gross margin calculation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-900">Total Cost of Sales</td>
                <td className="py-3 px-4 font-mono text-xs">Cost of Production + Admin Overheads + Selling & Distribution</td>
                <td className="py-3 px-4 text-slate-500">Enterprise net margin, comprehensive commercial pricing strategy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. THE BUILDING BLOCKS & FIGURE 1 */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Cost Structure Hierarchy
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            The Building Blocks of Cost of Production
          </h3>
          <p className="text-slate-600">
            The cleanest way to understand cost of production is to build it up layer by layer, following the logic of the Cost Accounting Standards (CAS-4):
          </p>
        </div>

        {/* Figure 1 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/cost-of-production/fig1_building_blocks.png" 
            alt="Layered diagram: direct materials, direct labour and direct expenses form prime cost; prime cost plus factory overheads form cost of production; adding administration and selling overheads gives total cost." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Figure 1: How cost of production is built up, and where it stops
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              1. Direct Materials at Landed Cost
            </h4>
            <p className="text-xs text-slate-600">
              Resin, steel, milk, titanium dioxide, additives. Must include landed costs (freight inward, insurance, non-creditable customs) minus trade discounts. Excludes recoverable input GST.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              2. Direct Labour & Contract Shift Crew
            </h4>
            <p className="text-xs text-slate-600">
              Wages and benefits for line operators, assemblers, and packers. In Indian plants, contract labour paid per shift behaves as a variable cost.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              3. Direct Traceable Expenses
            </h4>
            <p className="text-xs text-slate-600">
              Specific job-work charges (electroplating, heat treatment), per-unit royalties, or dedicated mould hire charges traceable to one job.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              4. Factory Overheads (Shared Plant Costs)
            </h4>
            <p className="text-xs text-slate-600">
              Plant power, machine depreciation, maintenance spares, factory rent, supervisor salaries, and QC lab operations absorbed via work-centre rates.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE FORMULA & MATHEMATICAL RIGOUR */}
      <section className="space-y-6 rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            Cost Accounting Equations
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            The Cost of Production Formula
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl">
            At its simplest, total cost is fixed plus variable costs. For accurate unit costing, cost accountants divide by <strong>good output produced</strong>, not units started:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold">Standard Management Formula</span>
            <div className="text-lg md:text-xl font-mono font-black text-white">
              Total Cost = Fixed Costs + Variable Costs
            </div>
            <div className="text-xs font-mono text-emerald-400">
              Cost Per Unit = Total Cost ÷ Good Units Produced
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold">Full Period Accounting Form (CAS-4)</span>
            <div className="text-xs md:text-sm font-mono font-bold text-slate-200 leading-relaxed">
              Cost of Production = Direct Materials + Direct Labour + Direct Expenses + Factory Overheads + Opening WIP − Closing WIP − Scrap Credit
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
          <strong className="text-amber-300 block font-bold">⚠️ Warning on Faulty Classification:</strong>
          You will encounter articles that mistakenly classify raw material as fixed and supervisory overheads as variable. That is inverted. Raw material is the classic variable cost. Rent, insurance, and supervisor salaries are fixed. Administration costs do not belong in production cost at all.
        </div>
      </section>

      {/* 5. THE 10 TYPES OF PRODUCTION COST */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Cost Behaviour & Lenses
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            The 10 Types of Production Cost
          </h3>
          <p className="text-slate-600">
            Cost behaviour (fixed vs. variable) tells you what happens when volume shifts. Traceability (direct vs. indirect) tells you how cleanly costs assign to SKUs:
          </p>
        </div>

        {/* Figure 2 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/cost-of-production/fig2_matrix.png" 
            alt="Two-by-two matrix of direct and indirect costs against variable and fixed costs with examples in each quadrant." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Figure 2: Two independent lenses — traceability and behaviour — with typical examples
          </figcaption>
        </figure>

        {/* Figure 3 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/cost-of-production/fig3_behaviour.png" 
            alt="Left chart shows fixed, variable and total cost lines against monthly output; right chart shows cost per kg falling from about 122 rupees at 100 tonnes to about 92.5 rupees at 700 tonnes." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Figure 3: Fixed costs stay flat in total but fall per unit as output rises (PVC plant example below)
          </figcaption>
        </figure>

        {/* Figure 4 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/cost-of-production/fig4_product_period.png" 
            alt="Flow diagram showing product costs moving through work in progress and finished goods into cost of goods sold, while period costs go straight to the profit and loss statement." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Figure 4: Product costs wait in inventory until the goods are sold; period costs are expensed immediately
          </figcaption>
        </figure>
      </section>

      {/* 6. INTERACTIVE SIMULATOR: CAPACITY SENSITIVITY */}
      <section className="space-y-6 rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D2FF] uppercase tracking-widest">
              <Sliders className="w-4 h-4" /> Interactive Model
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Volume Sensitivity Simulator
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Drag the monthly production slider to witness how fixed plant overheads (₹34 Lakh/mo) dilutes across volume while variable costs remain pegged at ₹87.64/kg.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15 text-right shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Average Total Cost</span>
            <div className="text-3xl md:text-4xl font-mono font-black text-emerald-400">
              ₹{totalCostOfProductionPerKg.toFixed(2)}
              <span className="text-sm font-normal text-slate-300"> / kg</span>
            </div>
            <div className="text-xs text-sky-200 font-mono mt-1">
              Fixed: ₹{fixedCostPerKg.toFixed(2)} · Variable: ₹{variableCostPerKg.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Volume Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Plant Output: <strong>{outputVolume} Tonnes / Month</strong></span>
            <span>Capacity Utilisation: {Math.round((outputVolume / 700) * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="200" 
            max="700" 
            step="25"
            value={outputVolume}
            onChange={(e) => setOutputVolume(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00A3E0]"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>200t (Severe Under-utilisation)</span>
            <span>500t (Normal Plant Baseline)</span>
            <span>700t (Peak Nameplate Capacity)</span>
          </div>
        </div>

        {/* Impact Callout */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between gap-4">
          <div>
            Dropping volume from 500 tonnes to 300 tonnes adds <strong>₹4.53 per kg</strong> to every single pipe. That is a third of your operating profit vanished without a single vendor price increase.
          </div>
          <div className="text-right shrink-0 font-mono font-bold text-white">
            Total Monthly Spend: ₹{totalProductionCostLakh.toFixed(2)} Lakh
          </div>
        </div>
      </section>

      {/* 7. WORKED EXAMPLE 1: PVC PIPE PLANT */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Factory Floor Case Study
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            Worked Example 1: Monthly Cost of Production for a PVC Pipe Plant
          </h3>
          <p className="text-slate-600">
            Prixgen has implemented ERP for more than ten PVC pipe and polymer manufacturers. Below is a real-world model for an extrusion plant producing 500 tonnes/month:
          </p>
        </div>

        {/* Figure 5 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/cost-of-production/fig5_pvc_breakdown.png" 
            alt="Horizontal bar chart: PVC resin 73.68 rupees per kg (78%), filler stabiliser and additives 6.89 (7%), power 3.57 (4%), direct labour 2.40 (3%), packing 1.10 (1%), factory fixed overheads 6.80 (7%)." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Figure 5: Where each rupee of the PVC pipe cost goes
          </figcaption>
        </figure>

        {/* Monthly Cost Sheet Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Cost Head</th>
                <th className="py-3 px-4 text-right">₹ Lakh / Month</th>
                <th className="py-3 px-4 text-right">₹ / kg</th>
                <th className="py-3 px-4 text-right">% of Production Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-900">Direct Materials (Resin + Additives + 1.5% Net Loss)</td>
                <td className="py-2.5 px-4 font-mono text-right">402.84</td>
                <td className="py-2.5 px-4 font-mono text-right font-bold text-prixgen-blue">80.57</td>
                <td className="py-2.5 px-4 font-mono text-right font-bold">85.3%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Extrusion Power (0.42 kWh/kg × ₹8.50)</td>
                <td className="py-2.5 px-4 font-mono text-right">17.85</td>
                <td className="py-2.5 px-4 font-mono text-right">3.57</td>
                <td className="py-2.5 px-4 font-mono text-right">3.8%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Direct Labour (Contract Operators per shift)</td>
                <td className="py-2.5 px-4 font-mono text-right">12.00</td>
                <td className="py-2.5 px-4 font-mono text-right">2.40</td>
                <td className="py-2.5 px-4 font-mono text-right">2.5%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Packing Consumables (Sockets, Rings, Ink, Caps)</td>
                <td className="py-2.5 px-4 font-mono text-right">5.50</td>
                <td className="py-2.5 px-4 font-mono text-right">1.10</td>
                <td className="py-2.5 px-4 font-mono text-right">1.2%</td>
              </tr>
              <tr className="bg-slate-50 font-bold text-slate-900">
                <td className="py-2.5 px-4">TOTAL VARIABLE PRODUCTION COST</td>
                <td className="py-2.5 px-4 font-mono text-right">438.19</td>
                <td className="py-2.5 px-4 font-mono text-right text-emerald-600">87.64</td>
                <td className="py-2.5 px-4 font-mono text-right">92.8%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Factory Lease & Shed Depreciation</td>
                <td className="py-2.5 px-4 font-mono text-right">6.00</td>
                <td className="py-2.5 px-4 font-mono text-right">1.20</td>
                <td className="py-2.5 px-4 font-mono text-right">1.3%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Supervisory, QC & Maintenance Salaries</td>
                <td className="py-2.5 px-4 font-mono text-right">9.50</td>
                <td className="py-2.5 px-4 font-mono text-right">1.90</td>
                <td className="py-2.5 px-4 font-mono text-right">2.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Machine Depreciation (Extruders, Dies, Mixers)</td>
                <td className="py-2.5 px-4 font-mono text-right">14.00</td>
                <td className="py-2.5 px-4 font-mono text-right">2.80</td>
                <td className="py-2.5 px-4 font-mono text-right">3.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">AMC, Tooling Spares & Routine Repairs</td>
                <td className="py-2.5 px-4 font-mono text-right">3.00</td>
                <td className="py-2.5 px-4 font-mono text-right">0.60</td>
                <td className="py-2.5 px-4 font-mono text-right">0.6%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Plant & Fire Insurance</td>
                <td className="py-2.5 px-4 font-mono text-right">1.50</td>
                <td className="py-2.5 px-4 font-mono text-right">0.30</td>
                <td className="py-2.5 px-4 font-mono text-right">0.3%</td>
              </tr>
              <tr className="bg-blue-50/80 font-black text-prixgen-blue">
                <td className="py-3 px-4">TOTAL COST OF PRODUCTION</td>
                <td className="py-3 px-4 font-mono text-right">472.19</td>
                <td className="py-3 px-4 font-mono text-right text-base">94.44</td>
                <td className="py-3 px-4 font-mono text-right">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. MARGINAL COST & THE BULK ORDER TRAP */}
      <section className="space-y-6 rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            Commercial Decision Science
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Marginal Cost & The Bulk-Order Trap
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl">
            A customer offers ₹95/kg for a 50-tonne bulk order. Your sales head sees an average cost of ₹94.44 and wants to accept. Are you making money or losing money?
          </p>
        </div>

        {/* Interactive Scenario Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={() => setCapacityScenario('full')}
            className={`p-4 rounded-xl border text-left transition-all flex-1 ${
              capacityScenario === 'full'
                ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-white">Scenario A: Lines Already Full (600t)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Requires Step Cost</span>
            </div>
            <p className="text-xs text-slate-300">
              Needs hired 3rd line (₹4 Lakh) + ₹1.50/kg overtime. Marginal cost jumps to <strong>₹97.14/kg</strong>.
            </p>
          </button>

          <button
            onClick={() => setCapacityScenario('idle')}
            className={`p-4 rounded-xl border text-left transition-all flex-1 ${
              capacityScenario === 'idle'
                ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-white">Scenario B: Idle Line Available (400t)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Pure Variable</span>
            </div>
            <p className="text-xs text-slate-300">
              No extra fixed cost needed. Marginal cost is only the variable cost of <strong>₹87.64/kg</strong>.
            </p>
          </button>
        </div>

        {/* Live Calculation Display */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Order Price</span>
              <span className="text-xl font-bold font-mono text-white">₹{offeredPrice.toFixed(2)}/kg</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">True Marginal Cost</span>
              <span className={`text-xl font-bold font-mono ${capacityScenario === 'full' ? 'text-rose-400' : 'text-emerald-400'}`}>
                ₹{marginalCostPerKg.toFixed(2)}/kg
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Unit Gain/Loss</span>
              <span className={`text-xl font-bold font-mono ${isOrderProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isOrderProfitable ? '+' : ''}{(offeredPrice - marginalCostPerKg).toFixed(2)}/kg
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Net Batch Result</span>
              <span className={`text-xl font-bold font-mono ${isOrderProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isOrderProfitable ? '+' : ''}₹{orderNetContributionLakh.toFixed(2)} Lakh
              </span>
            </div>
          </div>

          <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-3 ${
            isOrderProfitable 
              ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30' 
              : 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
          }`}>
            {isOrderProfitable ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span><strong>ACCEPT ORDER:</strong> When excess capacity exists, selling at ₹95 contributes ₹3.68 Lakh towards fixed plant overheads.</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span><strong>REJECT OR RENEGOTIATE:</strong> Because lines are full, hired equipment pushes marginal cost to ₹97.14. You would lose ₹1.07 Lakh on this deal!</span>
              </>
            )}
          </div>
        </div>

        {/* Figure 6 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 my-4">
          <img 
            src="/images/blog/cost-of-production/fig6_breakeven.png" 
            alt="Line chart of revenue and total cost against monthly volume, crossing at about 224 tonnes per month." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-white/5 border-t border-white/10 text-xs text-slate-400 font-medium text-center">
            Figure 6: Break-even chart for the PVC plant (Break-even at 224 tonnes / month)
          </figcaption>
        </figure>
      </section>

      {/* 9. WORKED EXAMPLE 2: PAINT BATCH COSTING */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Chemical & Process Industry
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            Worked Example 2: Batch Costing in a Paint / Chemical Plant
          </h3>
          <p className="text-slate-600">
            In paints, chemicals, and pharmaceuticals, costs are tracked per batch. Two factors dictate accuracy: <strong>productive machine-hour rates</strong> and <strong>yield loss</strong>.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h4 className="font-bold text-base text-slate-900">
            Deriving the High-Speed Disperser Hourly Rate
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The disperser incurs ₹2.60 Lakh monthly fixed overheads (depreciation, maintenance, space, supervision). After cleaning and color changeovers, it delivers <strong>230 productive hours</strong> (not 720 calendar hours):
          </p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
            <div>Fixed Machine Rate = ₹2,60,000 ÷ 230 hrs = <strong>₹1,130 / hr</strong></div>
            <div>Variable (Power ₹300 + Cleaning Solvents ₹20) = <strong>₹320 / hr</strong></div>
            <div className="text-prixgen-blue font-bold">Total Work Centre Rate = ₹1,450 / machine hour</div>
          </div>
        </div>

        {/* 2000L Interior Emulsion Batch Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Batch Cost Element</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4 text-right">Rate (₹)</th>
                <th className="py-3 px-4 text-right">Total Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-bold">Titanium Dioxide (TiO2)</td>
                <td className="py-2.5 px-4 font-mono">380 kg</td>
                <td className="py-2.5 px-4 font-mono text-right">265.00</td>
                <td className="py-2.5 px-4 font-mono text-right font-bold">1,00,700</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold">Acrylic Binder Emulsion</td>
                <td className="py-2.5 px-4 font-mono">520 kg</td>
                <td className="py-2.5 px-4 font-mono text-right">145.00</td>
                <td className="py-2.5 px-4 font-mono text-right font-bold">75,400</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Extenders, Biocide & Dispersing Additives</td>
                <td className="py-2.5 px-4 font-mono">315 kg</td>
                <td className="py-2.5 px-4 font-mono text-right">—</td>
                <td className="py-2.5 px-4 font-mono text-right">24,370</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Water & In-process Solvent</td>
                <td className="py-2.5 px-4 font-mono">820 kg</td>
                <td className="py-2.5 px-4 font-mono text-right">2.20</td>
                <td className="py-2.5 px-4 font-mono text-right">1,805</td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="py-2.5 px-4">Direct Materials & Formulation Subtotal</td>
                <td className="py-2.5 px-4 font-mono">2,035 kg</td>
                <td className="py-2.5 px-4 text-right">—</td>
                <td className="py-2.5 px-4 font-mono text-right text-prixgen-blue">2,02,275</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">High-Speed Disperser Processing</td>
                <td className="py-2.5 px-4 font-mono">3.5 hrs</td>
                <td className="py-2.5 px-4 font-mono text-right">1,450.00</td>
                <td className="py-2.5 px-4 font-mono text-right">5,075</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Filling & Packaging Line</td>
                <td className="py-2.5 px-4 font-mono">2.0 hrs</td>
                <td className="py-2.5 px-4 font-mono text-right">880.00</td>
                <td className="py-2.5 px-4 font-mono text-right">1,760</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Direct Line Labour & Batch QC Verification</td>
                <td className="py-2.5 px-4 font-mono">14 hrs + QC</td>
                <td className="py-2.5 px-4 font-mono text-right">—</td>
                <td className="py-2.5 px-4 font-mono text-right">6,440</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">5-Litre Containers, Lids & Barcoded Labels</td>
                <td className="py-2.5 px-4 font-mono">390 nos</td>
                <td className="py-2.5 px-4 font-mono text-right">92.00</td>
                <td className="py-2.5 px-4 font-mono text-right">35,880</td>
              </tr>
              <tr className="bg-blue-50/80 font-black text-prixgen-blue">
                <td className="py-3 px-4">TOTAL BATCH COST</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4 text-right">—</td>
                <td className="py-3 px-4 font-mono text-right text-base">₹2,53,595</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The 2.5% Loss Lesson */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs md:text-sm space-y-2">
          <div className="font-bold flex items-center gap-2 text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            The 2.5% Yield Illusion
          </div>
          <p>
            Good output after 2.5% loss (tank hold-up, filter cleanings, QC samples) is <strong>1,950 litres</strong>. 
            Cost per litre is <strong>₹130.05</strong>. If the cost sheet divided by the planned 2,000 litres, cost would falsely show as <strong>₹126.80</strong> — understated by ₹3.25 a litre. Across annual production, that discrepancy destroys profit.
          </p>
        </div>
      </section>

      {/* 10. TEN PROVEN LEVERS & WATERFALL REDUCTION */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600">
            Strategic Margin Expansion
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            How to Reduce Your Cost of Production: Ten Proven Levers
          </h3>
          <p className="text-slate-600">
            Ranked by size of financial impact based on Prixgen&apos;s shop-floor manufacturing engagements:
          </p>
        </div>

        {/* Figure 7 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white my-6">
          <img 
            src="/images/blog/cost-of-production/fig7_waterfall.png" 
            alt="Waterfall chart showing reductions for resin consumption, process loss, power, volume and supplier consolidation." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium text-center">
            Figure 7: Five modest improvements take the PVC plant from ₹94.44 to ₹91.61 per kg (saving ₹1.7 Crore/year!)
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { num: "01", title: "Engineer Formulation & BOM", desc: "Review wall thickness tolerances and substitute costly additives with quality validation." },
            { num: "02", title: "Measure & Improve Yield", desc: "Process loss falling from 1.5% to 1.0% saves ₹25 Lakh a year at 500 tonnes/month." },
            { num: "03", title: "Consolidate Strategic Suppliers", desc: "Earn volume tier discounts and negotiate formula pricing tied to commodity indices." },
            { num: "04", title: "Cut Energy Cost Per Unit", desc: "Sub-meter major extrusion lines; track kWh per kg KPI rather than lump-sum electric bills." },
            { num: "05", title: "Raise OEE (Overall Equipment Effectiveness)", desc: "Eliminate downtime with quick-changeover SMED techniques for tooling and dies." },
            { num: "06", title: "Condition-Based Maintenance", desc: "Trigger preventive maintenance based on actual running hours via machine IoT integration." },
            { num: "07", title: "Optimise Floor Layout", desc: "Position raw material stores adjacent to extruders to eliminate wasteful forklift mileage." },
            { num: "08", title: "Build Quality In, Not Inspect Out", desc: "Use statistical process control at early blending rather than scraping finished rejected pipes." },
            { num: "09", title: "Right-Size RM & WIP Inventory", desc: "Deploy MRP and lead-time reorder points to cut holding charges without stock-outs." },
            { num: "10", title: "Fill Capacity Profitably", desc: "Use marginal costing to accept incremental volume without eroding the master price list." }
          ].map(lever => (
            <div key={lever.num} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center gap-2 font-mono font-bold text-xs text-prixgen-blue">
                <span>LEVER {lever.num}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{lever.title}</h4>
              <p className="text-xs text-slate-600">{lever.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. HOW ERP GIVES YOU TRUE REAL-TIME COST & FIGURE 8 */}
      <section className="space-y-6 rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl border border-slate-800">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            Architecture & Traceability
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            How an Integrated ERP Delivers True Cost of Production
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl">
            Spreadsheets can compute a static cost sheet. What they cannot do is keep it accurate, order by order, as resin prices move, machine speeds fluctuate, and scrap rises.
          </p>
        </div>

        {/* Figure 8 Embed */}
        <figure className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 my-6">
          <img 
            src="/images/blog/cost-of-production/fig8_erp_flow.png" 
            alt="Flow diagram: bill of materials, routings and purchase receipts produce the standard cost; manufacturing orders with actual issues, scrap and time produce the actual cost; the two are compared in a variance report while actual cost flows to finished goods valuation and cost of goods sold." 
            className="w-full h-auto object-cover"
          />
          <figcaption className="px-6 py-3 bg-white/5 border-t border-white/10 text-xs text-slate-400 font-medium text-center">
            Figure 8: How cost flows through an integrated manufacturing ERP (Odoo Enterprise)
          </figcaption>
        </figure>

        {/* 6 Questions to Ask an ERP Partner */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h4 className="font-black text-lg text-white">
            6 Critical Questions to Ask Any ERP Partner Before Implementing:
          </h4>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
            {[
              "Will my product cost include machine and labour overheads through work-centre hourly rates, or only raw materials?",
              "How will scrap, regrind, by-products and net yield be recorded on the physical shop floor, and by whom?",
              "How will import landed costs (ocean freight, customs, port handling) be captured and allocated across shipments?",
              "Which inventory valuation method (FIFO, AVCO, Standard) will each product category use, and why?",
              "Will I get price, usage, and efficiency variances by order and product family without manual month-end spreadsheets?",
              "Who in my team will own cost-master maintenance after go-live, and how often will machine rates be reviewed?"
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#00A3E0]/20 text-[#00D2FF] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. 90-DAY IMPLEMENTATION ROADMAP */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Deployment Playbook
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            A Practical 90-Day Roadmap to a Reliable Cost of Production
          </h3>
          <p className="text-slate-600">
            The proven 4-phase rollout methodology Prixgen uses with manufacturing enterprises:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              phase: "Phase 1: Baseline",
              weeks: "Weeks 1–3",
              activities: "Map product families, process flows, and cost centres. Collect 3–6 months of actual consumption, output, scrap, power, and overhead ledger data.",
              output: "Current-state cost gap audit & baseline cost sheets"
            },
            {
              phase: "Phase 2: Master Data",
              weeks: "Weeks 4–6",
              activities: "Validate BOM formulations against shop-floor trials. Define routings and work centres. Derive productive machine-hour and labour rates.",
              output: "Clean master BOMs, routings & hourly rates"
            },
            {
              phase: "Phase 3: Transactions",
              weeks: "Weeks 7–9",
              activities: "Enable real-time material issue, scrap, by-product, and time recording on orders. Configure landed costs and automated inventory valuation.",
              output: "Actual cost captured order by order"
            },
            {
              phase: "Phase 4: Control",
              weeks: "Weeks 10–12",
              activities: "Set standards, launch variance reporting (price, usage, efficiency), assign operational owners, and formalise monthly costing reviews.",
              output: "Cost of production as a managed executive KPI"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-md transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-prixgen-lightblue uppercase tracking-widest">
                  {item.weeks}
                </span>
                <h4 className="font-bold text-base text-slate-900">{item.phase}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.activities}</p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-xs font-mono font-bold text-prixgen-blue">
                ✓ {item.output}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-prixgen-blue">
            Expert Answers
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-prixgen-blue tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-prixgen-blue' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 14. EXECUTIVE CTA & BRIEFING */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-prixgen-blue to-[#001f3f] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-8">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D2FF] uppercase tracking-widest">
            <Factory className="w-4 h-4" />
            Manufacturing ERP & Costing Health-Check
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Know Your True Cost of Production Down to the Rupee
          </h3>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            Prixgen Tech Solutions is an Odoo Gold Partner headquartered in Mysuru, with 100+ ERP implementations across 18+ industries, including 10+ PVC & polymer processors, paints, chemicals, and precision manufacturing.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="mailto:karthik@prixgen.com?subject=Manufacturing%20Cost%20of%20Production%20Health-Check"
              className="px-6 py-3.5 rounded-xl bg-white text-prixgen-blue font-black hover:bg-sky-100 shadow-xl transition-all flex items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              Write to karthik@prixgen.com
            </a>
            
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all text-sm backdrop-blur"
            >
              Request Plant Costing Audit
            </button>
          </div>
        </div>

        {/* Footnote Author Credits */}
        <div className="pt-6 border-t border-white/15 text-xs text-slate-300 font-mono space-y-1">
          <div><strong>About the Author:</strong> Karthik S Hatti is Co-Founder & Chief Business Officer of Prixgen Tech Solutions Pvt Ltd. Over 23 years he has guided end-to-end ERP implementations across PVC, polymer, plastics, chemicals, paints, automotive, dairy, and food processing.</div>
          <div>Prixgen Tech Solutions Pvt Ltd · Odoo Gold Partner · Mysuru & Bengaluru</div>
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
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
                  Manufacturing Cost Engineering
                </span>
                <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  Schedule a Costing Health-Check
                </h4>
                <p className="text-xs text-slate-500">
                  Discuss your plant&apos;s bill of materials, yield loss, machine-hour rates, and Odoo costing architecture with our senior manufacturing consultants.
                </p>
              </div>

              <LeadCaptureForm source="Blog: Cost of Production Complete Guide" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </article>
  );
}
