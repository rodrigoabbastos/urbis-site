
import { supabaseHelper } from './supabaseHelper';

export class DatabaseInitService {
  async createTablesIfNotExist() {
    try {
      // Check if content table exists
      const { data: tableExists, error } = await supabaseHelper.rpc('table_exists', {
        table_name: 'content'
      });

      if (error) {
        console.error('Error checking if table exists:', error.message);
        return false;
      }

      if (!tableExists) {
        // Create content table if it doesn't exist
        const sql = `
          CREATE TABLE IF NOT EXISTS content (
            id TEXT PRIMARY KEY,
            hero JSONB,
            about JSONB,
            services JSONB,
            methodology JSONB,
            contact JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `;

        const { error: createError } = await supabaseHelper.rpc('run_sql', {
          sql: sql
        });

        if (createError) {
          console.error('Error creating content table:', createError.message);
          return false;
        }

        console.log('Created content table successfully');
      } else {
        console.log('Content table already exists');
      }

      // Check if projects table exists
      const { data: projectsTableExists, error: projectsError } = await supabaseHelper.rpc('table_exists', {
        table_name: 'projects'
      });

      if (projectsError) {
        console.error('Error checking if projects table exists:', projectsError.message);
        return false;
      }

      if (!projectsTableExists) {
        // Create projects table if it doesn't exist
        const projectsSql = `
          CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            client TEXT NOT NULL,
            year TEXT NOT NULL,
            type TEXT NOT NULL,
            link TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `;

        const { error: createProjectsError } = await supabaseHelper.rpc('run_sql', {
          sql: projectsSql
        });

        if (createProjectsError) {
          console.error('Error creating projects table:', createProjectsError.message);
          return false;
        }

        console.log('Created projects table successfully');
      } else {
        console.log('Projects table already exists');
      }

      // Check if linkedin_posts table exists
      const { data: linkedinTableExists, error: linkedinError } = await supabaseHelper.rpc('table_exists', {
        table_name: 'linkedin_posts'
      });

      if (linkedinError) {
        console.error('Error checking if linkedin_posts table exists:', linkedinError.message);
        return false;
      }

      if (!linkedinTableExists) {
        // Create linkedin_posts table if it doesn't exist
        const linkedinSql = `
          CREATE TABLE IF NOT EXISTS linkedin_posts (
            id TEXT PRIMARY KEY,
            text_snippet TEXT NOT NULL,
            image_url TEXT,
            post_url TEXT NOT NULL,
            date TIMESTAMP WITH TIME ZONE DEFAULT now(),
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        `;

        const { error: createLinkedinError } = await supabaseHelper.rpc('run_sql', {
          sql: linkedinSql
        });

        if (createLinkedinError) {
          console.error('Error creating linkedin_posts table:', createLinkedinError.message);
          return false;
        }

        console.log('Created linkedin_posts table successfully');
      } else {
        console.log('LinkedIn_posts table already exists');
      }

      return true;
    } catch (error) {
      console.error('Error in createTablesIfNotExist:', error);
      return false;
    }
  }
}
