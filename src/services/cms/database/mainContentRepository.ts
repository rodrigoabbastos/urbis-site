
import { SiteContent } from '@/services/cms/types';
import { supabase } from '@/lib/supabase';
import { defaultContent } from '@/services/cms/defaultContent';
import { 
  ContentRow, 
  DEFAULT_CONTENT_ID, 
  CONTENT_TABLE, 
  prepareContentForSaving,
  mapContentRowToDomainModel,
  typeCastFromJson
} from './utils/typeConversion';
import { fromJson, toJson } from '@/services/cms/utils/typeUtils';

// Main content repository for managing the core site content
class MainContentRepository {
  // Unified function that replaces saveContent and saveMainContent
  async saveContent(content: Partial<SiteContent>): Promise<boolean> {
    try {
      console.log('Saving content to Supabase:', content);
      
      // Prepare the data for insertion/update
      const contentData = prepareContentForSaving(content);
      
      const { data, error } = await supabase
        .from(CONTENT_TABLE)
        .upsert(contentData)
        .select();

      if (error) {
        console.error('Error saving content:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception saving content:', error);
      return false;
    }
  }

  // Add the fetchMainContent function
  async fetchMainContent() {
    try {
      // Check if the content table exists
      const { data: tableExists } = await supabase.rpc('table_exists', {
        table_name: CONTENT_TABLE
      });
      
      if (!tableExists) {
        console.log('Content table does not exist yet');
        return null;
      }
      
      // Fetch the content
      const { data, error } = await supabase
        .from(CONTENT_TABLE)
        .select('*')
        .eq('id', DEFAULT_CONTENT_ID)
        .single();
        
      if (error) {
        console.error('Error loading content:', error);
        return null;
      }
      
      if (!data) {
        console.log('No content found');
        return null;
      }
      
      // Cast data to our ContentRow type
      const contentRow = data as ContentRow;
      
      // Add a field to indicate it's from the database and contains Json types
      // Ensure projects field exists in the returned data
      return { 
        ...contentRow,
        // Make sectionVisibility available for compatibility
        sectionVisibility: contentRow.section_visibility,
        isDbContent: true,
        // Ensure projects exists and has the right structure
        projects: contentRow.projects || toJson({ title: '', description: '', items: [] })
      };
    } catch (error) {
      console.error('Exception loading content:', error);
      return null;
    }
  }

  // Complete function to load content as a domain model
  async loadContent(): Promise<SiteContent | null> {
    try {
      // Check if the content table exists
      const { data: tableExists } = await supabase.rpc('table_exists', {
        table_name: CONTENT_TABLE
      });
      
      if (!tableExists) {
        console.log('Content table does not exist yet');
        return null;
      }
      
      // Fetch the content
      const { data, error } = await supabase
        .from(CONTENT_TABLE)
        .select('*')
        .eq('id', DEFAULT_CONTENT_ID)
        .single();
        
      if (error) {
        console.error('Error loading content:', error);
        return null;
      }
      
      if (!data) {
        console.log('No content found');
        return null;
      }
      
      // Cast data to our ContentRow type for proper typing
      const contentRow = data as ContentRow;
      
      // Map to domain model
      const content = mapContentRowToDomainModel(contentRow);
      
      return content;
    } catch (error) {
      console.error('Exception loading content:', error);
      return null;
    }
  }
}

export const mainContentRepository = new MainContentRepository();
