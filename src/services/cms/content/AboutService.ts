
import { toast } from '@/components/ui/use-toast';
import { AboutContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';

export class AboutService extends BaseService {
  async updateAbout(about: AboutContent): Promise<void> {
    try {
      // Buscar conteúdo principal
      const content = await databaseService.fetchMainContent();
      
      if (content && !('error' in content)) {
        // Atualizar a seção "about" e salvar todo o conteúdo
        content.about = about;
        const success = await databaseService.saveMainContent(content);
        
        if (!success) {
          throw new Error('Falha ao salvar conteúdo no banco de dados');
        }
        
        // Atualiza o cache do serviço CMS para refletir as mudanças imediatamente
        const cmsCache = await import('../CmsServiceCore');
        await cmsCache.default.loadContentToCache();
        
        this.showSuccessToast("Conteúdo da seção Sobre atualizado com sucesso!");
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content');
      }
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o conteúdo da seção Sobre.");
    }
  }
}

export const aboutService = new AboutService();
