
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms';
import { toast } from '@/components/ui/use-toast';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    console.log('Fetching LinkedIn posts from CMS service...');
    
    // Verifica ambiente
    const isProduction = window.location.hostname === 'urbis.com.br';
    console.log(`[getLinkedInPosts] Ambiente: ${isProduction ? 'Produção' : 'Desenvolvimento'}`);
    
    const posts = await cmsService.getLinkedInPosts();
    console.log(`Retrieved ${posts?.length || 0} LinkedIn posts`);
    
    if (!posts || posts.length === 0) {
      console.log('Nenhum post do LinkedIn encontrado no banco de dados');
    }
    
    return posts || [];
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    // Detalhe melhor o erro para diagnóstico
    if (error instanceof Error) {
      console.error('Mensagem de erro:', error.message);
      console.error('Stack trace:', error.stack);
    } else {
      console.error('Erro não identificado:', JSON.stringify(error));
    }
    
    toast({
      title: "Erro",
      description: "Não foi possível carregar as publicações do LinkedIn.",
      variant: "destructive",
    });
    return [];
  }
};
