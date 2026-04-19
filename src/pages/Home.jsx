import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, ChevronLeft, Calendar, User, Scale, Shield, Landmark, BookOpen, Users, Gavel, Briefcase, FileCheck, Home as HomeIcon, UserCheck, Target, Compass } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Layout from '../components/Layout';

const heroSlides = [
  {
    image: "hero/integrity.jpg",
    title: "Integrity.",
    subtitle: "We develop solutions and strategies that guarantee our clients the best possible results."
  },
  {
    image: "hero/excellence.jpg",
    title: "Excellence.",
    subtitle: "Our Advocates bring with them a decade of experience in legal practice."
  },
  {
    image: "hero/innovation.jpg",
    title: "Innovation.",
    subtitle: "We are eager and keen to find innovative solutions to address emerging legal issues."
  },
  {
    image: "hero/innovation.jpg",
    title: "Commitment.",
    subtitle: "We are passionate advocates, trusted advisors, and your dedicated partners toward your success."
  }
];

const expertiseAreas = [
  { title: "Family Law", img: "/practice/family-law.jpg", icon: Users },
  { title: "Conveyancing & Real Estate", img: "/practice/conveyancing.jpg", icon: HomeIcon },
  { title: "Commercial & Business Law", img: "/practice/commercial.jpg", icon: Briefcase },
  { title: "Employment & Labour Law", img: "/practice/employment.jpg", icon: UserCheck },
  { title: "Intellectual Property", img: "/practice/intellectual-property.jpg", icon: Scale },
  { title: "Legal Audit & Compliance", img: "/practice/legal-audit.jpg", icon: FileCheck },
  { title: "Litigation & Dispute Resolution", img: "/practice/litigation.jpg", icon: Gavel }
];

const blogPosts = [
  {
    title: "Family Trusts in Kenya: How to Protect Your Wealth and Secure Your Legacy",
    img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop",
    date: "12 Oct, 2026",
    link: "/blog/family-trusts-in-kenya"
  },
  {
    title: "Beyond the Will: Why a Registered Family Trust is the Ultimate Legacy Tool",
    img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop",
    date: "05 Sep, 2026",
    link: "/blog/registered-family-trust"
  },
  {
    title: "Understanding Corporate Governance in East Africa",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
    date: "18 Aug, 2026",
    link: "#"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Embla setup for Carousels
  const [expertiseRef, expertiseApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [insightsRef, insightsApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrevExpertise = useCallback(() => expertiseApi && expertiseApi.scrollPrev(), [expertiseApi]);
  const scrollNextExpertise = useCallback(() => expertiseApi && expertiseApi.scrollNext(), [expertiseApi]);

  const scrollPrevInsights = useCallback(() => insightsApi && insightsApi.scrollPrev(), [insightsApi]);
  const scrollNextInsights = useCallback(() => insightsApi && insightsApi.scrollNext(), [insightsApi]);

  // Autoplay for Expertise Carousel
  useEffect(() => {
    if (!expertiseApi) return;
    const interval = setInterval(() => {
      expertiseApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [expertiseApi]);

  // Autoplay for Expertise Carousel
  useEffect(() => {
    if (!expertiseApi) return;
    const interval = setInterval(() => {
      expertiseApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [expertiseApi]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <Layout>
      {/* Hero Slider Section */}
      <section className="relative h-[450px] md:h-[600px] w-full bg-[#1c2f54] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={!hasMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: hasMounted ? 1.5 : 0, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('${heroSlides[currentSlide].image}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-7xl font-sans text-white mb-4 md:mb-6 font-extrabold tracking-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-base md:text-2xl text-white/90 font-medium max-w-3xl mb-8 md:mb-12">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link href="/consultation">
                <button className="bg-transparent text-white border-2 border-white rounded-full px-10 py-3.5 flex items-center gap-3 transition-all duration-300 font-bold text-[15px] uppercase tracking-widest hover:bg-white hover:text-[#1c2f54] shadow-lg group">
                  Request Strategic Briefing <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>

        {/* Bullet Navigators */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full border-2 border-white/20 transition-all duration-300 ${currentSlide === idx ? 'bg-white border-white scale-110 shadow-lg' : 'bg-white/40 hover:bg-white/80'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-[14px] italic text-[#1c2f54] mb-2 font-serif tracking-wide">About Us</h4>
            <h2 className="text-[32px] md:text-[38px] font-sans text-[#1c2f54] mb-4 font-extrabold tracking-tight">M.S. OCHIENG LAW FIRM.</h2>
            <p className="text-[#444] max-w-[900px] mx-auto text-[15px] leading-[1.8] font-medium mb-8">
              Welcome to M.S. OCHIENG LAW FIRM, a Law Firm in Nairobi, KENYA where innovative legal strategies <br className="hidden md:block"/>
              meets relentless commitment. We're not just another law firm—we're passionate advocates, trusted advisors, and <br className="hidden md:block"/>
              your dedicated partners in the journey toward your success.
            </p>
            <Link href="/about-us">
              <button className="bg-[#1c2f54] text-white rounded-[30px] px-8 py-3.5 font-extrabold text-[12px] tracking-widest uppercase hover:bg-[#111c33] transition-colors shadow-sm">
                KNOW MORE
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-8 bg-gray-50 border-b-4 border-[#1c2f54] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 text-[#b42025] shadow-sm">
                <Compass size={32} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-sans text-[#1c2f54] mb-4 font-bold uppercase">Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                To be a leading and all round legal firm providing cutting edge solutions in the constantly evolving legal landscape.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 border-b-4 border-[#b42025] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
              <div className="w-16 h-16 mx-auto bg-[#b42025] rounded-full flex items-center justify-center mb-6 text-white shadow-sm">
                <Target size={32} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-sans text-[#1c2f54] mb-4 font-bold uppercase">Mission</h3>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                To provide our clientele with innovative and excellent legal representation and solutions with an eye on results.
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 border-b-4 border-[#1c2f54] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 text-[#b42025] shadow-sm">
                <Shield size={32} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-sans text-[#1c2f54] mb-4 font-bold uppercase">Core Values</h3>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                Integrity, Excellence, and Innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Carousel Section */}
      <section id="expertise-section" className="py-24 bg-[#1c2f54] text-white overflow-hidden relative border-t border-white/5">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="flex flex-col mb-16">
            {/* Legal Excellence Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Legal Excellence
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif-heading mb-8 leading-[0.9] tracking-tight translate-x-[-4px] whitespace-nowrap">
                  PRACTICE <span className="text-[#cc2027]">AREAS.</span>
                </h2>
                <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed max-w-xl font-light tracking-wide">
                  Eight domains of preeminent legal advisory, each crafted with the structural precision and strategic foresight that defines the M.S. Ochieng standard.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button onClick={scrollPrevExpertise} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#cc2027] hover:border-[#cc2027] transition-all duration-300">
                  <ChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <button onClick={scrollNextExpertise} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#cc2027] hover:border-[#cc2027] transition-all duration-300">
                  <ChevronRight size={24} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap gap-x-16 gap-y-8">
              <div className="flex flex-col">
                <span className="text-4xl font-serif-heading text-[#cc2027] mb-1">08</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Practice Areas</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif-heading text-[#cc2027] mb-1">15+</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Jurisdictions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif-heading text-[#cc2027] mb-1">99%</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Client Retention</span>
              </div>
            </div>
          </div>

          <div className="embla overflow-hidden" ref={expertiseRef}>
            <div className="embla__container flex">
              {expertiseAreas.map((area, idx) => (
                <div key={idx} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] pl-6">
                    <div className="relative h-[450px] group cursor-pointer overflow-hidden rounded-sm border border-white/5 bg-white/5 backdrop-blur-sm">
                      <img src={area.img} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
                      
                      {/* Glassmorphic Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#1c2f54] via-[#1c2f54]/20 to-transparent group-hover:via-[#1c2f54]/40 transition-all duration-700"></div>
                      
                      {/* Icon Bubble */}
                      <div className="absolute top-8 left-8 w-14 h-14 bg-[#cc2027] text-white flex items-center justify-center rounded-sm shadow-2xl transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <area.icon size={24} strokeWidth={1.5} />
                      </div>

                      <div className="absolute bottom-8 left-8 right-8 z-20">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-6 bg-[#cc2027]" />
                            <span className="text-[#cc2027] font-sans font-bold tracking-[0.2em] uppercase text-[10px]">
                              Expertise {String(idx + 1).padStart(2, '0')}
                            </span>
                         </div>
                         <h3 className="text-2xl font-serif-heading mb-6 group-hover:text-[#cc2027] transition-colors leading-tight">{area.title}</h3>
                         <Link href="/practice" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] gap-3 text-white/50 hover:text-white transition-all">
                            Explore Area <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                         </Link>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Latest Insights Section */}
      <section id="blog-section" className="py-32 bg-[#1c2f54] text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="flex flex-col mb-16">
            {/* Legal Excellence Label for Blog */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Legal Excellence
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif-heading mb-8 leading-[0.9] tracking-tight translate-x-[-4px] whitespace-nowrap overflow-visible">
                  LATEST <span className="text-[#cc2027]">INSIGHTS.</span>
                </h2>
                <p className="text-white/80 font-sans text-lg md:text-xl leading-relaxed max-w-xl font-light tracking-wide">
                  Strategic perspectives and legal thought leadership directly from our front-line advocates and advisors.
                </p>
              </div>
              
              <Link href="/blog">
                <button className="flex items-center gap-4 text-white/60 hover:text-white transition-colors py-4 group cursor-pointer">
                  <span className="font-bold tracking-widest uppercase text-xs">View All Insights</span>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#cc2027] group-hover:border-[#cc2027] transition-all">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, idx) => (
              <Link key={idx} href={post.link}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col md:flex-row bg-[#152340] border border-white/5 rounded-none overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-white/20 h-full cursor-pointer"
                >
                   <div className="w-full md:w-[40%] h-[240px] md:h-auto shrink-0 relative overflow-hidden">
                     <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-[#1c2f54]/20 group-hover:bg-transparent transition-colors"></div>
                   </div>
                   <div className="w-full md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
                     <div className="text-[#cc2027] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{post.category}</div>
                     <h3 className="text-xl md:text-2xl font-serif-heading text-white leading-tight mb-6 group-hover:text-[#cc2027] transition-colors line-clamp-2 italic">{post.title}</h3>
                     <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                       Read Insight <ArrowRight size={14} className="ml-2" />
                     </div>
                   </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exact Match CTA Section with Overlap Effect */}
      <section className="relative w-full overflow-hidden">
        {/* Split Background to create overlap illusion */}
        <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
          <div className="h-1/2 bg-gray-50"></div>
          <div className="h-1/2 bg-[#1c2f54]"></div>
        </div>
        
        <div className="relative px-6 py-12 md:py-20 flex justify-center z-20">
          <div className="w-full max-w-[1200px] flex flex-col md:flex-row shadow-2xl bg-white min-h-[400px] rounded-sm overflow-hidden">
            {/* Left side: Full-bleed image */}
            <div className="w-full md:w-1/2 min-h-[350px] bg-gray-100">
               <img 
                 src="/cta-law.png" 
                 alt="Digital Law Gavel" 
                 className="w-full h-full object-cover" 
               />
            </div>
            
            {/* Right side: Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center bg-[#f8f9fa] p-10 md:p-16 relative">
              <h2 className="text-[36px] md:text-[46px] font-extrabold mb-8 text-black leading-[1.1] font-sans tracking-tight max-w-[400px]">
                SPEAK WITH OUR EXPERTS TODAY!
              </h2>
              <div>
                <Link href="/contact-us">
                  <button className="bg-[#b42025] text-white rounded-full px-8 py-3.5 font-bold text-[14px] hover:bg-red-800 transition-colors shadow-lg hover:shadow-xl inline-block mt-2">
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
