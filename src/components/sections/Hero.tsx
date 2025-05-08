
import { Button } from '@/components/ui/button';
import { cmsService } from '@/services/cmsService';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: "Não gaste um real sequer antes de falar com a URBIS.",
    subtitle: "Somos o melhor investimento para o seu empreendimento imobiliário. Unimos experiência, conhecimento, inteligência e estratégia para transformar sua idéia em um grande negócio.",
    ctaText: "Fale Conosco",
    ctaLink: "#contact",
    backgroundImage: "https://cdn.midjourney.com/8071897a-b5ac-4953-a3b8-b4a29bd2a053/0_0.png"
  });

  useEffect(() => {
    // Get content from CMS service
    const content = cmsService.getContent();
    setHeroContent(content.hero);
  }, []);

  return (
    <div id="home" className="relative bg-black min-h-[100vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url("${heroContent.backgroundImage}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-urbis-primary/80 to-urbis-secondary/70"></div>
      </div>
      
      {/* Hero content */}
      <div className="container-wrapper relative z-10 pt-20">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {heroContent.title}
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            {heroContent.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-[#D94848] hover:bg-[#D94848]/90 text-white text-lg px-8 py-6 transition-all duration-300">
              <a href={heroContent.ctaLink}>{heroContent.ctaText}</a>
            </Button>
            
            <Button asChild variant="outline" className="border-[#BF3B6C] bg-[#BF3B6C] text-white hover:bg-[#BF3B6C]/80 text-lg px-8 py-6 transition-all duration-300">
              <a href="#projects">Nossos Projetos</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
