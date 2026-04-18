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
    title: "Corporate Commercial Law",
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
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    id: 2,
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
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Dispute Resolution",
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
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Real Estate & Conveyancing",
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
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Banking & Finance Law",
    subtitle: "Capital Control & Regulatory Supremacy",
    desc: "We bridge the gap between financial ambition and regulatory reality. Our counsel secures your capital flows and fortifies your institutional standing.",
    details: "From syndicated lending to Central Bank compliance, we architect financial instruments that serve as the bedrock of your institution's success.",
    subPractices: [
      "Syndicated & Project Lending",
      "Capital Markets & Securities",
      "Central Bank Regulatory Compliance",
      "Non-Performing Loans & Receivership"
    ],
    matters: "Masterminded a $180M syndicated legacy facility for major energy infrastructure, meeting all cross-border requirements.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Taxation Law",
    subtitle: "Strategic Tax Shield & Resolution",
    desc: "We protect your wealth from regulatory overreach. Our tax architecture is built for commercial optimality and absolute legislative compliance.",
    details: "We don't just react to tax issues; we preempt them. Our victory in tax disputes is the result of rigorous strategic planning and deep procedural mastery.",
    subPractices: [
      "Corporate & International Tax Planning",
      "Transfer Pricing & Base Erosion",
      "KRA Objections & Tax Appeals",
      "Value Added Tax (VAT) Compliance"
    ],
    matters: "Successfully quashed a $30M KRA assessment through aggressive strategic transfer pricing advocacy.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    id: 7,
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
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  },
  {
    id: 8,
    title: "Immigration & Citizenship Law",
    subtitle: "Global Mobility & Talent Access",
    desc: "We eliminate borders for institutional success. Our team ensures that your global talent and executive leadership have seamless access to the Kenyan market.",
    details: "We provide total regulatory certainty in immigration status, ensuring that your workforce stays focused on your commercial mission, not administrative hurdles.",
    subPractices: [
      "Class G / Investor Work Permits",
      "Dependent & Family Passes",
      "Citizenship & Naturalisation Advisory",
      "Immigration Compliance Audits"
    ],
    matters: "Seamlessly relocated a 40-person executive leadership team to Nairobi with zero operational downtime.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
];

export default function Practice() {
  const [activeId, setActiveId] = useState(1);
  const activePractice = practices.find(p => p.id === activeId);

  return (
    <Layout>
      {/* Hero Section with deep background */}
      <section className="pt-48 pb-20 px-6 bg-secondary relative overflow-hidden">
        {/* Multi-layer hero background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1920&q=80"
            alt="Legal chambers interior"
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary/95 to-primary/20" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary to-transparent" />
          {/* Decorative grid overlay */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.5em] uppercase text-xs mb-8 flex items-center gap-5 font-bold">
              <span className="w-20 h-px bg-primary" />
              Legal Excellence
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-6xl md:text-9xl text-white mb-10 leading-none font-bold uppercase tracking-tighter flex items-center gap-4 whitespace-nowrap">
              Practice <span className="text-primary italic">Areas.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans text-white/50 text-xl font-light leading-relaxed max-w-2xl mb-16">
              Eight domains of preeminent legal advisory, each crafted with the structural precision and strategic foresight that defines the M.S. Ochieng standard.
            </motion.p>

            {/* Practice area count bar */}
            <motion.div variants={fadeUp} className="flex gap-16 border-t border-white/10 pt-10">
              {[
                { num: "08", label: "Practice Areas" },
                { num: "15+", label: "Jurisdictions" },
                { num: "99%", label: "Client Retention" }
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-serif-heading text-3xl text-primary font-bold">{stat.num}</p>
                  <p className="font-serif-sub tracking-[0.2em] uppercase text-[10px] text-white/40 font-bold mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
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
                  onClick={() => setActiveId(p.id)}
                  className={`flex items-start gap-6 px-10 py-8 border-b border-border transition-all duration-500 text-left group relative ${isActive ? 'bg-white shadow-xl z-10' : 'hover:bg-white/60'}`}
                >
                  {/* Active left border accent */}
                  <span className={`absolute left-0 top-0 bottom-0 w-1.5 bg-primary transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                  {/* Drawing line on hover */}
                  <span className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-700 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  
                  <div className={`mt-1 shrink-0 transition-colors duration-500 ${isActive ? 'text-primary' : 'text-secondary/30 group-hover:text-primary/60'}`}>
                    {p.icon}
                  </div>
                  <div>
                    <span className={`font-serif-sub tracking-[0.2em] uppercase text-[9px] mb-2 block font-bold transition-colors ${isActive ? 'text-primary' : 'text-secondary/30 group-hover:text-primary/50'}`}>
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
          <div className="grow bg-white p-12 md:p-20 lg:p-28 relative overflow-hidden">
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
                <p className="font-serif-sub text-primary tracking-[0.4em] uppercase text-[10px] mb-6 flex items-center gap-4 font-bold">
                  {activePractice.subtitle}
                </p>
                <h2 className="font-serif-heading text-4xl md:text-7xl text-secondary mb-8 leading-tight font-bold uppercase tracking-tighter">
                  {activePractice.title}
                </h2>
                <div className="h-1 w-24 bg-primary/30 mb-16" />

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
                    <div className="p-10 border-l-8 border-primary bg-secondary text-white shadow-2xl">
                      <p className="font-serif-sub uppercase tracking-[0.3em] text-[9px] text-primary mb-5 font-bold">Representative Mandate</p>
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
                          <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0 group-hover/item:scale-150 transition-transform" />
                          <span className="font-serif-sub tracking-[0.2em] uppercase text-[11px] text-secondary/80 font-bold group-hover/item:text-primary transition-colors">{sub}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-10">
                      <Link
                        href="/consultation"
                        className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-secondary text-white px-16 py-6 hover:bg-primary transition-all duration-500 font-bold no-underline shadow-2xl"
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
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-serif-sub text-primary tracking-[0.5em] uppercase text-[10px] mb-10 font-bold">Institutional Counsel</p>
            <h2 className="font-serif-heading text-4xl lg:text-6xl xl:text-8xl mb-16 leading-none font-bold uppercase tracking-tighter flex items-center justify-center gap-4 whitespace-nowrap">
              Sovereign <span className="text-primary italic">Strategy.</span>
            </h2>
            <Link
              href="/consultation"
              className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-primary text-white border-2 border-primary px-20 py-8 hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 font-bold no-underline shadow-4xl"
            >
              Request Strategic Audit →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
