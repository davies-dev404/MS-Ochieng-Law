import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const practiceAreas = [
  {
    number: "01",
    title: "Corporate Law",
    tagline: "Frameworks That Withstand Scrutiny",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    description: "Our corporate law practice is built on one belief: meticulous legal architecture prevents litigation before it begins. We counsel boards of directors, corporate secretariats, and C-suite executives on the full spectrum of corporate governance, from shareholder agreements and articles of association to cross-border holding structures and intra-group transactions. Our team has advised on some of the region's most complex corporate restructurings, navigating multiple regulatory regimes simultaneously without compromise to client objectives.",
    services: [
      "Corporate restructuring & governance reform",
      "Shareholder & joint venture agreements",
      "Cross-border holding structures",
      "Board advisory & fiduciary compliance",
      "Corporate secretariat services",
      "Capital markets & securities law",
    ],
    insight: "A poorly drafted shareholder agreement is not a legal document — it is a deferred liability. We eliminate that exposure at the foundation.",
  },
  {
    number: "02",
    title: "High-Stakes Litigation",
    tagline: "We Litigate to Win — Nothing Less",
    icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
    description: "When a dispute reaches the threshold of litigation, the calculus changes entirely. Our litigation team does not manage cases — we prosecute them with surgical aggression. From the initial pleadings strategy through discovery, pre-trial motions, and trial itself, we anticipate every move from the opposing bench and neutralize it before it materialises. We have secured landmark rulings in the High Court and Court of Appeal, and our appellate track record is among the strongest of any boutique firm in the region.",
    services: [
      "Commercial & corporate litigation",
      "Constitutional & judicial review proceedings",
      "Enforcement of foreign judgements",
      "Emergency injunctions & asset freezing orders",
      "Cross-border enforcement",
      "Post-trial & appellate advocacy",
    ],
    insight: "The outcome of litigation is determined before the first hearing. Superior preparation, not courtroom improvisation, is the foundation of every victory we secure.",
  },
  {
    number: "03",
    title: "Mergers & Acquisitions",
    tagline: "Precision Execution in Transformative Transactions",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=900&q=80",
    description: "Transformative transactions demand lawyers who understand not only the law, but the strategic imperatives driving the deal. We advise acquirers, targets, boards, and management teams through every stage of the M&A process — from target identification and preliminary due diligence through to regulatory clearance, completion, and post-completion integration. Our deal team has led on transactions across banking, telecommunications, energy, and infrastructure — delivering certainty in environments where ambiguity is the norm.",
    services: [
      "Full-scope buy-side & sell-side advisory",
      "Legal & structural due diligence",
      "SPA, SHA & ancillary documentation",
      "Regulatory filings & competition law clearance",
      "Hostile & contested takeover defence",
      "Post-merger integration oversight",
    ],
    insight: "The single most costly error in M&A is speed without rigour. We move fast where it matters and demand precision where it counts.",
  },
  {
    number: "04",
    title: "Commercial Dispute Resolution",
    tagline: "Protecting Business Continuity at Every Turn",
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    description: "Not every commercial dispute needs a courtroom. Our dispute resolution practice begins with a forensic analysis of your contractual position, your counterparty's vulnerabilities, and the strategic value of each available forum. We are experienced in domestic and international arbitration, mediation, and court proceedings across multiple jurisdictions. Our approach prioritises the commercial outcome above all — whether that means a negotiated resolution at the boardroom table or a decisive ruling from the bench.",
    services: [
      "International commercial arbitration (ICC, LCIA, ICSID)",
      "Mediation & alternative dispute resolution",
      "Contract disputes & breach of warranty claims",
      "Construction & infrastructure disputes",
      "Insolvency-related commercial disputes",
      "Expert determination proceedings",
    ],
    insight: "The right forum is as important as the right argument. We select — and dominate — both.",
  },
  {
    number: "05",
    title: "Regulatory Affairs",
    tagline: "Preemptive Compliance. Decisive Defence.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    description: "Regulatory exposure is an ever-evolving risk for corporations operating across African markets. Our regulatory practice combines deep sector expertise with cultivated relationships across the regulatory landscape. We anticipate, navigate, and — when necessary — contest regulatory action on behalf of our clients, from banking and capital markets to telecommunications, energy, and healthcare. Our team includes former senior regulators, bringing unparalleled insight into how enforcement decisions are made.",
    services: [
      "Regulatory licensing & compliance frameworks",
      "Sector-specific advisory (banking, energy, telecom)",
      "Regulatory investigations & enforcement defence",
      "Anti-money laundering & data protection compliance",
      "Government affairs & lobbying strategy",
      "ESG & sustainability regulatory compliance",
    ],
    insight: "A regulator's inquiry should never catch counsel by surprise. Our preemptive compliance frameworks ensure they do not.",
  },
  {
    number: "06",
    title: "Strategic Counsel",
    tagline: "The Silent Hand Behind Critical Decisions",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    description: "Beyond transactional mandates, select clients engage us as standing strategic counsel — a confidential, trusted advisor embedded at the board level. In this capacity, we provide ongoing legal risk mapping, scenario planning for major strategic decisions, crisis management frameworks, and direct access to senior counsel on a retention basis. This is the most intimate form of legal engagement — and for those who require it, it is irreplaceable.",
    services: [
      "Ongoing board-level legal advisory",
      "Legal risk assessment & scenario modelling",
      "Crisis communications legal strategy",
      "Succession planning & ownership restructuring",
      "Confidential strategic review engagements",
      "Cross-practice deal orchestration",
    ],
    insight: "Our most enduring client relationships begin not with a transaction, but with a conversation about what the client is actually trying to achieve.",
  },
];

export default function Practice() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="pt-48 pb-28 px-6 relative overflow-hidden border-b border-primary/15">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1600&q=80"
            alt="Legal library" className="w-full h-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" />
              Domains of Excellence
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl md:text-7xl text-white mb-8 leading-tight">
              Practice<br /><span className="gold-text-gradient">Areas</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold w-24 mb-10" />
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground text-lg font-light leading-relaxed max-w-2xl">
              Each mandate we accept demands the highest order of legal skill. Below are the six pillars of our practice — each staffed by specialists with decades of front-line experience in the most demanding commercial environments on the continent and beyond.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas */}
      {practiceAreas.map((area, i) => (
        <section key={area.number}
          className={`py-28 px-6 relative ${i % 2 === 0 ? "bg-background" : "bg-[#060606]"} border-b border-primary/10`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeRight}
                className="lg:w-2/5 flex flex-col"
              >
                <div className="flex items-start gap-6 mb-8">
                  <span className="font-serif-heading text-7xl text-primary/10 leading-none">{area.number}</span>
                  <div className="w-14 h-14 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-2">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-primary">
                      <path d={area.icon} />
                    </svg>
                  </div>
                </div>
                <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs mb-4">{area.tagline}</p>
                <h2 className="font-serif-heading text-4xl md:text-5xl text-white mb-6 leading-tight">{area.title}</h2>
                <div className="divider-gold w-16 mb-6" />

                {/* Practice image */}
                <div className="relative overflow-hidden mb-8 border border-primary/10">
                  <img src={area.img} alt={area.title}
                    className="w-full h-48 object-cover grayscale opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <p className="font-sans text-muted-foreground text-base font-light leading-relaxed mb-10">{area.description}</p>
                <blockquote className="border-l-2 border-primary/40 pl-6 py-2">
                  <p className="font-serif-sub text-primary/80 text-sm leading-relaxed italic">{area.insight}</p>
                </blockquote>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
                className="lg:w-3/5"
              >
                <p className="font-serif-sub text-muted-foreground tracking-[0.3em] uppercase text-xs mb-8">Areas of Service</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-primary/10">
                  {area.services.map((service, si) => (
                    <motion.div key={si} variants={fadeUp}
                      className="group flex items-start gap-4 p-7 border border-primary/5 hover:bg-white/[0.025] transition-all duration-500">
                      <span className="w-4 h-[1px] bg-primary/40 mt-3 flex-shrink-0 group-hover:bg-primary group-hover:w-6 transition-all duration-500" />
                      <p className="font-sans text-foreground/80 text-sm font-light leading-relaxed group-hover:text-white transition-colors">{service}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeUp} className="mt-10 p-8 border border-primary/10 bg-black/20">
                  <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-[10px] mb-4">Engage This Practice</p>
                  <p className="font-sans text-muted-foreground text-sm font-light leading-relaxed mb-6">
                    Our {area.title.toLowerCase()} team is available for confidential inquiries. All initial consultations are conducted at no charge.
                  </p>
                  <Link href="/consultation" className="font-serif-sub text-[11px] tracking-[0.25em] uppercase text-primary hover:text-white transition-colors">
                    Arrange a consultation →
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-6 bg-black border-t border-primary/20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-2xl mx-auto">
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-full embossed-seal flex items-center justify-center mx-auto mb-10">
            <span className="font-serif-heading text-xl embossed-logo tracking-tighter">MSO</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white mb-6">Begin Your Engagement</motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-muted-foreground font-light mb-12 text-lg leading-relaxed">
            If your matter demands the highest calibre of legal representation, we would welcome a confidential discussion of your position.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/consultation" className="inline-block font-serif-sub tracking-[0.25em] uppercase text-sm bg-primary text-black px-14 py-5 hover:bg-primary/80 transition-colors font-semibold">
              Request Consultation
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
