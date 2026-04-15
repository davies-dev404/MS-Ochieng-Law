import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
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
    category: "Corporate Commercial Law"
  },
  {
    id: 2,
    title: "The Architecture of Capital Gains Tax in Kenya",
    snippet: "A structural breakdown of the 2024 Revenue Act amendments and their long-term implications for real estate and investment portfolios...",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Carrying-Out-a-Redundancy-Process-in-Kenya-768x583.webp",
    date: "Dec 15, 2025",
    author: "A. Korir",
    category: "Real Estate"
  },
  {
    id: 3,
    title: "Executive Stewardship: Beyond the Employment Act",
    snippet: "Managing high-value talent mandates requires more than statutory adherence; it requires strategic stewardship and industrial foresight...",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Carrying-Out-Termination-of-Employment-in-Kenya-768x449.webp",
    date: "Dec 10, 2025",
    author: "M.S. Ochieng",
    category: "Employment Law"
  }
];

const categories = ["All", "Corporate Commercial Law", "Employment Law", "Dispute Resolution", "Real Estate"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  return (
    <Layout>
      <section className="pt-48 pb-28 px-6 relative overflow-hidden border-b border-border bg-secondary">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80" 
            alt="Legal library" 
            className="w-full h-full object-cover opacity-20 grayscale" 
          />
          <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary/95 to-primary/15" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary to-transparent" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.5em] uppercase text-[10px] mb-8 flex items-center justify-center gap-5 font-bold">
              <span className="w-16 h-px bg-primary" />
              Strategic Intelligence
              <span className="w-16 h-px bg-primary" />
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl lg:text-7xl xl:text-8xl text-white mb-10 leading-none font-bold uppercase tracking-tighter flex items-center justify-center gap-4 whitespace-nowrap">
              Legal <span className="text-primary italic">Journal.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans text-white/50 text-xl font-light max-w-2xl leading-relaxed mx-auto">
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
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-6 px-10 py-10 border-b border-border transition-all duration-300 text-left relative ${
                    isActive ? "bg-white shadow-sm z-10" : "hover:bg-white/50"
                  }`}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />}
                  <span className={`font-serif-heading w-8 text-sm font-bold ${isActive ? "text-primary" : "text-secondary/30"}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-serif-sub tracking-[0.2em] uppercase text-[11px] font-bold ${isActive ? "text-primary" : "text-secondary/60"}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Blog Grid */}
          <div className="md:w-2/3 lg:w-3/4 bg-white p-10 md:p-20 relative overflow-hidden">
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
                  <article key={post.id} className="group flex flex-col border border-border bg-white hover:border-primary/40 hover:shadow-2xl transition-all duration-500 rounded-sm overflow-hidden">
                    <div className="relative overflow-hidden aspect-16/10 border-b border-border">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent opacity-40" />
                      <div className="absolute bottom-6 left-8 py-2 px-6 bg-primary text-white shadow-xl">
                        <p className="font-serif-sub tracking-[0.2em] text-[10px] uppercase font-bold">{post.date}</p>
                      </div>
                    </div>
                    <div className="p-12 flex flex-col grow">
                      <p className="font-serif-sub tracking-[0.3em] uppercase text-primary text-[10px] mb-6 font-bold">
                        {post.category}
                      </p>
                      <h2 className="font-serif-heading text-3xl text-secondary mb-8 leading-tight group-hover:text-primary transition-colors font-bold">
                        <Link href={`/blog/${post.id}`} className="no-underline text-inherit">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="font-sans text-foreground/50 text-sm font-light leading-relaxed mb-10 grow">
                        {post.snippet}
                      </p>
                      <div className="flex justify-between items-center border-t border-border pt-10 mt-auto">
                        <div className="flex items-center gap-4">
                          <img src="/ms-ochieng.jpg" alt={post.author} className="w-10 h-10 rounded-full object-cover border border-primary/20 shadow-md" />
                          <span className="font-serif-sub tracking-[0.2em] text-[10px] text-secondary/60 uppercase font-bold">{post.author}</span>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-primary hover:text-secondary transition-colors font-bold no-underline border-b border-primary/20 pb-1"
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
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto relative z-10">
          <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl lg:text-5xl xl:text-6xl text-white mb-10 font-bold uppercase tracking-tight flex items-center justify-center gap-4 whitespace-nowrap">
            Institutional <span className="text-primary italic">Intelligence.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-white/50 font-light mb-16 text-lg leading-relaxed max-w-xl mx-auto">
            Subscribe to receive preeminent legal briefings directly in your corporate inbox. No noise. Pure strategic foresight.
          </motion.p>
          <motion.form variants={fadeUp} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
             <input type="email" placeholder="Professional Email" className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans flex grow placeholder:text-white/20" />
             <button className="bg-primary text-white font-serif-sub tracking-[0.3em] uppercase text-[10px] px-12 py-5 font-bold hover:bg-white hover:text-secondary transition-all shadow-2xl shrink-0">
               Subscribe
             </button>
          </motion.form>
        </motion.div>
      </section>
    </Layout>
  );
}
