
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface SectionInfoFormProps {
  title: string;
  description: string;
  onSave: (title: string, description: string) => Promise<void>;
}

const SectionInfoForm = ({ title, description, onSave }: SectionInfoFormProps) => {
  const [sectionTitle, setSectionTitle] = useState(title);
  const [sectionDescription, setSectionDescription] = useState(description);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSection = async () => {
    if (!sectionTitle) {
      toast({
        title: "Erro",
        description: "O título da seção é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSaving(true);
      await onSave(sectionTitle, sectionDescription);
    } catch (error) {
      console.error('Error saving section info:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as informações da seção.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg">
      <h2 className="text-lg font-medium">Informações da Seção</h2>
      
      <div className="space-y-2">
        <Label htmlFor="sectionTitle">Título da seção</Label>
        <Input 
          id="sectionTitle"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Ex: Projetos em destaque"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sectionDescription">Descrição da seção</Label>
        <Textarea 
          id="sectionDescription"
          value={sectionDescription}
          onChange={(e) => setSectionDescription(e.target.value)}
          placeholder="Breve descrição sobre os projetos"
          rows={3}
        />
      </div>
      
      <Button 
        onClick={handleSaveSection}
        className="w-fit"
        disabled={isSaving}
      >
        {isSaving ? 'Salvando...' : 'Salvar informações da seção'}
      </Button>
    </div>
  );
};

export default SectionInfoForm;
