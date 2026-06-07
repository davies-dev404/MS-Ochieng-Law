import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Newspaper, ExternalLink, Calendar, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

// Multiple RSS queries to maximize real-time hit rate
const RSS_QUERIES = [
  `https://news.google.com/rss/search?q=Kenya+court+ruling+legal+when:3d&hl=en-KE&gl=KE&ceid=KE:en`,
  `https://news.google.com/rss/search?q=Kenya+law+advocate+tribunal+when:3d&hl=en-KE&gl=KE&ceid=KE:en`,
  `https://news.google.com/rss/search?q=Nairobi+High+Court+ruling+when:3d&hl=en-KE&gl=KE&ceid=KE:en`,
];

function stripHtml(html = '') {
  return html.replace(/<[^>]*>?/gm, '').replace(/&[a-z]+;/gi, ' ').trim();
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d)) return 'Recent';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return 'Recent';
  }
}

async function fetchFromQuery(rssUrl) {
  // Cache-bust the rss2json call itself, NOT the inner RSS URL (which would cause 422 from Google)
  const cb = Date.now();
  const encoded = encodeURIComponent(rssUrl);
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encoded}&_=${cb}`);
  if (!res.ok) throw new Error('Feed error');
  const data = await res.json();
  if (!data || data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) {
    throw new Error('No items');
  }
  return data.items;
}

function parseItems(rawItems) {
  return rawItems.map(item => {
    const parts = (item.title || '').split(' - ');
    const source = parts.length > 1 ? parts.pop().trim() : 'Legal Update';
    const cleanTitle = parts.join(' - ').trim();
    const snippet = item.description
      ? stripHtml(item.description).substring(0, 180) + '...'
      : 'Click to read the full legal update.';
    return {
      title: cleanTitle || item.title,
      snippet,
      link: item.link || '#',
      date: formatDate(item.pubDate),
      source,
    };
  });
}

export default function LegalNewsWidget({ hideHeader = false, itemsLimit, showMoreLink }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  async function fetchNews() {
    setLoading(true);
    setFetchFailed(false);

    // Try each RSS query in sequence, merge unique results
    const seen = new Set();
    const merged = [];

    for (const query of RSS_QUERIES) {
      try {
        const rawItems = await fetchFromQuery(query);
        const parsed = parseItems(rawItems);
        for (const item of parsed) {
          // Deduplicate by title keyword
          const key = item.title.substring(0, 40).toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            merged.push(item);
          }
        }
        if (merged.length >= 12) break; // enough results, stop fetching more
      } catch {
        // Try next query silently
      }
    }

    if (merged.length > 0) {
      setNews(merged);
      setLastFetched(new Date());
    } else {
      setFetchFailed(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchNews();
  }, [language]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-sm border border-dashed border-gray-200">
        <div className="w-10 h-10 border-[3px] border-[#cc2027] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-[#1c2f54]/40">
          {t('news.loading') || 'Loading latest legal news…'}
        </p>
      </div>
    );
  }

  if (fetchFailed || news.length === 0) {
    return (
      <div className="w-full p-12 flex flex-col items-center gap-6 bg-gray-50 rounded-sm border border-gray-100 text-center">
        <Newspaper size={36} className="text-[#1c2f54]/20" />
        <div>
          <p className="font-sans text-sm font-bold text-[#1c2f54] mb-2">Live feed temporarily unavailable</p>
          <p className="font-sans text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
            We couldn't reach the live news feed right now. Please try again shortly.
          </p>
        </div>
        <button
          onClick={fetchNews}
          className="flex items-center gap-2 text-[#cc2027] font-bold text-xs uppercase tracking-widest hover:underline"
        >
          <RefreshCw size={13} /> Retry
        </button>
      </div>
    );
  }

  const displayNews = itemsLimit ? news.slice(0, itemsLimit) : news;

  const NewsCard = ({ item, idx }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07 }}
      className="h-full bg-white border border-gray-100 p-8 flex flex-col hover:shadow-xl hover:border-[#cc2027]/20 transition-all group/card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50/50 rounded-bl-full -mr-12 -mt-12 group-hover/card:bg-[#cc2027]/5 transition-colors" />

      <div className="flex items-center gap-2 mb-6 text-[#cc2027] font-sans font-bold text-[10px] uppercase tracking-widest">
        <Calendar size={12} />
        <span>{item.date}</span>
      </div>

      <h4 className="font-serif-heading text-lg font-bold text-[#1c2f54] group-hover/card:text-[#cc2027] transition-colors leading-tight mb-4 line-clamp-3 italic">
        {item.title}
      </h4>

      <p className="font-sans text-sm text-gray-500 leading-relaxed mb-8 line-clamp-4 font-light">
        {item.snippet}
      </p>

      <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-tighter truncate max-w-[150px]">
          {item.source}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#1c2f54] hover:text-[#cc2027] font-bold text-[11px] uppercase tracking-widest transition-all"
        >
          {t('news.view_source') || 'View Source'} <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="relative group">
      <div className={`flex items-center px-2 ${hideHeader ? 'justify-between mb-6' : 'justify-between mb-10'}`}>
        {!hideHeader && (
          <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#1c2f54] flex items-center gap-3">
            <Newspaper className="text-[#cc2027]" size={28} />
            <span>{t('news.title')} <span className="text-[#cc2027]">{t('news.subtitle')}</span></span>
          </h3>
        )}

        <div className="flex items-center gap-4 ml-auto">
          {lastFetched && (
            <span className="hidden md:block text-[9px] font-sans text-gray-400 uppercase tracking-widest">
              Live · {lastFetched.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <div className="flex gap-3 lg:hidden">
            <button onClick={scrollPrev} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${hideHeader ? 'border-[#1c2f54]/20 text-[#1c2f54] hover:bg-[#cc2027] hover:border-[#cc2027] hover:text-white' : 'border-gray-200 hover:bg-[#1c2f54] hover:text-white hover:border-[#1c2f54]'}`}>
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button onClick={scrollNext} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${hideHeader ? 'border-[#1c2f54]/20 text-[#1c2f54] hover:bg-[#cc2027] hover:border-[#cc2027] hover:text-white' : 'border-gray-200 hover:bg-[#1c2f54] hover:text-white hover:border-[#1c2f54]'}`}>
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className={`hidden lg:grid gap-6 ${itemsLimit === 1 ? 'grid-cols-1' : (hideHeader ? 'grid-cols-3' : 'grid-cols-1')}`}>
        {displayNews.map((item, idx) => (
          <div key={idx} className="h-full">
            <NewsCard item={item} idx={idx} />
          </div>
        ))}
      </div>

      {/* Mobile & Tablet Carousel */}
      <div className="embla overflow-hidden lg:hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {displayNews.map((item, idx) => (
            <div key={idx} className={`embla__slide pl-4 md:pl-6 pb-4 ${itemsLimit === 1 ? 'flex-[0_0_100%]' : 'flex-[0_0_100%] md:flex-[0_0_50%]'}`}>
              <NewsCard item={item} idx={idx} />
            </div>
          ))}
        </div>
      </div>

      {showMoreLink && (
        <div className="mt-12 flex justify-center">
          <Link href={showMoreLink}>
            <button className="bg-[#1c2f54] text-white rounded-none px-10 py-4 font-extrabold text-[12px] tracking-widest uppercase hover:bg-[#111c33] transition-colors shadow-sm">
              {t('news.view_all')}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
