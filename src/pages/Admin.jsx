import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { saveBlogPost } from "@/lib/blogData";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

const categories = [
  "Conveyancing & Property", 
  "Commercial Law", 
  "Immigration", 
  "Family Law", 
  "Litigation", 
  "ADR & Negotiation", 
  "IP & Data Privacy", 
  "Employment Law", 
  "Media & Entertainment",
  "Legacy Planning"
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('admin_username');
    if (!savedUser) {
      setIsFirstTime(true);
    }
  }, []);

  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    title: "",
    snippet: "",
    content: "",
    image: "",
    author: "M.S. Ochieng",
    category: categories[0],
    sectors: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const newPost = {
      id: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: formData.title,
      snippet: formData.snippet,
      content: formData.content,
      image: formData.image || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: formData.author,
      category: formData.category,
      sectors: formData.sectors.split(',').map(s => s.trim()).filter(Boolean)
    };

    saveBlogPost(newPost);
    
    setTimeout(() => {
      setStatus('success');
      setFormData({
        title: "",
        snippet: "",
        content: "",
        image: "",
        author: "M.S. Ochieng",
        category: categories[0],
        sectors: ""
      });
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFirstTime) {
      localStorage.setItem('admin_username', loginData.username);
      localStorage.setItem('admin_password', loginData.password);
      setIsFirstTime(false);
      setIsAuthenticated(true);
      setLoginError('');
      return;
    }

    const savedUser = localStorage.getItem('admin_username');
    const savedPass = localStorage.getItem('admin_password');

    if (loginData.username === savedUser && loginData.password === savedPass) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-secondary min-h-screen flex items-center justify-center">
           <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-[#cc2027] w-full max-w-md">
             <div className="flex flex-col items-center mb-8">
               <ShieldAlert className="text-[#cc2027] mb-4" size={40} />
               <h2 className="font-serif-heading text-2xl text-secondary font-bold uppercase text-center">
                 {isFirstTime ? "Set Up Account" : "Secure Portal"}
               </h2>
               <p className="font-sans text-foreground/50 text-xs mt-2 text-center">
                 {isFirstTime ? "Create your admin credentials" : "Authorized Personnel Only"}
               </p>
             </div>
             
             {loginError && (
               <div className="bg-red-50 text-red-600 p-3 rounded-sm text-xs text-center mb-6 border border-red-200">
                 {loginError}
               </div>
             )}

             <form onSubmit={handleLogin} className="space-y-4">
               <div className="flex flex-col gap-2">
                 <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">
                   {isFirstTime ? "Choose Username (Email)" : "Username"}
                 </label>
                 <input required type="text" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">
                   {isFirstTime ? "Choose Password" : "Password"}
                 </label>
                 <input required type="password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" />
               </div>
               <button type="submit" className="bg-[#cc2027] text-white font-serif-sub tracking-[0.3em] uppercase text-[10px] px-10 py-4 font-bold hover:bg-secondary transition-all w-full mt-6">
                 {isFirstTime ? "Create Account" : "Authenticate"}
               </button>
             </form>
           </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-secondary min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
            <ShieldAlert className="text-[#cc2027]" size={32} />
            <div>
              <h1 className="font-serif-heading text-3xl text-white font-bold uppercase tracking-tight">System Administration</h1>
              <p className="font-sans text-white/50 text-xs">Local Data Management Dashboard</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-[#cc2027]">
            <div className="flex justify-between items-center mb-10">
               <h2 className="font-serif-heading text-2xl text-secondary font-bold uppercase">Publish New Journal Entry</h2>
               <Link href="/blog" className="font-serif-sub tracking-[0.2em] uppercase text-[10px] text-[#cc2027] hover:text-secondary font-bold no-underline">
                  View Live Journal →
               </Link>
            </div>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-sm mb-8 flex items-center gap-4">
                <CheckCircle2 size={24} className="text-green-600" />
                <p className="font-sans font-medium text-sm">Journal entry successfully published to local storage.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Article Title</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" placeholder="e.g. New Regulations in Kenya" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Author</label>
                  <input required name="author" value={formData.author} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans bg-white">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Cover Image URL (Optional)</label>
                  <input name="image" value={formData.image} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" placeholder="https://..." />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Sectors (Comma separated)</label>
                <input name="sectors" value={formData.sectors} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" placeholder="e.g. Real Estate, Business, Tech" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Snippet (Short Summary)</label>
                <textarea required name="snippet" value={formData.snippet} onChange={handleChange} rows="2" className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans resize-none" placeholder="Brief summary for the blog card..." />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Full Content</label>
                <textarea required name="content" value={formData.content} onChange={handleChange} rows="10" className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans resize-none" placeholder="Write the full article content here..." />
              </div>

              <button type="submit" disabled={status === 'submitting'} className="bg-[#cc2027] text-white font-serif-sub tracking-[0.3em] uppercase text-[10px] px-10 py-4 font-bold hover:bg-secondary transition-all w-full flex justify-center mt-4">
                {status === 'submitting' ? "Processing..." : "Publish to Local Environment"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
