
import { CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const features = [
    "Inteligência técnica e visão estratégica",
    "Expertise em urbanismo e meio ambiente",
    "Conhecimento profundo em legislação",
    "Agilidade nos processos de aprovação",
    "Foco em valorização do empreendimento",
    "Suporte completo do estudo à implantação"
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-urbis-primary mb-6">
              Quem somos
            </h2>
            
            <p className="text-urbis-darkGray mb-6">
              A URBIS é uma consultoria especializada na estruturação de empreendimentos urbanos com inteligência técnica, visão estratégica e agilidade. Atuamos desde o estudo de viabilidade até a aprovação e implantação, transformando terrenos em projetos viáveis, valorizados e legalmente seguros.
            </p>

            <p className="text-urbis-darkGray mb-8">
              Com experiência consolidada, integrando áreas como urbanismo, meio ambiente, infraestrutura e legislação, a URBIS é o parceiro ideal para destravar terrenos e criar valor duradouro para loteadores, investidores e incorporadores.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-urbis-primary mr-2 flex-shrink-0" />
                  <span className="text-urbis-darkGray">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image - Updated with new image and better sizing/responsiveness */}
          <div className="order-first lg:order-last">
            <div className="relative">
              <div className="w-full h-full bg-urbis-primary absolute -bottom-4 -left-4 rounded-lg z-0"></div>
              <img 
                src="https://urbis.com.br/wp-content/uploads/2023/08/infografico_ppt-02-1.png" 
                alt="Urbis Infográfico" 
                className="w-full h-auto object-contain rounded-lg shadow-lg z-10 relative"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
