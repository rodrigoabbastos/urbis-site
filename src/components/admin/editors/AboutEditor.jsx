
import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { cmsService } from '@/services/cmsService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus } from 'lucide-react';

const AboutEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState({
    title: "Quem somos",
    description: "",
    secondaryDescription: "",
    features: [],
    image: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await cmsService.getContent();
        if (content && content.about) {
          setAboutData(content.about);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os dados da seção Sobre nós.",
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFeature = () => {
    setAboutData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...aboutData.features];
    newFeatures[index] = value;
    setAboutData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = aboutData.features.filter((_, i) => i !== index);
    setAboutData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await cmsService.updateAbout(aboutData);
      toast({
        title: "Sucesso!",
        description: "Seção Sobre atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Error updating about section:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar a seção Sobre.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Seção Sobre">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <Input
              id="title"
              name="title"
              value={aboutData.title}
              onChange={handleChange}
              placeholder="Título da seção Sobre"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Principal
            </label>
            <Textarea
              id="description"
              name="description"
              value={aboutData.description}
              onChange={handleChange}
              placeholder="Descrição principal sobre a empresa"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="secondaryDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Secundária
            </label>
            <Textarea
              id="secondaryDescription"
              name="secondaryDescription"
              value={aboutData.secondaryDescription}
              onChange={handleChange}
              placeholder="Descrição adicional sobre a empresa"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Imagem (URL)
            </label>
            <Input
              id="image"
              name="image"
              value={aboutData.image}
              onChange={handleChange}
              placeholder="URL da imagem"
            />
            {aboutData.image && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img
                  src={aboutData.image}
                  alt="About Preview"
                  className="max-h-32 rounded-md object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x400?text=Imagem+não+encontrada";
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Características
              </label>
              <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                onClick={addFeature}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            
            <div className="space-y-2">
              {aboutData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Característica ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    className="h-10 w-10 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {aboutData.features.length === 0 && (
                <Card>
                  <CardContent className="p-4 text-center text-gray-500">
                    <p>Nenhuma característica adicionada. Clique no botão acima para adicionar.</p>
                  </CardContent>
                </Card>
              )}
            </div>
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

export default AboutEditor;
