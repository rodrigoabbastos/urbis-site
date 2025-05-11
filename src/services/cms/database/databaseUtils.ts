
import { supabase } from '@/lib/supabase';

// Create a typed helper function to make Supabase calls more consistent
// This uses 'any' type to bypass TypeScript's strict checking since our database schema
// isn't properly reflected in the types
export const supabaseHelper = {
  // Generic from function that handles type casting for us
  from: (table: string) => {
    // Using 'as any' to bypass TypeScript checking
    return supabase.from(table as any);
  },
  // Helper for RPC calls
  rpc: (fn: string, params: any) => {
    // Using 'as any' to bypass TypeScript checking
    return supabase.rpc(fn as any, params as any);
  },
  // Helper to truncate tables (for reset operations)
  truncateTable: async (table: string): Promise<boolean> => {
    try {
      // Using a SQL query to truncate the table
      const { error } = await supabase.rpc('run_sql', {
        sql: `TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`
      });
      
      if (error) {
        console.error(`Error truncating table ${table}:`, error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error(`Exception truncating table ${table}:`, error);
      return false;
    }
  }
};
