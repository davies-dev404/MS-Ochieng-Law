import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Terms() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const termsData = [
    {
      id: "01",
      title: t('terms.notice_title'),
      desc: t('terms.notice_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      )
    },
    {
      id: "02",
      title: t('terms.agreement_title'),
      desc: t('terms.agreement_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    },
    {
      id: "03",
      title: t('terms.ip_title'),
      desc: t('terms.ip_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      )
    },
    {
      id: "04",
      title: t('terms.ethics_title'),
      desc: t('terms.ethics_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
        </svg>
      )
    },
    {
      id: "05",
      title: t('terms.liability_title'),
      desc: t('terms.liability_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      )
    },
    {
      id: "06",
      title: t('terms.jurisdiction_title'),
      desc: t('terms.jurisdiction_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-48 pb-20 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Protocol Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                {t('terms.label')}
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase">
              {t('terms.title').split(' ')[0]} {t('terms.title').split(' ')[1]} <span className="text-[#cc2027]">{t('terms.title').split(' ')[2]}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              {t('terms.desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-muted/5 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {termsData.map((term) => (
              <motion.div 
                key={term.id}
                variants={fadeUp}
                className="bg-white p-12 border border-border shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 font-serif-heading text-8xl font-bold translate-x-4 -translate-y-4 group-hover:text-[#cc2027] group-hover:opacity-10 transition-all duration-500">
                  {term.id}
                </div>
                <div className="w-14 h-14 bg-[#cc2027]/5 text-[#cc2027] flex items-center justify-center rounded-sm mb-8 group-hover:bg-[#cc2027] group-hover:text-white transition-colors duration-500">
                  {term.icon}
                </div>
                <h3 className="font-serif-heading text-2xl text-secondary mb-6 font-bold uppercase">{term.title}</h3>
                <p className="font-sans text-foreground/60 leading-relaxed font-light text-sm relative z-10">
                  {term.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-32 pt-16 border-t border-border text-center">
            <p className="font-sans text-foreground/50 text-sm">
              For formal engagement requests, please utilize our <br className="md:hidden" />
              <Link href="/consultation" className="text-[#cc2027] font-bold ml-2 hover:underline decoration-[#cc2027]">{t('terms.portal')}</Link>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
