import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { Scale, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const pillars = [
  { 
    title: "Structural Integrity", 
    desc: "Every legal stratagem must be rooted in immutable jurisprudence. We architect mandates that withstand the most rigorous judicial and regulatory scrutiny.",
    detail: "We utilize advanced analytical frameworks to stress-test every tactical decision against future legislative shifts and adversarial maneuvers.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  { 
    title: "Relentless Advocacy", 
    desc: "Championing client interests with uncompromising vigor across all superior courts of record and international arbitration forums.",
    detail: "Our advocacy is noted for its intellectual depth, combining classical legal scholarship with modern commercial pragmatism.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M8 15h8" />
      </svg>
    )
  },
  { 
    title: "Strategic Foresight", 
    desc: "Anticipating the legal landscape before it manifests. We provide the foresight necessary for institutions to lead in volatile markets.",
    detail: "By monitoring regional regulatory trends and global economic shifts, we empower our clients to preempt risks rather than merely responding to them.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  }
];

export default function Philosophy() {
  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                The Ethos
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase">
              THE <span className="text-[#cc2027]">ETHOS.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Our philosophy is rooted in the belief that excellence is not an act, but a habit. We approach every mandate as a bespoke architectural challenge requiring structural precision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={stagger}
                className="space-y-16"
              >
                <motion.div 
                  variants={fadeUp}
                  className="p-10 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
                  <div className="text-[#cc2027] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Scale size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif-heading text-3xl md:text-3xl text-secondary mb-6 font-bold">Substantive Precision</h3>
                  <p className="font-sans text-foreground/60 text-base font-light leading-relaxed mb-6">
                    In the legal arena, the difference between victory and compromise often lies in the finest details. We apply rigorous analytical frameworks to every case, ensuring that every tactical maneuver is grounded in deep legal substance.
                  </p>
                  <p className="font-sans text-foreground/50 text-sm font-light leading-relaxed italic border-l-2 border-[#cc2027]/20 pl-4 group-hover:border-[#cc2027]/50 transition-colors">
                    Our methodology transcends the conventional; we seek the foundational principles that govern each matter, building strategies that are as resilient as they are effective.
                  </p>
                </motion.div>
                <motion.div 
                  variants={fadeUp}
                  className="p-10 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
                  <div className="text-[#cc2027] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Shield size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif-heading text-3xl md:text-3xl text-secondary mb-6 font-bold">Uncompromising Advocacy</h3>
                  <p className="font-sans text-foreground/60 text-base font-light leading-relaxed mb-6">
                    We do not merely represent; we champion. Our advocacy is relentless, driven by a commitment to protect the foundations of our clients' interests with strategic firepower and ethical integrity.
                  </p>
                  <p className="font-sans text-foreground/50 text-sm font-light leading-relaxed italic border-l-2 border-[#cc2027]/20 pl-4 group-hover:border-[#cc2027]/50 transition-colors">
                    This commitment ensures that our clients are not just heard, but are dominant in their respective legal forums, whether in the boardroom or the supreme court.
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative group">
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-6 border border-[#cc2027]/20 -z-10 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-6 gap-6 group-hover:translate-y-6 duration-700" />
                <div className="relative aspect-3/4 overflow-hidden rounded-sm shadow-2xl skew-y-1">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
                    alt="Modern board room" 
                    className="w-full h-full object-cover transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
                </div>
                
                {/* Stats floating overlay */}
                <div className="absolute -bottom-10 -left-10 bg-secondary p-2 shadow-2xl border-l-4 border-[#cc2027] rounded-r-sm lg:block hidden">
                   <div className="w-40 h-48 overflow-hidden rounded-sm relative group/img">
                      <img src="/ms-ochieng.jpg" alt="M.S. Ochieng" className="w-full h-full object-cover transition-all duration-700 group-hover/img:scale-110" />
                      <div className="absolute inset-0 border border-white/10" />
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars - NEW SECTION */}
      <section className="py-40 px-6 bg-muted/5 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-32">
              <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">Core Foundations</p>
              <h2 className="font-serif-heading text-4xl md:text-7xl font-bold text-secondary uppercase tracking-tight">Guiding Principles.</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {pillars.map((pillar, idx) => (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="p-12 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm"
                >
                   <div className="flex items-center gap-5 mb-8">
                     <div className="text-[#cc2027] opacity-80">{pillar.icon}</div>
                     <div className="flex-1 h-px bg-border group-hover:bg-[#cc2027]/30 transition-colors" />
                   </div>
                   <h3 className="font-serif-heading text-3xl text-secondary mb-6 font-bold">{pillar.title}</h3>
                   <p className="font-sans text-foreground/70 leading-relaxed mb-6 font-light">{pillar.desc}</p>
                   <p className="font-sans text-foreground/40 text-[11px] leading-relaxed italic">{pillar.detail}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-secondary text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#cc2027]/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-7xl mb-16 leading-tight font-bold">
              Ready to align your interest <br />
              <span className="text-[#cc2027] italic">with mastery?</span>
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link 
                href="/consultation" 
                className="inline-block font-serif-sub tracking-[0.3em] uppercase text-xs bg-[#cc2027] text-white border-2 border-[#cc2027] px-20 py-8 hover:bg-white hover:text-secondary hover:border-white transition-all duration-500 font-bold no-underline shadow-2xl rounded-sm"
              >
                Request Strategic Counsel
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
