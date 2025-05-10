
import { toast } from '@/components/ui/use-toast';
import { HeroContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';

export class HeroService extends BaseService {
  async updateHero(hero: HeroContent): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.hero = hero;
        await databaseService.saveMainContent(content);
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content');
      }
      
      this.showSuccessToast("Conteúdo da seção Hero atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo do Hero.");
    }
  }
}

export const heroService = new HeroService();
