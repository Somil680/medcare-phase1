import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Supabase client for server-side operations
 * Can use service role key for admin operations
 */
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  // Use service role key if available (for admin operations)
  // Otherwise use anon key with user's session
  const key = supabaseServiceKey || supabaseAnonKey;

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
    },
  });
};

/**
 * Get Supabase client with user session (for server components)
 */
export const getServerSupabaseClient = async () => {
  const supabase = createServerSupabaseClient();
  const cookieStore = await cookies();
  
  // Get session from cookies
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return supabase;
};

