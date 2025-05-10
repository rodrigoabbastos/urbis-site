
import { SiteContent, HeroContent, AboutContent, Service, MethodologyStep, ContactInfo, Project } from './types';
import { contentService } from './ContentService';
import { serviceManagementService } from './ServiceManagementService';
import { projectService } from './projectService';
import { linkedInService } from './linkedInService';
import { CmsServiceCore } from './CmsServiceCore';
import { cacheService } from './CacheService';
import { LinkedInPost } from '@/components/linkedin/types';

class CMSService {
  private readonly core: CmsServiceCore;
  private readonly STORAGE_KEY = 'urbis_cms_content';
  
  constructor() {
    this.core = new CmsServiceCore(cacheService);
    // Initialize migrations if needed
    this.initializeDatabase();
  }
  
  private async initializeDatabase() {
    try {
      // Check if tables exist, if not create them
      await this.core.loadContentToCache();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
  
  async getContent(): Promise<SiteContent> {
    return this.core.getContent();
  }
  
  // Método síncrono que retorna o conteúdo em cache ou o conteúdo padrão
  getContentSync(): SiteContent {
    return this.core.getContentSync();
  }
  
  async saveContent(content: SiteContent): Promise<void> {
    return this.core.saveContent(content);
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
  
  updateMethodology(methodology: SiteContent['methodology']): Promise<void> {
    return contentService.updateMethodology(methodology);
  }
  
  updateMethodologyStep(step: MethodologyStep): Promise<void> {
    return contentService.updateMethodologyStep(step);
  }
  
  deleteMethodologyStep(id: string): Promise<void> {
    return contentService.deleteMethodologyStep(id);
  }
  
  updateProjects(projects: SiteContent['projects']): Promise<void> {
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
    return this.core.resetToDefault();
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
