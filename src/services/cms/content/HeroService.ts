
import { toast } from '@/components/ui/use-toast';
import { HeroContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';
import { toJson } from '../utils/typeUtils';

export class HeroService extends BaseService {
  async updateHero(hero: HeroContent): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !(typeof content === 'object' && 'error' in content)) {
        const updatedContent = {
          ...content,
          hero: toJson(hero)
        };
        await databaseService.saveMainContent(updatedContent);
      } else {
        throw new Error(
          typeof content === 'object' && content !== null && 'error' in content 
            ? String(content.error) 
            : 'Failed to fetch content'
        );
      }
      
      this.showSuccessToast("Conteúdo da seção Hero atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo do Hero.");
    }
  }
}

export const heroService = new HeroService();
