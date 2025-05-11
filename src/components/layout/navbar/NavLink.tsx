
import { cn } from '@/lib/utils';
import React from 'react';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive, onClick }) => {
  return (
    <a 
      href={href} 
      className={cn(
        "relative text-urbis-neutral hover:text-urbis-primary transition-colors duration-300 group font-medium",
        isActive && "text-urbis-primary font-medium"
      )}
      onClick={onClick}
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

export default NavLink;
