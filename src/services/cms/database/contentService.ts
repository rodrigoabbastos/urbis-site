
import { supabaseHelper } from './supabaseHelper';
import { DatabaseInitService } from './databaseInitService';

export class ContentDatabaseService {
  private dbInitService: DatabaseInitService;
  
  constructor() {
    this.dbInitService = new DatabaseInitService();
  }
  
  async fetchMainContent() {
    try {
      // Ensure tables exist before fetching
      await this.dbInitService.createTablesIfNotExist();
      
      console.log('Fetching main content...');
      const { data, error } = await supabaseHelper.from('content')
        .select('*')
        .eq('id', 'main')
        .single();
      
      if (error) {
        console.warn('Erro ao carregar conteúdo principal:', error.message);
        return null;
      }
      
      console.log('Main content fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching main content:', error);
      return null;
    }
  }

  async saveMainContent(content: {
    hero: any;
    about: any;
    services: any;
    methodology: any;
    contact: any;
  }) {
    try {
      // Ensure tables exist before saving
      await this.dbInitService.createTablesIfNotExist();
      
      console.log('Saving main content to Supabase:', content);
      
      const { error } = await supabaseHelper.from('content')
        .upsert({ 
          id: 'main',
          hero: content.hero,
          about: content.about,
          services: content.services,
          methodology: content.methodology,
          contact: content.contact,
          updated_at: new Date()
        });
      
      if (error) {
        console.error('Error saving main content to Supabase:', error);
        throw error;
      }
      
      console.log('Main content successfully saved to Supabase');
      return true;
    } catch (error) {
      console.error('Error in saveMainContent:', error);
      return false;
    }
  }
}
