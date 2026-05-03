import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Newspaper, ExternalLink, Calendar } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

export default function LegalNewsWidget({ hideHeader = false }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_SERP_API_KEY;
        if (!apiKey) throw new Error("Missing Serper API Key");

        const response = await fetch('/api/serper/news', {
          method: 'POST',
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            q: language === 'sw' ? "Sheria Kenya OR mahakama Kenya" : "Kenya legal updates OR court decisions OR law news",
            num: 8
          })
        });

        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        if (data && data.news) {
          setNews(data.news);
        } else {
          setNews([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [language]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-sm border border-dashed border-gray-200">
        <div className="w-10 h-10 border-3 border-[#cc2027] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#1c2f54]/40">{t('news.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 bg-red-50 text-red-500 rounded-sm border border-red-100 font-sans text-sm text-center">
        {error}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="w-full p-12 bg-gray-50 text-gray-400 rounded-sm border border-gray-100 font-sans text-sm text-center italic">
        {t('news.no_news')}
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className={`flex justify-between items-center mb-10 px-2 ${hideHeader ? 'absolute -top-32 right-0' : ''}`}>
        {!hideHeader && (
          <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#1c2f54] flex items-center gap-3">
            <Newspaper className="text-[#cc2027]" size={28} />
            <span>{t('news.title')} <span className="text-[#cc2027]">{t('news.subtitle')}</span></span>
          </h3>
        )}
        
        <div className="flex gap-3">
          <button onClick={scrollPrev} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${hideHeader ? 'border-[#1c2f54]/20 text-[#1c2f54] hover:bg-[#cc2027] hover:border-[#cc2027] hover:text-white' : 'border-gray-200 hover:bg-[#1c2f54] hover:text-white hover:border-[#1c2f54]'}`}>
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button onClick={scrollNext} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${hideHeader ? 'border-[#1c2f54]/20 text-[#1c2f54] hover:bg-[#cc2027] hover:border-[#cc2027] hover:text-white' : 'border-gray-200 hover:bg-[#1c2f54] hover:text-white hover:border-[#1c2f54]'}`}>
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {news.map((item, idx) => (
            <div key={idx} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6 pb-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full bg-white border border-gray-100 p-8 flex flex-col hover:shadow-xl hover:border-[#cc2027]/20 transition-all group/card relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50/50 rounded-bl-full -mr-12 -mt-12 group-hover/card:bg-[#cc2027]/5 transition-colors" />
                
                <div className="flex items-center gap-2 mb-6 text-[#cc2027] font-sans font-bold text-[10px] uppercase tracking-widest">
                  <Calendar size={12} />
                  <span>{item.date || "Recent Update"}</span>
                </div>
                
                <h4 className="font-serif-heading text-lg font-bold text-[#1c2f54] group-hover/card:text-[#cc2027] transition-colors leading-tight mb-4 line-clamp-3 italic">
                  {item.title}
                </h4>
                
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-8 line-clamp-4 font-light">
                  {item.snippet}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-tighter truncate max-w-[150px]">
                    {item.source || "Legal Update"}
                  </span>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-[#1c2f54] hover:text-[#cc2027] font-bold text-[11px] uppercase tracking-widest transition-all"
                  >
                    View Source <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
