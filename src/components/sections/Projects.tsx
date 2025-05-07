import { useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';

const Projects = () => {
  const [projects] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Residencial Parque das Águas",
      description: "Loteamento com completa infraestrutura, áreas de lazer e preservação ambiental. Projeto aprovado em tempo recorde com otimização do uso do solo.",
      client: "Incorporadora XYZ",
      year: "2023",
      type: "urban"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Condomínio Vale Verde",
      description: "Condomínio horizontal de alto padrão com solução inovadora para preservação ambiental e aproveitamento da topografia natural.",
      client: "Construtora ABC",
      year: "2022",
      type: "urban"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
      title: "Smart City Jardins",
      description: "Projeto urbano com infraestrutura tecnológica integrada, soluções sustentáveis e planejamento para crescimento ordenado.",
      client: "Prefeitura Municipal",
      year: "2023",
      type: "smart"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1549877452-9c68f96e42e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Eco Parque Industrial",
      description: "Área industrial com licenciamento ambiental completo e soluções para minimizar impactos ambientais enquanto maximiza eficiência logística.",
      client: "Associação Industrial",
      year: "2022",
      type: "smart"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Regularização Vila Nova",
      description: "Projeto de regularização fundiária que beneficiou mais de 500 famílias, incluindo toda documentação e adequação urbanística.",
      client: "Associação de Moradores",
      year: "2021",
      type: "urban"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
      title: "Centro Comercial Monteiro",
      description: "Complexo comercial com aprovação acelerada graças ao planejamento estratégico e acompanhamento especial junto aos órgãos reguladores.",
      client: "Grupo Investimentos",
      year: "2023",
      type: "urban"
    },
  ]);

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-primary mb-4">
            Projetos em destaque
          </h2>
          <p className="text-urbis-neutral max-w-3xl mx-auto">
            Conheça alguns empreendimentos em que aplicamos nossa metodologia, viabilizando projetos de forma estratégica, técnica e segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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
      </div>
    </section>
  );
};

export default Projects;
