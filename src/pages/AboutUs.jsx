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
      content: <p>To be a leading and all round legal firm providing cutting edge solutions in the constantly evolving legal landscape.</p>
    },
    {
      title: "Our Mission",
      content: <p>To provide our clientele with innovative and excellent legal representation and solutions with an eye on results.</p>
    },
    {
      title: "Our Core Values",
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>Innovation.</li>
          <li>Integrity.</li>
          <li>Commitment.</li>
          <li>Excellence.</li>
        </ul>
      )
    },
    {
      title: "Why choose the firm",
      content: (
         <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li><strong>Experienced Team:</strong> A group of dedicated legal professionals with deep knowledge.</li>
          <li><strong>Personalized Approach:</strong> Strategies tailored to your unique needs.</li>
          <li><strong>Strong Reputation:</strong> Trusted in Kenya and by clients around the world.</li>
          <li><strong>Results Oriented:</strong> Focused on clear communication and the best outcomes.</li>
          <li><strong>Local Expertise:</strong> A deep understanding of Kenyan law.</li>
        </ul>
      )
    },
    {
      title: "Practice Domains",
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>Conveyancing, Property & Real Estate</li>
          <li>Commercial Law & Corporate Advisory</li>
          <li>Immigration & Global Mobility</li>
          <li>Family & Children</li>
          <li>Civil & Criminal Litigation</li>
          <li>ADR & Strategic Negotiation</li>
          <li>Intellectual Property & Data Privacy</li>
          <li>Employment & Labor Law</li>
          <li>Media & Entertainment Law</li>
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
                Integrity & Excellence
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              OUR <span className="text-[#cc2027]">STORY.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-lg md:text-xl font-light leading-relaxed tracking-wide">
              M.S. OCHIENG LEGAL is a modern law firm dedicated to your success. We provide clear advice and strong representation to protect your interests and help you achieve your goals. We bring innovation and integrity to every case, ensuring you move forward with confidence.
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
                      <p>Welcome to <strong>M.S. OCHIENG LEGAL</strong>, your trusted partner for clear and effective legal solutions. We are a modern law firm dedicated to helping individuals and businesses thrive by providing expert advice and strong representation.</p>
                      <p>Our approach is simple: we combine <strong>innovation with integrity</strong> to protect your interests and help you achieve your goals. Whether you are navigating a business deal, solving a family legal matter, or requiring courtroom advocacy, we stand by you with unwavering commitment.</p>
                      <p>We believe in building lasting relationships based on trust and results. At M.S. OCHIENG LEGAL, your success is our priority.</p>
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
