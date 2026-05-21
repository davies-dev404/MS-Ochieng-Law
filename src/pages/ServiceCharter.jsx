import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SocialSidebar from '../components/SocialSidebar';
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";
import { Banknote, Star, Clock, Laptop } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ServiceCharter() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const sections = [
    {
      title: t('charter.billing'),
      icon: <Banknote size={32} strokeWidth={1.5} />,
      content: (
        <div className="text-sm font-light text-gray-600 leading-relaxed space-y-3">
          <h4 className="font-bold text-[#1c2f54] text-base mb-2">{t('charter.billing_title')}</h4>
          <p>{t('charter.billing_desc')}</p>
        </div>
      )
    },
    {
      title: t('charter.service'),
      icon: <Star size={32} strokeWidth={1.5} />,
      content: (
        <div className="text-sm font-light text-gray-600 leading-relaxed space-y-3">
          <p>{t('charter.service_desc')}</p>
        </div>
      )
    },
    {
      title: t('charter.delivery'),
      icon: <Clock size={32} strokeWidth={1.5} />,
      content: (
        <ul className="text-sm font-light text-gray-600 leading-relaxed space-y-3 list-disc pl-4 marker:text-[#cc2027]">
          {t('charter.delivery_points').map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      )
    },
    {
      title: t('charter.tech'),
      icon: <Laptop size={32} strokeWidth={1.5} />,
      content: (
        <p className="text-sm font-light text-gray-600 leading-relaxed">{t('charter.tech_desc')}</p>
      )
    }
  ];

  return (
    <Layout title={t('nav.charter')} description="Our commitment to legal excellence, transparency in billing, professional delivery standards, and technology-driven operations.">
      <SocialSidebar />
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-6xl w-full">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                {t('charter.label')}
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase text-center whitespace-nowrap">
              {t('charter.title').split(' ')[0]} <span className="text-[#cc2027]">{t('charter.title').split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              {t('charter.desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 md:py-32 px-6 bg-gray-50 min-h-[60vh] relative">
        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="group bg-white p-10 md:p-12 border border-gray-100 hover:border-[#cc2027] hover:shadow-2xl transition-all duration-500 relative overflow-hidden rounded-xl flex flex-col h-full"
              >
                {/* Decorative Hover Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#cc2027]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#cc2027]/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#cc2027] to-[#1c2f54] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1c2f54] group-hover:text-[#cc2027] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <span className="font-serif-sub tracking-[0.3em] uppercase text-[10px] text-gray-400 group-hover:text-[#cc2027] font-bold transition-colors">Section 0{idx + 1}</span>
                    <h3 className="font-serif-heading text-2xl text-[#1c2f54] mt-1 uppercase tracking-widest">{section.title}</h3>
                  </div>
                </div>
                
                <div className="grow">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
