import { useState, useEffect } from "react";
import { saveBlogPost, getBlogPosts, updateBlogPost, deleteBlogPost } from "@/lib/blogData";
import { triggerLiveEvent } from "@/lib/pusher";
import { CheckCircle2, ShieldAlert, Edit, Trash2, PlusCircle, LayoutDashboard, LogOut, FileText, Users, MessageSquare, Settings, Activity, ArrowUpRight, TrendingUp, Mail, X } from "lucide-react";
import { Link } from "wouter";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import BrandMark from "@/components/BrandMark";

const categories = [
  "Conveyancing & Property", 
  "Commercial & Corporate Law", 
  "Immigration",
  "Family & Children",
  "Civil & Criminal Litigation",
  "ADR & Strategic Negotiation",
  "IP, Tech & Data Privacy",
  "Employment & Labor Law",
  "Taxation Law",
  "Media & Entertainment",
  "Legacy Planning"
];

const SidebarButton = ({ icon: Icon, label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${active ? 'bg-[#cc2027] text-white shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </div>
    {badge && (
      <span className="bg-[#cc2027] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{badge}</span>
    )}
  </button>
);

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [localPosts, setLocalPosts] = useState([]);
  const [localConsultations, setLocalConsultations] = useState([]);
  const [localSubscribers, setLocalSubscribers] = useState([]);
  const [localClients, setLocalClients] = useState([]);
  const [localVisitors, setLocalVisitors] = useState(0);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', organization: '', email: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);
  const [view, setView] = useState("overview"); // overview, editor, manage

  useEffect(() => {
    const savedUser = localStorage.getItem('admin_username');
    if (!savedUser) {
      setIsFirstTime(true);
    }
    const localOnly = JSON.parse(localStorage.getItem('mso_blogs') || '[]');
    setLocalPosts(localOnly);

    const localConsults = JSON.parse(localStorage.getItem('mso_consultations') || '[]');
    setLocalConsultations(localConsults);

    const localSubs = JSON.parse(localStorage.getItem('mso_subscribers') || '[]');
    setLocalSubscribers(localSubs);

    const localCls = JSON.parse(localStorage.getItem('mso_clients') || '[]');
    setLocalClients(localCls);

    const visitors = parseInt(localStorage.getItem('mso_visitors') || '0', 10);
    setLocalVisitors(visitors);
  }, []);

  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    title: "",
    snippet: "",
    content: "",
    image: "",
    author: "Martina Stacy Achieng",
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
      author: "Martina Stacy Achieng",
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

  const handleLogout = () => {
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_password');
    window.location.reload();
  };

  const handleGoogleLogin = () => {
    // Mocking OAuth flow
    localStorage.setItem('admin_username', 'martina@msochienglaw.co.ke');
    localStorage.setItem('admin_password', 'google-oauth-mock');
    setIsAuthenticated(true);
    setLoginError('');
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const newClientData = {
      id: Math.random().toString(36).substr(2, 9),
      ...newClient
    };
    const updatedClients = [newClientData, ...localClients];
    setLocalClients(updatedClients);
    localStorage.setItem('mso_clients', JSON.stringify(updatedClients));
    setIsAddClientModalOpen(false);
    setNewClient({ name: '', organization: '', email: '', status: 'Active' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Brand Pattern Background */}
        <div className="absolute inset-0 bg-[#1c2f54] pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#cc2027]/20 to-transparent" />
        </div>
        
        <div className="bg-white p-8 md:p-12 shadow-2xl rounded-2xl border border-gray-100 w-full max-w-md relative z-10 flex flex-col items-center">
          <div className="mb-8 w-full flex justify-center">
             <BrandMark variant="black" size="medium" />
          </div>
          
          <div className="flex flex-col items-center mb-8 w-full border-t border-gray-100 pt-6">
            <h2 className="font-serif-heading text-xl text-[#1c2f54] font-bold uppercase text-center tracking-wider">
              {isFirstTime ? "System Initialization" : "Secure Portal"}
            </h2>
            <p className="font-sans text-gray-400 text-xs mt-2 text-center font-medium">
              {isFirstTime ? "Create root administrator credentials" : "Authorized Personnel Only"}
            </p>
          </div>
          
          {loginError && (
            <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg text-xs text-center mb-6 border border-red-100 font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold">
                {isFirstTime ? "Choose Username (Email)" : "Username"}
              </label>
              <input required type="text" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] focus:ring-1 focus:ring-[#cc2027] transition-all font-sans bg-gray-50 focus:bg-white" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold">
                {isFirstTime ? "Choose Password" : "Password"}
              </label>
              <input required type="password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#cc2027] focus:ring-1 focus:ring-[#cc2027] transition-all font-sans bg-gray-50 focus:bg-white" />
            </div>
            <button type="submit" className="bg-[#cc2027] text-white font-sans tracking-widest uppercase text-xs px-10 py-4 rounded-lg font-bold hover:bg-[#1c2f54] transition-all w-full mt-4 shadow-lg shadow-[#cc2027]/20">
              {isFirstTime ? "Initialize System" : "Authenticate"}
            </button>
            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-400 uppercase tracking-widest font-bold">Or</span></div>
            </div>
            <button type="button" onClick={handleGoogleLogin} className="w-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all font-sans tracking-widest uppercase text-xs px-10 py-4 rounded-lg font-bold flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <Link href="/" className="mt-8 text-xs text-gray-400 hover:text-[#cc2027] font-medium transition-colors">
            &larr; Return to Main Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans overflow-hidden">
      {/* Modern Sidebar */}
      <aside className="w-[280px] bg-[#1c2f54] text-white flex flex-col shrink-0 shadow-2xl relative z-20">
        <div className="p-8 border-b border-white/10 flex items-center justify-center bg-black/10">
          <BrandMark variant="gold" size="small" />
        </div>
        
        <div className="p-4 py-8 flex-1 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4 px-4">Management</p>
          <nav className="space-y-1.5">
            <SidebarButton icon={LayoutDashboard} label="Dashboard Overview" active={view === 'overview'} onClick={() => setView('overview')} />
            <SidebarButton icon={FileText} label="Article Editor" active={view === 'editor'} onClick={() => {resetForm(); setView('editor');}} />
            <SidebarButton icon={Activity} label="Manage Content" active={view === 'manage'} onClick={() => setView('manage')} />
          </nav>

          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-10 mb-4 px-4">Client Relations</p>
          <nav className="space-y-1.5">
            <SidebarButton icon={MessageSquare} label="Consultation Requests" active={view === 'consultations'} badge={localConsultations.length || null} onClick={() => setView('consultations')} />
            <SidebarButton icon={Users} label="Client Directory" active={view === 'clients'} onClick={() => setView('clients')} />
            <SidebarButton icon={Mail} label="Newsletter Subs" active={view === 'subscribers'} badge={localSubscribers.length || null} onClick={() => setView('subscribers')} />
          </nav>

          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-10 mb-4 px-4">System</p>
          <nav className="space-y-1.5">
            <SidebarButton icon={Settings} label="Global Settings" active={view === 'settings'} onClick={() => setView('settings')} />
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <LogOut size={18} />
            <span className="font-bold">End Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-[80px] bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0 shadow-sm">
          <div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#1c2f54]">
              {view === 'overview' && 'Dashboard Overview'}
              {view === 'editor' && (editingId ? 'Edit Article' : 'Compose Article')}
              {view === 'manage' && 'Content Management'}
              {view === 'consultations' && 'Consultation Requests'}
              {view === 'subscribers' && 'Newsletter Subscribers'}
              {view === 'clients' && 'Client Directory'}
              {view === 'settings' && 'Global Settings'}
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">M.S. Ochieng Legal Administration Portal</p>
          </div>
          
          <div className="flex items-center gap-5">
            <Link href="/" className="text-sm font-bold text-[#cc2027] hover:text-[#1c2f54] transition-colors flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              View Live Site <ArrowUpRight size={14} />
            </Link>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#1c2f54]">Martina Stacy Achieng</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Principal Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1c2f54] flex items-center justify-center text-white font-serif font-bold shadow-md ring-2 ring-[#cc2027]/20">MA</div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          
          {/* VIEW: OVERVIEW */}
          {view === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><FileText size={24} /></div>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12} /> +2</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localPosts.length}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Published Articles</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#cc2027] flex items-center justify-center"><MessageSquare size={24} /></div>
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Pending</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localConsultations.length}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Consultation Requests</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><Users size={24} /></div>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12} /> +12%</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localVisitors}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Unique Visitors</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><ShieldAlert size={24} /></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">10</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Active Practice Domains</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-serif-heading font-bold text-lg text-[#1c2f54]">Recent Articles</h3>
                  <button onClick={() => setView('manage')} className="text-xs font-bold text-[#cc2027] hover:underline">View All</button>
                </div>
                <div className="p-0">
                  {localPosts.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <tbody className="font-sans text-sm">
                        {localPosts.slice(0, 5).map((post) => (
                          <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0">
                            <td className="py-4 px-6 text-gray-400 text-xs font-medium whitespace-nowrap">{post.date}</td>
                            <td className="py-4 px-6 font-bold text-[#1c2f54] w-full">{post.title}</td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#cc2027] bg-[#cc2027]/10 px-3 py-1 rounded-full">
                                {post.category}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-gray-400 text-sm font-medium">No recent articles found.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: EDITOR */}
          {view === 'editor' && (
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Editor Form */}
              <div className="flex-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6 flex items-center gap-4">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <p className="font-sans font-medium text-xs">Article successfully {editingId ? 'updated' : 'published'}!</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Article Title</label>
                    <input required name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" placeholder="e.g. Navigating Real Estate Law in Kenya" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Author Name</label>
                      <input required name="author" value={formData.author} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Cover Image URL</label>
                    <input name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" placeholder="https://images.unsplash.com/..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Short Snippet (for cards)</label>
                    <textarea required name="snippet" value={formData.snippet} onChange={handleChange} rows="2" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white resize-none" placeholder="A brief summary to entice readers..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Tags / Sectors</label>
                    <input name="sectors" value={formData.sectors} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" placeholder="e.g. Real Estate, Business, Corporate" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Full Content</label>
                    <div className="quill-container rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-[#cc2027]/20 focus-within:border-[#cc2027] transition-all">
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
                        className="font-sans min-h-[400px] bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={status === 'submitting'} className="flex-1 bg-[#1c2f54] text-white font-sans tracking-widest uppercase text-xs px-8 py-4 rounded-xl font-bold hover:bg-[#cc2027] transition-all shadow-lg flex items-center justify-center gap-2">
                      {status === 'submitting' ? "Processing..." : (editingId ? "Update Article" : "Publish Article")}
                    </button>
                    {editingId && (
                      <button type="button" onClick={resetForm} className="px-8 py-4 rounded-xl border border-gray-200 text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Live Preview */}
              <div className="flex-1 xl:max-w-md sticky top-10 h-fit">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">Live Preview</h3>
                  </div>
                  
                  <div className="p-6 md:p-8 max-h-[800px] overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#cc2027] bg-[#cc2027]/10 px-3 py-1.5 rounded-full">
                        {formData.category || "Category"}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="font-serif-heading text-3xl font-bold text-[#1c2f54] leading-tight mb-6">
                      {formData.title || "Your amazing article title goes right here"}
                    </h2>

                    <div className="w-full aspect-video bg-gray-100 mb-8 rounded-xl overflow-hidden relative group">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                          <span className="text-[10px] font-bold uppercase tracking-widest">Image Preview</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <p className="font-sans text-sm font-bold text-[#1c2f54] leading-relaxed border-l-4 border-[#cc2027] pl-4">
                        {formData.snippet || "This is where your engaging short snippet will appear. It acts as a hook for the reader."}
                      </p>
                      <div 
                        className="font-sans text-sm text-gray-600 leading-loose prose prose-sm max-w-none prose-headings:font-serif-heading prose-headings:text-[#1c2f54] prose-a:text-[#cc2027]"
                        dangerouslySetInnerHTML={{ __html: formData.content || "<p>Start writing your article content in the editor to see it beautifully formatted here.</p>" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: MANAGE */}
          {view === 'manage' && (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Content Library</h2>
                    <p className="text-sm text-gray-400 mt-1">{localPosts.length} published articles</p>
                  </div>
                  <button onClick={() => {resetForm(); setView('editor');}} className="bg-[#1c2f54] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center gap-2">
                    <PlusCircle size={16} /> New Article
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Date</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Title</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Category</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-sm">
                      {localPosts.length > 0 ? localPosts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-8 text-gray-500 font-medium whitespace-nowrap">{post.date}</td>
                          <td className="py-5 px-8 font-bold text-[#1c2f54] w-full">{post.title}</td>
                          <td className="py-5 px-8 whitespace-nowrap">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1c2f54] bg-[#1c2f54]/5 border border-[#1c2f54]/10 px-3 py-1.5 rounded-full">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(post)}
                                className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                                title="Edit Article"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(post.id)}
                                className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                                title="Delete Article"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <FileText size={48} className="mb-4 opacity-20" />
                              <p className="text-lg font-bold text-gray-500 mb-2">No articles found</p>
                              <p className="text-sm">Start building your content library by creating a new article.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: CONSULTATIONS */}
          {view === 'consultations' && (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Consultation Requests</h2>
                    <p className="text-sm text-gray-400 mt-1">Review and manage client inquiries</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Date</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Client</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Service Requested</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Summary</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-sm">
                      {localConsultations.length > 0 ? localConsultations.map((c) => (
                        <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-8 text-gray-500 font-medium whitespace-nowrap">{c.date}</td>
                          <td className="py-5 px-8">
                            <div className="font-bold text-[#1c2f54]">{c.name}</div>
                            <div className="text-xs text-gray-400">{c.email}</div>
                          </td>
                          <td className="py-5 px-8 font-medium text-gray-700">{c.service}</td>
                          <td className="py-5 px-8 text-xs text-gray-500 max-w-xs truncate" title={c.summary}>{c.summary}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <MessageSquare size={48} className="mb-4 opacity-20" />
                              <p className="text-lg font-bold text-gray-500 mb-2">No consultations found</p>
                              <p className="text-sm">When clients submit the form, they will appear here.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SUBSCRIBERS */}
          {view === 'subscribers' && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Newsletter Subscribers</h2>
                    <p className="text-sm text-gray-400 mt-1">Export or manage your email list</p>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-blue-600 border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all" onClick={() => alert('Exporting to CSV...')}>
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Date Subscribed</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Email Address</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-sm">
                      {localSubscribers.length > 0 ? localSubscribers.map((s) => (
                        <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-8 text-gray-500 font-medium whitespace-nowrap">{s.date}</td>
                          <td className="py-5 px-8 font-bold text-[#1c2f54]">{s.email}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="2" className="py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <Mail size={48} className="mb-4 opacity-20" />
                              <p className="text-lg font-bold text-gray-500 mb-2">No subscribers yet</p>
                              <p className="text-sm">Newsletter subscriptions will appear here.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: CLIENTS */}
          {view === 'clients' && (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Client Directory</h2>
                    <p className="text-sm text-gray-400 mt-1">Manage client records and profiles</p>
                  </div>
                  <button className="bg-[#1c2f54] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center gap-2" onClick={() => setIsAddClientModalOpen(true)}>
                    <PlusCircle size={16} /> Add Client
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Client Name</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Organization</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Email</th>
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-sm">
                      {localClients.length > 0 ? localClients.map((client) => (
                        <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-5 px-8 font-bold text-[#1c2f54]">{client.name}</td>
                          <td className="py-5 px-8 text-gray-600">{client.organization}</td>
                          <td className="py-5 px-8 text-gray-500">{client.email}</td>
                          <td className="py-5 px-8 text-right">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${client.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                              {client.status}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="py-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <Users size={48} className="mb-4 opacity-20" />
                              <p className="text-lg font-bold text-gray-500 mb-2">No clients found</p>
                              <p className="text-sm">Start building your directory by adding a client.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS */}
          {view === 'settings' && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Global Settings</h2>
                    <p className="text-sm text-gray-400 mt-1">Configure system parameters and credentials</p>
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif-heading text-lg font-bold text-[#1c2f54] border-b border-gray-100 pb-2">Admin Credentials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Username / Email</label>
                        <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50" defaultValue={localStorage.getItem('admin_username') || ''} readOnly />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-serif-heading text-lg font-bold text-[#1c2f54] border-b border-gray-100 pb-2">Firm Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Default Language</label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50">
                          <option>English</option>
                          <option>French</option>
                          <option>Swahili</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Email</label>
                        <input type="email" defaultValue="info@msochienglaw.co.ke" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="bg-[#cc2027] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#1c2f54] transition-all" onClick={() => alert('Settings saved successfully!')}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 bg-[#1c2f54]/90 z-50 flex flex-col justify-center items-center backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-gray-100">
            <button onClick={() => setIsAddClientModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#cc2027] transition-colors">
              <X size={24} />
            </button>
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-serif-heading text-2xl font-bold text-[#1c2f54]">Add New Client</h2>
              <p className="text-sm text-gray-500 mt-1">Enter the client details below.</p>
            </div>
            <form onSubmit={handleAddClient} className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Client Name</label>
                <input required type="text" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" placeholder="e.g. Alexander Hamilton" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Organization (Optional)</label>
                <input type="text" value={newClient.organization} onChange={(e) => setNewClient({...newClient, organization: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" placeholder="e.g. Global Tech Inc." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input required type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white" placeholder="counsel@organization.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
                <select value={newClient.status} onChange={(e) => setNewClient({...newClient, status: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-[#1c2f54] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#cc2027]/10">
                  <PlusCircle size={16} /> Save Client Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .quill-container .ql-editor {
          min-height: 400px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: #374151;
        }
        .quill-container .ql-toolbar.ql-snow {
          border-bottom: 1px solid #f3f4f6;
          border-top: none;
          border-left: none;
          border-right: none;
          padding: 12px 16px;
          background: #f9fafb;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .quill-container .ql-container.ql-snow {
          border: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}
