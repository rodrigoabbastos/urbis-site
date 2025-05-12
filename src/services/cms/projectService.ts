
import { Project } from './types';
import { databaseService } from './database/databaseService';
import { cmsService } from './cmsService';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from '@/lib/uuid';

class ProjectService {
  // Update projects info (title and description)
  async updateProjects(projectsInfo: { title: string; description: string }): Promise<void> {
    try {
      const success = await databaseService.saveProjectsInfo(projectsInfo);
      
      if (!success) {
        throw new Error("Não foi possível salvar as informações de projetos");
      }
      
      console.log('Informações de projetos atualizadas com sucesso');
      
    } catch (error) {
      console.error('Error updating projects info:', error);
      throw error;
    }
  }
  
  // Update a single project
  async updateProject(project: Project): Promise<void> {
    try {
      // Make sure project has an ID
      if (!project.id) {
        project.id = uuidv4();
      }
      
      // Save the project
      const success = await databaseService.saveProject(project);
      
      if (!success) {
        throw new Error("Não foi possível salvar o projeto");
      }
      
      console.log('Projeto salvo com sucesso:', project.id);
      
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }
  
  // Delete a project
  async deleteProject(id: string): Promise<void> {
    try {
      // Delete the project
      const success = await databaseService.deleteProject(id);
      
      if (!success) {
        throw new Error("Não foi possível excluir o projeto");
      }
      
      console.log('Projeto excluído com sucesso:', id);
      
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Save section info using the ContentSaver
  async updateSectionInfo(title: string, description: string): Promise<void> {
    try {
      // Update through cmsService
      await cmsService.updateSectionInfo('projects', title, description);
      
    } catch (error) {
      console.error('Error updating projects section info:', error);
      throw error;
    }
  }
}

export const projectService = new ProjectService();
