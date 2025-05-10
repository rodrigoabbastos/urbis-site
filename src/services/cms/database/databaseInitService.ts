
import { toast } from '@/components/ui/use-toast';
import { supabaseHelper } from './supabaseHelper';

export class DatabaseInitService {
  async createTablesIfNotExist() {
    try {
      console.log('Checking if tables exist...');
      // First, check if tables exist directly using SQL queries
      const { data: contentTableExists } = await supabaseHelper.rpc('table_exists', { table_name: 'content' });
      
      if (!contentTableExists) {
        console.log('Content table does not exist, creating it...');
        const { error: contentError } = await supabaseHelper.rpc('run_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS public.content (
              id TEXT PRIMARY KEY,
              hero JSONB,
              about JSONB,
              services JSONB,
              methodology JSONB,
              contact JSONB,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              updated_at TIMESTAMPTZ DEFAULT NOW()
            );
          `
        });
        
        if (contentError) {
          console.error('Error creating content table:', contentError);
        } else {
          console.log('Content table created successfully');
        }
      } else {
        console.log('Content table already exists');
      }
      
      const { data: linkedinPostsTableExists } = await supabaseHelper.rpc('table_exists', { table_name: 'linkedin_posts' });
      
      if (!linkedinPostsTableExists) {
        console.log('LinkedIn posts table does not exist, creating it...');
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
        } else {
          console.log('LinkedIn posts table created successfully');
        }
      } else {
        console.log('LinkedIn posts table already exists');
      }
      
      const { data: projectsTableExists } = await supabaseHelper.rpc('table_exists', { table_name: 'projects' });
      
      if (!projectsTableExists) {
        console.log('Projects table does not exist, creating it...');
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
        } else {
          console.log('Projects table created successfully');
        }
      } else {
        console.log('Projects table already exists');
      }
    } catch (error) {
      console.error('Error checking tables:', error);
      
      // Fallback to direct SQL execution
      try {
        console.log('Trying fallback method to create tables...');
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
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
          `
        });
        console.log('Tables created successfully using fallback method');
      } catch (fallbackError) {
        console.error('Failed to create tables with fallback method:', fallbackError);
      }
    }
  }
}
