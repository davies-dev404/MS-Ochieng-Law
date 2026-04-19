import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Home as HomeIcon, Headphones } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import BrandMark from "./BrandMark";
import FloatingWhatsApp from "./FloatingWhatsApp";
import AIChatBox from "./AIChatBox";

// Exact links from the provided nav structure screenshot
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/practice", label: "Our Expertise" },
  { href: "/service-charter", label: "Service Charter" },
  { href: "/people", label: "Our People" },
  { href: "/blog", label: "Blog" },
  { href: "/consultation", label: "Contact Us" },
];

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "M.S. Ochieng Law Firm",
    "description": "Premier law firm in Nairobi providing strategic legal solutions in Corporate Law, Family Law, and Litigation.",
    "url": "https://msochienglaw.co.ke/",
    "logo": "https://msochienglaw.co.ke/mso-branding.jpg",
    "telephone": "+254 791 857001",
    "email": "[EMAIL_ADDRESS]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Upper Hill Chambers",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.3000,
      "longitude": 36.8167
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/msochienglaw",
      "https://www.linkedin.com/company/msochienglaw",
      "https://twitter.com/msochienglaw"
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative flex flex-col">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    <header id="heda" className={`w-full z-50 flex flex-col fixed top-0 transition-all duration-300 pointer-events-none ${isScrolled ? 'pt-0 px-0' : 'pt-2 md:pt-4 px-3 md:px-8'}`}>
        <div className={`w-full mx-auto max-w-[1240px] flex flex-col transition-all duration-500 pointer-events-auto ${
          isScrolled 
            ? 'bg-white rounded-none md:rounded-b-2xl shadow-md border-b border-gray-200' 
            : 'bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5'
        }`}>
            {/* Top Utility Bar (Navy Blue) */}
            <div className={`header-top-bar bg-[#1c2f54] text-white py-[6px] md:py-[8px] w-full border-b border-white/10 ${!isScrolled ? 'rounded-t-xl md:rounded-t-2xl' : ''}`}>
                <div className="container mx-auto px-3 md:px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-4 text-[10px] md:text-[13px] tracking-wide">
                        {/* Contact Info Row */}
                        <div className="contact-info flex flex-wrap justify-center md:justify-start gap-3 md:gap-8 font-bold">
                            <a href="mailto:info@msochienglaw.co.ke" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors whitespace-nowrap">
                              <Mail size={12} fill="white" className="text-[#1c2f54]" /> info@msochienglaw.co.ke
                            </a>
                            <a href="tel:+254791857001" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors whitespace-nowrap">
                              <Phone size={12} fill="white" className="text-white" /> +254 791 857001
                            </a>
                        </div>
                        
                        {/* Search & Socials Row */}
                        <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto mt-1 lg:mt-0 border-t border-white/5 pt-2 lg:pt-0 lg:border-t-0">
                            <div id="search" className="grow lg:grow-0">
                                <form role="search" method="get" className="search-form flex h-7 shadow-sm" action="/">
                                    <label className="m-0 grow">
                                        <input type="search" className="search-field px-2 h-full text-gray-700 text-[11px] outline-none w-full md:w-[130px] bg-white rounded-l-[2px] border-none placeholder:text-gray-400" placeholder="Search..." name="s" title="Search for:" />
                                    </label>
                                    <input type="submit" className="search-submit bg-[#cc2027] text-white px-3 font-bold text-[10px] h-full border-none cursor-pointer hover:bg-red-800 tracking-wider rounded-r-[2px] transition-colors" value="SEARCH" />
                                </form>
                            </div>
                            <ul className="flex items-center gap-1.5 md:gap-2.5 m-0 p-0 list-none text-white">
                                <li className="flex gap-1.5 md:gap-2">                                        
                                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61551090343152" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] rounded-full border border-white/40 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all text-white" title="Facebook"><FaFacebookF size={10} /></a>
                                    <a target="_blank" rel="noreferrer" href="https://x.com/pakadvocates" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] rounded-full border border-white/40 flex items-center justify-center hover:bg-black hover:border-black transition-all text-white" title="X (Twitter)"><FaXTwitter size={10} /></a>
                                    <a target="_blank" rel="noreferrer" href="https://instagram.com/pakadvocates" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] rounded-full border border-white/40 flex items-center justify-center hover:bg-linear-to-tr hover:from-[#f9ce34] hover:to-[#ee2a7b] hover:border-transparent transition-all text-white" title="Instagram"><FaInstagram size={10} /></a>
                                    <a target="_blank" rel="noreferrer" href="tel:+254791857001" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] rounded-full border border-white/40 flex items-center justify-center hover:bg-[#cc2027] hover:border-[#cc2027] transition-all text-white" title="Call Us"><Phone size={10} /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar (White) */}
            <div className={`header-main-bar bg-white py-1.5 md:py-2 ${!isScrolled ? 'rounded-b-xl md:rounded-b-2xl' : ''}`}>
                <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center relative">
                    <div className="logo shrink-0 scale-90 md:scale-100 transition-transform origin-left">
                        <Link href="/">
                            <BrandMark variant="gold" size="small" className="drop-shadow-sm" />
                        </Link>
                    </div>
                    
                    <nav id="menu-desktop" className="hidden lg:flex w-full justify-end">
                        <div className="menu-main-menu-container">
                          <ul id="menu-main-menu" className="menu flex items-center gap-6 xl:gap-8 m-0 p-0 list-none tracking-tight text-[14px] xl:text-[15px] font-bold">
                            {navLinks.map((link, idx) => (
                              <li key={idx} className="menu-item">
                                <Link 
                                  href={link.href} 
                                  className={`uppercase transition-colors ${
                                    (location === link.href || (link.href !== '/' && location.startsWith(link.href)))
                                      ? 'text-[#cc2027]' 
                                      : 'text-[#1c2f54] hover:text-[#cc2027]'
                                  }`}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                    </nav>

                    <button className="lg:hidden text-[#1c2f54] p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                      </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden bg-white border-t border-gray-100 flex flex-col shadow-xl overflow-hidden absolute w-full top-full left-0 z-40 rounded-b-xl"
                  >
                    <ul id="menu-mobile-menu" className="menu flex flex-col m-0 p-0 list-none font-bold">
                        {navLinks.map((link, idx) => (
                          <li key={idx} className="menu-item">
                            <Link 
                              href={link.href} 
                              onClick={() => setMenuOpen(false)}
                              className={`block px-8 py-3.5 border-b border-gray-50 uppercase text-[12px] md:text-[13px] transition-colors ${
                                location === link.href ? 'bg-gray-50 text-[#cc2027]' : 'text-[#1c2f54]'
                              }`}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </motion.div>
                )}
            </AnimatePresence>
        </div>
    </header>

      {/* spacer to account for fixed header - remove on home page for full-screen hero */}
      {location !== '/' && (
        <div className="h-[155px] md:h-[135px] w-full shrink-0 bg-white" />
      )}

      <main className="relative z-10 grow">
        {children}
      </main>

      <FloatingWhatsApp />
      <AIChatBox />

      <footer className="bg-[#1c2f54] text-white pt-16 pb-6 px-6 relative z-10 mt-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            <div>
              <div className="bg-transparent inline-block mb-6 pt-2">
                 <BrandMark variant="gold" size="medium" />
              </div>
              <p className="font-sans text-white text-[13px] leading-relaxed font-bold tracking-wide">
                M.S. OCHIENG LAW FIRM is a top law firm in Nairobi where innovative legal strategies meets relentless commitment. We're not just another law firm—we're passionate advocates, trusted advisors, and your dedicated partners in the journey toward your success.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold mb-6 tracking-wide underline underline-offset-8 decoration-2 decoration-white/80 whitespace-nowrap">PRACTICE AREAS</h3>
              <div className="flex flex-col gap-3">
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Family Law</Link>
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Conveyancing & Real Estate</Link>
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Commercial & Business Law</Link>
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Employment & Labour Law</Link>
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Intellectual Property</Link>
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Legal Audit & Compliance</Link>
                 <Link href="/practice" className="font-sans text-[13px] font-bold hover:text-gray-300 transition-colors">Litigation & Dispute Resolution</Link>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold mb-6 tracking-wide underline underline-offset-8 decoration-2 decoration-white/80">CONTACT US</h3>
              <div className="flex flex-col gap-5">
                 <div className="flex gap-4 items-start">
                   <div className="bg-white text-[#1c2f54] p-1.5 rounded-[2px] mt-0.5"><HomeIcon size={14} strokeWidth={2.5} /></div>
                   <p className="font-sans text-[13px] font-bold leading-tight">Suite 1421, Upper Hill Complex<br/>Nairobi, Kenya</p>
                 </div>
                 <div className="flex gap-4 items-center">
                   <div className="bg-white text-[#1c2f54] p-1.5 rounded-[2px]"><Headphones size={14} strokeWidth={2.5} /></div>
                   <p className="font-sans text-[13px] font-bold tracking-wide">Tel: (+254) 791 857001</p>
                 </div>
                 <div className="flex gap-4 items-center">
                   <div className="bg-white text-[#1c2f54] p-1.5 rounded-[2px]"><Mail size={14} strokeWidth={2.5} /></div>
                   <p className="font-sans text-[13px] font-bold tracking-wide">info@msochienglaw.co.ke</p>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="border-t border-white/30 pt-6 text-center">
            <p className="font-sans text-[11px] font-bold italic tracking-wide">
              © Copyright {new Date().getFullYear()} M.S. Ochieng Law Firm. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
