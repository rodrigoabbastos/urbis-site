
// This file now re-exports the client created in integrations/supabase/client.ts
// to maintain compatibility with existing code

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Improved function to verify Supabase connection with better environment detection
const verifySupabaseConnection = async () => {
  try {
    console.log('Verificando conexão com Supabase...');
    
    // Improved environment detection
    const hostname = window.location.hostname;
    const isProduction = !['localhost', '127.0.0.1'].includes(hostname) && 
                        !hostname.includes('lovable.app');
    console.log(`Ambiente detectado: ${isProduction ? 'Produção' : 'Desenvolvimento'} (${hostname})`);
    
    // Check if client is initialized
    if (!supabase) {
      console.error('Cliente Supabase não inicializado');
      return false;
    }
    
    console.log('Cliente Supabase inicializado corretamente');
    
    // Test Supabase API connectivity with better error handling
    console.log('Testando conectividade com API Supabase...');
    try {
      // Try a simple health check query that should always work with anon access
      const { data, error } = await supabase.from('content').select('count').limit(1);
      
      if (error) {
        console.error('Erro na verificação de conectividade do Supabase:', error);
        console.error('Detalhes do erro:', error.message || 'Sem detalhes');
        
        // More detailed diagnostic checks
        if (error.message?.includes('JWT')) {
          console.error('Erro de autenticação JWT. Verifique suas chaves do Supabase.');
        } else if (error.message?.includes('network')) {
          console.error('Erro de conexão de rede com o Supabase. Verifique CORS e firewall.');
          console.error('Verifique se o servidor permite solicitações para URLs externas.');
        } else if (error.message?.includes('permission denied')) {
          console.error('Erro de permissão. As políticas de RLS podem estar bloqueando o acesso.');
        }
        
        return false;
      }
      
      console.log('Conexão com API Supabase estabelecida com sucesso:', data);
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

// Better initialization with retry logic
setTimeout(() => {
  console.log('Iniciando verificação de conexão Supabase...');
  verifySupabaseConnection().then((result) => {
    if (result) {
      console.log('✅ Supabase está configurado e conectado corretamente');
    } else {
      console.error('❌ Falha na configuração do Supabase');
      
      // Show toast for users about connectivity issues with more detailed information
      toast({
        title: "Problemas de conexão",
        description: "Não foi possível conectar ao banco de dados. Verifique sua conexão com a internet e tente novamente.",
        variant: "destructive"
      });
      
      // Try again in a few seconds in case it was a temporary issue
      console.log('Tentando novamente em 5 segundos...');
      setTimeout(() => {
        verifySupabaseConnection().then(retryResult => {
          if (retryResult) {
            console.log('✅ Conexão restabelecida com sucesso na segunda tentativa');
            toast({
              title: "Conexão restabelecida",
              description: "Conexão com o banco de dados restaurada com sucesso.",
              variant: "default"
            });
          } else {
            console.error('❌ Falha na segunda tentativa de conexão');
          }
        });
      }, 5000);
    }
  }).catch(err => {
    console.error('❌ Erro durante inicialização do Supabase:', err);
  });
}, 1500);

// Enhanced function to verify if Supabase is configured correctly
export const isSupabaseConfigured = () => {
  try {
    // More robust check for client initialization
    if (!supabase || !supabase.from) {
      console.error('Cliente Supabase não está inicializado corretamente');
      return false;
    }
    
    const url = (supabase as any).supabaseUrl;
    const key = (supabase as any).supabaseKey;
    
    if (!url || !key) {
      console.error('URL ou chave do Supabase estão ausentes');
      return false;
    }
    
    console.log('Supabase URL verificada:', url.substring(0, 15) + '...');
    console.log('Supabase connection configured correctly');
    return true;
  } catch (error) {
    console.error('Erro ao verificar a configuração do Supabase:', error);
    return false;
  }
};

// Re-export the Supabase client
export { supabase };
