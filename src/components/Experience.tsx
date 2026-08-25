import { motion } from 'motion/react';
import { Briefcase, Calendar, CheckCircle2, ShieldCheck, TrendingUp, Building2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: "Investment Banking Virtual Experience Program",
      company: "Citi (via Forage)",
      period: "Apr 2026",
      type: "Simulation & Financial Case Study",
      summary:
        "Rigorous, skills-based simulation program covering institutional investment banking analysis, financial modeling, valuation, and quarter-end reporting discipline.",
      deliverables: [
        {
          title: "Variance & Cost Discrepancy Investigation",
          detail:
            "Conducted root-cause variance analysis on unaligned financial datasets, reconciling complex accounting discrepancies and delivering clean reporting with zero unresolved variances at handoff."
        },
        {
          title: "Valuation & Investment Memos",
          detail:
            "Performed comprehensive Discounted Cash Flow (DCF) valuation and Comparable Company Analysis (Trading & Transaction multiples) to establish intrinsic valuation bounds for target enterprises."
        },
        {
          title: "Close Discipline & Multi-Stakeholder Reporting",
          detail:
            "Prepared and reconciled quarterly forecasting packages under tight turnaround windows, mirroring corporate finance quarter-end close governance."
        }
      ],
      skills: ["DCF Valuation", "Comparable Company Analysis", "Variance Investigation", "Forecasting", "Financial Reconciliation"]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-50/70 dark:bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Practical Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Corporate Finance & Banking Simulations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Applying institutional-grade valuation frameworks and forensic reconciliation to corporate datasets.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 sm:pl-10 pb-12 border-l-2 border-indigo-500/30 dark:border-indigo-500/30 last:border-0 last:pb-0"
            >
              {/* Timeline Indicator Pin */}
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-950 shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>

              {/* Main Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1 block">
                      {exp.company} • <span className="text-slate-500 dark:text-slate-400 font-normal">{exp.type}</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Key Deliverables */}
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                  Core Deliverables & Impact
                </h4>

                <div className="space-y-4 mb-8">
                  {exp.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                            {item.title}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
