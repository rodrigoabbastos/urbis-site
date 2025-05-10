
import { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService } from '@/services/cms/cmsService';
import { AboutContent } from '@/services/cms/types';
import { toast } from '@/components/ui/use-toast';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AboutForm from './about/AboutForm';

const AboutEditor = () => {
  const [formData, setFormData] = useState<AboutContent>({
    title: '',
    description: [''],
    features: [''],
    image: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const loadContent = async () => {
    try {
      setIsLoading(true);
      // Force fresh content load from database
      const content = await cmsService.getContent();
      if (content.about) {
        console.log('Loaded about content:', content.about);
        setFormData(content.about);
      }
    } catch (error) {
      console.error('Error loading about content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o conteúdo da seção Sobre.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);
  
  if (isLoading) {
    return (
      <AdminLayout title="Sobre a URBIS">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-urbis-primary" />
          <span className="ml-2 text-lg">Carregando conteúdo...</span>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title="Sobre a URBIS">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Editar seção "Quem Somos"</h2>
        <Button 
          variant="outline" 
          onClick={loadContent} 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Recarregar conteúdo
        </Button>
      </div>
      
      <AboutForm initialData={formData} onRefresh={loadContent} />
    </AdminLayout>
  );
};

export default AboutEditor;
