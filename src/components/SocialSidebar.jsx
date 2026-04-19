import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaRedditAlien, FaWhatsapp, FaPlus, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: FaFacebookF, color: "#1877F2", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61551090343152" },
  { icon: FaXTwitter, color: "#000000", label: "X", href: "https://x.com/pakadvocates" },
  { icon: FaInstagram, color: "#C13584", label: "Instagram", href: "https://instagram.com/pakadvocates" },
  { icon: FaWhatsapp, color: "#25D366", label: "WhatsApp", href: "https://wa.me/254732575066" },
];

export default function SocialSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col pointer-events-none">
      <div className="flex flex-col pointer-events-auto">
        {socials.map((platform, i) => (
          <a
            key={i}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.label}
            className="w-10 h-10 flex items-center justify-center text-white transition-all duration-300 hover:w-12 group shadow-[2px_0_10px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: platform.color }}
          >
            <platform.icon size={16} className="group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
}
