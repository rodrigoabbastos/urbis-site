
import React, { useState, useEffect } from 'react';
import { cmsService } from '@/services/cmsService';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { SiteContent } from '@/services/cms/types';
import { defaultContent } from '@/services/cms/defaultContent';

const Ebooks = () => {
  const [content, setContent] = useState<SiteContent['ebooks']>(defaultContent.ebooks);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const siteContent = await cmsService.getContent();
        if (siteContent.ebooks) {
          setContent(siteContent.ebooks);
        }
      } catch (error) {
        console.error('Error loading ebooks content:', error);
      }
    };

    loadContent();
  }, []);

  return (
    <section id="ebooks" className="py-16 bg-urbis-secondary/10">
      <div className="container-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{content.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((ebook) => (
            <div 
              key={ebook.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={ebook.image} 
                  alt={ebook.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial'%3EImagem não disponível%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{ebook.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{ebook.description}</p>
                <Button 
                  asChild 
                  className="w-full bg-urbis-primary hover:bg-urbis-primary/90"
                >
                  <a 
                    href={ebook.downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar E-book
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {content.items.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhum e-book disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Ebooks;
