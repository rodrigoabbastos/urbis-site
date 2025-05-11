
import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cmsService } from '@/services/cmsService';
import { Helmet } from 'react-helmet-async';
import { Project } from '@/services/cms/types';

const Projects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [projectsTitle, setProjectsTitle] = useState('Projetos de Urbanismo e Loteamentos');
  const [projectsDescription, setProjectsDescription] = useState('Confira alguns dos nossos projetos recentes de desenvolvimento urbano e loteamentos');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        
        console.log('Projects component: Carregando dados do CMS...');
        const content = await cmsService.getContent();
        
        // Set title and description from CMS
        if (content.projects) {
          console.log('Dados de projetos carregados:', content.projects);
          setProjectsTitle(content.projects.title);
          setProjectsDescription(content.projects.description);
          
          // Set projects data
          if (content.projects.items && content.projects.items.length > 0) {
            console.log('Projetos carregados:', content.projects.items.length);
            
            // Add SEO keywords to each project if they don't already have them
            const enhancedProjects = content.projects.items.map(project => {
              // Create a new project object with all existing properties
              const enhancedProject: Project = {
                ...project,
                // Add default keywords based on project type
                keywords: [
                  "projeto urbanístico", 
                  "desenvolvimento urbano",
                  ...(project.type === "urban" 
                    ? ["loteamento", "bairro planejado", "urbanismo"] 
                    : ["smart city", "cidade inteligente", "tecnologia urbana"])
                ]
              };
              
              return enhancedProject;
            });
            
            setProjectsData(enhancedProjects);
          } else {
            console.warn('Nenhum projeto encontrado no CMS');
          }
        } else {
          console.warn('Dados de projetos não encontrados no CMS');
        }
      } catch (error) {
        console.error('Erro ao carregar dados de projetos:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadContent();
  }, []);

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container-wrapper">
          <div className="text-center">
            <p>Carregando projetos de urbanismo e loteamento...</p>
          </div>
        </div>
      </section>
    );
  }

  // Prepare structured data for Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projectsData.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "creator": {
          "@type": "Organization",
          "name": "Urbis"
        },
        "keywords": project.keywords?.join(", ") || "projeto urbanístico, loteamento, desenvolvimento urbano",
        "dateCreated": project.year,
        "image": project.image
      }
    }))
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container-wrapper">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{projectsTitle}</h2>
          <p className="text-gray-600">
            {projectsDescription}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.length > 0 ? (
            projectsData.map((project: Project) => (
              <article
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img 
                  src={project.image} 
                  alt={`Projeto de ${project.type === 'urban' ? 'loteamento e urbanismo' : 'desenvolvimento urbano'}: ${project.title}`} 
                  className="w-full h-56 object-cover" 
                  onError={(e) => {
                    console.error("Imagem não carregada");
                    (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Imagem+não+encontrada";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.client}, {project.year}</p>
                  <p className="text-gray-700">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="inline-flex items-center mt-4 text-[#BF3B6C] hover:text-[#BF3B6C]/80 font-medium transition-colors"
                      aria-label={`Ver detalhes do projeto de ${project.type === 'urban' ? 'loteamento' : 'urbanismo'}: ${project.title}`}
                    >
                      Ver Projeto
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">Nenhum projeto encontrado.</p>
            </div>
          )}
        </div>

        {/* View All Projects Button */}
        {projectsData.length > 0 && (
          <div className="text-center mt-12">
            <a href="/projects" className="btn-primary">
              Ver Todos os Projetos de Loteamento e Urbanismo
            </a>
          </div>
        )}
        
        {/* Schema.org structured data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </section>
  );
};

export default Projects;
