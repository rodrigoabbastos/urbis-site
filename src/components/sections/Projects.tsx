
import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  client: string;
  year: string;
  type: 'urban' | 'smart' | string; // Allow any string value for category
  link?: string;
}

interface ProjectInfo {
  title?: string;
  description?: string;
}

const Projects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [projectsTitle, setProjectsTitle] = useState('Nossos Projetos');
  const [projectsDescription, setProjectsDescription] = useState('Confira alguns dos nossos projetos recentes');
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
          setProjectsData(projectsData || []);
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
            <p>Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

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
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img src={project.image} alt={project.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.client}, {project.year}</p>
                <p className="text-gray-700">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="inline-flex items-center mt-4 text-[#BF3B6C] hover:text-[#BF3B6C]/80 font-medium transition-colors">
                    Ver Projeto
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <a href="/projects" className="btn-primary">
            Ver Todos os Projetos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
