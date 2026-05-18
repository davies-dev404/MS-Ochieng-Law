import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Flag, Star, ShieldCheck, Scale, Quote } from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function AboutUs() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const icons = [Target, Flag, Star, ShieldCheck, Scale];

  const sections = [
    {
      title: t('about.vision_title'),
      content: <p>{t('home.vision_desc')}</p>
    },
    {
      title: t('about.mission_title'),
      content: <p>{t('home.mission_desc')}</p>
    },
    {
      title: t('about.values_title'),
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>{t('hero.innovation')}</li>
          <li>{t('hero.integrity')}</li>
          <li>{t('hero.commitment')}</li>
          <li>{t('hero.excellence')}</li>
        </ul>
      )
    },
    {
      title: t('about.why_choose_title'),
      content: (
         <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li><strong>{t('about.why_team').split(':')[0]}:</strong> {t('about.why_team').split(':')[1]}</li>
          <li><strong>{t('about.why_personal').split(':')[0]}:</strong> {t('about.why_personal').split(':')[1]}</li>
          <li><strong>{t('about.why_rep').split(':')[0]}:</strong> {t('about.why_rep').split(':')[1]}</li>
          <li><strong>{t('about.why_results').split(':')[0]}:</strong> {t('about.why_results').split(':')[1]}</li>
          <li><strong>{t('about.why_local').split(':')[0]}:</strong> {t('about.why_local').split(':')[1]}</li>
        </ul>
      )
    },
    {
      title: t('about.domains_title'),
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>{t('practice.areas.conveyancing')}</li>
          <li>{t('practice.areas.commercial')}</li>
          <li>{t('practice.areas.immigration')}</li>
          <li>{t('practice.areas.family')}</li>
          <li>{t('practice.areas.litigation')}</li>
          <li>{t('practice.areas.adr')}</li>
          <li>{t('practice.areas.ip')}</li>
          <li>{t('practice.areas.employment')}</li>
          <li>{t('practice.areas.media')}</li>
          <li>{t('practice.areas.taxation')}</li>
        </ul>
      )
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                {t('about.story_label')}
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif-heading mb-10 leading-tight md:leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              {t('about.story_title').split(' ')[0]} <span className="text-[#cc2027]">{t('about.story_title').split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              {t('about.story_desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-32 px-6 bg-white min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative w-full group lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 overflow-hidden shadow-2xl"
              >
                <img 
                  src="/ms-ochieng.jpg" 
                  alt="M.S. Ochieng Managing Partner" 
                  className="w-full h-auto object-cover rounded-sm transition-all duration-1000" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1505664173615-04b1cad311b5?q=80&w=2070&auto=format&fit=crop"
                  }}
                />
              </motion.div>
              {/* Decorative Red Bar */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-4 border-b-4 border-[#cc2027] -z-10" />
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                
                {/* Refined Introduction */}
                <div className="mb-14 bg-gray-50/50 p-8 md:p-10 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="h-px w-12 bg-[#cc2027]" />
                      <span className="font-bold font-sans text-[14px] uppercase tracking-[0.2em] text-[#1c2f54]">
                        {t('about.intro_title')}
                      </span>
                  </div>
                  <div className="text-gray-600 leading-relaxed text-base md:text-lg space-y-6">
                      <p className="text-xl md:text-2xl font-serif text-[#1c2f54] leading-snug">
                        {t('about.intro_p1')}
                      </p>
                      <p className="font-light">{t('about.intro_p2')}</p>
                      <p className="font-light">{t('about.intro_p3')}</p>
                  </div>
                </div>
                
                {/* Modern Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sections.map((section, idx) => {
                    const Icon = icons[idx] || Star;
                    const isLast = idx === sections.length - 1;
                    return (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -8 }}
                        className={`relative overflow-hidden bg-white border border-gray-100 p-8 rounded-3xl transition-all duration-500 group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-[#cc2027]/20 flex flex-col ${isLast ? 'md:col-span-2' : ''}`}
                      >
                        {/* Watermark Number */}
                        <div className="absolute -bottom-8 -right-8 text-[150px] leading-none font-black text-gray-50 opacity-60 pointer-events-none group-hover:text-[#cc2027]/5 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700">
                          0{idx + 1}
                        </div>

                        <div className="relative z-10 flex flex-col gap-6 mb-6">
                          <div className="w-16 h-16 bg-gray-50/80 group-hover:bg-[#cc2027] group-hover:text-white text-[#1c2f54] rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 group-hover:shadow-lg group-hover:shadow-[#cc2027]/30">
                            <Icon size={28} strokeWidth={1.5} />
                          </div>
                          <h3 className="text-[#1c2f54] font-bold font-sans text-lg uppercase tracking-wider group-hover:text-[#cc2027] transition-colors duration-500">
                            {section.title}
                          </h3>
                        </div>
                        <div className="relative z-10 text-gray-600 leading-relaxed font-normal text-[15px] flex-1">
                          {section.content}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
