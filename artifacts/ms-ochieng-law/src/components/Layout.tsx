import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";

const navLinks = [
  { href: "/practice", label: "Practice Areas" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/why-us", label: "Why Us" },
  { href: "/consultation", label: "Consultation" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-primary/20" : "bg-transparent py-7"}`}>
        <div className="px-8 max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-4 cursor-pointer group no-underline"
          >
            <div className="w-10 h-10 rounded-full embossed-seal flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif-heading text-[10px] embossed-logo tracking-tight">MSO</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif-heading text-base text-white tracking-wider">M.S Ochieng</span>
              <span className="font-serif-sub text-[9px] tracking-[0.35em] uppercase text-primary/80">Law Chambers</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-serif-sub text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 relative group no-underline pb-1 ${location === link.href ? "text-primary border-b border-primary" : "text-foreground/60 hover:text-primary"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="ml-4 font-serif-sub text-[11px] tracking-[0.2em] uppercase bg-primary text-black px-6 py-2.5 hover:bg-primary/80 transition-colors duration-300 font-semibold no-underline"
            >
              Engage
            </Link>
          </div>

          <button className="md:hidden text-primary" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square">
              {menuOpen ? <path d="M6 6L18 18M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-primary/20 px-8 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif-sub text-xs tracking-[0.3em] uppercase text-foreground/70 hover:text-primary transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              className="font-serif-sub text-xs tracking-[0.2em] uppercase bg-primary text-black px-6 py-3 text-center font-semibold hover:bg-primary/80 transition-colors no-underline"
            >
              Request Consultation
            </Link>
          </div>
        )}
      </nav>

      <main className="relative z-10">{children}</main>

      <footer className="pt-20 pb-10 px-6 border-t border-primary/20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
            <div>
              <div className="font-serif-heading text-4xl text-white mb-3 tracking-tight">M.S Ochieng Law</div>
              <div className="font-serif-sub text-primary tracking-[0.35em] uppercase text-xs mb-6">Bold Law. Refined Strategy.</div>
              <p className="font-sans text-muted-foreground text-sm font-light max-w-xs leading-relaxed">
                An elite legal practice offering bespoke counsel to corporations, institutions, and high-net-worth individuals.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-4">
              {[
                { label: "Practice Areas", href: "/practice" },
                { label: "Philosophy", href: "/philosophy" },
                { label: "Why Us", href: "/why-us" },
                { label: "Consultation", href: "/consultation" },
                { label: "LinkedIn", href: "#" },
                { label: "Legal Journal", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-serif-sub tracking-[0.2em] text-[11px] uppercase text-muted-foreground hover:text-primary transition-colors no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="divider-gold opacity-20 mb-8" />

          <div className="font-sans text-[10px] text-muted-foreground/40 uppercase tracking-widest flex flex-col md:flex-row justify-between gap-4">
            <span>&copy; {new Date().getFullYear()} M.S Ochieng Law Chambers. All Rights Reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>Attorney Advertising</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
