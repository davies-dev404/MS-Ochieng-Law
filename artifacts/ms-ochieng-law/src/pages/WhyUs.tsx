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

const differentiators = [
  {
    number: "01",
    title: "Absolute Discretion",
    subtitle: "Confidentiality is not a policy — it is a covenant.",
    body: "We operate in the shadows of the world's most significant deals and disputes. The matters entrusted to us routinely involve information that, if disclosed, could move markets, damage reputations, or alter the outcome of transactions worth hundreds of millions. Our discretion protocols are absolute. Information is compartmentalised within the engagement team. External disclosure is impossible by design, not by policy.",
    detail: "Our confidentiality architecture includes engagement-specific document compartmentalisation, encrypted communication protocols, and strict team access controls that ensure only those who need to know, do.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "02",
    title: "Aggressive Elegance",
    subtitle: "Ruthless in strategy. Unimpeachable in conduct.",
    body: "We pair the most aggressive negotiation tactics available within the law with an external presentation of unimpeachable professionalism. We do not win by being the loudest party in the room. We win by being the most prepared, the most strategically disciplined, and the most intellectually formidable. Opposing counsel reads our pleadings and knows, immediately, that they are dealing with a different calibre of advocate.",
    detail: "Our litigation and negotiation teams are trained in adversarial strategy, not just legal doctrine. We study the individuals on the other side as intently as we study the law.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "03",
    title: "Bespoke Legal Architecture",
    subtitle: "No templates. No approximations. Only precision.",
    body: "Every mandate we accept is constructed from the ground up. We do not deploy standardised precedents and adapt them — we analyse the specific legal, commercial, and strategic context of your position and design a legal framework tailored to it. This approach takes longer, demands more of our team, and costs more than commoditised legal work. But it produces legal instruments and strategies that are uniquely suited to your objectives.",
    detail: "From transaction structures to litigation strategies, every engagement receives an individualised strategic blueprint reviewed at the partner level before any implementation begins.",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "04",
    title: "Senior Counsel Accessibility",
    subtitle: "Partner access from day one — not as an exception.",
    body: "At many practices, senior partners appear for pitches and disappear for execution. At M.S Ochieng Law, the partner who advises you at the outset remains involved through completion. We maintain this commitment by controlling our caseload with discipline. We do not overextend our senior counsel across dozens of simultaneous matters. You will have access to the most experienced minds in our firm at every critical juncture.",
    detail: "All strategic decisions on your matter are made at the partner level. Execution may involve our senior associates, but the strategic direction is set and supervised by the partner responsible for your engagement.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "05",
    title: "Multi-Jurisdictional Command",
    subtitle: "Seamless counsel across borders, without disruption.",
    body: "Cross-border mandates demand lawyers who understand not just the law in multiple jurisdictions, but the practical realities of operating across regulatory environments that may be in tension with one another. Our team has deep experience in East and Southern African legal systems, combined with strong working relationships with leading practitioners in key international jurisdictions. We coordinate seamlessly across borders so that you receive unified strategic advice.",
    detail: "We maintain coordinated relationships with leading firms in major jurisdictions and have internal expertise in the legal systems of 12+ African markets.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
  },
  {
    number: "06",
    title: "Outcome-Driven Billing",
    subtitle: "We measure our value by your results, not our hours.",
    body: "We are willing to engage in billing structures that align our commercial interests with your outcomes. Where appropriate, we offer fixed-fee arrangements for transactional work, capped engagement structures for ongoing advisory mandates, and — in select litigation matters — outcome-linked components. We have this confidence because we believe, fundamentally, that we will deliver.",
    detail: "All billing structures are agreed at the outset of the engagement with full transparency. We do not issue surprise invoices or undisclosed costs.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
  },
];

const comparisons = [
  { attribute: "Engagement Model", us: "Selective — limited simultaneous mandates", them: "Volume-based, often 50+ per partner" },
  { attribute: "Senior Counsel Access", us: "Partner engagement throughout", them: "Partner visible at pitch, absent during execution" },
  { attribute: "Document Approach", us: "Purpose-built for every matter", them: "Standardised precedents lightly adapted" },
  { attribute: "Confidentiality", us: "Architectural — by design, not policy", them: "Contractual — by policy" },
  { attribute: "Strategy", us: "Legal outcome embedded in commercial objective", them: "Legal outcome in isolation" },
  { attribute: "Billing", us: "Outcome-aligned where possible", them: "Purely hourly, exposure unlimited" },
];

const testimonials = [
  {
    quote: "M.S Ochieng Law gave us clarity and decisive direction in one of the most complex cross-border transactions we have ever undertaken. The partner involvement throughout was exactly what we needed.",
    name: "Group CEO",
    company: "Listed Financial Services Group, East Africa",
  },
  {
    quote: "When the litigation became existential for our business, we needed more than a lawyer — we needed a strategist. That is precisely what we got. The preparation was extraordinary.",
    name: "Managing Director",
    company: "Regional Infrastructure Conglomerate",
  },
  {
    quote: "The regulatory landscape had defeated our internal team. M.S Ochieng Law came in, mapped the exposure we hadn't seen, and navigated us to a resolution that protected the business entirely.",
    name: "Chief Legal Officer",
    company: "Multinational Telecommunications Group",
  },
];

export default function WhyUs() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="pt-48 pb-28 px-6 relative overflow-hidden border-b border-primary/15">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1600&q=80"
            alt="Corporate office" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
        <div className="absolute top-0 left-0 w-[50vw] h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" />
              The Case for M.S Ochieng Law
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl md:text-7xl text-white mb-6 leading-tight">
              Why<br /><span className="gold-text-gradient">Counsel</span><br />With Us
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-gold w-24 mb-10" />
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground text-lg font-light leading-relaxed max-w-2xl">
              The legal market is saturated with firms that promise excellence and deliver adequacy. We are built differently — from the ground up, by design. This page explains precisely why discerning clients choose us and what they can expect when they do.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Differentiators */}
      {differentiators.map((item, i) => (
        <section key={item.number}
          className={`py-24 px-6 border-b border-primary/10 ${i % 2 === 0 ? "bg-background" : "bg-[#060606]"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
              className="flex flex-col lg:flex-row gap-16 xl:gap-28"
            >
              <motion.div variants={fadeRight} className="lg:w-1/3">
                <div className="relative overflow-hidden mb-8 border border-primary/10">
                  <img src={item.img} alt={item.title}
                    className="w-full h-40 object-cover grayscale opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <span className="font-serif-heading text-8xl text-primary/10 block mb-4 leading-none">{item.number}</span>
                <h2 className="font-serif-heading text-3xl md:text-4xl text-white mb-4 leading-tight">{item.title}</h2>
                <div className="divider-gold w-14 mb-5" />
                <p className="font-serif-sub text-primary tracking-[0.2em] uppercase text-xs leading-relaxed">{item.subtitle}</p>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:w-2/3">
                <p className="font-sans text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-10">{item.body}</p>
                <div className="border-l-2 border-primary/30 pl-8 py-2 bg-black/20">
                  <p className="font-serif-sub text-primary/70 text-sm leading-relaxed italic">{item.detail}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#060606] border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-20">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" /> Client Testimony
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">What Our Clients Say</motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-muted-foreground font-light mt-4 max-w-xl leading-relaxed text-sm">
              At our clients' request, testimonials are presented without identifying information. Discretion extends to every dimension of our relationships.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary/10">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="group p-10 border border-primary/5 hover:bg-white/[0.025] transition-colors duration-700 flex flex-col">
                <div className="font-serif-heading text-5xl text-primary/20 mb-6 leading-none">"</div>
                <p className="font-serif-heading text-lg text-white leading-snug mb-8 flex-1 group-hover:text-primary/90 transition-colors duration-400">
                  {t.quote}
                </p>
                <div className="divider-gold w-10 mb-6 opacity-50" />
                <p className="font-serif-heading text-sm text-white">{t.name}</p>
                <p className="font-serif-sub text-muted-foreground tracking-[0.2em] uppercase text-[10px] mt-1">{t.company}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-32 px-6 bg-background border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-16">
            <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-16 h-[1px] bg-primary block" /> Comparative Standard
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl md:text-5xl text-white">How We Stand Apart</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="border border-primary/15">
            <div className="grid grid-cols-3 bg-primary/5 border-b border-primary/20">
              <div className="p-6 col-span-1"><span className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs">Attribute</span></div>
              <div className="p-6 border-l border-primary/20"><span className="font-serif-sub text-primary tracking-[0.3em] uppercase text-xs">M.S Ochieng Law</span></div>
              <div className="p-6 border-l border-primary/20"><span className="font-serif-sub text-muted-foreground tracking-[0.3em] uppercase text-xs">Typical Practice</span></div>
            </div>
            {comparisons.map((row, i) => (
              <motion.div key={i} variants={fadeUp}
                className="grid grid-cols-3 border-b border-primary/8 hover:bg-white/[0.02] transition-colors group">
                <div className="p-7 col-span-1">
                  <p className="font-serif-sub text-white/60 text-xs tracking-[0.15em] uppercase">{row.attribute}</p>
                </div>
                <div className="p-7 border-l border-primary/10">
                  <p className="font-sans text-white text-sm font-light leading-relaxed">{row.us}</p>
                </div>
                <div className="p-7 border-l border-primary/10">
                  <p className="font-sans text-muted-foreground/60 text-sm font-light leading-relaxed">{row.them}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Promise */}
      <section className="py-40 px-6 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80"
            alt="City skyline" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="max-w-3xl mx-auto relative z-10">
          <motion.div variants={fadeUp} className="w-20 h-20 rounded-full embossed-seal flex items-center justify-center mx-auto mb-12">
            <span className="font-serif-heading text-2xl embossed-logo tracking-tighter">MSO</span>
          </motion.div>
          <motion.p variants={fadeUp} className="font-serif-sub text-primary tracking-[0.4em] uppercase text-xs mb-8">The Client Promise</motion.p>
          <motion.p variants={fadeUp} className="font-serif-heading text-3xl md:text-5xl text-white leading-snug mb-12">
            When you engage M.S Ochieng Law, you engage the full weight of a practice built to deliver results that others cannot.
          </motion.p>
          <motion.div variants={fadeUp} className="divider-gold w-20 mx-auto mb-12" />
          <motion.div variants={fadeUp}>
            <Link href="/consultation" className="inline-block font-serif-sub tracking-[0.25em] uppercase text-sm bg-primary text-black px-14 py-5 hover:bg-primary/80 transition-colors font-semibold">
              Begin Your Engagement
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
