
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = activeSection === href.replace('#', '');
    
    return (
      <a 
        href={href} 
        className={cn(
          "relative text-urbis-neutral hover:text-urbis-primary transition-colors duration-300 group",
          isActive && "text-urbis-primary font-medium"
        )}
        onClick={() => {
          if (isMobileMenuOpen) toggleMobileMenu();
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
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-wrapper">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="https://urbis.com.br/wp-content/uploads/2024/03/Logotipo_URBIS_2024-02.png" 
                alt="URBIS Logo" 
                className="h-10 w-auto"
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
              asChild 
              className="bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300"
            >
              <a href="#contact">
                Contato
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-urbis-neutral focus:outline-none"
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
              asChild 
              className="w-full bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300"
            >
              <a href="#contact">
                Contato
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
