
import React from 'react';
import AdminLayout from '../AdminLayout';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cmsService } from '@/services/cmsService';
import { useState, useEffect } from 'react';

const HeroEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    ctaText: "",
    ctaUrl: "",
    backgroundImage: ""
  });
  
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const content = await cmsService.getContent();
        if (content && content.hero) {
          setHeroData(content.hero);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os dados do Hero.",
        });
      }
    };
    
    fetchHeroData();
  }, [toast]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await cmsService.updateHeroSection(heroData);
      toast({
        title: "Sucesso!",
        description: "Seção Hero atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Error updating hero section:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar a seção Hero.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminLayout title="Hero Section">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <Input 
              id="title"
              name="title"
              value={heroData.title}
              onChange={handleChange}
              placeholder="Título principal do Hero"
            />
          </div>
          
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo
            </label>
            <Textarea 
              id="subtitle"
              name="subtitle"
              value={heroData.subtitle}
              onChange={handleChange}
              placeholder="Subtítulo ou descrição breve"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700 mb-1">
                Texto do Botão CTA
              </label>
              <Input 
                id="ctaText"
                name="ctaText"
                value={heroData.ctaText}
                onChange={handleChange}
                placeholder="Ex: Fale Conosco"
              />
            </div>
            
            <div>
              <label htmlFor="ctaUrl" className="block text-sm font-medium text-gray-700 mb-1">
                URL do Botão CTA
              </label>
              <Input 
                id="ctaUrl"
                name="ctaUrl"
                value={heroData.ctaUrl}
                onChange={handleChange}
                placeholder="Ex: /contato"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700 mb-1">
              Imagem de Fundo (URL)
            </label>
            <Input 
              id="backgroundImage"
              name="backgroundImage"
              value={heroData.backgroundImage}
              onChange={handleChange}
              placeholder="URL da imagem de fundo"
            />
            {heroData.backgroundImage && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img 
                  src={heroData.backgroundImage} 
                  alt="Hero Background Preview" 
                  className="max-h-32 rounded-md object-cover" 
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default HeroEditor;
