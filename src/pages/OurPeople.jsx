import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Layout from '../components/Layout';
import SocialSidebar from '../components/SocialSidebar';
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function OurPeople() {
  const [selectedMember, setSelectedMember] = useState(null);
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const teamMembers = [
    {
      id: 'msochieng',
      name: 'Martina Stacy Achieng',
      role: t('people.principal_role'),
      image: '/ms-ochieng.jpg',
      bio: (
        <>
          <p className="mb-4">{t('people.mso_bio_p1')}</p>
          <p className="mb-4">{t('people.mso_bio_p2')}</p>
          <p className="mb-4">{t('people.mso_bio_p3')}</p>
        </>
      )
    }
  ];

  // Close modal on escape key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <Layout title={t('nav.people')} description="Meet our dedicated legal team and advocates at M.S. Ochieng Legal, committed to delivering clear strategic guidance.">
      <SocialSidebar />
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
                {t('people.label')}
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              {t('people.title').split(' ')[0]} <span className="text-[#cc2027]">{t('people.title').split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              {t('people.desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area — Two Column Layout */}
      <section className="py-20 md:py-32 px-6 bg-white min-h-[60vh] relative overflow-hidden">
        {/* Subtle background monogram */}
        <div className="absolute top-0 left-0 font-serif-heading text-[200px] md:text-[300px] font-black text-gray-50 leading-none pointer-events-none select-none -translate-x-1/4 -translate-y-1/4">
          MSO
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          
          {teamMembers.map((member, idx) => (
            <div key={member.id} className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              {/* Left side: Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-5/12 relative group"
              >
                <div className="relative overflow-hidden bg-white shadow-2xl aspect-3/4">
                   {/* Overlay accent line */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-[#cc2027] z-20 transition-transform origin-left scale-x-0 group-hover:scale-x-100 duration-500 ease-out" />
                   
                   <img 
                     src={member.image} 
                     alt={member.name}
                     className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02]"
                     loading="lazy"
                   />
                </div>
                
                {/* Decorative dots / frame effect */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(#1c2f54_1px,transparent_1px)] bg-size-[16px_16px] opacity-20 -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(#cc2027_1px,transparent_1px)] bg-size-[16px_16px] opacity-20 -z-10" />
              </motion.div>
              
              {/* Right side: Bio */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-7/12"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-10 bg-[#cc2027]" />
                  <span className="text-[#cc2027] font-sans font-bold tracking-[0.2em] uppercase text-[10px]">
                    {member.role}
                  </span>
                </div>
                
                <h2 className="text-[#1c2f54] text-4xl md:text-5xl font-serif-heading font-bold mb-8 leading-[1.1] tracking-tight">
                  {member.name}
                </h2>
                
                <div className="prose prose-lg text-gray-500 font-sans font-light leading-relaxed">
                  {member.bio}
                </div>
              </motion.div>
            </div>
          ))}

        </div>
      </section>

    </Layout>
  );
}
