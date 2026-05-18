import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SocialSidebar from "@/components/SocialSidebar";
import { Link, useRoute } from "wouter";
import NewsletterForm from "@/components/NewsletterForm";
import { getBlogPosts, defaultBlogPosts } from "@/lib/blogData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Blog posts are now managed centrally in src/lib/blogData.js

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:id");
  const blogPosts = getBlogPosts();
  const post = blogPosts.find(p => p.id === params?.id) || blogPosts[0];

  return (
    <Layout>
      <SocialSidebar />
      <article className="bg-white">
        {/* Post Hero */}
        <header className="relative pt-48 pb-16 md:pt-56 md:pb-24 px-6 overflow-hidden bg-secondary">
          <div className="absolute inset-0 z-0">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover brightness-50" 
            />
            <div className="absolute inset-0 bg-linear-to-b from-secondary/80 via-secondary/20 to-white" />
          </div>

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="flex justify-center items-center gap-6 mb-12">
                <span className="font-serif-sub tracking-[0.4em] uppercase text-[11px] text-[#cc2027] font-bold">{post.category}</span>
                <span className="w-px h-10 bg-white/20" />
                <span className="font-serif-sub tracking-[0.4em] uppercase text-[11px] text-white/50 font-bold">{post.date}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-serif-heading text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-8 md:mb-12 leading-[1.1] font-bold uppercase tracking-tight">
                {post.title}
              </motion.h1>
              <motion.div variants={fadeUp} className="flex justify-center items-center gap-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#cc2027]/40 shadow-2xl">
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
        <section className="py-24 md:py-32 px-6 relative">
          <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sidebar for depth */}
            <aside className="lg:w-1/3 xl:w-1/4 order-2 lg:order-1">
               <div className="sticky top-40 space-y-12">
                  <div className="bg-muted/5 p-8 border border-border rounded-sm">
                     <p className="font-serif-sub tracking-[0.4em] uppercase text-[10px] text-[#cc2027] mb-8 font-bold border-l-2 border-[#cc2027] pl-4 leading-none">Relevant Sectors</p>
                     <div className="flex flex-wrap gap-2">
                        {post.sectors.map(s => (
                          <span key={s} className="px-3 py-1.5 bg-white border border-border text-[9px] uppercase tracking-widest font-serif-sub font-bold text-secondary/60 hover:border-[#cc2027]/30 transition-colors">{s}</span>
                        ))}
                     </div>
                  </div>
                  <div className="bg-[#1c2f54] p-8 text-white rounded-sm">
                     <p className="font-serif-sub tracking-[0.4em] uppercase text-[10px] text-[#cc2027] mb-6 font-bold border-l-2 border-[#cc2027] pl-4 leading-none">Strategic Contact</p>
                     <p className="font-sans text-xs text-white/60 leading-relaxed mb-8">Request a formal briefing or detailed opinion regarding this analysis.</p>
                     <Link href="/consultation" className="inline-block bg-[#cc2027] text-white px-6 py-3 font-serif-sub tracking-[0.2em] text-[9px] uppercase font-bold hover:bg-white hover:text-secondary transition-all no-underline shadow-xl">Engage Now →</Link>
                  </div>
               </div>
            </aside>

            {/* Main Content */}
            <div className="lg:w-2/3 xl:w-3/4 order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-3xl"
              >
                <div 
                  className="blog-post-content font-sans font-light text-foreground/80 text-lg md:text-xl prose prose-slate prose-headings:font-serif-heading prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-secondary prose-a:text-[#cc2027] prose-strong:text-secondary prose-img:rounded-sm shadow-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {!post.id.includes('default') ? null : (
                  <div className="mt-24 border-t border-border pt-24">
                    <h3 className="font-serif-heading text-4xl text-secondary mb-12 font-bold uppercase tracking-tight">Strategic Legal Trends</h3>
                    <p className="font-sans font-light leading-relaxed text-foreground/70 mb-12 text-lg">
                      The evolving legal landscape in Kenya demands more than just awareness; it requires proactive strategy. At M.S. Ochieng Legal, we don't just react to changes—we anticipate them. Our focus is on empowering clients with the foresight needed to turn regulatory challenges into competitive advantages.
                    </p>

                    <div className="bg-[#1c2f54] p-12 md:p-24 my-24 shadow-4xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#cc2027]/10 -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:bg-[#cc2027]/20 transition-all duration-700" />
                      <p className="font-serif-sub text-3xl md:text-4xl text-white/90 leading-tight italic relative z-10 font-medium">
                        "In the realm of law, excellence is not a destination but a continuous journey of integrity and innovation."
                      </p>
                      <div className="mt-12 h-0.5 w-24 bg-[#cc2027] group-hover:w-full transition-all duration-1000" />
                    </div>
                  </div>
                )}

                {/* Copyright Disclaimer - Only for default pre-existing posts */}
                {defaultBlogPosts.some(p => p.id === post.id) && (
                  <div className="mt-16 p-6 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg">
                    <p className="font-sans text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-bold mb-2">Copyright Disclaimer</p>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed">
                      M.S. Ochieng Legal does not claim copyright ownership of this published material. All rights belong to their respective original authors and publishers. This content is shared strictly for educational, informational, and strategic awareness purposes.
                    </p>
                  </div>
                )}
              </motion.div>

              <style>{`
                .blog-post-content {
                  white-space: pre-line;
                  line-height: 1.8;
                }
                .blog-post-content h1, .blog-post-content h2, .blog-post-content h3 {
                  margin-top: 2.5em;
                  margin-bottom: 1.2em;
                  color: #1c2f54;
                  font-weight: 700;
                  line-height: 1.2;
                  white-space: normal;
                }
                .blog-post-content p {
                  margin-bottom: 2em;
                  line-height: 1.9;
                  white-space: normal;
                }
                .blog-post-content ul, .blog-post-content ol {
                  margin-bottom: 2.5em;
                  padding-left: 1.5em;
                  white-space: normal;
                }
                .blog-post-content li {
                  margin-bottom: 1em;
                  padding-left: 0.5em;
                  white-space: normal;
                }
                .blog-post-content blockquote {
                  border-left: 4px solid #cc2027;
                  padding-left: 2em;
                  font-style: italic;
                  margin: 4em 0;
                  color: #1c2f54;
                  font-size: 1.2em;
                  white-space: normal;
                }
              `}</style>


              {/* Author Footer */}
              <footer className="mt-32 pt-20 border-t border-border">
                <div className="flex flex-col md:flex-row gap-16 items-center md:items-start text-center md:text-left">
                  <div className="shrink-0 relative group">
                    <div className="absolute -inset-2 border border-[#cc2027]/20 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                    <img src="/ms-ochieng.jpg" alt={post.author} className="w-32 h-32 object-cover border border-[#cc2027] transition-all duration-700 shadow-3xl" />
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-3xl text-secondary mb-3 font-bold">{post.author}</h4>
                    <p className="font-serif-sub tracking-widest uppercase text-[11px] text-[#cc2027] mb-8 font-bold">Managing Partner & Senior Counsel</p>
                    <p className="font-sans text-foreground/60 text-sm font-light leading-relaxed mb-10 max-w-2xl">
                      As a trusted advocate and advisor, {post.author} has helped many clients solve complex legal problems with innovation and commitment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8">
                       <Link href="/consultation" className="font-serif-sub tracking-[0.2em] text-[10px] uppercase text-[#cc2027] border-b-2 border-[#cc2027]/30 hover:border-[#cc2027] pb-1 no-underline transition-all font-bold">
                         Engage for Advice →
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
              className="font-serif-sub tracking-[0.4em] uppercase text-xs text-secondary/30 hover:text-[#cc2027] transition-all no-underline font-bold"
            >
              ← System Record Overview
            </Link>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-32 px-6 bg-secondary text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#cc2027]/5 -skew-x-12 translate-x-1/2" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto relative z-10">
            <motion.h2 variants={fadeUp} className="font-serif-heading text-4xl lg:text-5xl text-white mb-8 font-bold uppercase tracking-tight flex items-center justify-center gap-4 whitespace-nowrap">
              Institutional <span className="text-[#cc2027] italic">Intelligence.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-white/50 font-light mb-12 text-lg leading-relaxed max-w-xl mx-auto">
              Subscribe to receive preeminent legal briefings directly in your corporate inbox. No noise. Pure strategic foresight.
            </motion.p>
            <NewsletterForm fadeUp={fadeUp} />
          </motion.div>
        </section>
      </article>
    </Layout>
  );
}
