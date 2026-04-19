import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import SocialSidebar from '../components/SocialSidebar';

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
            <span className="font-bold font-sans text-[13px] uppercase tracking-[0.15em]">
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
            <div className="py-5 px-1 text-gray-700 leading-relaxed font-medium text-[15px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServiceCharter() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: "Billing",
      content: (
        <div>
          <h4 className="font-bold mb-2 text-[#1c2f54]">Legal Fees and Retainer Fees</h4>
          <p>Our legal fees and or retainer fee for all legal services is discussed and structured with each client and is based on the scope of services and the level of support required, tailored to meet your specific needs. The same is arrived at within the Advocates Remuneration Order, 2014.</p>
        </div>
      )
    },
    {
      title: "Service",
      content: (
        <div className="space-y-4">
          <p>We recognize the value of efficient, effective and quality services to our clients.</p>
          <p>In seeking to provide these services, we are guided by our core values that meet professional standards and client satisfaction.</p>
        </div>
      )
    },
    {
      title: "Action and Service Delivery Charter",
      content: (
        <ul className="list-disc pl-6 space-y-2 marker:text-[#cc2027]">
          <li>Answering telephone calls within seconds of ringing.</li>
          <li>Returning telephone calls within 1 hour of receipt.</li>
          <li>Acknowledging receipt of emails within 1 hour of receipt.</li>
          <li>Instructions within 24 hours of receipt.</li>
          <li>Replying to routine correspondences within 24 hours of receipt.</li>
          <li>Preparation of standard form documentation (e.g. leases) within two days of receipt of instructions.</li>
          <li>Attending to court and related matters within the duration given.</li>
          <li>Preparation and sharing of status reports with client every end of the month.</li>
        </ul>
      )
    },
    {
      title: "Technology",
      content: (
        <p>The firm is equipped with modern computers and efficient I.T systems. We have embraced the use of technology in our legal research, storage of documents, references, tracking client cases, email management among others. This enables us to be faster and effective in the provision of legal services to all our clients.</p>
      )
    }
  ];

  return (
    <Layout>
      <SocialSidebar />
      {/* Hero Section with Legal Excellence branding */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#1c2f54] text-white relative overflow-hidden text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-white/5 to-transparent pointer-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="max-w-4xl">
            {/* Legal Excellence Label */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#cc2027]" />
              <span className="text-[#cc2027] font-sans font-bold tracking-[0.3em] uppercase text-[11px]">
                Client Service
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              SERVICE <span className="text-[#cc2027]">CHARTER.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Our commitment to surgical precision, strategic responsiveness, and absolute transparency in every client engagement.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-32 px-6 bg-white min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Image Column - Technical Aesthetic */}
            <div className="lg:col-span-5 relative w-full">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Digital Infrastructure and Strategy" 
                  className="w-full h-auto object-cover rounded-sm" 
                />
                <div className="absolute inset-0 bg-[#1c2f54]/10" />
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
                <div className="flex flex-col space-y-1">
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
