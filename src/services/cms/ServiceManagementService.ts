
import { toast } from '@/components/ui/use-toast';
import { Service } from './types';
import { BaseService } from './BaseService';
import { databaseService } from './databaseService';

export class ServiceManagementService extends BaseService {
  async updateService(service: Service): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && content.services) {
        const services = Array.isArray(content.services) ? content.services : [];
        const index = services.findIndex(s => s.id === service.id);
        
        if (index !== -1) {
          services[index] = service;
        } else {
          services.push(service);
        }
        
        content.services = services;
        await databaseService.saveMainContent(content);
      }
      
      this.showSuccessToast("Serviço atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o serviço.");
    }
  }
  
  async deleteService(id: string): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && content.services) {
        content.services = Array.isArray(content.services) 
          ? content.services.filter(s => s.id !== id)
          : [];
        await databaseService.saveMainContent(content);
      }
      
      this.showSuccessToast("Serviço excluído com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível excluir o serviço.");
    }
  }
}

export const serviceManagementService = new ServiceManagementService();
