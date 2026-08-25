import { motion } from 'motion/react';
import { TrendingUp, BarChart3, ShieldCheck, Database, Award, CheckCircle } from 'lucide-react';

export default function Trust() {
  const highlights = [
    {
      icon: TrendingUp,
      title: "11.2% Projected CAGR",
      subtitle: "5-Yr Equity Allocation Model",
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-900/50"
    },
    {
      icon: BarChart3,
      title: "18% Sharpe Lift",
      subtitle: "12% Volatility Reduction",
      accent: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      border: "border-indigo-200 dark:border-indigo-900/50"
    },
    {
      icon: Database,
      title: "Dual Engineering & Finance",
      subtitle: "B.Eng CS + MSc Finance (UCC)",
      accent: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-950/40",
      border: "border-cyan-200 dark:border-cyan-900/50"
    },
    {
      icon: ShieldCheck,
      title: "CFI & IBM Certified",
      subtitle: "Financial Analysis & Modeling",
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-900/50"
    }
  ];

  return (
    <section className="py-10 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex items-center space-x-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border ${item.border} shadow-sm hover:shadow-md transition-all`}
            >
              <div className={`p-3.5 rounded-xl ${item.bg} ${item.accent} flex-shrink-0`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
