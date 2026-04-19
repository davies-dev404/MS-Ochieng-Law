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
    role: 'Managing Partner',
    image: '/ms-ochieng.jpg',
    bio: (
      <>
        <p className="mb-4">M.S. Ochieng is the Managing Partner and visionary founder behind M.S OCHIENG LAW FIRM. With an extensive background in complex litigation, corporate structuring, and dispute resolution, he brings unparalleled expertise to the firm's diverse clientele.</p>
        <p className="mb-4">Driven by a relentless commitment to excellence, his strategic approach ensures that the firm offers more than just traditional counsel—acting as a dedicated legal partner for high-stakes decisions and long-term legal structuring.</p>
        <p className="mb-4">M.S. Ochieng holds specialized credentials and maintains a sterling reputation directly advising both emerging business leaders and established corporations on critical compliance, operational scaling, and family trust administration matters.</p>
      </>
    )
  },
  {
    id: 'phanice',
    name: 'Ms. Phanice A. Kwega',
    role: 'Senior partner',
    image: '/team-a-korir.png',
    bio: (
      <>
        <p className="mb-4">Ms. Phanice is the Senior partner at the firm with over 8 years’ experience in private practice having handled a broad range of transactions locally and internationally. Phanice has acted for a wide range of clients across the legal fields of practice</p>
        <p className="mb-4">She has a vast experience in litigation, legislative drafting, dispute resolution, conveyancing transactions, intellectual property and commercial transactions. She holds a Bachelor of Laws (LL.B) Degree from Moi University, a post-graduate diploma in Law from the Kenya School of Law and is currently undertaking her Master in Public Policy and Administration at Kenyatta University.</p>
        <p className="mb-4">Ms. Kwega has previously worked with Messr Triple K. Advocates LLP, Standard Chartered Bank Limited, Messr Onyango Ochieng Advocates and Messr Sing’oei Murkomen & Sigei Advocates where she has had an opportunity to acquire unique experience in litigation, legislative drafting and policy review and advising on employee relations, corporate financing, market options, legal compliance as well as corporate governance.</p>
      </>
    )
  },
  {
    id: 'nyakio',
    name: 'Ms. Nyakio Kuria',
    role: 'Senior partner',
    image: '/team-j-mwangi.png',
    bio: (
      <>
        <p className="mb-4">Ms. Nyakio is a Senior Partner, she has over 9 years post admission experience in private practice, legal research and human rights litigation.</p>
        <p className="mb-4">She has a vast experience in litigation, Legal research at the High Court of Kenya and policy analysis and review. She holds a Bachelor of Laws Degree from Moi University, a post-graduate diploma from the Kenya School of Law and is currently pursuing project management certification from Project Management Institute.</p>
        <p className="mb-4">Ms Nyakio has previously run and managed her litigation firm Nyakio Kuria & Co Advocates, worked as an associate lawyer at Kinyanjui and Njau Advocates and worked as a Legal Researcher at the Narok High Court and organizations where she acquired experience in Legal research and Drafting, active litigation before courts and tribunals, project management and report writing.</p>
      </>
    )
  },
  {
    id: 'esther',
    name: 'Ms. Esther Patrober',
    role: 'Advocate-associate',
    image: '/lawyer_amara.png',
    bio: (
      <>
        <p className="mb-4">Esther Patrober Is an Advocate-associate with the firm, she is also a Legal Researcher.</p>
        <p className="mb-4">She Holds a LL.B degree from Kenyatta University and Postgraduate Diploma from Kenya School of Law.</p>
        <p className="mb-4">Esther has experience in civil litigation, dispute resolution, Conveyancing, Employment and Labour Relations Disputes and the general law practice.</p>
        <p className="mb-4">Esther undertook her pupillage and holding over at the Office of the Attorney General and Department of Justice where she handled high profile matters in the Civil Litigation, Advocates Complaints Commission, Department of Justice, Government Transactions and National Legal Aid departments.</p>
      </>
    )
  },
  {
    id: 'hilda',
    name: 'Ms. Hilda Chepkoech Owino',
    role: 'Advocate-associate',
    image: '/lawyer_david.png',
    bio: (
      <>
        <p className="mb-4">Ms. Hilda is an Advocate of the High Court of Kenya and an Associate at P. A. Kwega & Co. Advocates. She holds a Post Graduate Diploma in Law from the Kenya School of Law and a Bachelor of Laws (LLB) from Jomo Kenyatta University of Agriculture and Technology. In addition, she brings a unique blend of legal and technological expertise, having earned a Bachelor of Business Information Technology (BBIT) from Strathmore University.</p>
        <p className="mb-4">Ms. Hilda's practice area focuses on General Litigation, Family Law, Estate Planning and Trusts, Employment and Labour Law, Insurance Law, ICT Law with focus on legal policies related to ICT, Conveyancing, Legal compliance as well as Constitutional and Administrative Law. Prior to joining the legal profession, she worked as a System Administrator in various organizations, an experience that enriches her legal practice—particularly in tech-related legal matters.</p>
        <p className="mb-4">With a strong foundation in both law and information technology, Ms.Hilda is committed to delivering innovative and practical legal solutions. She is passionate about using her skills not only to resolve legal challenges but also to serve the community and empower individuals through the law. Her dedication to client-centered advocacy and integrity forms the cornerstone of her practice.</p>
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
              An elite cadre of legal practitioners dedicated to the advancement of our clients' commercial and institutional mandates across the Republic.
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
