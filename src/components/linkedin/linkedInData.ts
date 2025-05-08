
import { LinkedInPost } from './types';
import { supabase } from '@/integrations/supabase/client';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    const { data, error } = await supabase
      .from('linkedin_posts')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    return [];
  }
};
