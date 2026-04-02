import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-foreground overflow-hidden font-sans">
      
      {/* Custom Noise Overlay for Leather/Marble Texture Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-primary/20' : 'bg-transparent py-8'}`}>
        <div className="px-8 max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif-heading text-2xl tracking-widest text-primary uppercase cursor-pointer flex items-center gap-4">
            <div className="w-8 h-8 rounded-full embossed-seal flex items-center justify-center">
              <span className="font-serif-heading text-xs embossed-logo tracking-tighter">MSO</span>
            </div>
            <span>MSO</span>
          </div>
          <div className="hidden md:flex gap-10 font-serif-sub text-xs tracking-[0.25em] uppercase text-foreground/70">
            <a href="#practice" className="hover:text-primary transition-colors duration-300">Practice Areas</a>
            <a href="#philosophy" className="hover:text-primary transition-colors duration-300">Philosophy</a>
            <a href="#differentiators" className="hover:text-primary transition-colors duration-300">Why Us</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-300">Consultation</a>
          </div>
          <button className="md:hidden text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-20">
        <motion.div 
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{ y: y1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </motion.div>

        <div className="z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="mb-14 perspective-1000"
          >
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full embossed-seal flex items-center justify-center mx-auto relative shadow-2xl">
              <div className="absolute inset-2 border border-primary/20 rounded-full" />
              <div className="absolute inset-4 border border-primary/10 rounded-full" />
              <span className="font-serif-heading text-7xl md:text-9xl embossed-logo tracking-tighter ml-[-5px]">MSO</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="w-full flex flex-col items-center"
          >
            <h1 className="font-serif-heading text-5xl md:text-7xl lg:text-[6rem] font-normal mb-8 text-white tracking-tight drop-shadow-2xl">
              M.S Ochieng Law
            </h1>
            <div className="divider-gold my-4 max-w-lg mx-auto opacity-70" />
            <p className="font-serif-sub text-lg md:text-2xl tracking-[0.4em] uppercase text-primary mt-6 mb-16 font-light drop-shadow-lg">
              Bold Law. Refined Strategy.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="group relative overflow-hidden border border-primary/40 px-12 py-5 font-serif-sub tracking-[0.25em] uppercase text-sm text-primary transition-all duration-500 gold-glow bg-black/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full z-0" />
            <span className="relative z-10 group-hover:text-black font-semibold transition-colors duration-500">Request Consultation</span>
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary/50"
        >
          <span className="font-serif-sub text-xs tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Philosophy / Introduction */}
      <section id="philosophy" className="py-32 px-6 relative z-10 bg-background/95">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRight}
            className="flex-1"
          >
            <h2 className="font-serif-sub text-primary tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary block" />
              Our Philosophy
            </h2>
            <h3 className="font-serif-heading text-4xl md:text-6xl text-white mb-10 leading-tight">
              Authority rooted in <span className="italic font-light gold-text-gradient">precision</span>.
            </h3>
            <p className="font-sans text-muted-foreground text-lg leading-relaxed font-light mb-8">
              At M.S Ochieng Law, we do not view the law as a set of constraints, but as a chessboard. Our practice is built on a singular premise: complex challenges demand sophisticated aggression. 
            </p>
            <p className="font-sans text-muted-foreground text-lg leading-relaxed font-light mb-12">
              We represent elite entities, high-net-worth individuals, and corporations facing pivotal moments. When the stakes are existential, hesitation is a liability. We move with calculated force, ensuring our clients not only navigate the legal landscape but dominate it.
            </p>
            <img src="/signature-placeholder.png" alt="Signature" className="h-16 opacity-50 filter invert" onError={(e) => e.currentTarget.style.display = 'none'} />
            <p className="font-serif-sub tracking-widest text-primary uppercase mt-4 text-xs">M.S. Ochieng, Managing Partner</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeLeft}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 border border-primary/20 transform translate-x-6 translate-y-6" />
            <img src="/scales-abstract.png" alt="Golden Scales of Justice" className="w-full h-auto relative z-10 grayscale-[30%] contrast-[1.2]" />
            <div className="absolute inset-0 z-20 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 3. Practice Areas */}
      <section id="practice" className="py-40 px-6 relative z-10 bg-[#060606]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-24 flex flex-col items-center"
          >
            <h2 className="font-serif-sub text-primary tracking-[0.3em] uppercase text-sm mb-6">Expertise</h2>
            <h3 className="font-serif-heading text-4xl md:text-6xl text-white mb-8">Domains of Practice</h3>
            <div className="divider-gold w-32" />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-primary/10"
          >
            {[
              {
                title: "Corporate Law",
                desc: "Structuring complex transactions, corporate governance, and strategic advisory for multinational entities. We build impenetrable legal frameworks.",
                icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              },
              {
                title: "High-Stakes Litigation",
                desc: "Aggressive, unyielding representation in bet-the-company disputes. We do not litigate to participate; we litigate to decisively win.",
                icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"
              },
              {
                title: "Mergers & Acquisitions",
                desc: "Navigating regulatory labyrinths and executing hostile or friendly takeovers with surgical precision and absolute discretion.",
                icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              },
              {
                title: "Commercial Disputes",
                desc: "Resolving intricate multi-jurisdictional conflicts through arbitration, mediation, or trial, ensuring business continuity.",
                icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              },
              {
                title: "Regulatory Affairs",
                desc: "Preemptive compliance strategies and defense against governmental inquiries. We insulate your operations from regulatory friction.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "Strategic Counsel",
                desc: "Board-level advisory for crisis management and long-term positioning. The silent hand guiding the most critical corporate decisions.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              }
            ].map((area, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="group relative p-12 border border-primary/5 hover:bg-white/[0.02] transition-colors duration-700 flex flex-col h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="w-14 h-14 mb-8 border border-primary/20 rounded flex items-center justify-center text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                    <path d={area.icon} />
                  </svg>
                </div>
                <h3 className="font-serif-heading text-2xl mb-4 text-white group-hover:text-primary transition-colors duration-300">{area.title}</h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                  {area.desc}
                </p>
                <div className="mt-auto pt-8">
                  <span className="font-serif-sub tracking-[0.2em] text-xs uppercase text-primary/50 group-hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
                    Explore <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Full-width Quote / Break */}
      <section className="py-48 px-6 relative flex items-center justify-center text-center overflow-hidden border-y border-primary/20">
        <motion.div className="absolute inset-0 z-0" style={{ y: y2 }}>
          <img src="/office-interior.png" alt="Office Interior" className="w-full h-[140%] object-cover opacity-15 grayscale brightness-50" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="z-10 max-w-5xl mx-auto relative"
        >
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-primary/20 font-serif-heading text-9xl">"</div>
          <p className="font-serif-heading text-4xl md:text-6xl leading-tight text-white mb-12 relative z-10">
            In the arena of high-stakes commerce, hesitation is the enemy. We do not react to the law; <span className="gold-text-gradient italic">we command it.</span>
          </p>
          <div className="divider-gold w-16 mx-auto mb-8" />
          <p className="font-serif-sub tracking-[0.4em] text-primary uppercase text-sm">
            M.S Ochieng Law
          </p>
        </motion.div>
      </section>

      {/* 5. Why Counsel With Us (Differentiators) */}
      <section id="differentiators" className="py-32 px-6 relative z-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRight}
              className="lg:w-1/3 sticky top-40"
            >
              <h2 className="font-serif-sub text-primary tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-primary block" />
                The Firm
              </h2>
              <h3 className="font-serif-heading text-4xl md:text-5xl text-white mb-8">Why Counsel<br />With Us</h3>
              <p className="font-sans text-muted-foreground font-light leading-relaxed mb-8">
                We are not a volume practice. We accept a limited number of engagements to ensure absolute dedication, unmatched accessibility, and relentless pursuit of our clients' objectives.
              </p>
              <button className="font-serif-sub tracking-[0.2em] text-sm uppercase text-primary border-b border-primary/50 pb-1 hover:border-primary hover:text-white transition-colors">
                View Firm Profile
              </button>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:w-2/3 flex flex-col gap-12"
            >
              {[
                {
                  number: "I.",
                  title: "Absolute Discretion",
                  desc: "We operate in the shadows of the world's most significant deals and disputes. Our confidentiality protocols are absolute, safeguarding your reputation and strategic intent."
                },
                {
                  number: "II.",
                  title: "Aggressive Elegance",
                  desc: "We pair ruthless negotiation tactics with unimpeachable professionalism. We command the room not by shouting, but through undeniable preparation and intellectual superiority."
                },
                {
                  number: "III.",
                  title: "Bespoke Architecture",
                  desc: "Every contract, defense, and offensive maneuver is custom-built. We reject templates. Your challenges are unique; our solutions are equally unprecedented."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="flex gap-8 md:gap-12 group"
                >
                  <div className="font-serif-heading text-3xl md:text-5xl text-primary/30 group-hover:text-primary transition-colors duration-500">
                    {item.number}
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-2xl md:text-3xl text-white mb-4 group-hover:gold-text-gradient transition-all">{item.title}</h4>
                    <p className="font-sans text-muted-foreground font-light leading-relaxed text-base md:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Contact / Consultation */}
      <section id="contact" className="py-40 px-6 bg-[#060606] border-t border-primary/10 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="border border-primary/20 p-12 md:p-24 text-center relative bg-black/40 backdrop-blur-sm"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />
            
            <div className="w-16 h-16 rounded-full embossed-seal flex items-center justify-center mx-auto mb-10">
              <span className="font-serif-heading text-xl embossed-logo tracking-tighter">MSO</span>
            </div>

            <h2 className="font-serif-heading text-4xl md:text-5xl mb-6 text-white">Engage Our Firm</h2>
            <p className="font-sans text-muted-foreground font-light mb-16 max-w-lg mx-auto text-lg">
              We accept clients exclusively by referral or private consultation. Contact our chambers to arrange an initial strategic review of your position.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-12 items-center mb-16">
              <div className="flex flex-col items-center">
                <span className="font-serif-sub text-primary tracking-[0.2em] uppercase text-xs mb-3">Direct Inquiries</span>
                <a href="mailto:counsel@msochieng.law" className="font-serif-sub tracking-widest text-xl text-white hover:text-primary transition-colors">
                  counsel@msochieng.law
                </a>
              </div>
              <div className="hidden md:block w-[1px] h-12 bg-primary/30" />
              <div className="flex flex-col items-center">
                <span className="font-serif-sub text-primary tracking-[0.2em] uppercase text-xs mb-3">Private Line</span>
                <a href="tel:+18005550199" className="font-serif-sub tracking-widest text-xl text-white hover:text-primary transition-colors">
                  +1 (800) 555-0199
                </a>
              </div>
            </div>

            <button className="group relative overflow-hidden border border-primary text-black px-14 py-5 font-serif-sub tracking-[0.25em] uppercase text-sm transition-all duration-500 bg-primary hover:bg-transparent hover:text-primary">
              <span className="relative z-10 font-semibold">Request Confidential Consultation</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="pt-20 pb-10 px-6 border-t border-primary/20 bg-background relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
          <div className="flex flex-col items-center md:items-start">
            <div className="font-serif-heading text-3xl text-white mb-2 tracking-tight">M.S Ochieng Law</div>
            <div className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs">Bold Law. Refined Strategy.</div>
          </div>
          
          <div className="flex gap-10 font-serif-sub tracking-widest text-sm text-muted-foreground uppercase">
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Journal</a>
            <a href="#" className="hover:text-primary transition-colors">Locations</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 font-sans text-[10px] text-muted-foreground/50 uppercase tracking-widest flex flex-col md:flex-row justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} M.S Ochieng Law Chambers. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>Attorney Advertising</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
