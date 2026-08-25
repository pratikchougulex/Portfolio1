import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles,
  ClipboardList,
  ArrowRight,
  ShieldCheck,
  User,
  FileText
} from 'lucide-react';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailAddress = "pratikchougulex@gmail.com";
  const phoneNumber = "089 946 2795";
  const internationalPhone = "+353899462795";
  const linkedinUrl = "https://linkedin.com/in/pratikchougule10";
  const whatsappUrl = `https://wa.me/353899462795?text=${encodeURIComponent("Hi Pratik, I came across your Financial Analyst portfolio and would like to connect.")}`;
  
  // Form URL (Microsoft Form)
  const formUrl = "https://forms.cloud.microsoft/r/kR3M5c84PK";

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const formFields = [
    { label: "Full Name", desc: "Your name or organization representation", icon: User },
    { label: "Recipient's Mail ID", desc: "Your professional email for follow-up response", icon: Mail },
    { label: "Subject Area", desc: "Job Opportunity, Valuation, Financial Modeling, or Advisory", icon: ClipboardList },
    { label: "Detailed Message", desc: "Project overview, role requirements, or scheduling proposal", icon: FileText },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50/70 dark:bg-slate-900/30 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mt-4">
            Connect & Initiate Collaboration
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Actively available for full-time Financial Analyst, Investment Analyst, or Corporate Finance roles across Ireland and the European Union.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Google Form Redirect Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex"
          >
            <div className="w-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle top background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        Official Inquiry Form
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Secure submission through Google Forms
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Fast Response
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  Please click the button below to open our structured questionnaire. It captures all necessary details to ensure a tailored, prompt response:
                </p>

                {/* Form Fields Included Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {formFields.map((field, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-start space-x-3"
                    >
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs mt-0.5">
                        <field.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">
                          {field.label}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight">
                          {field.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button Redirecting to Microsoft Form */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5"
                >
                  <Sparkles className="mr-2 w-5 h-5 text-cyan-200 animate-pulse" />
                  <span>Send Message (Open Form)</span>
                  <ExternalLink className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </a>
                <p className="text-center text-xs text-slate-400 mt-2.5">
                  Opens directly in a new tab • Average response time: &lt; 24 hours
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Channels & Verification (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4 flex flex-col justify-between"
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Direct Communication Channels
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Prefer direct outreach? Reach out via any of the verified channels below:
                </p>
              </div>

              {/* Email Card with Copy & Mailto */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 group hover:border-indigo-400/50 transition-all">
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center space-x-3 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 min-w-0 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Primary Email</span>
                    <span className="text-xs sm:text-sm font-semibold truncate block text-slate-900 dark:text-white">{emailAddress}</span>
                  </div>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(emailAddress, 'email')}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all cursor-pointer shadow-xs"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all shadow-xs"
                    title="Send Email Directly"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Phone Card with Call & WhatsApp */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 group hover:border-cyan-400/50 transition-all">
                <a
                  href={`tel:${internationalPhone}`}
                  className="flex items-center space-x-3 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 min-w-0 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone & WhatsApp</span>
                    <span className="text-xs sm:text-sm font-semibold truncate block text-slate-900 dark:text-white">{phoneNumber}</span>
                  </div>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(phoneNumber, 'phone')}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-cyan-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all cursor-pointer shadow-xs"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all shadow-xs"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* LinkedIn Profile Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 group hover:border-blue-400/50 transition-all">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 min-w-0 transition-colors flex-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-semibold truncate block text-slate-900 dark:text-white">linkedin.com/in/pratikchougule10</span>
                  </div>
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all shadow-xs"
                  title="Visit LinkedIn Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Location Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center space-x-3 text-slate-800 dark:text-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
                  <span className="text-xs sm:text-sm font-semibold block text-slate-900 dark:text-white">Limerick, Ireland (Open to Dublin / Cork & EU)</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
