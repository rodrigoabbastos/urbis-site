
import React, { useState, useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cmsService } from '@/services/cmsService';
import { SectionVisibility } from '@/services/cms/types';

const SectionVisibilityEditor = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState<SectionVisibility>({
    hero: true,
    about: true,
    clients: true,
    services: true, 
    methodology: true,
    projects: true,
    linkedin: true,
    testimonials: true,
    contact: true,
    ebooks: false
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const content = await cmsService.getContent();
        if (content.sectionVisibility) {
          setVisibility(content.sectionVisibility);
        }
      } catch (error) {
        console.error('Error loading section visibility:', error);
        toast({
          title: 'Erro ao carregar conteúdo',
          description: 'Não foi possível carregar as configurações de visibilidade das seções.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, [toast]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await cmsService.updateSectionVisibility(visibility);
      
      toast({
        title: 'Configurações salvas',
        description: 'As configurações de visibilidade foram salvas com sucesso.',
      });
    } catch (error) {
      console.error('Error saving section visibility:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as configurações.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (section: keyof SectionVisibility) => {
    setVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    { key: 'hero' as const, label: 'Banner Principal (Hero)' },
    { key: 'about' as const, label: 'Quem Somos' },
    { key: 'clients' as const, label: 'Quem Confia na URBIS' },
    { key: 'services' as const, label: 'O que Fazemos' },
    { key: 'methodology' as const, label: 'Como Trabalhamos' },
    { key: 'projects' as const, label: 'Projetos' },
    { key: 'linkedin' as const, label: 'LinkedIn' },
    { key: 'testimonials' as const, label: 'Depoimentos' },
    { key: 'contact' as const, label: 'Contato' },
    { key: 'ebooks' as const, label: 'E-books' },
  ];

  return (
    <AdminLayout title="Visibilidade das Seções">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}>
        <Card>
          <CardHeader>
            <CardTitle>Configurar Seções Visíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sections.map((section) => (
                <div 
                  key={section.key} 
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <Label htmlFor={`visibility-${section.key}`} className="font-medium">
                    {section.label}
                  </Label>
                  <Switch
                    id={`visibility-${section.key}`}
                    checked={visibility[section.key]}
                    onCheckedChange={() => handleToggle(section.key)}
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-6">
                Use estas opções para controlar quais seções serão exibidas no site. 
                Seções desativadas não serão visíveis para os visitantes, mas você ainda pode editar seu conteúdo.
              </p>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
};

export default SectionVisibilityEditor;
