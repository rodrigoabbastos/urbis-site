
import { SiteContent } from '../types';
import { toast } from '@/components/ui/use-toast';
import { ContentDatabaseService } from './contentService';
import { ProjectsDatabaseService } from './projectsService';
import { LinkedInDatabaseService } from './linkedInService';
import { supabaseHelper } from './supabaseHelper';

export class MigrationService {
  private contentService: ContentDatabaseService;
  private projectsService: ProjectsDatabaseService;
  private linkedInService: LinkedInDatabaseService;
  
  constructor() {
    this.contentService = new ContentDatabaseService();
    this.projectsService = new ProjectsDatabaseService();
    this.linkedInService = new LinkedInDatabaseService();
  }
  
  async migrateFromLocalStorage(localContent: SiteContent, storageKey: string) {
    try {
      // Check if we have content in Supabase
      const existingContent = await this.contentService.fetchMainContent();
        
      // If no content exists in Supabase, insert from localStorage
      if (!existingContent) {
        console.log('No existing content in Supabase, migrating from localStorage');
        
        // Store main content
        const { hero, about, services, methodology, contact } = localContent;
        await this.contentService.saveMainContent({ hero, about, services, methodology, contact });
        
        // Store projects info
        await this.projectsService.saveProjectsInfo({
          title: localContent.projects.title,
          description: localContent.projects.description
        });
        
        // Store individual projects
        if (localContent.projects.items.length > 0) {
          console.log(`Migrating ${localContent.projects.items.length} projects from localStorage`);
          for (const project of localContent.projects.items) {
            await this.projectsService.saveProject(project);
          }
        }
        
        // Store LinkedIn posts
        if (localContent.linkedInPosts && localContent.linkedInPosts.length > 0) {
          console.log(`Migrating ${localContent.linkedInPosts.length} LinkedIn posts from localStorage`);
          for (const post of localContent.linkedInPosts) {
            await this.linkedInService.saveLinkedInPost(post);
          }
        }
        
        // Clear localStorage after successful migration
        localStorage.removeItem(storageKey);
        
        toast({
          title: "Migração concluída",
          description: "Os dados foram migrados com sucesso para o Supabase.",
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error migrating data from localStorage:', error);
      toast({
        title: "Erro na migração",
        description: "Não foi possível migrar os dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    }
  }

  async resetToDefault(defaultData: SiteContent) {
    try {
      console.log('Resetting database to default values...');
      
      // Reset main content
      const { hero, about, services, methodology, contact } = defaultData;
      await this.contentService.saveMainContent({ hero, about, services, methodology, contact });
      
      // Reset projects info
      await this.projectsService.saveProjectsInfo({
        title: defaultData.projects.title,
        description: defaultData.projects.description
      });
      
      // Reset projects - first delete all existing projects
      await supabaseHelper.from('projects')
        .delete()
        .neq('id', '0');
      
      // Then insert default projects
      for (const project of defaultData.projects.items) {
        await this.projectsService.saveProject(project);
      }
      
      // Reset LinkedIn posts - first delete all existing posts
      await supabaseHelper.from('linkedin_posts')
        .delete()
        .neq('id', '0');
      
      // Then insert default posts
      if (defaultData.linkedInPosts && defaultData.linkedInPosts.length > 0) {
        for (const post of defaultData.linkedInPosts) {
          await this.linkedInService.saveLinkedInPost(post);
        }
      }
      
      console.log('Database reset to default values completed');
      return true;
    } catch (error) {
      console.error('Error resetting to default:', error);
      return false;
    }
  }
}
