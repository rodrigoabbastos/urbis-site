
import { toast } from '@/components/ui/use-toast';
import { MethodologyStep } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';

export class MethodologyService extends BaseService {
  async updateMethodology(methodology: { title: string; description: string; steps: MethodologyStep[] }): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.methodology = methodology;
        await databaseService.saveMainContent(content);
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content');
      }
      
      this.showSuccessToast("Conteúdo da seção Metodologia atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo da seção Metodologia.");
    }
  }
  
  async updateMethodologyStep(step: MethodologyStep): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content) && content.methodology) {
        const steps = content.methodology.steps || [];
        const index = steps.findIndex(s => s.id === step.id);
        
        if (index !== -1) {
          steps[index] = step;
        } else {
          steps.push(step);
        }
        
        content.methodology.steps = steps;
        await databaseService.saveMainContent(content);
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content or methodology not found');
      }
      
      this.showSuccessToast("Etapa da metodologia atualizada com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar a etapa da metodologia.");
    }
  }
  
  async deleteMethodologyStep(id: string): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content) && content.methodology && content.methodology.steps) {
        content.methodology.steps = content.methodology.steps.filter(s => s.id !== id);
        await databaseService.saveMainContent(content);
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content or methodology not found');
      }
      
      this.showSuccessToast("Etapa da metodologia excluída com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível excluir a etapa da metodologia.");
    }
  }
}

export const methodologyService = new MethodologyService();
