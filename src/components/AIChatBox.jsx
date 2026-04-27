import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';

const SYSTEM_PROMPT = `You are the official AI Legal Assistant for M.S. Ochieng Legal, a premier legal firm located in Suite 1421, Upper Hill Complex, Nairobi, Kenya. Your role is to assist website visitors with general legal information and guide them toward the firm's services.

ABOUT THE FIRM:
- Full name: M.S. OCHIENG LEGAL (also known as M.S. Ochieng Legal Consultants)
- Founder: Ms. M.S. Ochieng (Always refer to the founder as a woman / she / her)
- Location: Suite 1421, Upper Hill Complex, Nairobi, Kenya.
- Mission: To provide innovative, reliable, and committed legal solutions.
- Practice Areas (9): 
  1. Family & Children (Succession, Trusts, Custody, Compassionate approach)
  2. Real Estate (Conveyancing, Due Diligence, Property Law)
  3. Commercial Law (Business Formation, Advisory, Contracts)
  4. Immigration (Work Permits, Residency, Global Mobility)
  5. Civil & Criminal Litigation (Advocacy, Defense, Court Representation)
  6. ADR & Negotiation (Mediation, Dispute Resolution)
  7. IP & Data Privacy (Trademarks, Data Protection)
  8. Employment Law (Contracts, HR Policy)
  9. Media & Entertainment Law (Talent, Digital Rights)

CORE VALUES: Innovation, Integrity, Commitment, Excellence

BEHAVIOR RULES:
- Be professional, warm, and helpful
- Provide general legal information but ALWAYS include the disclaimer that this is not legal advice
- For specific legal matters, always recommend booking a consultation with the firm
- Keep responses concise (2-4 paragraphs max)
- When asked about fees/pricing, say the firm offers competitive rates and encourage contacting them directly
- For emergencies, direct them to call +254 791 857001 immediately
- You may discuss Kenyan law generally but never give specific legal advice
- If asked about matters outside the firm's practice areas, be honest and suggest appropriate alternatives
- Always end responses that involve legal matters with: "For personalized advice on your specific situation, I recommend scheduling a consultation with our advocates."
- Format responses in a clean, readable way`;

// Universal AI Configuration
const AI_CONFIG = {
  apiKey: import.meta.env.VITE_AI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY,
  baseUrl: import.meta.env.VITE_AI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai',
  model: import.meta.env.VITE_AI_MODEL || 'gemini-1.5-flash'
};

console.log('Chatbot initialized with model:', AI_CONFIG.model);

export default function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to M.S. Ochieng AI Legal Assistant. I can help you with general legal queries, information about our practice areas, or guide you to the right advocate. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    const apiKey = AI_CONFIG.apiKey;
    
    try {
      const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({
              role: m.role === 'bot' ? 'assistant' : 'user',
              content: m.text
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'bot', text }]);
    } catch (error) {
      console.error('AI API error:', error);
      const isKeyMissing = !apiKey || apiKey.length < 5;
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: `I'm experiencing a connectivity issue. Our team is standing by at +254 791 857001 for immediate help.\n\n[Diagnostic: ${error.message}${isKeyMissing ? ' | API Key MISSING' : ''}]` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-8 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100 pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-[#1c2f54] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#cc2027] rounded-full flex items-center justify-center text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">MS Ochieng AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Online • Powered by Gemini</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 flex flex-col">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#cc2027] text-white' : 'bg-gray-200 text-[#1c2f54]'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#1c2f54] text-white rounded-tr-none' : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] flex gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gray-200 text-[#1c2f54]">
                      <Bot size={14} />
                    </div>
                    <div className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 rounded-tl-none flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-[#cc2027]" />
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a legal question..."
                disabled={isLoading}
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#cc2027] transition-all disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#cc2027] text-white p-2.5 rounded-xl hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>

            {/* Disclaimer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <p className="text-[9px] text-gray-400 text-center leading-tight">
                AI responses are for general information only and do not constitute legal advice.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#1c2f54] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto"
      >
        <div className="absolute inset-0 rounded-full bg-[#1c2f54] animate-ping opacity-10 pointer-events-none" />
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-white text-[#1c2f54] px-4 py-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap font-bold text-sm">
            Talk to MS Ochieng AI
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
