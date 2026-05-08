/**
 * Supabase client helper (placeholder).
 *
 * Replace this with a real client after installing `@supabase/supabase-js`:
 *
 * import { createClient } from '@supabase/supabase-js'
 * export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment");
  }

  supabase = createClient(url, anonKey, {
    auth: {
      persistSession: true,
    },
  });

  return supabase;
}

export default getSupabaseClient;
