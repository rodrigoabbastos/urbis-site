
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface SectionInfoEditorProps {
  sectionKey: string;
  title: string;
  description: string | string[];
  onSave: (title: string, description: string | string[]) => Promise<void>;
  multilineDescription?: boolean;
}

const SectionInfoEditor: React.FC<SectionInfoEditorProps> = ({
  sectionKey,
  title,
  description,
  onSave,
  multilineDescription = false
}) => {
  // State for form fields
  const [sectionTitle, setSectionTitle] = useState(title);
  const [sectionDescription, setSectionDescription] = useState(
    Array.isArray(description) ? description.join('\n') : description
  );
  const [isSaving, setIsSaving] = useState(false);

  // Update state when props change
  useEffect(() => {
    setSectionTitle(title);
    setSectionDescription(
      Array.isArray(description) ? description.join('\n') : description
    );
  }, [title, description]);

  const handleSave = async () => {
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
      
      // Process description based on whether it should be multiline or not
      let processedDescription;
      if (multilineDescription) {
        // Split text by newlines and filter out empty strings
        processedDescription = sectionDescription
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
      } else {
        processedDescription = sectionDescription;
      }

      await onSave(sectionTitle, processedDescription);
      
      toast({
        title: "Sucesso",
        description: `Informações da seção ${sectionKey} atualizadas com sucesso!`,
      });
    } catch (error) {
      console.error(`Error saving ${sectionKey} section info:`, error);
      toast({
        title: "Erro",
        description: `Não foi possível salvar as informações da seção ${sectionKey}.`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Informações da Seção {sectionKey}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${sectionKey}-title`}>Título da seção</Label>
            <Input
              id={`${sectionKey}-title`}
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Insira o título da seção"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${sectionKey}-description`}>Descrição da seção</Label>
            <Textarea
              id={`${sectionKey}-description`}
              value={sectionDescription}
              onChange={(e) => setSectionDescription(e.target.value)}
              placeholder="Insira a descrição da seção"
              rows={multilineDescription ? 5 : 3}
            />
            {multilineDescription && (
              <p className="text-xs text-gray-500">
                Cada linha será tratada como um parágrafo separado
              </p>
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Informações'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionInfoEditor;
