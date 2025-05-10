
import { LinkedInPost } from './types';
import { cmsService } from '@/services/cms';

export const getLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    console.log('Fetching LinkedIn posts from CMS service...');
    const posts = await cmsService.getLinkedInPosts();
    console.log(`Retrieved ${posts?.length || 0} LinkedIn posts`);
    return posts || [];
  } catch (error) {
    console.error('Erro ao buscar posts do LinkedIn:', error);
    return [];
  }
};
