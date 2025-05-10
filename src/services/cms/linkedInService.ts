
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { LinkedInPost } from '@/components/linkedin/types';
import { databaseService } from './databaseService';
import { BaseService } from './BaseService';

class LinkedInService extends BaseService {
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
      
      // Ensure we return an array of properly typed LinkedIn posts
      return data as LinkedInPost[] || [];
    } catch (error) {
      console.error('Exception fetching LinkedIn posts:', error);
      return [];
    }
  }

  async updateLinkedInPost(post: LinkedInPost): Promise<void> {
    try {
      const success = await databaseService.saveLinkedInPost(post);
      
      if (success) {
        this.showSuccessToast("Post do LinkedIn atualizado com sucesso!");
      } else {
        throw new Error('Failed to update LinkedIn post');
      }
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o post do LinkedIn.");
    }
  }

  async deleteLinkedInPost(id: string): Promise<void> {
    try {
      const success = await databaseService.deleteLinkedInPost(id);
      
      if (success) {
        this.showSuccessToast("Post do LinkedIn excluído com sucesso!");
      } else {
        throw new Error('Failed to delete LinkedIn post');
      }
    } catch (error) {
      this.handleError(error, "Não foi possível excluir o post do LinkedIn.");
    }
  }
}

export const linkedInService = new LinkedInService();
