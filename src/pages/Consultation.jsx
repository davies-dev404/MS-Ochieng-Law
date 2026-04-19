import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

export default function Consultation() {
  return (
    <Layout>
      <section className="pt-48 pb-24 px-6 relative overflow-hidden border-b border-border bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1920&q=80" 
            alt="M.S. Ochieng Legal Chambers" 
            className="w-full h-full object-cover opacity-40 grayscale" 
          />
          <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary/95 to-primary/15" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary to-transparent" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.5em] uppercase text-[10px] mb-8 flex items-center justify-center gap-5 font-bold">
              <span className="w-16 h-px bg-primary block" />
              Engage Our Chambers
              <span className="w-16 h-px bg-primary block" />
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl lg:text-7xl xl:text-8xl text-white mb-10 leading-none font-bold uppercase tracking-tighter flex items-center justify-center gap-4 whitespace-nowrap">
              Legal <span className="text-[#cc2027] italic">Counsel.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans text-white/50 text-xl font-light max-w-2xl leading-relaxed mb-12 mx-auto">
              Your commercial success is our mandate. We offer a dedicated, high-fidelity channel for formal engagement, ensuring your legal challenges are met with surgical strategic foresight.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32">
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif-heading text-4xl md:text-6xl text-[#1c2f54] mb-12 leading-tight font-bold uppercase tracking-tight">A Mandate <br /><span className="text-[#cc2027] italic">for Excellence.</span></h2>
              <div className="space-y-12">
                {[
                  { title: "Institutional Advisory", desc: "Comprehensive counsel for corporations and regulatory bodies across regional and international jurisdictions." },
                  { title: "Strategic Briefings", desc: "High-level insights designed to navigate complex commercial landscapes and mitigate structural risks." },
                  { title: "Bespoke Advocacy", desc: "Tailored legal strategies for high-frequency and high-stakes litigation before superior courts of record." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-10 items-start pb-10 border-b border-border last:border-0 group">
                    <div className="w-12 h-px bg-primary/30 mt-4 shrink-0 transition-all group-hover:w-20 group-hover:bg-primary" />
                    <div>
                      <h4 className="font-serif-sub tracking-widest uppercase text-[11px] text-secondary mb-4 font-bold">{item.title}</h4>
                      <p className="font-sans text-foreground/60 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#1c2f54] p-12 md:p-20 border-l-12 border-[#cc2027] shadow-2xl rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -translate-y-1/2 translate-x-1/2 rotate-45" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <h3 className="font-serif-heading text-3xl md:text-4xl text-white font-bold">Request Briefing</h3>
                <div className="px-4 py-2 border border-primary/40 bg-primary/10 rounded-sm">
                  <p className="font-serif-sub text-primary text-[9px] tracking-widest uppercase font-bold">Primary Guarantee</p>
                  <p className="font-sans text-white text-[10px] font-light">24-Hour Response Mandate</p>
                </div>
              </div>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Full Name</label>
                    <input type="text" className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" placeholder="e.g. Alexander Hamilton" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Organization</label>
                    <input type="text" className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" placeholder="e.g. Global Tech Inc." />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Professional Email</label>
                  <input type="email" className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" placeholder="counsel@organization.com" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Nature of Mandate</label>
                  <select className="bg-white/5 border border-white/10 px-8 py-5 text-white/70 focus:outline-none focus:border-primary transition-all rounded-sm font-sans appearance-none">
                    <option className="bg-secondary">Corporate Advisory</option>
                    <option className="bg-secondary">Litigation Mandate</option>
                    <option className="bg-secondary">Regulatory Compliance</option>
                    <option className="bg-secondary">Real Estate Transaction</option>
                    <option className="bg-secondary">Other Strategic Matter</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Executive Summary</label>
                  <textarea rows="5" className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans resize-none" placeholder="Provide a brief context for the requested counsel..."></textarea>
                </div>
                <button className="w-full bg-primary text-white font-serif-sub tracking-[0.3em] uppercase text-xs py-7 font-bold hover:bg-white hover:text-secondary transition-all duration-300 mt-10 shadow-3xl">
                  Submit Formal Request
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0 px-0 bg-white border-t border-border relative overflow-hidden h-[500px] grayscale hover:grayscale-0 transition-all duration-700">
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m7!1s0x182f1090333d0261:0xa7d82506eabb7115!2sUpper+Hill+Chambers!5e0!3m2!1sen!2ske!4v1713460000000!5m2!1sen!2ske" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="M.S. Ochieng Law Firm Location"
         ></iframe>
      </section>

      {/* Strategic Privileges */}
      <section className="py-40 px-6 bg-muted/5 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
           <div className="md:w-1/3 text-center md:text-left">
              <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">Sovereign Privacy</p>
              <h2 className="font-serif-heading text-3xl md:text-5xl font-bold text-[#1c2f54] uppercase tracking-tight">Privileges & Secrecy.</h2>
           </div>
           
           <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-12 bg-white border border-border shadow-sm hover:border-[#cc2027]/40 transition-all group">
                 <h4 className="font-serif-sub tracking-widest uppercase text-[11px] text-[#1c2f54] mb-6 font-bold">Attorney-Client Privilege</h4>
                 <p className="font-sans text-foreground/50 text-xs font-light leading-relaxed">
                   All communications and mandates are protected under the most stringent professional secrecy laws of the relevant jurisdiction.
                 </p>
              </div>
              <div className="p-12 bg-white border border-border shadow-sm hover:border-[#cc2027]/40 transition-all group">
                 <h4 className="font-serif-sub tracking-widest uppercase text-[11px] text-[#1c2f54] mb-6 font-bold">Global Data Standards</h4>
                 <p className="font-sans text-foreground/50 text-xs font-light leading-relaxed">
                   Using encrypted Practice Management Systems compliant with GDPR and regional Data Protection Acts to ensure absolute mandates integrity.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto border-t border-border pt-24">
          <p className="font-serif-sub tracking-[0.3em] uppercase text-[10px] text-primary mb-8 font-bold">Confidentiality Assured</p>
          <p className="font-sans text-foreground/40 text-xs font-light max-w-2xl leading-relaxed mx-auto italic">
            "Institutional silence is protected; strategic counsel is absolute."
          </p>
        </div>
      </section>
    </Layout>
  );
}
