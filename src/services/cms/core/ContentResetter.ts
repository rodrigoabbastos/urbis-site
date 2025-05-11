
import { databaseService } from '../database/databaseService';
import { BaseService } from '../BaseService';
import { defaultContent } from '../defaultContent';
import { toast } from '@/components/ui/use-toast';

export class ContentResetter extends BaseService {
  async resetToDefault(): Promise<void> {
    try {
      const success = await databaseService.resetToDefault(defaultContent);
      
      if (success) {
        toast({
          title: "Conteúdo Resetado",
          description: "Todo o conteúdo foi restaurado para os valores padrão.",
        });
      } else {
        throw new Error('Falha ao resetar o conteúdo');
      }
    } catch (error) {
      this.handleError(error, "Não foi possível resetar o conteúdo.");
    }
  }
}
