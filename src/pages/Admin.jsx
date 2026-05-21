import { useState, useEffect } from "react";
import { triggerLiveEvent } from "@/lib/pusher";
import { CheckCircle2, ShieldAlert, Edit, Trash2, PlusCircle, LayoutDashboard, LogOut, FileText, Users, MessageSquare, Settings, Activity, ArrowUpRight, TrendingUp, Mail, X } from "lucide-react";
import { Link } from "wouter";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import BrandMark from "@/components/BrandMark";
import { supabase } from "@/lib/supabase";
import { db } from "@/lib/db";
import { emailService } from "@/lib/emailService";

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || 'martina@msochienglaw.co.ke,admin@msochienglaw.co.ke,info@msochienglaw.co.ke')
  .split(',')
  .map(email => email.trim().toLowerCase());

const isAdminEmail = (email) => {
  return email && ADMIN_EMAILS.includes(email.toLowerCase());
};

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

const SidebarButton = ({ icon: Icon, label, active, onClick, badge, collapsed }) => (
  <button 
    onClick={onClick}
    title={collapsed ? label : undefined}
    className={`relative w-full flex items-center ${collapsed ? 'justify-between md:justify-center px-4 py-3 md:py-3.5' : 'justify-between px-4 py-3'} rounded-lg transition-all ${active ? 'bg-[#cc2027] text-white shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className="shrink-0" />
      <span className={`font-bold text-sm tracking-wide text-left whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-300 ${collapsed ? 'block md:hidden' : 'block'}`}>{label}</span>
    </div>
    {badge && (
      collapsed ? (
        <>
          <span className="md:hidden bg-[#cc2027] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{badge}</span>
          <span className="hidden md:block absolute top-1.5 right-1.5 w-2 h-2 bg-[#cc2027] rounded-full ring-2 ring-[#1c2f54]" />
        </>
      ) : (
        <span className="bg-[#cc2027] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{badge}</span>
      )
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
  
  // Responsive sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mso_admin_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('mso_admin_sidebar_collapsed', next.toString());
      return next;
    });
  };
  
  // Consultation replies state
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyingStatus, setReplyingStatus] = useState("idle"); // idle | sending | success | failed

  useEffect(() => {
    // 1. Check Supabase active session
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          const email = session.user?.email;
          if (isAdminEmail(email)) {
            setIsAuthenticated(true);
          } else {
            setLoginError('Access Denied: You are not authorized to access this administration panel.');
            supabase.auth.signOut();
            setIsAuthenticated(false);
          }
        } else {
          setIsFirstTime(false); // Disable first-time registration setup flow
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          const email = session.user?.email;
          if (isAdminEmail(email)) {
            setIsAuthenticated(true);
          } else {
            setLoginError('Access Denied: You are not authorized to access this administration panel.');
            await supabase.auth.signOut();
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      });

      return () => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        }
      };
    } else {
      // Local session fallback
      const localLogged = localStorage.getItem('mso_admin_logged') === 'true';
      const savedUser = localStorage.getItem('admin_username');

      // Seed local storage with credentials if they do not exist
      if (!savedUser) {
        localStorage.setItem('admin_username', 'martina@msochienglaw.co.ke');
        localStorage.setItem('admin_password', import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || 'admin123');
      }

      if (localLogged) {
        const currentUser = localStorage.getItem('admin_username');
        if (isAdminEmail(currentUser)) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('mso_admin_logged');
        }
      } else {
        setIsFirstTime(false); // Disable first-time registration setup flow
      }
    }
  }, []);

  // Fetch data only after authentication transitions to true
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadDashboardData = async () => {
      try {
        const blogs = await db.getBlogs();
        setLocalPosts(blogs);

        const consults = await db.getConsultations();
        setLocalConsultations(consults);

        const subs = await db.getSubscribers();
        setLocalSubscribers(subs);

        const localCls = JSON.parse(localStorage.getItem('mso_clients') || '[]');
        setLocalClients(localCls);

        const visitorCount = await db.getUniqueVisitorsCount();
        setLocalVisitors(visitorCount);
      } catch (err) {
        console.error("Failed to load admin panel resources", err);
      }
    };

    loadDashboardData();
  }, [isAuthenticated]);

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

  const handleSubmit = async (e) => {
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

    try {
      if (editingId) {
        await db.updateBlog(postData);
        triggerLiveEvent('blog-updated', { action: 'update', id: postData.id });
      } else {
        await db.saveBlog(postData);
        triggerLiveEvent('blog-updated', { action: 'publish', id: postData.id });
        
        // Auto-email newsletter briefing notification to subscribers
        try {
          const subs = await db.getSubscribers();
          if (subs && subs.length > 0) {
            await emailService.sendNewBlogPostEmail(postData, subs);
          }
        } catch (mailErr) {
          console.error("Auto newsletter dispatch failed", mailErr);
        }
      }
      
      const blogs = await db.getBlogs();
      setLocalPosts(blogs);
      
      setStatus('success');
      resetForm();
      setTimeout(() => setStatus('idle'), 3000);
      if (editingId) setView("manage");
    } catch (err) {
      console.error("Blog submit error", err);
      setStatus('error');
    }
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await db.deleteBlog(id);
      const blogs = await db.getBlogs();
      setLocalPosts(blogs);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (supabase) {
      if (isFirstTime) {
        // Sign-up disabled for security reasons
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.username,
        password: loginData.password
      });

      if (error) {
        setLoginError(error.message);
      } else if (data && data.user) {
        const email = data.user.email;
        if (isAdminEmail(email)) {
          setIsAuthenticated(true);
        } else {
          setLoginError('Access Denied: You are not authorized to access this administration panel.');
          await supabase.auth.signOut();
          setIsAuthenticated(false);
        }
      }
    } else {
      // Local storage authentication
      const savedUser = localStorage.getItem('admin_username') || 'martina@msochienglaw.co.ke';
      const savedPass = localStorage.getItem('admin_password') || 'admin123';

      if (loginData.username.toLowerCase() === savedUser.toLowerCase() && loginData.password === savedPass) {
        if (isAdminEmail(loginData.username)) {
          localStorage.setItem('mso_admin_logged', 'true');
          setIsAuthenticated(true);
        } else {
          setLoginError('Access Denied: You are not authorized to access this administration panel.');
        }
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('mso_admin_logged');
    setIsAuthenticated(false);
    window.location.reload();
  };

  const handleGoogleLogin = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/admin'
        }
      });
      if (error) setLoginError(error.message);
    } else {
      localStorage.setItem('admin_username', 'martina@msochienglaw.co.ke');
      localStorage.setItem('mso_admin_logged', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      alert('Google Login Simulated (Local Mode - No Supabase keys detected)');
    }
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
      <div className="min-h-screen bg-[#0d1527] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#cc2027]/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#c5a059]/10 blur-3xl" />

        <div className="bg-[#121c33]/85 backdrop-blur-md p-8 md:p-12 shadow-2xl rounded-2xl border border-white/5 w-full max-w-md relative z-10 flex flex-col items-center">
          <div className="mb-6 w-full flex justify-center">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-300 block">
              <img src="/mso_logo_transparent.png" alt="M.S. Ochieng Legal Logo" className="h-28 object-contain" />
            </Link>
          </div>
          
          <div className="flex flex-col items-center mb-8 w-full border-t border-white/5 pt-6 text-center">
            <h2 className="font-serif-heading text-xl text-white font-bold uppercase tracking-wider">
              {isFirstTime ? "Create Admin Credentials" : "Administrative Gate"}
            </h2>
            <p className="font-sans text-gray-400 text-xs mt-2 font-medium">
              {isFirstTime ? "Configure your administrative login profile." : "Secure portal access. Authorized chambers personnel only."}
            </p>
          </div>
          
          {loginError && (
            <div className="w-full bg-[#cc2027]/10 text-[#ff4c54] p-3 rounded-lg text-xs text-center mb-6 border border-[#cc2027]/25 font-medium animate-pulse">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-sans uppercase text-[9px] tracking-widest text-gray-400 font-bold">
                Email Address
              </label>
              <input 
                required 
                type="email" 
                value={loginData.username} 
                onChange={e => setLoginData({...loginData, username: e.target.value})} 
                className="border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all font-sans bg-white/5 text-white" 
                placeholder="admin@msochienglaw.co.ke"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans uppercase text-[9px] tracking-widest text-gray-400 font-bold">
                Password
              </label>
              <input 
                required 
                type="password" 
                value={loginData.password} 
                onChange={e => setLoginData({...loginData, password: e.target.value})} 
                className="border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all font-sans bg-white/5 text-white" 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="bg-[#cc2027] text-white font-sans tracking-widest uppercase text-xs px-10 py-4 rounded-lg font-bold hover:bg-[#c5a059] transition-all w-full mt-4 shadow-lg shadow-[#cc2027]/20 cursor-pointer">
              {isFirstTime ? "Create Account" : "Access Chambers"}
            </button>
            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px]"><span className="bg-[#121c33] px-3 text-gray-500 uppercase tracking-widest font-bold">Single Sign-On</span></div>
            </div>
            <button type="button" onClick={handleGoogleLogin} className="w-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all font-sans tracking-widest uppercase text-xs px-10 py-4 rounded-lg font-bold flex items-center justify-center shadow-sm cursor-pointer">
              <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Auth
            </button>
          </form>

          <Link href="/" className="mt-8 text-xs text-gray-400 hover:text-[#c5a059] font-medium transition-colors">
            &larr; Return to Chambers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans overflow-hidden">
      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-[#1c2f54]/60 z-30 md:hidden backdrop-blur-xs" 
        />
      )}

      {/* Modern Sidebar */}
      <aside className={`fixed md:relative top-0 bottom-0 left-0 ${isSidebarCollapsed ? 'w-[280px] md:w-[80px]' : 'w-[280px] md:w-[280px]'} bg-[#1c2f54] text-white flex flex-col shrink-0 shadow-2xl z-40 transition-all duration-300 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className={`p-8 border-b border-white/10 flex items-center ${isSidebarCollapsed ? 'justify-between md:justify-center' : 'justify-between'} bg-black/10`}>
          <Link href="/" className="hidden md:block hover:opacity-80 transition-opacity duration-300">
            {isSidebarCollapsed ? (
              <BrandMark variant="gold" size="small" collapsed={true} />
            ) : (
              <img src="/mso_logo_transparent.png" alt="M.S. Ochieng Legal Logo" className="h-10 object-contain" />
            )}
          </Link>
          <Link href="/" className="md:hidden hover:opacity-80 transition-opacity duration-300">
            <img src="/mso_logo_transparent.png" alt="M.S. Ochieng Legal Logo" className="h-10 object-contain" />
          </Link>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden text-white/50 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 py-8 flex-1 overflow-y-auto">
          {isSidebarCollapsed ? (
            <>
              <hr className="hidden md:block border-white/10 my-6 mx-2" />
              <p className="md:hidden text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4 px-4">Management</p>
            </>
          ) : (
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4 px-4">Management</p>
          )}
          <nav className="space-y-1.5">
            <SidebarButton icon={LayoutDashboard} label="Dashboard Overview" active={view === 'overview'} collapsed={isSidebarCollapsed} onClick={() => { setView('overview'); setIsMobileSidebarOpen(false); }} />
            <SidebarButton icon={FileText} label="Article Editor" active={view === 'editor'} collapsed={isSidebarCollapsed} onClick={() => { resetForm(); setView('editor'); setIsMobileSidebarOpen(false); }} />
            <SidebarButton icon={Activity} label="Manage Content" active={view === 'manage'} collapsed={isSidebarCollapsed} onClick={() => { setView('manage'); setIsMobileSidebarOpen(false); }} />
          </nav>

          {isSidebarCollapsed ? (
            <>
              <hr className="hidden md:block border-white/10 my-6 mx-2" />
              <p className="md:hidden text-[10px] uppercase tracking-widest text-white/40 font-bold mt-10 mb-4 px-4">Client Relations</p>
            </>
          ) : (
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-10 mb-4 px-4">Client Relations</p>
          )}
          <nav className="space-y-1.5">
            <SidebarButton icon={MessageSquare} label="Consultation Requests" active={view === 'consultations'} badge={localConsultations.length || null} collapsed={isSidebarCollapsed} onClick={() => { setView('consultations'); setIsMobileSidebarOpen(false); }} />
            <SidebarButton icon={Users} label="Client Directory" active={view === 'clients'} collapsed={isSidebarCollapsed} onClick={() => { setView('clients'); setIsMobileSidebarOpen(false); }} />
            <SidebarButton icon={Mail} label="Newsletter Subs" active={view === 'subscribers'} badge={localSubscribers.length || null} collapsed={isSidebarCollapsed} onClick={() => { setView('subscribers'); setIsMobileSidebarOpen(false); }} />
          </nav>

          {isSidebarCollapsed ? (
            <>
              <hr className="hidden md:block border-white/10 my-6 mx-2" />
              <p className="md:hidden text-[10px] uppercase tracking-widest text-white/40 font-bold mt-10 mb-4 px-4">System</p>
            </>
          ) : (
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-10 mb-4 px-4">System</p>
          )}
          <nav className="space-y-1.5">
            <SidebarButton icon={Settings} label="Global Settings" active={view === 'settings'} collapsed={isSidebarCollapsed} onClick={() => { setView('settings'); setIsMobileSidebarOpen(false); }} />
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/10">
          <button 
            onClick={handleLogout} 
            title={isSidebarCollapsed ? "End Session" : undefined}
            className={`relative flex items-center ${isSidebarCollapsed ? 'justify-between md:justify-center px-4 py-3 md:py-3.5' : 'gap-3 px-4 py-3'} w-full text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all`}
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} className="shrink-0" />
              <span className={`font-bold transition-all duration-300 ${isSidebarCollapsed ? 'block md:hidden' : 'block'}`}>End Session</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-[80px] bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 md:hidden text-gray-500 hover:text-[#cc2027] focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Desktop Sidebar Collapse Toggle */}
            <button 
              onClick={toggleSidebar}
              className="hidden md:flex p-2 text-gray-500 hover:text-[#cc2027] hover:bg-gray-100 rounded-lg focus:outline-none transition-colors cursor-pointer mr-1"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                </svg>
              )}
            </button>

            <div>
              <h1 className="font-serif-heading text-lg md:text-2xl font-bold text-[#1c2f54]">
                {view === 'overview' && 'Dashboard Overview'}
                {view === 'editor' && (editingId ? 'Edit Article' : 'Compose Article')}
                {view === 'manage' && 'Content Management'}
                {view === 'consultations' && 'Consultation Requests'}
                {view === 'subscribers' && 'Newsletter Subscribers'}
                {view === 'clients' && 'Client Directory'}
                {view === 'settings' && 'Global Settings'}
              </h1>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium mt-0.5">M.S. Ochieng Legal Administration Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-5">
            <Link href="/" className="text-[10px] md:text-sm font-bold text-[#cc2027] hover:text-[#1c2f54] transition-colors flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg border border-gray-200">
              <span className="hidden sm:inline">View Live Site</span> &rarr;
            </Link>
            <div className="w-px h-8 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-[#1c2f54]">Martina Stacy Achieng</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Principal Admin</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1c2f54] flex items-center justify-center text-white font-serif font-bold shadow-md ring-2 ring-[#cc2027]/20">MA</div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative">
          
          {/* VIEW: OVERVIEW */}
          {view === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Stat Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><FileText size={24} /></div>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12} /> Live</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localPosts.length}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Published Articles</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#cc2027] flex items-center justify-center"><MessageSquare size={24} /></div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      {localConsultations.filter(c => c.status !== 'Replied').length} Pending
                    </span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localConsultations.length}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Consultation Requests</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center"><Users size={24} /></div>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full"><TrendingUp size={12} /> Active</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localVisitors}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Unique Visitors</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><Mail size={24} /></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-[#1c2f54]">{localSubscribers.length}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Email Subscribers</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-serif-heading font-bold text-lg text-[#1c2f54]">Recent Articles</h3>
                  <button onClick={() => setView('manage')} className="text-xs font-bold text-[#cc2027] hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  {localPosts.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <tbody className="font-sans text-sm">
                        {localPosts.slice(0, 5).map((post) => (
                          <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0">
                            <td className="py-4 px-6 text-gray-400 text-xs font-medium whitespace-nowrap">{post.date}</td>
                            <td className="py-4 px-6 font-bold text-[#1c2f54] w-full min-w-[200px]">{post.title}</td>
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
              <div className="flex-1 xl:flex-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6 flex items-center gap-4">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <p className="font-sans font-medium text-xs">Article successfully {editingId ? 'updated' : 'published'}!</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Article Title</label>
                    <input required name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" placeholder="e.g. Navigating Real Estate Law in Kenya" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Author Name</label>
                      <input required name="author" value={formData.author} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Cover Image URL</label>
                    <input name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" placeholder="https://images.unsplash.com/..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Short Snippet (for cards)</label>
                    <textarea required name="snippet" value={formData.snippet} onChange={handleChange} rows="2" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white resize-none text-gray-800" placeholder="A brief summary to entice readers..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Tags / Sectors</label>
                    <input name="sectors" value={formData.sectors} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" placeholder="e.g. Real Estate, Business, Corporate" />
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
                    <button type="submit" disabled={status === 'submitting'} className="flex-1 bg-[#1c2f54] text-white font-sans tracking-widest uppercase text-xs px-8 py-4 rounded-xl font-bold hover:bg-[#cc2027] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                      {status === 'submitting' ? "Processing..." : (editingId ? "Update Article" : "Publish Article")}
                    </button>
                    {editingId && (
                      <button type="button" onClick={resetForm} className="px-8 py-4 rounded-xl border border-gray-200 text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors cursor-pointer">
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
                  
                  <div className="p-6 md:p-8 max-h-[600px] overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#cc2027] bg-[#cc2027]/10 px-3 py-1.5 rounded-full">
                        {formData.category || "Category"}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="font-serif-heading text-xl md:text-3xl font-bold text-[#1c2f54] leading-tight mb-6">
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
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white flex-wrap gap-4">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Content Library</h2>
                    <p className="text-sm text-gray-400 mt-1">{localPosts.length} published articles</p>
                  </div>
                  <button onClick={() => {resetForm(); setView('editor');}} className="bg-[#1c2f54] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center gap-2 cursor-pointer">
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
                          <td className="py-5 px-8 font-bold text-[#1c2f54] w-full min-w-[250px]">{post.title}</td>
                          <td className="py-5 px-8 whitespace-nowrap">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1c2f54] bg-[#1c2f54]/5 border border-[#1c2f54]/10 px-3 py-1.5 rounded-full">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(post)}
                                className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Edit Article"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(post.id)}
                                className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
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
                            <div className="flex flex-col items-center justify-center text-gray-400 font-sans">
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
                    <p className="text-sm text-gray-400 mt-1">Review, manage, and reply to client inquiries. Click any row to view options.</p>
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
                        <th className="font-sans uppercase text-[10px] tracking-widest text-gray-500 font-bold py-5 px-8">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-sm">
                      {localConsultations.length > 0 ? localConsultations.map((c) => (
                        <tr 
                          key={c.id} 
                          onClick={() => setSelectedConsultation(c)}
                          className="border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
                        >
                          <td className="py-5 px-8 text-gray-500 font-medium whitespace-nowrap">{c.date}</td>
                          <td className="py-5 px-8">
                            <div className="font-bold text-[#1c2f54]">{c.name}</div>
                            <div className="text-xs text-gray-400">{c.email}</div>
                            {c.phone && <div className="text-[10px] text-gray-400">{c.phone}</div>}
                          </td>
                          <td className="py-5 px-8 font-medium text-gray-700 whitespace-nowrap">{c.service}</td>
                          <td className="py-5 px-8 text-xs text-gray-500 max-w-xs truncate" title={c.summary}>{c.summary}</td>
                          <td className="py-5 px-8 whitespace-nowrap">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.status === 'Replied' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                              {c.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="py-32 text-center">
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
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white flex-wrap gap-4">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Newsletter Subscribers</h2>
                    <p className="text-sm text-gray-400 mt-1">Export or manage your email list</p>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-blue-600 border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer" onClick={() => alert('Exporting to CSV...')}>
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
                          <td className="py-5 px-8 text-gray-500 font-medium whitespace-nowrap">{s.date || 'Active'}</td>
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
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white flex-wrap gap-4">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Client Directory</h2>
                    <p className="text-sm text-gray-400 mt-1">Manage client records and profiles</p>
                  </div>
                  <button className="bg-[#1c2f54] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center gap-2 cursor-pointer" onClick={() => setIsAddClientModalOpen(true)}>
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
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                  <div>
                    <h2 className="font-serif-heading text-2xl text-[#1c2f54] font-bold">Global Settings</h2>
                    <p className="text-sm text-gray-400 mt-1">Configure system parameters and preferences</p>
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif-heading text-lg font-bold text-[#1c2f54] border-b border-gray-100 pb-2">Firm Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Default Language</label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 text-gray-800">
                          <option>English</option>
                          <option>French</option>
                          <option>Swahili</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Email</label>
                        <input type="email" defaultValue="info@msochienglaw.co.ke" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button className="bg-[#cc2027] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#1c2f54] transition-all cursor-pointer" onClick={() => alert('Settings saved successfully!')}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Slide-over Consultation Detail Drawer */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div onClick={() => setSelectedConsultation(null)} className="absolute inset-0 bg-[#1c2f54]/60 backdrop-blur-xs" />
          
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            <header className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${selectedConsultation.status === 'Replied' ? 'text-green-600 bg-green-50 border border-green-200' : 'text-amber-600 bg-amber-50 border border-amber-200'}`}>
                  {selectedConsultation.status || 'Pending'}
                </span>
                <h2 className="font-serif-heading text-xl font-bold text-[#1c2f54] mt-2">Consultation Mandate Detail</h2>
              </div>
              <button onClick={() => setSelectedConsultation(null)} className="text-gray-400 hover:text-red-500 transition-colors p-2 cursor-pointer">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Client Details</p>
                  <p className="font-bold text-[#1c2f54] text-base mt-1">{selectedConsultation.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedConsultation.organization || "No Organization listed"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 font-sans">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Contact Channels</p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">{selectedConsultation.email}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">{selectedConsultation.phone || "No phone listed"}</p>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="space-y-3 font-sans">
                <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Service Area Requested</p>
                <div className="text-sm font-bold text-[#1c2f54] bg-[#cc2027]/5 border border-[#cc2027]/10 px-4 py-2.5 rounded-lg inline-block">
                  {selectedConsultation.service}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Executive Summary</p>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-line">
                  {selectedConsultation.summary}
                </div>
              </div>

              {/* Direct Actions: Call, SMS */}
              <div className="space-y-3 font-sans">
                <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Direct Actions</p>
                <div className="flex flex-wrap gap-3">
                  {selectedConsultation.phone ? (
                    <>
                      <a 
                        href={`tel:${selectedConsultation.phone}`}
                        className="bg-[#1c2f54] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center gap-2 shadow-sm"
                      >
                        Call Client
                      </a>
                      <a 
                        href={`sms:${selectedConsultation.phone}?body=Dear%20${encodeURIComponent(selectedConsultation.name)},%20thank%20you%20for%20reaching%20out%20to%20M.S.%20Ochieng%20Legal.%20We%20received%20your%20briefing%20request%20regarding%20${encodeURIComponent(selectedConsultation.service)}%20and%20will%20be%20in%20touch.`}
                        className="border border-[#1c2f54] text-[#1c2f54] hover:bg-gray-50 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        Send SMS
                      </a>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400 font-medium italic">No phone number available to call/SMS.</span>
                  )}
                </div>
              </div>

              {/* Reply History */}
              {selectedConsultation.replies && selectedConsultation.replies.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400 font-sans">Reply History Logs</p>
                  <div className="space-y-3">
                    {selectedConsultation.replies.map((reply, i) => (
                      <div key={i} className="bg-green-50/50 border border-green-100 p-4 rounded-xl text-xs space-y-2 font-sans">
                        <div className="flex justify-between text-gray-400 font-bold text-[9px] uppercase tracking-wider">
                          <span>{reply.date}</span>
                          <span className="text-green-600">{reply.status}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{reply.replyText}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Send Email Response */}
              <div className="space-y-3 border-t border-gray-100 pt-6 font-sans">
                <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Email Response Editor</p>
                {replyingStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-xs font-medium">
                    Reply dispatched successfully! Email has been sent to client inbox.
                  </div>
                )}
                {replyingStatus === 'failed' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs font-medium">
                    Failed to dispatch email. Please check your Resend server configuration or try again.
                  </div>
                )}
                <div className="space-y-3">
                  <textarea 
                    value={replyText} 
                    onChange={(e) => setReplyText(e.target.value)} 
                    rows="5"
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white resize-none text-gray-800" 
                    placeholder="Type your official legal response or follow-up details here..."
                  />
                  <button 
                    onClick={async () => {
                      if (!replyText.trim()) return;
                      setReplyingStatus("sending");
                      try {
                        const res = await emailService.sendConsultationReply(
                          selectedConsultation.email, 
                          selectedConsultation.name, 
                          replyText
                        );
                        if (res.success) {
                          const updatedReplies = [...(selectedConsultation.replies || []), {
                            date: new Date().toLocaleString(),
                            replyText: replyText,
                            status: res.status || 'Sent',
                            details: res.details || ''
                          }];
                          const updatedConsultation = {
                            ...selectedConsultation,
                            status: 'Replied',
                            replies: updatedReplies
                          };
                          await db.updateConsultation(updatedConsultation);
                          setSelectedConsultation(updatedConsultation);
                          setReplyText("");
                          setReplyingStatus("success");
                          // Refresh list
                          const consults = await db.getConsultations();
                          setLocalConsultations(consults);
                          setTimeout(() => setReplyingStatus("idle"), 3000);
                        } else {
                          setReplyingStatus("failed");
                        }
                      } catch (err) {
                        setReplyingStatus("failed");
                      }
                    }}
                    disabled={replyingStatus === 'sending' || !replyText.trim()}
                    className="bg-[#cc2027] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#1c2f54] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {replyingStatus === 'sending' ? 'Sending Response...' : 'Send Response'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 bg-[#1c2f54]/90 z-50 flex flex-col justify-center items-center backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-gray-100 font-sans">
            <button onClick={() => setIsAddClientModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#cc2027] transition-colors p-1 cursor-pointer">
              <X size={24} />
            </button>
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-serif-heading text-2xl font-bold text-[#1c2f54]">Add New Client</h2>
              <p className="text-sm text-gray-500 mt-1">Enter the client details below.</p>
            </div>
            <form onSubmit={handleAddClient} className="p-8 space-y-6">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Client Name</label>
                <input required type="text" value={newClient.name} onChange={(e) => setNewClient({...newClient, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" placeholder="e.g. Alexander Hamilton" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Organization (Optional)</label>
                <input type="text" value={newClient.organization} onChange={(e) => setNewClient({...newClient, organization: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" placeholder="e.g. Global Tech Inc." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                <input required type="email" value={newClient.email} onChange={(e) => setNewClient({...newClient, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800" placeholder="counsel@organization.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
                <select value={newClient.status} onChange={(e) => setNewClient({...newClient, status: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#cc2027]/20 focus:border-[#cc2027] transition-all bg-gray-50 focus:bg-white text-gray-800">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-[#1c2f54] text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#cc2027] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#cc2027]/10 cursor-pointer">
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
