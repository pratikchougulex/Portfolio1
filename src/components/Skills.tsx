import { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Database, CheckCircle, Search, ShieldCheck, Terminal, Cpu, Layers } from 'lucide-react';

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState('');

  const skillCategories = [
    {
      title: "Finance & Investment Analysis",
      subtitle: "Valuation, Reporting & Corporate Governance",
      icon: DollarSign,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/60",
      skills: [
        { name: "KPI & Management Metrics Reporting", level: "Advanced" },
        { name: "Cost & Financial Ratio Analysis", level: "Advanced" },
        { name: "Financial Modelling & Forecasting", level: "Advanced" },
        { name: "Financial Statement Analysis", level: "Advanced" },
        { name: "Comparable Company & DCF Valuation", level: "Advanced" },
        { name: "Quarter-End Close Support & Reconciliation", level: "Proficient" },
        { name: "Modern Portfolio Theory & Asset Allocation", level: "Advanced" },
        { name: "Risk Management & Sensitivity Analysis", level: "Advanced" }
      ]
    },
    {
      title: "Data, Analytics & Engineering Tools",
      subtitle: "Automation, Pipelines & Quantitative Dashboards",
      icon: Database,
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-50 dark:bg-cyan-950/60",
      skills: [
        { name: "Advanced Excel (VLOOKUP, XLOOKUP, Pivot, Solver)", level: "Expert" },
        { name: "SQL (Complex Queries, Joins, Aggregations)", level: "Advanced" },
        { name: "Python (Pandas, NumPy, Matplotlib, Seaborn)", level: "Advanced" },
        { name: "Power BI Interactive Dashboards", level: "Proficient" },
        { name: "Bloomberg Terminal", level: "Competent" },
        { name: "Data Pipeline Automation", level: "Advanced" },
        { name: "Time Series & Regression Modeling", level: "Advanced" }
      ]
    },
    {
      title: "Core Leadership & Execution",
      subtitle: "Communication, Cross-Functional Agility",
      icon: CheckCircle,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60",
      skills: [
        { name: "Analytical & Complex Problem Solving", level: "High Mastery" },
        { name: "Business Partnering & Executive Presentations", level: "High Mastery" },
        { name: "Attention to Detail & Forensic Verification", level: "High Mastery" },
        { name: "Fast-Paced Adaptability & High Ownership", level: "High Mastery" },
        { name: "Cross-Functional Collaboration", level: "High Mastery" },
        { name: "Deadline-Driven Delivery Under Pressure", level: "High Mastery" }
      ]
    }
  ];

  const filteredCategories = skillCategories.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.skills.length > 0);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Competencies & Toolset
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Financial Modeling & Technical Mastery
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A comprehensive matrix of institutional finance skills, engineering toolkits, and data science frameworks.
          </p>

          {/* Quick Search Input */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. DCF, Python, SQL, Excel)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-indigo-400/40 dark:hover:border-indigo-500/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center space-x-3.5 mb-2">
                  <div className={`p-3 rounded-2xl ${cat.iconBg} ${cat.iconColor} shadow-inner`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-200/80 dark:bg-slate-800/80 my-5" />

                <ul className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 shadow-xs hover:scale-[1.01] transition-transform"
                    >
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 flex-shrink-0 ml-2">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No matching skills found for "{searchTerm}".
          </div>
        )}

      </div>
    </section>
  );
}
