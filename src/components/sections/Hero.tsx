
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-black min-h-[100vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1431576901776-e539bd916ba2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-urbis-primary/80 to-urbis-secondary/70"></div>
      </div>
      
      <div className="container-wrapper relative z-10 pt-20">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Soluções urbanas inovadoras para cidades inteligentes
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Planejamento urbano, consultoria e desenvolvimento de projetos sustentáveis para transformar espaços e melhorar a qualidade de vida das pessoas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-urbis-primary text-white hover:bg-urbis-primary/90 text-lg px-8 py-6">
              <a href="#contact">Fale Conosco</a>
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
