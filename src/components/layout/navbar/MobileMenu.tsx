
import React from 'react';
import NavLink from './NavLink';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ id: string; label: string }>;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  showContact: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  navItems, 
  activeSection, 
  scrollToSection,
  showContact
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full animate-fade-in">
      <div className="container-wrapper py-5 flex flex-col space-y-4">
        {navItems.map(item => (
          <NavLink 
            key={item.id}
            href={`#${item.id}`} 
            label={item.label}
            isActive={activeSection === item.id}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.id);
            }}
          />
        ))}
        {showContact && (
          <Button 
            onClick={() => scrollToSection('contact')}
            className="w-full bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300"
          >
            Contato
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
