
// This file now re-exports the client created in integrations/supabase/client.ts
// to maintain compatibility with existing code

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Create a table_exists function for Supabase
const createTableExistsFunction = async () => {
  try {
    // Check if the function already exists - use proper type casting
    const checkFunctionExists = (supabase.rpc as any)('check_function_exists', { 
      function_name: 'table_exists' 
    });
    
    const { data, error } = await checkFunctionExists;
    
    if (error) {
      console.log('Error checking function existence or function does not exist, creating it...');
      // Create the function if it doesn't exist - use proper type casting
      const createFunction = (supabase.rpc as any)('run_sql', {
        sql: `
          CREATE OR REPLACE FUNCTION table_exists(table_name text)
          RETURNS boolean AS $$
          BEGIN
            RETURN EXISTS (
              SELECT FROM pg_catalog.pg_tables
              WHERE schemaname = 'public'
              AND tablename = table_name
            );
          END;
          $$ LANGUAGE plpgsql;
          
          CREATE OR REPLACE FUNCTION check_function_exists(function_name text)
          RETURNS boolean AS $$
          BEGIN
            RETURN EXISTS (
              SELECT FROM pg_catalog.pg_proc
              WHERE proname = function_name
            );
          END;
          $$ LANGUAGE plpgsql;
        `
      });
      
      await createFunction;
      console.log('Functions created successfully');
    } else {
      console.log('Functions already exist');
    }
  } catch (error) {
    console.error('Error creating table_exists function:', error);
  }
};

// Initialize function creation
createTableExistsFunction().then(() => {
  console.log('Function initialization complete');
}).catch(err => {
  console.error('Function initialization failed:', err);
});

// Função para verificar se o Supabase está configurado corretamente
export const isSupabaseConfigured = () => {
  try {
    // Verificamos se as variáveis de ambiente estão definidas
    if (!supabase) {
      return false;
    }
    console.log('Supabase connection configured correctly');
    return true;
  } catch (error) {
    console.error('Erro ao verificar a conexão com o Supabase:', error);
    return false;
  }
};

// Re-exporta o cliente Supabase
export { supabase };
