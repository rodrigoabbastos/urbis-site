
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Methodology from '@/components/sections/Methodology';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import LinkedInFeed from '@/components/sections/LinkedInFeed';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ClientLogos from '@/components/sections/ClientLogos';
import Ebooks from '@/components/sections/Ebooks';
import { cmsService } from '@/services/cmsService';
import { SectionVisibility } from '@/services/cms/types';

const Index = () => {
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    hero: true,
    about: true,
    clients: true,
    services: true,
    methodology: true,
    projects: true,
    linkedin: true,
    testimonials: true,
    contact: true,
    ebooks: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVisibility = async () => {
      try {
        setIsLoading(true);
        console.log('Index: Iniciando carregamento da página...');
        console.log('Index: Carregando configurações de visibilidade das seções...');
        
        const content = await cmsService.getContent();
        console.log('Index: Configurações carregadas:', content.sectionVisibility);
        
        if (content.sectionVisibility) {
          setSectionVisibility(content.sectionVisibility);
          console.log('Index: Visibilidade da seção de clientes:', content.sectionVisibility.clients);
        } else {
          console.log('Index: Nenhuma configuração de visibilidade encontrada, usando padrão');
        }
        
        setError(null);
        console.log('Index: Carregamento concluído com sucesso');
      } catch (error) {
        console.error('Index: Erro ao carregar configurações de visibilidade:', error);
        setError('Erro ao carregar configurações');
        // Não bloquear a renderização, usar configurações padrão
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVisibility();
  }, []);

  console.log('Index: Estado atual - Loading:', isLoading, 'Error:', error, 'SectionVisibility:', sectionVisibility);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-urbis-primary to-urbis-secondary">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  console.log('Index: Renderizando seções com visibilidade:', sectionVisibility);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {sectionVisibility.hero && (
          <>
            {console.log('Index: Renderizando seção Hero')}
            <Hero />
          </>
        )}
        {sectionVisibility.about && (
          <>
            {console.log('Index: Renderizando seção About')}
            <AboutUs />
          </>
        )}
        {sectionVisibility.clients && (
          <>
            {console.log('Index: Renderizando seção de clientes')}
            <ClientLogos />
          </>
        )}
        {sectionVisibility.services && (
          <>
            {console.log('Index: Renderizando seção Services')}
            <Services />
          </>
        )}
        {sectionVisibility.methodology && (
          <>
            {console.log('Index: Renderizando seção Methodology')}
            <Methodology />
          </>
        )}
        {sectionVisibility.projects && (
          <>
            {console.log('Index: Renderizando seção Projects')}
            <Projects />
          </>
        )}
        {sectionVisibility.linkedin && (
          <>
            {console.log('Index: Renderizando seção LinkedIn')}
            <LinkedInFeed />
          </>
        )}
        {sectionVisibility.testimonials && (
          <>
            {console.log('Index: Renderizando seção Testimonials')}
            <Testimonials />
          </>
        )}
        {sectionVisibility.ebooks && (
          <>
            {console.log('Index: Renderizando seção Ebooks')}
            <Ebooks />
          </>
        )}
        {sectionVisibility.contact && (
          <>
            {console.log('Index: Renderizando seção Contact')}
            <Contact />
          </>
        )}
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
