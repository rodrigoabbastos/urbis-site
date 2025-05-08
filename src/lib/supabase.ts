
// Este arquivo agora apenas re-exporta o cliente criado em integrations/supabase/client.ts
// para manter a compatibilidade com código existente

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Função para verificar se o Supabase está configurado corretamente
export const isSupabaseConfigured = () => {
  try {
    // Verificamos se as variáveis de ambiente estão definidas
    if (!supabase) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erro ao verificar a conexão com o Supabase:', error);
    return false;
  }
};

// Re-exporta o cliente Supabase
export { supabase };
