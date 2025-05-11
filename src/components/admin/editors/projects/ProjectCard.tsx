
import { Project } from '@/services/cmsService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Imagem+não+encontrada";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          <p className="text-xs"><span className="font-medium">Cliente:</span> {project.client}</p>
          <p className="text-xs"><span className="font-medium">Ano:</span> {project.year}</p>
          <p className="text-xs"><span className="font-medium">Tipo:</span> {project.type === 'urban' ? 'Planejamento Urbano' : 'Cidade Inteligente'}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(project)}
        >
          <Pencil className="h-4 w-4 mr-1" /> Editar
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-red-500 hover:text-red-600"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
