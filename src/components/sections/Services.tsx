
import { FileSearch, Building2, FileCheck, FileLock, Building, LineChart } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: FileSearch,
      title: "Estudos de Viabilidade Urbanística e Ambiental",
      description: "Identificamos oportunidades, riscos e diretrizes técnicas para transformar terrenos em ativos rentáveis.",
      detailedDescription: "Nossa equipe realiza estudos técnicos completos que avaliam potencialidades, restrições ambientais, viabilidade econômica e conformidade legal. Isso permite decisões de investimento embasadas e redução de riscos no desenvolvimento do seu empreendimento."
    },
    {
      icon: Building2,
      title: "Projetos Urbanísticos e de Infraestrutura",
      description: "Desenvolvemos projetos alinhados às normas e à topografia, otimizando o aproveitamento do terreno.",
      detailedDescription: "Elaboramos projetos que maximizam o aproveitamento da área, respeitando as características topográficas e ambientais. Nossos projetos contemplam soluções técnicas que reduzem custos de implantação e valorizam cada lote do empreendimento."
    },
    {
      icon: FileCheck,
      title: "Licenciamento Ambiental e Urbanístico",
      description: "Gerenciamos todo o processo de licenciamento junto aos órgãos competentes, garantindo agilidade e conformidade.",
      detailedDescription: "Conduzimos o processo completo de licenciamento, incluindo estudos técnicos, análises de impacto ambiental e urbanístico, e representação junto aos órgãos reguladores. Nossa experiência permite destravar processos e obter aprovações com maior rapidez."
    },
    {
      icon: FileLock,
      title: "Regularização Fundiária e Legal",
      description: "Apoiamos empreendimentos na adequação jurídica e documental, com foco na segurança e viabilidade comercial.",
      detailedDescription: "Realizamos a análise completa da situação fundiária, resolvemos pendências documentais e implementamos estratégias de regularização que proporcionam segurança jurídica para o empreendimento e seus futuros compradores."
    },
    {
      icon: Building,
      title: "Compatibilização com Órgãos Públicos",
      description: "Facilitamos a aprovação do projeto junto a prefeituras, concessionárias e demais entes reguladores.",
      detailedDescription: "Nossa equipe possui ampla experiência em negociação com órgãos públicos e conhecimento dos processos técnicos e burocráticos de aprovação. Isso permite antecipar exigências, reduzir tempo de análise e maximizar as chances de aprovação rápida do seu projeto."
    },
    {
      icon: LineChart,
      title: "Consultoria Estratégica para Loteamentos e Condomínios",
      description: "Oferecemos inteligência técnica e visão de mercado para viabilizar e valorizar loteamentos e condomínios.",
      detailedDescription: "Combinamos conhecimento técnico com visão de mercado para orientar decisões estratégicas do empreendimento, desde a concepção até a comercialização. Avaliamos tendências, oportunidades e riscos para maximizar o retorno sobre o investimento."
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-br from-white to-urbis-primary/5">
      <div className="container-wrapper">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-primary mb-4">
            O que fazemos
          </h2>
          <p className="text-urbis-neutral max-w-3xl mx-auto">
            Mais do que projetos, entregamos soluções completas com foco na viabilidade, aprovação e valorização do seu empreendimento.
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
          <Button asChild className="bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300">
            <a href="#contact">Solicitar Serviço</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
