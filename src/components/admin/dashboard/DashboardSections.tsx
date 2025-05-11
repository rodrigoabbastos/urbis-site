
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, Image, Settings, User, Linkedin, Layout, BookOpen, Users, 
  LayoutDashboard, MessageSquare, Bell, Eye, Settings2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SiteContent } from '@/services/cmsService';

interface DashboardSectionProps {
  content: SiteContent;
}

const DashboardSections = ({ content }: DashboardSectionProps) => {
  const navigate = useNavigate();
  
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
      title: "Quem Confia na URBIS",
      icon: Users,
      description: "Gerenciar logotipos de clientes",
      count: content.clients ? content.clients.logos.length : 0,
      path: "/admin/clients"
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
      title: "E-books",
      icon: BookOpen,
      description: "Gerenciar e-books para download",
      count: content.ebooks ? content.ebooks.items.length : 0,
      path: "/admin/ebooks"
    },
    {
      title: "Informações de Contato",
      icon: Settings,
      description: "Atualizar dados de contato",
      count: 1,
      path: "/admin/contact"
    },
    {
      title: "Visibilidade das Seções",
      icon: Layout,
      description: "Configurar quais seções serão exibidas no site",
      count: Object.keys(content.sectionVisibility || {}).length,
      path: "/admin/visibility"
    }
  ];

  return (
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
  );
};

export default DashboardSections;
