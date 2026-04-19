import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const practices = [
  {
    id: 1,
    title: "Family Law",
    subtitle: "Protecting Your Legacy & Future",
    desc: "We provide compassionate yet decisive legal stewardship for your most personal matters. Our family law practice is built on the principles of discretion, integrity, and long-term resolution.",
    details: "From complex matrimonial disputes to the creation of robust family trusts and estate planning, we ensure your personal and financial legacy is shielded from litigation and transition risks.",
    subPractices: [
      "Matrimonial & Divorce Law",
      "Child Custody & Maintenance",
      "Estate Planning & Wills",
      "Family Trusts & Succession"
    ],
    matters: "Successfully structured a high-value family trust across multiple jurisdictions to ensure a seamless leadership transition for a prominent enterprise.",
    img: "/practice/family-law.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    anchor: "family-law"
  },
  {
    id: 2,
    title: "Conveyancing & Real Estate",
    subtitle: "Asset Maximization & Seamless Transfer",
    desc: "We turn real estate mandates into high-fidelity assets. Our team ensures your property portfolios are secured and cleared for maximum commercial utility.",
    details: "Whether high-value acquisitions or complex structural project financing, we deliver absolute legal certainty in the most volatile property markets.",
    subPractices: [
      "Real Estate Investment Trusts (REITs)",
      "Project & Structured Finance",
      "Residential & Commercial Conveyancing",
      "Environmental & Planning Compliance"
    ],
    matters: "Seamlessly orchestrated the legal framework for a 500-unit urban development, ensuring zero regulatory delays.",
    img: "/practice/conveyancing.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    anchor: "conveyancing"
  },
  {
    id: 3,
    title: "Commercial & Business Law",
    subtitle: "Value Creation & Institutional Growth",
    desc: "We don't just advise; we architect strategic success. Our counsel positions your enterprise for maximum growth while neutralizing complex regulatory friction.",
    details: "From high-stakes M&A to structural restructuring, we ensure every transaction is a victory. We protect your commercial interest with surgical precision and deep regional foresight.",
    subPractices: [
      "Mergers & Acquisitions (M&A)",
      "Venture Capital & Private Equity",
      "Corporate Restructuring",
      "Regulatory & Governance Counsel"
    ],
    matters: "Engineered a $250M institutional capital structure for a Tier-1 regional bank, securing regulatory approval in record time.",
    img: "/practice/commercial.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    anchor: "commercial"
  },
  {
    id: 4,
    title: "Employment & Labour Law",
    subtitle: "Workforce Stability & Risk Mitigation",
    desc: "We transform labor relations into a strategic asset. Our practice ensures workforce harmony and institutional resilience against industrial disruptions.",
    details: "We safeguard your organization from costly litigation through proactive stewardship, from executive contracts to complex collective bargaining frameworks.",
    subPractices: [
      "Executive Remuneration & Benefits",
      "Trade Union & Industrial Relations",
      "Employee Stock Ownership Plans (ESOPs)",
      "Workplace Misconduct Investigations"
    ],
    matters: "Successfully shielded a global enterprise from a high-stakes class action redundancy claim, preserving both capital and reputation.",
    img: "/practice/employment.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    anchor: "employment"
  },
  {
    id: 5,
    title: "Intellectual Property",
    subtitle: "Asset Protection & Innovation Control",
    desc: "We secure your future by protecting your ideas today. Our IP practice is dedicated to the absolute control and monetization of your intellectual capital.",
    details: "We enforce your rights across the continent, ensuring that your innovations, brands, and trade secrets remain your exclusive commercial advantage.",
    subPractices: [
      "Trademark Registration & Portfolio Management",
      "Copyright & Licensing Agreements",
      "Trade Secret Protection",
      "IP Litigation & Enforcement"
    ],
    matters: "Neutralized systemic counterfeiting for a regional consumer brand, securing cross-border enforcement across three jurisdictions.",
    img: "/practice/intellectual-property.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    anchor: "intellectual-property"
  },
  {
    id: 6,
    title: "Legal Audit & Compliance",
    subtitle: "Institutional Resilience & Risk Control",
    desc: "We ensure your operations are beyond reproach. Our audit practice is designed to identify and neutralize regulatory legal risks before they manifest.",
    details: "We provide comprehensive governance reviews and compliance frameworks that serve as an unshakeable foundation for institutional growth and stability.",
    subPractices: [
      "Statutory Compliance Audits",
      "Internal Governance Reviews",
      "Data Protection & Privacy Audits",
      "ESG Compliance Strategy"
    ],
    matters: "Conducted a complete structural legal audit for a multinational corporation, resolving multi-year compliance gaps with 100% success.",
    img: "/practice/legal-audit.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    anchor: "legal-audit"
  },
  {
    id: 7,
    title: "Litigation & Dispute Resolution",
    subtitle: "Decisive Advocacy & Proven Victory",
    desc: "We litigate to win. Our courtroom strategy is focused on swift, favorable outcomes that protect your bottom line and commercial standing.",
    details: "We treat every dispute as a challenge to your commercial integrity, deploying relentless intellectual depth to secure clear and absolute victories across all courts.",
    subPractices: [
      "Commercial & Tax Litigation",
      "International Arbitration (ICC/ICSID)",
      "Constitutional & Judicial Review",
      "Debt Recovery & Securities Enforcement"
    ],
    matters: "Secured an absolute victory in a $45M international arbitration, defeating complex contractual frustration claims.",
    img: "/practice/litigation.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    anchor: "litigation"
  }
];

export default function Practice() {
  const [activeId, setActiveId] = useState(1);
  const activePractice = practices.find(p => p.id === activeId);

  const handleSelect = (id) => {
    setActiveId(id);
    // Smooth scroll to details on mobile only
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const detailSection = document.getElementById('practice-detail');
        if (detailSection) {
          const offset = 140; // Account for the fixed header
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = detailSection.getBoundingClientRect().top;
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

  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Legal Excellence
              </span>
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter translate-x-[-4px] whitespace-nowrap">
              PRACTICE <span className="text-[#cc2027]">AREAS.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mb-16 tracking-wide">
              Eight domains of preeminent legal advisory, each crafted with the structural precision and strategic foresight that defines the M.S. Ochieng standard.
            </motion.p>

            {/* Practice area count stats bar - Synced with Home */}
            
          </motion.div>
        </div>
      </section>

      {/* Sidebar + Detail */}
      <section className="bg-white border-b border-border min-h-screen">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-[360px] lg:w-[420px] border-r border-border bg-muted/5 flex flex-col">
            {practices.map((p) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`flex items-start gap-6 px-10 py-8 border-b border-border transition-all duration-500 text-left group relative ${isActive ? 'bg-white shadow-xl z-10' : 'hover:bg-white/60'}`}
                >
                  {/* Active left border accent */}
                  <span className={`absolute left-0 top-0 bottom-0 w-1.5 bg-[#cc2027] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                  {/* Drawing line on hover */}
                  <span className={`absolute bottom-0 left-0 h-px bg-[#cc2027] transition-all duration-700 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  
                  <div className={`mt-1 shrink-0 transition-colors duration-500 ${isActive ? 'text-[#cc2027]' : 'text-secondary/30 group-hover:text-[#cc2027]/60'}`}>
                    {p.icon}
                  </div>
                  <div>
                    <span className={`font-serif-sub tracking-[0.2em] uppercase text-[9px] mb-2 block font-bold transition-colors ${isActive ? 'text-[#cc2027]' : 'text-secondary/30 group-hover:text-[#cc2027]/50'}`}>
                      {String(p.id).padStart(2,"0")}
                    </span>
                    <h3 className={`font-serif-heading text-lg leading-tight transition-colors duration-500 font-bold ${isActive ? 'text-secondary' : 'text-secondary/60 group-hover:text-secondary/80'}`}>
                      {p.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div id="practice-detail" className="grow bg-white p-12 md:p-20 lg:p-28 relative overflow-hidden">
            {/* Background image for the active practice */}
            <div className="absolute inset-0 z-0">
              <img
                key={activePractice.id}
                src={activePractice.img}
                alt={activePractice.title}
                className="w-full h-full object-cover opacity-[0.04] grayscale scale-110 transition-all duration-1000"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 max-w-5xl"
              >
                <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 flex items-center gap-4 font-bold">
                  {activePractice.subtitle}
                </p>
                <h2 className="font-serif-heading text-4xl md:text-7xl text-secondary mb-8 leading-tight font-bold uppercase tracking-tighter">
                  {activePractice.title}
                </h2>
                <div className="h-1 w-24 bg-[#cc2027]/30 mb-16" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  {/* Left: Description */}
                  <div className="space-y-10">
                    <p className="font-sans text-foreground/70 text-xl font-light leading-relaxed">
                      {activePractice.desc}
                    </p>
                    <p className="font-sans text-foreground/50 text-base font-light leading-relaxed">
                      {activePractice.details}
                    </p>
                    
                    {/* Representative Matter */}
                    <div className="p-10 border-l-8 border-[#cc2027] bg-secondary text-white shadow-2xl">
                      <p className="font-serif-sub uppercase tracking-[0.3em] text-[9px] text-[#cc2027] mb-5 font-bold">Representative Mandate</p>
                      <p className="font-serif-sub text-lg text-white/80 leading-relaxed italic">
                        "{activePractice.matters}"
                      </p>
                    </div>
                  </div>

                  {/* Right: Sub-practices + CTA */}
                  <div className="space-y-10">
                    <h4 className="font-serif-heading text-2xl text-secondary font-bold uppercase tracking-widest border-b border-border pb-6">
                      Core Specializations
                    </h4>
                    <div className="grid grid-cols-1 gap-5">
                      {activePractice.subPractices.map((sub, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          key={i}
                          className="flex items-center gap-5 group/item py-3 border-b border-border/40 last:border-0"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#cc2027]/40 shrink-0 group-hover/item:scale-150 transition-transform" />
                          <span className="font-serif-sub tracking-[0.2em] uppercase text-[11px] text-secondary/80 font-bold group-hover/item:text-[#cc2027] transition-colors">{sub}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-10">
                      <Link
                        href="/consultation"
                        className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-secondary text-white px-16 py-6 hover:bg-[#cc2027] transition-all duration-500 font-bold no-underline shadow-2xl"
                      >
                        Request Mandate Discussion →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 px-6 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
            alt="Legal desk"
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/95 to-secondary/80" />
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#cc2027]/60 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-serif-sub text-[#cc2027] tracking-[0.5em] uppercase text-[10px] mb-10 font-bold">Institutional Counsel</p>
            <h2 className="font-serif-heading text-4xl lg:text-6xl xl:text-8xl mb-16 leading-none font-bold uppercase tracking-tighter flex items-center justify-center gap-4 whitespace-nowrap">
              Sovereign <span className="text-[#cc2027] italic">Strategy.</span>
            </h2>
            <Link
              href="/consultation"
              className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-[#cc2027] text-white border-2 border-[#cc2027] px-20 py-8 hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 font-bold no-underline shadow-4xl"
            >
              Request Strategic Audit →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
