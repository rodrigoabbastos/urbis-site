
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div id="home" className="relative bg-black min-h-[100vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://cdn.midjourney.com/8071897a-b5ac-4953-a3b8-b4a29bd2a053/0_0.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-urbis-primary/80 to-urbis-secondary/70"></div>
      </div>
      
      {/* Hero content */}
      <div className="container-wrapper relative z-10 pt-20">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Não gaste 1 centavo sequer antes de falar com a URBIS.
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Somos o melhor investimento para o seu empreendimento. Unimos estratégia, engenharia e inteligência territorial para transformar terrenos em grandes negócios.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-urbis-primary text-white hover:bg-urbis-primary/90 text-lg px-8 py-6">
              <a href="#contact">Fale com um especialista</a>
            </Button>
            
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-urbis-primary text-lg px-8 py-6">
              <a href="#projects">Nossos Projetos</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
