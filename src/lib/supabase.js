import { createClient } from '@supabase/supabase-js';

// Support both VITE_ (Vite) and NEXT_PUBLIC_ (other environments) prefixes
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  '';

// Validate that the key is a proper Supabase JWT (must contain dots, typically 3 parts)
// Publishable keys (sb_publishable_...) are NOT valid as anon keys and will cause network errors
const isValidJwt = (key) => typeof key === 'string' && key.split('.').length === 3;

// Initialize client only if credentials are properly configured
export const supabase = (supabaseUrl && supabaseAnonKey && isValidJwt(supabaseAnonKey))
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Warns in dev if the key looks misconfigured
if (import.meta.env.DEV && supabaseAnonKey && !isValidJwt(supabaseAnonKey)) {
  console.warn(
    '[Supabase] VITE_SUPABASE_ANON_KEY does not look like a valid JWT.\n' +
    'It should be a long JWT (e.g. eyJh...). Supabase will run in offline mode (localStorage fallback).'
  );
}

export const isSupabaseActive = () => supabase !== null;
