
import { supabase } from '@/lib/supabase';
import { defaultContent } from '@/services/cms/defaultContent';
import { DEFAULT_CONTENT_ID, prepareContentForSaving } from './utils/typeConversion';
import { SiteContent } from '@/services/cms/types';

// Repository for reset and migration operations
class ResetRepository {
  async resetContentToDefault(): Promise<boolean> {
    try {
      console.log('Resetting content to default values');
      
      // Prepare the default data for insertion/update
      const contentData = prepareContentForSaving(defaultContent);
      
      const { data, error } = await supabase
        .from('content')
        .upsert(contentData)
        .select();
        
      if (error) {
        console.error('Error resetting content:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception resetting content:', error);
      return false;
    }
  }
}

export const resetRepository = new ResetRepository();
