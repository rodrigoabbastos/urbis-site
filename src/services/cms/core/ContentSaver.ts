
import { SiteContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';
import { toast } from '@/components/ui/use-toast';

export class ContentSaver extends BaseService {
  async saveContent(content: SiteContent): Promise<void> {
    try {
      // Store main content directly to database
      const { hero, about, services, methodology, contact, clients, sectionVisibility, ebooks } = content;
      
      console.log('ContentSaver.saveContent: Salvando conteúdo completo', {
        clients: clients ? 'presente' : 'ausente',
        sectionVisibility: sectionVisibility ? 'presente' : 'ausente',
        ebooks: ebooks ? 'presente' : 'ausente'
      });
      
      await databaseService.saveMainContent({ 
        hero, 
        about, 
        services, 
        methodology, 
        contact,
        clients,
        sectionVisibility,
        ebooks
      });
      
      // Store projects info
      const projectsContent = {
        title: content.projects.title,
        description: content.projects.description
      };
      
      await databaseService.saveProjectsInfo(projectsContent);
      
      this.showSuccessToast("Conteúdo salvo com sucesso!");
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o conteúdo. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
    }
  }
  
  async updatePartialContent<K extends keyof SiteContent>(
    section: K, 
    content: SiteContent[K]
  ): Promise<void> {
    try {
      console.log(`ContentSaver.updatePartialContent: Atualizando seção ${String(section)}`, content);
      
      // Get current content from the content loader
      const contentLoader = new ContentLoader();
      const currentContent = await contentLoader.loadContentFromDatabase();
      
      // Update only the specified section
      const updatedContent = {
        ...currentContent,
        [section]: content
      };
      
      console.log(`Conteúdo atualizado com ${String(section)}:`, 
        section === 'clients' ? 'dados de clientes presentes' : 'outra seção');
      
      // Log section visibility specifically when that's what we're updating
      if (section === 'sectionVisibility') {
        console.log('Atualizando configurações de visibilidade:', content);
      }
      
      // Save the entire content
      await this.saveContent(updatedContent);
      
      this.showSuccessToast(`Conteúdo de ${String(section)} atualizado com sucesso!`);
    } catch (error) {
      this.handleError(error, `Falha ao atualizar ${String(section)}`);
    }
  }
}
