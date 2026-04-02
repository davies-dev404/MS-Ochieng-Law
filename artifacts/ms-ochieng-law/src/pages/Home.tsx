import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

const previewCards = [
  { href: "/practice", label: "Practice Areas", number: "01", heading: "Domains of Practice", sub: "Corporate Law · Litigation · M&A · Regulatory Affairs · Strategic Counsel" },
  { href: "/philosophy", label: "Our Philosophy", number: "02", heading: "Authority Rooted in Precision", sub: "We do not view the law as a set of constraints — we view it as a chessboard." },
  { href: "/why-us", label: "Why Choose Us", number: "03", heading: "Absolute Discretion. Aggressive Elegance.", sub: "A limited practice. Unlimited dedication to every engagement we accept." },
  { href: "/consultation", label: "Consultation", number: "04", heading: "Engage Our Chambers", sub: "We accept clients by referral or private consultation only." },
];

const team = [
  {
    name: "M.S. Ochieng",
    role: "Founding & Managing Partner",
    specialty: "Corporate Law · Strategic Counsel",
    bio: "Called to the bar in Kenya and England & Wales, M.S. Ochieng brings over two decades of front-line experience advising boards of directors, financial institutions, and high-net-worth individuals on the full spectrum of commercial and corporate law.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Amara Kimani",
    role: "Senior Partner, Litigation",
    specialty: "High-Stakes Litigation · Arbitration",
    bio: "With a record of landmark decisions in corporate and constitutional law, Amara leads the firm's litigation division with a reputation for methodical preparation and fearless advocacy in the region's most complex disputes.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "David Mwangi",
    role: "Partner, M&A and Regulatory",
    specialty: "Mergers & Acquisitions · Regulatory Affairs",
    bio: "A specialist in cross-border transactions, David has led legal advisory on transformative M&A mandates across East and Southern Africa, bringing deep expertise in multi-jurisdictional regulatory strategy and deal execution.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
];

const insights = [
  {
    category: "Corporate Law",
    title: "Navigating Cross-Border Holding Structures in East Africa: A Practitioner's Perspective",
    date: "March 2026",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Litigation",
    title: "The Anatomy of a Pre-Trial Strategy: How Superior Preparation Determines Courtroom Outcomes",
    date: "February 2026",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with dark overlay */}
        <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80"
            alt="Corporate skyline"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-background" />
          <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent" />
        </motion.div>

        <div className="z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto w-full pt-24 pb-32">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <img
              src="/mso-logo-transparent.png"
              alt="M.S Ochieng Legal — Bold Law. Refined Strategy."
              className="w-64 md:w-80 lg:w-96 h-auto object-contain mx-auto drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.18))" }}
            />
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <div className="divider-gold w-48 mb-8 opacity-50" />
            <p className="font-sans text-muted-foreground text-base md:text-lg font-light max-w-xl leading-relaxed text-center mb-14">
              An elite legal practice commanding authority at the intersection of corporate power, complex litigation, and strategic counsel — trusted by boards, institutions, and individuals across the continent and beyond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/consultation" className="border border-primary px-12 py-4 font-serif-sub tracking-[0.25em] uppercase text-sm text-black bg-primary hover:bg-transparent hover:text-primary transition-all duration-500 font-semibold">
              Request Consultation
            </Link>
            <Link href="/practice" className="border border-primary/30 px-12 py-4 font-serif-sub tracking-[0.25em] uppercase text-sm text-primary/70 hover:text-primary hover:border-primary/70 transition-all duration-500">
              Our Practice
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/40"
          >
            <span className="font-serif-sub text-[9px] tracking-widest uppercase mb-3">Scroll</span>
            <div className="w-[1px] h-14 bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Firm Credentials Strip */}
      <section className="py-12 border-y border-primary/15 bg-black/60">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center md:justify-between items-center gap-8"
        >
          {["30+ Years of Combined Expertise", "Multi-Jurisdictional Practice", "Exclusive Clientele", "100% Confidential", "Founding Member, East Africa Law Society Elite"].map((item, i) => (
            <motion.span key={i} variants={fadeUp} className="font-serif-sub text-[10px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">
              {item}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Statement */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-black/50 to-background" />
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <div className="font-serif-heading text-8xl text-primary/10 mb-4 leading-none">"</div>
          <p className="font-serif-heading text-3xl md:text-5xl text-white leading-snug mb-10">
            In the arena of high-stakes commerce, hesitation is the enemy. We do not react to the law;{" "}
            <em className="gold-text-gradient not-italic">we command it.</em>
          </p>
          <div className="divider-gold w-20 mx-auto mb-8" />
          <p className="font-serif-sub tracking-[0.4em] text-primary uppercase text-xs">M.S Ochieng — Managing Partner</p>
        </motion.div>
      </section>

      {/* Our Team */}
      <section className="py-32 px-6 bg-[#060606] border-y border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="text-center mb-20"
          >
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-4">The Counsel</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">Our Senior Partners</motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground font-light mt-6 max-w-xl mx-auto leading-relaxed">
              Every client engagement is led by a senior partner with decades of experience at the forefront of elite legal practice.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary/10"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp}
                className="group border border-primary/5 hover:bg-white/[0.02] transition-all duration-700 overflow-hidden"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-[40%] transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="p-8">
                  <p className="font-serif-sub text-primary tracking-[0.25em] uppercase text-[10px] mb-1">{member.specialty}</p>
                  <h3 className="font-serif-heading text-2xl text-white mb-1 group-hover:text-primary transition-colors duration-400">{member.name}</h3>
                  <p className="font-serif-sub text-muted-foreground tracking-[0.2em] uppercase text-[10px] mb-5">{member.role}</p>
                  <div className="divider-gold w-10 mb-5 opacity-50" />
                  <p className="font-sans text-muted-foreground/80 text-sm font-light leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Office Image Banner */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
          alt="M.S Ochieng Law Chambers"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center"
          >
            <p className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-4">Principal Office</p>
            <p className="font-serif-heading text-3xl md:text-4xl text-white">Suite 1401, Upper Hill Complex</p>
            <p className="font-serif-heading text-xl text-white/50">Nairobi, Kenya</p>
          </motion.div>
        </div>
      </section>

      {/* Page Cards */}
      <section className="py-24 px-6 bg-[#060606]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="font-serif-sub text-primary tracking-[0.35em] uppercase text-xs mb-4">Navigate the Firm</h2>
            <h3 className="font-serif-heading text-4xl md:text-5xl text-white">Explore Our Practice</h3>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-primary/10"
          >
            {previewCards.map((card) => (
              <motion.div key={card.href} variants={fadeUp}>
                <Link href={card.href} className="group block p-12 border border-primary/8 hover:bg-white/[0.025] transition-all duration-700 relative overflow-hidden cursor-pointer h-full">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 w-[1px] h-0 bg-primary group-hover:h-full transition-all duration-700" />
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-serif-heading text-5xl text-primary/15 group-hover:text-primary/30 transition-colors duration-500">{card.number}</span>
                    <span className="font-serif-sub text-[10px] tracking-[0.35em] uppercase text-primary/50 group-hover:text-primary transition-colors duration-300 mt-2">{card.label}</span>
                  </div>
                  <h3 className="font-serif-heading text-2xl md:text-3xl text-white mb-4 group-hover:text-primary transition-colors duration-400 leading-snug">{card.heading}</h3>
                  <p className="font-sans text-muted-foreground text-sm font-light leading-relaxed">{card.sub}</p>
                  <div className="mt-10 flex items-center gap-3">
                    <span className="font-serif-sub text-[11px] tracking-[0.3em] uppercase text-primary/40 group-hover:text-primary transition-colors duration-300">Enter</span>
                    <span className="text-primary/40 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Insights / Articles */}
      <section className="py-32 px-6 bg-background border-t border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-4 flex items-center gap-4">
                <span className="w-16 h-[1px] bg-primary block" />
                From the Chambers
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">Legal Insights</motion.h2>
            </div>
            <motion.p variants={fadeUp} className="font-serif-sub text-muted-foreground tracking-widest text-[10px] uppercase">
              Published Commentary & Analysis
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-primary/10"
          >
            {insights.map((article) => (
              <motion.div key={article.title} variants={fadeUp}
                className="group border border-primary/5 hover:bg-white/[0.02] transition-all duration-700 overflow-hidden cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={article.img} alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <span className="absolute top-6 left-6 font-serif-sub text-[10px] tracking-[0.3em] uppercase text-primary">{article.category}</span>
                </div>
                <div className="p-10">
                  <h3 className="font-serif-heading text-xl md:text-2xl text-white mb-4 leading-snug group-hover:text-primary transition-colors duration-400">{article.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-serif-sub text-muted-foreground tracking-[0.2em] uppercase text-[10px]">{article.date}</span>
                    <span className="font-serif-sub text-primary/50 group-hover:text-primary text-[11px] tracking-[0.3em] uppercase transition-colors">Read →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
