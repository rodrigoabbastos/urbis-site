
import { supabase } from '@/lib/supabase';
import { typeCastFromJson } from './utils/typeConversion';
import { fromJson, toJson } from '@/services/cms/utils/typeUtils';
import { Json } from '@/integrations/supabase/types';
import { mainContentRepository } from './mainContentRepository';
import { defaultContent } from '../defaultContent';

// Repository for project specific content management
class ProjectsContentRepository {
  // Add fetchProjectsInfo function
  async fetchProjectsInfo() {
    try {
      const content = await mainContentRepository.fetchMainContent();
      if (content && content.projects) {
        // Get projects data with safe type handling
        const projectsJson = content.projects as Json;
        
        // Define interface for proper type safety
        interface ProjectsInfo {
          title: string;
          description: string;
        }
        
        // Create a strongly typed default
        const defaultData: ProjectsInfo = { title: '', description: '' };
        
        // Convert JSON to typed object safely
        const projectsData = fromJson<ProjectsInfo>(projectsJson, defaultData);
        
        return {
          title: projectsData.title || '',
          description: projectsData.description || ''
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching projects info:', error);
      return null;
    }
  }

  // Add saveProjectsInfo function
  async saveProjectsInfo(projectsInfo: { title: string; description: string }): Promise<boolean> {
    try {
      const content = await mainContentRepository.fetchMainContent();
      if (!content) return false;
      
      // Use proper type conversion when working with JSON data
      interface ProjectsData {
        items: any[];
        title?: string;
        description?: string;
      }
      
      const defaultProjectsData: ProjectsData = { items: [] };
      const projectsJson = content.projects || toJson(defaultProjectsData);
      
      // Convert JSON to a properly typed object
      const projects = fromJson<ProjectsData>(projectsJson, defaultProjectsData);
      
      // Now we can safely update properties
      const updatedProjects: ProjectsData = {
        items: projects.items || [],
        title: projectsInfo.title,
        description: projectsInfo.description
      };
      
      // Convert our updated content back to the database format
      const updatedContent = {
        ...content,
        projects: toJson(updatedProjects)
      };
      
      // Convert data back to domain model before saving
      const contentToSave = {
        hero: fromJson(updatedContent.hero, defaultContent.hero),
        about: fromJson(updatedContent.about, defaultContent.about),
        services: fromJson(updatedContent.services, defaultContent.services),
        methodology: fromJson(updatedContent.methodology, defaultContent.methodology),
        projects: updatedProjects,
        contact: fromJson(updatedContent.contact, defaultContent.contact),
        clients: fromJson(updatedContent.clients, defaultContent.clients),
        ebooks: fromJson(updatedContent.ebooks, defaultContent.ebooks),
        sectionVisibility: fromJson(
          updatedContent.section_visibility || updatedContent.sectionVisibility, 
          defaultContent.sectionVisibility
        )
      };
      
      return await mainContentRepository.saveContent(contentToSave);
    } catch (error) {
      console.error('Error saving projects info:', error);
      return false;
    }
  }
}

export const projectsContentRepository = new ProjectsContentRepository();
// Export the functions bound to the repository instance
export const fetchProjectsInfo = projectsContentRepository.fetchProjectsInfo.bind(projectsContentRepository);
export const saveProjectsInfo = projectsContentRepository.saveProjectsInfo.bind(projectsContentRepository);
