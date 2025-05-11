
import { toast } from '@/components/ui/use-toast';
import { ContactInfo } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';
import { Json } from '@/integrations/supabase/types';

export class ContactService extends BaseService {
  async updateContactInfo(contact: ContactInfo): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !(typeof content === 'object' && 'error' in content)) {
        const updatedContent = {
          ...content,
          contact: contact as unknown as Json
        };
        await databaseService.saveMainContent(updatedContent);
      } else {
        throw new Error(
          typeof content === 'object' && content !== null && 'error' in content 
            ? String(content.error) 
            : 'Failed to fetch content'
        );
      }
      
      this.showSuccessToast("Informações de contato atualizadas com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar as informações de contato.");
    }
  }
}

export const contactService = new ContactService();
