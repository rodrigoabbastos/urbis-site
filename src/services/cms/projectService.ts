
import { Project } from './types';
import { toast } from '@/components/ui/use-toast';
import { databaseService } from './database/databaseService';

export class ProjectService {
  async updateProjects(projects: { title: string; description: string }): Promise<void> {
    try {
      const success = await databaseService.saveProjectsInfo(projects);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Conteúdo da seção Projetos atualizado com sucesso!",
        });
      } else {
        throw new Error('Falha ao salvar informações dos projetos');
      }
    } catch (error) {
      console.error('Error updating projects:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo da seção Projetos.",
        variant: "destructive",
      });
    }
  }

  async updateProject(project: Project): Promise<void> {
    try {
      const success = await databaseService.saveProject(project);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Projeto atualizado com sucesso!",
        });
      } else {
        throw new Error('Falha ao salvar projeto');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o projeto.",
        variant: "destructive",
      });
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      const success = await databaseService.deleteProject(id);
      
      if (success) {
        toast({
          title: "Sucesso",
          description: "Projeto excluído com sucesso!",
        });
      } else {
        throw new Error('Falha ao excluir projeto');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto.",
        variant: "destructive",
      });
    }
  }
}

export const projectService = new ProjectService();
