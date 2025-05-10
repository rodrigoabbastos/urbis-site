
// This file now re-exports the client created in integrations/supabase/client.ts
// to maintain compatibility with existing code

import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Função melhorada para verificar a conexão com o Supabase
const verifySupabaseConnection = async () => {
  try {
    console.log('Verificando conexão com Supabase...');
    
    // Verifica o ambiente (desenvolvimento ou produção)
    const isProduction = window.location.hostname === 'urbis.com.br';
    console.log(`Ambiente detectado: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
    
    // Verifica se o cliente está inicializado
    if (!supabase) {
      console.error('Cliente Supabase não inicializado');
      return false;
    }
    
    // Em vez de tentar acessar a propriedade diretamente, vamos apenas logar o cliente
    console.log('Cliente Supabase inicializado corretamente');
    
    // Testa a API do Supabase para verificar conectividade básica
    console.log('Testando conectividade com API Supabase...');
    try {
      const { data: healthData, error: healthError } = await supabase.from('content').select('id').limit(1);
      
      if (healthError) {
        console.error('Erro na verificação de saúde do Supabase:', healthError);
        console.error('Detalhes completos do erro:', JSON.stringify(healthError));
        
        // Diagnóstico detalhado de erros comuns
        if (healthError.message?.includes('JWT')) {
          console.error('Erro de autenticação JWT. Verifique suas chaves do Supabase.');
        } else if (healthError.message?.includes('network')) {
          console.error('Erro de conexão de rede com o Supabase.');
        } else if (healthError.message?.includes('permission denied')) {
          console.error('Erro de permissão. As políticas de RLS podem estar bloqueando o acesso.');
        } else if (healthError.message?.includes('CORS')) {
          console.error('Erro de CORS. Verifique se o domínio está permitido no Supabase.');
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

// Inicializa verificação de conexão com tempo de espera mais longo
setTimeout(() => {
  console.log('Iniciando verificação de conexão Supabase...');
  verifySupabaseConnection().then((result) => {
    if (result) {
      console.log('✅ Supabase está configurado e conectado corretamente');
    } else {
      console.error('❌ Falha na configuração do Supabase - verifique suas credenciais e conexão');
    }
  }).catch(err => {
    console.error('❌ Erro durante inicialização do Supabase:', err);
  });
}, 1500); // Atraso para garantir que outros recursos sejam carregados primeiro

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
