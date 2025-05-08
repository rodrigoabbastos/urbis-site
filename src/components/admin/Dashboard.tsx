
import AdminLayout from './AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Image, Settings, User, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cmsService } from '@/services/cmsService';
import { useEffect, useState } from 'react';
import { SiteContent } from '@/services/cmsService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(cmsService.getContentSync());
  
  useEffect(() => {
    const loadContent = async () => {
      const fetchedContent = await cmsService.getContent();
      setContent(fetchedContent);
    };
    
    loadContent();
  }, []);
  
  const sections = [
    {
      title: "Hero Section",
      icon: Image,
      description: "Editar o banner principal, título, subtítulo e CTA",
      count: 1,
      path: "/admin/hero"
    },
    {
      title: "Quem Somos",
      icon: User,
      description: "Gerenciar a seção 'Sobre a URBIS'",
      count: 1,
      path: "/admin/about"
    },
    {
      title: "O que Fazemos",
      icon: Settings,
      description: "Gerenciar serviços oferecidos",
      count: content.services.length,
      path: "/admin/services"
    },
    {
      title: "Como Trabalhamos",
      icon: FileText,
      description: "Editar a metodologia e etapas do processo",
      count: content.methodology.steps.length,
      path: "/admin/methodology"
    },
    {
      title: "Projetos",
      icon: Image,
      description: "Gerenciar projetos em destaque",
      count: content.projects.items.length,
      path: "/admin/projects"
    },
    {
      title: "LinkedIn Posts",
      icon: Linkedin,
      description: "Gerenciar publicações do LinkedIn",
      count: content.linkedInPosts ? content.linkedInPosts.length : 0,
      path: "/admin/linkedin"
    },
    {
      title: "Informações de Contato",
      icon: Settings,
      description: "Atualizar dados de contato",
      count: 1,
      path: "/admin/contact"
    }
  ];

  const handleResetContent = () => {
    if (window.confirm("Tem certeza de que deseja redefinir todo o conteúdo para os valores padrão? Esta ação não pode ser desfeita.")) {
      cmsService.resetToDefault();
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-5 bg-gray-50">
              <CardTitle className="flex items-center">
                <section.icon className="h-5 w-5 mr-2 text-urbis-primary" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Itens:</p>
                  <p className="text-3xl font-bold text-urbis-primary">{section.count}</p>
                </div>
                <Button 
                  className="bg-urbis-primary hover:bg-urbis-primary/90"
                  onClick={() => navigate(section.path)}
                >
                  Gerenciar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 border-t pt-6">
        <div className="flex flex-col items-start space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Visualizar site</h3>
            <p className="text-sm text-gray-500 mb-3">
              Veja como está o site com as alterações aplicadas
            </p>
            <Button asChild variant="outline">
              <a href="/" target="_blank">Abrir site</a>
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Redefinir conteúdo</h3>
            <p className="text-sm text-gray-500 mb-3">
              Restaurar todo o conteúdo para os valores padrão
            </p>
            <Button variant="destructive" onClick={handleResetContent}>
              Redefinir tudo
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
