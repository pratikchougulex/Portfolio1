import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, BarChart2, PieChart, Layers, CheckCircle2, FileText, ArrowRight, Code, Database } from 'lucide-react';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'valuation' | 'quantitative'>('all');

  const projects = [
    {
      id: "equity-valuation",
      title: "Equity Investment Analysis & Financial Statement Evaluation",
      date: "Feb 2026",
      category: "valuation",
      categoryLabel: "Equity Valuation & Financial Modeling",
      description:
        "Comprehensive fundamental and valuation analysis benchmarking sector performance across 6 publicly listed companies over a 5-year historical horizon to surface cost structures, operating efficiencies, and margin drivers.",
      metrics: "€10,000 allocation projecting 11.2% CAGR",
      icon: TrendingUp,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/60",
      tags: ["DCF Valuation", "Financial Statement Analysis", "20+ Ratios", "Python (Pandas)", "SQL", "Excel Models", "Sensitivity Tables"],
      highlights: [
        "Benchmarked sector performance across 6 publicly listed enterprises over a 5-year period to isolate key cost drivers and revenue quality.",
        "Computed & interpreted 20+ comprehensive financial ratios (ROE, Current Ratio, Debt-to-Equity, Asset Turnover, Operating Margins) for liquidity & profitability profiling.",
        "Engineered multi-scenario Excel valuation models combined with Python (Pandas, Matplotlib) visual dashboards, translating complex raw tabular data into intuitive executive reporting.",
        "Delivered a concrete €10,000 equity portfolio recommendation projecting an 11.2% compound annual return over 5 years."
      ],
      methodology: "DCF (Discounted Cash Flow), Multiples Benchmarking (P/E, EV/EBITDA), Dupont Analysis."
    },
    {
      id: "portfolio-optimization",
      title: "Portfolio Optimisation & Alternative Investments Analysis",
      date: "Nov 2025",
      category: "quantitative",
      categoryLabel: "Quantitative Asset Allocation & Risk",
      description:
        "Applied Modern Portfolio Theory (MPT) and multi-factor regression analysis across 36 months of historical return data covering 5 distinct asset classes to derive an optimal risk-adjusted allocation frontier.",
      metrics: "12% Volatility Reduction | 18% Sharpe Ratio Lift",
      icon: BarChart2,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-950/60",
      tags: ["Modern Portfolio Theory", "Sharpe Ratio", "Regression Analysis", "Asset Allocation", "Python", "Risk Management"],
      highlights: [
        "Processed 36 months of empirical multi-asset historical returns across equities, fixed income, commodities, and alternative assets.",
        "Conducted multi-factor regression analysis to estimate systematic beta exposure and isolate idiosyncratic risk drivers.",
        "Engineered the optimal efficient frontier curve, achieving an 18% improvement in Sharpe Ratio and a 12% reduction in overall portfolio volatility.",
        "Surfaced actionable cost optimization and rebalancing thresholds for institutional multi-asset portfolios."
      ],
      methodology: "Mean-Variance Optimization, Efficient Frontier Modeling, OLS Regression Factor Decomposition."
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-slate-50/70 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Institutional Financial Analytics
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            End-to-end valuation models, multi-asset portfolio optimizations, and quantitative data pipelines.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('valuation')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'valuation'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Valuation & Ratios
            </button>
            <button
              onClick={() => setActiveTab('quantitative')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'quantitative'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Portfolio & Risk
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/50">
                      {project.categoryLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {project.date}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${project.iconBg} ${project.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                      <project.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Outcome Highlight Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-cyan-50/50 dark:from-indigo-950/50 dark:to-cyan-950/30 border border-indigo-100 dark:border-indigo-900/50 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                      Validated Analytical Outcome
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {project.metrics}
                    </span>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-3 mb-8">
                    {project.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tags & Methodology */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-300 font-semibold">Methodology: </strong>
                    {project.methodology}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
