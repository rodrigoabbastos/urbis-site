
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { AboutContent } from '@/services/cms/types';
import { cmsService } from '@/services/cms/cmsService';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AboutDescriptions from './AboutDescriptions';
import AboutFeatures from './AboutFeatures';
import ImagePreview from './ImagePreview';

interface AboutFormProps {
  initialData: AboutContent;
  onRefresh: () => void;
}

const AboutForm = ({ initialData, onRefresh }: AboutFormProps) => {
  const [formData, setFormData] = useState<AboutContent>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDescriptionChange = (descriptions: string[]) => {
    setFormData(prev => ({ ...prev, description: descriptions }));
  };
  
  const handleFeatureChange = (features: string[]) => {
    setFormData(prev => ({ ...prev, features: features }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty descriptions and features
    const filteredData = {
      ...formData,
      description: formData.description.filter(desc => desc.trim() !== ''),
      features: formData.features.filter(feat => feat.trim() !== '')
    };
    
    try {
      setIsSaving(true);
      console.log('Saving about content:', filteredData);
      await cmsService.updateAbout(filteredData);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Sobre atualizado com sucesso!",
      });
      
      // Navigate to preview after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error saving about content:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
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
      
      <AboutDescriptions 
        descriptions={formData.description} 
        onDescriptionChange={handleDescriptionChange}
      />
      
      <AboutFeatures 
        features={formData.features} 
        onFeaturesChange={handleFeatureChange}
      />
      
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
      
      <ImagePreview imageUrl={formData.image} />
      
      <div className="flex items-center gap-4">
        <Button 
          type="submit" 
          className="bg-urbis-primary hover:bg-urbis-primary/90"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Salvando...
            </>
          ) : (
            'Salvar alterações'
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate('/admin')}
          disabled={isSaving}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default AboutForm;
