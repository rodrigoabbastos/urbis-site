
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  client: string;
  year: string;
  type: 'urban' | 'smart';
}

const ProjectCard = ({ image, title, description, client, year, type }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
      <div className="relative h-60 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      
      <CardHeader className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-urbis-navy">{title}</h3>
          <Badge variant="outline" className="bg-urbis-navy/10 text-urbis-navy border-none">
            {type === 'urban' ? 'Planejamento Urbano' : 'Cidade Inteligente'}
          </Badge>
        </div>
        <p className="text-urbis-darkGray text-sm">{description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="border-t border-gray-100 pt-4 mt-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500">Cliente</p>
              <p className="text-sm text-urbis-darkGray">{client}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Ano</p>
              <p className="text-sm text-urbis-darkGray">{year}</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <a 
          href="#" 
          className="text-urbis-navy text-sm font-medium hover:text-urbis-blue transition-colors"
        >
          Ver detalhes →
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
