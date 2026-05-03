import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Practice() {
  const [activeId, setActiveId] = useState(1);
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const practiceKeys = ["family", "conveyancing", "commercial", "immigration", "litigation", "adr", "ip", "employment", "media"];

  const practices = practiceKeys.map((key, index) => {
    const icons = {
      family: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      conveyancing: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      commercial: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      immigration: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      litigation: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      adr: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      ip: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      employment: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      media: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="17" x2="22" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
        </svg>
      )
    };

    const imgs = {
      family: "/practice/family-law.jpg",
      conveyancing: "/practice/conveyancing.jpg",
      commercial: "/practice/commercial.jpg",
      immigration: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1920&q=80",
      litigation: "/practice/litigation.jpg",
      adr: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80",
      ip: "/practice/intellectual-property.jpg",
      employment: "/practice/employment.jpg",
      media: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80"
    };

    return {
      id: index + 1,
      key: key,
      title: t(`practice.areas.${key}`),
      subtitle: t(`practice.areas_detail.${key}.subtitle`),
      desc: t(`practice.areas_detail.${key}.desc`),
      details: t(`practice.areas_detail.${key}.details`),
      subPractices: t(`practice.areas_detail.${key}.sub`),
      matters: t(`practice.areas_detail.${key}.matters`),
      img: imgs[key],
      icon: icons[key]
    };
  });

  const activePractice = practices.find(p => p.id === activeId);

  const handleSelect = (id) => {
    setActiveId(id);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const detailSection = document.getElementById('practice-detail');
        if (detailSection) {
          const offset = 140;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = detailSection.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                {t('practice.label')}
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter whitespace-nowrap">
              {t('practice.title').split(' ')[0]} <span className="text-[#cc2027]">{t('practice.title').split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide mb-16">
              {t('practice.desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-border min-h-screen">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row">
          <div className="md:w-[360px] lg:w-[420px] border-r border-border bg-muted/5 flex flex-col">
            {practices.map((p) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`flex items-start gap-6 px-10 py-8 border-b border-border transition-all duration-500 text-left group relative ${isActive ? 'bg-white shadow-xl z-10' : 'hover:bg-white/60'}`}
                >
                  <span className={`absolute left-0 top-0 bottom-0 w-1.5 bg-[#cc2027] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                  <div className={`mt-1 shrink-0 transition-colors duration-500 ${isActive ? 'text-[#cc2027]' : 'text-secondary/30 group-hover:text-[#cc2027]/60'}`}>
                    {p.icon}
                  </div>
                  <div>
                    <span className={`font-serif-sub tracking-[0.2em] uppercase text-[9px] mb-2 block font-bold transition-colors ${isActive ? 'text-[#cc2027]' : 'text-secondary/30 group-hover:text-[#cc2027]/50'}`}>
                      {String(p.id).padStart(2,"0")}
                    </span>
                    <h3 className={`font-serif-heading text-lg leading-tight transition-colors duration-500 font-bold ${isActive ? 'text-secondary' : 'text-secondary/60 group-hover:text-secondary/80'}`}>
                      {p.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          <div id="practice-detail" className="grow bg-white p-12 md:p-20 lg:p-28 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                key={activePractice.id}
                src={activePractice.img}
                alt={activePractice.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-[0.04] grayscale scale-110 transition-all duration-1000"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 max-w-5xl"
              >
                <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 flex items-center gap-4 font-bold">
                  {activePractice.subtitle}
                </p>
                <h2 className="font-serif-heading text-4xl md:text-7xl text-secondary mb-8 leading-tight font-bold uppercase tracking-tighter">
                  {activePractice.title}
                </h2>
                <div className="h-1 w-24 bg-[#cc2027]/30 mb-16" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  <div className="space-y-10">
                    <p className="font-sans text-foreground/70 text-xl font-light leading-relaxed">
                      {activePractice.desc}
                    </p>
                    <p className="font-sans text-foreground/50 text-base font-light leading-relaxed">
                      {activePractice.details}
                    </p>
                    
                    <div className="p-10 border-l-8 border-[#cc2027] bg-secondary text-white shadow-2xl">
                      <p className="font-serif-sub uppercase tracking-[0.3em] text-[10px] text-[#cc2027] mb-5 font-bold">{t('practice.strategic')}</p>
                      <p className="font-serif-sub text-lg text-white/80 leading-relaxed italic">
                        "{activePractice.matters}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <h4 className="font-serif-heading text-2xl text-secondary font-bold uppercase tracking-widest border-b border-border pb-6">
                      {t('practice.specialization')}
                    </h4>
                    <div className="grid grid-cols-1 gap-5">
                      {activePractice.subPractices.map((sub, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          key={i}
                          className="flex items-center gap-5 group/item py-3 border-b border-border/40 last:border-0"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#cc2027]/40 shrink-0 group-hover/item:scale-150 transition-transform" />
                          <span className="font-serif-sub tracking-[0.2em] uppercase text-[11px] text-secondary/80 font-bold group-hover/item:text-[#cc2027] transition-colors">{sub}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="pt-10">
                      <Link
                        href="/consultation"
                        className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-secondary text-white px-16 py-6 hover:bg-[#cc2027] transition-all duration-500 font-bold no-underline shadow-2xl"
                      >
                        {t('practice.consultation')} →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80" alt="Legal desk" loading="lazy" className="w-full h-full object-cover opacity-10 grayscale" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/95 to-secondary/80" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-serif-sub text-[#cc2027] tracking-[0.5em] uppercase text-[10px] mb-10 font-bold">Dedicated Counsel</p>
            <h2 className="font-serif-heading text-4xl lg:text-5xl xl:text-7xl mb-16 leading-none font-bold uppercase tracking-tighter flex items-center justify-center gap-4 whitespace-nowrap text-white">
              {t('practice.innovation')} {t('practice.integrity')} <br className="md:hidden" />
              <span className="text-[#cc2027] italic">{t('practice.commitment')} {t('practice.excellence')}</span>
            </h2>
            <Link href="/consultation" className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-[#cc2027] text-white border-2 border-[#cc2027] px-20 py-8 hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 font-bold no-underline shadow-4xl">
              {t('practice.journey')} →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
