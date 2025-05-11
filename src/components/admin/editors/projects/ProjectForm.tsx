
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Project } from '@/services/cmsService';

interface ProjectFormProps {
  project: Project;
  isEditing: boolean;
  onClose: () => void;
  onSave: (project: Project) => Promise<void>;
}

const ProjectForm = ({ project, isEditing, onClose, onSave }: ProjectFormProps) => {
  const [currentProject, setCurrentProject] = useState<Project>(project);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (value: 'urban' | 'smart') => {
    setCurrentProject(prev => ({ ...prev, type: value }));
  };
  
  const handleSaveProject = async () => {
    if (!currentProject.title || !currentProject.description || !currentProject.image) {
      toast({
        title: "Erro",
        description: "Título, descrição e imagem são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSaving(true);
      await onSave(currentProject);
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o projeto.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Editar Projeto' : 'Adicionar Projeto'}</DialogTitle>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Nome do projeto</Label>
          <Input 
            id="title"
            name="title"
            value={currentProject.title}
            onChange={handleInputChange}
            placeholder="Ex: Residencial Parque das Águas"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">URL da imagem</Label>
          <Input 
            id="image"
            name="image"
            value={currentProject.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {currentProject.image && (
          <div className="h-40 overflow-hidden rounded-md border">
            <img 
              src={currentProject.image} 
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Imagem+não+encontrada";
              }}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea 
            id="description"
            name="description"
            value={currentProject.description}
            onChange={handleInputChange}
            placeholder="Descrição do projeto"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">Cliente</Label>
            <Input 
              id="client"
              name="client"
              value={currentProject.client}
              onChange={handleInputChange}
              placeholder="Ex: Incorporadora XYZ"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input 
              id="year"
              name="year"
              value={currentProject.year}
              onChange={handleInputChange}
              placeholder="Ex: 2023"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="link">Link (opcional)</Label>
          <Input 
            id="link"
            name="link"
            value={currentProject.link || ''}
            onChange={handleInputChange}
            placeholder="Ex: https://example.com/projeto"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Tipo de projeto</Label>
          <RadioGroup 
            value={currentProject.type} 
            onValueChange={(value: 'urban' | 'smart') => handleTypeChange(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urban" id="urban" />
              <Label htmlFor="urban">Planejamento Urbano</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="smart" id="smart" />
              <Label htmlFor="smart">Cidade Inteligente</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={isSaving}>
          Cancelar
        </Button>
        <Button 
          className="bg-urbis-primary hover:bg-urbis-primary/90" 
          onClick={handleSaveProject}
          disabled={isSaving}
        >
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ProjectForm;
