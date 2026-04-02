import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const principles = [
  {
    roman: "I",
    title: "The Law as a Strategic Instrument",
    body: "Most lawyers see the law as a boundary — a fence that defines what cannot be done. We see it as a landscape of strategic opportunity. Every clause, every precedent, every procedural rule is a lever. Our role is to identify which levers move the outcome in your favour and to apply them with precision and force. We do not advise clients on what the law prevents. We counsel them on what it enables.",
  },
  {
    roman: "II",
    title: "Preparation as the Source of Authority",
    body: "Authority in the legal arena is not conferred — it is earned through exhaustive preparation. When our counsel walks into a negotiation, a boardroom, or a courtroom, the other side feels the weight of preparation before a single word is spoken. We study every weakness in an opposing argument, every vulnerability in a counterparty's position, and every dimension of risk your opponents would prefer we overlook. That preparation is our greatest weapon.",
  },
  {
    roman: "III",
    title: "Absolute Alignment with Client Objectives",
    body: "We are, first and foremost, architects of outcomes. We do not give legal advice in isolation — we give it in the context of what you are actually trying to achieve. Before we review a document or advise on a strategy, we spend time understanding the commercial, operational, and reputational objectives at stake. A technically correct legal solution that undermines your strategic position is not a solution — it is a sophisticated form of failure.",
  },
  {
    roman: "IV",
    title: "Discretion as the Foundation of Trust",
    body: "The mandates entrusted to us routinely involve information of the most sensitive nature — commercial secrets, ownership structures, personal circumstances, and business strategies that, if disclosed, could be catastrophic. We treat every engagement as a closed archive. Our protocols for information security, document handling, and team compartmentalisation are rigorous and non-negotiable. You will never question where your information goes.",
  },
  {
    roman: "V",
    title: "Excellence Without Compromise",
    body: "We do not produce work products that are merely adequate. Every document that bears our name, every piece of advice delivered, and every courtroom argument made must meet an internal standard that most practitioners rarely reach. This standard is not a policy — it is a cultural expectation. We accept fewer engagements than we could because we refuse to dilute the quality we commit to each client.",
  },
];

const firmTimeline = [
  { year: "Foundation", event: "M.S Ochieng Law established as a boutique corporate practice with a singular focus on complex commercial mandates." },
  { year: "Regional Expansion", event: "Practice expanded to encompass multi-jurisdictional mandates across East and Southern Africa, with cross-border M&A and regulatory advisory entering as core pillars." },
  { year: "Litigation Eminence", event: "The Litigation Division, under senior advocacy leadership, secured landmark decisions in corporate and constitutional law that reshaped the regulatory landscape." },
  { year: "Recognition", event: "Named among the region's most respected boutique legal practices by leading legal directories, recognised for consistent delivery on transformative transactions." },
  { year: "Present", event: "A practice of uncompromising excellence, advising a select portfolio of corporations, financial institutions, and private clients on the full spectrum of elite legal matters." },
];

export default function Philosophy() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="pt-48 pb-28 px-6 relative overflow-hidden border-b border-primary/15">
        <div className="absolute top-0 right-0 w-[60vw] h-[80vh] bg-gradient-to-bl from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-20 items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:w-1/2"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" />
              The Firm's Foundation
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl md:text-7xl text-white mb-6 leading-tight">
              Our<br /><span className="gold-text-gradient">Philosophy</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold w-24 mb-10" />
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground text-lg font-light leading-relaxed">
              Every great firm is built on a set of convictions — beliefs about the role of law, the nature of excellence, and the obligations owed to the clients who place their most critical matters in our hands. These are ours.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:w-1/2 grid grid-cols-2 gap-6"
          >
            {[
              { value: "30+", label: "Years Combined Experience" },
              { value: "6", label: "Core Practice Areas" },
              { value: "12+", label: "Jurisdictions Served" },
              { value: "100%", label: "Client Confidentiality Commitment" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="border border-primary/15 p-8 bg-black/30">
                <div className="font-serif-heading text-4xl md:text-5xl gold-text-gradient mb-3">{stat.value}</div>
                <div className="font-serif-sub text-muted-foreground tracking-[0.2em] uppercase text-[10px]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Statement */}
      <section className="py-32 px-6 bg-[#060606] relative border-b border-primary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-2/5">
            <div className="aspect-square max-w-sm border border-primary/20 relative flex items-center justify-center bg-black/60">
              <div className="absolute inset-6 border border-primary/10" />
              <div className="w-40 h-40 rounded-full embossed-seal flex items-center justify-center">
                <span className="font-serif-heading text-4xl embossed-logo tracking-tighter">MSO</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
            </div>
            <div className="mt-8">
              <p className="font-serif-heading text-xl text-white mb-1">M.S. Ochieng</p>
              <p className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs">Founding & Managing Partner</p>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="lg:w-3/5"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs mb-8">A Note from the Managing Partner</motion.p>
            <motion.blockquote variants={fadeUp} className="font-serif-heading text-3xl md:text-4xl text-white leading-snug mb-10">
              "I did not establish this firm to practise law the way law has always been practised. I established it to demonstrate what is possible when legal excellence is paired with genuine strategic commitment."
            </motion.blockquote>
            <motion.div variants={fadeUp} className="divider-gold w-20 mb-10" />
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground text-base font-light leading-relaxed mb-6">
              The clients who come to us are not searching for adequate legal advice. They are searching for counsel that understands the full dimensions of what is at stake — commercially, reputationally, and personally. They need lawyers who are willing to think strategically, act decisively, and stand behind their advice under pressure.
            </motion.p>
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground text-base font-light leading-relaxed">
              That is what we offer. Not volume. Not averages. Precision, delivered by a team that has chosen depth over breadth and excellence over expansion. Every engagement we accept carries the full weight of our commitment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-32 px-6 bg-background border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-24"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-6">Guiding Convictions</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">Five Principles of Practice</motion.h2>
          </motion.div>

          <div className="flex flex-col gap-0 border-t border-primary/10">
            {principles.map((p, i) => (
              <motion.div
                key={p.roman}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="group flex flex-col md:flex-row gap-8 md:gap-16 py-16 border-b border-primary/10 hover:bg-white/[0.015] transition-colors duration-700 px-4 md:px-0"
              >
                <div className="md:w-24 flex-shrink-0">
                  <span className="font-serif-heading text-5xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">{p.roman}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif-heading text-2xl md:text-3xl text-white mb-6 group-hover:text-primary transition-colors duration-400">{p.title}</h3>
                  <p className="font-sans text-muted-foreground text-base md:text-lg font-light leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Timeline */}
      <section className="py-32 px-6 bg-[#060606] border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" />
              The Arc of the Firm
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">How We Became What We Are</motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-[140px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            <div className="flex flex-col gap-0">
              {firmTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="flex flex-col md:flex-row gap-6 md:gap-16 py-14 relative"
                >
                  <div className="absolute left-4 md:left-[132px] top-16 w-4 h-4 rounded-full border border-primary bg-background flex-shrink-0" />
                  <div className="md:w-32 md:text-right flex-shrink-0 pl-12 md:pl-0">
                    <span className="font-serif-sub text-primary tracking-[0.2em] uppercase text-xs">{item.year}</span>
                  </div>
                  <div className="flex-1 pl-12 md:pl-12">
                    <p className="font-sans text-muted-foreground text-base md:text-lg font-light leading-relaxed">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-40 px-6 bg-background text-center relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div variants={fadeUp} className="font-serif-heading text-9xl text-primary/10 leading-none mb-4">"</motion.div>
          <motion.p variants={fadeUp} className="font-serif-heading text-3xl md:text-5xl text-white leading-snug mb-12">
            We are the firm that elite clients call when the stakes are too high for anything other than the best.
          </motion.p>
          <motion.div variants={fadeUp} className="divider-gold w-20 mx-auto mb-8" />
          <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs">M.S Ochieng Law</motion.p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-black text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="font-serif-heading text-3xl md:text-4xl text-white mb-6">Understand Our Practice Fully</motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-muted-foreground font-light mb-12 leading-relaxed">
            See how our philosophy translates into the specific legal services we provide across six practice areas.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/practice" className="inline-block font-serif-sub tracking-[0.25em] uppercase text-sm border border-primary/50 text-primary px-12 py-4 hover:bg-primary hover:text-black transition-all font-semibold">
              View Practice Areas
            </Link>
            <Link href="/consultation" className="inline-block font-serif-sub tracking-[0.25em] uppercase text-sm bg-primary text-black px-12 py-4 hover:bg-primary/80 transition-colors font-semibold">
              Engage the Firm
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
