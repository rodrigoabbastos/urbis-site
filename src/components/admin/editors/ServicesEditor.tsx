import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService, Service } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service>({
    id: '',
    icon: '',
    title: '',
    description: '',
    detailedDescription: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await cmsService.getContent();
      setServices(content.services);
    };
    
    loadContent();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddService = () => {
    setIsEditing(false);
    setCurrentService({
      id: Date.now().toString(),
      icon: 'FileText',
      title: '',
      description: '',
      detailedDescription: ''
    });
    setIsDialogOpen(true);
  };
  
  const handleEditService = (service: Service) => {
    setIsEditing(true);
    setCurrentService(service);
    setIsDialogOpen(true);
  };
  
  const handleDeleteService = (id: string) => {
    if (window.confirm("Tem certeza de que deseja excluir este serviço?")) {
      try {
        cmsService.deleteService(id);
        setServices(prev => prev.filter(service => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o serviço.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleSaveService = () => {
    if (!currentService.title || !currentService.description) {
      toast({
        title: "Erro",
        description: "Título e descrição são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      cmsService.updateService(currentService);
      
      setServices(prev => {
        const index = prev.findIndex(s => s.id === currentService.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = currentService;
          return updated;
        } else {
          return [...prev, currentService];
        }
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o serviço.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AdminLayout title="Serviços">
      <div className="mb-6">
        <Button 
          onClick={handleAddService}
          className="bg-urbis-primary hover:bg-urbis-primary/90 items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar novo serviço
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="line-clamp-2 text-muted-foreground mb-2">{service.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="font-medium">Ícone:</span>
                <span className="ml-1">{service.icon}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-3 flex justify-between border-t">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleEditService(service)}
              >
                <Pencil className="h-4 w-4 mr-1" /> Editar
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDeleteService(service.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Serviço' : 'Adicionar Serviço'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do serviço</Label>
              <Input 
                id="title"
                name="title"
                value={currentService.title}
                onChange={handleInputChange}
                placeholder="Ex: Estudos de Viabilidade Urbanística"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Nome do ícone</Label>
              <Input 
                id="icon"
                name="icon"
                value={currentService.icon}
                onChange={handleInputChange}
                placeholder="Ex: FileSearch, Building, FileCheck, etc."
              />
              <p className="text-xs text-muted-foreground">
                Opções: FileSearch, Building2, FileCheck, FileLock, Building, LineChart, FileText, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição curta</Label>
              <Textarea 
                id="description"
                name="description"
                value={currentService.description}
                onChange={handleInputChange}
                placeholder="Breve descrição do serviço"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Descrição detalhada</Label>
              <Textarea 
                id="detailedDescription"
                name="detailedDescription"
                value={currentService.detailedDescription}
                onChange={handleInputChange}
                placeholder="Explicação mais detalhada do serviço"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-urbis-primary hover:bg-urbis-primary/90" onClick={handleSaveService}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ServicesEditor;
