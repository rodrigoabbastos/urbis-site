import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService, AboutContent } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AboutEditor = () => {
  const [formData, setFormData] = useState<AboutContent>({
    title: '',
    description: [''],
    features: [''],
    image: ''
  });
  
  useEffect(() => {
    const loadContent = async () => {
      const content = await cmsService.getContent();
      setFormData(content.about);
    };
    
    loadContent();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...formData.description];
    updatedDescriptions[index] = value;
    setFormData(prev => ({ ...prev, description: updatedDescriptions }));
  };
  
  const addDescription = () => {
    setFormData(prev => ({ ...prev, description: [...prev.description, ''] }));
  };
  
  const removeDescription = (index: number) => {
    const updatedDescriptions = formData.description.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, description: updatedDescriptions }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty descriptions and features
    const filteredData = {
      ...formData,
      description: formData.description.filter(desc => desc.trim() !== ''),
      features: formData.features.filter(feat => feat.trim() !== '')
    };
    
    try {
      cmsService.updateAbout(filteredData);
    } catch (error) {
      console.error('Error saving about content:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AdminLayout title="Sobre a URBIS">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título da seção</Label>
          <Input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            placeholder="Ex: Quem somos"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Parágrafos de descrição</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addDescription}
              className="h-8 gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Adicionar parágrafo</span>
            </Button>
          </div>
          
          <ScrollArea className="h-64 rounded-md border p-4">
            <div className="space-y-4">
              {formData.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea 
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    placeholder="Digite o parágrafo"
                    className="min-h-[80px]"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeDescription(index)}
                    className="h-8 px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Características/Diferenciais</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addFeature}
              className="h-8 gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Adicionar característica</span>
            </Button>
          </div>
          
          <ScrollArea className="h-64 rounded-md border p-4">
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Ex: Expertise em urbanismo"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeFeature(index)}
                    className="h-10 px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">URL da imagem</Label>
          <Input 
            id="image" 
            name="image" 
            value={formData.image} 
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {formData.image && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-2">Prévia da imagem:</p>
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=Imagem+não+encontrada";
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        <Button 
          type="submit" 
          className="bg-urbis-primary hover:bg-urbis-primary/90"
        >
          Salvar alterações
        </Button>
      </form>
    </AdminLayout>
  );
};

export default AboutEditor;
