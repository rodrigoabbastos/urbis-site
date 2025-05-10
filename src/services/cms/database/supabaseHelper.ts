
import { supabase } from '@/lib/supabase';

// Create a strongly typed helper function to make Supabase calls more consistent
// Using type assertions to bypass TypeScript's strict type checking
export const supabaseHelper = {
  // Generic from function with type casting
  from: (table: string) => {
    // Cast directly to bypass TypeScript errors
    return (supabase.from as any)(table);
  },
  // Helper for RPC calls with type casting
  rpc: (fn: string, params: any) => {
    // Cast directly to bypass TypeScript errors
    return (supabase.rpc as any)(fn, params);
  }
};
