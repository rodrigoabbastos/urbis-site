
import { SiteContent } from '@/services/cms/types';
import { supabase } from '@/lib/supabase';
import { defaultContent } from '../defaultContent';

const CONTENT_TABLE = 'content';
const DEFAULT_CONTENT_ID = 'default';

// Unified function that replaces saveContent and saveMainContent
export const saveContent = async (content: Partial<SiteContent>): Promise<boolean> => {
  try {
    console.log('Saving content to Supabase:', content);
    
    // Prepare the data for insertion/update
    const { data, error } = await supabase
      .from('content')
      .upsert({
        id: DEFAULT_CONTENT_ID,
        hero: content.hero,
        about: content.about,
        services: content.services,
        methodology: content.methodology,
        projects: content.projects,
        contact: content.contact,
        clients: content.clients,
        ebooks: content.ebooks,
        section_visibility: content.sectionVisibility,
        updated_at: new Date().toISOString()
      })
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
};

// Alias for saveContent to match the expected function name in other files
export const saveMainContent = saveContent;

// Add the fetchMainContent function
export const fetchMainContent = async () => {
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
    
    return data;
  } catch (error) {
    console.error('Exception loading content:', error);
    return null;
  }
};

// Add fetchProjectsInfo function
export const fetchProjectsInfo = async () => {
  const content = await fetchMainContent();
  if (content && content.projects) {
    return {
      title: content.projects.title,
      description: content.projects.description
    };
  }
  return null;
};

// Add saveProjectsInfo function
export const saveProjectsInfo = async (projectsInfo: { title: string; description: string }): Promise<boolean> => {
  try {
    const content = await fetchMainContent();
    if (!content) return false;
    
    const updatedContent = {
      ...content,
      projects: {
        ...content.projects,
        title: projectsInfo.title,
        description: projectsInfo.description
      }
    };
    
    return await saveContent(updatedContent);
  } catch (error) {
    console.error('Error saving projects info:', error);
    return false;
  }
};

export const resetContentToDefault = async (): Promise<boolean> => {
  try {
    console.log('Resetting content to default values');
    
    // Prepare the default data for insertion/update
    const { data, error } = await supabase
      .from('content')
      .upsert({
        id: DEFAULT_CONTENT_ID,
        hero: defaultContent.hero,
        about: defaultContent.about,
        services: defaultContent.services,
        methodology: defaultContent.methodology,
        projects: defaultContent.projects,
        contact: defaultContent.contact,
        clients: defaultContent.clients,
        ebooks: defaultContent.ebooks,
        section_visibility: defaultContent.sectionVisibility,
        updated_at: new Date().toISOString()
      })
      .select();
      
    if (error) {
      console.error('Error resetting content:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception resetting content:', error);
    return false;
  }
};

export const loadContent = async (): Promise<SiteContent | null> => {
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
    
    // Map section_visibility to sectionVisibility for consistency
    const content = {
      ...data,
      // Ensure we handle both property names for backward compatibility
      sectionVisibility: data.section_visibility || defaultContent.sectionVisibility
    };
    
    return content as unknown as SiteContent;
  } catch (error) {
    console.error('Exception loading content:', error);
    return null;
  }
};
