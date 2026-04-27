import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Layout from '../components/Layout';
import SocialSidebar from '../components/SocialSidebar';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const teamMembers = [
  {
    id: 'msochieng',
    name: 'M.S. Ochieng',
    role: 'Principal Advocate',
    image: '/ms-ochieng.jpg',
    bio: (
      <>
        <p className="mb-4">M.S. Ochieng is the Principal Advocate and founder of M.S. Ochieng Legal. She has great experience in helping people and businesses with their legal needs. She is truly committed to doing her best for every client.</p>
        <p className="mb-4">Her goal is to provide clear and helpful advice. She works closely with clients to find the best solutions for their cases, whether they are personal or business matters.</p>
        <p className="mb-4">M.S. Ochieng holds a Bachelor of Laws (LL.B) Degree from Kisii University and a Post Graduate Diploma from the Kenya School of Law (KSL). She is a trusted lawyer for business owners and families across Kenya.</p>
      </>
    )
  }
];

export default function OurPeople() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Close modal on escape key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <Layout>
      <SocialSidebar />
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
                The Firm
              </span>
              <div className="h-px w-12 bg-[#cc2027]" />
            </div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-serif-heading mb-10 leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
              OUR <span className="text-[#cc2027]">PEOPLE.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-sans text-white/70 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Led by M.S. Ochieng, our firm is dedicated to the advancement of our clients' commercial and institutional mandates across the Republic.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-32 px-6 bg-[#fafafa] min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col items-center"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-full relative overflow-hidden rounded-sm bg-white shadow-xl border border-gray-100 aspect-3/4 mb-8">
                   <div className="absolute inset-0 bg-[#cc2027] opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
                   <img 
                     src={member.image} 
                     alt={member.name}
                     className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                     loading="lazy"
                   />
                </div>
                
                <h3 className="text-[#1c2f54] text-xl font-bold mb-1 text-center font-sans tracking-wide group-hover:text-[#cc2027] transition-colors">
                  {member.name}
                </h3>
                <h4 className="text-gray-400 text-[11px] uppercase tracking-[0.2em] font-bold text-center">
                  {member.role}
                </h4>
                
                <div className="mt-6 w-12 h-1 bg-[#cc2027] group-hover:w-20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox / Modal Overlay */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedMember(null)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className="relative w-full max-w-[650px] bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto overflow-x-hidden"
            >
               {/* Close Button */}
               <button 
                 onClick={() => setSelectedMember(null)}
                 className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow hover:bg-white text-gray-700 rounded-full transition-colors"
               >
                 <X size={18} />
               </button>

               {/* Top: Image */}
               <div className="w-full h-[400px] sm:h-[450px] bg-[#1c2f54] relative shrink-0">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="absolute inset-0 w-full h-full object-contain mb-0"
                  />
               </div>

               {/* Bottom: Bio Content */}
               <div className="w-full p-8 flex flex-col shrink-0 bg-white">
                  <h3 className="text-[22px] font-bold text-[#333] mb-1 font-sans">
                    {selectedMember.name}
                  </h3>
                  <h4 className="text-[#333] text-[15px] font-bold mb-6">
                    {selectedMember.role}
                  </h4>
                  <div className="text-[14px] leading-[1.8] text-[#555]">
                    {selectedMember.bio}
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </Layout>
  );
}
