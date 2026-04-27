import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ShieldCheck, Mail, ArrowRight } from "lucide-react";
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
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    service: 'Corporate Advisory',
    summary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');

    // Simulate network latency for "submission processing"
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStatus('success');
    
    // In a real production scenario, this is where you'd call an API route
    // or a service like Formspree / EmailJS
    console.log('Request received:', formData);
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative overflow-hidden border-b border-border bg-secondary">
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
              Your <span className="text-[#cc2027] italic">Success.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-sans text-white/50 text-xl font-light max-w-2xl leading-relaxed mb-12 mx-auto">
              Your goals become our priority. Every legal matter we handle is approached with focus, strategy, and a commitment to results.
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
              <h2 className="font-serif-heading text-4xl md:text-6xl text-[#1c2f54] mb-12 leading-tight font-bold uppercase tracking-tight">Our <br /><span className="text-[#cc2027] italic">Commitment.</span></h2>
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
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                      <h3 className="font-serif-heading text-3xl md:text-4xl text-white font-bold">Request Briefing</h3>
                      <div className="px-4 py-2 border border-primary/40 bg-primary/10 rounded-sm">
                        <p className="font-serif-sub text-primary text-[9px] tracking-widest uppercase font-bold">Primary Guarantee</p>
                        <p className="font-sans text-white text-[10px] font-light">24-Hour Response Commitment</p>
                      </div>
                    </div>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                          <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Full Name</label>
                          <input 
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" 
                            placeholder="e.g. Alexander Hamilton" 
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Organization</label>
                          <input 
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            type="text" 
                            className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" 
                            placeholder="e.g. Global Tech Inc." 
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Professional Email</label>
                        <input 
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email" 
                          className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans" 
                          placeholder="counsel@organization.com" 
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Nature of Services</label>
                        <div className="relative">
                          <select 
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 px-8 py-5 text-white/70 focus:outline-none focus:border-primary transition-all rounded-sm font-sans appearance-none"
                          >
                            <option className="bg-secondary" value="Corporate Advisory">Corporate Advisory</option>
                            <option className="bg-secondary" value="Litigation Mandate">Litigation Mandate</option>
                            <option className="bg-secondary" value="Regulatory Compliance">Regulatory Compliance</option>
                            <option className="bg-secondary" value="Real Estate Transaction">Real Estate Transaction</option>
                            <option className="bg-secondary" value="Other Strategic Matter">Other Strategic Matter</option>
                          </select>
                          <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                            <ArrowRight size={14} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="font-serif-sub uppercase text-[9px] tracking-[0.2em] text-white/50 font-bold">Executive Summary</label>
                        <textarea 
                          required
                          name="summary"
                          value={formData.summary}
                          onChange={handleChange}
                          rows="5" 
                          className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-primary transition-all rounded-sm font-sans resize-none" 
                          placeholder="Provide a brief context for the requested counsel..."
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-primary text-white font-serif-sub tracking-[0.3em] uppercase text-xs py-7 font-bold hover:bg-white hover:text-secondary transition-all duration-300 mt-10 shadow-3xl flex items-center justify-center gap-4 disabled:opacity-70"
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Request...
                          </>
                        ) : (
                          "Submit Formal Request"
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-10 border border-primary/40">
                      <CheckCircle2 size={48} className="text-primary" />
                    </div>
                    <h3 className="font-serif-heading text-4xl text-white font-bold mb-6 tracking-tight uppercase">Request Received.</h3>
                    <div className="h-px w-24 bg-primary mb-10" />
                    
                    <p className="font-sans text-white/70 text-lg font-light leading-relaxed mb-12 max-w-md">
                      Thank you, <span className="text-white font-bold">{formData.name}</span>. Your briefing has been securely transmitted to our executive chambers.
                    </p>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-sm w-full mb-12 text-left">
                      <div className="flex items-center gap-4 mb-6">
                        <ShieldCheck size={20} className="text-primary" />
                        <span className="font-serif-sub text-[10px] tracking-widest uppercase text-white font-bold">Confirmation Protocol</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 text-[10px] uppercase font-bold">Reference</span>
                          <span className="text-white text-[11px] font-mono">MSO-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 text-[10px] uppercase font-bold">Recipient</span>
                          <span className="text-white text-[11px]">Primary Advocate</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 text-[10px] uppercase font-bold">ETA</span>
                          <span className="text-white text-[11px]">Within 24 Hours</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-serif-sub text-[9px] tracking-[0.3em] uppercase text-white/40 mb-10 flex items-center gap-3">
                      <Mail size={12} />
                      Monitoring Inbox: {formData.email}
                    </p>

                    <button 
                      onClick={() => setStatus('idle')}
                      className="text-white/40 hover:text-white font-serif-sub tracking-widest uppercase text-[9px] font-bold border-b border-white/10 hover:border-white transition-all pb-1"
                    >
                      Submit Another Mandate
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0 px-0 bg-white border-t border-border relative overflow-hidden h-[500px] grayscale hover:grayscale-0 transition-all duration-700">
         <iframe
            src="https://maps.google.com/maps?q=Upper+Hill+Chambers,+Nairobi,+Kenya&output=embed&z=15"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="M.S. Ochieng Legal - Upper Hill Chambers, Nairobi"
         ></iframe>
      </section>

      {/* Strategic Privileges */}
      <section className="py-12 md:py-16 px-6 bg-muted/5 border-t border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
           <div className="md:w-1/3 text-center md:text-left">
              <p className="font-serif-sub text-[#cc2027] tracking-[0.4em] uppercase text-[10px] mb-4 font-bold">Sovereign Privacy</p>
              <h2 className="font-serif-heading text-2xl md:text-4xl font-bold text-[#1c2f54] uppercase tracking-tight">Privileges & Secrecy.</h2>
           </div>
           
           <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-border shadow-sm hover:border-[#cc2027]/40 transition-all group">
                 <h4 className="font-serif-sub tracking-widest uppercase text-[11px] text-[#1c2f54] mb-4 font-bold">Attorney-Client Privilege</h4>
                 <p className="font-sans text-foreground/50 text-xs font-light leading-relaxed">
                   All communications and mandates are protected under the most stringent professional secrecy laws of the relevant jurisdiction.
                 </p>
              </div>
              <div className="p-8 bg-white border border-border shadow-sm hover:border-[#cc2027]/40 transition-all group">
                 <h4 className="font-serif-sub tracking-widest uppercase text-[11px] text-[#1c2f54] mb-4 font-bold">Global Data Standards</h4>
                 <p className="font-sans text-foreground/50 text-xs font-light leading-relaxed">
                   Using encrypted Practice Management Systems compliant with GDPR and regional Data Protection Acts to ensure the safety of your records.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="py-10 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto border-t border-border pt-10">
          <p className="font-serif-sub tracking-[0.3em] uppercase text-[10px] text-primary mb-4 font-bold">Confidentiality Assured</p>
          <p className="font-sans text-foreground/40 text-xs font-light max-w-2xl leading-relaxed mx-auto italic">
            Innovation. Integrity. Commitment. Excellence.
          </p>
        </div>
      </section>
    </Layout>
  );
}
