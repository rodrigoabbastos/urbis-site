
// This file now re-exports the client created in integrations/supabase/client.ts
// to maintain compatibility with existing code

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Improved function to verify Supabase connection
const verifySupabaseConnection = async () => {
  try {
    console.log('Verificando conexão com Supabase...');
    
    // Verify environment (development or production)
    const isProduction = window.location.hostname === 'urbis.com.br' || 
                        window.location.hostname === 'www.urbis.com.br';
    console.log(`Ambiente detectado: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
    
    // Check if client is initialized
    if (!supabase) {
      console.error('Cliente Supabase não inicializado');
      return false;
    }
    
    console.log('Cliente Supabase inicializado corretamente');
    
    // Test Supabase API connectivity
    console.log('Testando conectividade com API Supabase...');
    try {
      // Try a simple anonymous query that should work with public access
      const { data, error } = await supabase.from('content').select('id').limit(1);
      
      if (error) {
        console.error('Erro na verificação de saúde do Supabase:', error);
        console.error('Detalhes do erro:', error.message || 'Sem detalhes');
        
        // Diagnostic checks
        if (error.message?.includes('JWT')) {
          console.error('Erro de autenticação JWT. Verifique suas chaves do Supabase.');
        } else if (error.message?.includes('network')) {
          console.error('Erro de conexão de rede com o Supabase. Verifique CORS e firewall.');
        } else if (error.message?.includes('permission denied')) {
          console.error('Erro de permissão. As políticas de RLS podem estar bloqueando o acesso.');
        }
        
        return false;
      }
      
      console.log('Conexão com API Supabase estabelecida com sucesso');
      return true;
    } catch (apiError) {
      console.error('Exceção capturada durante teste de API Supabase:', apiError);
      return false;
    }
  } catch (error) {
    console.error('Erro não tratado ao verificar conexão com Supabase:', error);
    return false;
  }
};

// Improved initialization with better error handling
setTimeout(() => {
  console.log('Iniciando verificação de conexão Supabase...');
  verifySupabaseConnection().then((result) => {
    if (result) {
      console.log('✅ Supabase está configurado e conectado corretamente');
    } else {
      console.error('❌ Falha na configuração do Supabase');
      // Show toast for users about connectivity issues
      toast({
        title: "Problemas de conexão",
        description: "Não foi possível conectar ao banco de dados. Alguns recursos podem não funcionar corretamente.",
        variant: "destructive"
      });
    }
  }).catch(err => {
    console.error('❌ Erro durante inicialização do Supabase:', err);
  });
}, 1500);

// Function to verify if Supabase is configured correctly
export const isSupabaseConfigured = () => {
  try {
    // Check if the client is initialized
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

// Re-export the Supabase client
export { supabase };
