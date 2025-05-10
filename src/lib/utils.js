
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function isSupabaseConfigured() {
  try {
    // Check if we have Supabase URL and key
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || null;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || null;
    
    return !!supabaseUrl && !!supabaseKey;
  } catch (e) {
    console.error('Error checking Supabase configuration:', e);
    return false;
  }
}
