
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine which section is currently visible
      try {
        const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];
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
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll with animation
      element.scrollIntoView({ behavior: 'smooth' });
      if (isMobileMenuOpen) toggleMobileMenu();
    }
  };

  const NavLink = ({ href, label }) => {
    const sectionId = href.replace('#', '');
    const isActive = activeSection === sectionId;
    
    return (
      <a 
        href={href} 
        className={cn(
          "relative text-urbis-neutral hover:text-urbis-primary transition-colors duration-300 group font-medium",
          isActive && "text-urbis-primary font-medium"
        )}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(sectionId);
        }}
      >
        {label}
        <span 
          className={cn(
            "absolute -bottom-1 left-0 w-0 h-0.5 bg-urbis-primary transition-all duration-300 group-hover:w-full",
            isActive && "w-full"
          )}
        ></span>
      </a>
    );
  };

  return (
    <nav 
      className={cn(
        "fixed w-full top-0 z-50 bg-white transition-all duration-300",
        isScrolled ? 'shadow-md py-3' : 'py-5'
      )}
    >
      <div className="container-wrapper">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="#home" 
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              <img 
                src="/lovable-uploads/215a016e-9d44-4975-88d2-d64c862e9a66.png" 
                alt="URBIS Logo" 
                className="h-11 w-auto" 
                onError={(e) => {
                  console.error("Logo failed to load");
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40'%3E%3Crect width='100%25' height='100%25' fill='%23BF3B6C'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'%3EURBIS%3C/text%3E%3C/svg%3E";
                }}
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about" label="Sobre" />
            <NavLink href="#services" label="Serviços" />
            <NavLink href="#projects" label="Projetos" />
            <NavLink href="#testimonials" label="Depoimentos" />
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300"
            >
              Contato
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-urbis-neutral focus:outline-none transition-transform duration-200 hover:scale-110"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full animate-fade-in">
          <div className="container-wrapper py-5 flex flex-col space-y-4">
            <NavLink href="#about" label="Sobre" />
            <NavLink href="#services" label="Serviços" />
            <NavLink href="#projects" label="Projetos" />
            <NavLink href="#testimonials" label="Depoimentos" />
            <Button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300"
            >
              Contato
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
