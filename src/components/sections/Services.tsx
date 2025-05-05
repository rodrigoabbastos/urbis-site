
import { Home, Building2, ClipboardCheck, Scale, MessageSquare, BadgePercent } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Compra e Venda",
      description: "Intermediamos toda a negociação, garantindo segurança jurídica e as melhores condições para nossos clientes."
    },
    {
      icon: Building2,
      title: "Locação",
      description: "Oferecemos um portfólio diversificado de imóveis para locação residencial e comercial com contratos personalizados."
    },
    {
      icon: ClipboardCheck,
      title: "Administração de Imóveis",
      description: "Cuidamos de todos os aspectos da gestão do seu imóvel, desde a manutenção até a relação com inquilinos."
    },
    {
      icon: Scale,
      title: "Consultoria Jurídica",
      description: "Nosso time jurídico especializado garante a segurança em todas as transações imobiliárias."
    },
    {
      icon: MessageSquare,
      title: "Avaliação Imobiliária",
      description: "Realizamos análises de mercado precisas para determinar o valor justo do seu imóvel."
    },
    {
      icon: BadgePercent,
      title: "Financiamento",
      description: "Intermediamos as melhores condições de financiamento junto às instituições financeiras parceiras."
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
            Oferecemos uma gama completa de serviços imobiliários para atender às necessidades de nossos clientes, tanto para pessoas físicas quanto jurídicas.
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
