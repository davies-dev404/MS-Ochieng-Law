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
  { href: "/charter", label: "Service Charter" },
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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative flex flex-col">
    <header id="heda" className={`w-full z-50 flex flex-col fixed top-0 transition-all duration-300 pointer-events-none ${isScrolled ? 'pt-0 px-0' : 'pt-3 px-3 md:px-6 md:pt-4'}`}>
        <div className={`w-full mx-auto max-w-[1240px] flex flex-col transition-all duration-500 pointer-events-auto ${
          isScrolled 
            ? 'bg-white rounded-none md:rounded-b-xl shadow-md border-b border-gray-200' 
            : 'bg-white/90 backdrop-blur-md rounded-[12px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] overflow-hidden ring-1 ring-black/5 mt-4'
        }`}>
            <div className="header-top-section bg-[#1c2f54] text-white py-[10px] w-full hidden md:block">
                <div className="row">
                    <div className="container mx-auto px-4 lg:px-6">
                        <div className="contact-details-top flex flex-col md:flex-row justify-between items-center text-[13px] tracking-wide">
                            <div className="phone-email flex gap-8">
                                <a href="mailto:info@msochienglaw.co.ke" className="flex items-center gap-2 hover:text-gray-300 transition-colors"><Mail size={14} fill="white" className="text-[#1c2f54]" /> info@msochienglaw.co.ke</a>
                                <a href="tel:+254732575066" className="flex items-center gap-2 hover:text-gray-300 transition-colors"><Phone size={14} fill="white" className="text-white" /> +254 732 575 066</a>
                            </div>
                            <div className="social-links flex items-center gap-4 mt-2 md:mt-0">
                                <div id="search">
                                  <form role="search" method="get" className="search-form flex h-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" action="/">
                                    <label className="m-0">
                                        <input type="search" className="search-field form-control px-3 h-full text-gray-700 text-[13px] outline-none w-[200px] bg-white border-none rounded-none" placeholder="Search..." name="s" title="Search for:" />
                                    </label>
                                    <input type="submit" className="search-submit bg-[#cc2027] text-white px-5 font-bold text-xs h-full border-none cursor-pointer hover:bg-red-800 tracking-wider rounded-none transition-colors" value="SEARCH" />
                                  </form>
                                </div> 
                                <ul className="flex items-center gap-2 m-0 p-0 list-none text-white socials-active">
                                    <li className="flex gap-2">                                        
                                        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/profile.php?id=61551090343152" className="w-[30px] h-[30px] rounded-full border border-white/60 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all text-white shadow-sm" title="Facebook"><FaFacebookF size={12} /></a>
                                        <a target="_blank" rel="noreferrer" href="https://x.com/pakadvocates" className="w-[30px] h-[30px] rounded-full border border-white/60 flex items-center justify-center hover:bg-black hover:border-black transition-all text-white shadow-sm" title="X (Twitter)"><FaXTwitter size={12} /></a>
                                        <a target="_blank" rel="noreferrer" href="https://instagram.com/pakadvocates" className="w-[30px] h-[30px] rounded-full border border-white/60 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:to-[#ee2a7b] hover:border-transparent transition-all text-white shadow-sm" title="Instagram"><FaInstagram size={12} /></a>
                                        <a target="_blank" rel="noreferrer" href="tel:+254732575066" className="w-[30px] h-[30px] rounded-full border border-white/60 flex items-center justify-center hover:bg-[#cc2027] hover:border-[#cc2027] transition-all text-white shadow-sm" title="Call Us"><Phone size={12} /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div className="header-main-section bg-white pb-4 pt-3">
            <div className="row">
                <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center">
                    <div className="logo shrink-0 pt-1 lg:pt-0">
                        <Link href="/">
                            <BrandMark variant="gold" size="small" className="drop-shadow-sm" />
                        </Link>
                    </div>
                    
                    <nav id="menu-desktop" className="hidden lg:flex w-full justify-end pt-3">
                        <div className="menu-main-menu-container">
                          <ul id="menu-main-menu" className="menu flex items-center gap-6 m-0 p-0 list-none tracking-wide text-[13px] font-bold">
                            <li className="menu-item"><Link href="/" className={`hover:text-[#1c2f54] uppercase transition-colors ${location === '/' ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>Home</Link></li>
                            <li className="menu-item"><Link href="/about-us" className={`hover:text-[#1c2f54] uppercase transition-colors ${location === '/about-us' ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>About Us</Link></li>
                            <li className="menu-item"><Link href="/practice" className={`hover:text-[#1c2f54] uppercase transition-colors ${location.startsWith('/practice') ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>Our Expertise</Link></li>
                            <li className="menu-item"><Link href="/service-charter" className={`hover:text-[#1c2f54] uppercase transition-colors ${location === '/service-charter' ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>Service Charter</Link></li>
                            <li className="menu-item"><Link href="/people" className={`hover:text-[#1c2f54] uppercase transition-colors ${location === '/people' ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>Our People</Link></li>
                            <li className="menu-item"><Link href="/blog" className={`hover:text-[#1c2f54] uppercase transition-colors ${location.startsWith('/blog') ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>Blog</Link></li>
                            <li className="menu-item"><Link href="/consultation" className={`hover:text-[#1c2f54] uppercase transition-colors ${location === '/consultation' ? 'text-[#1c2f54]' : 'text-[#cc2027]'}`}>Contact Us</Link></li>
                          </ul>
                        </div>
                    </nav>

                    <button className="lg:hidden text-[#cc2027] pt-2" onClick={() => setMenuOpen(!menuOpen)}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
                    className="lg:hidden bg-white border-t border-gray-100 flex flex-col shadow-lg overflow-hidden absolute w-full top-full left-0 z-40 rounded-b-xl"
                  >
                    <ul id="menu-mobile-menu" className="menu flex flex-col m-0 p-0 list-none tracking-wide text-sm font-bold">
                        <li className="menu-item"><Link href="/" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location === '/' ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>Home</Link></li>
                        <li className="menu-item"><Link href="/about-us" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location === '/about-us' ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>About Us</Link></li>
                        <li className="menu-item"><Link href="/practice" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location.startsWith('/practice') ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>Our Expertise</Link></li>
                        <li className="menu-item"><Link href="/service-charter" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location === '/service-charter' ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>Service Charter</Link></li>
                        <li className="menu-item"><Link href="/people" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location === '/people' ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>Our People</Link></li>
                        <li className="menu-item"><Link href="/blog" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location.startsWith('/blog') ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>Blog</Link></li>
                        <li className="menu-item"><Link href="/consultation" className={`block px-8 py-4 border-b border-gray-50 uppercase transition-colors ${location === '/consultation' ? 'bg-gray-50 text-[#1c2f54]' : 'text-[#cc2027]'}`}>Contact Us</Link></li>
                    </ul>
                  </motion.div>
                )}
            </AnimatePresence>
        </div>
        </div>
    </header>

      {/* spacer to account for fixed header - remove on home page for full-screen hero */}
      {location !== '/' && (
        <div className="h-[120px] lg:h-[148px] w-full shrink-0 bg-white" />
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
                   <p className="font-sans text-[13px] font-bold leading-tight">Suite 1401, Upper Hill Complex<br/>Nairobi, Kenya</p>
                 </div>
                 <div className="flex gap-4 items-center">
                   <div className="bg-white text-[#1c2f54] p-1.5 rounded-[2px]"><Headphones size={14} strokeWidth={2.5} /></div>
                   <p className="font-sans text-[13px] font-bold tracking-wide">Tel: (+254) 732 575066</p>
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
