
import { toast } from '@/components/ui/use-toast';
import { AboutContent } from '../types';
import { BaseCMSService } from '../core/baseCmsService';

export class AboutService extends BaseCMSService {
  async updateAbout(about: AboutContent): Promise<void> {
    try {
      const content = await this.getContent();
      content.about = about;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Conteúdo da seção Sobre atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating about:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo da seção Sobre.",
        variant: "destructive",
      });
    }
  }
}

export const aboutService = new AboutService();
