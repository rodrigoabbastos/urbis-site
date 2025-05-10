
import { toast } from '@/components/ui/use-toast';
import { AboutContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';

export class AboutService extends BaseService {
  async updateAbout(about: AboutContent): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.about = about;
        await databaseService.saveMainContent(content);
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content');
      }
      
      this.showSuccessToast("Conteúdo da seção Sobre atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo da seção Sobre.");
    }
  }
}

export const aboutService = new AboutService();
