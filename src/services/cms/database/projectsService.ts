
import { supabaseHelper } from './supabaseHelper';
import { DatabaseInitService } from './databaseInitService';

export class ProjectsDatabaseService {
  private dbInitService: DatabaseInitService;
  
  constructor() {
    this.dbInitService = new DatabaseInitService();
  }
  
  async fetchProjectsInfo() {
    try {
      // Ensure tables exist before fetching
      await this.dbInitService.createTablesIfNotExist();
      
      console.log('Fetching projects info...');
      const { data, error } = await supabaseHelper.from('content')
        .select('*')
        .eq('id', 'projects')
        .single();
      
      if (error) {
        console.warn('Erro ao carregar informações dos projetos:', error.message);
        return null;
      }
      
      console.log('Projects info fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching projects info:', error);
      return null;
    }
  }

  async fetchProjects() {
    try {
      // Ensure tables exist before fetching
      await this.dbInitService.createTablesIfNotExist();
      
      console.log('Fetching projects...');
      const { data, error } = await supabaseHelper.from('projects')
        .select('*');
      
      if (error) {
        console.warn('Erro ao carregar projetos:', error.message);
        return null;
      }
      
      console.log(`Fetched ${data?.length || 0} projects`);
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  }

  async saveProjectsInfo(projectsInfo: { title: string; description: string }) {
    try {
      // Ensure tables exist before saving
      await this.dbInitService.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('content')
        .upsert({ 
          id: 'projects',
          ...projectsInfo
        });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving projects info:', error);
      return false;
    }
  }

  async saveProject(project: any) {
    try {
      // Ensure tables exist before saving
      await this.dbInitService.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('projects')
        .upsert(project);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    }
  }

  async deleteProject(id: string) {
    try {
      // Ensure tables exist before deleting
      await this.dbInitService.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }
}
