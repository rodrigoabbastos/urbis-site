
import { supabaseHelper } from './supabaseHelper';
import { DatabaseInitService } from './databaseInitService';

export class LinkedInDatabaseService {
  private dbInitService: DatabaseInitService;
  
  constructor() {
    this.dbInitService = new DatabaseInitService();
  }
  
  async fetchLinkedInPosts() {
    try {
      // Make sure tables are created before fetching
      await this.dbInitService.createTablesIfNotExist();
      
      console.log('Fetching LinkedIn posts...');
      const { data, error } = await supabaseHelper.from('linkedin_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.warn('Erro ao carregar posts do LinkedIn:', error.message);
        return null;
      }
      
      console.log(`Fetched ${data?.length || 0} LinkedIn posts`);
      return data;
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error);
      return null;
    }
  }

  async saveLinkedInPost(post: any) {
    try {
      // Make sure tables are created before saving
      await this.dbInitService.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('linkedin_posts')
        .upsert(post);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving LinkedIn post:', error);
      return false;
    }
  }

  async deleteLinkedInPost(id: string) {
    try {
      // Ensure tables exist before deleting
      await this.dbInitService.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('linkedin_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting LinkedIn post:', error);
      return false;
    }
  }
}
