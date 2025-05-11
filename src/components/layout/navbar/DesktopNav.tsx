
import React from 'react';
import NavLink from './NavLink';
import { Button } from '@/components/ui/button';

interface DesktopNavProps {
  navItems: Array<{ id: string; label: string }>;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  showContact: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ 
  navItems, 
  activeSection, 
  scrollToSection,
  showContact
}) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
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
          className="bg-urbis-primary text-white hover:bg-urbis-primary/90 transition-all duration-300"
        >
          Contato
        </Button>
      )}
    </div>
  );
};

export default DesktopNav;
