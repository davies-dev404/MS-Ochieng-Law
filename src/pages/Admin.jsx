import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { saveBlogPost, getBlogPosts, updateBlogPost, deleteBlogPost } from "@/lib/blogData";
import { triggerLiveEvent } from "@/lib/pusher";
import { CheckCircle2, ShieldAlert, Edit, Trash2, PlusCircle, LayoutDashboard } from "lucide-react";
import { Link } from "wouter";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

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
  const [localPosts, setLocalPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [view, setView] = useState("editor"); // "editor" or "manage"

  useEffect(() => {
    const savedUser = localStorage.getItem('admin_username');
    if (!savedUser) {
      setIsFirstTime(true);
    }
    // Load local posts for management
    const posts = getBlogPosts().filter(p => !p.id.includes('default')); // Filter if needed, or show all
    // Actually, getBlogPosts returns default ones too. Let's just show local ones in "Manage"
    const localOnly = JSON.parse(localStorage.getItem('mso_blogs') || '[]');
    setLocalPosts(localOnly);
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

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      snippet: "",
      content: "",
      image: "",
      author: "M.S. Ochieng",
      category: categories[0],
      sectors: ""
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    const postData = {
      id: editingId || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title: formData.title,
      snippet: formData.snippet,
      content: formData.content,
      image: formData.image || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: formData.author,
      category: formData.category,
      sectors: typeof formData.sectors === 'string' ? formData.sectors.split(',').map(s => s.trim()).filter(Boolean) : formData.sectors
    };

    if (editingId) {
      updateBlogPost(postData);
      triggerLiveEvent('blog-updated', { action: 'update', id: postData.id });
    } else {
      saveBlogPost(postData);
      triggerLiveEvent('blog-updated', { action: 'publish', id: postData.id });
    }
    
    // Refresh local list
    const localOnly = JSON.parse(localStorage.getItem('mso_blogs') || '[]');
    setLocalPosts(localOnly);

    setTimeout(() => {
      setStatus('success');
      resetForm();
      setTimeout(() => setStatus('idle'), 3000);
      if (editingId) setView("manage");
    }, 800);
  };

  const handleEdit = (post) => {
    setFormData({
      ...post,
      sectors: Array.isArray(post.sectors) ? post.sectors.join(', ') : post.sectors
    });
    setEditingId(post.id);
    setView("editor");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteBlogPost(id);
      const localOnly = JSON.parse(localStorage.getItem('mso_blogs') || '[]');
      setLocalPosts(localOnly);
    }
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
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <ShieldAlert className="text-[#cc2027]" size={32} />
              <div>
                <h1 className="font-serif-heading text-3xl text-white font-bold uppercase tracking-tight">System Administration</h1>
                <p className="font-sans text-white/50 text-xs">Local Data Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView("editor")}
                className={`flex items-center gap-2 font-serif-sub tracking-[0.2em] uppercase text-[10px] px-6 py-3 font-bold transition-all ${view === 'editor' ? 'bg-[#cc2027] text-white' : 'text-white/60 hover:text-white'}`}
              >
                <PlusCircle size={14} /> {editingId ? "Edit Mode" : "New Entry"}
              </button>
              <button 
                onClick={() => setView("manage")}
                className={`flex items-center gap-2 font-serif-sub tracking-[0.2em] uppercase text-[10px] px-6 py-3 font-bold transition-all ${view === 'manage' ? 'bg-[#cc2027] text-white' : 'text-white/60 hover:text-white'}`}
              >
                <LayoutDashboard size={14} /> Manage Posts ({localPosts.length})
              </button>
            </div>
          </div>

          {view === "editor" ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Editor Section */}
              <div className="flex-1 bg-white p-6 md:p-10 shadow-2xl rounded-sm border-t-4 border-[#cc2027]">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="font-serif-heading text-xl text-secondary font-bold uppercase">
                     {editingId ? `Editing: ${formData.title.substring(0, 20)}...` : "Article Editor"}
                   </h2>
                   {editingId && (
                     <button onClick={resetForm} className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#cc2027] font-bold">Cancel Edit</button>
                   )}
                </div>

                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-sm mb-6 flex items-center gap-4">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <p className="font-sans font-medium text-xs">Successfully updated local storage.</p>
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
                      <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Cover Image URL</label>
                      <input name="image" value={formData.image} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" placeholder="https://..." />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Snippet (Short Summary)</label>
                    <textarea required name="snippet" value={formData.snippet} onChange={handleChange} rows="2" className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans resize-none" placeholder="Brief summary for the blog card..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Sectors (Comma separated)</label>
                    <input name="sectors" value={formData.sectors} onChange={handleChange} className="border border-border px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] transition-all font-sans" placeholder="e.g. Real Estate, Business, Tech" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/60 font-bold">Full Content (Rich Text)</label>
                    <div className="quill-container">
                      <ReactQuill 
                        theme="snow"
                        value={formData.content}
                        onChange={handleEditorChange}
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link', 'clean'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }]
                          ],
                        }}
                        className="font-sans min-h-[300px]"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'submitting'} className="bg-[#cc2027] text-white font-serif-sub tracking-[0.3em] uppercase text-[10px] px-10 py-4 font-bold hover:bg-secondary transition-all w-full flex justify-center mt-4">
                    {status === 'submitting' ? "Processing..." : (editingId ? "Update Article" : "Publish Article")}
                  </button>
                </form>
              </div>

              {/* Live Preview Section */}
              <div className="flex-1 lg:max-w-[35%] bg-[#f8f8f8] p-6 md:p-10 shadow-inner rounded-sm border border-gray-200 h-fit sticky top-40">
                <div className="flex items-center gap-2 mb-8 text-[#cc2027]">
                  <div className="w-2 h-2 bg-[#cc2027] rounded-full animate-pulse" />
                  <h2 className="font-serif-heading text-xl font-bold uppercase tracking-wide">Live Preview</h2>
                </div>

                <div className="bg-white p-6 shadow-sm rounded-sm max-h-[600px] overflow-y-auto custom-scrollbar">
                  {/* Category & Date Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#cc2027] bg-[#cc2027]/10 px-2 py-1">
                      {formData.category || "Select Category"}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Title Preview */}
                  <h3 className="font-serif-heading text-xl font-bold text-[#1c2f54] leading-tight mb-4">
                    {formData.title || "Your Title"}
                  </h3>

                  {/* Image Preview */}
                  <div className="w-full h-32 bg-gray-100 mb-6 overflow-hidden relative">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] italic">Image Preview</div>
                    )}
                  </div>

                  {/* Content Preview */}
                  <div className="space-y-4">
                    <p className="font-sans text-xs font-bold text-[#1c2f54] leading-relaxed">
                      {formData.snippet || "Snippet summary..."}
                    </p>
                    <div className="w-12 h-0.5 bg-[#cc2027] mb-4" />
                    <div 
                      className="font-sans text-[11px] text-gray-600 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: formData.content || "<i>Content will appear here...</i>" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-[#cc2027]">
               <div className="flex justify-between items-center mb-10">
                  <h2 className="font-serif-heading text-2xl text-secondary font-bold uppercase">Manage Local Posts</h2>
                  <p className="text-xs text-gray-400">{localPosts.length} entries found in local storage</p>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-border">
                       <th className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/40 py-4 px-2">Date</th>
                       <th className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/40 py-4 px-2">Title</th>
                       <th className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/40 py-4 px-2">Category</th>
                       <th className="font-serif-sub uppercase text-[10px] tracking-widest text-secondary/40 py-4 px-2 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="font-sans text-sm">
                     {localPosts.length > 0 ? localPosts.map((post) => (
                       <tr key={post.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                         <td className="py-4 px-2 text-gray-500 whitespace-nowrap">{post.date}</td>
                         <td className="py-4 px-2 font-bold text-secondary">{post.title}</td>
                         <td className="py-4 px-2">
                           <span className="text-[9px] font-bold uppercase tracking-widest text-[#cc2027] bg-[#cc2027]/5 px-2 py-1 rounded-full">
                             {post.category}
                           </span>
                         </td>
                         <td className="py-4 px-2 text-right">
                           <div className="flex items-center justify-end gap-3">
                             <button 
                               onClick={() => handleEdit(post)}
                               className="p-2 text-secondary/40 hover:text-[#cc2027] transition-colors"
                               title="Edit Post"
                             >
                               <Edit size={16} />
                             </button>
                             <button 
                               onClick={() => handleDelete(post.id)}
                               className="p-2 text-secondary/40 hover:text-red-600 transition-colors"
                               title="Delete Post"
                             >
                               <Trash2 size={16} />
                             </button>
                           </div>
                         </td>
                       </tr>
                     )) : (
                       <tr>
                         <td colSpan="4" className="py-20 text-center text-gray-400 italic">No local posts found. Start by creating a new entry.</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .quill-container .ql-editor {
          min-height: 250px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }
        .quill-container .ql-toolbar.ql-snow {
          border-color: #e5e7eb;
          border-top: none;
          border-left: none;
          border-right: none;
          padding: 8px;
          background: #f9fafb;
        }
        .quill-container .ql-container.ql-snow {
          border: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cc2027; }
      `}</style>
    </Layout>
  );
}

