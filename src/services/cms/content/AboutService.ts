
import { toast } from '@/components/ui/use-toast';
import { AboutContent } from '../types';
import { BaseService } from '../BaseService';
import { databaseService } from '../database/databaseService';
import { cacheService } from '../CacheService';
import { Json } from '@/integrations/supabase/types';

export class AboutService extends BaseService {
  /**
   * Updates the About section content in the database
   * @param about The new About content to be saved
   * @returns A promise that resolves when the operation is complete
   */
  async updateAbout(about: AboutContent): Promise<void> {
    try {
      console.log('AboutService: Updating about section with new data', about);
      
      // Fetch the latest content directly from the database
      const content = await databaseService.fetchMainContent();
      
      if (!content) {
        console.warn('AboutService: No content found in database, creating new record');
        // Create new content object with only about section
        const newContent = {
          about: about as unknown as Json,
          hero: null,
          services: null,
          methodology: null,
          contact: null
        };
        
        const success = await databaseService.saveMainContent(newContent);
        
        if (!success) {
          throw new Error('Failed to create new content record in database');
        }
        
        this.showSuccessToast("Conteúdo da seção Sobre criado com sucesso!");
        return;
      }
      
      if (typeof content === 'object' && 'error' in content) {
        throw new Error(typeof content.error === 'object' && content.error !== null 
          ? String((content.error as any).message)
          : 'Failed to fetch content');
      }
      
      // Update the about section while preserving other sections
      const updatedContent = { ...content, about: about as unknown as Json };
      
      // Save the updated content back to the database
      const success = await databaseService.saveMainContent(updatedContent);
      
      if (!success) {
        throw new Error('Failed to save content to database');
      }
      
      // Clear any cached content to ensure fresh data is always loaded
      cacheService.clearCache();
      
      console.log('AboutService: About section updated successfully');
      this.showSuccessToast("Conteúdo da seção Sobre atualizado com sucesso!");
    } catch (error) {
      console.error('AboutService: Error updating about section:', error);
      this.handleError(error, "Não foi possível atualizar o conteúdo da seção Sobre.");
      throw error; // Re-throw to allow calling code to handle if needed
    }
  }
  
  /**
   * Fetches the About content directly from the database
   * @returns Promise resolving to the About content
   */
  async getAboutContent(): Promise<AboutContent | null> {
    try {
      console.log('AboutService: Fetching about content directly from database');
      const content = await databaseService.fetchMainContent();
      
      if (!content || (typeof content === 'object' && 'error' in content)) {
        console.warn('AboutService: Error fetching about content:', 
          typeof content === 'object' && content !== null && 'error' in content 
            ? String((content.error as any).message) 
            : 'No content found');
        return null;
      }
      
      // Safely cast the about content to AboutContent
      if (content.about) {
        return content.about as unknown as AboutContent;
      }
      return null;
    } catch (error) {
      console.error('AboutService: Error fetching about content:', error);
      this.showErrorToast("Não foi possível carregar o conteúdo da seção Sobre.");
      return null;
    }
  }
}

export const aboutService = new AboutService();
