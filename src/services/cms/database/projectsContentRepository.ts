
import { supabase } from '@/lib/supabase';
import { typeCastFromJson } from './utils/typeConversion';
import { fromJson, toJson } from '@/services/cms/utils/typeUtils';
import { Json } from '@/integrations/supabase/types';
import { mainContentRepository } from './mainContentRepository';

// Repository for project specific content management
class ProjectsContentRepository {
  // Add fetchProjectsInfo function
  async fetchProjectsInfo() {
    try {
      const content = await mainContentRepository.fetchMainContent();
      if (content && content.projects) {
        // Get projects data with safe type handling
        const projectsJson = content.projects as Json;
        
        // Use explicit default shape to guide type inference
        const defaultProjectsData = { title: '', description: '' };
        const projectsData = fromJson(defaultProjectsData, projectsJson);
        
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
      const defaultProjectsData = { items: [] as any[] };
      const projectsJson = content.projects || toJson(defaultProjectsData);
      
      // Convert JSON to a properly typed object
      const projects = fromJson(defaultProjectsData, projectsJson);
      
      // Now we can safely update properties
      const updatedProjects = {
        ...projects,
        title: projectsInfo.title,
        description: projectsInfo.description
      };
      
      // Convert our updated content back to the database format
      const updatedContent = {
        ...content,
        projects: toJson(updatedProjects)
      };
      
      // We need to use fromJson here to convert back to the domain model
      // before saving through saveContent which will handle the conversion to Json
      const contentToSave = {
        hero: fromJson(updatedContent.hero, {}),
        about: fromJson(updatedContent.about, {}),
        services: fromJson(updatedContent.services, []),
        methodology: fromJson(updatedContent.methodology, {}),
        projects: updatedProjects,
        contact: fromJson(updatedContent.contact, {}),
        clients: fromJson(updatedContent.clients, {}),
        ebooks: fromJson(updatedContent.ebooks, {}),
        sectionVisibility: fromJson(
          updatedContent.section_visibility || updatedContent.sectionVisibility, 
          {}
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
