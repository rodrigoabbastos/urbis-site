
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms';
import { toast } from '@/components/ui/use-toast';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    console.log('Fetching LinkedIn posts from CMS service...');
    const posts = await cmsService.getLinkedInPosts();
    console.log(`Retrieved ${posts?.length || 0} LinkedIn posts`);
    
    if (!posts || posts.length === 0) {
      console.log('Nenhum post do LinkedIn encontrado no banco de dados');
    }
    
    return posts || [];
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    toast({
      title: "Erro",
      description: "Não foi possível carregar as publicações do LinkedIn.",
      variant: "destructive",
    });
    return [];
  }
};
