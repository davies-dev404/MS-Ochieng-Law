import { Link } from "wouter";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

export default function NotFound() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center bg-[#FBFBFB] px-6">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row items-baseline gap-8 md:gap-16"
          >
            <h1 className="font-serif-heading text-[120px] md:text-[240px] leading-none text-[#1c2f54] font-bold tracking-tighter opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              404
            </h1>
            
            <div className="relative z-10">
              <p className="font-serif-sub text-xs uppercase tracking-[0.4em] text-[#cc2027] mb-6 font-bold">
                Error 404
              </p>
              <h2 className="font-serif-heading text-5xl md:text-8xl text-[#1c2f54] mb-10 font-bold leading-[0.9] tracking-tight">
                {t('notfound.title')}<br />
                <span className="italic font-normal">{t('notfound.subtitle')}</span>
              </h2>
              
              <p className="font-sans text-[#1c2f54]/60 text-lg md:text-xl font-light leading-relaxed mb-16 max-w-md">
                {t('notfound.desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-12 items-start sm:items-center">
                <Link 
                  href="/" 
                  className="group relative inline-flex items-center gap-4 font-serif-sub tracking-[0.2em] uppercase text-sm text-[#1c2f54] font-bold no-underline"
                >
                  <span className="w-12 h-px bg-[#1c2f54] transition-all group-hover:w-20"></span>
                  {t('notfound.return')}
                </Link>
                
                <Link 
                  href="/consultation" 
                  className="group relative inline-flex items-center gap-4 font-serif-sub tracking-[0.2em] uppercase text-sm text-[#1c2f54]/40 hover:text-[#cc2027] transition-colors font-bold no-underline"
                >
                  {t('notfound.support')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
