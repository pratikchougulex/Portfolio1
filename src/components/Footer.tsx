import { ArrowUp, Mail, Linkedin, FileText, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formUrl = "https://forms.cloud.microsoft/r/kR3M5c84PK";

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Pratik Chougule
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                MSc Finance (UCC)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Financial Analyst • Valuation • Risk Modeling • Automation
            </p>
          </div>

          {/* Contact Me CTA & Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Send Message (Open Form)</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://linkedin.com/in/pratikchougule10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium transition-colors flex items-center gap-1.5 text-xs"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:pratikchougulex@gmail.com"
              className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium transition-colors flex items-center gap-1.5 text-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <a
              href="/Pratik_Chougule_CV.pdf"
              download="Pratik_Chougule_CV.pdf"
              className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium transition-colors flex items-center gap-1.5 text-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV PDF</span>
            </a>
          </div>

          {/* Scroll to Top Button */}
          <div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Pratik Chougule. All rights reserved.</p>
          <p>Engineered for high performance & decision-ready financial insight.</p>
        </div>
      </div>
    </footer>
  );
}
