import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import SocialSidebar from '../components/SocialSidebar';
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";
import { 
  Banknote, Star, Clock, Laptop, 
  CheckCircle2, ArrowRight, ShieldCheck, Scale,
  BookOpen, Landmark, ChevronRight
} from 'lucide-react';

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function ServiceCharter() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [activeId, setActiveId] = useState('billing');

  const sections = [
    {
      id: 'billing',
      title: t('charter.billing') || 'Billing & Fees',
      icon: Banknote,
      subtitle: t('charter.billing_title') || 'Legal Fees and Retainer Fees',
      desc: t('charter.billing_desc') || 'Our legal fees are discussed and structured with each client based on the scope of services. We follow the Advocates Remuneration Order, 2014.',
      badge: 'Transparent Fees',
      details: [
        { label: 'Advocates Remuneration Order', desc: 'Fees structured strictly within legal limits and frameworks.' },
        { label: 'Upfront Quotes', desc: 'Detailed cost estimations before undertaking any legal brief.' },
        { label: 'No Hidden Costs', desc: 'Clear disbursement logs and straightforward invoicing.' }
      ]
    },
    {
      id: 'service',
      title: t('charter.service') || 'Service Excellence',
      icon: Star,
      subtitle: 'Commitment to Quality',
      desc: t('charter.service_desc') || 'We recognize the value of efficient, effective and quality services. We are guided by professional standards and client satisfaction.',
      badge: 'Unwavering Standards',
      details: [
        { label: 'Professional Diligence', desc: 'Meticulous legal research and drafting for all matters.' },
        { label: 'Client Centricity', desc: 'Solutions tailored specifically to your business or individual goals.' },
        { label: 'LSK Ethics Code', desc: 'Operations governed by the highest ethical and professional mandates.' }
      ]
    },
    {
      id: 'delivery',
      title: t('charter.delivery') || 'Delivery Standards',
      icon: Clock,
      subtitle: 'Response Time & Milestones',
      desc: 'We operate under strict timelines to ensure your legal matters are addressed with speed and precision.',
      badge: 'Time-Bound Actions',
      points: t('charter.delivery_points') || [
        "Answering telephone calls within seconds of ringing.",
        "Returning telephone calls within 1 hour of receipt.",
        "Acknowledging receipt of emails within 1 hour of receipt.",
        "Instructions within 24 hours of receipt.",
        "Replying to routine correspondences within 24 hours of receipt.",
        "Preparation of standard form documentation within two days.",
        "Attending to court and related matters within the duration given.",
        "Preparation and sharing of status reports monthly."
      ]
    },
    {
      id: 'tech',
      title: t('charter.tech') || 'Technology',
      icon: Laptop,
      subtitle: 'Digital & Legal Infrastructure',
      desc: t('charter.tech_desc') || 'The firm is equipped with modern computers and efficient I.T systems. We embrace technology for research, storage, and case tracking.',
      badge: 'Future-Ready Lawyering',
      details: [
        { label: 'Secure Cloud Storage', desc: 'Encrypted document management systems ensuring total confidentiality.' },
        { label: 'Modern Case Tracking', desc: 'Automated notification systems for court dates and file status updates.' },
        { label: 'Advanced Legal Databases', desc: 'Instant access to comprehensive regional and global case law indexes.' }
      ]
    }
  ];

  return (
    <Layout 
      title={t('nav.charter') || 'Service Charter'} 
      description="Our commitment to legal excellence, transparency in billing, professional delivery standards, and technology-driven operations."
    >
      <SocialSidebar />
      
      {/* Hero Section — Deep Navy matching AboutUs */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 bg-[#0b1628] text-white overflow-hidden">
        {/* Subtle red ambient blurs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#cc2027]/8 rounded-full blur-[140px] opacity-75" />
        </div>
        
        {/* Left vertical red accent line */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#cc2027] opacity-60" />

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px]">
                {t('charter.label') || 'Client Commitment'}
              </span>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif-heading text-4xl sm:text-6xl md:text-7xl xl:text-[80px] font-bold uppercase tracking-tight leading-[0.95] mb-8"
            >
              Service <span className="text-[#cc2027]">Charter</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-sans text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl"
            >
              {t('charter.desc') || 'Our commitment to surgical precision, strategic responsiveness, and absolute transparency in every client engagement.'}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Detail */}
      <section className="bg-white border-b border-gray-100 min-h-[80vh]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row">

          {/* ─── Left: Modern Vertical Sidebar ─── */}
          <div className="md:w-[340px] lg:w-[400px] shrink-0 border-r border-gray-100 bg-[#0b1628] flex flex-col md:sticky md:top-0 md:h-screen md:overflow-y-auto z-20">
            {/* Sidebar header */}
            <div className="px-8 pt-10 pb-6 border-b border-white/10">
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px] block mb-3">Service Protocols</span>
              <p className="font-sans text-white/40 text-xs font-light leading-relaxed">Select a charter commitment to view details.</p>
            </div>

            {/* Navigation list */}
            <nav className="flex-1 py-4">
              {sections.map((sect, idx) => {
                const isActive = sect.id === activeId;
                const Icon = sect.icon;
                return (
                  <button
                    key={sect.id}
                    onClick={() => setActiveId(sect.id)}
                    className={`w-full flex items-center gap-5 px-8 py-5 text-left group relative transition-all duration-300 ${
                      isActive
                        ? 'bg-white/6 border-r-0'
                        : 'hover:bg-white/3'
                    }`}
                  >
                    {/* Active left-edge accent */}
                    <span className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#cc2027] transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />

                    {/* Icon */}
                    <div className={`shrink-0 transition-all duration-300 ${isActive ? 'text-[#cc2027]' : 'text-white/25 group-hover:text-white/50'}`}>
                      <Icon size={20} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span className={`block font-serif-sub tracking-[0.2em] uppercase text-[9px] mb-1 font-bold transition-colors ${isActive ? 'text-[#cc2027]' : 'text-white/25 group-hover:text-white/40'}`}>
                        Protocol {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`block font-serif-heading text-[15px] leading-tight font-bold transition-colors duration-300 truncate ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>
                        {sect.title}
                      </span>
                    </div>

                    {/* Active dot */}
                    <div className={`w-1.5 h-1.5 rounded-full bg-[#cc2027] shrink-0 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ─── Right: Active Content Panel ─── */}
          <div className="flex-1 bg-white relative overflow-hidden flex flex-col min-h-[80vh]">
            <AnimatePresence mode="wait">
              {sections.map((sect, idx) => {
                if (sect.id !== activeId) return null;
                const Icon = sect.icon;
                return (
                  <motion.div
                    key={sect.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto"
                  >
                    {/* Decorative watermark icon */}
                    <div className="absolute -bottom-10 -right-10 text-gray-50 pointer-events-none select-none z-0">
                      <Icon size={400} strokeWidth={0.5} className="opacity-40" />
                    </div>

                    <div className="relative z-10 max-w-3xl">
                      <div className="flex items-center gap-4 mb-8">
                        <span className="bg-[#cc2027]/10 text-[#cc2027] font-sans font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                          {sect.badge}
                        </span>
                        <span className="font-serif-sub text-[12px] text-gray-400 font-bold uppercase tracking-widest">
                          Protocol 0{idx + 1}
                        </span>
                      </div>

                      <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1c2f54] uppercase tracking-wider mb-6 font-black leading-tight">
                        {sect.subtitle}
                      </h2>
                      
                      <p className="text-gray-500 font-sans font-light leading-relaxed text-base md:text-lg mb-12 border-l-2 border-[#cc2027] pl-6 max-w-2xl">
                        {sect.desc}
                      </p>

                      {/* Content rendering */}
                      {sect.id === 'delivery' ? (
                        <div className="w-full">
                          <h4 className="font-sans font-bold text-[11px] text-[#cc2027] uppercase tracking-[0.2em] mb-6">Service Level Commitments</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sect.points.map((point, i) => (
                              <div 
                                key={i}
                                className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-all duration-300"
                              >
                                <div className="mt-1 w-5 h-5 rounded-full bg-[#cc2027]/10 flex items-center justify-center shrink-0">
                                  <CheckCircle2 size={12} className="text-[#cc2027]" />
                                </div>
                                <p className="text-[13px] md:text-[14px] leading-relaxed text-[#1c2f54] font-medium font-sans">
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <h4 className="font-sans font-bold text-[11px] text-[#cc2027] uppercase tracking-[0.2em] mb-6">Core Principles</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sect.details.map((detail, detailIdx) => (
                              <div key={detailIdx} className="p-6 rounded-2xl bg-gray-50/40 border border-gray-100 hover:border-[#cc2027]/20 transition-all duration-300 group">
                                <h5 className="font-sans font-extrabold text-[#1c2f54] group-hover:text-[#cc2027] transition-colors text-[13px] uppercase tracking-wider mb-3">{detail.label}</h5>
                                <p className="text-[13px] text-gray-500 font-sans font-light leading-relaxed">{detail.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-16 pt-10 border-t border-gray-100 relative">
                         <div className="flex items-start gap-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                           <div className="w-12 h-12 rounded-full bg-[#cc2027]/10 flex items-center justify-center shrink-0">
                             <ShieldCheck size={22} className="text-[#cc2027]" />
                           </div>
                           <div>
                             <h3 className="font-serif-heading text-xl font-bold text-[#1c2f54] uppercase tracking-wider mb-2">
                               Our Guarantee of Diligence
                             </h3>
                             <p className="text-gray-500 font-sans font-light text-sm leading-relaxed max-w-xl">
                               M.S. Ochieng Legal is fully regulated and compliant with the Law Society of Kenya directives. We hold attorney-client confidentiality and rigorous advocacy as the pillars of our chambers.
                             </p>
                           </div>
                         </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
}
