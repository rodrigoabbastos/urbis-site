
import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService, Project } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

const ProjectsEditor = () => {
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
  
  useEffect(() => {
    loadContent();
  }, []);
  
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
  
  const handleSaveSection = async () => {
    if (!title) {
      toast({
        title: "Erro",
        description: "O título da seção é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await cmsService.updateProjects({
        title,
        description,
        items: projects
      });
      
      toast({
        title: "Sucesso",
        description: "Informações da seção atualizadas com sucesso!",
      });
    } catch (error) {
      console.error('Error saving projects section:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTypeChange = (value: 'urban' | 'smart') => {
    setCurrentProject(prev => ({ ...prev, type: value }));
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
      await cmsService.updateProject(currentProject);
      setIsDialogOpen(false);
      await loadContent();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o projeto.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout title="Projetos">
        <div className="flex justify-center p-8">
          <p>Carregando projetos...</p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Projetos">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg">
          <h2 className="text-lg font-medium">Informações da Seção</h2>
          
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Título da seção</Label>
            <Input 
              id="sectionTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Projetos em destaque"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Descrição da seção</Label>
            <Textarea 
              id="sectionDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição sobre os projetos"
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleSaveSection}
            className="w-fit"
          >
            Salvar informações da seção
          </Button>
        </div>
        
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Lista de Projetos</h2>
            <Button 
              onClick={() => {
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
              }}
              className="bg-urbis-primary hover:bg-urbis-primary/90 items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Adicionar projeto
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.length > 0 ? projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
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
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentProject(project);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir
                  </Button>
                </CardFooter>
              </Card>
            )) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Nenhum projeto foi adicionado ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Residencial Parque das Águas"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">URL da imagem</Label>
              <Input 
                id="image"
                name="image"
                value={currentProject.image}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, image: e.target.value }))}
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
                onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
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
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, client: e.target.value }))}
                  placeholder="Ex: Incorporadora XYZ"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Ano</Label>
                <Input 
                  id="year"
                  name="year"
                  value={currentProject.year}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="Ex: 2023"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de projeto</Label>
              <RadioGroup 
                value={currentProject.type} 
                onValueChange={(value: 'urban' | 'smart') => setCurrentProject(prev => ({ ...prev, type: value }))}
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-urbis-primary hover:bg-urbis-primary/90" onClick={handleSaveProject}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ProjectsEditor;
