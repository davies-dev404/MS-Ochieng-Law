import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link, useRoute } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const blogPosts = [
  {
    id: 1,
    title: "Regional Trade Compliance & Institutional Risk",
    content: "The landscape of regional trade within the East African Community (EAC) has undergone a tectonic shift over the past twenty-four months. For multi-national corporations, compliance is no longer a checklist—it is a strategic imperative that dictates market access and institutional stability. Our analysis reveals that recent cross-border protocols have introduced rigorous secondary auditing requirements that mandates a proactive legal posture.",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Sexual-Harassment-Policy-in-Kenya-768x480.webp",
    date: "Dec 20, 2025",
    author: "M.S. Ochieng",
    category: "Corporate Commercial Law",
    sectors: ["Import/Export", "Supply Chain", "FinTech"]
  },
  {
    id: 2,
    title: "The Architecture of Capital Gains Tax in Kenya",
    content: "The Kenya Revenue Authority's (KRA) aggressive stance on capital gains realization has caught many institutional investors off-guard. The 2024 Revenue Act amendments signify a departure from legacy taxation models, shifting toward a more granular, realization-focused framework. Structural financing for property developments must now account for these complexities at the inception phase.",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Carrying-Out-a-Redundancy-Process-in-Kenya-768x583.webp",
    date: "Dec 15, 2025",
    author: "A. Korir",
    category: "Real Estate",
    sectors: ["Real Estate Development", "Private Equity", "Banking"]
  },
  {
    id: 3,
    title: "Executive Stewardship: Beyond the Employment Act",
    content: "In the elite sectors of regional business, employment is defined by stewardship and complex intellectual property mandates. The standard Employment Act, while foundational, is insufficient for protecting institutional IP and executive-level trade secrets. We explore the architectural requirements for robust service level agreements that secure the firm's competitive edge.",
    image: "https://wakilihub.co.ke/wp-content/uploads/2025/12/Carrying-Out-Termination-of-Employment-in-Kenya-768x449.webp",
    date: "Dec 10, 2025",
    author: "M.S. Ochieng",
    category: "Employment Law",
    sectors: ["Human Capital", "Corporate Tech", "Heavy Industry"]
  }
];

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:id");
  const post = blogPosts.find(p => p.id === parseInt(params?.id)) || blogPosts[0];

  return (
    <Layout>
      <article className="bg-white">
        {/* Post Hero */}
        <header className="relative pt-60 pb-32 px-6 overflow-hidden bg-secondary">
          <div className="absolute inset-0 z-0">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-40 grayscale brightness-50" 
            />
            <div className="absolute inset-0 bg-linear-to-b from-secondary/80 via-secondary/20 to-white" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="flex justify-center items-center gap-6 mb-12">
                <span className="font-serif-sub tracking-[0.4em] uppercase text-[11px] text-primary font-bold">{post.category}</span>
                <span className="w-px h-10 bg-white/20" />
                <span className="font-serif-sub tracking-[0.4em] uppercase text-[11px] text-white/50 font-bold">{post.date}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-serif-heading text-5xl md:text-8xl text-white mb-12 leading-tight font-bold uppercase tracking-tight">
                {post.title}
              </motion.h1>
              <motion.div variants={fadeUp} className="flex justify-center items-center gap-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/40 shadow-2xl">
                   <img src="/ms-ochieng.jpg" alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                   <p className="font-serif-sub tracking-[0.3em] uppercase text-[11px] text-white font-bold">{post.author}</p>
                   <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest leading-none mt-1">Founding Partner</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Content Section */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
            
            {/* Sidebar for depth */}
            <aside className="lg:w-1/4 order-2 lg:order-1">
               <div className="sticky top-40 space-y-16">
                  <div>
                     <p className="font-serif-sub tracking-[0.4em] uppercase text-[10px] text-primary mb-8 font-bold border-l-2 border-primary pl-4 leading-none">Relevant Sectors</p>
                     <div className="flex flex-wrap gap-2">
                        {post.sectors.map(s => (
                          <span key={s} className="px-4 py-2 bg-muted/5 border border-border text-[9px] uppercase tracking-widest font-serif-sub font-bold text-secondary/60">{s}</span>
                        ))}
                     </div>
                  </div>
                  <div>
                     <p className="font-serif-sub tracking-[0.4em] uppercase text-[10px] text-primary mb-8 font-bold border-l-2 border-primary pl-4 leading-none">Strategic Contact</p>
                     <p className="font-sans text-xs text-foreground/50 leading-relaxed mb-6">Request a formal briefing or detailed opinion regarding this analysis.</p>
                     <Link href="/consultation" className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-secondary font-bold hover:text-primary transition-colors no-underline">Engage Now →</Link>
                  </div>
               </div>
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4 order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="prose prose-2xl prose-slate max-w-none"
              >
                <p className="font-sans font-light leading-relaxed text-foreground/80 first-letter:text-8xl first-letter:font-serif-heading first-letter:text-primary first-letter:mr-5 first-letter:float-left mb-12">
                  {post.content}
                </p>
                
                <h3 className="font-serif-heading text-4xl text-secondary mt-20 mb-10 font-bold uppercase tracking-tight">Legislative Precedence & Compliance.</h3>
                <p className="font-sans font-light leading-relaxed text-foreground/70 mb-12">
                  Jurisprudence in Kenya and the wider EAC region has shifted significantly toward institutional transparency. The standard of due diligence required of directors and corporate officers has evolved from 'reasonable care' to 'structural foresight'. Our focus here is the mitigation of risk through preemptive legal architecturing.
                </p>

                <div className="bg-secondary p-16 my-20 shadow-4xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:bg-primary/20 transition-all duration-700" />
                  <p className="font-serif-sub text-2xl md:text-3xl text-white/90 leading-relaxed italic relative z-10">
                    "Institutional silence is no longer an option in matters of regulatory flux. The mandate for excellence requires absolute clarity of purpose and precision in execution."
                  </p>
                  <div className="mt-10 h-px w-20 bg-primary/40 group-hover:w-full transition-all duration-1000" />
                </div>

                <h3 className="font-serif-heading text-4xl text-secondary mt-20 mb-10 font-bold uppercase tracking-tight">Practical Application.</h3>
                <p className="font-sans font-light leading-relaxed text-foreground/70 mb-12">
                  It is not enough to maintain a legacy compliance framework. Organizations must pivot toward dynamic legal advisory that integrates seamlessly with commercial operations. This includes the regular auditing of contractual exposures and the continuous monitoring of legislative amendments that impact sector-specific operations.
                </p>
              </motion.div>

              {/* Author Footer */}
              <footer className="mt-32 pt-20 border-t border-border">
                <div className="flex flex-col md:flex-row gap-16 items-center md:items-start text-center md:text-left">
                  <div className="shrink-0 relative group">
                    <div className="absolute -inset-2 border border-primary/20 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                    <img src="/ms-ochieng.jpg" alt={post.author} className="w-32 h-32 object-cover border border-primary grayscale hover:grayscale-0 transition-all duration-700 shadow-3xl" />
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-3xl text-secondary mb-3 font-bold">{post.author}</h4>
                    <p className="font-serif-sub tracking-widest uppercase text-[11px] text-primary mb-8 font-bold">Managing Partner & Senior Counsel</p>
                    <p className="font-sans text-foreground/60 text-sm font-light leading-relaxed mb-10 max-w-2xl">
                      A leading authority on corporate governance and regional trade law, {post.author} has advised elite institutional clients on mandate critical structural changes for over two decades.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8">
                       <Link href="/consultation" className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-primary border-b-2 border-primary/30 hover:border-primary pb-1 no-underline transition-all font-bold">
                         Engage for Institutional Advisory →
                       </Link>
                       <Link href="/blog" className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-secondary/40 hover:text-secondary pb-1 no-underline transition-all font-bold">
                         Back to Journal Overview
                       </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </section>

        {/* Global Nav back */}
        <section className="py-24 bg-muted/5 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Link 
              href="/blog" 
              className="font-serif-sub tracking-[0.4em] uppercase text-xs text-secondary/30 hover:text-primary transition-all no-underline font-bold"
            >
              ← System Record Overview
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  );
}
