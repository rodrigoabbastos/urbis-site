
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

  useEffect(() => {
    const loadVisibility = async () => {
      try {
        setIsLoading(true);
        const content = await cmsService.getContent();
        if (content.sectionVisibility) {
          setSectionVisibility(content.sectionVisibility);
        }
      } catch (error) {
        console.error('Error loading section visibility:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVisibility();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-urbis-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {sectionVisibility.hero && <Hero />}
        {sectionVisibility.about && <AboutUs />}
        {sectionVisibility.clients && <ClientLogos />}
        {sectionVisibility.services && <Services />}
        {sectionVisibility.methodology && <Methodology />}
        {sectionVisibility.projects && <Projects />}
        {sectionVisibility.linkedin && <LinkedInFeed />}
        {sectionVisibility.testimonials && <Testimonials />}
        {sectionVisibility.ebooks && <Ebooks />}
        {sectionVisibility.contact && <Contact />}
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
