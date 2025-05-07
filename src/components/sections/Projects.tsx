
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Sample project data (replace with your actual data)
const projectsData = [
  {
    id: '1',
    name: 'Projeto de Revitalização Urbana',
    location: 'São Paulo, SP',
    description: 'Revitalização da área central com foco em espaços verdes e mobilidade urbana.',
    image: '/images/projects/project1.jpg',
    category: 'urban',
    link: '/project1',
  },
  {
    id: '2',
    name: 'Implementação de Cidades Inteligentes',
    location: 'Curitiba, PR',
    description: 'Implementação de tecnologias para gestão inteligente de recursos e serviços urbanos.',
    image: '/images/projects/project2.jpg',
    category: 'smart',
    link: '/project2',
  },
  {
    id: '3',
    name: 'Plano Diretor Sustentável',
    location: 'Belo Horizonte, MG',
    description: 'Desenvolvimento de plano diretor com foco em sustentabilidade e crescimento ordenado.',
    image: '/images/projects/project3.jpg',
    category: 'urban',
    link: '/project3',
  },
];

interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  category: "urban" | "smart" | string; // Allow any string value for category
  link?: string;
}

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container-wrapper">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossos Projetos</h2>
          <p className="text-gray-600">
            Explore alguns dos nossos projetos mais recentes e inovadores em planejamento urbano e cidades inteligentes.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project: Project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img src={project.image} alt={project.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.location}</p>
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
