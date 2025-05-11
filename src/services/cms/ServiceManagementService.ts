
import { toast } from '@/components/ui/use-toast';
import { Service } from './types';
import { BaseService } from './BaseService';
import { databaseService } from './database/databaseService';

export class ServiceManagementService extends BaseService {
  async updateService(service: Service): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content)) {
        // Handle services as an array, with safe type checking
        const services = Array.isArray(content.services) ? 
          content.services as Service[] : 
          [];
        
        // Find the service by ID
        const index = services.findIndex(s => 
          typeof s === 'object' && 
          's' !== null && 
          'id' in s && 
          s.id === service.id
        );
        
        if (index !== -1) {
          services[index] = service;
        } else {
          services.push(service);
        }
        
        // Update the content with the new services array
        await databaseService.saveMainContent({
          ...content,
          services
        });
      } else {
        throw new Error(content && typeof content === 'object' && 'error' in content 
          ? String(content.error) 
          : 'Failed to fetch content'
        );
      }
      
      this.showSuccessToast("Serviço atualizado com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível atualizar o serviço.");
    }
  }
  
  async deleteService(id: string): Promise<void> {
    try {
      const content = await databaseService.fetchMainContent();
      if (content && !('error' in content) && content.services) {
        // Filter out the service with the given ID
        const services = Array.isArray(content.services) ?
          content.services.filter(s => 
            typeof s === 'object' && 
            s !== null && 
            'id' in s && 
            s.id !== id
          ) as Service[] :
          [];
          
        await databaseService.saveMainContent({
          ...content,
          services
        });
      } else {
        throw new Error(content && typeof content === 'object' && 'error' in content 
          ? String(content.error) 
          : 'Failed to fetch content'
        );
      }
      
      this.showSuccessToast("Serviço excluído com sucesso!");
    } catch (error) {
      this.handleError(error, "Não foi possível excluir o serviço.");
    }
  }
}

export const serviceManagementService = new ServiceManagementService();
