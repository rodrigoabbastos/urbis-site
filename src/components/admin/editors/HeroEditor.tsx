
import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService, HeroContent } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const HeroEditor = () => {
  const [formData, setFormData] = useState<HeroContent>({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    backgroundImage: ''
  });
  
  useEffect(() => {
    const content = cmsService.getContent();
    setFormData(content.hero);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      cmsService.updateHero(formData);
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <AdminLayout title="Hero Section">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              placeholder="Digite o título principal"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Textarea 
              id="subtitle" 
              name="subtitle" 
              value={formData.subtitle} 
              onChange={handleChange}
              placeholder="Digite o subtítulo"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ctaText">Texto do botão CTA</Label>
              <Input 
                id="ctaText" 
                name="ctaText" 
                value={formData.ctaText} 
                onChange={handleChange}
                placeholder="Ex: Fale com um especialista"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaLink">Link do botão CTA</Label>
              <Input 
                id="ctaLink" 
                name="ctaLink" 
                value={formData.ctaLink} 
                onChange={handleChange}
                placeholder="Ex: #contact ou /contato"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundImage">URL da imagem de fundo</Label>
            <Input 
              id="backgroundImage" 
              name="backgroundImage" 
              value={formData.backgroundImage} 
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          {formData.backgroundImage && (
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-2">Prévia da imagem:</p>
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={formData.backgroundImage}
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
        </div>
        
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

export default HeroEditor;
