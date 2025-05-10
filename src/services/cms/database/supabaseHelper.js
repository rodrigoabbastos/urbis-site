
import { supabase } from '@/lib/supabase';

// Helper function to make Supabase calls more consistent
export const supabaseHelper = {
  // Generic from function
  from: (table) => {
    return supabase.from(table);
  },
  // Helper for RPC calls
  rpc: (fn, params) => {
    return supabase.rpc(fn, params);
  }
};
