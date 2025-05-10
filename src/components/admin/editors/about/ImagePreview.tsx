
import { Card, CardContent } from '@/components/ui/card';

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  if (!imageUrl) return null;
  
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500 mb-2">Prévia da imagem:</p>
        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
          <img 
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=Imagem+não+encontrada";
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
