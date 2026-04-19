import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const AccordionItem = ({ title, isActive, onClick, children }) => {
  return (
    <div className="mb-px bg-white rounded-none overflow-hidden">
      <button
        type="button"
        className="w-full px-6 py-4 flex text-left bg-[#1c2f54] text-white transition-colors duration-300 hover:bg-[#152340]"
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
            <span className="font-bold text-xl leading-none w-4">{isActive ? '–' : '+'}</span>
            <span className="font-bold font-sans text-[13px] uppercase tracking-[0.15em] whitespace-nowrap">
              {title}
            </span>
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-8 px-2 text-gray-700 leading-relaxed font-medium text-[15px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: "Our Vision",
      content: <p>To be a leading full-service law firm in Kenya, providing cutting-edge legal solutions in an ever-evolving legal landscape.</p>
    },
    {
      title: "Our Mission",
      content: <p>To deliver reliable, client-focused, and innovative legal services that achieve real results while upholding the highest standards of professionalism and integrity.</p>
    },
    {
      title: "Our Core Values",
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>Integrity & Innovation.</li>
          <li>Substantive Excellence.</li>
          <li>Universal Accessibility.</li>
          <li>Relentless Advocacy.</li>
        </ul>
      )
    },
    {
      title: "Why choose the firm",
      content: (
         <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li><strong>Experienced Team:</strong> A cadre of dedicated legal professionals with deep industry knowledge.</li>
          <li><strong>Personalized Approach:</strong> Client-focused strategies tailored to unique institutional and personal mandates.</li>
          <li><strong>Regional Reputation:</strong> A strong standing in the Nairobi legal practice and across the Republic.</li>
          <li><strong>Results Oriented:</strong> Efficient, transparent, and driven by the pursuit of the winning outcome.</li>
          <li><strong>Local Expertise:</strong> A profound understanding of Kenyan law and the regional business environment.</li>
        </ul>
      )
    },
    {
      title: "Practice Domains",
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>Corporate & Commercial Law</li>
          <li>Family Law & Private Client</li>
          <li>Criminal Defense & White Collar</li>
          <li>Real Estate & Conveyancing</li>
          <li>Civil Litigation & Arbitration</li>
          <li>Contract Law & Structuring</li>
        </ul>
      )
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Legal Excellence
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              ABOUT <span className="text-[#cc2027]">US.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Founded on the pillars of integrity and innovation, M.S. Ochieng Law Firm stands as a preeminent legal partner for institutional and individual success in Nairobi.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-32 px-6 bg-white min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative w-full group">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 overflow-hidden shadow-2xl"
              >
                <img 
                  src="/ms-ochieng.jpg" 
                  alt="M.S. Ochieng Managing Partner" 
                  className="w-full h-auto object-cover rounded-sm transition-all duration-1000" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1505664173615-04b1cad311b5?q=80&w=2070&auto=format&fit=crop"
                  }}
                />
              </motion.div>
              {/* Decorative Red Bar */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-4 border-b-4 border-[#cc2027] -z-10" />
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                
                {/* Static Introduction */}
                <div className="mb-px bg-white rounded-none overflow-hidden">
                  <div className="w-full px-6 py-4 flex text-left bg-[#1c2f54] text-white">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-xl leading-none w-4">−</span>
                        <span className="font-bold font-sans text-[13px] uppercase tracking-[0.15em]">
                          Introduction
                        </span>
                    </div>
                  </div>
                  <div className="py-8 px-2 text-gray-700 leading-relaxed font-medium text-[15px] space-y-4">
                      <p>Welcome to <strong>M.S. OCHIENG LAW FIRM</strong>, a trusted and dynamic Nairobi-based law firm where innovative legal strategy meets unwavering commitment.</p>
                      <p>We are more than just legal practitioners—we are <strong>advocates, advisors, and partners</strong> committed to protecting your interests and advancing your success. Our firm is built on a desire to break the mold. We combine legal expertise, creativity, and efficiency to provide tailored solutions in every case we handle.</p>
                      <p>Whether you need representation in a complex legal dispute, guidance in business law, or support in personal legal matters, we deliver with precision and dedication. We proudly serve individuals, families, startups, and established businesses across Kenya, offering personalized legal services backed by deep industry knowledge and modern legal insights.</p>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  {sections.map((section, idx) => (
                    <AccordionItem 
                      key={idx}
                      title={section.title}
                      isActive={activeIndex === idx}
                      onClick={() => setActiveIndex(activeIndex === idx ? -1 : idx)}
                    >
                      {section.content}
                    </AccordionItem>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
