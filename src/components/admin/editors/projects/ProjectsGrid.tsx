
import { Project } from '@/services/cmsService';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  onAddNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectsGrid = ({ projects, onAddNew, onEdit, onDelete }: ProjectsGridProps) => {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Lista de Projetos</h2>
        <Button 
          onClick={onAddNew}
          className="bg-urbis-primary hover:bg-urbis-primary/90 items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar projeto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length > 0 ? 
          projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          )) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Nenhum projeto foi adicionado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsGrid;
