
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { normalizeImageUrl } from '@/utils/imageUtils';

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  const [normalizedUrl, setNormalizedUrl] = useState('');
  
  useEffect(() => {
    // Normaliza a URL (substitui \ por /)
    setNormalizedUrl(normalizeImageUrl(imageUrl));
  }, [imageUrl]);
  
  if (!normalizedUrl) return null;
  
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-gray-500 mb-2">Prévia da imagem:</p>
        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
          <img 
            src={normalizedUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Erro ao carregar imagem: ${normalizedUrl}`);
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 break-all">URL: {normalizedUrl}</p>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
