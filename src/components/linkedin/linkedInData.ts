
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms';
import { toast } from '@/components/ui/use-toast';
import { isSupabaseConfigured } from '@/lib/supabase';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    console.log('Fetching LinkedIn posts from CMS service...');
    
    // Improved environment detection
    const hostname = window.location.hostname;
    const isProduction = !['localhost', '127.0.0.1'].includes(hostname) && 
                        !hostname.includes('lovable.app');
    console.log(`[getLinkedInPosts] Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'} (${hostname})`);
    
    // Verify Supabase configuration first
    if (!isSupabaseConfigured()) {
      console.error('[getLinkedInPosts] Supabase não está configurado corretamente');
      throw new Error('Erro de configuração do banco de dados. Por favor, verifique a conexão com o Supabase.');
    }
    
    // Improved error handling with try/catch
    try {
      const posts = await cmsService.getLinkedInPosts();
      console.log(`Retrieved ${posts?.length || 0} LinkedIn posts`);
      
      if (!posts || posts.length === 0) {
        console.log('Nenhum post do LinkedIn encontrado no banco de dados');
      }
      
      return posts || [];
    } catch (fetchError) {
      console.error('[getLinkedInPosts] Erro específico ao buscar posts:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    
    // Detalhe melhor o erro para diagnóstico
    if (error instanceof Error) {
      console.error('Mensagem de erro:', error.message);
      console.error('Stack trace:', error.stack);
      
      // Show different messages based on error type
      if (error.message.includes('Supabase')) {
        toast({
          title: "Erro de Configuração",
          description: "Problema na conexão com o banco de dados. Verifique se o Supabase está configurado corretamente.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro de Comunicação",
          description: "Não foi possível carregar as publicações do LinkedIn. Verifique sua conexão com a internet.",
          variant: "destructive",
        });
      }
    } else {
      console.error('Erro não identificado:', JSON.stringify(error));
      toast({
        title: "Erro",
        description: "Ocorreu um erro desconhecido ao carregar as publicações do LinkedIn.",
        variant: "destructive",
      });
    }
    
    return [];
  }
};
