
import { useState, useEffect } from 'react';
import { cmsService, Project } from '@/services/cmsService';
import { toast } from '@/components/ui/use-toast';

export const useProjectsEditor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    id: '',
    image: '',
    title: '',
    description: '',
    client: '',
    year: '',
    type: 'urban'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadContent = async () => {
    try {
      setIsLoading(true);
      const content = await cmsService.getContent();
      
      console.log('ProjectsEditor: Carregando conteúdo de projetos', content.projects);
      
      // Set title and description
      setTitle(content.projects.title || 'Projetos');
      setDescription(content.projects.description || 'Nossos projetos em destaque');
      
      // Set projects
      if (content.projects.items && Array.isArray(content.projects.items)) {
        setProjects(content.projects.items);
      } else {
        console.warn('Itens de projetos não encontrados ou não é um array');
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o conteúdo dos projetos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveSection = async (newTitle: string, newDescription: string) => {
    try {
      await cmsService.updateProjects({
        title: newTitle,
        description: newDescription,
        items: projects
      });
      
      setTitle(newTitle);
      setDescription(newDescription);
      
      toast({
        title: "Sucesso",
        description: "Informações da seção atualizadas com sucesso!",
      });
    } catch (error) {
      console.error('Error saving projects section:', error);
      throw error;
    }
  };
  
  const handleAddProject = () => {
    setIsEditing(false);
    setCurrentProject({
      id: Date.now().toString(),
      image: '',
      title: '',
      description: '',
      client: '',
      year: new Date().getFullYear().toString(),
      type: 'urban'
    });
    setIsDialogOpen(true);
  };
  
  const handleEditProject = (project: Project) => {
    setIsEditing(true);
    setCurrentProject(project);
    setIsDialogOpen(true);
  };
  
  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Tem certeza de que deseja excluir este projeto?")) {
      try {
        await cmsService.deleteProject(id);
        await loadContent();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o projeto.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleSaveProject = async (project: Project) => {
    try {
      await cmsService.updateProject(project);
      setIsDialogOpen(false);
      await loadContent();
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    loadContent();
  }, []);

  return {
    title,
    description,
    projects,
    isLoading,
    isDialogOpen,
    setIsDialogOpen,
    currentProject,
    isEditing,
    handleSaveSection,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleSaveProject,
  };
};
