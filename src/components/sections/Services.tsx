
import { Building, Building2, LineChart, Lightbulb, Users, Leaf } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Planejamento Urbano",
      description: "Desenvolvimento de planos diretores, planos de mobilidade urbana e estudos de viabilidade para cidades e bairros."
    },
    {
      icon: Building2,
      title: "Projetos Urbanos",
      description: "Criação e implementação de projetos de intervenção urbana, requalificação de espaços públicos e desenvolvimento imobiliário."
    },
    {
      icon: LineChart,
      title: "Consultoria Estratégica",
      description: "Assessoria técnica para governos, empresas e organizações em políticas urbanas e desenvolvimento territorial."
    },
    {
      icon: Lightbulb,
      title: "Cidades Inteligentes",
      description: "Implementação de soluções tecnológicas para tornar as cidades mais eficientes, sustentáveis e conectadas."
    },
    {
      icon: Users,
      title: "Participação Social",
      description: "Metodologias de engajamento comunitário para garantir que os projetos atendam às necessidades reais da população."
    },
    {
      icon: Leaf,
      title: "Sustentabilidade Urbana",
      description: "Desenvolvimento de estratégias para cidades mais sustentáveis, resilientes e com baixa emissão de carbono."
    }
  ];

  return (
    <section id="services" className="section-padding bg-urbis-lightGray">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-navy mb-4">
            Nossos Serviços
          </h2>
          <p className="text-urbis-darkGray max-w-3xl mx-auto">
            Oferecemos soluções completas em planejamento urbano e consultoria para governos, empresas e organizações que buscam transformar e melhorar os espaços urbanos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-urbis-navy text-white hover:bg-urbis-navy/90">
            <a href="#contact">Solicitar Serviço</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
