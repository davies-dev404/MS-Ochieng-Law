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
  {
    href: "/practice",
    label: "Practice Areas",
    number: "01",
    heading: "Domains of Practice",
    sub: "Corporate Law · Litigation · M&A · Regulatory Affairs · Strategic Counsel",
  },
  {
    href: "/philosophy",
    label: "Our Philosophy",
    number: "02",
    heading: "Authority Rooted in Precision",
    sub: "We do not view the law as a set of constraints — we view it as a chessboard.",
  },
  {
    href: "/why-us",
    label: "Why Choose Us",
    number: "03",
    heading: "Absolute Discretion. Aggressive Elegance.",
    sub: "A limited practice. Unlimited dedication to every engagement we accept.",
  },
  {
    href: "/consultation",
    label: "Consultation",
    number: "04",
    heading: "Engage Our Chambers",
    sub: "We accept clients by referral or private consultation only.",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        </motion.div>

        <div className="z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto w-full pt-24 pb-32">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="w-52 h-52 md:w-72 md:h-72 rounded-full embossed-seal flex items-center justify-center mx-auto relative">
              <div className="absolute inset-2 border border-primary/15 rounded-full" />
              <div className="absolute inset-5 border border-primary/08 rounded-full" />
              <span className="font-serif-heading text-6xl md:text-9xl embossed-logo tracking-tighter">MSO</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="font-serif-heading text-5xl md:text-7xl lg:text-[6rem] font-normal text-white tracking-tight mb-6 leading-none">
              M.S Ochieng Law
            </h1>
            <div className="divider-gold w-64 my-6 opacity-60" />
            <p className="font-serif-sub text-lg md:text-2xl tracking-[0.45em] uppercase text-primary font-light mt-2 mb-6">
              Bold Law. Refined Strategy.
            </p>
            <p className="font-sans text-muted-foreground text-base md:text-lg font-light max-w-xl leading-relaxed mt-4 mb-14">
              An elite legal practice commanding authority at the intersection of corporate power, complex litigation, and strategic counsel.
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
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

      {/* Page Cards */}
      <section className="py-24 px-6 bg-[#060606]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="font-serif-sub text-primary tracking-[0.35em] uppercase text-xs mb-4">Navigate the Firm</h2>
            <h3 className="font-serif-heading text-4xl md:text-5xl text-white">Explore Our Practice</h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
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
                    <h3 className="font-serif-heading text-2xl md:text-3xl text-white mb-4 group-hover:text-primary transition-colors duration-400 leading-snug">
                      {card.heading}
                    </h3>
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
    </Layout>
  );
}
