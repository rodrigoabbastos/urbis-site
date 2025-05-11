
import { toast } from '@/components/ui/use-toast';
import { MethodologyStep } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';
import { Json } from '@/integrations/supabase/types';

export class MethodologyService extends BaseService {
  async updateMethodology(methodology: { title: string; description: string; steps: MethodologyStep[] }): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !(typeof content === 'object' && 'error' in content)) {
        const updatedContent = {
          ...content,
          methodology: methodology as unknown as Json
        };
        await databaseService.saveMainContent(updatedContent);
      } else {
        throw new Error(
          typeof content === 'object' && content !== null && 'error' in content 
            ? String(content.error) 
            : 'Failed to fetch content'
        );
      }
      
      this.showSuccessToast("Conteúdo da seção Metodologia atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo da seção Metodologia.");
    }
  }
  
  async updateMethodologyStep(step: MethodologyStep): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !(typeof content === 'object' && 'error' in content) && content.methodology) {
        // Safely cast to the expected structure
        const methodologyContent = content.methodology as unknown as { 
          title: string; 
          description: string; 
          steps: MethodologyStep[] 
        };
        
        const steps = Array.isArray(methodologyContent.steps) ? 
          [...methodologyContent.steps] : [];
        
        const index = steps.findIndex(s => s.id === step.id);
        
        if (index !== -1) {
          steps[index] = step;
        } else {
          steps.push(step);
        }
        
        // Create updated methodology object
        const updatedMethodology = {
          ...methodologyContent,
          steps
        };
        
        // Update content
        const updatedContent = {
          ...content,
          methodology: updatedMethodology as unknown as Json
        };
        
        await databaseService.saveMainContent(updatedContent);
      } else {
        throw new Error(
          typeof content === 'object' && content !== null && 'error' in content 
            ? String(content.error) 
            : 'Failed to fetch content or methodology not found'
        );
      }
      
      this.showSuccessToast("Etapa da metodologia atualizada com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar a etapa da metodologia.");
    }
  }
  
  async deleteMethodologyStep(id: string): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !(typeof content === 'object' && 'error' in content) && content.methodology) {
        // Safely cast to the expected structure
        const methodologyContent = content.methodology as unknown as { 
          title: string; 
          description: string; 
          steps: MethodologyStep[] 
        };
        
        if (Array.isArray(methodologyContent.steps)) {
          // Filter out the step with the given ID
          const updatedSteps = methodologyContent.steps.filter(s => s.id !== id);
          
          // Create updated methodology object
          const updatedMethodology = {
            ...methodologyContent,
            steps: updatedSteps
          };
          
          // Update content
          const updatedContent = {
            ...content,
            methodology: updatedMethodology as unknown as Json
          };
          
          await databaseService.saveMainContent(updatedContent);
        }
      } else {
        throw new Error(
          typeof content === 'object' && content !== null && 'error' in content 
            ? String(content.error) 
            : 'Failed to fetch content or methodology not found'
        );
      }
      
      this.showSuccessToast("Etapa da metodologia excluída com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível excluir a etapa da metodologia.");
    }
  }
}

export const methodologyService = new MethodologyService();
