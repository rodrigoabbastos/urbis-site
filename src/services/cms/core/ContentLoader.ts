
import { SiteContent } from '../types';
import { defaultContent } from '../defaultContent';
import { databaseService } from '../database/databaseService';

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
        if (mainContent.hero) content.hero = mainContent.hero as SiteContent['hero'];
        if (mainContent.about) content.about = mainContent.about as SiteContent['about'];
        if (mainContent.services) content.services = mainContent.services as SiteContent['services'];
        if (mainContent.methodology) content.methodology = mainContent.methodology as SiteContent['methodology'];
        if (mainContent.contact) content.contact = mainContent.contact as SiteContent['contact'];
        
        // Load new sections
        if (mainContent.clients) {
          console.log('Dados de clientes encontrados:', mainContent.clients);
          content.clients = mainContent.clients as SiteContent['clients'];
        } else {
          console.log('Nenhum dado de clientes encontrado no banco');
        }
        
        // Verificar ambos os campos de visibilidade (camelCase e snake_case)
        if (mainContent.sectionVisibility) {
          console.log('sectionVisibility (camelCase) encontrado:', mainContent.sectionVisibility);
          content.sectionVisibility = mainContent.sectionVisibility as SiteContent['sectionVisibility'];
        } else if (mainContent.section_visibility) {
          console.log('section_visibility (snake_case) encontrado:', mainContent.section_visibility);
          content.sectionVisibility = mainContent.section_visibility as SiteContent['sectionVisibility'];
        } else {
          console.log('Nenhuma configuração de visibilidade encontrada no banco');
        }
        
        if (mainContent.ebooks) {
          console.log('Dados de ebooks encontrados');
          content.ebooks = mainContent.ebooks as SiteContent['ebooks'];
        }
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
}
