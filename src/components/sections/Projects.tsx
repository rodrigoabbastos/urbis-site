
import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Helmet } from 'react-helmet-async';

interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  client: string;
  year: string;
  type: 'urban' | 'smart' | string; // Allow any string value for category
  link?: string;
  keywords?: string[];
}

interface ProjectInfo {
  title?: string;
  description?: string;
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [projectsTitle, setProjectsTitle] = useState('Projetos de Urbanismo e Loteamentos');
  const [projectsDescription, setProjectsDescription] = useState('Confira alguns dos nossos projetos recentes de desenvolvimento urbano e loteamentos');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadContent() {
      try {
        setIsLoading(true);
        
        // Fetch projects info
        const { data: infoData, error: infoError } = await supabase
          .from('content')
          .select('*')
          .eq('id', 'projects')
          .single();
          
        if (infoError) {
          console.error('Error fetching projects info:', infoError);
        } else if (infoData) {
          // Fix type errors by safely accessing properties
          const projectInfo = infoData as ProjectInfo;
          if (projectInfo.title) setProjectsTitle(projectInfo.title);
          if (projectInfo.description) setProjectsDescription(projectInfo.description);
        }
        
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');
          
        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
        } else {
          console.log('Projects loaded from Supabase:', projectsData?.length || 0);
          
          // Add SEO keywords to each project if they don't already have them
          const enhancedProjects = projectsData?.map(project => {
            if (!project.keywords) {
              // Add default keywords based on project type
              let keywords = ["projeto urbanístico", "desenvolvimento urbano"];
              
              if (project.type === "urban") {
                keywords.push("loteamento", "bairro planejado", "urbanismo");
              } else if (project.type === "smart") {
                keywords.push("smart city", "cidade inteligente", "tecnologia urbana");
              }
              
              return {...project, keywords};
            }
            return project;
          }) || [];
          
          setProjectsData(enhancedProjects);
        }
      } catch (error) {
        console.error('Exception loading projects:', error);
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
          {projectsData.map((project: Project) => (
            <article
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img 
                src={project.image} 
                alt={`Projeto de ${project.type === 'urban' ? 'loteamento e urbanismo' : 'desenvolvimento urbano'}: ${project.title}`} 
                className="w-full h-56 object-cover" 
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
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <a href="/projects" className="btn-primary">
            Ver Todos os Projetos de Loteamento e Urbanismo
          </a>
        </div>
        
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
