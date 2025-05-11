
import { SiteContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';
import { toast } from '@/components/ui/use-toast';
import { ContentLoader } from './ContentLoader';
import { Json } from '@/integrations/supabase/types';

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
      
      // Create a payload that has both camelCase and snake_case versions of sectionVisibility
      // to ensure compatibility with different database field naming conventions
      const payload = { 
        hero: hero as unknown as Json, 
        about: about as unknown as Json, 
        services: services as unknown as Json, 
        methodology: methodology as unknown as Json, 
        contact: contact as unknown as Json,
        clients: clients as unknown as Json,
        sectionVisibility: sectionVisibility as unknown as Json,
        section_visibility: sectionVisibility as unknown as Json, // Add snake_case version
        ebooks: ebooks as unknown as Json
      };
      
      await databaseService.saveMainContent(payload);
      
      // Store projects info
      if (content.projects) {
        const projectsContent = {
          title: content.projects.title,
          description: content.projects.description
        };
        
        await databaseService.saveProjectsInfo(projectsContent);
      }
      
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

  // Add a method specifically for updating section title and description
  async updateSectionInfo(
    section: keyof SiteContent, 
    title: string, 
    description: string | string[]
  ): Promise<void> {
    try {
      // Get current content from the content loader
      const contentLoader = new ContentLoader();
      const currentContent = await contentLoader.loadContentFromDatabase();
      
      // Make a copy of the current content for the section
      const sectionContent = { ...currentContent[section] };
      
      // Update the title and description
      if (typeof sectionContent === 'object' && sectionContent !== null) {
        // Handle different section structures
        if (section === 'methodology' || section === 'clients' || section === 'ebooks') {
          // These sections have simple title/description at the root level
          sectionContent.title = title;
          sectionContent.description = description;
        } else if (section === 'hero') {
          // Hero has title as title and subtitle as description
          sectionContent.title = title;
          sectionContent.subtitle = Array.isArray(description) ? description[0] : description;
        } else if (section === 'about') {
          // About has title and description array
          sectionContent.title = title;
          sectionContent.description = Array.isArray(description) ? description : [description];
        }
        
        // Update the content with the modified section
        await this.updatePartialContent(section, sectionContent);
        
        this.showSuccessToast(`Título e descrição de ${String(section)} atualizados com sucesso!`);
      } else {
        throw new Error(`A seção ${String(section)} não possui uma estrutura válida`);
      }
    } catch (error) {
      this.handleError(error, `Falha ao atualizar título e descrição de ${String(section)}`);
    }
  }
}
