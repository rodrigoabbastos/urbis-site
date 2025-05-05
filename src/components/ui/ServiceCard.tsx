
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 group">
      <div className="w-16 h-16 bg-urbis-navy/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-urbis-navy transition-colors">
        <Icon className="h-8 w-8 text-urbis-navy" />
      </div>
      
      <h3 className="text-xl font-semibold text-urbis-navy mb-3">{title}</h3>
      
      <p className="text-urbis-darkGray">{description}</p>
    </div>
  );
};

export default ServiceCard;
