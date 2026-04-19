import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SocialSidebar from "@/components/SocialSidebar";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const blogPosts = [
  {
    id: 1,
    title: "Regional Trade Compliance & Institutional Risk",
    snippet: "Analyzing the evolving landscape of EAC trade protocols and the resulting compliance requirements for multi-national corporations...",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Sexual-Harassment-Policy-in-Kenya-768x480.webp",
    date: "Dec 20, 2025",
    author: "M.S. Ochieng",
    category: "Commercial and Corporate Law"
  },
  {
    id: 2,
    title: "The Architecture of Capital Gains Tax in Kenya",
    snippet: "A structural breakdown of the 2024 Revenue Act amendments and their long-term implications for real estate and investment portfolios...",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Carrying-Out-a-Redundancy-Process-in-Kenya-768x583.webp",
    date: "Dec 15, 2025",
    author: "A. Korir",
    category: "Conveyancing and Property Law"
  },
  {
    id: 3,
    title: "Executive Stewardship: Beyond the Employment Act",
    snippet: "Managing high-value talent mandates requires more than statutory adherence; it requires strategic stewardship and industrial foresight...",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Carrying-Out-Termination-of-Employment-in-Kenya-768x449.webp",
    date: "Dec 10, 2025",
    author: "M.S. Ochieng",
    category: "Employment and Labour Law"
  }
];

const categories = ["All", "Commercial and Corporate Law", "Conveyancing and Property Law", "Employment and Labour Law", "Family Law"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    // Smooth scroll to blog list on mobile only
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const blogList = document.getElementById('blog-list');
        if (blogList) {
          const offset = 140; // Account for the fixed header
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = blogList.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  return (
    <Layout>
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
                Legal Excellence
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-8 md:mb-10 leading-[0.9] tracking-tighter uppercase">
              LEGAL <span className="text-[#cc2027]">JOURNAL.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide px-4">
              Preeminent legal perspectives from our leading practitioners. We distil the most complex legislative changes into actionable strategic intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[800px]">
          {/* Sidebar Categories */}
          <div className="md:w-1/3 lg:w-1/4 border-r border-border flex flex-col bg-muted/5 pt-10">
            {categories.map((cat, idx) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-6 px-10 py-10 border-b border-border transition-all duration-300 text-left relative ${
                    isActive ? "bg-white shadow-sm z-10" : "hover:bg-white/50"
                  }`}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#cc2027]" />}
                  <span className={`font-serif-heading w-8 text-sm font-bold ${isActive ? "text-[#cc2027]" : "text-secondary/30"}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-serif-sub tracking-[0.2em] uppercase text-[11px] font-bold ${isActive ? "text-[#cc2027]" : "text-secondary/60"}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Blog Posts List */}
          <div id="blog-list" className="md:w-2/3 lg:w-3/4 bg-white p-10 md:p-20 relative overflow-hidden">
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
                        {post.category}
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
                          Read Article →
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
          <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl lg:text-5xl xl:text-6xl text-white mb-10 font-bold uppercase tracking-tight flex items-center justify-center gap-4 whitespace-nowrap">
            Institutional <span className="text-[#cc2027] italic">Intelligence.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-white/50 font-light mb-16 text-lg leading-relaxed max-w-xl mx-auto">
            Subscribe to receive preeminent legal briefings directly in your corporate inbox. No noise. Pure strategic foresight.
          </motion.p>
          <motion.form variants={fadeUp} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
             <input type="email" placeholder="Professional Email" className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-[#cc2027] transition-all rounded-sm font-sans flex grow placeholder:text-white/20" />
             <button className="bg-[#cc2027] text-white font-serif-sub tracking-[0.3em] uppercase text-[10px] px-12 py-5 font-bold hover:bg-white hover:text-secondary transition-all shadow-2xl shrink-0">
               Subscribe
             </button>
          </motion.form>
        </motion.div>
      </section>
    </Layout>
  );
}
