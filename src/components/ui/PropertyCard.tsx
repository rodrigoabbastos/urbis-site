
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: "sale" | "rent";
}

const PropertyCard = ({
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className={`absolute top-3 left-3 ${type === 'sale' ? 'bg-urbis-red' : 'bg-urbis-blue'} text-white`}>
          {type === 'sale' ? 'Venda' : 'Locação'}
        </Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-urbis-navy mb-2 truncate">
          {title}
        </h3>
        
        <p className="text-2xl font-bold text-urbis-navy mb-4">
          {price}
        </p>
        
        <div className="flex items-center mb-4">
          <MapPin className="h-4 w-4 text-urbis-blue mr-2" />
          <span className="text-urbis-darkGray text-sm">{location}</span>
        </div>
        
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 text-urbis-darkGray mr-1" />
            <span className="text-urbis-darkGray text-sm">{bedrooms} quartos</span>
          </div>
          
          <div className="flex items-center">
            <Bath className="h-4 w-4 text-urbis-darkGray mr-1" />
            <span className="text-urbis-darkGray text-sm">{bathrooms} banheiros</span>
          </div>
          
          <div className="flex items-center">
            <Square className="h-4 w-4 text-urbis-darkGray mr-1" />
            <span className="text-urbis-darkGray text-sm">{area}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button asChild className="w-full bg-urbis-navy text-white hover:bg-urbis-navy/90">
            <a href="#contact">Ver Detalhes</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
