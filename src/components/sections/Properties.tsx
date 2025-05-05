
import { useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urban' | 'smart'>('all');
  
  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=992&q=80",
      title: "Plano Diretor Vila Nova",
      description: "Desenvolvimento do plano diretor para o município de Vila Nova, com foco em mobilidade urbana e sustentabilidade.",
      client: "Prefeitura Municipal de Vila Nova",
      year: "2023",
      type: "urban" as const,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      title: "Parque Linear Águas Claras",
      description: "Projeto de requalificação urbana com implementação de parque linear ao longo do Rio Águas Claras.",
      client: "Secretaria de Meio Ambiente",
      year: "2022",
      type: "urban" as const,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Sistema de Monitoramento Integrado",
      description: "Desenvolvimento e implementação de sistema de monitoramento urbano inteligente para segurança e gestão de tráfego.",
      client: "Centro de Operações da Capital",
      year: "2023",
      type: "smart" as const,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Rede de Iluminação Inteligente",
      description: "Projeto de modernização da iluminação pública com tecnologia LED e sistema de gestão remota.",
      client: "Consórcio Cidades Conectadas",
      year: "2022",
      type: "smart" as const,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1587048595573-5f146cc899fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
      title: "Requalificação Centro Histórico",
      description: "Projeto de requalificação e restauro do centro histórico da cidade, incluindo praças e edificações tombadas.",
      client: "Instituto do Patrimônio Histórico",
      year: "2021",
      type: "urban" as const,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Plataforma de Gestão Urbana",
      description: "Desenvolvimento de plataforma digital para gestão integrada de serviços urbanos e atendimento ao cidadão.",
      client: "Prefeitura Municipal da Capital",
      year: "2023",
      type: "smart" as const,
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-navy mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-urbis-darkGray max-w-3xl mx-auto">
            Conheça alguns dos nossos projetos mais inovadores em planejamento urbano e soluções para cidades inteligentes.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-urbis-lightGray rounded-lg p-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-white text-urbis-navy shadow-sm' 
                  : 'text-urbis-darkGray hover:text-urbis-navy'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('urban')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === 'urban' 
                  ? 'bg-white text-urbis-navy shadow-sm' 
                  : 'text-urbis-darkGray hover:text-urbis-navy'
              }`}
            >
              Planejamento Urbano
            </button>
            <button
              onClick={() => setActiveFilter('smart')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === 'smart' 
                  ? 'bg-white text-urbis-navy shadow-sm' 
                  : 'text-urbis-darkGray hover:text-urbis-navy'
              }`}
            >
              Cidades Inteligentes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              client={project.client}
              year={project.year}
              type={project.type}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-urbis-navy text-urbis-navy hover:bg-urbis-navy hover:text-white">
            <a href="#contact">Ver Todos os Projetos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
