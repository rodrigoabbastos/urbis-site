
import { toast } from '@/components/ui/use-toast';
import { SiteContent, HeroContent, AboutContent, Service, MethodologyStep, ContactInfo, Project } from './types';
import { defaultContent } from './defaultContent';
import { databaseService } from './database/databaseService';
import { linkedInService } from './linkedInService';
import { projectService } from './projectService';
import { contentService } from './ContentService';
import { serviceManagementService } from './ServiceManagementService';
import { LinkedInPost } from '@/components/linkedin/types';

class CMSService {
  private readonly STORAGE_KEY = 'urbis_cms_content';
  private contentCache: SiteContent | null = null;
  
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
  
  private getLocalContent(): SiteContent | null {
    try {
      const content = localStorage.getItem(this.STORAGE_KEY);
      return content ? JSON.parse(content) : null;
    } catch (error) {
      console.error('Error retrieving local content:', error);
      return null;
    }
  }
  
  private async loadContentToCache() {
    try {
      const content: SiteContent = { ...defaultContent };
      
      // Get main content
      const mainContent = await databaseService.fetchMainContent();
      
      if (mainContent) {
        // Use safe property access with fallback to default content
        if (mainContent.hero) content.hero = mainContent.hero as HeroContent;
        if (mainContent.about) content.about = mainContent.about as AboutContent;
        if (mainContent.services) content.services = mainContent.services as Service[];
        if (mainContent.methodology) content.methodology = mainContent.methodology as typeof defaultContent.methodology;
        if (mainContent.contact) content.contact = mainContent.contact as ContactInfo;
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
        content.projects.items = projects as Project[];
        console.log('Projects loaded:', projects.length);
      } else {
        console.log('No projects found in database, using default content');
      }
      
      // Get LinkedIn posts
      const linkedInPosts = await databaseService.fetchLinkedInPosts();
      
      if (linkedInPosts && linkedInPosts.length > 0) {
        content.linkedInPosts = linkedInPosts as LinkedInPost[];
        console.log('LinkedIn posts loaded:', linkedInPosts.length);
      } else {
        console.log('No LinkedIn posts found in database, using default content');
      }
      
      this.contentCache = content;
      console.log('Content cache updated successfully');
    } catch (error) {
      console.error('Error loading content from Supabase:', error);
      // Even if we have an error, set the cache to the default content
      this.contentCache = defaultContent;
    }
  }
  
  async getContent(): Promise<SiteContent> {
    if (!this.contentCache) {
      console.log('Content cache not initialized, loading from database');
      await this.loadContentToCache();
    } else {
      console.log('Using existing content cache');
    }
    return this.contentCache || defaultContent;
  }
  
  // Método síncrono que retorna o conteúdo em cache ou o conteúdo padrão
  getContentSync(): SiteContent {
    console.log('getContentSync called, cache status:', this.contentCache ? 'has cache' : 'no cache');
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
  
  // Delegate methods to specialized services
  updateHero(hero: HeroContent): Promise<void> {
    return contentService.updateHero(hero);
  }
  
  updateAbout(about: AboutContent): Promise<void> {
    return contentService.updateAbout(about);
  }
  
  updateService(service: Service): Promise<void> {
    return serviceManagementService.updateService(service);
  }
  
  deleteService(id: string): Promise<void> {
    return serviceManagementService.deleteService(id);
  }
  
  updateMethodology(methodology: typeof defaultContent.methodology): Promise<void> {
    return contentService.updateMethodology(methodology);
  }
  
  updateMethodologyStep(step: MethodologyStep): Promise<void> {
    return contentService.updateMethodologyStep(step);
  }
  
  deleteMethodologyStep(id: string): Promise<void> {
    return contentService.deleteMethodologyStep(id);
  }
  
  updateProjects(projects: typeof defaultContent.projects): Promise<void> {
    return projectService.updateProjects({
      title: projects.title,
      description: projects.description
    });
  }
  
  updateProject(project: Project): Promise<void> {
    return projectService.updateProject(project);
  }
  
  deleteProject(id: string): Promise<void> {
    return projectService.deleteProject(id);
  }
  
  updateContactInfo(contact: ContactInfo): Promise<void> {
    return contentService.updateContactInfo(contact);
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
  
  updateLinkedInPost(post: LinkedInPost): Promise<void> {
    return linkedInService.updateLinkedInPost(post);
  }
  
  deleteLinkedInPost(id: string): Promise<void> {
    return linkedInService.deleteLinkedInPost(id);
  }
  
  getLinkedInPosts(): Promise<LinkedInPost[]> {
    return linkedInService.getLinkedInPosts();
  }
}

// Create an instance and export it
export const cmsService = new CMSService();
