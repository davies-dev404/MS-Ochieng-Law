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

export default function Consultation() {
  const [formState, setFormState] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    practice: "",
    urgency: "",
    message: "",
    referral: "",
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" />
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">The Engagement Process</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-primary/10"
          >
            {processSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="group p-10 border border-primary/5 hover:bg-white/[0.025] transition-colors duration-700 relative"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="font-serif-heading text-5xl text-primary/15 mb-6 group-hover:text-primary/25 transition-colors">{step.step}</div>
                <h3 className="font-serif-heading text-xl text-white mb-4 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="font-sans text-muted-foreground text-sm font-light leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-28 px-6 bg-background border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 xl:gap-32">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="lg:w-2/5"
            >
              <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8">Direct Contact</motion.p>
              <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl text-white mb-8">Chambers of<br />M.S Ochieng Law</motion.h2>
              <motion.div variants={fadeUp} className="divider-gold w-16 mb-12" />

              <motion.div variants={stagger} className="flex flex-col gap-10">
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

                <motion.div variants={fadeUp} className="mt-4">
                  <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-[10px] mb-3">Principal Office</p>
                  <address className="not-italic font-sans text-muted-foreground text-sm font-light leading-relaxed">
                    M.S Ochieng Law Chambers<br />
                    Suite 1401, Upper Hill Complex<br />
                    Upper Hill Road<br />
                    Nairobi, Kenya
                  </address>
                </motion.div>

                <motion.div variants={fadeUp} className="pt-8 border-t border-primary/15">
                  <p className="font-serif-sub text-muted-foreground text-xs font-light leading-relaxed">
                    All initial inquiries are handled with absolute confidentiality. We do not share, disclose, or retain inquiry information beyond the immediate assessment process without your express consent.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="lg:w-3/5"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="border border-primary/30 p-16 text-center bg-black/40 h-full flex flex-col items-center justify-center min-h-[600px]"
                >
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
                        <input
                          type={field.type}
                          name={field.name}
                          value={(formState as any)[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="w-full bg-transparent border border-primary/20 px-5 py-4 font-sans text-sm text-white placeholder-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-primary/10">
                    <div>
                      <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">
                        Practice Area <span className="text-primary">*</span>
                      </label>
                      <select
                        name="practice"
                        value={formState.practice}
                        onChange={handleChange}
                        required
                        className="w-full bg-black border border-primary/20 px-5 py-4 font-sans text-sm text-white focus:outline-none focus:border-primary/60 transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select area of concern</option>
                        {practiceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-black">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">
                        Urgency Level
                      </label>
                      <select
                        name="urgency"
                        value={formState.urgency}
                        onChange={handleChange}
                        className="w-full bg-black border border-primary/20 px-5 py-4 font-sans text-sm text-white focus:outline-none focus:border-primary/60 transition-colors duration-300 appearance-none cursor-pointer"
                      >
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
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Please describe the nature of your legal matter in as much or as little detail as you are comfortable sharing at this stage. All information is treated with absolute confidentiality."
                      className="w-full bg-transparent border border-primary/20 px-5 py-4 font-sans text-sm text-white placeholder-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300 resize-none"
                    />
                  </div>

                  <div className="p-8 border-b border-primary/10">
                    <label className="block font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-3">
                      Referred by (if applicable)
                    </label>
                    <input
                      type="text"
                      name="referral"
                      value={formState.referral}
                      onChange={handleChange}
                      placeholder="Name of referring party, if any"
                      className="w-full bg-transparent border border-primary/20 px-5 py-4 font-sans text-sm text-white placeholder-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-colors duration-300"
                    />
                  </div>

                  <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <p className="font-sans text-muted-foreground/60 text-xs font-light max-w-sm leading-relaxed">
                      By submitting this form you acknowledge that the information provided will be held in strict confidence and used solely for the purpose of assessing your inquiry.
                    </p>
                    <button
                      type="submit"
                      className="flex-shrink-0 group relative overflow-hidden bg-primary text-black font-serif-sub tracking-[0.25em] uppercase text-sm px-12 py-5 hover:bg-primary/80 transition-colors font-semibold"
                    >
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center md:justify-between gap-10"
          >
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
