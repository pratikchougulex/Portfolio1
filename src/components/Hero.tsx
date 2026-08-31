import { motion, type Variants } from 'motion/react';
import { ArrowRight, Download, TrendingUp, BarChart3, ShieldCheck, MapPin, Mail } from 'lucide-react';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-600/10 dark:from-indigo-500/25 dark:to-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-600/20 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute -bottom-10 right-1/3 w-72 h-72 bg-emerald-400/15 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Main Hero Content */}
          <motion.div
            className="lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Live Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center py-1.5 px-3.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                <span className="relative flex h-2.5 w-2.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Available for Roles in Ireland & EU
              </span>
            </motion.div>

            {/* Name & Designation — Large Intro */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Pratik{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-cyan-400">
                  Chougule
                </span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300 tracking-wide">
                Financial Analyst{' '}
                <span className="text-slate-300 dark:text-slate-600 mx-1">|</span>{' '}
                MSc Finance (UCC){' '}
                <span className="text-slate-300 dark:text-slate-600 mx-1">|</span>{' '}
                Computer Engineer
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 leading-[1.2] mb-6"
            >
              Transforming Complex Data into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-cyan-400">
                High-Alpha Financial Strategy
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-8 leading-relaxed font-normal"
            >
              Hi, I'm <strong className="font-semibold text-slate-900 dark:text-white">Pratik Chougule,</strong> an analytically driven finance professional pursuing an <strong className="text-slate-900 dark:text-white">MSc in Finance (UCC)</strong> with a <strong className="text-slate-900 dark:text-white">Computer Engineering foundation</strong>. Specializing in valuation modeling, ratio benchmarking, and portfolio risk optimization.
            </motion.p>

            {/* Quick Contact & Location Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
              <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-md">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Limerick / Cork / Dublin, Ireland
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> CFI Certified Financial Modeler
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/Pratik_Chougule_CV.pdf"
                download="Pratik_Chougule_CV.pdf"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="mr-1.5 w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Interactive Visual Right Hero Showcase Card */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Glow backing */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10 transform rotate-1" />

            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">

              {/* Header Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-400 tracking-wider">
                  MODEL_ANALYTICS.PY
                </span>
              </div>

              {/* Financial Performance Highlights */}
              <div className="py-6 space-y-4">
                {/* Stat 1 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800/90 shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Equity Projection</p>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">11.2% CAGR Forecast</h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md">
                      +€10,000 Model
                    </span>
                  </div>
                  {/* Progress bar visual */}
                  <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[78%] rounded-full" />
                  </div>
                </motion.div>

                {/* Stat 2 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800/90 shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Portfolio Risk Frontier</p>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">18% Sharpe Ratio Lift</h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded-md">
                      -12% Volatility
                    </span>
                  </div>
                  {/* Progress bar visual */}
                  <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-[86%] rounded-full" />
                  </div>
                </motion.div>

                {/* Stat 3 */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-center">
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Ratios Evaluated</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">20+ Metrics</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-center">
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Close Variances</span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">0 at Handoff</span>
                  </div>
                </div>
              </div>

              {/* Bottom live indicator */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  Real-time Valuation Engine
                </span>
                <span className="font-mono text-[11px] text-slate-400">UCC • CFI • B.Eng</span>
              </div>
            </div>

            {/* Floating micro badges */}
            <motion.div
              className="absolute -bottom-5 -left-4 bg-white dark:bg-slate-900 py-2 px-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200 animate-float"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Python & SQL Automations</span>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-2 bg-white dark:bg-slate-900 py-2 px-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200 animate-float-delayed"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>DCF & Comparable Valuations</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
