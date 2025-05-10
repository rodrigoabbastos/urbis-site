
import { supabaseHelper } from './databaseUtils';
import { createTablesIfNotExist } from './tableInitializer';

export async function fetchProjects(): Promise<any[] | null> {
  try {
    // Ensure tables exist before fetching
    await createTablesIfNotExist();
    
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

export async function saveProject(project: any): Promise<boolean> {
  try {
    // Ensure tables exist before saving
    await createTablesIfNotExist();
    
    const { error } = await supabaseHelper.from('projects')
      .upsert(project as any);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving project:', error);
    return false;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    // Ensure tables exist before deleting
    await createTablesIfNotExist();
    
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
