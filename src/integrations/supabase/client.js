
// Este arquivo é automaticamente gerado. Não edite-o diretamente.
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://efigztrbarvxhszyqfgd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaWd6dHJiYXJ2eGhzenlxZmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTgwMDUsImV4cCI6MjA2MjI5NDAwNX0.hMkg0HLYk7pnqQY_IAP5thJeptQawNebdW2h81WlKs0";

// Importe o cliente supabase desta forma:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
