
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cmsService } from '@/services/cms/cmsService';
import { AboutContent } from '@/services/cms/types';

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const content = await cmsService.getContent();
        setAboutContent(content.about);
      } catch (error) {
        console.error('Error loading about content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  // Use fallback content while loading
  const features = aboutContent?.features || [
    "Inteligência técnica e visão estratégica",
    "Expertise em urbanismo e meio ambiente",
    "Conhecimento profundo em legislação",
    "Agilidade nos processos de aprovação",
    "Foco em valorização do empreendimento",
    "Suporte completo do estudo à implantação"
  ];
  
  const title = aboutContent?.title || "Quem somos";
  const image = aboutContent?.image || "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
  // Content paragraphs from CMS or fallback
  const descriptions = aboutContent?.description || [
    "A URBIS é uma consultoria especializada na estruturação de empreendimentos urbanos com inteligência técnica, visão estratégica e agilidade. Atuamos desde o estudo de viabilidade até a aprovação e implantação, transformando terrenos em projetos viáveis, valorizados e legalmente seguros.",
    "Com experiência consolidada, integrando áreas como urbanismo, meio ambiente, infraestrutura e legislação, a URBIS é o parceiro ideal para destravar terrenos e criar valor duradouro para loteadores, investidores e incorporadores."
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-urbis-primary mb-6">
              {title}
            </h2>
            
            {descriptions.map((paragraph, index) => (
              <p key={index} className="text-urbis-darkGray mb-6">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-urbis-primary mr-2 flex-shrink-0" />
                  <span className="text-urbis-darkGray">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <div className="relative">
              <div className="w-full h-full bg-urbis-primary absolute -bottom-4 -left-4 rounded-lg z-0"></div>
              <img 
                src={image}
                alt="Urbis Infográfico" 
                className="w-full h-auto object-contain rounded-lg shadow-lg z-10 relative"
                onError={(e) => {
                  console.error("Failed to load primary image");
                  e.currentTarget.src = "https://via.placeholder.com/800x500?text=Urbis+Infografico";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
