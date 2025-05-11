
import { useState, useEffect } from 'react';
import { SectionVisibility } from '@/services/cms/types';
import { cmsService } from '@/services/cmsService';

export const useNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
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

  useEffect(() => {
    const loadVisibility = async () => {
      try {
        const content = await cmsService.getContent();
        if (content.sectionVisibility) {
          setSectionVisibility(content.sectionVisibility);
        }
      } catch (error) {
        console.error('Error loading section visibility:', error);
      }
    };
    
    loadVisibility();
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine which section is currently visible
      try {
        const sections = ['home', 'about', 'clients', 'services', 'methodology', 'projects', 'linkedin', 'testimonials', 'contact', 'ebooks'].filter(
          section => sectionVisibility[section as keyof SectionVisibility]
        );
        
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 200 && rect.bottom >= 200;
          }
          return false;
        });

        if (current) {
          setActiveSection(current);
        }
      } catch (error) {
        console.error("Error in section detection:", error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionVisibility]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll with animation
      element.scrollIntoView({ behavior: 'smooth' });
      if (isMobileMenuOpen) toggleMobileMenu();
    }
  };

  // Navigation items based on visibility settings
  const navItems = [
    { id: 'about', label: 'Sobre', visible: sectionVisibility.about },
    { id: 'clients', label: 'Clientes', visible: sectionVisibility.clients },
    { id: 'services', label: 'Serviços', visible: sectionVisibility.services },
    { id: 'projects', label: 'Projetos', visible: sectionVisibility.projects },
    { id: 'testimonials', label: 'Depoimentos', visible: sectionVisibility.testimonials },
    { id: 'ebooks', label: 'E-books', visible: sectionVisibility.ebooks }
  ].filter(item => item.visible);

  return {
    isScrolled,
    isMobileMenuOpen,
    activeSection,
    sectionVisibility,
    toggleMobileMenu,
    scrollToSection,
    navItems
  };
};
