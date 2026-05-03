import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search as SearchIcon, FileText, ChevronRight, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { getBlogPosts } from "@/lib/blogData";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ pages: [], blogs: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [location] = useLocation();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const staticPages = [
    { id: "home", title: t('search.static_pages.home_title'), path: "/", snippet: t('search.static_pages.home_snippet'), keywords: "home welcome index landing mission vision values firm legal chamber law lawyers advocates team innovation integrity excellence commitment kenya nairobi chambers legal solutions clear advice strong representation" },
    { id: "about", title: t('search.static_pages.about_title'), path: "/about-us", snippet: t('search.static_pages.about_snippet'), keywords: "about us mission vision values history firm profile founders who we are story legal excellence innovation integrity commitment excellence experienced team personalized approach reputation results oriented kenya law local expertise introduction partner success achievement modern law firm" },
    { id: "practice", title: t('search.static_pages.practice_title'), path: "/practice", snippet: t('search.static_pages.practice_snippet'), keywords: "practice areas expertise services conveyancing property real estate matrimonial divorce law child custody maintenance estate planning wills family trusts succession mediation asset maximization seamless transfer project financing due diligence residential leases licenses environmental planning commercial law corporate advisory startup formation contract drafting governance restructuring regulatory institutional immigration global mobility residency work permits investor visas expatriate relocation litigation courtroom strategy tax litigation criminal defense constitutional judicial review securities debt recovery adr strategic negotiation high-level mediation conflict resolution arbitration confidentiality intellectual property asset protection digital sovereignty trademark copyright data protection privacy audits software tech licensing digital media rights employment labor law workforce stability risk mitigation labor relations harmony executive contracts hr policy workplace compliance media entertainment law content protection talent stewardship production distribution contracts defamation" },
    { id: "charter", title: t('search.static_pages.charter_title'), path: "/service-charter", snippet: t('search.static_pages.charter_snippet'), keywords: "charter service commitment promises standards client care delivery billing legal fees retainer fees advocates remuneration order response times technology it systems efficient effectiveness quality answering telephone calls returning calls emails prepared documentation leases court matters status reports transparent strategic responsiveness surgical precision" },
    { id: "people", title: t('search.static_pages.people_title'), path: "/people", snippet: t('search.static_pages.people_snippet'), keywords: "people team lawyers advocates attorneys partners associates staff team members ochieng advocates professional profiles management legal professionals dedicated team managed partner m.s. ochieng" },
    { id: "consultation", title: t('search.static_pages.consultation_title'), path: "/consultation", snippet: t('search.static_pages.consultation_snippet'), keywords: "contact us consultation form email phone map location address message book appointment briefing support help reach out talk to us suite 1421 upper hill complex nairobi kenya (+254) 791 857001 legal briefing project talk" }
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("q") || "";
    setQuery(q);

    if (q.trim()) {
      const lowerQ = q.toLowerCase();
      const matchedPages = staticPages.filter(page => 
        page.title.toLowerCase().includes(lowerQ) || 
        page.snippet.toLowerCase().includes(lowerQ) ||
        (page.keywords && page.keywords.toLowerCase().includes(lowerQ))
      );
      const blogs = getBlogPosts();
      const matchedBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(lowerQ) || 
        blog.snippet.toLowerCase().includes(lowerQ) ||
        blog.content.toLowerCase().includes(lowerQ) ||
        (blog.category && blog.category.toLowerCase().includes(lowerQ))
      );
      setResults({ pages: matchedPages, blogs: matchedBlogs });
    } else {
      setResults({ pages: [], blogs: [] });
    }
    setIsLoading(false);
  }, [location, window.location.search, language]);

  const totalResults = results.pages.length + results.blogs.length;
  const suggestedSearches = ["Commercial", "Property", "Family", "Litigation", "Immigration", "Mission", "Team"];

  return (
    <Layout>
      <section className="pt-40 pb-20 px-6 bg-[#f8fafc] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-serif-heading text-4xl text-[#1c2f54] mb-4 font-bold flex items-center gap-4">
              <SearchIcon size={32} className="text-[#cc2027]" />
              {t('search.results')}
            </h1>
            <p className="font-sans text-gray-500 text-lg">
              {query 
                ? t('search.showing').replace('{count}', totalResults).replace('{s}', totalResults !== 1 ? 's' : '').replace('{query}', query)
                : t('search.enter_term')}
            </p>
          </div>

          {!isLoading && query && totalResults === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-sm border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400"><AlertCircle size={32} /></div>
              <h3 className="font-sans text-xl font-bold text-[#1c2f54] mb-2">{t('search.no_results')}</h3>
              <p className="font-sans text-gray-500 mb-8">{t('search.no_results_desc').replace('{query}', query)}</p>
              <div className="pt-8 border-t border-gray-50">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">{t('search.try_searching')}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {suggestedSearches.map(term => (
                    <Link key={term} href={`/search?q=${term}`} className="px-4 py-2 bg-gray-50 hover:bg-[#cc2027] hover:text-white text-[#1c2f54] text-xs font-bold rounded-full transition-all">{term}</Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!isLoading && totalResults > 0 && (
            <div className="space-y-8">
              {results.pages.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-serif-sub tracking-widest text-[#cc2027] uppercase text-xs font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-px bg-[#cc2027]"></span> {t('search.pages_title')}
                  </h2>
                  <div className="space-y-4">
                    {results.pages.map((page, i) => (
                      <motion.div key={`page-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                        <Link href={page.path}>
                          <div className="block bg-white p-6 rounded-sm border border-gray-100 shadow-xs hover:shadow-md hover:border-[#cc2027]/30 transition-all group">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-sans text-lg font-bold text-[#1c2f54] group-hover:text-[#cc2027] transition-colors mb-2">{page.title}</h3>
                                <p className="font-sans text-sm text-gray-500">{page.snippet}</p>
                              </div>
                              <ChevronRight className="text-gray-300 group-hover:text-[#cc2027] transition-colors shrink-0" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {results.blogs.length > 0 && (
                <div>
                  <h2 className="font-serif-sub tracking-widest text-[#cc2027] uppercase text-xs font-bold mb-6 flex items-center gap-2">
                    <span className="w-6 h-px bg-[#cc2027]"></span> {t('search.articles_title')}
                  </h2>
                  <div className="space-y-4">
                    {results.blogs.map((blog, i) => (
                      <motion.div key={`blog-${blog.id}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (results.pages.length + i) * 0.1 }}>
                        <Link href={`/blog/${blog.id}`}>
                          <div className="block bg-white p-6 rounded-sm border border-gray-100 shadow-xs hover:shadow-md hover:border-[#cc2027]/30 transition-all group">
                            <div className="flex justify-between items-start">
                              <div className="pr-6">
                                <div className="flex items-center gap-3 mb-2">
                                  <FileText size={14} className="text-gray-400" />
                                  <span className="text-[10px] font-serif-sub uppercase tracking-widest text-gray-400 font-bold">
                                    {blog.category || "Insight"} • {blog.date}
                                  </span>
                                </div>
                                <h3 className="font-sans text-lg font-bold text-[#1c2f54] group-hover:text-[#cc2027] transition-colors mb-2">{blog.title}</h3>
                                <p className="font-sans text-sm text-gray-500 line-clamp-2">{blog.snippet}</p>
                              </div>
                              <ChevronRight className="text-gray-300 group-hover:text-[#cc2027] transition-colors shrink-0 mt-4" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
