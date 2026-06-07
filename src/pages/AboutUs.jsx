import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  Target, Flag, Star, ShieldCheck, Scale, Quote,
  ChevronDown, HelpCircle, ArrowRight, Award,
  Users, Globe, Briefcase, Heart, Zap, Lock,
  Home, Handshake, FileText, Music, Coins
} from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../lib/translations";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Static Data ─── */

const VALUES = [
  { icon: Zap,       label: 'Innovation',   desc: 'We embrace forward-thinking legal strategies.' },
  { icon: ShieldCheck,label: 'Integrity',   desc: 'Unwavering ethical standards in every matter.' },
  { icon: Heart,     label: 'Commitment',   desc: "Relentless dedication to our clients' outcomes." },
  { icon: Award,     label: 'Excellence',   desc: 'Consistently raising the standard of legal service.' },
];

const PRACTICE_AREAS = [
  { name: 'Real Estate & Conveyancing', icon: Home },
  { name: 'Commercial Law', icon: Briefcase },
  { name: 'Immigration', icon: Globe },
  { name: 'Family & Children', icon: Users },
  { name: 'Civil & Criminal Litigation', icon: Scale },
  { name: 'ADR & Negotiation', icon: Handshake },
  { name: 'IP & Data Privacy', icon: ShieldCheck },
  { name: 'Employment Law', icon: FileText },
  { name: 'Media & Entertainment', icon: Music },
  { name: 'Taxation Law', icon: Coins },
];

const FAQS = [
  {
    q: "What areas of law does M.S. Ochieng Legal specialise in?",
    a: "We offer a full spectrum of legal services including Real Estate & Conveyancing, Commercial Law, Immigration, Family & Children Law, Civil & Criminal Litigation, ADR & Negotiation, IP & Data Privacy, Employment Law, and Media & Entertainment Law. Our multi-disciplinary team ensures every client receives expert guidance tailored to their specific legal needs."
  },
  {
    q: "How do I book a consultation with the firm?",
    a: "You can book a consultation through our online Consultation page, by calling us directly at +254 791 857001, or by emailing info@msochienglaw.co.ke. We offer initial consultations to understand your matter and advise on the best course of action — whether in person at our Upper Hill Chambers offices or virtually."
  },
  {
    q: "Does the firm handle both individuals and corporate clients?",
    a: "Yes. M.S. Ochieng Legal serves a diverse clientele including private individuals, families, startups, SMEs, multinational corporations, and NGOs. We tailor our approach and communication style to match each client's context — whether you need personal estate planning or complex multi-jurisdiction corporate transactions."
  },
  {
    q: "Where is M.S. Ochieng Legal located?",
    a: "Our offices are situated at Suite 1421, Upper Hill Complex, Nairobi, Kenya — in the heart of Nairobi's legal and business district. We also serve clients across East Africa and internationally, including through virtual consultations for clients in the diaspora."
  },
  {
    q: "How are legal fees structured?",
    a: "We believe in full transparency around billing. Fees are structured based on the complexity and nature of your matter, and may be fixed-fee, retainer-based, or time-billed. Our Service Charter outlines our commitment to clear, upfront billing with no hidden costs. We discuss fees candidly at the outset of every engagement."
  },
  {
    q: "Can the firm assist with immigration and work permits?",
    a: "Absolutely. Our Immigration practice covers work permits, special passes, residency applications, Class G permits, and global mobility advisory for both individuals and companies relocating staff. We have extensive experience navigating Kenya's immigration framework and cross-border legal requirements."
  },
  {
    q: "Is information I share with the firm confidential?",
    a: "Yes — attorney-client privilege applies fully to all communications and information you share with M.S. Ochieng Legal. We are bound by the Law Society of Kenya's professional conduct rules, which require strict confidentiality. Your information will never be disclosed without your express consent, except as required by law."
  },
  {
    q: "Does the firm offer services in languages other than English?",
    a: "Yes. We serve clients in English, Swahili, and French to reflect the diverse needs of our East African and diaspora client base. Our website also provides content in all three languages to ensure accessibility and clarity for every visitor."
  }
];

/* ─── Component ─── */
export default function AboutUs() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Layout
      title={t('nav.about')}
      description="Learn about M.S. Ochieng Legal — our mission, vision, values, and history of delivering top-tier advocacy, corporate advisory, and strategic litigation in East Africa."
    >

      {/* ══════════════════════════════════════════
          STORY SECTION — Editorial two-column
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 px-6 bg-white relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-0 right-0 font-serif-heading text-[200px] md:text-[280px] font-black text-gray-50 leading-none pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
          MSO
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT — sticky image with decorative frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Main photo */}
              <div className="relative z-10 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.18)]">
                <img
                  src="/ms-ochieng.jpg"
                  alt="MS Ochieng — Managing Partner"
                  className="w-full aspect-3/4 object-cover object-center"
                  onError={e => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1505664173615-04b1cad311b5?q=80&w=2070&auto=format&fit=crop"; }}
                />
                {/* Overlay gradient on photo */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1c2f54]/40 via-transparent to-transparent" />
              </div>

              {/* Decorative corner frames */}
              <div className="absolute -top-5 -left-5 w-20 h-20 border-t-4 border-l-4 border-[#cc2027]" />
              <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-4 border-r-4 border-[#cc2027]" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -right-6 bottom-20 bg-[#1c2f54] text-white p-5 shadow-2xl max-w-[200px]"
              >
                <Quote size={20} className="text-[#cc2027] mb-3" />
                <p className="font-serif text-[13px] italic leading-snug text-white/90">
                  "Innovative. Reliable. Committed."
                </p>
                <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#cc2027] mt-3">
                  — MS Ochieng, Founder
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT — story text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-[#cc2027]" />
                <span className="font-sans font-bold tracking-[0.3em] uppercase text-[10px] text-[#cc2027]">
                  {t('about.intro_title') || 'Who We Are'}
                </span>
              </div>

              <h2 className="font-serif-heading text-4xl md:text-5xl xl:text-6xl font-bold text-[#1c2f54] uppercase tracking-tight leading-[0.92] mb-10">
                A Firm Built for the <span className="text-[#cc2027]">Modern Client</span>
              </h2>

              <div className="space-y-6 text-gray-600 font-sans font-light leading-relaxed text-base md:text-[17px]">
                <p className="text-[#1c2f54] font-serif text-xl md:text-2xl font-normal leading-snug">
                  {t('about.intro_p1') || 'M.S. Ochieng Legal was established with a singular purpose: to deliver legal excellence that is both sophisticated and accessible.'}
                </p>
                <p>{t('about.intro_p2') || 'Based at the Upper Hill Complex in Nairobi, we have grown into one of Kenya\'s most respected boutique law firms — trusted by individuals, families, and corporations across East Africa and the diaspora.'}</p>
                <p>{t('about.intro_p3') || 'Our founder, Ms. M.S. Ochieng, leads a team of dedicated advocates who combine deep legal expertise with genuine care for every client\'s outcome — ensuring that each matter receives the personal attention it deserves.'}</p>
              </div>

              {/* Inline stats */}
              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { icon: Globe, label: 'East Africa & diaspora clients' },
                  { icon: Users, label: 'Multi-disciplinary advocate team' },
                  { icon: Briefcase, label: '9 specialist practice areas' },
                  { icon: Award, label: 'LSK regulated & compliant' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#cc2027]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} className="text-[#cc2027]" />
                    </div>
                    <p className="text-[13px] text-[#1c2f54] font-semibold font-sans leading-snug">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          CORE VALUES — Dark with glowing cards
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 bg-[#1c2f54] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#cc2027]/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-10 bg-[#cc2027]" />
                <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px]">Our DNA</span>
              </div>
              <h2 className="font-serif-heading text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-[0.92]">
                Core <span className="text-[#cc2027]">Values</span>
              </h2>
            </div>
            <p className="text-white/40 font-sans font-light text-sm max-w-sm leading-relaxed">
              Four principles that guide every brief we take, every strategy we craft, and every relationship we build.
            </p>
          </motion.div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/4 hover:bg-white/8 border border-white/8 hover:border-[#cc2027]/40 rounded-2xl p-8 overflow-hidden transition-all duration-500 cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-linear-to-br from-[#cc2027]/0 to-[#cc2027]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

                {/* Number watermark */}
                <div className="absolute -bottom-4 -right-4 font-serif-heading text-[100px] font-black text-white/4 group-hover:text-[#cc2027]/8 leading-none transition-colors duration-700 pointer-events-none">
                  {i + 1}
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-[#cc2027]/15 group-hover:bg-[#cc2027] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-lg group-hover:shadow-[#cc2027]/40">
                    <v.icon size={24} className="text-[#cc2027] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-sans font-black text-white text-lg uppercase tracking-wider mb-3 group-hover:text-[#cc2027] transition-colors duration-400">
                    {v.label}
                  </h3>
                  <p className="font-sans text-white/45 text-[13px] leading-relaxed font-light">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          PRACTICE AREAS MOSAIC
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 bg-gray-50 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col items-center text-center">

            {/* Top copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-2xl mb-14"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-[#cc2027]" />
                <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px]">Expertise</span>
                <div className="h-px w-10 bg-[#cc2027]" />
              </div>
              <h2 className="font-serif-heading text-4xl md:text-6xl font-bold text-[#1c2f54] uppercase tracking-tight leading-[0.92] mb-8">
                What We <span className="text-[#cc2027]">Do Best</span>
              </h2>
              <p className="text-gray-500 font-sans font-light text-base md:text-lg leading-relaxed mb-10">
                From complex cross-border transactions to compassionate family matters — our nine specialist practice areas cover every dimension of modern legal need.
              </p>
              <Link href="/practice">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-[#1c2f54] hover:bg-[#cc2027] text-white font-sans font-bold text-[11px] uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Explore All Areas <ArrowRight size={14} />
                </motion.div>
              </Link>
            </motion.div>

            {/* Tag mosaic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-3 max-w-4xl"
            >
              {PRACTICE_AREAS.map((area, i) => {
                const IconComponent = area.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.06, y: -3 }}
                    className={`group cursor-default px-5 py-3 font-sans font-bold text-[12px] md:text-[13px] uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-3 ${
                      i % 3 === 0
                        ? 'bg-[#1c2f54] text-white hover:bg-[#cc2027]'
                        : i % 3 === 1
                        ? 'bg-white text-[#1c2f54] border border-gray-100 hover:border-[#cc2027] hover:text-[#cc2027]'
                        : 'bg-[#cc2027]/10 text-[#cc2027] border border-[#cc2027]/20 hover:bg-[#cc2027] hover:text-white'
                    }`}
                  >
                    <IconComponent size={15} className={`transition-colors duration-300 ${
                      i % 3 === 0 ? 'text-[#cc2027] group-hover:text-white' : 'text-[#cc2027]'
                    }`} />
                    <span>{area.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          VISION / MISSION — Minimal horizontal cards
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px]">Direction</span>
              <div className="h-px w-10 bg-[#cc2027]" />
            </div>
            <h2 className="font-serif-heading text-4xl md:text-6xl font-bold text-[#1c2f54] uppercase tracking-tight leading-[0.92]">
              Vision & <span className="text-[#cc2027]">Mission</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                label: t('about.vision_title') || 'Our Vision',
                text: t('home.vision_desc') || 'To be the most trusted and innovative legal partner in East Africa — known for excellence, integrity, and transformative client outcomes.',
              },
              {
                icon: Flag,
                label: t('about.mission_title') || 'Our Mission',
                text: t('home.mission_desc') || 'To deliver clear, courageous, and committed legal counsel that empowers our clients to navigate complexity with confidence.',
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative bg-[#f9f9fb] border border-gray-100 hover:border-[#cc2027]/30 hover:shadow-[0_20px_50px_-15px_rgba(204,32,39,0.12)] rounded-2xl p-10 md:p-12 overflow-hidden transition-all duration-500"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-[#cc2027]/10 group-hover:bg-[#cc2027] flex items-center justify-center mb-8 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#cc2027]/30 group-hover:-rotate-3 group-hover:scale-110">
                    <card.icon size={24} className="text-[#cc2027] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-sans font-black text-[#1c2f54] text-lg uppercase tracking-widest mb-5 group-hover:text-[#cc2027] transition-colors duration-400">
                    {card.label}
                  </h3>
                  <p className="font-sans text-gray-500 font-light text-[15px] leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-6 bg-[#0b1628] relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#cc2027]/6 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/3 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[10px] flex items-center gap-2">
                <HelpCircle size={12} /> Frequently Asked
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>
            <h2 className="font-serif-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.92] mb-6">
              Common <span className="text-[#cc2027]">Questions</span>
            </h2>
            <p className="text-white/40 font-sans font-light text-base leading-relaxed">
              Everything you need to know about working with M.S. Ochieng Legal.
            </p>
          </motion.div>

          {/* Accordion - Grid layout to save vertical space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`rounded-2xl border overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? 'border-[#cc2027]/50 bg-white/5 shadow-[0_0_40px_rgba(204,32,39,0.1)]'
                      : 'border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 px-7 py-6 text-left group"
                  >
                    <div className="flex items-center gap-5">
                      <span className={`shrink-0 font-sans font-black text-[11px] tabular-nums tracking-widest transition-colors duration-300 ${isOpen ? 'text-[#cc2027]' : 'text-white/20'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-sans font-bold text-[14px] md:text-[15px] leading-snug transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/65 group-hover:text-white'}`}>
                        {faq.q}
                      </span>
                    </div>
                    <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                      isOpen ? 'bg-[#cc2027] border-[#cc2027] rotate-180' : 'border-white/15 text-white/40 group-hover:border-white/30'
                    }`}>
                      <ChevronDown size={14} strokeWidth={2.5} className={isOpen ? 'text-white' : ''} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-7 pb-7 pl-[72px]">
                          <div className="h-px bg-white/8 mb-5" />
                          <p className="text-white/55 font-sans font-light text-[14px] md:text-[15px] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 p-8 md:p-10 rounded-3xl bg-[#cc2027]/10 border border-[#cc2027]/25 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          >
            <div>
              <p className="font-serif-heading text-xl md:text-2xl text-white font-bold mb-1">Still have questions?</p>
              <p className="text-white/45 font-sans font-light text-sm">Our advocates are ready to provide personalised guidance.</p>
            </div>
            <Link href="/consultation">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="shrink-0 bg-[#cc2027] hover:bg-white text-white hover:text-[#cc2027] font-sans font-bold text-[11px] uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 shadow-lg shadow-[#cc2027]/30 whitespace-nowrap cursor-pointer"
              >
                Book a Consultation
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
