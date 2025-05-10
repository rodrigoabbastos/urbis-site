
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
      await this.loadContentToCache();
      return this.cacheService.getCache() || defaultContent;
    } catch (error) {
      console.error('Error getting content:', error);
      return this.cacheService.getCache() || defaultContent;
    }
  }
  
  // Método síncrono que retorna o conteúdo em cache ou o conteúdo padrão
  getContentSync(): SiteContent {
    console.log('getContentSync called, cache status:', this.cacheService.hasCache() ? 'has cache' : 'no cache');
    return this.cacheService.getCache() || defaultContent;
  }
  
  async saveContent(content: SiteContent): Promise<void> {
    try {
      // Update cache
      this.cacheService.setCache(content);
      
      // Store main content
      const { hero, about, services, methodology, contact } = content;
      await databaseService.saveMainContent({ hero, about, services, methodology, contact });
      
      // Store projects info
      const projectsContent = {
        title: content.projects.title,
        description: content.projects.description
      };
      
      await databaseService.saveProjectsInfo(projectsContent);
      
      // Reload cache after saving to ensure consistency
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
  
  async loadContentToCache(): Promise<void> {
    try {
      console.log('Loading fresh content from database to cache...');
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
      
      // Set the updated content to cache
      this.cacheService.setCache(content);
      console.log('Content cache updated successfully with fresh data');
    } catch (error) {
      console.error('Error loading content from Supabase:', error);
      // Even if we have an error, set the cache to the default content
      this.cacheService.setCache(defaultContent);
    }
  }
  
  async resetToDefault(): Promise<void> {
    try {
      const success = await databaseService.resetToDefault(defaultContent);
      
      if (success) {
        // Update cache
        this.cacheService.setCache(defaultContent);
        
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
