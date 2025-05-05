
import { CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const features = [
    "Mais de 20 anos de experiência em planejamento urbano",
    "Equipe multidisciplinar de especialistas",
    "Projetos sustentáveis e inovadores",
    "Metodologia própria de desenvolvimento",
    "Compromisso com o desenvolvimento social",
    "Soluções personalizadas para cada cliente"
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-urbis-navy mb-6">
              Sobre a Urbis
            </h2>
            
            <p className="text-urbis-darkGray mb-6">
              A Urbis é uma empresa líder em planejamento urbano e desenvolvimento de projetos sustentáveis, oferecendo soluções inovadoras para cidades inteligentes. Com mais de 20 anos de experiência, nossa missão é transformar espaços urbanos, criando ambientes mais eficientes, inclusivos e sustentáveis.
            </p>

            <p className="text-urbis-darkGray mb-8">
              Nossa equipe multidisciplinar reúne urbanistas, arquitetos, engenheiros e consultores especializados, comprometidos em desenvolver projetos que integram tecnologia, sustentabilidade e bem-estar social, criando valor para comunidades e organizações.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-urbis-blue mr-2 flex-shrink-0" />
                  <span className="text-urbis-darkGray">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <div className="relative">
              <div className="w-full h-full bg-urbis-navy absolute -bottom-4 -left-4 rounded-lg z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1512187849-463fdb898f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Urbis Office" 
                className="w-full h-auto object-cover rounded-lg shadow-lg z-10 relative"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
