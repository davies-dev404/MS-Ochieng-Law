import { supabase, isSupabaseActive } from './supabase';
import { defaultBlogPosts } from './blogData';
import { getConsent } from './cookies';

// Helper to get cached or default blogs synchronously (instant load)
export const getBlogsSync = () => {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('mso_blogs_db_cache');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Error parsing cached blogs", e);
      }
    }
    const local = localStorage.getItem('mso_blogs');
    if (local) {
      try {
        return [...JSON.parse(local), ...defaultBlogPosts];
      } catch (e) {}
    }
  }
  return defaultBlogPosts;
};

// Asynchronous DB Interface
export const db = {
  // --- BLOGS ---
  async getBlogs() {
    if (isSupabaseActive()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          localStorage.setItem('mso_blogs_db_cache', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using local fallback", err);
      }
    }
    return getBlogsSync();
  },

  async saveBlog(post) {
    if (isSupabaseActive()) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .insert([post]);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase save failed", err);
      }
    }
    
    // Save to local storage for fallback consistency
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('mso_blogs');
      let blogs = [];
      if (local) {
        try { blogs = JSON.parse(local); } catch (e) {}
      }
      blogs.unshift(post);
      localStorage.setItem('mso_blogs', JSON.stringify(blogs));
      // Re-build cache
      localStorage.setItem('mso_blogs_db_cache', JSON.stringify([...blogs, ...defaultBlogPosts]));
    }
  },

  async updateBlog(updatedPost) {
    if (isSupabaseActive()) {
      try {
        const { error } = await supabase
          .from('blogs')
          .update(updatedPost)
          .eq('id', updatedPost.id);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase update failed", err);
      }
    }

    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('mso_blogs');
      if (local) {
        try {
          let blogs = JSON.parse(local);
          const index = blogs.findIndex(b => b.id === updatedPost.id);
          if (index !== -1) {
            blogs[index] = updatedPost;
            localStorage.setItem('mso_blogs', JSON.stringify(blogs));
            localStorage.setItem('mso_blogs_db_cache', JSON.stringify([...blogs, ...defaultBlogPosts]));
            return true;
          }
        } catch (e) {}
      }
    }
    return false;
  },

  async deleteBlog(id) {
    if (isSupabaseActive()) {
      try {
        const { error } = await supabase
          .from('blogs')
          .delete()
          .eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase delete failed", err);
      }
    }

    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('mso_blogs');
      if (local) {
        try {
          let blogs = JSON.parse(local);
          blogs = blogs.filter(b => b.id !== id);
          localStorage.setItem('mso_blogs', JSON.stringify(blogs));
          localStorage.setItem('mso_blogs_db_cache', JSON.stringify([...blogs, ...defaultBlogPosts]));
          return true;
        } catch (e) {}
      }
    }
    return false;
  },

  // --- SUBSCRIBERS ---
  async getSubscribers() {
    if (isSupabaseActive()) {
      try {
        const { data, error } = await supabase
          .from('subscribers')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data) {
          localStorage.setItem('mso_subscribers', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn("Supabase fetch subscribers failed, using local", err);
      }
    }
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('mso_subscribers') || '[]');
    }
    return [];
  },

  async saveSubscriber(subscriber) {
    if (isSupabaseActive()) {
      try {
        const { error } = await supabase
          .from('subscribers')
          .insert([subscriber]);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase save subscriber failed", err);
      }
    }

    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('mso_subscribers') || '[]');
      if (!stored.find(s => s.email === subscriber.email)) {
        stored.unshift(subscriber);
        localStorage.setItem('mso_subscribers', JSON.stringify(stored));
      }
    }
  },

  // --- CONSULTATIONS ---
  async getConsultations() {
    if (isSupabaseActive()) {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data) {
          localStorage.setItem('mso_consultations', JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.warn("Supabase fetch consultations failed, using local", err);
      }
    }
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('mso_consultations') || '[]');
    }
    return [];
  },

  async saveConsultation(consultation) {
    if (isSupabaseActive()) {
      try {
        const { error } = await supabase
          .from('consultations')
          .insert([consultation]);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase save consultation failed", err);
      }
    }

    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('mso_consultations') || '[]');
      stored.unshift(consultation);
      localStorage.setItem('mso_consultations', JSON.stringify(stored));
    }
  },

  async updateConsultation(updatedConsultation) {
    if (isSupabaseActive()) {
      try {
        const { error } = await supabase
          .from('consultations')
          .update(updatedConsultation)
          .eq('id', updatedConsultation.id);
        if (error) throw error;
      } catch (err) {
        console.error("Supabase update consultation failed", err);
      }
    }

    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('mso_consultations') || '[]');
      const index = stored.findIndex(c => c.id === updatedConsultation.id);
      if (index !== -1) {
        stored[index] = updatedConsultation;
        localStorage.setItem('mso_consultations', JSON.stringify(stored));
        return true;
      }
    }
    return false;
  },

  async trackVisitor(sessionId) {
    const consent = getConsent();
    if (!consent || !consent.analytics) {
      return; // Do not track without analytics consent
    }
    if (isSupabaseActive()) {
      try {
        const { error } = await supabase
          .from('visitors')
          .insert([{ session_id: sessionId }]);
        if (error) {
          // 23505 = unique violation (session already recorded – expected & fine)
          // PGRST205 = table not in schema cache yet – migration pending, ignore silently
          if (error.code !== '23505' && error.code !== 'PGRST205') {
            console.error("Supabase track visitor error", error);
          }
        }
      } catch (err) {
        console.error("Supabase track visitor failed", err);
      }
    }

    if (typeof window !== 'undefined') {
      const sessions = JSON.parse(localStorage.getItem('mso_visitor_sessions') || '[]');
      if (!sessions.includes(sessionId)) {
        sessions.push(sessionId);
        localStorage.setItem('mso_visitor_sessions', JSON.stringify(sessions));
      }
    }
  },

  async getUniqueVisitorsCount() {
    if (isSupabaseActive()) {
      try {
        const { count, error } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true });
        // PGRST205 means the table doesn't exist yet – fall through to local count
        if (error && error.code !== 'PGRST205') throw error;
        if (!error) return count || 0;
      } catch (err) {
        console.warn("Supabase fetch visitors count failed, using local", err);
      }
    }

    if (typeof window !== 'undefined') {
      const sessions = JSON.parse(localStorage.getItem('mso_visitor_sessions') || '[]');
      return sessions.length;
    }
    return 0;
  }
};
