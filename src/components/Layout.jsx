import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import BrandMark from "./BrandMark";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/practice", label: "Practice Areas" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/why-us", label: "Why Us" },
  { href: "/blog", label: "Blog" },
  { href: "/consultation", label: "Consultation" },
];

const SocialIcons = () => (
  <div className="flex items-center gap-5">
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X / Twitter"
      className="text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    </a>
  </div>
);

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

  const isHome = location === "/";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <header className="fixed top-0 w-full z-50 flex flex-col">
        {/* Global Top Bar */}
        <div className="bg-secondary text-white/70 py-2 px-8 text-[10px] uppercase font-serif-sub tracking-[0.2em] hidden lg:flex justify-between items-center border-b border-white/10 shadow-sm relative z-50">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={12} strokeWidth={2} className="text-primary" /> +254 700 000 001</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={12} strokeWidth={2} className="text-primary" /> counsel@msochieng.law</span>
          </div>
          
          <div className="flex items-center gap-6">
             <SocialIcons />
             <div className="w-px h-3 bg-white/20" />
             <div className="flex items-center gap-2 font-bold">
                <button className="text-primary hover:text-white transition-colors">EN</button>
                <span className="text-white/30 font-light">|</span>
                <button className="hover:text-white transition-colors">SW</button>
             </div>
          </div>
        </div>

        <nav className={`w-full transition-all duration-500 relative z-40 ${isScrolled || !isHome ? "bg-white/95 backdrop-blur-md py-3 border-b border-border shadow-sm" : "bg-white/90 backdrop-blur-xs py-4 border-b border-white/10 shadow-lg"}`}>
        <div className="px-8 max-w-7xl mx-auto flex justify-between items-center relative">
          {/* logo only for internal pages */}
          <div className={`transition-all duration-500 flex items-center ${!isHome || isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}>
             <Link href="/" className="no-underline">
               <BrandMark variant="maroon" size="small" />
             </Link>
          </div>

          <div className="hidden md:flex gap-10 items-center absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-serif-sub text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 no-underline pb-1 border-b-2 ${location === link.href ? "text-primary border-primary" : "text-foreground/80 border-transparent hover:text-primary"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/consultation"
              className="font-serif-sub text-[11px] tracking-[0.2em] uppercase bg-primary text-white px-6 py-2.5 hover:bg-white hover:text-secondary transition-all duration-500 font-bold no-underline shadow-sm border border-primary"
            >
              Engage
            </Link>
          </div>

          <button className="md:hidden text-primary" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-border px-8 py-8 flex flex-col gap-6 shadow-xl relative overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif-sub text-sm tracking-widest uppercase text-foreground/80 hover:text-primary transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/consultation"
                className="font-serif-sub text-sm tracking-widest uppercase bg-primary text-white px-6 py-4 text-center font-bold hover:bg-secondary transition-colors no-underline"
              >
                Request Consultation
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        </nav>
      </header>

      <main className="relative z-10">
        {children}
      </main>

      <footer className="pt-24 pb-12 px-6 border-t border-border bg-secondary text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
            <div className="lg:w-1/3">
              <div className="flex items-center mb-10 overflow-hidden">
                <BrandMark variant="gold" size="medium" />
              </div>
              <p className="font-sans text-white/70 text-sm font-light leading-relaxed mb-8 max-w-xs">
                A distinguished legal practice offering unyielding representation and accessible counsel to every citizen, enterprise, and institution across the Republic and beyond.
              </p>
              <SocialIcons />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-12">
              <div>
                <p className="font-serif-sub text-accent tracking-[0.35em] uppercase text-[10px] mb-6 font-semibold">
                  The Firm
                </p>
                <div className="flex flex-col gap-4">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="font-serif-sub tracking-widest text-[11px] uppercase text-white/60 hover:text-white transition-colors no-underline"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-serif-sub text-accent tracking-[0.35em] uppercase text-[10px] mb-6 font-semibold">
                  Connect
                </p>
                <div className="flex flex-col gap-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-serif-sub tracking-widest text-[11px] uppercase text-white/60 hover:text-white transition-colors no-underline">LinkedIn</a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="font-serif-sub tracking-widest text-[11px] uppercase text-white/60 hover:text-white transition-colors no-underline">X</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-serif-sub tracking-widest text-[11px] uppercase text-white/60 hover:text-white transition-colors no-underline">Instagram</a>
                  <Link href="/blog" className="font-serif-sub tracking-widest text-[11px] uppercase text-white/60 hover:text-white transition-colors no-underline">Legal Journal</Link>
                </div>
              </div>
              <div>
                <p className="font-serif-sub text-accent tracking-[0.35em] uppercase text-[10px] mb-6 font-semibold">
                  Contact
                </p>
                <div className="flex flex-col gap-4 font-sans text-white/60 text-xs font-light leading-relaxed">
                  <a href="mailto:counsel@msochieng.law" className="hover:text-white transition-colors">counsel@msochieng.law</a>
                  <a href="tel:+2540700000001" className="hover:text-white transition-colors">+254 (0) 700 000 001</a>
                  <address className="not-italic text-white/50">
                    Suite 1401, Upper Hill Complex<br />
                    Nairobi, Kenya
                  </address>
                  <p className="text-white/40 text-[10px]">
                    Mon – Fri: 08:00 – 18:00 EAT<br />
                    Emergency line 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between gap-6">
            <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest">
              © {new Date().getFullYear()} M.S. Ochieng Legal Chambers. All Rights Reserved.
            </p>
            <div className="flex gap-8 font-sans text-[10px] text-white/40 uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-white transition-colors no-underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors no-underline">Terms of Engagement</Link>
              <span className="hidden md:inline">Attorney Advertising</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
