
import { LinkedInPost } from '@/components/linkedin/types';
import { toast } from '@/components/ui/use-toast';
import { databaseService } from './databaseService';

export class LinkedInService {
  async getLinkedInPosts(): Promise<LinkedInPost[]> {
    try {
      const posts = await databaseService.fetchLinkedInPosts();
      return posts || [];
    } catch (error) {
      console.error('Error getting LinkedIn posts:', error);
      return [];
    }
  }

  async updateLinkedInPost(post: LinkedInPost): Promise<void> {
    try {
      const success = await databaseService.saveLinkedInPost(post);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Publicação do LinkedIn atualizada com sucesso!",
        });
      } else {
        throw new Error('Falha ao salvar publicação');
      }
    } catch (error) {
      console.error('Error updating LinkedIn post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a publicação do LinkedIn.",
        variant: "destructive",
      });
    }
  }

  async deleteLinkedInPost(id: string): Promise<void> {
    try {
      const success = await databaseService.deleteLinkedInPost(id);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Publicação do LinkedIn excluída com sucesso!",
        });
      } else {
        throw new Error('Falha ao excluir publicação');
      }
    } catch (error) {
      console.error('Error deleting LinkedIn post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a publicação do LinkedIn.",
        variant: "destructive",
      });
    }
  }
}

export const linkedInService = new LinkedInService();
