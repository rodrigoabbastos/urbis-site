
import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService } from '@/services/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const HeroEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    backgroundImage: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        console.log('Carregando conteúdo do Hero para edição...');
        const content = await cmsService.getContent();
        console.log('Conteúdo carregado:', content.hero);
        
        if (content && content.hero) {
          setFormData(content.hero);
        }
      } catch (error) {
        console.error('Erro ao carregar conteúdo do Hero:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o conteúdo do Hero.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      console.log('Salvando alterações do Hero:', formData);
      
      // Obter o conteúdo atual para atualizar apenas o Hero
      const currentContent = await cmsService.getContent();
      
      // Atualizar o Hero no conteúdo
      currentContent.hero = formData;
      
      // Salvar o conteúdo atualizado
      await cmsService.saveContent(currentContent);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo do Hero atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao salvar alterações do Hero:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout title="Hero Section - Carregando...">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-urbis-primary" />
          <span className="ml-2">Carregando dados...</span>
        </div>
      </AdminLayout>
    );
  }
  
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
                      e.target.src = "https://via.placeholder.com/800x450?text=Imagem+não+encontrada";
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
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar alterações'
          )}
        </Button>
      </form>
    </AdminLayout>
  );
};

export default HeroEditor;
