
// Este arquivo agora apenas re-exporta o cliente criado em integrations/supabase/client.ts
// para manter a compatibilidade com código existente

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Função para verificar se o Supabase está configurado corretamente
export const isSupabaseConfigured = () => {
  try {
    // Tenta fazer uma consulta simples para verificar a conexão
    supabase.from('linkedin_posts').select('count').limit(1).single();
    return true;
  } catch (error) {
    console.error('Erro ao verificar a conexão com o Supabase:', error);
    return false;
  }
};

// Re-exporta o cliente Supabase
export { supabase };
