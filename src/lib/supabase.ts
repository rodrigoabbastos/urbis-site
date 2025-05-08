
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for required environment variables
if (!supabaseUrl) {
  console.error('ERROR: Missing VITE_SUPABASE_URL. Make sure you have connected your project to Supabase.');
  // Provide a fallback to prevent the app from crashing immediately, but it won't work correctly
  // This allows the UI to load and show a proper error message instead of a blank screen
}

if (!supabaseKey) {
  console.error('ERROR: Missing VITE_SUPABASE_ANON_KEY. Make sure you have connected your project to Supabase.');
}

// Create the Supabase client with fallbacks to empty strings to prevent immediate crashes
// This will still result in Supabase operations failing, but the UI can load and display error messages
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseKey || 'placeholder-key'
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseKey;
};
