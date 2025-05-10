
import { toast } from '@/components/ui/use-toast';
import { HeroContent } from '../types';
import { BaseCMSService } from '../core/baseCmsService';

export class HeroService extends BaseCMSService {
  async updateHero(hero: HeroContent): Promise<void> {
    try {
      const content = await this.getContent();
      content.hero = hero;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Hero atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating hero:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo do Hero.",
        variant: "destructive",
      });
    }
  }
}

export const heroService = new HeroService();
