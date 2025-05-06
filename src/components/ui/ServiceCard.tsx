
import { useState } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedDescription?: string;
}

const ServiceCard = ({ icon: Icon, title, description, detailedDescription }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={cn(
        "bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer group",
        isExpanded ? "scale-105" : "hover:-translate-y-1"
      )} 
      onClick={toggleExpand}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 bg-urbis-primary/10 rounded-full flex items-center justify-center group-hover:bg-urbis-primary transition-colors duration-300">
          <Icon className="h-8 w-8 text-urbis-primary" />
        </div>
        {detailedDescription && (
          <button className="text-urbis-primary">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-urbis-tertiary mb-3 group-hover:text-urbis-primary transition-colors duration-300">{title}</h3>
      
      <p className="text-urbis-neutral transition-colors duration-300">{description}</p>
      
      {detailedDescription && isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
          <p className="text-urbis-neutral">{detailedDescription}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
