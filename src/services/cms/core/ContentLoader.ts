
import { SiteContent } from '../types';
import { defaultContent } from '../defaultContent';
import { databaseService } from '../database/databaseService';
import { Json } from '@/integrations/supabase/types';

// Helper function to safely cast Json to application types
function safeCast<T>(value: any, defaultValue: T): T {
  if (!value) return defaultValue;
  return value as unknown as T;
}

export class ContentLoader {
  async loadContentFromDatabase(): Promise<SiteContent> {
    try {
      console.log('Loading fresh content directly from database...');
      const content: SiteContent = { ...defaultContent };
      
      // Get main content
      const mainContent = await databaseService.fetchMainContent();
      
      if (mainContent) {
        console.log('Main content loaded from database:', mainContent);
        // Use safe property access with fallback to default content
        if (mainContent.hero) content.hero = safeCast(mainContent.hero, defaultContent.hero);
        if (mainContent.about) content.about = safeCast(mainContent.about, defaultContent.about);
        if (mainContent.services) content.services = safeCast(mainContent.services, defaultContent.services);
        if (mainContent.methodology) content.methodology = safeCast(mainContent.methodology, defaultContent.methodology);
        if (mainContent.contact) content.contact = safeCast(mainContent.contact, defaultContent.contact);
        
        // Load new sections
        if (mainContent.clients) {
          console.log('Dados de clientes encontrados:', mainContent.clients);
          content.clients = safeCast(mainContent.clients, defaultContent.clients);
        } else {
          console.log('Nenhum dado de clientes encontrado no banco');
        }
        
        // Check for visibility settings (both camelCase and snake_case)
        if (mainContent.sectionVisibility) {
          console.log('sectionVisibility (camelCase) encontrado:', mainContent.sectionVisibility);
          content.sectionVisibility = safeCast(mainContent.sectionVisibility, defaultContent.sectionVisibility);
        } else if (mainContent.section_visibility) {
          console.log('section_visibility (snake_case) encontrado:', mainContent.section_visibility);
          content.sectionVisibility = safeCast(mainContent.section_visibility, defaultContent.sectionVisibility);
        } else {
          console.log('Nenhuma configuração de visibilidade encontrada no banco');
        }
        
        if (mainContent.ebooks) {
          console.log('Dados de ebooks encontrados');
          content.ebooks = safeCast(mainContent.ebooks, defaultContent.ebooks);
        }
      } else {
        console.log('No main content found in database, using default');
      }
      
      // Get projects info
      const projectsInfo = await databaseService.fetchProjectsInfo();
      
      if (projectsInfo) {
        if (projectsInfo.title) content.projects.title = projectsInfo.title;
        if (projectsInfo.description) content.projects.description = projectsInfo.description;
      }
      
      // Get projects
      const projects = await databaseService.fetchProjects();
      
      if (projects && projects.length > 0) {
        content.projects.items = safeCast(projects, defaultContent.projects.items);
        console.log('Projects loaded:', projects.length);
      } else {
        console.log('No projects found in database, using default content');
      }
      
      // Get LinkedIn posts
      const linkedInPosts = await databaseService.fetchLinkedInPosts();
      
      if (linkedInPosts && linkedInPosts.length > 0) {
        content.linkedInPosts = safeCast(linkedInPosts, defaultContent.linkedInPosts);
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
}
