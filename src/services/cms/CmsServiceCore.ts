
import { SiteContent } from './types';
import { defaultContent } from './defaultContent';
import { databaseService } from './database/databaseService';
import { toast } from '@/components/ui/use-toast';
import { CacheService } from './CacheService';
import { BaseService } from './BaseService';

export class CmsServiceCore extends BaseService {
  private readonly cacheService: CacheService;
  
  constructor(cacheService: CacheService) {
    super();
    this.cacheService = cacheService;
  }

  async getContent(): Promise<SiteContent> {
    try {
      // Always reload content from database to ensure fresh data
      console.log('Getting fresh content from database');
      return await this.loadContentFromDatabase();
    } catch (error) {
      console.error('Error getting content from database:', error);
      return defaultContent;
    }
  }
  
  // Method that returns default content immediately
  getContentSync(): SiteContent {
    console.log('getContentSync called, immediately fetching from database');
    // Since we can't do async calls in sync method, return default content
    // The component should use getContent() instead for fresh data
    return defaultContent;
  }
  
  async saveContent(content: SiteContent): Promise<void> {
    try {
      // Store main content directly to database
      const { hero, about, services, methodology, contact } = content;
      await databaseService.saveMainContent({ hero, about, services, methodology, contact });
      
      // Store projects info
      const projectsContent = {
        title: content.projects.title,
        description: content.projects.description
      };
      
      await databaseService.saveProjectsInfo(projectsContent);
      
      this.showSuccessToast("Conteúdo salvo com sucesso!");
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
    }
  }
  
  // Add the updatePartialContent method
  async updatePartialContent<K extends keyof SiteContent>(
    section: K, 
    content: SiteContent[K]
  ): Promise<void> {
    try {
      // Get current content
      const currentContent = await this.getContent();
      
      // Update only the specified section
      const updatedContent = {
        ...currentContent,
        [section]: content
      };
      
      // For now, simply save the entire content
      // This could be optimized later to only save the updated section
      await this.saveContent(updatedContent);
      
      this.showSuccessToast(`Conteúdo de ${section} atualizado com sucesso!`);
    } catch (error) {
      this.handleError(error, `Falha ao atualizar ${section}`);
    }
  }
  
  // New method that directly loads from database
  private async loadContentFromDatabase(): Promise<SiteContent> {
    try {
      console.log('Loading fresh content directly from database...');
      const content: SiteContent = { ...defaultContent };
      
      // Get main content
      const mainContent = await databaseService.fetchMainContent();
      
      if (mainContent) {
        console.log('Main content loaded from database:', mainContent);
        // Use safe property access with fallback to default content
        if (mainContent.hero) content.hero = mainContent.hero as SiteContent['hero'];
        if (mainContent.about) content.about = mainContent.about as SiteContent['about'];
        if (mainContent.services) content.services = mainContent.services as SiteContent['services'];
        if (mainContent.methodology) content.methodology = mainContent.methodology as SiteContent['methodology'];
        if (mainContent.contact) content.contact = mainContent.contact as SiteContent['contact'];
      } else {
        console.log('No main content found in database, using default');
      }
      
      // Get projects info
      const projectsInfo = await databaseService.fetchProjectsInfo();
      
      if (projectsInfo) {
        if (projectsInfo.title) content.projects.title = projectsInfo.title as string;
        if (projectsInfo.description) content.projects.description = projectsInfo.description as string;
      }
      
      // Get projects
      const projects = await databaseService.fetchProjects();
      
      if (projects && projects.length > 0) {
        content.projects.items = projects as SiteContent['projects']['items'];
        console.log('Projects loaded:', projects.length);
      } else {
        console.log('No projects found in database, using default content');
      }
      
      // Get LinkedIn posts
      const linkedInPosts = await databaseService.fetchLinkedInPosts();
      
      if (linkedInPosts && linkedInPosts.length > 0) {
        content.linkedInPosts = linkedInPosts as SiteContent['linkedInPosts'];
        console.log('LinkedIn posts loaded:', linkedInPosts.length);
      } else {
        console.log('No LinkedIn posts found in database, using default content');
      }
      
      console.log('Content loaded successfully from database');
      return content;
    } catch (error) {
      console.error('Error loading content from database:', error);
      return defaultContent;
    }
  }
  
  // Legacy method kept for compatibility, but now just forwards to loadContentFromDatabase
  async loadContentToCache(): Promise<void> {
    try {
      // Load content directly, but don't actually cache it
      await this.loadContentFromDatabase();
      console.log('Content loaded to cache (disabled)');
    } catch (error) {
      console.error('Error in loadContentToCache:', error);
    }
  }
  
  async resetToDefault(): Promise<void> {
    try {
      const success = await databaseService.resetToDefault(defaultContent);
      
      if (success) {
        toast({
          title: "Conteúdo Resetado",
          description: "Todo o conteúdo foi restaurado para os valores padrão.",
        });
      } else {
        throw new Error('Falha ao resetar o conteúdo');
      }
    } catch (error) {
      this.handleError(error, "Não foi possível resetar o conteúdo.");
    }
  }
}

const cmsServiceCore = new CmsServiceCore(new CacheService());
export default cmsServiceCore;
