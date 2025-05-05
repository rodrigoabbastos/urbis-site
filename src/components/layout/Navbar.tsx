
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-wrapper">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-urbis-navy">
              URBIS
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-urbis-darkGray hover:text-urbis-navy transition-colors">
              Sobre
            </a>
            <a href="#services" className="text-urbis-darkGray hover:text-urbis-navy transition-colors">
              Serviços
            </a>
            <a href="#properties" className="text-urbis-darkGray hover:text-urbis-navy transition-colors">
              Imóveis
            </a>
            <a href="#testimonials" className="text-urbis-darkGray hover:text-urbis-navy transition-colors">
              Depoimentos
            </a>
            <Button asChild>
              <a href="#contact" className="bg-urbis-navy text-white hover:bg-urbis-navy/90">
                Contato
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-urbis-darkGray focus:outline-none"
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
            <a 
              href="#about" 
              className="text-urbis-darkGray hover:text-urbis-navy transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Sobre
            </a>
            <a 
              href="#services" 
              className="text-urbis-darkGray hover:text-urbis-navy transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Serviços
            </a>
            <a 
              href="#properties" 
              className="text-urbis-darkGray hover:text-urbis-navy transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Imóveis
            </a>
            <a 
              href="#testimonials" 
              className="text-urbis-darkGray hover:text-urbis-navy transition-colors py-2"
              onClick={toggleMobileMenu}
            >
              Depoimentos
            </a>
            <Button 
              asChild 
              className="w-full"
              onClick={toggleMobileMenu}
            >
              <a href="#contact" className="bg-urbis-navy text-white hover:bg-urbis-navy/90">
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
