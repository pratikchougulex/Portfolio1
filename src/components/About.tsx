import { motion } from 'motion/react';
import { GraduationCap, Code, LineChart, Award, CheckCircle2, FileSpreadsheet, ArrowUpRight } from 'lucide-react';

export default function About() {
  const cards = [
    {
      icon: GraduationCap,
      title: "MSc in Finance",
      institution: "University College Cork (UCC)",
      period: "Sep 2025 – Present",
      description:
        "Specializing in Investment & Asset Management. Coursework covers Financial Reporting, Corporate Finance, Risk Management, Investment Analysis, Financial Statement Analysis, Statistics, and Advanced Financial Modelling.",
      color: "from-indigo-500/20 to-indigo-600/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-100 dark:bg-indigo-950/60",
      badge: "In Progress (Ireland)"
    },
    {
      icon: Code,
      title: "B.Eng in Computer Engineering",
      institution: "Savitribai Phule Pune University",
      period: "Sep 2020 – Apr 2024",
      description:
        "Rigorous technical foundation enabling automated data pipelines, custom algorithmic models, high-volume SQL queries, and Python automation (Pandas, NumPy, Matplotlib) that eliminate manual reporting bottlenecks.",
      color: "from-cyan-500/20 to-cyan-600/10",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-100 dark:bg-cyan-950/60",
      badge: "Engineering Core"
    },
    {
      icon: LineChart,
      title: "Quantitative Valuation & Modeling",
      institution: "Valuation & Strategy",
      period: "Core Competency",
      description:
        "Extensive experience in Discounted Cash Flow (DCF), Comparable Company Analysis, 20+ Financial Ratios (ROE, Current Ratio, D/E, Asset Turnover), Sensitivity Analysis, and Quarter-End Close reconciliation.",
      color: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/60",
      badge: "Financial Analysis"
    },
    {
      icon: Award,
      title: "Professional Certifications",
      institution: "CFI & IBM",
      period: "Accredited",
      description:
        "Certified in Financial Analysis and Modelling (Corporate Finance Institute - CFI) and Data Visualization Using Python (IBM), delivering institutional-grade accuracy, forecasting discipline, and board-ready dashboards.",
      color: "from-amber-500/20 to-amber-600/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-950/60",
      badge: "Certified"
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background accent lines */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Background & Profile
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Bridging Financial Strategy & Engineering Fluency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Combining postgraduate investment acumen with computer engineering rigor to build automated financial models, management dashboards, and high-conviction valuation insights.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden"
            >
              {/* Subtle card glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center ${card.iconColor} shadow-inner group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">
                  {card.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                {card.institution} • <span className="text-slate-400 font-normal">{card.period}</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Value Proposition Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Ready to deliver immediate value to your finance team.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether diagnosing root causes in complex variance reporting, automating monthly close models, or presenting executive-level valuation memos, I operate with structured discipline, speed, and precision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 shadow-md transition-all hover:scale-105"
              >
                Schedule an Interview
                <ArrowUpRight className="ml-1.5 w-4 h-4" />
              </a>
              <a
                href="/Pratik_Chougule_CV.pdf"
                download="Pratik_Chougule_CV.pdf"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/30 transition-all hover:scale-105"
              >
                <FileSpreadsheet className="mr-1.5 w-4 h-4" />
                Download Complete CV
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
