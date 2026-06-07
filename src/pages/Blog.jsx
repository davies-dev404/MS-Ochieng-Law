import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SocialSidebar from "@/components/SocialSidebar";
import NewsletterForm from "@/components/NewsletterForm";
import LegalNewsWidget from "@/components/LegalNewsWidget";
import { Link } from "wouter";
import { getBlogPosts } from "@/lib/blogData";
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

export default function Blog() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState(getBlogPosts());

  useEffect(() => {
    const refreshPosts = () => {
      setBlogPosts(getBlogPosts());
    };

    // Listen for local events
    window.addEventListener('blog-updated', refreshPosts);
    // Listen for storage events (cross-tab same browser)
    window.addEventListener('storage', refreshPosts);
    
    return () => {
      window.removeEventListener('blog-updated', refreshPosts);
      window.removeEventListener('storage', refreshPosts);
    };
  }, []);

  const categories = [
    { id: "All", label: t('blog.categories.all') },
    { id: "Conveyancing & Property", label: t('blog.categories.conveyancing') },
    { id: "Commercial Law", label: t('blog.categories.commercial') },
    { id: "Immigration", label: t('blog.categories.immigration') },
    { id: "Family Law", label: t('blog.categories.family') },
    { id: "Litigation", label: t('blog.categories.litigation') },
    { id: "ADR & Negotiation", label: t('blog.categories.adr') },
    { id: "IP & Data Privacy", label: t('blog.categories.ip') },
    { id: "Employment Law", label: t('blog.categories.employment') },
    { id: "Media & Entertainment", label: t('blog.categories.media') },
    { id: "Taxation Law", label: t('blog.categories.taxation') }
  ];

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const blogList = document.getElementById('blog-list');
        if (blogList) {
          const offset = 140;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = blogList.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  return (
    <Layout title={t('nav.blog')} description={t('blog.desc')}>
      <SocialSidebar />
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                {t('blog.label')}
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif-heading mb-10 leading-tight md:leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              {t('blog.title').split(' ')[0]} <span className="text-[#cc2027]">{t('blog.title').split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide px-4">
              {t('blog.desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row">
          
          {/* ─── Left: Modern Vertical Sidebar ─── */}
          <div className="md:w-[340px] lg:w-[400px] shrink-0 border-r border-border bg-[#0b1628] flex flex-col md:sticky md:top-0 md:h-screen md:overflow-y-auto z-20">
            {/* Sidebar header */}
            <div className="px-8 pt-10 pb-6 border-b border-white/10">
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px] block mb-3">Categories</span>
              <p className="font-sans text-white/40 text-xs font-light leading-relaxed">Filter our legal insights by practice area.</p>
            </div>

            {/* Navigation list */}
            <nav className="flex-1 py-4">
              {categories.map((cat, idx) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full flex items-center gap-5 px-8 py-5 text-left group relative transition-all duration-300 ${
                      isActive
                        ? 'bg-white/6 border-r-0'
                        : 'hover:bg-white/3'
                    }`}
                  >
                    {/* Active left-edge accent */}
                    <span className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#cc2027] transition-all duration-300 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} />

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span className={`block font-serif-sub tracking-[0.2em] uppercase text-[9px] mb-1 font-bold transition-colors ${isActive ? 'text-[#cc2027]' : 'text-white/25 group-hover:text-white/40'}`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className={`block font-serif-heading text-[15px] leading-tight font-bold transition-colors duration-300 truncate ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>
                        {cat.label}
                      </span>
                    </div>

                    {/* Active dot */}
                    <div className={`w-1.5 h-1.5 rounded-full bg-[#cc2027] shrink-0 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </nav>

            <div className="px-8 py-8 border-t border-white/10">
              <LegalNewsWidget hideHeader={true} itemsLimit={1} showMoreLink={false} />
            </div>
          </div>

          {/* ─── Right: Active Content Panel ─── */}
          <div id="blog-list" className="flex-1 bg-white p-8 md:p-16 lg:p-24 relative min-h-[80vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16"
              >
                {filteredPosts.map(post => (
                  <article key={post.id} className="group flex flex-col border border-border bg-white hover:border-[#cc2027]/40 hover:shadow-2xl transition-all duration-500 rounded-sm overflow-hidden">
                    <div className="relative overflow-hidden aspect-16/10 border-b border-border">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent opacity-40" />
                      <div className="absolute bottom-6 left-8 py-2 px-6 bg-[#cc2027] text-white shadow-xl">
                        <p className="font-serif-sub tracking-[0.2em] text-[10px] uppercase font-bold">{post.date}</p>
                      </div>
                    </div>
                    <div className="p-12 flex flex-col grow">
                      <p className="font-serif-sub tracking-[0.3em] uppercase text-[#cc2027] text-[10px] mb-6 font-bold">
                        {categories.find(c => c.id === post.category)?.label || post.category}
                      </p>
                      <h3 className="font-serif-heading text-xl md:text-2xl leading-tight text-secondary group-hover:text-[#cc2027] transition-colors font-bold">
                        <Link href={`/blog/${post.id}`} className="no-underline text-inherit">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="font-sans text-foreground/50 text-[11px] md:text-xs font-light leading-relaxed mt-4 line-clamp-2 md:line-clamp-none">
                        {post.snippet}
                      </p>
                      <div className="flex justify-between items-center border-t border-border pt-10 mt-auto">
                        <div className="flex items-center gap-4">
                          <img src="/ms-ochieng.jpg" alt={post.author} className="w-10 h-10 rounded-full object-cover border border-[#cc2027]/20 shadow-md" />
                          <span className="font-serif-sub tracking-[0.2em] text-[10px] text-secondary/60 uppercase font-bold">{post.author}</span>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-[#cc2027] hover:text-secondary transition-colors font-bold no-underline border-b border-[#cc2027]/20 pb-1"
                        >
                          {t('blog.read_article')} →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-40 px-6 bg-secondary text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#cc2027]/5 -skew-x-12 translate-x-1/2" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto relative z-10">
          <motion.h2 variants={fadeUp} className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-10 font-bold uppercase tracking-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center leading-[1.1]">
            {t('blog.intel_title').split(' ')[0]} <span className="text-[#cc2027] italic">{t('blog.intel_title').split(' ').slice(1).join(' ')}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-white/50 font-light mb-16 text-lg leading-relaxed max-w-xl mx-auto">
            {t('blog.intel_desc')}
          </motion.p>
          <NewsletterForm fadeUp={fadeUp} />
        </motion.div>
      </section>
    </Layout>
  );
}
