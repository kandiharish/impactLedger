import { createClient } from '@supabase/supabase-js';

// Both values come from Supabase Dashboard → Project Settings → API Keys.
// They are safe to ship in the browser: what visitors may read or write is
// enforced by the Row Level Security policies in supabase/schema.sql.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** The shared Supabase client, or null when the project isn't configured (the site then uses sample data). */
export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseConfigured = supabase !== null;
