
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface AboutDescriptionsProps {
  descriptions: string[];
  onDescriptionChange: (descriptions: string[]) => void;
}

const AboutDescriptions = ({ descriptions, onDescriptionChange }: AboutDescriptionsProps) => {
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    onDescriptionChange(updatedDescriptions);
  };
  
  const addDescription = () => {
    onDescriptionChange([...descriptions, '']);
  };
  
  const removeDescription = (index: number) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    onDescriptionChange(updatedDescriptions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Parágrafos de descrição</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addDescription}
          className="h-8 gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Adicionar parágrafo</span>
        </Button>
      </div>
      
      <ScrollArea className="h-64 rounded-md border p-4">
        <div className="space-y-4">
          {descriptions.map((desc, index) => (
            <div key={index} className="flex gap-2">
              <Textarea 
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder="Digite o parágrafo"
                className="min-h-[80px]"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeDescription(index)}
                className="h-8 px-2"
                disabled={descriptions.length <= 1}
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

export default AboutDescriptions;
