
import { createClient } from '@supabase/supabase-js';

// Try to get configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://efigztrbarvxhszyqfgd.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaWd6dHJiYXJ2eGhzenlxZmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTgwMDUsImV4cCI6MjA2MjI5NDAwNX0.hMkg0HLYk7pnqQY_IAP5thJeptQawNebdW2h81WlKs0";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
