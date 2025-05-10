import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { SiteContent } from './types';
import { defaultContent } from './defaultContent';

// Create a strongly typed helper function to make Supabase calls more consistent
// Using type assertions to bypass TypeScript's strict type checking
const supabaseHelper = {
  // Generic from function with type casting
  from: (table: string) => {
    // Cast to any to bypass TypeScript errors
    return (supabase.from as any)(table);
  },
  // Helper for RPC calls with type casting
  rpc: (fn: string, params: any) => {
    // Cast to any to bypass TypeScript errors
    return (supabase.rpc as any)(fn, params);
  }
};

export class DatabaseService {
  async createTablesIfNotExist() {
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

  async fetchMainContent() {
    try {
      // Ensure tables exist before fetching
      await this.createTablesIfNotExist();
      
      const { data, error } = await supabaseHelper.from('content')
        .select('*')
        .eq('id', 'main')
        .single();
      
      if (error) {
        console.warn('Erro ao carregar conteúdo principal:', error.message);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching main content:', error);
      return null;
    }
  }

  async fetchProjectsInfo() {
    try {
      // Ensure tables exist before fetching
      await this.createTablesIfNotExist();
      
      const { data, error } = await supabaseHelper.from('content')
        .select('*')
        .eq('id', 'projects')
        .single();
      
      if (error) {
        console.warn('Erro ao carregar informações dos projetos:', error.message);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching projects info:', error);
      return null;
    }
  }

  async fetchProjects() {
    try {
      // Ensure tables exist before fetching
      await this.createTablesIfNotExist();
      
      const { data, error } = await supabaseHelper.from('projects')
        .select('*');
      
      if (error) {
        console.warn('Erro ao carregar projetos:', error.message);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  }

  async fetchLinkedInPosts() {
    try {
      // Make sure tables are created before fetching
      await this.createTablesIfNotExist();
      
      const { data, error } = await supabaseHelper.from('linkedin_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.warn('Erro ao carregar posts do LinkedIn:', error.message);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error);
      return null;
    }
  }

  async saveMainContent(content: {
    hero: any;
    about: any;
    services: any;
    methodology: any;
    contact: any;
  }) {
    try {
      // Ensure tables exist before saving
      await this.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('content')
        .upsert({ 
          id: 'main',
          ...content
        } as any);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving main content:', error);
      return false;
    }
  }

  async saveProjectsInfo(projectsInfo: { title: string; description: string }) {
    try {
      // Ensure tables exist before saving
      await this.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('content')
        .upsert({ 
          id: 'projects',
          ...projectsInfo
        } as any);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving projects info:', error);
      return false;
    }
  }

  async saveProject(project: any) {
    try {
      // Ensure tables exist before saving
      await this.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('projects')
        .upsert(project as any);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    }
  }

  async deleteProject(id: string) {
    try {
      // Ensure tables exist before deleting
      await this.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  async saveLinkedInPost(post: any) {
    try {
      // Make sure tables are created before saving
      await this.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('linkedin_posts')
        .upsert(post as any);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving LinkedIn post:', error);
      return false;
    }
  }

  async deleteLinkedInPost(id: string) {
    try {
      // Ensure tables exist before deleting
      await this.createTablesIfNotExist();
      
      const { error } = await supabaseHelper.from('linkedin_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting LinkedIn post:', error);
      return false;
    }
  }

  async migrateFromLocalStorage(localContent: SiteContent, storageKey: string) {
    try {
      // Ensure tables exist before migrating
      await this.createTablesIfNotExist();
      
      // Check if we have content in Supabase
      const { data: existingContent, error } = await supabaseHelper.from('content')
        .select('*')
        .eq('id', 'main')
        .single();
        
      // If no content exists in Supabase, insert from localStorage
      if (!existingContent) {
        // Store main content
        const { hero, about, services, methodology, contact } = localContent;
        await this.saveMainContent({ hero, about, services, methodology, contact });
        
        // Store projects info
        await this.saveProjectsInfo({
          title: localContent.projects.title,
          description: localContent.projects.description
        });
        
        // Store individual projects
        if (localContent.projects.items.length > 0) {
          for (const project of localContent.projects.items) {
            await this.saveProject(project);
          }
        }
        
        // Store LinkedIn posts
        if (localContent.linkedInPosts && localContent.linkedInPosts.length > 0) {
          for (const post of localContent.linkedInPosts) {
            await this.saveLinkedInPost(post);
          }
        }
        
        // Clear localStorage after successful migration
        localStorage.removeItem(storageKey);
        
        toast({
          title: "Migração concluída",
          description: "Os dados foram migrados com sucesso para o Supabase.",
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error migrating data from localStorage:', error);
      toast({
        title: "Erro na migração",
        description: "Não foi possível migrar os dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
      return false;
    }
  }

  async resetToDefault(defaultData: SiteContent) {
    try {
      // Ensure tables exist before resetting
      await this.createTablesIfNotExist();
      
      // Reset main content
      const { hero, about, services, methodology, contact } = defaultData;
      await this.saveMainContent({ hero, about, services, methodology, contact });
      
      // Reset projects info
      await this.saveProjectsInfo({
        title: defaultData.projects.title,
        description: defaultData.projects.description
      });
      
      // Reset projects - first delete all existing projects
      await supabaseHelper.from('projects')
        .delete()
        .neq('id', '0');
      
      // Then insert default projects
      for (const project of defaultData.projects.items) {
        await this.saveProject(project);
      }
      
      // Reset LinkedIn posts - first delete all existing posts
      await supabaseHelper.from('linkedin_posts')
        .delete()
        .neq('id', '0');
      
      // Then insert default posts
      if (defaultData.linkedInPosts && defaultData.linkedInPosts.length > 0) {
        for (const post of defaultData.linkedInPosts) {
          await this.saveLinkedInPost(post);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error resetting to default:', error);
      return false;
    }
  }
}

export const databaseService = new DatabaseService();
