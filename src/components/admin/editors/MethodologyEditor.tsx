
import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService, MethodologyStep } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const MethodologyEditor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<MethodologyStep[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<MethodologyStep>({
    id: '',
    icon: '',
    title: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const content = cmsService.getContent();
    setTitle(content.methodology.title);
    setDescription(content.methodology.description);
    setSteps(content.methodology.steps);
  }, []);
  
  const handleSaveSection = () => {
    if (!title || !description) {
      toast({
        title: "Erro",
        description: "Título e descrição da seção são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      cmsService.updateMethodology({
        title,
        description,
        steps
      });
      toast({
        title: "Sucesso",
        description: "Informações da seção atualizadas com sucesso!",
      });
    } catch (error) {
      console.error('Error saving methodology section:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentStep(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddStep = () => {
    setIsEditing(false);
    setCurrentStep({
      id: Date.now().toString(),
      icon: 'FileText',
      title: '',
      description: ''
    });
    setIsDialogOpen(true);
  };
  
  const handleEditStep = (step: MethodologyStep) => {
    setIsEditing(true);
    setCurrentStep(step);
    setIsDialogOpen(true);
  };
  
  const handleDeleteStep = (id: string) => {
    if (window.confirm("Tem certeza de que deseja excluir esta etapa?")) {
      try {
        cmsService.deleteMethodologyStep(id);
        setSteps(prev => prev.filter(step => step.id !== id));
      } catch (error) {
        console.error('Error deleting step:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir a etapa.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleSaveStep = () => {
    if (!currentStep.title || !currentStep.description) {
      toast({
        title: "Erro",
        description: "Título e descrição são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      cmsService.updateMethodologyStep(currentStep);
      
      setSteps(prev => {
        const index = prev.findIndex(s => s.id === currentStep.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = currentStep;
          return updated;
        } else {
          return [...prev, currentStep];
        }
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving step:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a etapa.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AdminLayout title="Metodologia">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg">
          <h2 className="text-lg font-medium">Informações da Seção</h2>
          
          <div className="space-y-2">
            <Label htmlFor="sectionTitle">Título da seção</Label>
            <Input 
              id="sectionTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Como Trabalhamos"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sectionDescription">Descrição da seção</Label>
            <Textarea 
              id="sectionDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição da metodologia"
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
            <h2 className="text-lg font-medium">Etapas da Metodologia</h2>
            <Button 
              onClick={handleAddStep}
              className="bg-urbis-primary hover:bg-urbis-primary/90 items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Adicionar etapa
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step) => (
              <Card key={step.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="line-clamp-2 text-muted-foreground mb-2">{step.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="font-medium">Ícone:</span>
                    <span className="ml-1">{step.icon}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 flex justify-between border-t">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditStep(step)}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteStep(step.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Etapa' : 'Adicionar Etapa'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da etapa</Label>
              <Input 
                id="title"
                name="title"
                value={currentStep.title}
                onChange={handleInputChange}
                placeholder="Ex: Análise Inicial do Terreno"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Nome do ícone</Label>
              <Input 
                id="icon"
                name="icon"
                value={currentStep.icon}
                onChange={handleInputChange}
                placeholder="Ex: Search, FileSearch, Shield, etc."
              />
              <p className="text-xs text-muted-foreground">
                Opções: Search, FileSearch, FileCheck, Shield, Construction, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description"
                name="description"
                value={currentStep.description}
                onChange={handleInputChange}
                placeholder="Descrição desta etapa da metodologia"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-urbis-primary hover:bg-urbis-primary/90" onClick={handleSaveStep}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default MethodologyEditor;
