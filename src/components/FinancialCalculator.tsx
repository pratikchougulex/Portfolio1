import { useState, useId } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Sliders, Shield, PieChart, Sparkles, RefreshCw } from 'lucide-react';

export default function FinancialCalculator() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [cagr, setCagr] = useState<number>(11.2);
  const [years, setYears] = useState<number>(5);
  const [equityMix, setEquityMix] = useState<number>(65);

  const principalInputId = useId();
  const cagrInputId = useId();
  const yearsInputId = useId();
  const equityMixInputId = useId();

  // Financial calculations
  const futureValue = principal * Math.pow(1 + cagr / 100, years);
  const totalGain = futureValue - principal;
  const percentageGain = ((futureValue - principal) / principal) * 100;
  
  // Modelled portfolio risk metrics based on equity / alternative allocation
  const estimatedVolatility = (22 - (100 - equityMix) * 0.14).toFixed(1);
  const estimatedSharpe = (1.15 + (cagr / 100) * 0.65).toFixed(2);

  const handleReset = () => {
    setPrincipal(10000);
    setCagr(11.2);
    setYears(5);
    setEquityMix(65);
  };

  return (
    <section id="calculator" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">
            Interactive Financial Model
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Dynamic Valuation & Compound Simulator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Test the sensitivity of capital allocations across compound annual growth rates, investment horizons, and asset class weights.
          </p>
        </motion.div>

        {/* Interactive Simulator Box */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Quantitative Return & Risk Engine
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calibrated on historical asset allocation simulations
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Input Sliders (7 Columns) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Capital Base */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={principalInputId} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Initial Capital Allocation (€)
                  </label>
                  <span className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    €{principal.toLocaleString('en-IE')}
                  </span>
                </div>
                <input
                  id={principalInputId}
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>€1,000</span>
                  <span>€50,000</span>
                  <span>€100,000</span>
                </div>
              </div>

              {/* Slider 2: Projected CAGR */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={cagrInputId} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Projected Compound Annual Return (CAGR)
                  </label>
                  <span className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {cagr.toFixed(1)}% / yr
                  </span>
                </div>
                <input
                  id={cagrInputId}
                  type="range"
                  min="3.0"
                  max="25.0"
                  step="0.1"
                  value={cagr}
                  onChange={(e) => setCagr(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>3.0% (Defensive)</span>
                  <span>11.2% (Model Base)</span>
                  <span>25.0% (Aggressive)</span>
                </div>
              </div>

              {/* Slider 3: Time Horizon */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={yearsInputId} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Investment Horizon (Years)
                  </label>
                  <span className="text-base font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <input
                  id={yearsInputId}
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>15 Years</span>
                </div>
              </div>

              {/* Slider 4: Asset Weighting */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={equityMixInputId} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Equity Weight vs Alternative / Fixed Income
                  </label>
                  <span className="text-base font-mono font-bold text-purple-600 dark:text-purple-400">
                    {equityMix}% Equities / {100 - equityMix}% Alt
                  </span>
                </div>
                <input
                  id={equityMixInputId}
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={equityMix}
                  onChange={(e) => setEquityMix(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

            </div>

            {/* Live Outputs Card (6 Columns) */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl" />

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Simulated Portfolio Terminal Value
                </span>
                
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight my-2">
                  €{futureValue.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    +€{totalGain.toLocaleString('en-IE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({percentageGain.toFixed(1)}%)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    cumulative capital expansion
                  </span>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Est. Annualized Volatility</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                      ~{estimatedVolatility}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Estimated Sharpe Ratio</span>
                    <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {estimatedSharpe}
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>Principal Capital</span>
                    <span>Compound Gains</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${Math.max(10, (principal / futureValue) * 100)}%` }}
                    />
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${Math.max(0, (totalGain / futureValue) * 100)}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
