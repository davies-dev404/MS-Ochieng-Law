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
    title: "Family & Children",
    subtitle: "Protecting Legacy & Future Generations",
    desc: "We provide kind and clear legal help for your family matters. Our work is built on trust and finding the best way forward for everyone involved.",
    details: "From divorce cases to creating family trusts and wills, we make sure your family's future is protected from legal fights and unneeded stress.",
    subPractices: [
      "Matrimonial & Divorce Law",
      "Child Custody & Maintenance",
      "Estate Planning & Wills",
      "Family Trusts & Succession"
    ],
    matters: "Implementing a mediation-first approach to divorce and custody matters to prioritize family stability and future well-being.",
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
    title: "Conveyancing, Property & Real Estate",
    subtitle: "Asset Maximization & Seamless Transfer",
    desc: "We turn your property goals into reality. Our team ensures your property portfolios are secured and cleared for the best use.",
    details: "Whether acquisitions or project financing guidance, we deliver legal certainty in the property markets through meticulous due diligence.",
    subPractices: [
      "Real Estate Due Diligence",
      "Lease Agreements & Licenses",
      "Residential & Commercial Conveyancing",
      "Environmental & Planning Compliance"
    ],
    matters: "Developing comprehensive due diligence frameworks to eliminate title risks in residential and commercial property transfers.",
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
    title: "Commercial Law & Corporate Legal Advisory",
    subtitle: "Value Creation & Institutional Growth",
    desc: "We don't just advise; we architect success. Our counsel positions your enterprise for growth while neutralizing regulatory friction.",
    details: "From business formation to structural advice, we ensure every transaction is strategically sound. We protect your commercial interest with precision and foresight.",
    subPractices: [
      "Business & Startup Formation",
      "Commercial Contract Drafting",
      "Corporate Governance & Restructuring",
      "Regulatory Compliance Strategy"
    ],
    matters: "Advising emerging enterprises on scalable corporate governance frameworks to attract institutional investment and ensure compliance.",
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
    title: "Immigration",
    subtitle: "Global Mobility & Sovereign Access",
    desc: "We navigate the complexities of global borders. Our immigration practice ensures a seamless transition for individuals and corporate teams entering the Kenyan market.",
    details: "From residency applications to work permit guidance, we provide a clear path for global talent and investment through strategic advisory.",
    subPractices: [
      "Work Permits & Permanent Residency",
      "Corporate Mobility & Relocation",
      "Investor Visas & Residency",
      "Immigration Compliance Guidance"
    ],
    matters: "Streamlining expatriate relocation processes through meticulous documentation and proactive regulatory engagement.",
    img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1920&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    anchor: "immigration"
  },
  {
    id: 5,
    title: "Civil & Criminal Litigation",
    subtitle: "Decisive Advocacy & Proven Victory",
    desc: "We litigate with precision. Our courtroom strategy is focused on favorable outcomes that protect your bottom line and commercial standing.",
    details: "We treat every dispute as a priority, deploying intellectual depth and rigorous research to secure victories across all courts and tribunals.",
    subPractices: [
      "Commercial & Tax Litigation",
      "Criminal Defense & Representation",
      "Constitutional & Judicial Review",
      "Securities & Debt Recovery"
    ],
    matters: "Deploying evidence-based litigation strategies to secure favorable rulings in complex commercial and civil disputes.",
    img: "/practice/litigation.jpg",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    anchor: "litigation"
  },
  {
    id: 6,
    title: "ADR, Mediation & Strategic Negotiation",
    subtitle: "Resolution Beyond Conflict",
    desc: "Conflict is an opportunity for resolution. Our ADR practice focuses on high-level mediation and strategic negotiation to protect commercial relationships.",
    details: "We deliver settlement frameworks that bypass the friction of traditional litigation, ensuring speed, confidentiality, and commercial continuity.",
    subPractices: [
      "Commercial Mediation",
      "Conflict Resolution Strategy",
      "Strategic Negotiation Management",
      "Arbitration Representation"
    ],
    matters: "Prioritizing win-win negotiation strategies to resolve commercial disputes quickly while preserving key business partnerships.",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    anchor: "adr"
  },
  {
    id: 7,
    title: "Intellectual Property, Tech & Data Privacy",
    subtitle: "Asset Protection & Digital Sovereignty",
    desc: "We secure your future by protecting your ideas today. Our IP and Tech practice is dedicated to the control and monetization of your intellectual and digital capital.",
    details: "We enforce your rights, ensuring that your innovations, brands, and data remain protected in the digital economy.",
    subPractices: [
      "Trademark & Copyright Registration",
      "Data Protection & Privacy Audits",
      "Software & Tech Licensing",
      "Digital Media Rights"
    ],
    matters: "Ensuring digital enterprises maintain absolute compliance with emerging data protection regulations through proactive auditing.",
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
    id: 8,
    title: "Employment & Labor Law",
    subtitle: "Workforce Stability & Risk Mitigation",
    desc: "We transform labor relations into a strategic asset. Our practice ensures workforce harmony and institutional resilience.",
    details: "We safeguard your organization through proactive stewardship, from executive contracts to robust internal HR policies.",
    subPractices: [
      "Executive Contracts & Benefits",
      "Internal HR Policy Development",
      "Employee Dispute Resolution",
      "Workplace Compliance Reviews"
    ],
    matters: "Drafting iron-clad employment frameworks that minimize litigation risk while fostering productive workforce cultures.",
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
    id: 9,
    title: "Media & Entertainment Law",
    subtitle: "Content Protection & Talent Stewardship",
    desc: "We protect the architects of culture. Our media practice ensures that creators and enterprises maintain control over their intellectual and commercial output.",
    details: "From talent contracts to production financing guidance, we provide the legal framework for the modern creative economy.",
    subPractices: [
      "Talent Representation & Agreements",
      "Production & Distribution Contracts",
      "Digital Rights Management",
      "Defamation & Media Counsel"
    ],
    matters: "Providing strategic counsel to creative professionals to ensure fair monetization and long-term protection of intellectual property.",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    anchor: "media-entertainment"
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
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Legal Excellence
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter whitespace-nowrap">
              PRACTICE <span className="text-[#cc2027]">AREAS.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide mb-16">
              Nine domains of dedicated legal advisory, each crafted with the precision and strategic foresight that defines the M.S. Ochieng standard.
            </motion.p>
            
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
                      <p className="font-serif-sub uppercase tracking-[0.3em] text-[10px] text-[#cc2027] mb-5 font-bold">Strategic Engagement</p>
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
                        Request Consultation →
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
            <p className="font-serif-sub text-[#cc2027] tracking-[0.5em] uppercase text-[10px] mb-10 font-bold">Dedicated Counsel</p>
            <h2 className="font-serif-heading text-4xl lg:text-5xl xl:text-7xl mb-16 leading-none font-bold uppercase tracking-tighter flex items-center justify-center gap-4 whitespace-nowrap text-white">
              Innovation. Integrity. <br className="md:hidden" />
              <span className="text-[#cc2027] italic">Commitment. Excellence.</span>
            </h2>
            <Link
              href="/consultation"
              className="inline-block font-serif-sub tracking-[0.3em] uppercase text-[11px] bg-[#cc2027] text-white border-2 border-[#cc2027] px-20 py-8 hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 font-bold no-underline shadow-4xl"
            >
              Start Your Journey →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
