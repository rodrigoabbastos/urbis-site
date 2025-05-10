
import { supabaseHelper } from './databaseUtils';
import { createTablesIfNotExist } from './tableInitializer';

export async function fetchLinkedInPosts(): Promise<any[] | null> {
  try {
    // Make sure tables are created before fetching
    await createTablesIfNotExist();
    
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

export async function saveLinkedInPost(post: any): Promise<boolean> {
  try {
    // Make sure tables are created before saving
    await createTablesIfNotExist();
    
    const { error } = await supabaseHelper.from('linkedin_posts')
      .upsert(post as any);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving LinkedIn post:', error);
    return false;
  }
}

export async function deleteLinkedInPost(id: string): Promise<boolean> {
  try {
    // Ensure tables exist before deleting
    await createTablesIfNotExist();
    
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
