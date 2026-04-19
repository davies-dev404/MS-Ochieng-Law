import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { Globe, Laptop, Compass, Target, Eye, ShieldCheck } from "lucide-react";

// African professional portraits (from /public)
const img1 = "/ms-ochieng.jpg";
const img2 = "/team-a-korir.png";
const img3 = "/team-j-mwangi.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const team = [
  {
    name: "M.S. Ochieng",
    role: "Managing Partner",
    focus: "Corporate Strategy & High-Stakes Litigation",
    img: img1,
    qualifications: "LL.B (Hons), LL.M (Harvard), Post-Graduate Diploma in Law (KSL)",
    expertise: "Advised on regional infrastructure projects valued at over $500M."
  },
  {
    name: "A. Korir",
    role: "Senior Associate",
    focus: "Employment Law & HR Compliance",
    img: img2,
    qualifications: "LL.B (Hons), Dip. Human Resource Management, Member of LSK",
    expertise: "Lead advisor for multi-national firms on regional labor compliance."
  },
  {
    name: "J. Mwangi",
    role: "Partner",
    focus: "Real Estate & Commercial Transactions",
    img: img3,
    qualifications: "LL.B (Hons), Certified Private Equity Specialist, Commissioner for Oaths",
    expertise: "Specializes in complex cross-border property acquisitions and structural financing."
  }
];

const roadmap = [
  { step: "01", title: "Strategic Audit", desc: "A rigorous diagnostic phase where we map the unique regulatory landscape and commercial risks of your mandate—identifying opportunities for value creation." },
  { step: "02", title: "Victory Architecture", desc: "Collaboratively architecting the legal strategy required to achieve foundational commercial success and institutional resilience." },
  { step: "03", title: "Tactical Dominance", desc: "Relentless advocacy and precision documentation in pursuit of the winning outcome, neutralizing all regulatory and commercial threats." },
  { step: "04", title: "Institutional Shield", desc: "Continuous strategic briefing to ensure your enterprise remains optimized and protected against future regulatory shifts." }
];

export default function WhyUs() {
  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-48 pb-20 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                The Advantage
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase">
              WHY THE <span className="text-[#cc2027]">FIRM?</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Our advantage lies in the intersection of elite legal scholarship and commercial pragmatism. We provide counsel that is as strategically inventive as it is legally sound.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative p-12 border border-border bg-muted/5 group hover:border-[#cc2027]/30 transition-all duration-500 rounded-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
              <div className="text-[#cc2027] mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif-heading text-2xl text-secondary mb-4 font-bold group-hover:text-[#cc2027] transition-colors">Elite Network</h3>
              <p className="font-sans text-foreground/60 leading-relaxed font-light mb-8">
                Our practice is seamlessly integrated with leading international chambers, providing our clients with a global reach and access to world-class jurisprudence.
              </p>
              <div className="h-px w-10 bg-[#cc2027]/20 group-hover:w-full transition-all duration-700" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="relative p-12 border border-border bg-muted/5 group hover:border-[#cc2027]/30 transition-all duration-500 rounded-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
              <div className="text-[#cc2027] mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <Laptop size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif-heading text-2xl text-secondary mb-4 font-bold group-hover:text-[#cc2027] transition-colors">Digital Readiness</h3>
              <p className="font-sans text-foreground/60 leading-relaxed font-light mb-8">
                We utilize state-of-the-art practice management and legal research systems, ensuring efficiency and data security for all client mandates.
              </p>
              <div className="h-px w-10 bg-[#cc2027]/20 group-hover:w-full transition-all duration-700" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative p-12 border border-border bg-muted/5 group hover:border-[#cc2027]/30 transition-all duration-500 rounded-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
              <div className="text-[#cc2027] mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <Compass size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif-heading text-2xl text-secondary mb-4 font-bold group-hover:text-[#cc2027] transition-colors">Proactive Strategy</h3>
              <p className="font-sans text-foreground/60 leading-relaxed font-light mb-8">
                We do not wait for legal issues to arise. We provide anticipatory counsel that positions our clients ahead of regulatory and commercial shifts.
              </p>
              <div className="h-px w-10 bg-[#cc2027]/20 group-hover:w-full transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="py-32 px-6 bg-muted/5 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-24">
              <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">The Firm's Mandate</p>
              <h2 className="font-serif-heading text-4xl md:text-6xl font-bold text-secondary uppercase tracking-tight">Mission & Vision.</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-10 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
                 <div className="text-[#cc2027] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Target size={32} strokeWidth={1.5} />
                 </div>
                 <h3 className="font-serif-heading text-3xl text-secondary mb-4 font-bold transition-colors group-hover:text-[#cc2027]">Our Mission</h3>
                 <p className="font-sans text-foreground/70 leading-relaxed font-light">
                    To advocate relentlessly for our clients—from everyday citizens to national enterprises—ensuring their rights are protected and objectives achieved with uncompromising legal rigor.
                 </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="p-10 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
                 <div className="text-[#cc2027] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Eye size={32} strokeWidth={1.5} />
                 </div>
                 <h3 className="font-serif-heading text-3xl text-secondary mb-4 font-bold transition-colors group-hover:text-[#cc2027]">Our Vision</h3>
                 <p className="font-sans text-foreground/70 leading-relaxed font-light">
                    To be the Republic's most trusted pillar of justice, setting the gold standard for accessible, elite-tier legal strategy and institutional advocacy across East Africa.
                 </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="p-10 border border-border bg-white shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-1 h-0 bg-[#cc2027] group-hover:h-full transition-all duration-500" />
                 <div className="text-[#cc2027] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <ShieldCheck size={32} strokeWidth={1.5} />
                 </div>
                 <h3 className="font-serif-heading text-3xl text-secondary mb-4 font-bold transition-colors group-hover:text-[#cc2027]">Core Values</h3>
                 <ul className="space-y-4 font-sans text-foreground/70 leading-relaxed font-light mt-6">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#cc2027]/60 rounded-full" /> Integrity & Accountability</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#cc2027]/60 rounded-full" /> Universal Accessibility</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#cc2027]/60 rounded-full" /> Substantive Excellence</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#cc2027]/60 rounded-full" /> Relentless Advocacy</li>
                 </ul>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Engagement Roadmap */}
      <section className="py-40 px-6 bg-[#1c2f54] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#cc2027]/3 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-10">
            <div className="max-w-2xl">
               <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">Engagement Framework</p>
               <h2 className="font-serif-heading text-4xl md:text-6xl font-bold uppercase tracking-tight">The Engagement Roadmap.</h2>
            </div>
            <div className="h-px grow bg-white/10 hidden lg:block mb-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {roadmap.map((item, idx) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group p-10 border border-white/5 hover:border-[#cc2027] transition-all duration-500 hover:bg-white/5"
              >
                <span className="font-serif-heading text-4xl text-[#cc2027] font-bold mb-8 block opacity-40 group-hover:opacity-100 transition-opacity">{item.step}</span>
                <h4 className="font-serif-heading text-2xl mb-4 font-bold">{item.title}</h4>
                <p className="font-sans text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-40 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={stagger} 
            className="mb-28 text-center max-w-2xl mx-auto"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">
              Strategic Leadership
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-8xl mb-8 font-bold text-secondary uppercase tracking-tight">The Team.</motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-foreground/50 font-light text-lg">
              A confluence of distinguished African legal minds dedicated to structural excellence and institutional integrity.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {team.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group flex flex-col items-center text-center relative"
              >
                <div className="relative w-full aspect-4/5 overflow-hidden rounded-sm mb-10 shadow-3xl">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Premium Hover Overlay */}
                  <div className="absolute inset-0 bg-secondary/90 transition-all duration-500 opacity-0 group-hover:opacity-100 p-12 flex flex-col justify-center items-center text-white backdrop-blur-sm">
                     <div className="w-12 h-px bg-[#cc2027] mb-8" />
                     <p className="font-serif-sub uppercase tracking-[0.2em] text-[10px] text-[#cc2027] mb-4 font-bold">Qualifications</p>
                     <p className="font-sans text-[11px] font-light mb-8 leading-relaxed">{member.qualifications}</p>
                     <p className="font-serif-sub uppercase tracking-[0.2em] text-[10px] text-[#cc2027] mb-4 font-bold">Area of Expertise</p>
                     <p className="font-sans text-[11px] font-light leading-relaxed italic">{member.expertise}</p>
                     <div className="mt-10 flex gap-6">
                        <a href="#" className="text-white/40 hover:text-[#cc2027] transition-colors">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                           </svg>
                        </a>
                        <a href="#" className="text-white/40 hover:text-[#cc2027] transition-colors">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                           </svg>
                        </a>
                     </div>
                  </div>

                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-all duration-500" />
                </div>
                <h3 className="font-serif-heading text-3xl mb-3 font-bold group-hover:text-[#cc2027] transition-colors text-secondary">{member.name}</h3>
                <p className="font-serif-sub tracking-[0.2em] uppercase text-[10px] text-[#cc2027] mb-6 font-bold">{member.role}</p>
                <p className="font-sans text-foreground/40 text-[10px] font-light px-8 leading-relaxed italic line-clamp-2">{member.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 px-6 bg-muted/5 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif-heading text-4xl md:text-7xl text-secondary mb-16 font-bold leading-tight uppercase tracking-tight">Elite Counsel for the Discerning Client.</h2>
          <Link 
            href="/consultation" 
            className="inline-block font-serif-sub tracking-[0.3em] uppercase text-xs bg-[#cc2027] text-white px-20 py-8 hover:bg-white hover:text-secondary hover:border-[#cc2027] border-2 border-[#cc2027] transition-all duration-500 font-bold no-underline rounded-sm shadow-2xl"
          >
            Request Strategic Briefing
          </Link>
        </div>
      </section>
    </Layout>
  );
}


