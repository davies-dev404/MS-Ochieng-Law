import { motion } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import BrandMark from "@/components/BrandMark";
import { Building2, Target, Map } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const sectors = [
  {
    name: "Financial Services",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    name: "Private Equity",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  },
  {
    name: "Real Estate",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    name: "Energy & Infrastructure",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    name: "Tech & Innovation",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    name: "Government",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  }
];

const insights = [
  {
    title: "Regional Trade Compliance",
    date: "Dec 2025",
    link: "/blog/1"
  },
  {
    title: "Capital Gains Tax Shift",
    date: "Nov 2025",
    link: "/blog/2"
  },
  {
    title: "Employment Act Update",
    date: "Oct 2025",
    link: "/blog/3"
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80" 
            alt="M.S. Ochieng Legal Cityscape" 
            className="w-full h-full object-cover opacity-50 scale-105 animate-ken-burns" 
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-black/90" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </div>
 
        <div className="relative z-10 w-full px-6">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger} 
            className="max-w-6xl mx-auto flex flex-col items-center text-center"
          >
            <motion.div variants={fadeUp} className="mb-20">
              <div className="transition-transform duration-700 hover:scale-[1.01]">
                <BrandMark variant="gold" size="large" />
              </div>
            </motion.div>
 
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 mt-10">
              <Link 
                href="/consultation" 
                className="font-serif-sub tracking-[0.25em] uppercase text-xs bg-primary text-white px-14 py-6 hover:bg-white hover:text-secondary transition-all duration-500 font-bold no-underline text-center shadow-[0_0_40px_rgba(128,0,32,0.4)]"
              >
                Secure Strategic Counsel
              </Link>
              <Link 
                href="/practice" 
                className="font-serif-sub tracking-[0.25em] uppercase text-xs bg-transparent border border-white/20 text-white px-14 py-6 hover:border-primary hover:bg-primary/20 transition-all duration-500 no-underline text-center backdrop-blur-sm"
              >
                Our Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Firm Overview */}
      <section className="bg-white py-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={stagger} 
            className="flex flex-col lg:flex-row justify-between items-start gap-20"
          >
            <div className="lg:w-1/2">
              <p className="font-serif-sub text-primary tracking-[0.35em] uppercase text-[10px] mb-8 flex items-center gap-4">
                <span className="w-12 h-px bg-primary" />
                Firm Overview
              </p>
              <h2 className="font-serif-heading text-5xl md:text-7xl text-secondary leading-tight font-bold mb-10">
                Uncompromising standards <br /> <span className="text-primary italic">in every mandate.</span>
              </h2>
              <div className="h-1 w-24 bg-primary/20 mb-12" />
              <p className="font-sans text-foreground/70 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
                We recognize that our clients operate in an increasingly complex regulatory and commercial environment. Our approach is preemptive, strategic, and resolutely focused on commercial outcomes.
              </p>
            </div>
            
            <div className="lg:w-1/3 grid grid-cols-1 gap-12 pt-20">
               {[
                 { label: "Institutional Focus", desc: "Dedicated to the needs of tier-1 corporations and government entities.", icon: Building2 },
                 { label: "Strategic Finesse", desc: "Navigating complex legal landscapes with surgical precision.", icon: Target },
                 { label: "Regional Supremacy", desc: "Unmatched depth across East African jurisdictions.", icon: Map }
               ].map((item, i) => (
                 <motion.div variants={fadeUp} key={i} className="p-8 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 rounded-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                    <div className="text-primary mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      <item.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif-heading text-xl text-secondary mb-3 font-bold group-hover:text-primary transition-colors">{item.label}</h4>
                    <p className="font-sans text-foreground/50 text-sm font-light leading-relaxed">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Leadership Sectors */}
      <section className="bg-secondary py-40 px-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-28">
            <p className="font-serif-sub text-primary tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">Industry Reach</p>
            <h2 className="font-serif-heading text-4xl md:text-6xl font-bold">Strategic Sectors.</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
            {sectors.map((sector, idx) => (
              <motion.div 
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center gap-8 p-8 border border-white/5 hover:border-primary/50 transition-all duration-500 rounded-sm hover:bg-white/5"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-serif-heading text-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {sector.icon}
                </div>
                <p className="font-serif-sub tracking-widest uppercase text-[9px] text-white/60 group-hover:text-white text-center font-bold">
                  {sector.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Impact (Firm Metrics) */}
      <section className="py-40 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
             <div className="lg:w-1/2">
                <div className="relative group">
                   <div className="absolute -inset-4 border border-primary/10 translate-x-4 translate-y-4 -z-10" />
                   <div className="aspect-16/10 overflow-hidden rounded-sm shadow-2xl relative">
                      <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                        alt="Corporate Excellence" 
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                   </div>
                </div>
             </div>
             <div className="lg:w-1/2 grid grid-cols-2 gap-12">
                {[
                  { val: "15+", label: "Regional Jurisdictions" },
                  { val: "250+", label: "Fortune Global 500 Mandates" },
                  { val: "$4B+", label: "Structured Asset Value" },
                  { val: "99%", label: "Client Retainment Rate" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <span className="font-serif-heading text-4xl md:text-6xl text-primary font-bold">{stat.val}</span>
                    <span className="font-serif-sub tracking-widest uppercase text-[10px] text-secondary font-bold">{stat.label}</span>
                    <div className="h-px w-12 bg-primary/20" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Featured Success / Selling Points */}
      <section className="py-40 px-6 bg-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="font-serif-sub text-primary tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">Featured Mandates</p>
              <h2 className="font-serif-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">Proven Outcomes.</h2>
            </div>
            <p className="font-sans text-white/40 text-sm font-light max-w-xs mb-2">
              Confidentiality is our bedrock; performance is our signature. These anonymized mandates represent our recent success across the Republic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "$200M Regional Infrastructure Merger", 
                category: "Corporate Advisory", 
                impact: "Successful synthesis of multi-jurisdictional regulatory requirements within a record 90-day window." 
              },
              { 
                title: "Precedent-Setting Tax Victory", 
                category: "Litigation", 
                impact: "Secured a complete dismissal of a $45M tax claim for a Tier-1 regional manufacturing enterprise." 
              },
              { 
                title: "Sovereign Debt Restructuring", 
                category: "Finance", 
                impact: "Architected the legal framework for a critical $1.2B financing mandate for state-linked entities." 
              },
              { 
                title: "Nation-Wide Compliance Audit", 
                category: "Regulatory", 
                impact: "Mitigated structural risks for a retail conglomerate across 150+ operational sites in record time." 
              }
            ].map((mandate, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all duration-500 rounded-sm relative group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-serif-sub text-primary tracking-widest uppercase text-[9px] font-bold">{mandate.category}</span>
                  <div className="h-px w-8 bg-white/20 group-hover:w-16 group-hover:bg-primary transition-all duration-700" />
                </div>
                <h3 className="font-serif-heading text-2xl mb-6 font-bold leading-tight">{mandate.title}</h3>
                <p className="font-sans text-white/50 text-sm font-light leading-relaxed mb-8">
                  {mandate.impact}
                </p>
                <Link href="/consultation" className="font-serif-sub tracking-[0.2em] uppercase text-[9px] text-primary/60 hover:text-white transition-colors no-underline font-bold">
                  Request Case Briefing →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Briefings (Blog Preview) */}
      <section className="py-40 px-6 bg-muted/5 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
             <div className="max-w-xl">
                <p className="font-serif-sub text-primary tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">Knowledge Capital</p>
                <h2 className="font-serif-heading text-4xl md:text-5xl text-secondary font-bold uppercase tracking-tight">Latest Briefings.</h2>
             </div>
             <Link 
               href="/blog" 
               className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-primary border-b border-primary/30 hover:border-primary pb-1 no-underline font-bold transition-all"
             >
               View All Journal Records →
             </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {insights.map((article, idx) => (
               <article key={idx} className="bg-white border border-border p-12 hover:shadow-2xl hover:border-primary/30 transition-all duration-500 rounded-sm flex flex-col items-start min-h-[400px]">
                  <p className="font-serif-sub tracking-[0.3em] uppercase text-primary text-[9px] mb-8 font-bold">{article.date}</p>
                  <h3 className="font-serif-heading text-3xl text-secondary mb-10 leading-tight font-bold grow">{article.title}</h3>
                  <Link 
                    href={article.link} 
                    className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-secondary/60 hover:text-primary transition-colors no-underline font-bold"
                  >
                    Read Analysis →
                  </Link>
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 px-6 bg-secondary text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
             <motion.h2 variants={fadeUp} className="font-serif-heading text-3xl lg:text-5xl xl:text-6xl mb-12 leading-tight font-bold flex flex-wrap md:flex-nowrap items-center justify-center gap-3 md:gap-4 whitespace-nowrap">
               <span>Refining the standard of</span> <span className="text-primary italic">legal mastery.</span>
             </motion.h2>
             <motion.div variants={fadeUp}>
               <Link 
                 href="/consultation" 
                 className="inline-block font-serif-sub tracking-[0.3em] uppercase text-xs bg-primary text-white border-2 border-primary px-16 py-6 hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 font-bold no-underline shadow-2xl"
               >
                 Request Strategic Audit
               </Link>
             </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
