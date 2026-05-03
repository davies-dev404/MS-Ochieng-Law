import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, Scale, Shield, Users, Gavel, Briefcase, Home as HomeIcon, UserCheck, Target, Compass, Globe, Tv } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Layout from '../components/Layout';
import LegalNewsWidget from "../components/LegalNewsWidget";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

const heroSlides = [
  { image: "hero/integrity.jpg", title: "hero.integrity", subtitle: "hero.integrity_subtitle" },
  { image: "hero/innovation.jpg", title: "hero.innovation", subtitle: "hero.innovation_subtitle" },
  { image: "hero/excellence.jpg", title: "hero.excellence", subtitle: "hero.excellence_subtitle" },
  { image: "hero/commiment.jpg", title: "hero.commitment", subtitle: "hero.commitment_subtitle" }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const expertiseKeys = ["family", "conveyancing", "commercial", "immigration", "litigation", "adr", "ip", "employment", "media"];
  
  const expertiseAreas = expertiseKeys.map((key, idx) => {
    const icons = {
      family: Users, conveyancing: HomeIcon, commercial: Briefcase, immigration: Globe,
      litigation: Gavel, adr: Scale, ip: Shield, employment: UserCheck, media: Tv
    };
    const imgs = {
      family: "/practice/family-law.jpg", conveyancing: "/practice/conveyancing.jpg", commercial: "/practice/commercial.jpg",
      immigration: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
      litigation: "/practice/litigation.jpg", adr: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      ip: "/practice/intellectual-property.jpg", employment: "/practice/employment.jpg",
      media: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80"
    };
    return { title: t(`practice.areas.${key}`), img: imgs[key], icon: icons[key] };
  });

  const blogPosts = [
    {
      category: t('blog.categories.family'),
      title: "Family Trusts in Kenya: How to Protect Your Wealth and Secure Your Legacy",
      img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop",
      id: "family-trusts-in-kenya"
    },
    {
      category: t('blog.categories.litigation'),
      title: "Beyond the Will: Why a Registered Family Trust is the Ultimate Legacy Tool",
      img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop",
      id: "registered-family-trust"
    }
  ];

  useEffect(() => { setHasMounted(true); }, []);

  const [expertiseRef, expertiseApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (!expertiseApi) return;
    const interval = setInterval(() => { expertiseApi.scrollNext(); }, 4000);
    return () => clearInterval(interval);
  }, [expertiseApi]);

  useEffect(() => {
    const timer = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const scrollPrevExpertise = useCallback(() => expertiseApi && expertiseApi.scrollPrev(), [expertiseApi]);
  const scrollNextExpertise = useCallback(() => expertiseApi && expertiseApi.scrollNext(), [expertiseApi]);

  return (
    <Layout>
      <section className="relative h-[600px] md:h-[800px] w-full overflow-hidden bg-[#1c2f54]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={!hasMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: hasMounted ? 1.5 : 0, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
            style={{ backgroundImage: `url('${heroSlides[currentSlide].image}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
              <h1 className="text-5xl md:text-8xl font-serif-heading text-white mb-6 md:mb-8 tracking-tighter uppercase whitespace-normal md:whitespace-nowrap">
                {t(heroSlides[currentSlide].title)}
              </h1>
              <p className="text-base md:text-2xl text-white/90 font-medium max-w-3xl mb-12 md:mb-16">
                {t(heroSlides[currentSlide].subtitle)}
              </p>
              <Link href="/consultation">
                <button className="bg-transparent text-white border-2 border-white rounded-none px-12 py-5 flex items-center gap-4 transition-all duration-300 font-bold text-[14px] uppercase tracking-[0.3em] hover:bg-white hover:text-[#1c2f54] shadow-2xl group">
                  {t('hero.cta')} <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={prevSlide} className="absolute left-10 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors">
          <ChevronLeft size={60} strokeWidth={1} />
        </button>
        <button onClick={nextSlide} className="absolute right-10 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors">
          <ChevronRight size={60} strokeWidth={1} />
        </button>

        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-4 h-4 rounded-full border-2 border-white/20 transition-all duration-300 ${currentSlide === idx ? 'bg-white border-white scale-125 shadow-2xl' : 'bg-white/40 hover:bg-white/80'}`} />
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-[14px] italic text-[#1c2f54] mb-2 font-serif tracking-wide">{t('home.about_label')}</h4>
            <h2 className="text-[32px] md:text-[38px] font-sans text-[#1c2f54] mb-4 font-extrabold tracking-tight">{t('home.about_title')}</h2>
            <p className="text-[#444] max-w-[900px] mx-auto text-[15px] leading-[1.8] font-medium mb-8">{t('home.about_desc')}</p>
            <Link href="/about-us">
              <button className="bg-[#1c2f54] text-white rounded-none px-10 py-4 font-extrabold text-[12px] tracking-widest uppercase hover:bg-[#111c33] transition-colors shadow-sm">{t('home.know_more')}</button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[ { k: 'vision', i: Compass, c: '#b42025' }, { k: 'mission', i: Target, c: 'bg-[#b42025]' }, { k: 'values', i: Shield, c: '#b42025' } ].map((item, idx) => (
              <div key={idx} className={`text-center p-8 bg-gray-50 border-b-4 ${idx === 1 ? 'border-[#b42025]' : 'border-[#1c2f54]'} hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md`}>
                <div className={`w-16 h-16 mx-auto ${idx === 1 ? 'bg-[#b42025] text-white' : 'bg-white text-[#b42025]'} rounded-full flex items-center justify-center mb-6 shadow-sm`}>
                  <item.i size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-sans text-[#1c2f54] mb-4 font-bold uppercase">{t(`home.${item.k}`)}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">{t(`home.${item.k}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise-section" className="py-24 bg-[#1c2f54] text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="flex flex-col mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">{t('home.practice_label')}</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif-heading mb-8 leading-[0.9] tracking-tight translate-x-[-4px] whitespace-normal lg:whitespace-nowrap">{t('home.practice_title')}</h2>
                <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed max-w-xl font-light tracking-wide">{t('home.practice_desc')}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={scrollPrevExpertise} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#cc2027] hover:border-[#cc2027] transition-all duration-300">
                  <ChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <button onClick={scrollNextExpertise} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#cc2027] hover:border-[#cc2027] transition-all duration-300">
                  <ChevronRight size={24} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
          <div className="embla overflow-hidden" ref={expertiseRef}>
            <div className="embla__container flex">
              {expertiseAreas.map((area, idx) => (
                <div key={idx} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] pl-6">
                    <div className="relative h-[450px] group cursor-pointer overflow-hidden rounded-sm border border-white/5 bg-white/5 backdrop-blur-sm">
                      <img src={area.img} alt={area.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-linear-to-t from-[#1c2f54] via-[#1c2f54]/20 to-transparent group-hover:via-[#1c2f54]/40 transition-all duration-700"></div>
                      <div className="absolute top-8 left-8 w-14 h-14 bg-[#cc2027] text-white flex items-center justify-center rounded-sm shadow-2xl transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <area.icon size={24} strokeWidth={1.5} />
                      </div>
                      <div className="absolute bottom-8 left-8 right-8 z-20">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-6 bg-[#cc2027]" />
                            <span className="text-[#cc2027] font-sans font-bold tracking-[0.2em] uppercase text-[10px]">Expertise {String(idx + 1).padStart(2, '0')}</span>
                         </div>
                         <h3 className="text-2xl font-serif-heading mb-6 group-hover:text-[#cc2027] transition-colors leading-tight">{area.title}</h3>
                         <Link href="/practice" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] gap-3 text-white/50 hover:text-white transition-all">
                            {t('home.explore_area')} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                         </Link>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="blog-section" className="py-32 bg-[#1c2f54] text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-white/5 to-transparent pointer-none" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="flex flex-col mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">{t('home.practice_label')}</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif-heading mb-8 leading-[0.9] tracking-tight translate-x-[-4px] whitespace-normal lg:whitespace-nowrap overflow-visible">{t('home.insights_title')}</h2>
                <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed max-w-xl font-light tracking-wide">{t('home.insights_desc')}</p>
              </div>
              <Link href="/blog">
                <button className="flex items-center gap-4 text-white/60 hover:text-white transition-colors py-4 group cursor-pointer">
                  <span className="font-bold tracking-widest uppercase text-xs">{t('blog.view_all')}</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#cc2027] group-hover:border-[#cc2027] transition-all"><ChevronRight size={18} /></div>
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, idx) => (
              <Link key={idx} href={`/blog/${post.id}`}>
                <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="group flex flex-col md:flex-row bg-[#152340] border border-white/5 rounded-none overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/20 h-full cursor-pointer">
                   <div className="w-full md:w-[40%] h-[240px] md:h-auto shrink-0 relative overflow-hidden">
                     <img src={post.img} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-[#1c2f54]/20 group-hover:bg-transparent transition-colors"></div>
                   </div>
                   <div className="w-full md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
                     <div className="text-[#cc2027] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{post.category}</div>
                     <h3 className="text-xl md:text-2xl font-serif-heading text-white leading-tight mb-6 group-hover:text-[#cc2027] transition-colors line-clamp-2 italic">{post.title}</h3>
                     <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                       {t('blog.read_insight')} <ArrowRight size={14} className="ml-2" />
                     </div>
                   </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white overflow-hidden relative border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="flex flex-col mb-16 text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">{t('home.about_label')}</span>
            </div>
            <div className="max-w-3xl">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif-heading mb-8 leading-[0.9] tracking-tight translate-x-[-4px] whitespace-normal lg:whitespace-nowrap text-[#1c2f54]">{t('home.strategic_engagement')}</h2>
              <p className="text-gray-500 font-sans text-lg leading-relaxed max-w-xl font-light tracking-wide">{t('news.widget_desc')}</p>
            </div>
          </div>
          <LegalNewsWidget hideHeader={true} itemsLimit={3} showMoreLink="/blog" />
        </div>
      </section>

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
          <div className="h-1/2 bg-gray-50"></div>
          <div className="h-1/2 bg-[#1c2f54]"></div>
        </div>
        <div className="relative px-6 py-12 md:py-20 flex justify-center z-20">
          <div className="w-full max-w-[1200px] flex flex-col md:flex-row shadow-2xl bg-white min-h-[400px] rounded-sm overflow-hidden">
            <div className="w-full md:w-1/2 min-h-[350px] bg-gray-100">
               <img src="/cta-law.png" alt="Digital Law Gavel" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center bg-[#f8f9fa] p-10 md:p-16 relative">
              <h2 className="text-[36px] md:text-[46px] font-extrabold mb-4 text-black leading-[1.1] font-sans tracking-tight max-w-[420px]">{t('home.cta_title')}</h2>
              <p className="text-[#1c2f54]/60 font-sans font-light text-sm leading-relaxed max-w-sm mb-8">{t('home.cta_desc')}</p>
              <div>
                <Link href="/consultation">
                  <button className="bg-[#b42025] text-white rounded-full px-8 py-3.5 font-bold text-[14px] hover:bg-red-800 transition-colors shadow-lg hover:shadow-xl inline-block">{t('home.cta_button')}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
