
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-black min-h-[100vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      <div className="container-wrapper relative z-10 pt-20">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Soluções imobiliárias para você e seu negócio
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Encontre o imóvel perfeito com a Urbis. Oferecemos serviços completos de compra, venda e locação para clientes em todo o Brasil.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-urbis-navy text-white hover:bg-urbis-navy/90 text-lg px-8 py-6">
              <a href="#contact">Fale Conosco</a>
            </Button>
            
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-urbis-navy text-lg px-8 py-6">
              <a href="#properties">Ver Imóveis</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
