
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cmsService } from '@/services/cmsService';
import { ClientLogo, SiteContent } from '@/services/cms/types';
import { defaultContent } from '@/services/cms/defaultContent';

const ClientLogos = () => {
  const [content, setContent] = useState<SiteContent['clients']>(defaultContent.clients);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        console.log('ClientLogos: Carregando conteúdo dos clientes...');
        const siteContent = await cmsService.getContent();
        console.log('ClientLogos: Conteúdo carregado, dados de clientes:', siteContent.clients);
        
        if (siteContent.clients && siteContent.clients.logos) {
          console.log('ClientLogos: Logos encontrados:', siteContent.clients.logos.length);
          setContent(siteContent.clients);
        } else {
          console.log('ClientLogos: Nenhum logo encontrado, usando conteúdo padrão');
          setContent(defaultContent.clients);
        }
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar logos dos clientes:', err);
        setError('Não foi possível carregar os logos dos clientes');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Garantir que temos logos para mostrar
  const sortedLogos = content && content.logos ? 
    [...content.logos].sort((a, b) => a.order - b.order) : 
    [];

  if (isLoading) {
    return (
      <section id="clients" className="py-16 bg-[#BF3B6C] text-white">
        <div className="container-wrapper text-center">
          <p>Carregando...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Erro na seção de clientes:', error);
  }

  console.log('ClientLogos: Renderizando', sortedLogos.length, 'logos');
  
  return (
    <section id="clients" className="py-16 bg-[#BF3B6C] text-white">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content?.title || 'Quem Confia na URBIS'}</h2>
          <p className="text-white/90">{content?.description || 'Nossos clientes e parceiros'}</p>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: false,
          }}
          className="w-full"
          aria-label="Logos dos nossos clientes"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sortedLogos.length > 0 ? (
              sortedLogos.map((logo) => (
                <CarouselItem 
                  key={logo.id} 
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="h-24 flex items-center justify-center p-4 bg-white/95 rounded-md shadow-sm">
                    <img 
                      src={logo.image} 
                      alt={`Logo do cliente ${logo.name}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        console.error(`Logo não pôde ser carregado: ${logo.name}`);
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial'%3EClient Logo%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-2 md:pl-4 basis-full">
                <div className="h-24 flex items-center justify-center p-4 bg-white/20 rounded-md">
                  <p className="text-white text-center">Nenhum logo de cliente cadastrado</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/40" />
            <CarouselNext className="relative inset-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/40" />
          </div>
        </Carousel>
        
        {/* Schema.org structured data for Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Urbis",
            "description": "Inteligência em Desenvolvimento Urbano e Loteamentos",
            "url": "https://urbis.com.br",
            "knowsAbout": [
              "loteamento", 
              "urbanismo", 
              "planejamento urbano", 
              "bairro planejado", 
              "viabilidade técnica",
              "viabilidade ambiental",
              "projetos urbanísticos"
            ]
          })
        }} />
      </div>
    </section>
  );
};

export default ClientLogos;
