
import { toast } from '@/components/ui/use-toast';
import { SiteContent } from '../types';
import { supabaseHelper } from './databaseUtils';
import { createTablesIfNotExist } from './tableInitializer';
import { saveContent } from './contentRepository';
import { saveProject } from './projectsRepository';
import { saveLinkedInPost } from './linkedInRepository';

export async function migrateFromLocalStorage(localContent: SiteContent, storageKey: string): Promise<boolean> {
  try {
    // Ensure tables exist before migrating
    await createTablesIfNotExist();
    
    // Check if we have content in Supabase
    const { data: existingContent, error } = await supabaseHelper.from('content')
      .select('*')
      .eq('id', 'main')
      .single();
      
    // If no content exists in Supabase, insert from localStorage
    if (!existingContent) {
      // Store main content
      const { hero, about, services, methodology, contact, clients, sectionVisibility, ebooks } = localContent;
      await saveContent({ 
        hero, 
        about, 
        services, 
        methodology, 
        contact,
        clients,
        sectionVisibility,
        ebooks
      });
      
      // Store individual projects
      if (localContent.projects && localContent.projects.items && localContent.projects.items.length > 0) {
        for (const project of localContent.projects.items) {
          await saveProject(project);
        }
      }
      
      // Store LinkedIn posts
      if (localContent.linkedInPosts && localContent.linkedInPosts.length > 0) {
        for (const post of localContent.linkedInPosts) {
          await saveLinkedInPost(post);
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

export async function resetToDefault(defaultData: SiteContent): Promise<boolean> {
  try {
    // Ensure tables exist before resetting
    await createTablesIfNotExist();
    
    // Reset main content
    const { hero, about, services, methodology, contact, clients, sectionVisibility, ebooks } = defaultData;
    await saveContent({ 
      hero, 
      about, 
      services, 
      methodology, 
      contact,
      clients,
      sectionVisibility, 
      ebooks
    });
    
    // Reset projects - first delete all existing projects
    await supabaseHelper.from('projects')
      .delete()
      .neq('id', '0');
    
    // Then insert default projects
    if (defaultData.projects && defaultData.projects.items) {
      for (const project of defaultData.projects.items) {
        await saveProject(project);
      }
    }
    
    // Reset LinkedIn posts - first delete all existing posts
    await supabaseHelper.from('linkedin_posts')
      .delete()
      .neq('id', '0');
    
    // Then insert default posts
    if (defaultData.linkedInPosts && defaultData.linkedInPosts.length > 0) {
      for (const post of defaultData.linkedInPosts) {
        await saveLinkedInPost(post);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error resetting to default:', error);
    return false;
  }
}
