
import { toast } from '@/components/ui/use-toast';
import { ContactInfo } from '../types';
import { BaseCMSService } from '../core/baseCmsService';

export class ContactService extends BaseCMSService {
  async updateContactInfo(contact: ContactInfo): Promise<void> {
    try {
      const content = await this.getContent();
      content.contact = contact;
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Informações de contato atualizadas com sucesso!",
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as informações de contato.",
        variant: "destructive",
      });
    }
  }
}

export const contactService = new ContactService();
