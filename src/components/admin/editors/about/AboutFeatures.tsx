
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface AboutFeaturesProps {
  features: string[];
  onFeaturesChange: (features: string[]) => void;
}

const AboutFeatures = ({ features, onFeaturesChange }: AboutFeaturesProps) => {
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    onFeaturesChange(updatedFeatures);
  };
  
  const addFeature = () => {
    onFeaturesChange([...features, '']);
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    onFeaturesChange(updatedFeatures);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Características/Diferenciais</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addFeature}
          className="h-8 gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Adicionar característica</span>
        </Button>
      </div>
      
      <ScrollArea className="h-64 rounded-md border p-4">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input 
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Ex: Expertise em urbanismo"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeFeature(index)}
                className="h-10 px-2"
                disabled={features.length <= 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AboutFeatures;
