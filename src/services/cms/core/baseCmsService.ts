
import { toast } from '@/components/ui/use-toast';
import { SiteContent } from '../types';
import { defaultContent } from '../defaultContent';
import { databaseService } from '../databaseService';

export class BaseCMSService {
  protected readonly STORAGE_KEY = 'urbis_cms_content';
  protected contentCache: SiteContent | null = null;
  
  constructor() {
    // Initialize migrations if needed
    this.initializeDatabase();
  }
  
  private async initializeDatabase() {
    try {
      // Check if tables exist, if not create them
      await databaseService.createTablesIfNotExist();
      
      // Check if we need to migrate data from localStorage
      const localContent = this.getLocalContent();
      if (localContent) {
        await databaseService.migrateFromLocalStorage(localContent, this.STORAGE_KEY);
      }
      
      // Load content from Supabase to cache
      await this.loadContentToCache();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
  
  protected getLocalContent(): SiteContent | null {
    try {
      const content = localStorage.getItem(this.STORAGE_KEY);
      return content ? JSON.parse(content) : null;
    } catch (error) {
      console.error('Error retrieving local content:', error);
      return null;
    }
  }
  
  protected async loadContentToCache() {
    try {
      const content: SiteContent = { ...defaultContent };
      
      // Get main content
      const mainContent = await databaseService.fetchMainContent();
      
      if (mainContent) {
        // Use type assertion to avoid TypeScript errors
        const typedMainContent = mainContent as any;
        // Use safe property access with fallback to default content
        content.hero = typedMainContent.hero || content.hero;
        content.about = typedMainContent.about || content.about;
        content.services = typedMainContent.services || content.services;
        content.methodology = typedMainContent.methodology || content.methodology;
        content.contact = typedMainContent.contact || content.contact;
      }
      
      // Get projects info
      const projectsInfo = await databaseService.fetchProjectsInfo();
      
      if (projectsInfo) {
        // Use type assertion to avoid TypeScript errors
        const typedProjectsInfo = projectsInfo as any;
        // Use safe property access with fallback to default content
        content.projects.title = typedProjectsInfo.title || content.projects.title;
        content.projects.description = typedProjectsInfo.description || content.projects.description;
      }
      
      // Get projects
      const projects = await databaseService.fetchProjects();
      
      if (projects) {
        content.projects.items = projects || content.projects.items;
      }
      
      // Get LinkedIn posts
      const linkedInPosts = await databaseService.fetchLinkedInPosts();
      
      if (linkedInPosts) {
        content.linkedInPosts = linkedInPosts || content.linkedInPosts;
      }
      
      this.contentCache = content;
    } catch (error) {
      console.error('Error loading content from Supabase:', error);
      // Even if we have an error, set the cache to the default content
      this.contentCache = defaultContent;
    }
  }
  
  async getContent(): Promise<SiteContent> {
    if (!this.contentCache) {
      await this.loadContentToCache();
    }
    return this.contentCache || defaultContent;
  }
  
  // Método síncrono que retorna o conteúdo em cache ou o conteúdo padrão
  getContentSync(): SiteContent {
    return this.contentCache || defaultContent;
  }
  
  async saveContent(content: SiteContent): Promise<void> {
    try {
      // Update cache
      this.contentCache = content;
      
      // Store main content
      const { hero, about, services, methodology, contact } = content;
      await databaseService.saveMainContent({ hero, about, services, methodology, contact });
      
      // Store projects info
      const projectsContent = {
        title: content.projects.title,
        description: content.projects.description
      };
      
      await databaseService.saveProjectsInfo(projectsContent);
      
      // Reload cache after saving
      await this.loadContentToCache();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
    }
  }
  
  async resetToDefault(): Promise<void> {
    try {
      const success = await databaseService.resetToDefault(defaultContent);
      
      if (success) {
        // Update cache
        this.contentCache = defaultContent;
        
        toast({
          title: "Conteúdo Resetado",
          description: "Todo o conteúdo foi restaurado para os valores padrão.",
        });
      } else {
        throw new Error('Falha ao resetar o conteúdo');
      }
    } catch (error) {
      console.error('Error resetting to default:', error);
      toast({
        title: "Erro",
        description: "Não foi possível resetar o conteúdo.",
        variant: "destructive",
      });
    }
  }
}
