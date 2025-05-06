
import { Building, Building2, LineChart, Lightbulb, Users, Leaf } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Planejamento Urbano",
      description: "Desenvolvimento de planos diretores, planos de mobilidade urbana e estudos de viabilidade para cidades e bairros.",
      detailedDescription: "Nossa equipe de especialistas em planejamento urbano desenvolve soluções que promovem o crescimento urbano sustentável, a mobilidade eficiente e a qualidade de vida. Trabalhamos com municípios, empresas e comunidades para criar planos diretores abrangentes, estratégias de mobilidade urbana e estudos detalhados de viabilidade que respeitam as necessidades locais e promovem espaços urbanos mais acessíveis, seguros e inclusivos."
    },
    {
      icon: Building2,
      title: "Projetos Urbanos",
      description: "Criação e implementação de projetos de intervenção urbana, requalificação de espaços públicos e desenvolvimento imobiliário.",
      detailedDescription: "Desenvolvemos projetos que transformam áreas urbanas subutilizadas em espaços vibrantes e funcionais. Nossa abordagem combina princípios de design urbano, sustentabilidade e inovação para criar intervenções que valorizam o patrimônio existente, promovem a diversidade de usos e fortalecem as conexões comunitárias. Trabalhamos em estreita colaboração com stakeholders para garantir que cada projeto atenda às necessidades específicas do local e de seus usuários."
    },
    {
      icon: LineChart,
      title: "Consultoria Estratégica",
      description: "Assessoria técnica para governos, empresas e organizações em políticas urbanas e desenvolvimento territorial.",
      detailedDescription: "Oferecemos consultoria especializada que apoia a tomada de decisões informadas sobre o desenvolvimento urbano e territorial. Nossa equipe multidisciplinar analisa dados, tendências e melhores práticas para fornecer recomendações estratégicas que ajudam nossos clientes a enfrentar desafios complexos, aproveitar oportunidades e implementar políticas urbanas eficazes que promovam cidades mais resilientes e habitáveis."
    },
    {
      icon: Lightbulb,
      title: "Cidades Inteligentes",
      description: "Implementação de soluções tecnológicas para tornar as cidades mais eficientes, sustentáveis e conectadas.",
      detailedDescription: "Integramos tecnologia e inovação para transformar ambientes urbanos em cidades inteligentes. Trabalhamos com soluções de IoT, análise de dados e sistemas integrados para otimizar infraestruturas urbanas, melhorar serviços públicos e criar ambientes mais responsivos às necessidades dos cidadãos. Nossos projetos de smart cities focam em eficiência energética, gestão de recursos, mobilidade inteligente e governança participativa."
    },
    {
      icon: Users,
      title: "Participação Social",
      description: "Metodologias de engajamento comunitário para garantir que os projetos atendam às necessidades reais da população.",
      detailedDescription: "Acreditamos que o desenvolvimento urbano deve ser inclusivo e participativo. Desenvolvemos e implementamos metodologias inovadoras de engajamento que amplificam as vozes dos cidadãos no planejamento e desenvolvimento de seus bairros e cidades. Utilizamos ferramentas digitais e presenciais para facilitar diálogos construtivos, co-criação de soluções e processos de tomada de decisão que valorizam o conhecimento local e fortalecem o senso de pertencimento."
    },
    {
      icon: Leaf,
      title: "Sustentabilidade Urbana",
      description: "Desenvolvimento de estratégias para cidades mais sustentáveis, resilientes e com baixa emissão de carbono.",
      detailedDescription: "Criamos estratégias e soluções que ajudam cidades a enfrentar os desafios das mudanças climáticas e a transitar para modelos de desenvolvimento de baixo carbono. Nossos projetos integram infraestrutura verde, eficiência energética, gestão sustentável de recursos e adaptação climática para criar ambientes urbanos mais resilientes, saudáveis e em harmonia com os ecossistemas naturais."
    }
  ];

  return (
    <section id="services" className="section-padding bg-urbis-lightBlueGray">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-darkBlue mb-4">
            Nossos Serviços
          </h2>
          <p className="text-urbis-gray max-w-3xl mx-auto">
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
              detailedDescription={service.detailedDescription}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-urbis-teal text-white hover:bg-urbis-teal/90 transition-all duration-300">
            <a href="#contact">Solicitar Serviço</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
