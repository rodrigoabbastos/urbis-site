
import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from './useNavigation';
import MobileMenu from './MobileMenu';
import DesktopNav from './DesktopNav';

const Navbar = () => {
  const {
    isScrolled,
    isMobileMenuOpen,
    activeSection,
    sectionVisibility,
    toggleMobileMenu,
    scrollToSection,
    navItems
  } = useNavigation();

  return (
    <nav 
      className={cn(
        "fixed w-full top-0 z-40 bg-white transition-all duration-300", // Reduzindo z-index de 50 para 40
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
                className="h-[60px] w-auto" // Reduzindo ligeiramente o tamanho do logo
                onError={(e) => {
                  console.error("Logo failed to load");
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40'%3E%3Crect width='100%25' height='100%25' fill='%23BF3B6C'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'%3EURBIS%3C/text%3E%3C/svg%3E";
                }}
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <DesktopNav 
            navItems={navItems}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            showContact={sectionVisibility.contact}
          />

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
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        showContact={sectionVisibility.contact}
      />
    </nav>
  );
};

export default Navbar;
