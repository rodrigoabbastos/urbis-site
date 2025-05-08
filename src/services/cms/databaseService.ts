import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { SiteContent } from './types';
import { defaultContent } from './defaultContent';

// Define a interface Database para ajudar com o TypeScript
interface Database {
  public: {
    Tables: {
      content: {
        Row: any;
        Insert: any;
      };
      projects: {
        Row: any;
        Insert: any;
      };
      linkedin_posts: {
        Row: any;
        Insert: any;
      };
    };
    Functions: {
      create_content_table: {
        Args: Record<string, never>;
        Returns: void;
      };
      create_linkedin_posts_table: {
        Args: Record<string, never>;
        Returns: void;
      };
      create_projects_table: {
        Args: Record<string, never>;
        Returns: void;
      };
    };
  };
}

export class DatabaseService {
  async createTablesIfNotExist() {
    try {
      // Check if content table exists - using type assertion to bypass TypeScript errors
      const { error: contentError } = await (supabase as any)
        .rpc('create_content_table');
      
      if (contentError && !contentError.message.includes('already exists')) {
        console.error('Error creating content table:', contentError);
      }
    } catch (error) {
      console.error('Error checking content table:', error);
    }
    
    try {
      // Check if linkedin_posts table exists - using type assertion to bypass TypeScript errors
      const { error: postsError } = await (supabase as any)
        .rpc('create_linkedin_posts_table');
      
      if (postsError && !postsError.message.includes('already exists')) {
        console.error('Error creating linkedin_posts table:', postsError);
      }
    } catch (error) {
      console.error('Error checking linkedin_posts table:', error);
    }
    
    try {
      // Check if projects table exists - using type assertion to bypass TypeScript errors
      const { error: projectsError } = await (supabase as any)
        .rpc('create_projects_table');
      
      if (projectsError && !projectsError.message.includes('already exists')) {
        console.error('Error creating projects table:', projectsError);
      }
    } catch (error) {
      console.error('Error checking projects table:', error);
    }
  }

  async fetchMainContent() {
    try {
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { data, error } = await client
        .from('content')
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
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { data, error } = await client
        .from('content')
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
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { data, error } = await client
        .from('projects')
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
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { data, error } = await client
        .from('linkedin_posts')
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
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { error } = await client
        .from('content')
        .upsert({ 
          id: 'main',
          ...content
        });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving main content:', error);
      return false;
    }
  }

  async saveProjectsInfo(projectsInfo: { title: string; description: string }) {
    try {
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { error } = await client
        .from('content')
        .upsert({ 
          id: 'projects',
          ...projectsInfo
        });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving projects info:', error);
      return false;
    }
  }

  async saveProject(project: any) {
    try {
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { error } = await client
        .from('projects')
        .upsert(project);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    }
  }

  async deleteProject(id: string) {
    try {
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { error } = await client
        .from('projects')
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
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { error } = await client
        .from('linkedin_posts')
        .upsert(post);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving LinkedIn post:', error);
      return false;
    }
  }

  async deleteLinkedInPost(id: string) {
    try {
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { error } = await client
        .from('linkedin_posts')
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
      // Check if we have content in Supabase
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      const { data: existingContent, error } = await client
        .from('content')
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
      // Reset main content
      const { hero, about, services, methodology, contact } = defaultData;
      await this.saveMainContent({ hero, about, services, methodology, contact });
      
      // Reset projects info
      await this.saveProjectsInfo({
        title: defaultData.projects.title,
        description: defaultData.projects.description
      });
      
      // Reset projects - first delete all existing projects
      // Use explicit type casting to bypass type checking
      const client = supabase as any;
      await client.from('projects').delete().neq('id', '0');
      
      // Then insert default projects
      for (const project of defaultData.projects.items) {
        await this.saveProject(project);
      }
      
      // Reset LinkedIn posts - first delete all existing posts
      // Use explicit type casting to bypass type checking
      await client.from('linkedin_posts').delete().neq('id', '0');
      
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
