
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { LinkedInPost } from '@/components/linkedin/types';
import { databaseService } from './databaseService';

class LinkedInService {
  async getLinkedInPosts(): Promise<LinkedInPost[]> {
    try {
      // Directly query the linkedin_posts table
      const { data, error } = await supabase
        .from('linkedin_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching LinkedIn posts:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching LinkedIn posts:', error);
      return [];
    }
  }

  async updateLinkedInPost(post: LinkedInPost): Promise<void> {
    try {
      const success = await databaseService.saveLinkedInPost(post);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Post do LinkedIn atualizado com sucesso!",
        });
      } else {
        throw new Error('Failed to update LinkedIn post');
      }
    } catch (error) {
      console.error('Error updating LinkedIn post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o post do LinkedIn.",
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
          description: "Post do LinkedIn excluído com sucesso!",
        });
      } else {
        throw new Error('Failed to delete LinkedIn post');
      }
    } catch (error) {
      console.error('Error deleting LinkedIn post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o post do LinkedIn.",
        variant: "destructive",
      });
    }
  }
}

export const linkedInService = new LinkedInService();
