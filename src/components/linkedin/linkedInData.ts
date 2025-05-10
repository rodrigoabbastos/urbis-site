
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms';
import { toast } from '@/components/ui/use-toast';
import { isSupabaseConfigured } from '@/lib/supabase';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    console.log('Fetching LinkedIn posts from CMS service...');
    
    // Improved environment detection
    const hostname = window.location.hostname;
    const isProduction = hostname === 'www.urbis.com.br' || 
                         hostname === 'urbis.com.br';
    console.log(`[getLinkedInPosts] Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'} (${hostname})`);
    
    // Verify Supabase configuration first
    if (!isSupabaseConfigured()) {
      console.error('[getLinkedInPosts] Supabase não está configurado corretamente');
      
      // Na hospedagem sem Node.js, tentar buscar dados de um arquivo JSON alternativo
      if (isProduction) {
        try {
          console.log('Tentando buscar dados de arquivo JSON estático...');
          const response = await fetch('/data/linkedin-posts.json');
          if (response.ok) {
            const data = await response.json();
            return data || [];
          }
        } catch (fallbackError) {
          console.error('Erro ao buscar dados do arquivo JSON:', fallbackError);
        }
      }
      
      throw new Error('Erro de configuração do banco de dados. Por favor, verifique a conexão com o Supabase.');
    }
    
    // Improved error handling with try/catch
    try {
      const posts = await cmsService.getLinkedInPosts();
      console.log(`Retrieved ${posts?.length || 0} LinkedIn posts`);
      
      if (!posts || posts.length === 0) {
        console.log('Nenhum post do LinkedIn encontrado no banco de dados');
      }
      
      // Se estiver em produção, podemos armazenar os dados em cache local
      if (isProduction && posts && posts.length > 0) {
        try {
          localStorage.setItem('linkedin_posts_cache', JSON.stringify({
            data: posts,
            timestamp: Date.now()
          }));
        } catch (e) {
          console.log('Não foi possível armazenar posts em cache');
        }
      }
      
      return posts || [];
    } catch (fetchError) {
      console.error('[getLinkedInPosts] Erro específico ao buscar posts:', fetchError);
      
      // Tentar recuperar do cache em produção
      if (isProduction) {
        try {
          const cachedData = localStorage.getItem('linkedin_posts_cache');
          if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            // Usar cache se for mais recente que 1 hora
            if (Date.now() - timestamp < 3600000) {
              console.log('Usando dados em cache para posts do LinkedIn');
              return data;
            }
          }
        } catch (e) {
          console.log('Erro ao recuperar cache:', e);
        }
      }
      
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
    
    // Tentar recuperar do cache como último recurso
    try {
      const cachedData = localStorage.getItem('linkedin_posts_cache');
      if (cachedData) {
        const { data } = JSON.parse(cachedData);
        console.log('Usando dados em cache antigos como fallback');
        return data || [];
      }
    } catch (e) {
      console.log('Erro ao recuperar cache:', e);
    }
    
    return [];
  }
};
