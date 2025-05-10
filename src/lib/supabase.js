
import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = "https://efigztrbarvxhszyqfgd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaWd6dHJiYXJ2eGhzenlxZmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTgwMDUsImV4cCI6MjA2MjI5NDAwNX0.hMkg0HLYk7pnqQY_IAP5thJeptQawNebdW2h81WlKs0";

// Verifica se as configurações do Supabase estão definidas
export function isSupabaseConfigured() {
  return supabaseUrl && supabaseAnonKey && 
         supabaseUrl !== "YOUR_SUPABASE_URL" && 
         supabaseAnonKey !== "YOUR_SUPABASE_KEY";
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Adiciona código de monitoramento para depuração
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase Auth Event:', event, session);
});

// Log para verificar se o cliente está sendo inicializado corretamente
console.log('Supabase client initialized with URL:', supabaseUrl);
