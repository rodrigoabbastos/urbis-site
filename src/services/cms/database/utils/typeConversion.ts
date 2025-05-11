
import { SiteContent } from '@/services/cms/types';
import { Json } from '@/integrations/supabase/types';
import { fromJson, toJson } from '@/services/cms/utils/typeUtils';
import { defaultContent } from '@/services/cms/defaultContent';

// Helper function to safely type cast
export function typeCastFromJson<T>(data: Json | null, defaultValue: T): T {
  if (!data) return defaultValue;
  return data as unknown as T;
}

// Define the type for the database content row
export interface ContentRow {
  id: string;
  hero: Json | null;
  about: Json | null;
  services: Json | null;
  methodology: Json | null;
  contact: Json | null;
  clients: Json | null;
  ebooks: Json | null;
  projects: Json | null;
  section_visibility: Json | null;
  sectionVisibility: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

// Constants for database operations
export const CONTENT_TABLE = 'content';
export const DEFAULT_CONTENT_ID = 'default';

// Helper to prepare content data for saving
export function prepareContentForSaving(content: Partial<SiteContent>) {
  return {
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
  };
}

// Helper function to map database rows to domain model
export function mapContentRowToDomainModel(contentRow: ContentRow): SiteContent {
  return {
    hero: typeCastFromJson(contentRow.hero, defaultContent.hero),
    about: typeCastFromJson(contentRow.about, defaultContent.about),
    services: typeCastFromJson(contentRow.services, defaultContent.services),
    methodology: typeCastFromJson(contentRow.methodology, defaultContent.methodology),
    contact: typeCastFromJson(contentRow.contact, defaultContent.contact),
    clients: typeCastFromJson(contentRow.clients, defaultContent.clients),
    projects: typeCastFromJson(contentRow.projects, defaultContent.projects),
    ebooks: typeCastFromJson(contentRow.ebooks, defaultContent.ebooks),
    linkedInPosts: defaultContent.linkedInPosts, // Will be loaded separately
    // Ensure we handle both property names for backward compatibility
    sectionVisibility: typeCastFromJson(
      contentRow.section_visibility || contentRow.sectionVisibility, 
      defaultContent.sectionVisibility
    ),
  };
}
