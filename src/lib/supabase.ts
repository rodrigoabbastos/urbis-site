
// This file now re-exports the client created in integrations/supabase/client.ts
// to maintain compatibility with existing code

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Função melhorada para verificar a conexão com o Supabase
const verifySupabaseConnection = async () => {
  try {
    console.log('Verificando conexão com Supabase...');
    
    // Verifica se o cliente está inicializado
    if (!supabase) {
      console.error('Cliente Supabase não inicializado');
      return false;
    }
    
    // Tenta realizar uma consulta simples para verificar a conexão
    const { data, error } = await supabase.from('content').select('id').limit(1);
    
    if (error) {
      console.error('Erro ao conectar ao Supabase:', error);
      
      // Diagnóstico detalhado de erros comuns
      if (error.message.includes('JWT')) {
        console.error('Erro de autenticação JWT. Verifique suas chaves do Supabase.');
      } else if (error.message.includes('network')) {
        console.error('Erro de conexão de rede com o Supabase.');
      } else if (error.message.includes('permission denied')) {
        console.error('Erro de permissão. As políticas de RLS podem estar bloqueando o acesso.');
      }
      
      return false;
    }
    
    console.log('Conexão com Supabase estabelecida com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao verificar conexão com Supabase:', error);
    return false;
  }
};

// Inicializa verificação de conexão
verifySupabaseConnection().then((result) => {
  if (result) {
    console.log('Supabase está configurado e conectado corretamente');
  } else {
    console.error('Falha na configuração do Supabase - verifique suas credenciais e conexão');
  }
}).catch(err => {
  console.error('Erro durante inicialização do Supabase:', err);
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
