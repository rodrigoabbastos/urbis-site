
import { toast } from '@/components/ui/use-toast';
import { HeroContent, AboutContent, ContactInfo, MethodologyStep } from './types';
import { BaseService } from './BaseService';
import { databaseService } from './databaseService';

export class ContentService extends BaseService {
  async updateHero(hero: HeroContent): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.hero = hero;
        await databaseService.saveMainContent(content);
      }
      
      this.showSuccessToast("Conteúdo da seção Hero atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo do Hero.");
    }
  }
  
  async updateAbout(about: AboutContent): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.about = about;
        await databaseService.saveMainContent(content);
      }
      
      this.showSuccessToast("Conteúdo da seção Sobre atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo da seção Sobre.");
    }
  }
  
  async updateMethodology(methodology: { title: string; description: string; steps: MethodologyStep[] }): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.methodology = methodology;
        await databaseService.saveMainContent(content);
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
      }
      
      this.showSuccessToast("Etapa da metodologia excluída com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível excluir a etapa da metodologia.");
    }
  }
  
  async updateContactInfo(contact: ContactInfo): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.contact = contact;
        await databaseService.saveMainContent(content);
      }
      
      this.showSuccessToast("Informações de contato atualizadas com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar as informações de contato.");
    }
  }
}

export const contentService = new ContentService();
