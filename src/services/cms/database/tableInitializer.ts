
import { toast } from '@/components/ui/use-toast';
import { supabaseHelper } from './databaseUtils';

export async function createTablesIfNotExist(): Promise<void> {
  try {
    // First, check if tables exist directly using SQL queries
    const { data: contentTableExists } = await supabaseHelper.rpc('table_exists', { table_name: 'content' });
    
    if (!contentTableExists) {
      const { error: contentError } = await supabaseHelper.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.content (
            id TEXT PRIMARY KEY,
            hero JSONB,
            about JSONB,
            services JSONB,
            methodology JSONB,
            contact JSONB,
            clients JSONB,
            section_visibility JSONB,
            sectionVisibility JSONB,
            ebooks JSONB,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
        `
      });
      
      if (contentError) {
        console.error('Error creating content table:', contentError);
      }
    }
    
    const { data: linkedinPostsTableExists } = await supabaseHelper.rpc('table_exists', { table_name: 'linkedin_posts' });
    
    if (!linkedinPostsTableExists) {
      const { error: postsError } = await supabaseHelper.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.linkedin_posts (
            id TEXT PRIMARY KEY,
            text_snippet TEXT NOT NULL,
            image_url TEXT,
            post_url TEXT NOT NULL,
            date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (postsError) {
        console.error('Error creating linkedin_posts table:', postsError);
      }
    }
    
    const { data: projectsTableExists } = await supabaseHelper.rpc('table_exists', { table_name: 'projects' });
    
    if (!projectsTableExists) {
      const { error: projectsError } = await supabaseHelper.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            client TEXT NOT NULL,
            year TEXT NOT NULL,
            type TEXT NOT NULL,
            link TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (projectsError) {
        console.error('Error creating projects table:', projectsError);
      }
    }

    // Ensure all content columns exist, incluindo ambas as versões do campo de visibilidade
    const { error: columnsError } = await supabaseHelper.rpc('run_sql', {
      sql: `
        ALTER TABLE IF EXISTS public.content 
        ADD COLUMN IF NOT EXISTS clients JSONB,
        ADD COLUMN IF NOT EXISTS section_visibility JSONB,
        ADD COLUMN IF NOT EXISTS sectionVisibility JSONB,
        ADD COLUMN IF NOT EXISTS ebooks JSONB;
      `
    });
    
    if (columnsError) {
      console.error('Error adding columns to content table:', columnsError);
    }
  } catch (error) {
    console.error('Error checking tables:', error);
    
    // Fallback to direct SQL execution
    try {
      // Execute raw SQL to create tables
      await supabaseHelper.rpc('run_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public.content (
            id TEXT PRIMARY KEY,
            hero JSONB,
            about JSONB,
            services JSONB,
            methodology JSONB,
            contact JSONB,
            clients JSONB,
            section_visibility JSONB,
            sectionVisibility JSONB,
            ebooks JSONB,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
          
          CREATE TABLE IF NOT EXISTS public.linkedin_posts (
            id TEXT PRIMARY KEY,
            text_snippet TEXT NOT NULL,
            image_url TEXT,
            post_url TEXT NOT NULL,
            date TIMESTAMPTZ DEFAULT NOW(),
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
          
          CREATE TABLE IF NOT EXISTS public.projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            client TEXT NOT NULL,
            year TEXT NOT NULL,
            type TEXT NOT NULL,
            link TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
        `
      });
    } catch (fallbackError) {
      console.error('Failed to create tables with fallback method:', fallbackError);
    }
  }
}
