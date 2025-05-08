
import { toast } from '@/components/ui/use-toast';
import { SiteContent, HeroContent, AboutContent, Service, MethodologyStep, ContactInfo } from './types';
import { defaultContent } from './defaultContent';
import { databaseService } from './databaseService';
import { linkedInService } from './linkedInService';
import { projectService } from './projectService';
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
        // Use safe property access with type assertion
        content.hero = mainContent.hero as HeroContent || content.hero;
        content.about = mainContent.about as AboutContent || content.about;
        content.services = mainContent.services as Service[] || content.services;
        content.methodology = mainContent.methodology || content.methodology;
        content.contact = mainContent.contact as ContactInfo || content.contact;
      }
      
      // Get projects info
      const projectsInfo = await databaseService.fetchProjectsInfo();
      
      if (projectsInfo) {
        // Use safe property access with type assertion
        content.projects.title = projectsInfo.title as string || content.projects.title;
        content.projects.description = projectsInfo.description as string || content.projects.description;
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
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
    }
  }
  
  async updateHero(hero: HeroContent): Promise<void> {
    try {
      const content = await this.getContent();
      content.hero = hero;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Hero atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating hero:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo do Hero.",
        variant: "destructive",
      });
    }
  }
  
  async updateAbout(about: AboutContent): Promise<void> {
    try {
      const content = await this.getContent();
      content.about = about;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Sobre atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating about:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo da seção Sobre.",
        variant: "destructive",
      });
    }
  }
  
  async updateService(service: Service): Promise<void> {
    try {
      const content = await this.getContent();
      const index = content.services.findIndex(s => s.id === service.id);
      
      if (index !== -1) {
        content.services[index] = service;
      } else {
        content.services.push(service);
      }
      
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Serviço atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o serviço.",
        variant: "destructive",
      });
    }
  }
  
  async deleteService(id: string): Promise<void> {
    try {
      const content = await this.getContent();
      content.services = content.services.filter(s => s.id !== id);
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Serviço excluído com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o serviço.",
        variant: "destructive",
      });
    }
  }
  
  async updateMethodology(methodology: typeof defaultContent.methodology): Promise<void> {
    try {
      const content = await this.getContent();
      content.methodology = methodology;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Metodologia atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating methodology:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo da seção Metodologia.",
        variant: "destructive",
      });
    }
  }
  
  async updateMethodologyStep(step: MethodologyStep): Promise<void> {
    try {
      const content = await this.getContent();
      const index = content.methodology.steps.findIndex(s => s.id === step.id);
      
      if (index !== -1) {
        content.methodology.steps[index] = step;
      } else {
        content.methodology.steps.push(step);
      }
      
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Etapa da metodologia atualizada com sucesso!",
      });
    } catch (error) {
      console.error('Error updating methodology step:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a etapa da metodologia.",
        variant: "destructive",
      });
    }
  }
  
  async deleteMethodologyStep(id: string): Promise<void> {
    try {
      const content = await this.getContent();
      content.methodology.steps = content.methodology.steps.filter(s => s.id !== id);
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Etapa da metodologia excluída com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting methodology step:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a etapa da metodologia.",
        variant: "destructive",
      });
    }
  }
  
  async updateProjects(projects: typeof defaultContent.projects): Promise<void> {
    return projectService.updateProjects({
      title: projects.title,
      description: projects.description
    });
  }
  
  async updateProject(project: any): Promise<void> {
    return projectService.updateProject(project);
  }
  
  async deleteProject(id: string): Promise<void> {
    return projectService.deleteProject(id);
  }
  
  async updateContactInfo(contact: ContactInfo): Promise<void> {
    try {
      const content = await this.getContent();
      content.contact = contact;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Informações de contato atualizadas com sucesso!",
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as informações de contato.",
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
  
  async updateLinkedInPost(post: LinkedInPost): Promise<void> {
    return linkedInService.updateLinkedInPost(post);
  }
  
  async deleteLinkedInPost(id: string): Promise<void> {
    return linkedInService.deleteLinkedInPost(id);
  }
  
  async getLinkedInPosts(): Promise<LinkedInPost[]> {
    return linkedInService.getLinkedInPosts();
  }
}

// Create an instance and export it
export const cmsService = new CMSService();
