import { useState } from "react";
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

const practiceOptions = [
  "Corporate Law",
  "High-Stakes Litigation",
  "Mergers & Acquisitions",
  "Commercial Dispute Resolution",
  "Regulatory Affairs",
  "Strategic Counsel",
  "Other / Unsure",
];

const processSteps = [
  {
    step: "01",
    title: "Confidential Inquiry",
    body: "Submit your inquiry through this form or contact our chambers directly. All inquiries are treated with absolute confidentiality regardless of whether an engagement proceeds.",
  },
  {
    step: "02",
    title: "Initial Assessment",
    body: "A senior member of our team will review your inquiry within 24 hours and determine whether your matter falls within our practice scope and whether we can assist.",
  },
  {
    step: "03",
    title: "Strategic Review Consultation",
    body: "If your matter is within our scope, we will arrange a private consultation — in person or by secure video — to conduct an initial strategic review of your position at no charge.",
  },
  {
    step: "04",
    title: "Engagement Proposal",
    body: "Following the review, we will provide a clear engagement proposal outlining the scope of work, the team assigned, the proposed timeline, and the fee structure — all agreed before we begin.",
  },
];

const socials = [
  {
    name: "LinkedIn",
    handle: "M.S Ochieng Law",
    href: "https://linkedin.com",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: "X / Twitter",
    handle: "@msochienglaw",
    href: "https://twitter.com",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    name: "Instagram",
    handle: "@msochienglaw",
    href: "https://instagram.com",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

export default function Consultation() {
  const [formState, setFormState] = useState({
    name: "", organisation: "", email: "", phone: "",
    practice: "", urgency: "", message: "", referral: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-48 pb-28 px-6 relative overflow-hidden border-b border-primary/15">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="M.S Ochieng Law Chambers" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" />
              Engage Our Chambers
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl md:text-7xl text-white mb-6 leading-tight">
              Request a<br /><span className="gold-text-gradient">Consultation</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold w-24 mb-10" />
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground text-lg font-light leading-relaxed max-w-2xl">
              We accept new clients exclusively by referral or direct private inquiry. If your matter demands the highest calibre of legal representation, we invite you to begin a confidential discussion with our chambers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 px-6 bg-[#060606] border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-16">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" /> How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">The Engagement Process</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-primary/10">
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUp}
                className="group p-10 border border-primary/5 hover:bg-white/[0.025] transition-colors duration-700 relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="font-serif-heading text-5xl text-primary/15 mb-6 group-hover:text-primary/25 transition-colors">{step.step}</div>
                <h3 className="font-serif-heading text-xl text-white mb-4 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="font-sans text-muted-foreground text-sm font-light leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Office Image */}
      <section className="relative h-[40vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
          alt="M.S Ochieng Law — Principal Office" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-3">Principal Chambers</motion.p>
            <motion.p variants={fadeUp} className="font-serif-heading text-3xl md:text-4xl text-white">Suite 1401, Upper Hill Complex</motion.p>
            <motion.p variants={fadeUp} className="font-serif-heading text-xl text-white/50 mt-2">Nairobi, Kenya</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-28 px-6 bg-background border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 xl:gap-32">
            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
              className="lg:w-2/5">
              <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8">Direct Contact</motion.p>
              <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl text-white mb-8">Chambers of<br />M.S Ochieng Law</motion.h2>
              <motion.div variants={fadeUp} className="divider-gold w-16 mb-12" />

              <motion.div variants={stagger} className="flex flex-col gap-8">
                {[
                  { label: "Direct Inquiries", value: "counsel@msochieng.law", href: "mailto:counsel@msochieng.law" },
                  { label: "Private Line", value: "+254 (0) 700 000 001", href: "tel:+2540700000001" },
                  { label: "After Hours", value: "+254 (0) 700 000 002", href: "tel:+2540700000002" },
                ].map((contact) => (
                  <motion.div key={contact.label} variants={fadeUp}>
                    <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-[10px] mb-2">{contact.label}</p>
                    <a href={contact.href} className="font-serif-heading text-xl text-white hover:text-primary transition-colors">
                      {contact.value}
                    </a>
                  </motion.div>
                ))}

                <motion.div variants={fadeUp} className="mt-2">
                  <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-[10px] mb-3">Principal Office</p>
                  <address className="not-italic font-sans text-muted-foreground text-sm font-light leading-relaxed">
                    M.S Ochieng Law Chambers<br />
                    Suite 1401, Upper Hill Complex<br />
                    Upper Hill Road, Nairobi, Kenya<br />
                    P.O. Box 74600–00200
                  </address>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-[10px] mb-3">Office Hours</p>
                  <p className="font-sans text-muted-foreground text-sm font-light leading-relaxed">
                    Monday – Friday: 08:00 – 18:00 EAT<br />
                    Saturday: By appointment only<br />
                    Emergency line: Available 24/7
                  </p>
                </motion.div>

                {/* Social links */}
                <motion.div variants={fadeUp}>
                  <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-[10px] mb-4">Follow the Chambers</p>
                  <div className="flex flex-col gap-4">
                    {socials.map((s) => (
                      <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 group">
                        <div className="w-9 h-9 border border-primary/20 flex items-center justify-center text-primary/50 group-hover:border-primary group-hover:text-primary transition-all duration-300 flex-shrink-0">
                          {s.icon}
                        </div>
                        <div>
                          <p className="font-serif-sub text-white text-xs tracking-[0.2em] uppercase group-hover:text-primary transition-colors">{s.name}</p>
                          <p className="font-sans text-muted-foreground/60 text-xs">{s.handle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="pt-8 border-t border-primary/15">
                  <p className="font-sans text-muted-foreground text-xs font-light leading-relaxed">
                    All initial inquiries are handled with absolute confidentiality. We do not share, disclose, or retain inquiry information beyond the immediate assessment process without your express consent.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
              className="lg:w-3/5">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                  className="border border-primary/30 p-16 text-center bg-black/40 h-full flex flex-col items-center justify-center min-h-[600px] relative">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  <div className="w-20 h-20 rounded-full embossed-seal flex items-center justify-center mx-auto mb-10">
                    <span className="font-serif-heading text-2xl embossed-logo tracking-tighter">MSO</span>
                  </div>
                  <h3 className="font-serif-heading text-3xl text-white mb-6">Inquiry Received</h3>
                  <div className="divider-gold w-16 mx-auto mb-8" />
                  <p className="font-sans text-muted-foreground font-light leading-relaxed max-w-sm text-center">
                    Thank you for contacting M.S Ochieng Law. A senior member of our team will review your inquiry and respond within 24 hours through the contact details you provided.
                  </p>
                  <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs mt-10">Your matter is in confidence.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-0 border border-primary/15">
                  <div className="p-8 border-b border-primary/10 bg-black/20">
                    <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs">Confidential Inquiry Form</motion.p>
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-primary/10">
                    {[
                      { name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
                      { name: "organisation", label: "Organisation / Company", type: "text", required: false, placeholder: "Organisation name (if applicable)" },
                      { name: "email", label: "Email Address", type: "email", required: true, placeholder: "Your confidential email" },
                      { name: "phone", label: "Direct Phone", type: "tel", required: false, placeholder: "+254 — preferred" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">
                          {field.label}{field.required && <span className="text-primary ml-1">*</span>}
                        </label>
                        <input type={field.type} name={field.name} value={(formState as any)[field.name]}
                          onChange={handleChange} required={field.required} placeholder={field.placeholder}
                          className="w-full bg-transparent border border-primary/20 px-5 py-4 font-sans text-sm text-white placeholder-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-primary/10">
                    <div>
                      <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">
                        Practice Area <span className="text-primary">*</span>
                      </label>
                      <select name="practice" value={formState.practice} onChange={handleChange} required
                        className="w-full bg-black border border-primary/20 px-5 py-4 font-sans text-sm text-white focus:outline-none focus:border-primary/60 transition-colors duration-300 appearance-none cursor-pointer">
                        <option value="" disabled>Select area of concern</option>
                        {practiceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-black">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">Urgency Level</label>
                      <select name="urgency" value={formState.urgency} onChange={handleChange}
                        className="w-full bg-black border border-primary/20 px-5 py-4 font-sans text-sm text-white focus:outline-none focus:border-primary/60 transition-colors duration-300 appearance-none cursor-pointer">
                        <option value="" disabled>Select urgency</option>
                        <option value="standard" className="bg-black">Standard — within the week</option>
                        <option value="priority" className="bg-black">Priority — within 48 hours</option>
                        <option value="urgent" className="bg-black">Urgent — within 24 hours</option>
                        <option value="emergency" className="bg-black">Emergency — immediate response required</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-8 border-b border-primary/10">
                    <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">
                      Brief Description of Your Matter <span className="text-primary">*</span>
                    </label>
                    <textarea name="message" value={formState.message} onChange={handleChange} required rows={6}
                      placeholder="Please describe the nature of your legal matter in as much or as little detail as you are comfortable sharing at this stage. All information is treated with absolute confidentiality."
                      className="w-full bg-transparent border border-primary/20 px-5 py-4 font-sans text-sm text-white placeholder-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300 resize-none" />
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-primary/10">
                    <div>
                      <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">Referred by (if applicable)</label>
                      <input type="text" name="referral" value={formState.referral} onChange={handleChange}
                        placeholder="Name of referring party, if any"
                        className="w-full bg-transparent border border-primary/20 px-5 py-4 font-sans text-sm text-white placeholder-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300" />
                    </div>
                    <div>
                      <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">Preferred Contact Method</label>
                      <select className="w-full bg-black border border-primary/20 px-5 py-4 font-sans text-sm text-white focus:outline-none focus:border-primary/60 transition-colors duration-300 appearance-none cursor-pointer">
                        <option className="bg-black">Email</option>
                        <option className="bg-black">Phone</option>
                        <option className="bg-black">Secure Video Call</option>
                        <option className="bg-black">In-Person at Chambers</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <p className="font-sans text-muted-foreground/60 text-xs font-light max-w-sm leading-relaxed">
                      By submitting this form you acknowledge that the information provided will be held in strict confidence and used solely for the purpose of assessing your inquiry.
                    </p>
                    <button type="submit"
                      className="flex-shrink-0 group relative overflow-hidden bg-primary text-black font-serif-sub tracking-[0.25em] uppercase text-sm px-12 py-5 hover:bg-primary/80 transition-colors font-semibold">
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assurance Bar */}
      <section className="py-20 px-6 bg-black border-t border-primary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="flex flex-wrap justify-center md:justify-between gap-10">
            {[
              { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Absolute Confidentiality" },
              { icon: "M12 2a10 10 0 110 20A10 10 0 0112 2zm0 5v5l4 2", label: "24-Hour Response Commitment" },
              { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", label: "Partner-Level Attention" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "No Obligation Consultation" },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeUp} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-primary/25 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
                    <path d={item.icon} strokeLinecap="square" />
                  </svg>
                </div>
                <span className="font-serif-sub text-[11px] tracking-[0.25em] uppercase text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
