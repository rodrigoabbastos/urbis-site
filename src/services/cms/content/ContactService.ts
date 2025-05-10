
import { toast } from '@/components/ui/use-toast';
import { ContactInfo } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';

export class ContactService extends BaseService {
  async updateContactInfo(contact: ContactInfo): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        content.contact = contact;
        await databaseService.saveMainContent(content);
      } else {
        throw new Error(content?.error?.message || 'Failed to fetch content');
      }
      
      this.showSuccessToast("Informações de contato atualizadas com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar as informações de contato.");
    }
  }
}

export const contactService = new ContactService();
