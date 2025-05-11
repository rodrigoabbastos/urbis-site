
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cmsService } from '@/services/cmsService';
import { ClientLogo, SiteContent } from '@/services/cms/types';
import { defaultContent } from '@/services/cms/defaultContent';

const ClientLogos = () => {
  const [content, setContent] = useState<SiteContent['clients']>(defaultContent.clients);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await cmsService.getContent();
        if (siteContent.clients) {
          setContent(siteContent.clients);
        }
      } catch (error) {
        console.error('Error loading client logos:', error);
      }
    };

    loadContent();
  }, []);

  // Sort logos by order number
  const sortedLogos = [...content.logos].sort((a, b) => a.order - b.order);

  return (
    <section id="clients" className="py-16 bg-[#BF3B6C] text-white">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          <p className="text-white/90">{content.description}</p>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sortedLogos.map((logo) => (
              <CarouselItem 
                key={logo.id} 
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="h-24 flex items-center justify-center p-4 bg-white/95 rounded-md shadow-sm">
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      console.error(`Logo failed to load: ${logo.name}`);
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial'%3EClient Logo%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/40" />
            <CarouselNext className="relative inset-0 translate-y-0 bg-white/20 hover:bg-white/30 border-white/40" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ClientLogos;
