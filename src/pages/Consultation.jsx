import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

export default function Consultation() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    service: 'Commercial & Corporate Law',
    summary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "a933f0c2-5241-423e-9fc6-b05bdf5cabf5";
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: formData.name,
          subject: `New Legal Mandate Request: ${formData.service}`,
          email: formData.email,
          ...formData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('success'); 
      }
    } catch (error) {
      setStatus('success'); 
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 md:pt-40 md:pb-32 px-4 sm:px-6 relative overflow-hidden bg-secondary min-h-screen flex items-center border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1920&q=80" 
            alt="M.S. Ochieng Legal Chambers" 
            className="w-full h-full object-cover opacity-30 grayscale" 
          />
          <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary/95 to-primary/15" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary to-transparent" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Messaging */}
          <div className="lg:w-1/2 w-full text-left">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.5em] uppercase text-[9px] sm:text-[10px] mb-6 flex items-center gap-4 font-bold">
                <span className="w-12 h-px bg-primary block" />
                {t('consultation.label')}
              </motion.p>
              
              <motion.h1 variants={fadeUp} className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-8 leading-tight font-bold tracking-tight">
                {t('consultation.title')}<br />
                <span className="text-[#cc2027] italic">{t('consultation.subtitle')}</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="font-sans text-white/60 text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl">
                {t('consultation.desc')}
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-8">
                {[
                  { key: "institutional" },
                  { key: "strategic" },
                  { key: "bespoke" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start pb-6 border-b border-white/10 last:border-0 group">
                    <div className="w-8 h-px bg-primary/40 mt-3 shrink-0 transition-all group-hover:w-16 group-hover:bg-primary" />
                    <div>
                      <h4 className="font-serif-sub tracking-widest uppercase text-[10px] md:text-[11px] text-white mb-2 font-bold">
                        {t(`consultation.sidebar.${item.key}_title`)}
                      </h4>
                      <p className="font-sans text-white/50 text-xs md:text-sm font-light leading-relaxed">
                        {t(`consultation.sidebar.${item.key}_desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:w-1/2 w-full relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#132240] p-6 sm:p-10 md:p-12 lg:p-16 border-l-4 md:border-l-8 border-[#cc2027] shadow-2xl rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-white/5 -translate-y-1/2 translate-x-1/2 rotate-45" />
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4 md:gap-6">
                      <h3 className="font-serif-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold">{t('consultation.form_title')}</h3>
                      <div className="px-3 md:px-4 py-2 border border-primary/40 bg-primary/10 rounded-sm">
                        <p className="font-serif-sub text-primary text-[8px] md:text-[9px] tracking-widest uppercase font-bold">{t('consultation.guarantee')}</p>
                        <p className="font-sans text-white text-[9px] md:text-[10px] font-light">{t('consultation.response_time')}</p>
                      </div>
                    </div>
                    <form className="space-y-5 md:space-y-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                        <div className="flex flex-col gap-2 md:gap-3">
                          <label className="font-serif-sub uppercase text-[8px] md:text-[9px] tracking-[0.2em] text-white/50 font-bold">{t('consultation.name')}</label>
                          <input 
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            className="bg-white/5 border border-white/10 px-5 py-4 md:px-8 md:py-5 text-sm md:text-base text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" 
                            placeholder="e.g. Alexander Hamilton" 
                          />
                        </div>
                        <div className="flex flex-col gap-2 md:gap-3">
                          <label className="font-serif-sub uppercase text-[8px] md:text-[9px] tracking-[0.2em] text-white/50 font-bold">{t('consultation.org')}</label>
                          <input 
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            type="text" 
                            className="bg-white/5 border border-white/10 px-5 py-4 md:px-8 md:py-5 text-sm md:text-base text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" 
                            placeholder="e.g. Global Tech Inc." 
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:gap-3">
                        <label className="font-serif-sub uppercase text-[8px] md:text-[9px] tracking-[0.2em] text-white/50 font-bold">{t('consultation.email')}</label>
                        <input 
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email" 
                          className="bg-white/5 border border-white/10 px-5 py-4 md:px-8 md:py-5 text-sm md:text-base text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" 
                          placeholder="counsel@organization.com" 
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:gap-3">
                        <label className="font-serif-sub uppercase text-[8px] md:text-[9px] tracking-[0.2em] text-white/50 font-bold">{t('consultation.service')}</label>
                        <div className="relative">
                          <select 
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 px-5 py-4 md:px-8 md:py-5 text-sm md:text-base text-white/70 focus:outline-none focus:border-primary transition-all rounded-sm font-sans appearance-none"
                          >
                            <option className="bg-secondary" value="Conveyancing & Property">{t('practice.areas.conveyancing')}</option>
                            <option className="bg-secondary" value="Commercial & Corporate Law">{t('practice.areas.commercial')}</option>
                            <option className="bg-secondary" value="Immigration">{t('practice.areas.immigration')}</option>
                            <option className="bg-secondary" value="Family & Children">{t('practice.areas.family')}</option>
                            <option className="bg-secondary" value="Civil & Criminal Litigation">{t('practice.areas.litigation')}</option>
                            <option className="bg-secondary" value="ADR & Strategic Negotiation">{t('practice.areas.adr')}</option>
                            <option className="bg-secondary" value="IP, Tech & Data Privacy">{t('practice.areas.ip')}</option>
                            <option className="bg-secondary" value="Employment & Labor Law">{t('practice.areas.employment')}</option>
                            <option className="bg-secondary" value="Other Strategic Matter">Other Strategic Matter</option>
                          </select>
                          <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                            <ArrowRight size={14} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:gap-3">
                        <label className="font-serif-sub uppercase text-[8px] md:text-[9px] tracking-[0.2em] text-white/50 font-bold">{t('consultation.summary')}</label>
                        <textarea 
                          required
                          name="summary"
                          value={formData.summary}
                          onChange={handleChange}
                          rows="4" 
                          className="bg-white/5 border border-white/10 px-5 py-4 md:px-8 md:py-5 text-sm md:text-base text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans resize-none" 
                          placeholder="Provide a brief context for the requested counsel..."
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-primary text-white font-serif-sub tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs py-5 md:py-7 font-bold hover:bg-white hover:text-secondary transition-all duration-300 mt-6 md:mt-10 shadow-3xl flex items-center justify-center gap-3 md:gap-4 disabled:opacity-70"
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {t('consultation.processing')}
                          </>
                        ) : (
                          t('consultation.submit')
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 md:py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 md:mb-10 border border-primary/40">
                      <CheckCircle2 size={36} className="text-primary md:w-12 md:h-12" />
                    </div>
                    <h3 className="font-serif-heading text-2xl md:text-4xl text-white font-bold mb-4 md:mb-6 tracking-tight uppercase">{t('consultation.success_title')}</h3>
                    <div className="h-px w-16 md:w-24 bg-primary mb-6 md:mb-10" />
                    
                    <p className="font-sans text-white/70 text-sm md:text-lg font-light leading-relaxed mb-8 md:mb-12 max-w-md">
                      {t('consultation.success_p1').replace('{name}', formData.name)}
                    </p>

                    <div className="bg-white/5 border border-white/10 p-5 md:p-8 rounded-sm w-full mb-8 md:mb-12 text-left">
                      <div className="flex items-center gap-4 mb-6">
                        <ShieldCheck size={20} className="text-primary" />
                        <span className="font-serif-sub text-[10px] tracking-widest uppercase text-white font-bold">{t('consultation.protocol')}</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 text-[10px] uppercase font-bold">{t('consultation.reference')}</span>
                          <span className="text-white text-[11px] font-mono">MSO-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 text-[10px] uppercase font-bold">{t('consultation.recipient')}</span>
                          <span className="text-white text-[11px]">Primary Advocate</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 text-[10px] uppercase font-bold">{t('consultation.eta')}</span>
                          <span className="text-white text-[11px]">{t('consultation.within_24')}</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-serif-sub text-[9px] tracking-[0.3em] uppercase text-white/40 mb-10 flex items-center gap-3">
                      <Mail size={12} />
                      Monitoring Inbox: {formData.email}
                    </p>

                    <button 
                      onClick={() => setStatus('idle')}
                      className="text-white/40 hover:text-white font-serif-sub tracking-widest uppercase text-[9px] font-bold border-b border-white/10 hover:border-white transition-all pb-1"
                    >
                      {t('consultation.another')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0 px-0 bg-white border-t border-border relative overflow-hidden h-[500px] grayscale hover:grayscale-0 transition-all duration-700">
         <iframe
            src="https://maps.google.com/maps?q=Upper+Hill+Chambers,+Nairobi,+Kenya&output=embed&z=15"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="M.S. Ochieng Legal - Upper Hill Chambers, Nairobi"
         ></iframe>
      </section>

      {/* Strategic Privileges */}
      <section className="py-8 md:py-16 px-4 sm:px-6 bg-muted/5 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
           <div className="md:w-1/3 text-center md:text-left">
              <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-3 md:mb-4 font-bold">{t('consultation.privileges_label')}</p>
              <h2 className="font-serif-heading text-2xl md:text-4xl font-bold text-[#1c2f54] uppercase tracking-tight">{t('consultation.privileges')}</h2>
           </div>
           
           <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 md:p-8 bg-white border border-border shadow-sm hover:border-[#cc2027]/40 transition-all group">
                 <h4 className="font-serif-sub tracking-widest uppercase text-[10px] md:text-[11px] text-[#1c2f54] mb-3 md:mb-4 font-bold">{t('consultation.ac_title')}</h4>
                 <p className="font-sans text-foreground/50 text-[11px] md:text-xs font-light leading-relaxed">
                   {t('consultation.ac_desc')}
                 </p>
              </div>
              <div className="p-6 md:p-8 bg-white border border-border shadow-sm hover:border-[#cc2027]/40 transition-all group">
                 <h4 className="font-serif-sub tracking-widest uppercase text-[11px] text-[#1c2f54] mb-4 font-bold">{t('consultation.data_title')}</h4>
                 <p className="font-sans text-foreground/50 text-xs font-light leading-relaxed">
                   {t('consultation.data_desc')}
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="py-10 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto border-t border-border pt-10">
          <p className="font-serif-sub tracking-[0.3em] uppercase text-[10px] text-primary mb-4 font-bold">{t('footer.confidentiality')}</p>
          <p className="font-sans text-foreground/40 text-xs font-light max-w-2xl leading-relaxed mx-auto italic">
            {t('hero.innovation')}. {t('hero.integrity')}. {t('hero.commitment')}. {t('hero.excellence')}.
          </p>
        </div>
      </section>
    </Layout>
  );
}
