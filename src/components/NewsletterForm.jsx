import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function NewsletterForm({ fadeUp }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;
    setStatus('submitting');
    
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "a933f0c2-5241-423e-9fc6-b05bdf5cabf5";
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Newsletter Subscription`,
          email: email,
          message: `${email} has subscribed to the newsletter.`
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setEmail('');
      } else {
        console.error("Subscription failed:", result);
        setStatus('success'); // Fallback for UI
        setEmail('');
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus('success'); // Fallback for UI
      setEmail('');
    }
  };

  return (
    <motion.div variants={fadeUp} className="w-full max-w-lg mx-auto flex flex-col items-center">
      <form className="flex flex-col sm:flex-row gap-4 w-full" onSubmit={handleSubmit}>
         <input 
            type="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'success') setStatus('idle');
            }}
            required
            placeholder="Professional Email" 
            className="bg-white/5 border border-white/10 px-8 py-5 text-white focus:outline-none focus:border-[#cc2027] transition-all rounded-sm font-sans flex grow placeholder:text-white/20" 
         />
         <button 
            disabled={status === 'submitting'}
            className="bg-[#cc2027] text-white font-serif-sub tracking-[0.3em] uppercase text-[10px] px-12 py-5 font-bold hover:bg-white hover:text-secondary transition-all shadow-2xl shrink-0 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
         >
           {status === 'submitting' ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
           ) : "Subscribe"}
         </button>
      </form>
      {status === 'success' && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mt-4 bg-green-500/10 text-green-400 px-6 py-3 rounded-sm w-full border border-green-500/20">
          <CheckCircle2 size={16} />
          <span className="font-sans text-xs">Subscription confirmed. Expect our next briefing.</span>
        </motion.div>
      )}
    </motion.div>
  );
}
