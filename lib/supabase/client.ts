import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for client-side operations
 * Uses anon key for public access
 */
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    db: {
    schema: 'api', // <--- Add this line to match your Supabase settings
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

/**
 * Singleton Supabase client instance
 */
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient();
  }
  return supabaseClient;
};

