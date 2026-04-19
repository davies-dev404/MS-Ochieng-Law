import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const privacyPolicies = [
  {
    id: "01",
    title: "Commitment to Confidentiality",
    desc: "M.S. Ochieng Legal Chambers is committed to protecting the privacy and confidentiality of our clients, employees, and visitors. This policy outlines our protocols for the handling of personal data in accordance with the Data Protection Act of Kenya and international best practices (GDPR).",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )
  },
  {
    id: "02",
    title: "Collection of Information",
    desc: "We collect personal information solely for the purpose of providing elite legal services, responding to inquiries, and managing professional engagements. This includes professional identity, transactional records, and strategic documentation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    )
  },
  {
    id: "03",
    title: "Attorney-Client Privilege",
    desc: "Institutional silence is a foundational tenet of our practice. Information shared with the Firm during the course of professional representation is protected by Attorney-Client Privilege to the fullest extent permitted by law.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: "04",
    title: "Data Security & Integrity",
    desc: "We employ high-fidelity encryption and secure Practice Management Systems to ensure that all digital and physical records are protected against unauthorized access, structural failure, or regulatory breach.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    )
  },
  {
    id: "05",
    title: "Third-Party Disclosure",
    desc: "Personal data is never sold or traded. Disclosure to third parties occurs only as a necessary component of mandate execution or as required by sovereign legal process.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    )
  },
  {
    id: "06",
    title: "Your Sovereign Rights",
    desc: "Individuals have the right to request access to their personal data, seek rectification of inaccuracies, or request the erasure of information where its retention is no longer required for legal or mandate-related purposes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    )
  }
];

export default function Privacy() {
  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-48 pb-20 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Protocol Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Compliance
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase">
              PRIVACY <span className="text-[#cc2027]">POLICY.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Ensuring the absolute confidentiality and structural integrity of institutional and personal data shared with the Firm.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-muted/5 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {privacyPolicies.map((policy) => (
              <motion.div 
                key={policy.id}
                variants={fadeUp}
                className="bg-white p-12 border border-border shadow-sm hover:shadow-2xl hover:border-[#cc2027]/40 transition-all duration-500 rounded-sm relative group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 font-serif-heading text-8xl font-bold translate-x-4 -translate-y-4 group-hover:text-[#cc2027] group-hover:opacity-10 transition-all duration-500">
                  {policy.id}
                </div>
                <div className="w-14 h-14 bg-[#cc2027]/5 text-[#cc2027] flex items-center justify-center rounded-sm mb-8 group-hover:bg-[#cc2027] group-hover:text-white transition-colors duration-500">
                  {policy.icon}
                </div>
                <h3 className="font-serif-heading text-2xl text-secondary mb-6 font-bold uppercase">{policy.title}</h3>
                <p className="font-sans text-foreground/60 leading-relaxed font-light text-sm relative z-10">
                  {policy.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-32 pt-16 border-t border-border text-center">
            <p className="font-sans text-foreground/50 text-sm">
              For inquiries regarding our data protocols, please contact: <br className="md:hidden" />
              <a href="mailto:info@msochienglaw.co.ke" className="text-[#cc2027] font-bold ml-2 hover:underline">info@msochienglaw.co.ke</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
