
import { SiteContent } from '@/services/cms/types';
import { supabase } from '@/lib/supabase';
import { defaultContent } from '../defaultContent';
import { Json } from '@/integrations/supabase/types';
import { fromJson, toJson } from '../utils/typeUtils';

// Helper function to safely type cast
function typeCastFromJson<T>(data: Json | null, defaultValue: T): T {
  if (!data) return defaultValue;
  return data as unknown as T;
}

// Unified function that replaces saveContent and saveMainContent
export const saveContent = async (content: Partial<SiteContent>): Promise<boolean> => {
  try {
    console.log('Saving content to Supabase:', content);
    
    // Prepare the data for insertion/update
    const { data, error } = await supabase
      .from('content')
      .upsert({
        id: DEFAULT_CONTENT_ID,
        hero: toJson(content.hero),
        about: toJson(content.about),
        services: toJson(content.services),
        methodology: toJson(content.methodology),
        projects: toJson(content.projects),
        contact: toJson(content.contact),
        clients: toJson(content.clients),
        ebooks: toJson(content.ebooks),
        section_visibility: toJson(content.sectionVisibility),
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

const CONTENT_TABLE = 'content';
const DEFAULT_CONTENT_ID = 'default';

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
    
    // Add a field to indicate it's from the database and contains Json types
    // Ensure projects field exists in the returned data
    return { 
      ...data,
      // Make sectionVisibility available for compatibility
      sectionVisibility: data.section_visibility,
      isDbContent: true,
      // Ensure projects exists and has the right structure
      projects: data.projects || toJson({ title: '', description: '', items: [] })
    };
  } catch (error) {
    console.error('Exception loading content:', error);
    return null;
  }
};

// Add fetchProjectsInfo function
export const fetchProjectsInfo = async () => {
  const content = await fetchMainContent();
  if (content && content.projects) {
    const projectsData = fromJson({}, content.projects);
    return {
      title: projectsData.title || '',
      description: projectsData.description || ''
    };
  }
  return null;
};

// Add saveProjectsInfo function
export const saveProjectsInfo = async (projectsInfo: { title: string; description: string }): Promise<boolean> => {
  try {
    const content = await fetchMainContent();
    if (!content) return false;
    
    const projects = content.projects 
      ? fromJson({}, content.projects) 
      : { items: [] };
      
    const updatedProjects = {
      ...projects,
      title: projectsInfo.title,
      description: projectsInfo.description
    };
    
    const updatedContent = {
      ...content,
      projects: toJson(updatedProjects)
    };
    
    // We need to use fromJson here to convert back to the domain model
    // before saving through saveContent which will handle the conversion to Json
    const contentToSave: Partial<SiteContent> = {
      hero: fromJson(updatedContent.hero, defaultContent.hero),
      about: fromJson(updatedContent.about, defaultContent.about),
      services: fromJson(updatedContent.services, defaultContent.services),
      methodology: fromJson(updatedContent.methodology, defaultContent.methodology),
      projects: fromJson(updatedContent.projects, defaultContent.projects),
      contact: fromJson(updatedContent.contact, defaultContent.contact),
      clients: fromJson(updatedContent.clients, defaultContent.clients),
      ebooks: fromJson(updatedContent.ebooks, defaultContent.ebooks),
      sectionVisibility: fromJson(updatedContent.section_visibility || updatedContent.sectionVisibility, defaultContent.sectionVisibility)
    };
    
    return await saveContent(contentToSave);
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
        hero: toJson(defaultContent.hero),
        about: toJson(defaultContent.about),
        services: toJson(defaultContent.services),
        methodology: toJson(defaultContent.methodology),
        projects: toJson(defaultContent.projects),
        contact: toJson(defaultContent.contact),
        clients: toJson(defaultContent.clients),
        ebooks: toJson(defaultContent.ebooks),
        section_visibility: toJson(defaultContent.sectionVisibility),
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
      ...defaultContent,
      hero: typeCastFromJson(data.hero, defaultContent.hero),
      about: typeCastFromJson(data.about, defaultContent.about),
      services: typeCastFromJson(data.services, defaultContent.services),
      methodology: typeCastFromJson(data.methodology, defaultContent.methodology),
      contact: typeCastFromJson(data.contact, defaultContent.contact),
      clients: typeCastFromJson(data.clients, defaultContent.clients),
      projects: typeCastFromJson(data.projects, defaultContent.projects),
      ebooks: typeCastFromJson(data.ebooks, defaultContent.ebooks),
      linkedInPosts: defaultContent.linkedInPosts, // Will be loaded separately
      // Ensure we handle both property names for backward compatibility
      sectionVisibility: typeCastFromJson(data.section_visibility, defaultContent.sectionVisibility),
    };
    
    return content;
  } catch (error) {
    console.error('Exception loading content:', error);
    return null;
  }
};
