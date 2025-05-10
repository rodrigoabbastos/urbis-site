
import { toast } from '@/components/ui/use-toast';
import { Service } from '../types';
import { BaseCMSService } from '../core/baseCmsService';

export class ServicesService extends BaseCMSService {
  async updateService(service: Service): Promise<void> {
    try {
      const content = await this.getContent();
      const index = content.services.findIndex(s => s.id === service.id);
      
      if (index !== -1) {
        content.services[index] = service;
      } else {
        content.services.push(service);
      }
      
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Serviço atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o serviço.",
        variant: "destructive",
      });
    }
  }
  
  async deleteService(id: string): Promise<void> {
    try {
      const content = await this.getContent();
      content.services = content.services.filter(s => s.id !== id);
      await this.saveContent(content);
      
      toast({
        title: "Sucesso",
        description: "Serviço excluído com sucesso!",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o serviço.",
        variant: "destructive",
      });
    }
  }
}

export const servicesService = new ServicesService();
