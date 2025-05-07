
import { Search, FileSearch, FileCheck, Shield, Construction } from 'lucide-react';

const Methodology = () => {
  const steps = [
    {
      icon: Search,
      title: "Análise Inicial do Terreno",
      description: "Levantamos dados físicos, legais e ambientais para identificar restrições e potencial de uso."
    },
    {
      icon: FileSearch,
      title: "Estudo de Viabilidade",
      description: "Simulamos cenários e apresentamos soluções otimizadas com base na legislação e mercado."
    },
    {
      icon: FileCheck,
      title: "Projeto e Licenciamento",
      description: "Elaboramos o projeto urbanístico, infraestrutura e conduzimos os licenciamentos necessários."
    },
    {
      icon: Shield,
      title: "Compatibilização e Aprovação",
      description: "Acompanhamos o processo junto aos órgãos até a aprovação completa."
    },
    {
      icon: Construction,
      title: "Suporte à Implantação",
      description: "Prestamos apoio técnico e estratégico até a execução do empreendimento."
    }
  ];

  return (
    <section id="methodology" className="section-padding bg-white">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-urbis-primary mb-4">
            Como trabalhamos
          </h2>
          <p className="text-urbis-neutral max-w-3xl mx-auto">
            Nosso método combina técnica, visão estratégica e agilidade. Veja como estruturamos o caminho do seu empreendimento:
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-urbis-primary/20 hidden md:block transform -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-8`}
              >
                {/* Icon */}
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-urbis-primary/10 flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10 text-urbis-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:w-1/2 text-center md:text-left">
                  <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <h3 className="text-xl font-bold text-urbis-primary mb-2">{step.title}</h3>
                    <p className="text-urbis-neutral">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
