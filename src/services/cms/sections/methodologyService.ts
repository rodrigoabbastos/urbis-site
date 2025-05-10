
import { toast } from '@/components/ui/use-toast';
import { MethodologyStep } from '../types';
import { BaseCMSService } from '../core/baseCmsService';
import { defaultContent } from '../defaultContent';

export class MethodologyService extends BaseCMSService {
  async updateMethodology(methodology: typeof defaultContent.methodology): Promise<void> {
    try {
      const content = await this.getContent();
      content.methodology = methodology;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Metodologia atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating methodology:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo da seção Metodologia.",
        variant: "destructive",
      });
    }
  }
  
  async updateMethodologyStep(step: MethodologyStep): Promise<void> {
    try {
      const content = await this.getContent();
      const index = content.methodology.steps.findIndex(s => s.id === step.id);
      
      if (index !== -1) {
        content.methodology.steps[index] = step;
      } else {
        content.methodology.steps.push(step);
      }
      
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Etapa da metodologia atualizada com sucesso!",
      });
    } catch (error) {
      console.error('Error updating methodology step:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a etapa da metodologia.",
        variant: "destructive",
      });
    }
  }
  
  async deleteMethodologyStep(id: string): Promise<void> {
    try {
      const content = await this.getContent();
      content.methodology.steps = content.methodology.steps.filter(s => s.id !== id);
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Etapa da metodologia excluída com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting methodology step:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a etapa da metodologia.",
        variant: "destructive",
      });
    }
  }
}

export const methodologyService = new MethodologyService();
